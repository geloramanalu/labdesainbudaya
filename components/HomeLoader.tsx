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
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Timeline Setup with initial delay
      const tl = gsap.timeline({
        delay: 0.5
      });

      document.body.style.overflow = 'hidden';

      // --- INITIAL SETUP ---
      gsap.set(wrapperRefs.current, { height: "0%", zIndex: 1 });

      // --- PHASE 1: THE MONTAGE ---
      LOADER_IMAGES.forEach((_, index) => {
        gsap.set(wrapperRefs.current[index], { zIndex: index + 1 });

        tl.to(wrapperRefs.current[index], {
          height: "100%", 
          duration: 1.8, 
          ease: "power4.inOut",
          delay: index === 0 ? 0 : -0.6 
        });
      });

      // --- PHASE 2: EXPANSION ---
      tl.to(containerRef.current, {
        width: "100%", 
        height: "100%", 
        duration: 1,
        ease: "expo.inOut", 
        delay: 0.2
      });

      // --- PHASE 3: TRIGGER HERO ---
      tl.call(onComplete);

      // --- PHASE 4: FADE OUT ---
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
        // FIX: Use .kill() instead of .revert()
        // .revert() resets inline styles to blank (causing the flash).
        // .kill() just stops the GSAP engine but leaves the element at opacity: 0.
        ctx.kill(); 
        document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div ref={comp} className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div 
        ref={containerRef}
        className="relative h-[300px] w-[420px] overflow-hidden bg-white " 
      >
        {LOADER_IMAGES.map((src, index) => (
          <div
            key={index}
            ref={(el) => { if (el) wrapperRefs.current[index] = el }}
            className="absolute top-0 left-0 w-full bg-white overflow-hidden"
            style={{ zIndex: index + 10 }} 
          >
            <div 
              className="relative w-full"
              style={{ height: '100%' }}
            >
               <div className="relative w-full h-full min-h-[300px]"> 
                  <Image
                    src={src}
                    alt={`loader-${index}`}
                    fill
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