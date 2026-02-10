'use client';
// component to handle client-side logic, let alone slug page handle server logic
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GallerySidebarProps {
  images: string[];
  personName: string;
}

export default function GallerySidebar({ images, personName }: GallerySidebarProps) {
  if (!images || images.length < 2) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const firstImage = images[currentIndex];
  const secondImage = images[(currentIndex + 1) % images.length];
  
  const currentView = [firstImage, secondImage];

  return (
    // initially component container w-full for desktop, but need to hardcode to make adjust size of gallery to be reflected in UI
    <div className="w-full xl:w-[200px]">
      {/* Grid of 2 Images */}
      <div className="grid grid-cols-2 gap-4">
        {currentView.map((img, idx) => (
          // fix: removed fixed w-[150px]. Used aspect-square and w-full.
          <div 
            key={`${currentIndex}-${idx}`} 
            className="relative w-full aspect-square border border-black bg-white"
          >
            {/* image now fills the border box completely */}
            <Image 
              src={img} 
              alt={`${personName} detail ${currentIndex + idx + 1}`} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 20vw" 
            />
          </div>
        ))}
      </div>

      {/* navigation Arrows (Only show if we actually have more than 2 images to cycle through) */}
      {images.length > 2 && (
        <div className="flex justify-between mt-4">
          <button 
            onClick={prevSlide}
            className="p-1 border border-black hover:bg-black hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          {/* <span className="text-xs self-center text-gray-400">
             {currentIndex + 1} / {images.length}
          </span> */}

          <button 
            onClick={nextSlide}
            className="p-1 border border-black hover:bg-black hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}