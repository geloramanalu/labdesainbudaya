'use client';

import React from 'react';
import Image from 'next/image';
import SidebarAccordion from '@/components/SidebarAccordion';
import { usePathname } from 'next/navigation';

// to do: add subfilters for each filters
// artefak -> ?
// jenis material rotan -> Semua, Pitrit, Rotan Semi Poles, Rotan Sega, Rotan Jawitm ..., Lainnya
// jenis anyaman rotan -> Semua, Durno, Diamond Tengah, Double 3, ..., Lainnya
// alat produksi -> Semua, Gol Kayu, Gol Besi, Rool, ..., Lainnya
// pengembangan produk
const ARCHIVE_FILTERS = [
  { id: 'artefak', title: 'Artefak' },
  { id: 'jenis-anyaman', title: 'Jenis Anyaman' },
  { id: 'material-rotan', title: 'Material Rotan' },
  { id: 'alat-produksi', title: 'Alat Produksi' },
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
    { 
      label: 'History', 
      link: '/desa', 
      subItems: HISTORY_CONTENT 
    },
    { 
      label: 'Archive', 
      link: '/desa/archive',
      subItems: ARCHIVE_FILTERS
    },
    { label: 'Events', link: '/desa/events' },
    { label: 'Craftsmen', link: '/desa/craftsmen' },
    { label: 'Data Collection Team', link: '/desa/data-collection-team' },
  ];

  // 2. SIMPLIFY LOGIC to just finding the Active Label
  let activeLabel = '';

  if (pathname.startsWith('/desa/archive')) {
    activeLabel = 'Archive';
  } else if (pathname.startsWith('/desa/events')) {
    activeLabel = 'Events';
  } else if (pathname.startsWith('/desa/craftsmen')) {
    activeLabel = 'Craftsmen';
  } else if (pathname.startsWith('/desa/data-collection-team')) {
    activeLabel = 'Data Collection Team';
  } else {
    // fallback: If it's /desa or /desa/history (or any unmatched sub-route), default to History
    activeLabel = 'History';
  }

  return (
    <main className="min-h-screen bg-[#F2F2F2] font-sans text-[#2D2D2D]">
      <div className="relative w-full h-[60vh] xl:h-[40vh] overflow-hidden">
         <div className="absolute inset-0">
          <Image
            src="/homepage/desa-trangsan-card-thumbnail.png"
            alt="Desa Trangsan Craftsman"
            fill
            className="object-cover xl:object-[75%_25%] object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/60" />
        </div>
        <div className="absolute bottom-12 right-6 xl:bottom-24 xl:right-24 text-white text-right">
          <h1 className="text-5xl xl:text-8xl font-normal mb-2 font-raleway">Desa Trangsan</h1>
          <p className="text-lg xl:text-2xl font-light tracking-wide">Sukoharjo, Jawa Tengah</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row max-w-[1440px] mx-auto px-6 xl:px-12 py-12 xl:py-24 gap-12 xl:gap-0">
        <aside className="w-full xl:w-1/4 xl:sticky xl:top-32 h-fit z-20">
          <SidebarAccordion 
            key={activeLabel}
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