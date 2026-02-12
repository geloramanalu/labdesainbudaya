'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { EventItem } from '@/data/eventsData';

interface EventClientProps {
  item: EventItem;
  thumbnail: string | null;
  gallery: string[];
}

export default function EventClient({ item, thumbnail, gallery }: EventClientProps) {
  const { lang } = useLanguage();

  const description = lang === 'EN' && item.content_en ? item.content_en : item.content;
  const title = item.title;

  return (
    // Add max-width and horizontal centering here
    <main className="min-h-screen text-[#2D2D2D] max-w-[1440px] mx-auto px-4 md:px-8 xl:px-16 py-8 md:py-16">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* SECTION 1: Text Content (Occupies 7/12 columns) */}
        <div className="lg:col-span-7 flex flex-col">
          <h1 className="text-5xl lg:text-8xl font-medium mb-8 tracking-tight">
            {title}
          </h1>
          <div className="text-gray-600 leading-relaxed text-base md:text-lg text-justify lg:text-left">
            <p>{description}</p>
          </div>
        </div>

        {/* SECTION 2: Main Thumbnail & Meta (Occupies 5/12 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="relative aspect-[3/4] border border-black overflow-hidden bg-gray-100">
            {thumbnail ? (
              <Image src={thumbnail} alt={item.title} fill className="object-cover" priority />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
            )}
          </div>

          {/* Location / Meta Info pushed to bottom of visual column */}
          <div className="mt-auto border-t border-black pt-6">
            <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold tracking-tighter">Trangsan</h4>
            <p className="font-medium text-2xl">
              Sukoharjo, {lang === 'EN' ? 'Central Java' : 'Jawa Tengah'}
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}