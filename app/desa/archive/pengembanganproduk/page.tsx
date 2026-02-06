;
import { ARCHIVE_ITEMS } from '@/data/archiveData';
import HorizontalCard from '@/components/HorizontalCard';
import { ArrowRight } from 'lucide-react';

const PengembanganProduk = () => {
  return (
    <div>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {ARCHIVE_ITEMS.map((item) => (
          <HorizontalCard 
            key={item.id}
            title={item.title}
            subtitle={item.subtitle} 
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button className="w-10 h-10 border border-[#2D2D2D] flex items-center justify-center hover:bg-[#2D2D2D] hover:text-white transition-colors">
          <ArrowRight className="rotate-180" size={20} />
        </button>
        <div className="flex gap-2">
            <div className="w-2 h-4 bg-[#2D2D2D]"></div>
            <div className="w-2 h-4 border border-[#2D2D2D]"></div>
            <div className="w-2 h-4 border border-[#2D2D2D]"></div>
            <div className="w-2 h-4 border border-[#2D2D2D]"></div>
        </div>
        <button className="w-10 h-10 bg-[#2D2D2D] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default PengembanganProduk;