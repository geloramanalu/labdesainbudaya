'use client';

import React from 'react';
import HorizontalCard from '@/components/HorizontalCard';
import { ArrowRight } from 'lucide-react';
import { useSupabaseList } from '@/hooks/useSupabaseList';
import { getEventImages } from '@/util/getEventImages';

interface DbEvent {
  id: number;
  title: string;
  description_id?: string;
  description_en?: string;
  year?: number | string;
  slug?: string;
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const Events = () => {
  const { data: dbItems, isLoading, error } = useSupabaseList<DbEvent>('events');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-red-500">Error loading events: {error.message}</div>
      </div>
    );
  }

  const processedItems = (dbItems || []).map((item) => {
    const slug = item.slug || slugify(item.title);
    const { thumbnail } = getEventImages(slug);
    const year = item.year ? Number(item.year) : 2025;
    return {
      id: item.id,
      title: item.title,
      slug: slug,
      year: year,
      thumbnail: thumbnail,
    };
  });

  return (
    <div className='border p-2 xl:p-4 xl:-ml-[1px]'>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6 ">
        {processedItems.map((item) => (
          <HorizontalCard 
            key={item.id}
            title={item.title}
            image={item.thumbnail} 
            year={item.year}
            link={`/desa/events/detail?id=${item.id}`}
          />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button className="w-10 h-14 border border-[#2D2D2D] flex items-center justify-center hover:bg-[#2D2D2D] hover:text-white transition-colors">
          <ArrowRight className="rotate-180" size={20} />
        </button>
        <div className="flex gap-2">
            <div className="w-2 h-14 bg-[#2D2D2D]/80"></div>
        </div>
        <button className="w-10 h-14 border border-[#2D2D2D] flex items-center justify-center hover:bg-[#2D2D2D] hover:text-white transition-colors">
          <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
};

export default Events;