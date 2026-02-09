'use client';

import { useState } from 'react';
import HorizontalCard from '@/components/HorizontalCard';
import { ArrowRight } from 'lucide-react';

interface CraftsmanItem {
  id: number;
  name: string;
  slug: string;
  thumbnail: string | null;
}

// to do: differentiate for desktop 9, mobile other value
const ITEMS_PER_PAGE = 9; // adjust this number as needed

const CraftsmenPaginatedGrid = ({ items }: { items: CraftsmanItem[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
  };

  return (
    <div className=' p-2 xl:p-4 border xl:-ml-[1px]'>
      <div className="grid grid-cols-2 xl:grid-cols-3 min-h-[500px] gap-4 xl:gap-6">
        {currentItems.map((item, index) => (
          <HorizontalCard 
            key={item.id}
            title={item.name}
            image={item.thumbnail} 
            link={`/desa/craftsmen/${item.slug}`} 
            priority={true} 
            variant='secondary'
          />
        ))}
      </div>
      
      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          
          {/* PREVIOUS BUTTON */}
          <button 
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`
              w-10 h-10 border border-[#2D2D2D] flex items-center justify-center 
              transition-colors duration-300
              ${currentPage === 1 
                ? 'opacity-30 cursor-not-allowed' 
                : 'hover:bg-[#2D2D2D] hover:text-white cursor-pointer'}
            `}
          >
            <ArrowRight className="rotate-180" size={20} />
          </button>

          {/* PAGE NUMBERS */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`
                  w-8 h-8 xl:w-10 xl:h-10 border border-[#2D2D2D] flex items-center justify-center text-sm font-medium transition-colors duration-300
                  ${currentPage === page 
                    ? 'bg-[#2D2D2D] text-white' 
                    : 'bg-transparent text-[#2d2d2d] hover:bg-gray-100'}
                `}
              >
                {page}
              </button>
            ))}
          </div>

          {/* NEXT BUTTON */}
          <button 
             onClick={nextPage}
             disabled={currentPage === totalPages}
             className={`
              w-10 h-10 border border-[#2D2D2D] flex items-center justify-center 
              transition-colors duration-300
              ${currentPage === totalPages 
                ? 'opacity-30 cursor-not-allowed' 
                : 'bg-[#2D2D2D] text-white hover:opacity-90 cursor-pointer'}
            `}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CraftsmenPaginatedGrid;