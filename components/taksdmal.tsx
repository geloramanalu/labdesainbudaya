

component/HomeView.tsx
debugging for initial loader animation

// wrapper for 
'use client';

import React, { useState, useEffect } from 'react';
import HomepageHero from "@/components/HomepageHero";
import HomeLoader from "@/components/HomeLoader";
import Link from "next/link";
import CardPublikasi from "@/components/CardPublikasi";
import Image from 'next/image';
import { ArrowRight } from "lucide-react";
import Desa from "@/components/Desa";
import { useLanguage } from '@/context/LanguageContext';

const renderWithBold = (text: string) => {
  if (!text) return "";
  const parts = text.split('**');
  return parts.map((part, index) => 
    index % 2 === 1 ? <span key={index} className="font-bold">{part}</span> : part
  );
};

const HomeView = () => {
    // uncomment for montage animation | current: still buggy
  const [heroAnimationStart, setHeroAnimationStart] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isChecking, setIsChecking] = useState(true); 

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("home-loaded");

    if (hasLoadedBefore) {
      setShowLoader(false);
      setHeroAnimationStart(true);
    } else {

      setShowLoader(true);
    }
    
    setIsChecking(false);
  }, []);

  if (isChecking) return null;
  return (
    <>
    {/* uncomment for montage animation | current: still buggy */}
      {showLoader && (
        <HomeLoader 
          onComplete={() => {
            setHeroAnimationStart(true);
            setTimeout(() => setShowLoader(false), 300);
          }} 
        />
      )} 
      <HomepageHero startAnimation={heroAnimationStart} />
      
      {/* <HomepageHero startAnimation={true}/> */}
      
      <Prakarsa />
      <Desa />
      <Publikasi />
      <CTAPesanBuku />
      <CTAKolaborasi />
    </>
  );
};

export default HomeView;

component/HomeLoader.tsx
'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const LOADER_IMAGES = [
  "/homepage/hero/hero-3.jpg", 
  "/homepage/hero/hero-2.jpg", 
  "/homepage/hero/hero-mobile.jpg", 
];

interface HomeLoaderProps {
  onComplete: () => void;
}

const HomeLoader = ({ onComplete }: HomeLoaderProps) => {
  const comp = useRef(null);
  const containerRef = useRef(null);
  const maskRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
           onComplete();
        }
      });

      // Prevent scrollbar shifting
      document.body.style.overflow = 'hidden';

      // INITIAL STATE
      // All masks height 0, except first one is 100% visible
      gsap.set(maskRefs.current, { height: "0%" });
      gsap.set(maskRefs.current[0], { height: "100%" });

      // PHASE 1: The "Wipe" Sequence (Top to Bottom)
      LOADER_IMAGES.forEach((_, index) => {
        if (index > 0) {
          tl.to(maskRefs.current[index], {
            height: "100%", // The mask expands down
            duration: 1.2,
            ease: "power4.inOut",
            delay: -0.4 
          });
        }
      });

      // PHASE 2: Immersive Expansion
      // Container grows, Image inside naturally follows because of h-full/w-full
      tl.to(containerRef.current, {
        width: "100%", 
        height: "100%", 
        duration: 1.5,
        ease: "expo.inOut", 
        delay: 0.2
      });

      // PHASE 3: Fade out
      tl.to(comp.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        pointerEvents: "none",
        onComplete: () => {
            document.body.style.overflow = ''; 
        }
      });

    }, comp);

    return () => {
        ctx.revert();
        document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={comp} className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      
      <div 
        ref={containerRef}
        // Initial size: 220px x 300px
        // Removed 'will-change' on width/height as it can sometimes cause blurriness on images during scale
        className="relative h-[300px] w-[420px] overflow-hidden bg-gray-200" 
      >
        {LOADER_IMAGES.map((src, index) => (
          // THE MASK DIV
          <div
            key={index}
            ref={(el) => { if (el) maskRefs.current[index] = el }}
            className="absolute top-0 left-0 w-full bg-gray-200 overflow-hidden "
            style={{ 
              zIndex: index + 10,
              // IMPORTANT: This ensures the mask *container* is always aligned top
              // so when height grows 0->100%, it reveals from top down.
            }} 
          >
            {/* THE IMAGE WRAPPER 
              Set to h-full relative to the MAIN CONTAINER (not the mask).
              We use a trick: 
              If the mask is 50% height, we still want the image to be 100% height of the parent
              so it doesn't look squashed.
            */}
            <div 
              className="relative w-full"
              style={{ 
                // This is the key fix for "fitting":
                // The image container must match the PARENT container size (220x300 or 100vwx100vh)
                // We force it to be 100% of the *containerRef*, not the mask.
                // Since the mask is absolute, we can use h-[300px] (initial) -> 100vh (final)? 
                // No, just use h-full of the closest relative parent.
                height: '100%', 
                // Since the mask cuts it off, we need the image to stay 'fixed' visually while mask moves.
                // But simply having h-full works if the mask is just a window.
                // Actually, for the wipe to look like a curtain, the image inside should probably be static.
                // Let's use the containerRef's height.
              }}
            >
               {/* For the expansion to match the Hero exactly:
                 It acts as 'h-full' of the containerRef.
                 When containerRef is 300px, image is 300px.
                 When containerRef is 100vh, image is 100vh.
               */}
               <div className="relative w-full h-full min-h-[300px]"> 
                  <Image
                    src={src}
                    alt={`loader-${index}`}
                    fill
                    // CHANGED: Match HomepageHero exactly
                    className="object-cover object-center" 
                    priority
                  />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLoader;

app/page.tsx
import HomeView from "@/components/HomeView"; // client wrapper
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab Desain Budaya | Home",
  description: "Digital Archive and Exhibition Platform for Trangsan Village Crafts",
  openGraph: {
    images: ['/og-image.jpg'],
  },
};

export default function Home() {
  return (
    <main>
      <HomeView />
    </main>
  );
}

issue: after third image montage expanded, right before the text "Labdesainbudaya", "01 / Research
02 / Archive
03 / Innovate
The Cultural Design Lab is a collaborative space that focuses on developing designs based on local potential in Indonesia, especially in Central Java.
Read more about us" 

text is animating and showing, it blinks into the montage before (three image wiped down) before the animation of the text in homepage hero started
hyphothesis: the issue is after the montage after setHeroAnimationStart is became false or true

goal: i need to get rid of the blink because its really disturbing the experience while firstime opening the website. investigate the root cause, breakdown ways to test which is the root cause



'''

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