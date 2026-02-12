'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Removed Image import as it's inside the component now
import { PUBLICATION_DATA } from '@/data/publicationData';
import { useLanguage } from '@/context/LanguageContext';
import CardPublikasi from '@/components/CardPublikasi'; // 1. Import the component

const PublikasiPage = () => {
  const { t, lang } = useLanguage();
  
  const FILTERS = [
    { value: "Semua", label: t('publicationPage.filters.all') },
    { value: "Artikel", label: t('publicationPage.filters.article') },
    { value: "Jurnal", label: t('publicationPage.filters.journal') },
    { value: "Lainnya", label: t('publicationPage.filters.other') },
  ];

  const [activeFilter, setActiveFilter] = useState("Semua");

  const filteredData = activeFilter === "Semua" 
    ? PUBLICATION_DATA 
    : PUBLICATION_DATA.filter(item => item.type_id === activeFilter);

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

        {/* <div className="flex items-center justify-center gap-4">
          <button className="p-2 bg-[#2D2D2D] text-white hover:opacity-80 transition-opacity">
            <ArrowLeft size={24} strokeWidth={1} />
          </button>
          
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#2D2D2D] "></div>
            <div className="w-2 h-2 border-2 border-[#2D2D2D] "></div>
            <div className="w-2 h-2 border-2 border-[#2D2D2D] "></div>
            <div className="w-2 h-2 border-2 border-[#2D2D2D] "></div>
          </div>

          <button className="p-2 bg-[#2D2D2D] text-white hover:opacity-80 transition-opacity">
            <ArrowRight size={24} strokeWidth={1} />
          </button>
        </div> */}

      </div>

    </main>
  );
};

export default PublikasiPage;