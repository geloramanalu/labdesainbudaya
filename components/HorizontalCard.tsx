import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

// to do: modify card to have more variants -> horizonal aspect and vertical aspect
interface HorizontalCardProps {
  title: string;
  image: string;
  subtitle?: string; 
  link?: string;
  
}

const HorizontalCard = ({ title, image, subtitle, link = "#" }: HorizontalCardProps) => {
  return (
    <a 
      href={link}
      className="group block border border-[#2D2D2D] bg-transparent hover:bg-[#2D2D2D] transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[275/319]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4"
        />
      </div>

      <div className="px-4 pb-4 flex justify-between items-center transition-colors duration-300 group-hover:text-white">
        
        <div className="flex flex-col justify-center gap-2">
          <span className="font-raleway text-lg xl:text-2xl font-medium leading-tight">
            {title}
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