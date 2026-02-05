'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HeroCardProps {
  title: string;
  desc: string;
  picture: string;
}

const HeroCard = ({ title, desc, picture }: HeroCardProps) => {
  return (
    <div className="flex flex-col-reverse xl:flex-row w-full max-w-sm xl:max-w-6xl mx-auto border border-black bg-[#F2F2F2]">

      <div className="flex flex-col justify-center p-6 xl:pb-4 xl:pt-2 gap-4 xl:p-8 xl:w-[28%] xl:gap-6 shrink-0">
        <h1 className="text-3xl font-bold text-center text-[#2d2d2d] xl:text-5xl xl:font-normal xl:tracking-tight xl:text-left">
          {title}
        </h1>
        
        <p className="text-[#333] text-center text-base leading-relaxed xl:text-left xl:text-base xl:font-light">
          {desc}
        </p>
        
        <div className="mt-5 xl:mt-8 w-full flex justify-center xl:block">
          <Link href='/desa'>
            <div className="border border-[#2d2d2d] py-2 px-4 w-[248px] xl:w-full flex justify-between items-center group cursor-pointer hover:bg-[#2d2d2d] transition-colors duration-300">
              <p className="group-hover:cursor-pointer font-raleway text-lg xl:text-base group-hover:text-white transition-colors duration-300" >
                Read more
              </p>
              <ArrowRight size={20} strokeWidth={1} className="group-hover:text-white transition-colors duration-300" />
            </div>
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[330px] border-b border-black xl:w-[72%] xl:h-[550px] xl:border-b-0 xl:border-l overflow-hidden">
        <Image
          src={picture}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

    </div>
  );
};

export default HeroCard;