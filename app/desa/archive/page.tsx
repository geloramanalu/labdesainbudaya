'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ARCHIVE_ITEMS } from '@/data/archiveData';

const ArchivePage = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {ARCHIVE_ITEMS.map((item) => (
          <a 
            key={item.id} 
            href={item.link}
            className="group block border border-[#2D2D2D] bg-white transition-all duration-300"
          >
       
            <div className="relative aspect-square w-full border-[#2D2D2D]  p-2">
              <Image
                src={item.image}
                alt={item.title}
                width={275}
                height={319}

                className="object-cover" 
              />
            </div>

            {/* Content Area */}
            <div className="px-4 py-3 flex justify-between items-center bg-[#EFEFEF] group-hover:bg-[#2D2D2D] group-hover:text-white transition-colors duration-300">
              <span className="font-sans text-sm xl:text-base font-medium">
                {item.title}
              </span>
              <ArrowRight 
                size={18} 
                strokeWidth={1.5} 
                className="transform group-hover:translate-x-1 transition-transform duration-300" 
              />
            </div>
          </a>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button className="w-10 h-10 border border-[#2D2D2D] flex items-center justify-center hover:bg-[#2D2D2D] hover:text-white transition-colors">
          <ArrowRight className="rotate-180" size={20} />
        </button>
        <div className="flex gap-2">
            <div className="w-2 h-4 bg-[#2D2D2D]"></div>
            <div className="w-2 h-4 border border-[#2D2D2D]"></div>
            <div className="w-2 h-4 border border-[#2D2D2D]"></div>
            <div className="w-2 h-4 border border-[#2D2D2D]"></div>
        </div>
        <button className="w-10 h-10 bg-[#2D2D2D] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ArchivePage;