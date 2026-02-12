'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { PUBLICATION_DATA } from '@/data/publicationData';
import { useLanguage } from '@/context/LanguageContext';

const PublikasiPage = () => {
  const { t, lang } = useLanguage();
  
  // We use the Indonesian keys as the "Logic/Value" for filtering 
  // to match the 'type_id' in data, but we display dynamic labels.
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
        
        {/* Header Section */}
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

        {/* Filters Section */}
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

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 mb-16">
          {filteredData.map((item) => {
            // Determine which type label to show on the card
            const displayType = lang === 'EN' ? item.type_en : item.type_id;

            return (
              <a 
                key={item.id} 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-2 border-[#2D2D2D] bg-[#F2F2F2] hover:bg-[#1d1d1d] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full border-b border-[#2D2D2D] overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between h-[180px]">
                  <h3 className="font-raleway font-medium text-md xl:text-xl leading-snug line-clamp-4 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <div className="flex justify-between items-end mt-4 group-hover:text-white transition-colors duration-300">
                    <span className="font-raleway text-md font-semibold">
                      {item.year}/ <span className="text-gray-500 font-normal group-hover:text-gray-300 transition-colors duration-300 italic">{displayType}</span>
                    </span>
                    <ArrowRight 
                      size={20} 
                      strokeWidth={1} 
                      className="transform group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white" 
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Pagination Placeholder (Visual Only) */}
        <div className="flex items-center justify-center gap-4">
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
        </div>

      </div>

    </main>
  );
};

export default PublikasiPage;