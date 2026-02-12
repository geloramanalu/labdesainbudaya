'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useLanguage, LanguageContextType } from '../../context/LanguageContext';

const FOUNDERS_DATA = [
  {
    id: 'pandu',
    name: 'Pandu Purwandaru, S.Ds.,M.Ds., Ph.D',
    image: '/about/dosen/Pak Pandu.jpg',
  },
  {
    id: 'trisna',
    name: 'Trisna Dwi Putri Novitabella S.Ds., M.Ds.',
    image: '/about/dosen/bu Trisna.jpg',
  },
  {
    id: 'silmi',
    name: 'Dott. Silmi Cahya Pradini Priliana S.T., M.Sc.',
    image: '/about/dosen/bu Silmi.jpg',
  },
];

const MITRA_INTERNATIONAL_DATA = [
  {
    id: 'aoki',
    name: 'Aoki Hironobu',
    desc: 'Design Research Institute Chiba University',
    image: '/about/dosen/Aoki Sensei.jpg',
  },
  {
    id: 'mitsuha',
    name: 'Mitsuha Sato',
    desc: 'Suha Design',
    image: '/about/dosen/MitsuhaSato.png',
  },
];

const PARTNER_LOGOS = [
  "/logos/silhouette-logo/uns-silhouette.png",
  "/logos/silhouette-logo/chiba-silhouette.png",
  "/logos/silhouette-logo/silhouette-fsrd.png",
  "/logos/silhouette-logo/silhouette-dri.png",
  "/logos/silhouette-logo/New Project (3).png",
  "/logos/silhouette-logo/silhouette-magister.png",
  "/logos/silhouette-logo/New Project.png",
  "/logos/silhouette-logo/silhouette-urdc.png",
  "/logos/silhouette-logo/silhouette-pusat-studi-jepang.png",
  "/logos/silhouette-logo/silhouette-rembuk-klaster.png",
  "/logos/silhouette-logo/silhouette-draw-workroom.png",
  "/logos/silhouette-logo/silhouette-sedyo-makmur.png",
  "/logos/silhouette-logo/silhouette-rojolele.png",


];

interface HeroAboutProps {
  t: LanguageContextType['t'];
}

const renderWithBold = (text: string) => {
  if (!text) return "";
  const parts = text.split('**');
  return parts.map((part, index) =>
    index % 2 === 1 ? <span key={index} className="font-bold">{part}</span> : part
  );
};

// refactored about into several sections
const About = () => {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen font-sans bg-[#F2F2F2]">
      <HeroAbout t={t} />
      <PhilosophySection t={t} />
      <PhilosophyGrid t={t} />
      <PendiriMitraLab t={t} />
    </main>
  );
};


