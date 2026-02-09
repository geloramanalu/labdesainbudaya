
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { ReactNode } from 'react';

interface HorizontalCardProps {
  title: string;
  image: string | null;
  subtitle?: string; 
  link?: string;
  variant?: string;
  year?: number;
  priority?: boolean;
}

const HorizontalCard = ({ 
  title, 
  image, 
  subtitle, 
  variant, 
  year, 
  link = "#",
  priority = false 
}: HorizontalCardProps) => {
  return (
    <a 
      href={link}
      className="group block border border-[#2D2D2D] bg-transparent hover:bg-[#2D2D2D] transition-all duration-300 p-2 xl:p-4"
    >
     
      <div 
        className={`relative w-full overflow-hidden ${
          variant === "secondary" 
            ? "aspect-[3/4] " 
            : "aspect-[5/3]"
        }`}
      >
        
        {image ? (
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            
          />
        ) : (
          <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center text-gray-400">
             <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
             </svg>
          </div>
        )}
      </div>

      <div className="flex mt-2 xl:mt-4 justify-between items-center transition-colors duration-300 group-hover:text-white">
        <div className="flex flex-col justify-center gap-2">
          <span className="font-raleway text-lg xl:text-2xl font-medium leading-tight">
            {title}
            <span className='text-[#8d8d8d] group-hover:text-gray-300 transition-colors ml-2'>
              {year != null ? '/ '+year : ''}
            </span>
          </span>
          {subtitle && (
            <span className="font-raleway text-gray-500 text-lg xl:text-2xl font-medium leading-tight">
              {subtitle}
            </span>
          )}
        </div>
        <div> 
          <ArrowRight 
            size={18} 
            strokeWidth={1.5} 
            className="transform transition-transform duration-300 group-hover:translate-x-1" 
          />
        </div>
      </div>
    </a>
  );
}

export default HorizontalCard;