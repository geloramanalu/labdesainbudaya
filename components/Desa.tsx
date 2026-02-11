'use client';

import React, { useState, useEffect, useCallback, use } from 'react';
import useEmblaCarousel from 'embla-carousel-react'; // docs: https://www.embla-carousel.com/get-started/react/
import HeroCard from './HeroCard';
import { useLanguage } from '@/context/LanguageContext'; 



{/* to do @Desa, make card covers 80% width of desktop, height follows */}
// to do @Desa 2: repair image quality
const Desa = () => {
  const {t} = useLanguage();

  const CAROUSEL_DATA = [
    {
      id: 1,
      title: t('homepage.desa.title'), 
      desc: t('homepage.desa.description'),
      picture: "/homepage/desa-trangsan-card-thumbnail.png"
    },
    // {
    //   id: 2,
    //   title: "Desa Delanggu",
    //   desc: "Fokus pada revitalisasi pertanian dan kerajinan lokal berbasis ekosistem sawah yang berkelanjutan dan memberdayakan petani muda.",
    //   picture: "/about/dosen/placeholders_founder.png"
    // },
    // {
    //   id: 3,
    //   title: "Kampung Laweyan",
    //   desc: "Menelusuri sejarah batik dan arsitektur kuno sebagai landasan pengembangan wisata edukasi berbasis sejarah dan budaya.",
    //   picture: "/about/dosen/placeholders_dosen_individual.jpeg"
    // },
    // {
    //   id: 4,
    //   title: "Sangiran",
    //   desc: "Eksplorasi situs purbakala sebagai inspirasi desain kontemporer yang menghubungkan masa lalu dengan inovasi masa depan.",
    //   picture: "/about/dosen/placeholders_founder.png"
    // }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); //  initial state
    emblaApi.on('select', onSelect); // listen for slide changes
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);


  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return (
    <div className="py-24 xl:pt-48 xl:pb-36 bg-[#EFEFEF]">
      
      <div className="overflow-hidden mb-8 px-6" ref={emblaRef}>

        <div className="flex touch-pan-y backface-hidden">
          {CAROUSEL_DATA.map((item) => (
            // flex-[0_0_100%] ensures each slide takes full width
            // min-w-0 prevents flexbox overflow issues
            <div className="flex-[0_0_100%] min-w-0 relative pl-4" key={item.id}>
              <HeroCard 
                title={item.title}
                desc={item.desc}
                picture={item.picture}
              />
            </div>
          ))}
        </div>
      </div>

      
      {/* <div className="max-w-6xl mx-auto flex justify-end items-center gap-4 px-6 xl:px-0">
      
        <button onClick={scrollPrev} className="hover:opacity-80 transition-opacity cursor-pointer">
          <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="45" y="0" width="45" height="45" transform="rotate(90 45 0)" fill="#2D2D2D"/>
            <path d="M18.9033 31.0148C18.6805 31.1772 18.3686 31.128 18.207 30.9044L11.9854 22.296C11.9838 22.2939 11.9827 22.2915 11.9814 22.2892C11.9233 22.2075 11.8887 22.108 11.8887 22.0001C11.8887 21.8916 11.9245 21.792 11.9834 21.7101C11.9843 21.7086 11.9844 21.7066 11.9854 21.7052L18.207 13.0968C18.3687 12.8731 18.6805 12.8236 18.9033 12.9865C19.1261 13.1494 19.1761 13.4629 19.0147 13.6866L13.3682 21.5001L32.6113 21.5001C32.8873 21.5002 33.1112 21.7241 33.1113 22.0001C33.1113 22.2762 32.8874 22.5 32.6113 22.5001L13.3662 22.5001L19.0147 30.3136C19.1764 30.5374 19.1262 30.8517 18.9033 31.0148Z" fill="#EFEFEF"/>
          </svg>
        </button>

      
        <div className="flex gap-2">
            {CAROUSEL_DATA.map((_, index) => (
                <div 
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`
                        w-3 h-10 border border-[#2d2d2d] cursor-pointer transition-all duration-300
                        ${index === selectedIndex ? 'bg-[#2d2d2d]' : 'bg-transparent hover:bg-[#2d2d2d]/20'}
                    `}
                />
            ))}
        </div>


        <button onClick={scrollNext} className="hover:opacity-80 transition-opacity cursor-pointer">
          <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="45" width="45" height="45" transform="rotate(-90 0 45)" fill="#2D2D2D"/>
            <path d="M26.0967 13.9852C26.3195 13.8228 26.6314 13.872 26.793 14.0956L33.0147 22.704C33.0162 22.7061 33.0173 22.7085 33.0186 22.7108C33.0767 22.7925 33.1113 22.892 33.1113 22.9999C33.1113 23.1084 33.0755 23.208 33.0166 23.2899C33.0157 23.2914 33.0157 23.2934 33.0147 23.2948L26.793 31.9032C26.6313 32.1269 26.3195 32.1764 26.0967 32.0136C25.874 31.8506 25.8239 31.5371 25.9854 31.3134L31.6318 23.4999H12.3887C12.1127 23.4998 11.8888 23.2759 11.8887 22.9999C11.8887 22.7238 12.1126 22.5 12.3887 22.4999H31.6338L25.9854 14.6864C25.8236 14.4626 25.8738 14.1483 26.0967 13.9852Z" fill="#EFEFEF"/>
          </svg>
        </button>

      </div> */}
    </div>
  );
};

export default Desa;