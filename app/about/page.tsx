'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { ArrowUp, ArrowDown, Menu, Instagram, Mail, X } from 'lucide-react';

// to do: move tidy up const vars to differ folders
const FOUNDERS_DATA = [
  {
    id: 'pandu',
    name: 'Pandu Purwandaru, S.Ds.,M.Ds., Ph.D',
    image: '/About/dosen/pandu_purwandaru_photo.jpg',
  },
  {
    id: 'trisna',
    name: 'Trisna Dwi Putri Novitabella S.Ds., M.Ds.',
    image: '/About/dosen/placeholders_dosen_individual.jpeg',
  },
  {
    id: 'silmi',
    name: 'Dott. Silmi Cahya Pradini Priliana S.T., M.Sc.',
    image: '/About/dosen/placeholders_dosen_individual.jpeg',
  },
];

const MITRA_INTERNATIONAL_DATA = [
  {
    id: 'aoki',
    name: 'Aoki Hironobu',
    desc: 'Chiba University',
    image: '/About/dosen/placeholders_dosen_individual.jpeg',

  },
  {
    id: 'mitsuha',
    name: 'Mitsuha Sato',
    desc: 'Suha Design',
    image: '/About/dosen/placeholders_dosen_individual.jpeg',
  },

];

const PARTNERS_INSTITUTIONAL = [
  { id: 1, name: 'FSRD UNS', src: '/logos/logo-uns.png' }, 
  { id: 2, name: 'Design Research Institute Chiba University', src: '/logos/02_Chiba_2.png' },
  { id: 3, name: 'Forum Rembuk Klaster Industri Rotan Trangsan', src: '/logos/logo-uns.png' },
  { id: 4, name: 'Gabungan Kelompok Tani Sedyo Makmur Delanggu', src: '/logos/07_URDC.png' },
  { id: 5, name: 'URDC Laboratory', src: '/logos/07_URDC.png' }, 

];


