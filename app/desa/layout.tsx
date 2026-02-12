'use client';

import React from 'react';
import Image from 'next/image';
import SidebarAccordion from '@/components/SidebarAccordion';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext'; 
import { HISTORY_DATA } from '@/data/historyData'; 

export default function DesaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, lang } = useLanguage();

  const historySubItems = HISTORY_DATA.map(item => ({
    id: item.id,
    title: lang === 'EN' ? item.title_en : item.title_id
  }));
  const isDetailPage = 
    pathname.startsWith('/desa/archive/') || 
    pathname.startsWith('/desa/craftsmen/') || 
    pathname.startsWith('/desa/events/');


  const archiveFilters = [
    { id: 'artefak', title: t('desa.filters.artifact') },
    { id: 'jenis-anyaman', title: t('desa.filters.weave_type') },
    { id: 'material-rotan', title: t('desa.filters.material') },
    { id: 'alat-produksi', title: t('desa.filters.tool') },
    { id: 'pengembangan-produk', title: t('desa.filters.product_dev') },
  ];
  const MENU_ITEMS = [
    { 
      label: t('desa.sidebar.history'), 
      link: '/desa', 
      subItems: historySubItems 
    },
    { 
      label: t('desa.sidebar.archive'), 
      link: '/desa/archive',
      subItems: archiveFilters
    },
    { label: t('desa.sidebar.events'), link: '/desa/events' },
    { label: t('desa.sidebar.craftsmen'), link: '/desa/craftsmen' },
    { label: t('desa.sidebar.team'), link: '/desa/data-collection-team' },
  ];

  let activeLabel = '';
  if (pathname.startsWith('/desa/archive')) {
    activeLabel = t('desa.sidebar.archive');
  } else if (pathname.startsWith('/desa/events')) {
    activeLabel = t('desa.sidebar.events');
  } else if (pathname.startsWith('/desa/craftsmen')) {
    activeLabel = t('desa.sidebar.craftsmen');
  } else if (pathname.startsWith('/desa/data-collection-team')) {
    activeLabel = t('desa.sidebar.team');
  } else {
    activeLabel = t('desa.sidebar.history');
  }

  return (
    <main className="min-h-screen bg-[#F2F2F2] font-sans text-[#2D2D2D]">
      <div className="relative w-full h-[60vh] xl:h-[40vh] overflow-hidden">
         <div className="absolute inset-0">
          <Image
            src="/homepage/desa-trangsan-card-thumbnail-hd-cropped.jpg"
            alt="Desa Trangsan Craftsman"
            fill
            className="object-cover xl:object-[25%_75%] object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/60" />
        </div>
        
        <div className="absolute bottom-24 right-6 xl:bottom-32 xl:right-24 text-white text-right">

          <h1 className="text-5xl xl:text-6xl font-bold mb-2 font-raleway">{t('desa.title')}</h1>
          <p className="text-lg xl:text-2xl font-light tracking-wide">{t('desa.location')}</p>
        </div>
        
        
        <div className='absolute bottom-12 flex right-6 xl:bottom-16 xl:right-24 text-white text-right items-center gap-8'>

          {/* <p className="text-lg xl:text-2xl font-light tracking-wide">{t('desa.scroll_more')}</p> */}
          <p className="text-md font-light tracking-wide">{t('desa.scroll_more')}</p>

          <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.125 14.208C18.2875 14.4308 18.2382 14.7427 18.0146 14.9043L9.40625 21.126C9.40415 21.1275 9.40172 21.1286 9.39941 21.1299C9.31774 21.188 9.21818 21.2227 9.11035 21.2227C9.00179 21.2226 8.90227 21.1868 8.82031 21.1279C8.8188 21.1271 8.81684 21.127 8.81543 21.126L0.207031 14.9043C-0.0166728 14.7426 -0.0661341 14.4308 0.0966791 14.208C0.259673 13.9853 0.573093 13.9352 0.796874 14.0967L8.61035 19.7432L8.61035 0.5C8.61047 0.224011 8.83436 8.71394e-05 9.11035 -3.98226e-07C9.38642 -3.67387e-07 9.61023 0.223957 9.61035 0.5L9.61035 19.7451L17.4238 14.0967C17.6476 13.9349 17.9619 13.9852 18.125 14.208Z" fill="#EFEFEF"/>
          </svg>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row max-w-[1440px] mx-auto px-6 xl:px-12 py-12 xl:py-24 gap-12 xl:gap-0">
        <aside className="w-full xl:w-1/4 xl:sticky xl:top-32 h-fit z-20">
          <SidebarAccordion 
            key={`${activeLabel}-${lang}`} // Key penting agar re-render saat bahasa berubah
            items={MENU_ITEMS}
            activeLabel={activeLabel}
          />
        </aside>

        <div className="w-full xl:w-3/4 xl:pl-12">
          {children}
        </div>
      </div>
    </main>
  );
}