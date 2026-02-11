'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext'; 

const HERO_IMAGES = [
  "/homepage/hero/hero-mobile.jpg",
  "/homepage/hero/hero-2.jpg",
  "/homepage/hero/hero-3.jpg",
  "/homepage/hero/hero-4.jpg",
  "/homepage/hero/hero-5.jpg",
  "/homepage/hero/hero-6.jpg",
];

interface HomepageHeroProps {
  startAnimation?: boolean;
}

// helper to render bold text from "**text**" pattern
const renderWithBold = (text: string) => {
  if (!text) return "";
  const parts = text.split('**');
  return parts.map((part, index) => 
    index % 2 === 1 ? <span key={index} className="font-bold">{part}</span> : part
  );
};

const HomepageHero = ({ startAnimation = false }: HomepageHeroProps) => {
  const { t } = useLanguage();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const heroTextRef = useRef(null);
  const heroNavRef = useRef(null);
  const heroDecorRef = useRef(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // ANIMATION LOGIC
  useEffect(() => {
    if (startAnimation) {
      const tl = gsap.timeline();

      // 1. Reveal Main Text
      tl.fromTo(".hero-text-span", 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // 2. Reveal Nav
      tl.fromTo(heroNavRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );

      // 3. Reveal Decor
      tl.fromTo(heroDecorRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1.5, opacity: 0.9, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );
    }
  }, [startAnimation]);

  const rectPositions = [0, 17.5, 34.5, 51.5, 68.5, 85.5];

  return (
    <div className="relative h-screen w-full overflow-hidden text-white font-sans">
      <div className="absolute inset-0 -z-20" ref={emblaRef}>
        <div className="flex h-full w-full">
          {HERO_IMAGES.map((src, index) => (
            <div className="relative flex-[0_0_100%] h-full w-full min-w-0" key={index}>
              <Image
                src={src}
                alt={`Hero background ${index + 1}`}
                fill
                className="object-cover object-center xl:object-center"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-[60%] -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.7) 53.36%, rgba(45, 45, 45, 0.7) 100%)'
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-between xl:flex-row xl:items-center w-full h-full pb-10 pt-24 xl:py-24 pointer-events-none"> 
        <div className="flex flex-col items-center xl:items-start xl:pl-[92px] gap-8 w-full xl:w-1/2 xl:h-full xl:justify-between pointer-events-auto">
          <h1 ref={heroTextRef} className="text-5xl leading-[1.1] tracking-wide text-center xl:text-left xl:text-[100px] 2xl:text-[120px] xl:leading-[0.9] xl:font-thin xl:tracking-tighter overflow-hidden">
            <span className="hero-text-span block opacity-0">Lab</span>
            <span className="hero-text-span block opacity-0">Desain</span>
            <span className="hero-text-span block opacity-0">Budaya</span>
          </h1>

          <div ref={heroDecorRef} className="hidden xl:block scale-150 origin-left opacity-0">
             <svg width="95" height="45" viewBox="0 0 95 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                {rectPositions.map((xPos, index) => {
                  const isActive = index === selectedIndex;
                  return (
                    <rect 
                      key={index}
                      x={isActive ? xPos : xPos} 
                      y={isActive ? 0 : 0.5} 
                      width={isActive ? 10 : 9} 
                      height={isActive ? 45 : 44} 
                      fill={isActive ? "#EFEFEF" : "transparent"} 
                      stroke={isActive ? "none" : "#EFEFEF"}
                      className="transition-all duration-500 ease-in-out"
                    />
                  );
                })}
            </svg>
          </div>
        </div>

        <div ref={heroNavRef} className="flex flex-col gap-6 px-6 xl:px-0 xl:pr-[92px] xl:items-end xl:text-right w-full xl:w-1/2 xl:h-full xl:justify-end pointer-events-auto opacity-0">
          <div className="flex justify-around w-full font-raleway text-lg xl:flex-col xl:gap-2 xl:text-4xl xl:tracking-tight xl:w-auto xl:mb-4">
            <h3 className="">01 / Research </h3>
            <h3 className="">02 / Archive </h3>
            <h3 className="">03 / Innovate </h3>
          </div>

          <p className="text-center text-sm leading-relaxed xl:text-right xl:text-base xl:max-w-md opacity-90">
            
            {renderWithBold(t('homepage.hero.description'))}
          </p>

          <Link href='/about' className="mx-auto xl:mx-0">
            <div className="group flex items-center justify-between gap-4 border border-white/50 bg-transparent py-1 px-4 transition-all hover:bg-white hover:text-black hover:border-white">
              <span className="font-raleway tracking-wider">Read more about us</span>
              <ArrowRight size={18} strokeWidth={1} className="transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;