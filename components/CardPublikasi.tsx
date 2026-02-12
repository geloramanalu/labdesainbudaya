'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CardPublikasiProps {
  title: string;
  type: string; 
  year: number;
  url: string;
  imageSrc: string;
}

const CardPublikasi = ({ title, type, year, url, imageSrc }: CardPublikasiProps) => {
  const isDisabled = url === '#';

  const Wrapper = isDisabled ? 'div' : 'a';
  
  const wrapperProps = isDisabled 
    ? {} 
    : { href: url, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper 
      {...wrapperProps}
      className="block group"
    >
      <div 
        className={`
          flex flex-col gap-4 xl:w-84 w-72 h-[375px] mx-auto border p-2 justify-between transition-colors duration-300
          ${isDisabled 
            ? 'border-gray-400 opacity-60 cursor-not-allowed bg-transparent' // Disabled Styles
            : 'border-black hover:bg-[#2d2d2d] cursor-pointer'               // Active Styles
          }
        `}
      >
        
        <div className="flex flex-col gap-2">
          <div className="relative overflow-hidden w-full h-[163px]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className={`
                object-cover border transition-all duration-300
                ${isDisabled 
                  ? 'border-gray-400 grayscale' 
                  : 'border-black grayscale group-hover:grayscale-0'
                }
              `}
            />
          </div>
          <h3 
            className={`
              font-raleway font-bold text-md xl:text-lg leading-snug line-clamp-4 transition-colors duration-300
              ${isDisabled 
                ? 'text-gray-600' 
                : 'text-[#2d2d2d] group-hover:text-white'
              }
            `}
          >
            {title}
          </h3>
        </div>

        <div>
          <div className="mt-2 w-full mx-auto flex justify-between items-center border-t border-transparent pt-2">
            <p 
              className={`
                font-bold font-raleway text-lg transition-colors duration-300
                ${isDisabled 
                  ? 'text-gray-600' 
                  : 'text-[#2d2d2d] group-hover:text-white'
                }
              `}
            >
              {year}/ <span className={`${isDisabled ? 'text-gray-500' : 'text-[#8D8D8D]'} font-medium text-base`}>{type}</span>
            </p>
            <div 
              className={`
                transition-transform duration-300
                ${isDisabled 
                  ? 'text-gray-400' 
                  : 'transform group-hover:translate-x-1 group-hover:text-white'
                }
              `}
            >
              <ArrowRight size={20} strokeWidth={1} />
            </div>
          </div>
        </div>

      </div>
    </Wrapper>
  );
};

export default CardPublikasi;