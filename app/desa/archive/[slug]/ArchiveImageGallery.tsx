'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  initialImage: string | null;
  gallery: string[];
  title: string;
}

export default function ArchiveImageGallery({ initialImage, gallery, title }: Props) {
  const allImages = initialImage ? [initialImage, ...gallery] : gallery;
  const [activeImage, setActiveImage] = useState(initialImage || gallery[0] || null);
    console.log(gallery)
  return (
    <>
      <div className="lg:col-span-4 order-2">
        <div className="relative aspect-[3/4] w-full overflow-hidden border border-black transition-all duration-500">
          {activeImage ? (
            <Image
              src={activeImage}
              alt={title}
              fill
              className="object-cover transition-opacity duration-300"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-8 order-3">
        <div className="grid grid-cols-3 gap-4 w-full">
          {allImages.length > 0 ? (
            allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-full aspect-square border overflow-hidden transition-all duration-300 group ${
                  activeImage === img ? 'border-black ring-1 ring-black' : 'border-transparent hover:border-gray-400'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${title} view ${idx + 1}`}
                    fill
                    className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                      activeImage === img ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                    }`}
                  />
                </div>
              </button>
            ))
          ) : (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="aspect-square border border-black bg-gray-50 flex items-center justify-center text-xs text-gray-300 uppercase">
                Empty
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}