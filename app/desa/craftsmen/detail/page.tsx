'use client';

import React from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import { useSupabaseItem } from '@/hooks/useSupabaseItem';
import { useSupabaseList } from '@/hooks/useSupabaseList';
import { getCraftsmanImages } from '@/util/getCraftsmenImages';
import CraftsmanClient from './CraftsmanClient';
import { Craftsman } from '@/data/craftsmenData';

function CraftsmanDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Fetch the item
  const { data: dbItem, isLoading: itemLoading, error: itemError } = useSupabaseItem<Craftsman>('craftsmen', id);

  // Fetch all items to build suggestions
  const { data: allDbItems, isLoading: listLoading } = useSupabaseList<Craftsman>('craftsmen');

  if (!id) {
    return notFound();
  }

  if (itemLoading || listLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading craftsman details...</div>
      </div>
    );
  }

  if (itemError || !dbItem) {
    return notFound();
  }

  const { thumbnail, gallery } = getCraftsmanImages(dbItem.slug);

  // Get 4 suggestions
  const otherCraftsmen = (allDbItems || [])
    .filter((c) => String(c.id) !== String(id))
    .slice(0, 4)
    .map((item) => ({
      data: item,
      thumbnail: getCraftsmanImages(item.slug).thumbnail,
    }));

  return (
    <CraftsmanClient
      craftsman={dbItem}
      thumbnail={thumbnail}
      gallery={gallery}
      otherCraftsmen={otherCraftsmen}
    />
  );
}

export default function CraftsmanDetailPage() {
  return (
    <React.Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading...</div>
      </div>
    }>
      <CraftsmanDetailContent />
    </React.Suspense>
  );
}
