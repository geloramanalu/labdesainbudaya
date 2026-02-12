'use client'
import React, { Suspense } from 'react';
import Image from 'next/image';
import SidebarAccordion, { MenuItem } from '@/components/SidebarAccordion';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext'; 
import { HISTORY_DATA } from '@/data/historyData'; 
import { ARCHIVE_FILTERS } from '@/data/archiveFilter';
export default function DesaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, lang } = useLanguage();

  // 1. History Subitems (Anchors)
  // Maps to /desa#id
  const historySubItems: MenuItem[] = HISTORY_DATA.map(item => ({
    id: String(item.id),
    label: lang === 'EN' ? item.title_en : item.title_id,
    link: `/desa#${item.id}`, // Anchor link
    type: 'link'
  }));

  // 2. Prepare Archive Filters
  // We need to map the raw data to MenuItem structure if needed, or matches directly.
  // ARCHIVE_FILTERS structure: { id, label, subItems: [{id, label, type:'checkbox'}] }
  // This matches our MenuItem interface perfectly.
  const archiveSubItems: MenuItem[] = ARCHIVE_FILTERS.map(f => ({
      id: f.id,
      label: f.label, // or translate if needed using keys
      subItems: f.subItems.map(s => ({ ...s, type: 'checkbox' as const }))
  }));

  // 3. Define Main Menu
  const MENU_ITEMS: MenuItem[] = [
    { 
      id: "desa",
      label: t('desa.sidebar.history'), 
      link: '/desa', 
      subItems: historySubItems 
    },
    { 
      id: "arsip",
      label: t('desa.sidebar.archive'), 
      link: '/desa/archive',
      subItems: archiveSubItems // The Full Tree
    },
    { id:"events", label: t('desa.sidebar.events'), link: '/desa/events' },
    { id:"craftsmen", label: t('desa.sidebar.craftsmen'), link: '/desa/craftsmen' },
    { id:"team", label: t('desa.sidebar.team'), link: '/desa/data-collection-team' },
  ];

  // Logic to determine which section should be open by default
  const defaultOpenIds = [];
  if (pathname.startsWith('/desa/archive')) defaultOpenIds.push('arsip');
  else if (pathname === '/desa') defaultOpenIds.push('desa');
  
  // Also expand sub-categories if a filter is active? 
  // We can let the user expand them, or read search params here. 
  // For now, just keeping the main category open is sufficient.

  return (
    <main className="min-h-screen bg-[#F2F2F2] font-sans text-[#2D2D2D]">
      {/* HEADER */}
      <div className="relative w-full h-[60vh] xl:h-[40vh] overflow-hidden">
         <div className="absolute inset-0">
          <Image
            src="/homepage/desa-trangsan-card-thumbnail-hd-cropped.jpg"
            alt="Desa Trangsan"
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
           <p className="text-md font-light tracking-wide">{t('desa.scroll_more')}</p>
           {/* SVG Arrow */}
           <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.125 14.208C18.2875 14.4308 18.2382 14.7427 18.0146 14.9043L9.40625 21.126C9.40415 21.1275 9.40172 21.1286 9.39941 21.1299C9.31774 21.188 9.21818 21.2227 9.11035 21.2227C9.00179 21.2226 8.90227 21.1868 8.82031 21.1279C8.8188 21.1271 8.81684 21.127 8.81543 21.126L0.207031 14.9043C-0.0166728 14.7426 -0.0661341 14.4308 0.0966791 14.208C0.259673 13.9853 0.573093 13.9352 0.796874 14.0967L8.61035 19.7432L8.61035 0.5C8.61047 0.224011 8.83436 8.71394e-05 9.11035 -3.98226e-07C9.38642 -3.67387e-07 9.61023 0.223957 9.61035 0.5L9.61035 19.7451L17.4238 14.0967C17.6476 13.9349 17.9619 13.9852 18.125 14.208Z" fill="#EFEFEF"/>
           </svg>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row max-w-[1440px] mx-auto px-6 xl:px-12 py-12 xl:py-24 gap-12 xl:gap-0">
        <aside className="w-full xl:w-1/4 xl:sticky xl:top-32 h-fit z-20">
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded"/>}>
            <SidebarAccordion 
                key={lang} // Re-render on lang change
                items={MENU_ITEMS}
                defaultOpenIds={defaultOpenIds}
            />
          </Suspense>
        </aside>

        <div className="w-full xl:w-3/4 xl:pl-12">
          {children}
        </div>
      </div>
    </main>
  );
}