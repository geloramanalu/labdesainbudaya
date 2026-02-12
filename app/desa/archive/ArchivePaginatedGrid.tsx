'use client'
import { useState, useMemo } from 'react';
import HorizontalCard from '@/components/HorizontalCard';
import { ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface ArchiveItem {
  id: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  type_anyaman?: string;
  material_rotan?: { type: string } | string;
  alat_produksi?: { name: string } | string;
  pengembangan_desain?: string;
}

const ITEMS_PER_PAGE = 9;

const ArchivePaginatedGrid = ({ items }: { items: ArchiveItem[] }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // --- FILTERING LOGIC ---
  const filteredItems = useMemo(() => {
    let result = items;
    
    // Read params
    const filterAnyaman = searchParams.get('jenis-anyaman');
    const filterMaterial = searchParams.get('material-rotan');
    const filterAlat = searchParams.get('alat-produksi');
    const filterDesain = searchParams.get('pengembangan-desain');

    if (filterAnyaman || filterMaterial || filterAlat || filterDesain) {
      result = items.filter((item) => {
        const normalize = (str: string) => str?.toLowerCase().trim();
        
        // 1. Jenis Anyaman
        if (filterAnyaman) {
            if (!normalize(item.type_anyaman || '').includes(normalize(filterAnyaman))) return false;
        }

        // 2. Material
        if (filterMaterial) {
            const mat = typeof item.material_rotan === 'string' ? item.material_rotan : item.material_rotan?.type;
            if (!normalize(mat || '').includes(normalize(filterMaterial))) return false;
        }

        // 3. Alat
        if (filterAlat) {
            const tool = typeof item.alat_produksi === 'string' ? item.alat_produksi : item.alat_produksi?.name;
            if (!normalize(tool || '').includes(normalize(filterAlat))) return false;
        }

        // 4. Pengembangan
        if (filterDesain) {
            if (!normalize(item.pengembangan_desain || '').includes(normalize(filterDesain))) return false;
        }

        return true;
      });
    }

    // --- SORTING ---
    return [...result].sort((a, b) => {
      if (a.thumbnail && !b.thumbnail) return -1;
      if (!a.thumbnail && b.thumbnail) return 1;
      return 0;
    });

  }, [items, searchParams]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const nextPage = () => currentPage < totalPages && goToPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && goToPage(currentPage - 1);

  return (
    <div className="flex flex-col gap-8 p-2 xl:p-4 border xl:-ml-[1px]">
       
       {/* Filter Status / Count */}
       <div className="mb-2">
            <p className="text-sm text-gray-500">
              Showing {filteredItems.length} results
            </p>
        </div>

      <div className="grid grid-cols-2 xl:grid-cols-3 min-h-[500px] gap-4 xl:gap-6">
        {currentItems.map((item) => (
          <HorizontalCard 
            key={item.id}
            title={item.title}
            image={item.thumbnail}
            link={`/desa/archive/${item.slug}`}
            variant='secondary'
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button 
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`w-10 h-10 border border-[#2D2D2D] flex items-center justify-center transition-colors ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#2D2D2D] hover:text-white'}`}
          >
            <ArrowRight className="rotate-180" size={20} />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 border border-[#2D2D2D] flex items-center justify-center text-sm transition-colors ${currentPage === page ? 'bg-[#2D2D2D] text-white' : 'hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 border border-[#2D2D2D] flex items-center justify-center transition-colors ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'bg-[#2D2D2D] text-white'}`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ArchivePaginatedGrid;