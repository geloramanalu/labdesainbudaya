'use client';

import React from 'react';
import { MoveUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext'; // 1. Import Context
import { HISTORY_DATA } from '@/data/historyData'; 

const Desa = () => {
  const { lang } = useLanguage(); 

  const scrollToTop = () => {
    const element = document.getElementById('history-top');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <main id="history-top" className="min-h-screen bg-[#F2F2F2] font-sans text-[#2D2D2D] scroll-mt-32">

      <div className="flex flex-col xl:flex-row max-w-[1440px] ">

        <div className="border p-6 xl:-ml-[1px]">
          <div className="flex flex-col gap-10 xl:gap-20">
            {HISTORY_DATA.map((item) => {
              
              // 4. Logika pemilihan bahasa
              const title = lang === 'EN' ? item.title_en : item.title_id;
              const content = lang === 'EN' ? item.content_en : item.content_id;

              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-32 flex flex-col xl:grid xl:grid-cols-3 gap-4"
                >
                  <div className="xl:col-span-1">
                    <h2 className="text-3xl xl:text-4xl font-raleway font-bold leading-tight text-[#2D2D2D]">
                      {title}
                    </h2>
                  </div>

                  <div className="xl:col-span-2">
                    {/* whitespace-pre-line penting agar \n\n terbaca sebagai enter */}
                    <p className="text-sm xl:text-base leading-relaxed text-[#2D2D2D] font-light whitespace-pre-line">
                      {content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div 
        onClick={scrollToTop} 
        className='w-[45px] h-[45px] border flex items-center justify-center mx-auto mt-4 cursor-pointer hover:bg-[#2d2d2d] hover:text-white transition-colors group'
      >
        <MoveUp strokeWidth={0.5} />
      </div>

    </main>
  );
};

export default Desa;