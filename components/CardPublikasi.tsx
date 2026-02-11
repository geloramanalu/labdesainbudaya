'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CardPublikasiProps {
  title: string;
  type: string; // e.g., 'jurnal', 'artikel'
  year: string | number;
  url: string;
  imageSrc: string;
}

const CardPublikasi = ({ title, type, year, url, imageSrc }: CardPublikasiProps) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block group"
    >
      <div className="flex flex-col gap-4 xl:w-84 w-72 h-[375px] mx-auto border border-black p-2 justify-between hover:bg-[#2d2d2d] transition-colors duration-300">
        
        <div className="flex flex-col gap-2">
          <div className="relative overflow-hidden w-full h-[163px]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover border border-black grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <h3 className="font-raleway font-bold text-md xl:text-lg leading-snug text-[#2d2d2d] group-hover:text-white line-clamp-4">
            {title}
          </h3>
        </div>

        <div>
          <div className="mt-2 w-full mx-auto flex justify-between items-center border-t border-transparent pt-2">
            <p className="font-bold font-raleway text-lg text-[#2d2d2d] group-hover:text-white">
              {year}/ <span className="text-[#8D8D8D] font-medium text-base">{type}</span>
            </p>
            <div className="transform group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white">
              <ArrowRight size={20} strokeWidth={1} />
            </div>
          </div>
        </div>

      </div>
    </a>
  );
};

export default CardPublikasi;