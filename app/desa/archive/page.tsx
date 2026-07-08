'use client';

import React from 'react';
import { ARCHIVE_ITEMS } from '@/data/archiveData';
import { getArchiveImages } from '@/util/getArchiveImages';
import ArchivePaginatedGrid from './ArchivePaginatedGrid';
import { useSupabaseList } from '@/hooks/useSupabaseList';

// Create the lookup maps dynamically from ARCHIVE_ITEMS
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

const ArchivePage = () => {
  const { data: dbItems, isLoading, error } = useSupabaseList<DbArchiveItem>('archives');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading archives...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-red-500">Error loading archives: {error.message}</div>
      </div>
    );
  }

  const processedItems = (dbItems || []).map((item) => {
    const { thumbnail } = getArchiveImages(item.slug);

    // Resolve material_rotan (DB is string array)
    let resolvedMaterial = undefined;
    if (Array.isArray(item.material_rotan) && item.material_rotan.length > 0) {
      const materialName = item.material_rotan[0];
      resolvedMaterial = materialLookup[materialName] || {
        type: materialName,
        detail_id: '',
        detail_en: '',
      };
    }

    // Resolve alat_produksi (DB is string array)
    let resolvedTool = undefined;
    if (Array.isArray(item.alat_produksi) && item.alat_produksi.length > 0) {
      const toolName = item.alat_produksi[0];
      resolvedTool = toolLookup[toolName] || {
        name: toolName,
        detail_id: '',
        detail_en: '',
      };
    }

    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      thumbnail: thumbnail,
      type_anyaman: item.type_anyaman,
      material_rotan: resolvedMaterial,
      alat_produksi: resolvedTool,
      pengembangan_desain: item.pengembangan_desain,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px]">
      <ArchivePaginatedGrid items={processedItems} />
    </div>
  );
};

export default ArchivePage;