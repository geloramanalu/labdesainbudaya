'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import SidebarAccordion from '@/components/SidebarAccordion';

const HISTORY_CONTENT = [
  {
    id: 'sejarah-awal',
    title: 'Sejarah Awal (Sebelum tahun 1910)',
    content: 'Masyarakat Desa Trangsan mayoritas menjadi pengrajin kerajinan bambu. Produk yang dihasilkan berupa perabotan rumah tangga sederhana, alat pertanian, dan anyaman tradisional.'
  },
  {
    id: 'awal-masuk',
    title: 'Awal Masuknya Rotan (1910-1937)',
    content: 'Sekitar tahun 1910, pengrajin yang berasal dari Cirebon memberikan pengaruh dengan memperkenalkan rotan ke Desa Trangsan. Masyarakat mulai banyak yang menjadi pengrajin rotan dan Desa Trangsan sudah masuk ke koran Belanda/Eropa berkat perkembangan dan popularitas dari kerajinan rotan yang dibuat pada tahun 1927.\n\nPerkembangan rotan di Trangsan tidak lepas dari sosok Ki Demang Wongso Laksono yang merupakan seorang abdi dalem Keraton Kasunanan Surakarta. Ia mengenalkan kerajinan rotan saat diutus untuk mendampingi rombongan Keraton Surakarta di Madura pada tahun 1937. Ki Demang membawa pulang beberapa batang rotan ke Trangsan dan kemudian mulai membuat topi krop (topi yang dianyam menggunakan rotan) dan beberapa kerajinan.'
  },
  {
    id: 'pewarisan',
    title: 'Pewarisan dan Tradisi Pengrajin (1940-1965)',
    content: 'Tahun 1940 sebagian besar warga Desa Trangsan masih berprofesi sebagai petani, tetapi kerajinan rotan mulai berkembang sebagai usaha sampingan. Ketika Ki Demang meninggal pada tahun 1948, usaha kerajinan diteruskan oleh murid-muridnya.\n\nPada tahun 1965 rotan berukuran besar mulai memasuki Desa Trangsan, tetapi masyarakat masih lebih terbiasa menggunakan bambu. Produksi masih menggunakan \'blarak\' yang kemudian menggunakan kompor minyak untuk membentuk/membengkokkan.'
  },
  {
    id: 'pembinaan',
    title: 'Pembinaan dan Awal Modernisasi (1975-1985)',
    content: 'Tahun 1975 pemerintah mulai melakukan binaan pada para pengrajin dan dilatik membuat beberapa produk. Kemudian pada tahun 1976 terdapat pembinaan dari pembeli asing oleh lembaga CJEDP yang dikelola oleh pihak Belanda. Pengrajin Trangsan juga melakukan studi banding ke Cirebon oleh Departemen Perindustrian yang menghasilkan variasi produk meningkat dan teknik pengerjaan semakin halus.'
  },
  {
    id: 'era-berkembang',
    title: 'Era Berkembang dan Ekspor (1986-2000 an)',
    content: 'Pada tahun 1986-1987 Kerajinan rotan mulai berkembang karena BAPPEDA JATENG memberikan pelatihan dan mendatangkan ahli dari Filipina untuk mengajarkan standar produk eksplor. Pertama kali melakukan ekspor produk rotan yang berawal dari koneksi Pemda perindustrian dan perdagangan serta melalui pameran yang diadakan di Jakarta. Periode 1990-an sekitar 90% produksinya berhasil di ekspor dan menjadikan desa ini salah satu sentra furnitur rotan terbesar di Indonesia.'
  },
  {
    id: 'adaptasi',
    title: 'Adaptasi dan Tren Global (2005-Sekarang)',
    content: 'Pengrajin menghadapi tantangan global seperti kenaikan harga bahan baku dan persaingan dari negara Asia lain, tetapi inovasi tetap berlanjut dengan penyesuaian terhadap selera pasar Internasional. Saat ini, buyer tidak hanya membeli produk jadi, tetapi juga memberikan ide desain dan nantinya akan dibuat oleh pengrajin.'
  }
];

const Desa = () => {
  return (
    <main className="min-h-screen bg-[#F2F2F2] font-sans text-[#2D2D2D]">

      <div className="flex flex-col xl:flex-row max-w-[1440px] ">

        <div className="">
          <div className="flex flex-col gap-16 xl:gap-24">
            {HISTORY_CONTENT.map((item) => (
              <div 
                key={item.id} 
                id={item.id}
                className="scroll-mt-32 flex flex-col xl:grid xl:grid-cols-3 gap-4 xl:gap-12 pb-12 border-b border-[#2D2D2D]/20 last:border-0"
              >
                <div className="xl:col-span-1">
                  <h2 className="text-3xl xl:text-4xl font-normal leading-tight text-[#2D2D2D]">
                    {item.title}
                  </h2>
                </div>

                <div className="xl:col-span-2">
                  <p className="text-sm xl:text-base leading-relaxed text-[#2D2D2D] font-light whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </main>
  );
};

export default Desa;