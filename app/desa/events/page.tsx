import React from 'react'
import HorizontalCard from '@/components/HorizontalCard'
import { ArrowRight } from 'lucide-react'
import { EVENT_ITEMS } from '@/data/eventsData'

// to do: incorporate year information to be dynamically displayed
const Events = () => {
  return (
    <div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6">
        {EVENT_ITEMS.map((item) => (
          <HorizontalCard 
            key={item.id}
            title={item.title}
            image={item.image}
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

export default Events