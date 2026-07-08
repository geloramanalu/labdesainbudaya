'use client';

import React from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import { useSupabaseItem } from '@/hooks/useSupabaseItem';
import { useSupabaseList } from '@/hooks/useSupabaseList';
import { ARCHIVE_ITEMS } from '@/data/archiveData';
import { getArchiveImages } from '@/util/getArchiveImages';
import ArchiveClient from './ArchiveClient';

// Pre-populate lookups from static data
const materialLookup: Record<string, { type: string; detail_id: string; detail_en: string }> = {};
const toolLookup: Record<string, { name: string; detail_id: string; detail_en: string }> = {};

ARCHIVE_ITEMS.forEach((item) => {
  if (item.material_rotan?.type) {
    materialLookup[item.material_rotan.type] = item.material_rotan;
  }
  if (item.alat_produksi?.name) {
    toolLookup[item.alat_produksi.name] = item.alat_produksi;
  }
});

interface DbArchiveItem {
  id: number;
  title: string;
  slug: string;
  type_anyaman?: string;
  material_rotan?: string[];
  alat_produksi?: string[];
  pengembangan_desain?: string;
  description_id?: string;
  description_en?: string;
  image_url?: string;
}

function ArchiveDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Fetch the item
  const { data: dbItem, isLoading: itemLoading, error: itemError } = useSupabaseItem<DbArchiveItem>('archives', id);

  // Fetch all items to build suggestions
  const { data: allDbItems, isLoading: listLoading } = useSupabaseList<DbArchiveItem>('archives');

  if (!id) {
    return notFound();
  }

  if (itemLoading || listLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading archive details...</div>
      </div>
    );
  }

  if (itemError || !dbItem) {
    return notFound();
  }

  // Resolve material_rotan (DB is string array)
  let resolvedMaterial = undefined;
  if (Array.isArray(dbItem.material_rotan) && dbItem.material_rotan.length > 0) {
    const materialName = dbItem.material_rotan[0];
    resolvedMaterial = materialLookup[materialName] || {
      type: materialName,
      detail_id: '',
      detail_en: '',
    };
  }

  // Resolve alat_produksi (DB is string array)
  let resolvedTool = undefined;
  if (Array.isArray(dbItem.alat_produksi) && dbItem.alat_produksi.length > 0) {
    const toolName = dbItem.alat_produksi[0];
    resolvedTool = toolLookup[toolName] || {
      name: toolName,
      detail_id: '',
      detail_en: '',
    };
  }

  const item = {
    id: dbItem.id,
    title: dbItem.title,
    slug: dbItem.slug,
    description_id: dbItem.description_id || '',
    description_en: dbItem.description_en || '',
    type_anyaman: dbItem.type_anyaman,
    material_rotan: resolvedMaterial,
    alat_produksi: resolvedTool,
    pengembangan_desain: dbItem.pengembangan_desain,
    image: dbItem.image_url || '',
  };

  const { thumbnail, gallery } = getArchiveImages(item.slug);

  // Get 4 suggestions
  const otherItems = (allDbItems || [])
    .filter((i) => String(i.id) !== String(id))
    .slice(0, 4)
    .map((other) => {
      // Map other item to ArchiveItem format
      let resMat = undefined;
      if (Array.isArray(other.material_rotan) && other.material_rotan.length > 0) {
        const matName = other.material_rotan[0];
        resMat = materialLookup[matName] || { type: matName, detail_id: '', detail_en: '' };
      }
      let resTool = undefined;
      if (Array.isArray(other.alat_produksi) && other.alat_produksi.length > 0) {
        const toolName = other.alat_produksi[0];
        resTool = toolLookup[toolName] || { name: toolName, detail_id: '', detail_en: '' };
      }

      return {
        data: {
          id: other.id,
          title: other.title,
          slug: other.slug,
          description_id: other.description_id || '',
          description_en: other.description_en || '',
          type_anyaman: other.type_anyaman,
          material_rotan: resMat,
          alat_produksi: resTool,
          pengembangan_desain: other.pengembangan_desain,
          image: other.image_url || '',
        },
        thumbnail: getArchiveImages(other.slug).thumbnail,
      };
    });

  return (
    <ArchiveClient
      item={item}
      thumbnail={thumbnail}
      gallery={gallery}
      otherItems={otherItems}
    />
  );
}

export default function ArchiveDetailPage() {
  return (
    <React.Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading...</div>
      </div>
    }>
      <ArchiveDetailContent />
    </React.Suspense>
  );
}
