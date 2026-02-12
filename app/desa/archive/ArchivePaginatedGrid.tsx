'use client'
import { useState, useMemo, Suspense } from 'react';
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

const ITEMS_PER_PAGE = 6;

const ArchivePaginatedGridContent = ({ items }: { items: ArchiveItem[] }) => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const isFilterActive = useMemo(() => {
    return (
      searchParams.has('jenis-anyaman') ||
      searchParams.has('material-rotan') ||
      searchParams.has('alat-produksi') ||
      searchParams.has('pengembangan_desain')
    );
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    let result = items;
    
    const filterAnyaman = searchParams.get('jenis-anyaman')?.split(',') || [];
    const filterMaterial = searchParams.get('material-rotan')?.split(',') || [];
    const filterAlat = searchParams.get('alat-produksi')?.split(',') || [];
    const filterDesain = searchParams.get('pengembangan-desain')?.split(',') || [];

    if (filterAnyaman.length > 0 || filterMaterial.length > 0 || filterAlat.length > 0 || filterDesain.length > 0) {
      result = items.filter((item) => {
        const normalize = (str: string) => str?.toLowerCase().trim();
        
        if (filterAnyaman.length > 0) {
            const match = filterAnyaman.some(val => normalize(item.type_anyaman || '').includes(normalize(val)));
            if (!match) return false;
        }

        if (filterMaterial.length > 0) {
            const matType = typeof item.material_rotan === 'string' ? item.material_rotan : item.material_rotan?.type;
            const match = filterMaterial.some(val => normalize(matType || '').includes(normalize(val)));
            if (!match) return false;
        }

        if (filterAlat.length > 0) {
            const toolName = typeof item.alat_produksi === 'string' ? item.alat_produksi : item.alat_produksi?.name;
            const match = filterAlat.some(val => normalize(toolName || '').includes(normalize(val)));
            if (!match) return false;
        }

        if (filterDesain.length > 0) {
            const match = filterDesain.some(val => normalize(item.pengembangan_desain || '').includes(normalize(val)));
            if (!match) return false;
        }

        return true;
      });
    }

    return [...result].sort((a, b) => {
      if (a.thumbnail && !b.thumbnail) return -1;
      if (!a.thumbnail && b.thumbnail) return 1;
      return 0;
    });
}, [items, searchParams]);

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
       
       {isFilterActive && (
         <div className="mb-2">
            <p className="text-sm text-gray-500">
              Showing {filteredItems.length} results
            </p>
         </div>
       )}

      <div className="grid grid-cols-2 xl:grid-cols-3 min-h-[300px] gap-4 xl:gap-6">
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

const ArchivePaginatedGrid = (props: { items: ArchiveItem[] }) => {
  return (
    <Suspense fallback={
      <div className="grid grid-cols-2 xl:grid-cols-3 min-h-[300px] gap-4 xl:gap-6 animate-pulse">
      {/* simple fallback */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
           <div key={i} className="bg-gray-100 aspect-video w-full rounded"></div>
        ))}
      </div>
    }>
      <ArchivePaginatedGridContent {...props} />
    </Suspense>
  );
};

export default ArchivePaginatedGrid;