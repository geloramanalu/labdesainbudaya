import React from 'react'
import HorizontalCard from '@/components/HorizontalCard'
import { ArrowRight } from 'lucide-react'
import { EVENT_ITEMS } from '@/data/eventsData'

// to do: incorporate year information to be dynamically displayed
const Events = () => {
  return (
    <div className='border p-4'>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-6 ">
        {EVENT_ITEMS.map((item) => (
          <HorizontalCard 
            key={item.id}
            title={item.title}
            image={item.image}
            variant='secondary'
            subtitle=''
            year={item.year}
          />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button className="w-10 h-14 border border-[#2D2D2D] flex items-center justify-center hover:bg-[#2D2D2D] hover:text-white transition-colors">
          <ArrowRight className="rotate-180" size={20} />
        </button>
        <div className="flex gap-2">
            <div className="w-2 h-14 bg-[#2D2D2D]/80"></div>
        </div>
        <button className="w-10 h-14 border border-[#2D2D2D] flex items-center justify-center hover:bg-[#2D2D2D] hover:text-white transition-colors">
          <ArrowRight size={20} />
        </button>
      </div>

    </div>

  )
}

export default Events