const HeroAbout = ({ t }: HeroAboutProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // to do: add gradient downwards on bg image
  return (
    <div className="relative w-full h-screen bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 opacity-70 z-0">
        <Image
          src="/about/hero/about-hero-image.png"
          alt="Students in workshop"
          fill
          className="object-cover grayscale xl:hidden "
          priority
        />

        <Image
          src="/about/hero/Hero-About-Desktop.png"
          alt="Students in workshop"
          fill
          className="object-cover grayscale hidden xl:inline"
          priority
        />
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-[60%] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.7) 53.36%, rgba(45, 45, 45, 0.7) 100%)'
        }}
      />

      <div className={`absolute top-24 xl:top-24 left-0 w-full flex flex-col items-center xl:items-center z-20 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-5xl xl:text-8xl font-light text-center text-white leading-[1.1] tracking-wide font-raleway xl:font-thin">
          <span className="font-extralight tracking-tighter block xl:inline xl:mr-4">Lab</span>
          <span className="font-extralight tracking-tighter block xl:inline xl:mr-4">Desain</span>
          <span className="font-extralight tracking-tighter block xl:inline">Budaya</span>
        </h1>
      </div>

      {/* to do: set layouting for according contents */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
            absolute left-6 right-6 xl:left-0 xl:right-0 xl:bottom-24 bg-[#F2F2F2]  z-30 ml-auto p-6 xl:px-32 xl:py-10
            transition-all duration-500 ease-in-out flex flex-col hover:cursor-pointer xl:max-w-7xl xl:mx-auto xl:border
            ${isExpanded ? 'bottom-6 overflow-y-auto' : 'bottom-10 h-auto'}
        `}
      >
        <div className="shrink-0 xl:flex xl:justify-between xl:items-center">
          <p className="text-[#333333] text-lg leading-relaxed font-light xl:max-w-4xl xl:text-xl">
            {renderWithBold(t('about.hero.quote'))}
          </p>
          <div className="hidden xl:block">
            <div className="border border-[#2d2d2d] p-3">
              {isExpanded ?
                <ArrowDown size={24} strokeWidth={1} />

                :
                <ArrowUp size={24} strokeWidth={1} />
              }
            </div>
          </div>
        </div>

        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out 
            ${isExpanded ? 'opacity-100 mt-6 max-h-250' : 'opacity-0 max-h-0'}
          `}
        >
          <div className="space-y-6 text-[#333333] font-light text-sm leading-relaxed xl:text-base xl:max-w-4xl xl:mt-8">
            <p>
              {t('about.hero.description_1')}
            </p>
            <p>
              {t('about.hero.description_2')}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-4 shrink-0 xl:hidden">
          <button
            className="border border-[#2d2d2d] p-2 transition-colors cursor-pointer group"
            aria-label={isExpanded ? "Close details" : "Read more"}
          >
            {isExpanded ? (
              <ArrowDown size={20} strokeWidth={1} />
            ) : (
              <ArrowUp size={20} strokeWidth={1} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const PhilosophySection = ({ t }: HeroAboutProps) => {
  return (
    <>
     
      <section className="flex flex-col xl:flex-row items-start gap-12 xl:gap-24 p-24">
        <div className="w-full xl:w-1/3">
          <h2 className="text-5xl xl:text-7xl font-thin leading-tight w-40 xl:w-full">
            {t('about.philosophy.main_title')}
          </h2>
        </div>

        <div className="w-full xl:w-2/3 grid grid-cols-1 xl:grid-cols-2 gap-x-16 gap-y-20 xl:pt-32">

          <div>
            <h3 className="text-4xl font-light mb-4">
              <span className="font-medium text-4xl xl:text-6xl inline mr-2 pb-2 absolute -mt-6 -ml-6 xl:-mt-12 xl:-ml-8">1</span>
              {t('about.philosophy.steps.one_title')}
            </h3>
            <p className="text-xl font-light leading-relaxed">
              {t('about.philosophy.steps.one_desc')}
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <h3 className="text-4xl font-light mb-4">
              <span className="font-medium text-4xl xl:text-6xl inline mr-2 pb-2 absolute -mt-6 -ml-6 xl:-mt-12 xl:-ml-12">2</span>
              {t('about.philosophy.steps.two_title')}
            </h3>
            <p className="text-xl font-light leading-relaxed">
              {t('about.philosophy.steps.two_desc')}
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <h3 className="text-4xl font-light mb-4">
              <span className="font-medium text-4xl xl:text-6xl inline mr-2 pb-2 absolute -mt-6 -ml-6 xl:-mt-12 xl:-ml-12">3</span>
              {t('about.philosophy.steps.three_title')}
            </h3>
            <p className="text-xl font-light leading-relaxed">
              {t('about.philosophy.steps.three_desc')}
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <h3 className="text-4xl font-light mb-4">
              <span className="font-medium text-4xl xl:text-6xl inline mr-2 pb-2 absolute -mt-6 -ml-6 xl:-mt-12 xl:-ml-12">4</span>
              {t('about.philosophy.steps.four_title')}
            </h3>
            <p className="text-xl font-light leading-relaxed">
              {t('about.philosophy.steps.four_desc')}
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

const PhilosophyGrid = ({ t }: HeroAboutProps) => {
  return (
    <div className="bg-[#F2F2F2] pb-16 ">
      <div className="bg-[#2d2d2d] text-white py-20 px-6 flex flex-col items-center justify-center text-center ">
        <div className='max-w-xl xl:max-w-5xxl'>
          <div className="flex space-x-4 mb-4 justify-center">
            <div className="text-8xl font-serif font-light">民</div>
            <div className="text-8xl font-serif font-light">芸</div>
          </div>
          <h2 className="text-6xl tracking-widest mb-4 mt-2 font-raleway">MINGEI</h2>
          <p className="text-xl font-serif italic text-gray-400">['mɪŋgeɪ]</p>
        </div>
      </div>
      <div className="border border-[#2d2d2d]">

        <div className=" divide-[#2d2d2d] border-b border-[#2d2d2d] justify-center">
          <div className='max-w-xs xl:max-w-md mx-auto grid grid-cols-2'>
            <div className="pl-6 py-12 flex flex-col items-center justify-center ">
              <span className="text-7xl xl:text-9xl xl:py-4 font-medium xl:font-medium mb-2 text-[#333]">民</span>
              <span className="text-sm xl:text-xl tracking-wider text-gray-600">{t('about.mingei_grid.kanji_1_meaning')}</span>
            </div>
            <div className="pr-6 py-12 flex flex-col items-center justify-center">
              <span className="text-7xl xl:text-9xl xl:py-4 font-medium xl:font-medium mb-2 text-[#333]">芸</span>
              <span className="text-sm xl:text-xl tracking-wider text-gray-600">{t('about.mingei_grid.kanji_2_meaning')}</span>
            </div>
          </div>


        </div>

        <div className="divide-y divide-[#2d2d2d] ">
          <div className="p-4 xl:py-8 text-center text-sm xl:text-xl text-[#333] leading-relaxed">
            {t('about.mingei_grid.desc_1')}
          </div>
          <div className="p-4 xl:py-8 text-center text-sm xl:text-xl text-[#333] leading-relaxed">
            {t('about.mingei_grid.desc_2')}
          </div>
          <div className="p-4 xl:py-8 text-center text-sm xl:text-xl text-[#333] italic">
            {t('about.mingei_grid.quote')}
          </div>
          <div className="p-4 xl:py-8 text-center text-sm xl:text-xl text-[#333] leading-relaxed">
            {t('about.mingei_grid.desc_3')}
          </div>
        </div>
      </div>
    </div>
  );
};


interface ProfileData {
  id: string | number;
  name: string;
  image: string;
  desc?: string; // Optional for partners
}

interface InstitutionalPartner {
  id: number;
  name: string;
  src: string;
}

interface InteractiveProfileCardProps {
  title: React.ReactNode;
  data: ProfileData[];
  placeholderImage: string;
  aspectRatio?: string;
}

const InteractiveProfileCard = ({ title, data, placeholderImage, aspectRatio = "aspect-[4/3]" }: InteractiveProfileCardProps) => {
  // if theres placeholder pic
  // const [activeId, setActiveId] = useState<string | number | null>(null);

  // if no placeholder pic
  const [activeId, setActiveId] = useState<string | number | null>(data[0]?.id);
  useEffect(() => {
    if (activeId === null && data.length > 0) {
      setActiveId(data[0].id);
    }
  }, [activeId, data]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-center mb-8 xl:mb-12">
        {title}
      </div>

      <div className="bg-[#E5E5E5] text-[#2d2d2d] w-full max-w-md mx-auto overflow-hidden border border-[#2d2d2d]">

        <div className={`relative w-full ${aspectRatio}`}>
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeId === null ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={placeholderImage}
              alt="Placeholder"
              fill
              className="object-cover grayscale"
              priority
            />
          </div>

          {data.map((item) => (
            <div
              key={item.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeId === item.id ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover grayscale"
                priority
              />
            </div>
          ))}
        </div>

        {/* List Area */}
        <div className="border-t border-[#2d2d2d] divide-y divide-[#2d2d2d] text-center text-xs xl:text-sm font-medium bg-[#E5E5E5]">
          {data.map((item) => (
            <div
              key={item.id}
              className={`py-4 px-2 transition-colors duration-300 cursor-pointer ${activeId === item.id ? 'bg-[#2d2d2d] text-white' : 'hover:bg-gray-200'}`}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <div className="flex flex-col xl:flex-row xl:justify-center xl:gap-2 items-center">
                <span className="font-bold">{item.name}</span>
                {item.desc && (
                  <>
                    <span className="hidden xl:inline text-gray-400 mx-1">|</span>
                    <span className="font-light block xl:inline mt-1 xl:mt-0 opacity-80 xl:opacity-100">{item.desc}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PartnerCard = ({ fileName }: { fileName: string }) => {
  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className="w-full aspect-[4/3] flex items-center justify-center p-6 bg-[#EFEFEF] border-[0.8px] border-[#2d2d2d] transition-colors duration-300 ease-in group-hover:bg-[#2d2d2d]">
        <div className="relative w-20 h-20 md:w-24 md:h-24 xl:w-32 xl:h-32">
          <Image
            src={`${fileName}`}
            alt=""
            fill
            className="scale-125 object-contain transition-all duration-300 ease-in group-hover:brightness-0 group-hover:invert"
          />
        </div>
      </div>

    </div>
  );
};

const PendiriMitraLab = ({ t }: HeroAboutProps) => {
  return (
    <section className="bg-[#F2F2F2] text-[#2d2d2d] py-20 px-6 xl:px-32 xl:py-32">

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 xl:gap-12 max-w-[1440px] mx-auto">

        <InteractiveProfileCard
          title={
            <div className="flex flex-col items-center">

              <h2 className="text-3xl xl:text-5xl leading-tight tracking-wide font-raleway font-light">
                {t('about.team.title_team')}
              </h2>
            </div>
          }
          data={FOUNDERS_DATA}
          placeholderImage="/about/dosen/placeholders_founder.png"
          aspectRatio="aspect-[4/3]"
        />

        <InteractiveProfileCard
          title={
            <div className="flex flex-col items-center">
              <h3 className="text-3xl xl:text-5xl text-[#333] xl:leading-14 tracking-wide  font-raleway font-light">
                {t('about.team.title_intl_partners')}
              </h3>
            </div>
          }
          data={MITRA_INTERNATIONAL_DATA}
          placeholderImage="/about/dosen/placeholders_founder.png"
          aspectRatio="aspect-[4/3]"
        />

      </div>

      <div className="text-center mt-24 xl:mt-40 border-t border-[#2d2d2d]/10 pt-16">
        <h3 className="text-3xl xl:text-5xl text-[#333] mb-8 xl:mb-16 font-raleway font-light">
          {t('about.team.title_inst_partners')}
        </h3>

        <div className="grid grid-cols-2 xl:grid-cols-5 gap-4 xl:gap-8 xl:max-w-7xl xl:mx-auto">
          {PARTNER_LOGOS.map((fileName, index) => (
            <PartnerCard key={index} fileName={fileName} />
          ))}
        </div>
      </div>

    </section>
  );
};







export default About;