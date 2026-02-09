'use client';

import { useState } from 'react';
import HorizontalCard from '@/components/HorizontalCard';
import { ArrowRight } from 'lucide-react';

// Define the shape of data we need
interface CraftsmanItem {
  id: number;
  name: string;
  slug: string;
  thumbnail: string | null;
}

const ITEMS_PER_PAGE = 9; // Number of items to show initially

const CraftsmenGrid = ({ items }: { items: CraftsmanItem[] }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const showMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {visibleItems.map((item, index) => (
          <HorizontalCard 
            key={item.id}
            title={item.name}
            image={item.thumbnail} 
            link={`/desa/craftsmen/${item.slug}`} 
            // Priority true for the first 6 images (LCP optimization)
            priority={index < 6}
          />
        ))}
      </div>
      
      {/* Dynamic Load More Button */}
      {hasMore && (
        <div className="flex items-center justify-center mt-12">
          <button 
            onClick={showMore}
            className="group flex items-center gap-3 px-8 py-3 border border-[#2D2D2D] hover:bg-[#2D2D2D] hover:text-white transition-all duration-300"
          >
            <span className="font-raleway font-medium">Muat Lebih Banyak</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <p className="text-center text-gray-400 mt-8 text-sm italic">
          Seluruh pengrajin telah ditampilkan.
        </p>
      )}
    </div>
  );
};

export default CraftsmenGrid;