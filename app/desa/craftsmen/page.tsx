'use client';

import React from 'react';
import { useSupabaseList } from '@/hooks/useSupabaseList';
import { getCraftsmanImages } from '@/util/getCraftsmenImages';
import CraftsmenPaginatedGrid from './CraftsmenPaginatedGrid';

interface DbCraftsman {
  id: number;
  slug: string;
  name: string;
  address?: string;
  description_id?: string;
  description_en?: string;
}

const Craftsmen = () => {
  const { data: dbItems, isLoading, error } = useSupabaseList<DbCraftsman>('craftsmen');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading craftsmen...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-red-500">Error loading craftsmen: {error.message}</div>
      </div>
    );
  }

  const processedCraftsmen = (dbItems || []).map((item) => {
    const { thumbnail } = getCraftsmanImages(item.slug);
    
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      thumbnail: thumbnail 
    };
  });

  return (
    <div>
      <CraftsmenPaginatedGrid items={processedCraftsmen} />
    </div>
  );
};

export default Craftsmen;