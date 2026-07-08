'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import CardPublikasi from '@/components/CardPublikasi'; 
import { useSupabaseList } from '@/hooks/useSupabaseList';
import { PublicationItem } from '@/data/publicationData';

interface DbPublication {
  id: number;
  title: string;
  type: string;
  year: number | string;
  url: string;
  image_url: string;
}

const PublikasiPage = () => {
  const { t, lang } = useLanguage();
  
  const { data: dbItems, isLoading, error } = useSupabaseList<DbPublication>('publications');

  const FILTERS = [
    { value: "Semua", label: t('publicationPage.filters.all') },
    { value: "Artikel", label: t('publicationPage.filters.article') },
    { value: "Jurnal", label: t('publicationPage.filters.journal') },
    { value: "Lainnya", label: t('publicationPage.filters.other') },
  ];

  const [activeFilter, setActiveFilter] = useState("Semua");

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#EFEFEF] font-sans text-[#2D2D2D] flex items-center justify-center">
        <div className="text-lg text-gray-500 animate-pulse">Loading publications...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#EFEFEF] font-sans text-[#2D2D2D] flex items-center justify-center">
        <div className="text-lg text-red-500">Error loading publications: {error.message}</div>
      </main>
    );
  }

  const processedData: PublicationItem[] = (dbItems || []).map((item) => {
    const type_id = item.type === 'Article' ? 'Artikel' : item.type === 'Journal' ? 'Jurnal' : 'Lainnya';
    const type_en = item.type === 'Article' ? 'Article' : item.type === 'Journal' ? 'Journal' : 'Others';
    return {
      id: item.id,
      title: item.title,
      type_id,
      type_en,
      year: Number(item.year),
      url: item.url,
      imageSrc: item.image_url || '',
    };
  });

  const filteredData = activeFilter === "Semua" 
    ? processedData 
    : processedData.filter(item => item.type_id === activeFilter);

  return (
    <main className="min-h-screen bg-[#EFEFEF] font-sans text-[#2D2D2D]">
      
      <div className="pt-32 pb-16 px-6 xl:px-12 max-w-[1440px] mx-auto">
        
        <div className="text-center mb-12 xl:mb-16">
          <h1 className="text-4xl xl:text-7xl font-raleway font-normal tracking-wide leading-tight uppercase xl:normal-case">
            <span className="block xl:inline xl:mr-3">
              {t('publicationPage.title')}
            </span>
            <br className="xl:hidden" />
            <span className="block xl:inline">
              {t('publicationPage.subtitle')}
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 xl:mb-16">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`
                px-6 py-2 border-2 border-[#2D2D2D] text-md xl:text-xl transition-all duration-300
                ${activeFilter === filter.value 
                  ? 'bg-[#2D2D2D] text-white' 
                  : 'bg-transparent text-[#2D2D2D] hover:bg-[#2D2D2D]/10'}
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 mb-16">
          {filteredData.map((item) => {
            // Calculate the correct label string
            const displayType = lang === 'EN' ? item.type_en : item.type_id;

            return (
              <CardPublikasi
                key={item.id}
                title={item.title}
                type={displayType} // Pass the translated string here
                year={item.year}
                url={item.url}
                imageSrc={item.imageSrc}
              />
            );
          })}
        </div>

      </div>

    </main>
  );
};

export default PublikasiPage;