// 2. HERO SECTION
const HeroAbout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative w-full h-screen bg-neutral-900 overflow-hidden">
      {/* 1. Background Image (Layer: Bottom) */}
      <div className="absolute inset-0 opacity-70 z-0">
        <Image 
          src="/About/hero/about-hero-image.png" 
          alt="Students in workshop"
          fill
          className="object-cover grayscale"
          priority
        />
      </div>

      {/* blur component */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[60%] z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.7) 53.36%, rgba(45, 45, 45, 0.7) 100%)'
        }}
      />

      {/* 
          fade out when the card expands to avoid clutter 
      */}
      <div className={`absolute top-24 left-0 w-full flex flex-col items-center z-20 transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-5xl font-light text-center text-white leading-[1.1] tracking-wide">
          <span className="block font-normal">Lab</span>
          <span className="block">Desain</span>
          <span className="block">Budaya</span>
        </h1>
      </div>

      {/* accordion card */}
      <div 
      onClick={() => setIsExpanded(!isExpanded)} 
        className={`
            absolute left-6 right-6 bg-[#F2F2F2] shadow-xl z-30 ml-auto p-6
            transition-all duration-500 ease-in-out flex flex-col hover:cursor-pointer
            ${isExpanded ? 'bottom-6 overflow-y-auto' : 'bottom-10 h-auto'}
        `}
      >
        {/* Sticky Header Content (The Manifesto) */}
        <div className="shrink-0">
          <p className="text-[#333333] text-lg leading-relaxed font-light">
            Kami percaya bahwa desain bukan sekadar bentuk, 
            melainkan cara untuk <span className="font-semibold">merawat identitas</span> dan menghidupkan 
            kembali <span className="font-semibold">budaya lokal</span>.
          </p>
        </div>

      {/* expand about */}
        <div 
          className={`
            overflow-hidden transition-all duration-500 ease-in-out 
            ${isExpanded ? 'opacity-100 mt-6 max-h-250' : 'opacity-0 max-h-0'}
          `}
        >
          <div className="space-y-6 text-[#333333] font-light text-sm leading-relaxed">
            <p>
              Lab Desain Budaya merupakan ruang kolaboratif yang berfokus pada pengembangan desain 
              berbasis potensi lokal di Indonesia, khususnya wilayah Jawa Tengah. Terinspirasi dari filosofi 
              Mingei "seni untuk rakyat", lab ini menyoroti nilai kesederhanaan, keindahan, dan keberlanjutan 
              yang lahir dari kehidupan sehari-hari masyarakat.
            </p>
            <p>
              Kami percaya bahwa desain tidak hanya soal keindahan dalam karya seni, tetapi tentang 
              identitas, budaya, dan keberlanjutan sosial. Melalui kolaborasi dengan para pengrajin lokal, 
              Lab Desain Budaya berupaya menggali, mendokumentasikan, dan menghidupkan kembali karya 
              kerajinan lokal dengan nilai estetika yang murni untuk inovasi masa kini.
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-4 shrink-0">
            <button 
                className="border border-[#2d2d2d] p-2   transition-colors cursor-pointer group"
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

// 3. PHILOSOPHY SECTION (MINGEI)
const PhilosophySection = () => {
  return (
    <div className="bg-[#2d2d2d] text-white py-20 px-6 flex flex-col items-center justify-center text-center">
      <span className="text-sm font-light tracking-widest uppercase mb-8 text-gray-300">Filosofi kami</span>

      {/* Kanji */}
      <div className="flex space-x-4 mb-4">
        <div className="text-8xl font-serif font-light">民</div>
        <div className="text-8xl font-serif font-light">芸</div>
      </div>

      {/* Title */}
      <h2 className="text-6xl tracking-widest mb-4 mt-2 font-raleway">MINGEI</h2>

      {/* Phonetic */}
      <p className="text-xl font-serif italic text-gray-400">['mɪŋgeɪ]</p>
    </div>
  );
};

// 4. PHILOSOPHY DETAILS GRID
const PhilosophyGrid = () => {
  return (
    <div className="bg-[#F2F2F2] py-16">
      <div className="border border-[#2d2d2d]">
        {/* Header Icons */}
        <div className="grid grid-cols-2 divide-[#2d2d2d] border-b border-[#2d2d2d] justify-center">
          <div className="pl-6 py-6 flex flex-col items-center justify-center">
            <span className="text-7xl font-bold mb-2 text-[#333]">民</span>
            <span className="text-sm tracking-wider text-gray-600">Rakyat</span>
          </div>
          <div className="pr-6 py-6 flex flex-col items-center justify-center">
            <span className="text-7xl font-bold mb-2 text-[#333]">芸</span>
            <span className="text-sm tracking-wider text-gray-600">Seni</span>
          </div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-[#2d2d2d]">
          <div className="p-4 text-center text-sm text-[#333] leading-relaxed">
            Diperkenalkan di Jepang awal abad ke-20
          </div>
          <div className="p-4 text-center text-sm text-[#333] leading-relaxed">
            Kesederhanaan, Kejujuran / Apa Adanya, Anonim
          </div>
          <div className="p-4 text-center text-sm text-[#333] italic">
            "Seni rakyat yang dikembalikan ke rakyat."
          </div>
          <div className="p-4 text-center text-sm text-[#333] leading-relaxed">
            Dibuat oleh rakyat biasa, melestarikan warisan budaya dan sejarah.
          </div>
        </div>
      </div>
    </div>
  );
};

const FoundersSection = () => {
  // state to track which founder curr hovered. null = default view
  const [activeFounder, setActiveFounder] = useState<string | null>(null);

  return (
    <div className="bg-[#2d2d2d] text-white py-20 px-6">
      <div className="text-center mb-12">
        <span className="text-xl font-light text-gray-400 block mb-2">Pendiri</span>
        <h2 className="text-4xl leading-tight tracking-wide font-raleway">
          Lab <br /> Desain <br /> Budaya
        </h2>
        <p className="mt-8 text-sm text-gray-300 leading-relaxed max-w-xs mx-auto">
          Lab Desain Budaya terlahir dari ..., berfokus pada pengembangan desain berbasis komunitas, riset material lokal, dan kolaborasi lintas disiplin di berbagai wilayah Indonesia.
        </p>
      </div>

      {/* interactive Founders Card */}
      <div className="bg-[#E5E5E5] text-[#2d2d2d] max-w-md mx-auto shadow-lg overflow-hidden">

        {/* IMAGE DISPLAY AREA */}
        {/* relative to display founders stacking */}
        <div className="relative w-full aspect-4/3 bg-gray-300">

          {/* 1. DEFAULT GROUP IMAGE (Visible when activeFounder is null) */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeFounder === null ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src="/About/dosen/placeholders_founder.png" // The "3 cats" image
              alt="Lab Desain Budaya Founders"
              fill
              className="object-cover grayscale"
              priority // Load priority to ensure it's ready immediately
            />
          </div>

          {/* 2. INDIVIDUAL FOUNDER IMAGES (Mapped and stacked) */}
          {FOUNDERS_DATA.map((founder) => (
            <div
              key={founder.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeFounder === founder.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              <Image
                src={founder.image} // The individual "1 cat" image
                alt={founder.name}
                fill
                className="object-cover grayscale"
                // Optional: add priority if you want these preloaded instantly, 
                // otherwise Next.js lazy loads them which might cause a split-second delay on first hover.
                priority
              />
            </div>
          ))}
        </div>

        {/* NAMES LIST AREA */}
        <div className="border-t border-[#2d2d2d] divide-y divide-[#2d2d2d] text-center text-xs font-medium bg-[#E5E5E5]">
          {FOUNDERS_DATA.map((founder) => (
            <div
              key={founder.id}
              className={`py-4 px-2 transition-colors duration-300 ${activeFounder === founder.id ? 'bg-[#2d2d2d] text-white' : 'hover:bg-gray-200'
                }`}
              onMouseEnter={() => setActiveFounder(founder.id)}
              onMouseLeave={() => setActiveFounder(null)}
            >
              <span className='font-bold'>{founder.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// 6. PARTNERS SECTION
const PartnersSection = () => {
  const [activePartner, setActivePartner] = useState<string | null>(null);

  return (
    <div className="bg-[#F2F2F2] py-20 px-6 ">

      {/* International */}
      <div className="mb-16 text-center">
        <h3 className="text-3xl text-[#333] mb-8 font-raleway">Mitra Internasional</h3>
      
        <div className="bg-[#E5E5E5] text-[#2d2d2d] max-w-md mx-auto overflow-hidden">

          {/* IMAGE DISPLAY AREA */}
          {/* We use 'relative' to stack images on top of each other */}
          <div className="relative w-full aspect-4/3 bg-gray-300">

            {/* 1. DEFAULT GROUP IMAGE (Visible when activeFounder is null) */}
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activePartner === null ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Image
                src="/About/dosen/placeholders_founder.png" // The "3 cats" image
                alt="Lab Desain Budaya Founders"
                fill
                className="object-cover grayscale"
                priority // Load priority to ensure it's ready immediately
              />
            </div>

            {/* 2. INDIVIDUAL FOUNDER IMAGES (Mapped and stacked) */}
            {MITRA_INTERNATIONAL_DATA.map((founder) => (
              <div
                key={founder.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activePartner === founder.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <Image
                  src={founder.image} // The individual "1 cat" image
                  alt={founder.name}
                  fill
                  className="object-cover grayscale"
                  // optional: add priority if you want preloaded instantly, 
                  // otherwise Next.js lazy loads them which might cause a split-second delay on first hover.
                  priority
                />
              </div>
            ))}
          </div>

          {/* NAMES LIST AREA */}
          <div className="border-t border-[#2d2d2d] divide-y divide-[#2d2d2d] text-center text-xs font-medium bg-[#E5E5E5]">
            {MITRA_INTERNATIONAL_DATA.map((founder) => (
              <div
                key={founder.id}
                className={`py-4 px-2 transition-colors duration-300 ${activePartner === founder.id ? 'bg-[#2d2d2d] text-white' : 'hover:bg-gray-200'
                  }`}
                onMouseEnter={() => setActivePartner(founder.id)}
                onMouseLeave={() => setActivePartner(null)}
              >
                <span className='font-bold'>{founder.name}</span> - {founder.desc}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Institutional */}
      <div className="text-center mt-16">
        <h3 className="text-3xl text-[#333] mb-8 font-raleway">Mitra Institusi</h3>
        
        {/* Grid Container */}
        <div className="grid grid-cols-2 gap-4">
          {PARTNERS_INSTITUTIONAL.slice(0, 4).map((partner) => (
             <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>

        {/* The 5th item centered alone */}
        <div className="mt-4 flex justify-center">
           <div className="w-[calc(50%-0.5rem)]"> {/* Matches grid column width */}
              <PartnerCard partner={PARTNERS_INSTITUTIONAL[4]} />
           </div>
        </div>
    </div>
    </div>
  );
};

const PartnerCard = ({ partner }: { partner: { id: number; name: string; src: string } }) => {
  return (
    // 1. Wrapper: Holds Card + Text vertically
    // 'group' allows hovering the text to also trigger the card effect (optional, good UX)
    <div className="flex flex-col items-center gap-3 group">
      
      {/* 2. Card Box: Contains ONLY the Logo */}
      <div 
        className="
          w-full aspect-4/3
          flex items-center justify-center p-6
          bg-[#EFEFEF] border-[0.8px] border-[#2d2d2d]
          transition-colors duration-300 ease-in
          group-hover:bg-[#2d2d2d]
        "
      >
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          <Image 
            src={partner.src} 
            alt={partner.name}
            fill
            className=" scale-125
              object-contain 
              transition-all duration-300 ease-in
              group-hover:brightness-0 group-hover:invert
            "
          />
        </div>
      </div>

      <p className="text-[11px] md:text-xs text-[#2d2d2d] text-center leading-tight max-w-[90%]">
        {partner.name}
      </p>
    </div>
  );
};

// --- MAIN PAGE ---
const About = () => {
  return (
    <main className="min-h-screen font-sans bg-[#F2F2F2]">
      <HeroAbout />
      <PhilosophySection />
      <PhilosophyGrid />
      <FoundersSection />
      <PartnersSection />
    </main>
  );
};

export default About;