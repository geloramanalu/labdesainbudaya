'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import GallerySidebar from './GallerySidebar';
import { Craftsman } from '@/data/craftsmenData'; 

interface CraftsmanClientProps {
  craftsman: Craftsman;
  thumbnail: string | null;
  gallery: string[];
  otherCraftsmen: {
    data: Craftsman;
    thumbnail: string | null;
  }[];
}
// to do: tidy up layouting
// to do: fix detail image fallback & mapping
// to do: remove sidebar from layout
// to do: add back button

export default function CraftsmanClient({ 
  craftsman, 
  thumbnail, 
  gallery, 
  otherCraftsmen 
}: CraftsmanClientProps) {
  
  const { lang, t } = useLanguage();

  
  const description = lang === 'EN' && craftsman.description_en 
    ? craftsman.description_en 
    : craftsman.description_id;

  
  const [personName, companyName] = craftsman.name.includes('/') 
    ? craftsman.name.split('/').map(s => s.trim())
    : [craftsman.name, ''];

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#2D2D2D] font-sans">
      <div className="mx-auto px-4 md:px-8 py-8 md:py-16">
        
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          
          <div className="lg:col-span-4 flex flex-col order-1">
            <h1 className="text-5xl lg:text-7xl font-medium mb-2 tracking-tight">
              {personName}
            </h1>
            {companyName && (
              <h2 className="text-3xl lg:text-5xl text-gray-400 font-normal mb-8 lg:mb-12 tracking-tight">
                {companyName}
              </h2>
            )}
            
            <div className="text-gray-600 leading-relaxed text-sm md:text-base text-justify lg:text-left">
              <p>{description}</p>
            </div>
          </div>

          <div className="lg:col-span-4 order-2">
            <div className="relative aspect-[3/4] w-full bg-white border border-black">
              <div className="relative w-full h-full overflow-hidden">
                {thumbnail ? (
                  <Image 
                    src={thumbnail}
                    alt={craftsman.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                    No Image
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8 order-3 lg:items-end lg:justify-end lg:text-right lg:pt-20">
            <div className="lg:max-w-[300px]">
              <p className="font-bold text-sm leading-relaxed whitespace-pre-line">
                {craftsman.address}
              </p>
            </div>

            <a href="mailto:labdesainbudaya@gmail.com">
                <button className="w-full lg:w-auto border border-black py-3 px-6 flex items-center justify-between gap-4 hover:bg-black hover:text-white transition-colors group">
                    <span>{t('craftsman.contact')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </a>

            <div className="w-full lg:w-auto mt-4">
              <GallerySidebar images={gallery} personName={personName} />
            </div>
          </div>
        </div>

        <section className="border border-black p-6 md:p-10 bg-[#F5F5F5]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">{t('craftsman.more_from')}</p>
              <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-1">{t('craftsman.village')}</h3>
              <p className="text-gray-500 text-lg">{t('craftsman.province')}</p>
            </div>
            
            <Link 
              href="/desa/craftsmen" 
              className="bg-[#2D2D2D] text-white px-8 py-3 flex items-center gap-6 hover:opacity-90 transition-opacity w-full md:w-auto justify-between md:justify-center"
            >
              <span className="text-sm font-medium border-b border-transparent hover:border-white">{t('craftsman.read_more')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {otherCraftsmen.map(({ data, thumbnail }) => {
               const [suggestionName, suggestionBiz] = data.name.split('/');
               return (
                <Link key={data.id} href={`/desa/craftsmen/${data.slug}`} className="group block border border-gray-300 bg-[#E5E5E5] hover:border-black transition-colors">
                  <div className="relative aspect-square overflow-hidden">
                    {thumbnail ? (
                      <Image 
                        src={thumbnail} 
                        alt={data.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Img</div>
                    )}
                  </div>
                  <div className="p-3 md:p-4 flex justify-between items-end min-h-[80px]">
                    <div className="flex flex-col w-full overflow-hidden">
                      <p className="font-medium text-sm md:text-base pr-2">{suggestionName?.trim()}</p>
                      <p className="text-gray-500 text-xs md:text-sm pr-2">{suggestionBiz?.trim() || 'Pengrajin'}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black flex-shrink-0 mb-1" />
                  </div>
                </Link>
               )
            })}
          </div>
        </section>
      </div>
    </main>
  );
}