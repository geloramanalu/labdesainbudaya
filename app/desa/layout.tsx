'use client';

import React from 'react';
import Image from 'next/image';
import SidebarAccordion from '@/components/SidebarAccordion';
import { usePathname } from 'next/navigation';

const ARCHIVE_CATEGORIES = [
  { id: 'artefak', title: 'Artefak' },
  { id: 'jenis-anyaman', title: 'Jenis Anyaman' },
  { id: 'material-rotan', title: 'Material Rotan' },
  { id: 'alat', title: 'Alat' },
  { id: 'pengembangan-produk', title: 'Pengembangan Produk' },
];

const HISTORY_CONTENT = [
  { id: 'sejarah-awal', title: 'Sejarah Awal (Sebelum tahun 1910)' },
  { id: 'awal-masuk', title: 'Awal Masuknya Rotan (1910-1937)' },
  { id: 'pewarisan', title: 'Pewarisan dan Tradisi Pengrajin (1940-1965)' },
  { id: 'pembinaan', title: 'Pembinaan dan Awal Modernisasi (1975-1985)' },
  { id: 'era-berkembang', title: 'Era Berkembang dan Ekspor (1986-2000 an)' },
  { id: 'adaptasi', title: 'Adaptasi dan Tren Global (2005-Sekarang)' }
];

export default function DesaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const MENU_ITEMS = [
    { label: 'History', link: '/desa' },
    { label: 'Archive', link: '/desa/archive' },
    { label: 'Events', link: '/desa/events' },
    { label: 'Craftsmen', link: '/desa/craftsmen' },
    { label: 'Data Collection Team', link: '/desa/data-collection-team' },
  ];

  const isArchive = pathname.startsWith('/desa/archive');
  const isEvents = pathname.startsWith('/desa/events');
  const isCraftsmen = pathname.startsWith('/desa/craftsmen');
  const isTeam = pathname.startsWith('/desa/data-collection-team');
  const isHistory = pathname === '/desa' || pathname === '/desa/history';

  let activeLabel = '';
  let subItems: { id: string, title: string }[] = [];

  if (isArchive) {
    activeLabel = 'Archive';
    subItems = ARCHIVE_CATEGORIES;
  } else if (isEvents) {
    activeLabel = 'Events';
    subItems = []; // add events sub-items here when you have them
  } else if (isCraftsmen) {
    activeLabel = 'Craftsmen';
    subItems = []; // Add craftsmen sub-items here
  } else if (isTeam) {
    activeLabel = 'Data Collection Team';
    subItems = []; // Add Team sub-items here 
  } else if (isHistory) {
    activeLabel = 'History';
    subItems = HISTORY_CONTENT;
  }

  return (
    <main className="min-h-screen bg-[#F2F2F2] font-sans text-[#2D2D2D]">
      <div className="relative w-full h-[60vh] xl:h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/homepage/desa-trangsan-card-thumbnail.png"
            alt="Desa Trangsan Craftsman"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/60" />
        </div>
        <div className="absolute bottom-12 right-6 xl:bottom-24 xl:right-24 text-white text-right">
          <h1 className="text-5xl xl:text-8xl font-normal mb-2 font-raleway">Desa Trangsan</h1>
          <p className="text-lg xl:text-2xl font-light tracking-wide">Sukoharjo, Jawa Tengah</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row max-w-[1440px] mx-auto xl:px-12 py-12 xl:py-24 gap-12 xl:gap-0">
        <aside className="w-full xl:w-1/4 xl:sticky xl:top-32 h-fit px-0 xl:px-0 z-20">
          <SidebarAccordion 
            items={MENU_ITEMS}
            activeLabel={activeLabel}
            subItems={subItems}
          />
        </aside>

        <div className="w-full xl:w-3/4 px-6 xl:px-0">
          {children}
        </div>
      </div>
    </main>
  );
}