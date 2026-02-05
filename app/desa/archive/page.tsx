'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { ARCHIVE_ITEMS } from '@/data/archiveData';

const ArchivePage = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Grid Container */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 p-4 border">
        {ARCHIVE_ITEMS.map((item) => (
          <a 
            key={item.id}
            href={item.link}
            className="group block border border-[#2D2D2D] bg-transparent hover:bg-[#2D2D2D] transition-all duration-300"
          >
          
            <div className="relative w-full aspect-275/319  ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain p-4"
              />
            </div>

            <div className="px-4 pb-3 flex justify-between items-center transition-colors duration-300  group-hover:text-white">
              <span className="font-raleway text-lg xl:text-2xl font-medium">
                {item.title}
              </span>
              <ArrowRight 
                size={18} 
                strokeWidth={1.5} 
                className="transform transition-transform duration-300 group-hover:translate-x-1" 
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