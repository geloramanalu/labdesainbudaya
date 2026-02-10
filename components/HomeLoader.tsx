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