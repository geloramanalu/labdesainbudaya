'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ArchiveImageGallery from './ArchiveImageGallery';
import { ArchiveItem } from '@/data/archiveData'; 

interface ArchiveClientProps {
  item: ArchiveItem;
  thumbnail: string | null;
  gallery: string[];
  otherItems: {
    data: ArchiveItem;
    thumbnail: string | null;
  }[];
}

export default function ArchiveClient({ 
  item, 
  thumbnail, 
  gallery, 
  otherItems 
}: ArchiveClientProps) {

  const { lang, t } = useLanguage();

  // 1. Description still switches languages
  const description = lang === 'EN' && item.description_en ? item.description_en : item.description_id;
  
  // 2. Title is ALWAYS the default (Indonesian) title from the data
  const title = item.title; 

  return (
    <main className="min-h-screen text-[#2D2D2D]">
      <div className="mx-auto px-4 md:px-8 py-8 md:py-16">
        
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          
          <div className="lg:col-span-4 flex flex-col order-1">
            <h1 className="text-5xl lg:text-7xl font-medium mb-6 tracking-tight">
              {title}
            </h1>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base text-justify">
              <p>{description}</p>
            </div>

            <div className="mt-10 space-y-6">
              {item.type_anyaman && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-bold">{t('archive.type_weave')}</h4>
                  <p className="font-medium">{item.type_anyaman}</p>
                </div>
              )}
              {item.material_rotan && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-bold">
                    {t('archive.material')} ({item.material_rotan.type})
                  </h4>
                  <p className="text-sm text-gray-600">
                    {lang === 'EN' && item.material_rotan.detail_en 
                      ? item.material_rotan.detail_en 
                      : item.material_rotan.detail_id}
                  </p>
                </div>
              )}
              {item.alat_produksi && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-bold">
                    {t('archive.tool')}: {item.alat_produksi.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                     {lang === 'EN' && item.alat_produksi.detail_en 
                      ? item.alat_produksi.detail_en 
                      : item.alat_produksi.detail_id}
                  </p>
                </div>
              )}
            </div>
          </div>

          <ArchiveImageGallery 
            initialImage={thumbnail} 
            gallery={gallery} 
            title={title} 
          />

          <div className="lg:col-span-4 lg:col-start-9 flex flex-col order-4">
             <div className="mt-auto border-t border-black pt-6">
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">{t('archive.design_dev')}</h4>
              <p className="font-medium text-xl">{item.pengembangan_desain || "-"}</p>
            </div>
          </div>
        </div>

        <section className="border border-black p-6 md:p-10 bg-[#F5F5F5]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">{t('archive.more_collection')}</p>
              <h3 className="text-4xl md:text-5xl font-medium tracking-tight">{t('desa.title')}</h3>
            </div>
            <Link href="/desa/archive" className="bg-[#2D2D2D] text-white px-8 py-3 flex items-center gap-6 hover:opacity-90 transition-opacity group group-hover:bg-[#1d1d1d]">
              <span className="text-sm font-medium group-hover:text-[#1d1d1d]">{t('archive.view_all')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {otherItems.map(({ data, thumbnail }) => {
               const otherTitle = data.title;
               
               return (
                <Link key={data.id} href={`/desa/archive/${data.slug}`} className="group block border border-gray-300 hover:border-black transition-colors">
                  <div className="relative aspect-square overflow-hidden bg-gray-200">
                    {thumbnail ? (
                      <Image src={thumbnail} alt={data.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                    )}
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <p className="font-medium text-sm truncate">{otherTitle}</p>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black shrink-0" />
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