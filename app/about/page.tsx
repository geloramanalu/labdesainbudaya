'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUp, ArrowDown } from 'lucide-react';

const FOUNDERS_DATA = [
  {
    id: 'pandu',
    name: 'Pandu Purwandaru, S.Ds.,M.Ds., Ph.D',
    image: '/about/dosen/pandu_purwandaru_photo.jpg',
  },
  {
    id: 'trisna',
    name: 'Trisna Dwi Putri Novitabella S.Ds., M.Ds.',
    image: '/about/dosen/placeholders_dosen_individual.jpeg',
  },
  {
    id: 'silmi',
    name: 'Dott. Silmi Cahya Pradini Priliana S.T., M.Sc.',
    image: '/about/dosen/placeholders_dosen_individual.jpeg',
  },
];

const MITRA_INTERNATIONAL_DATA = [
  {
    id: 'aoki',
    name: 'Aoki Hironobu',
    desc: 'Design Research Institute Chiba University',
    image: '/about/dosen/placeholders_dosen_individual.jpeg',
  },
  {
    id: 'mitsuha',
    name: 'Mitsuha Sato',
    desc: 'Suha Design',
    image: '/about/dosen/placeholders_dosen_individual.jpeg',
  },
];

const PARTNERS_INSTITUTIONAL = [
  { id: 1, name: 'FSRD UNS', src: '/logos/logo-uns.png' },
  { id: 2, name: 'Design Research Institute Chiba University', src: '/logos/02_Chiba_2.png' },
  { id: 3, name: 'Forum Rembuk Klaster Industri Rotan Trangsan', src: '/logos/logo-uns.png' },
  { id: 4, name: 'Gabungan Kelompok Tani Sedyo Makmur Delanggu', src: '/logos/07_URDC.png' },
  { id: 5, name: 'URDC Laboratory', src: '/logos/07_URDC.png' },
];

// refactored about into several sections
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


const HeroAbout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative w-full h-screen bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 opacity-70 z-0">
        <Image
          src="/about/hero/about-hero-image.png"
          alt="Students in workshop"
          fill
          className="object-cover grayscale"
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
          <span className="block font-normal xl:inline xl:mr-4">Lab</span>
          <span className="block xl:inline xl:mr-4">Desain</span>
          <span className="block xl:inline">Budaya</span>
        </h1>
      </div>

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
            absolute left-6 right-6 xl:left-0 xl:right-0 xl:bottom-24 bg-[#F2F2F2] shadow-xl z-30 ml-auto p-6 xl:px-32 xl:py-10
            transition-all duration-500 ease-in-out flex flex-col hover:cursor-pointer
            ${isExpanded ? 'bottom-6 overflow-y-auto' : 'bottom-10 h-auto'}
        `}
      >
        <div className="shrink-0 xl:flex xl:justify-between xl:items-center">
          <p className="text-[#333333] text-lg leading-relaxed font-light xl:max-w-4xl xl:text-xl">
            Kami percaya bahwa desain bukan sekadar bentuk,
            melainkan cara untuk <span className="font-semibold">merawat identitas</span> dan menghidupkan
            kembali <span className="font-semibold">budaya lokal</span>.
          </p>
          <div className="hidden xl:block">
             <div className="border border-[#2d2d2d] p-3">
                <ArrowUp size={24} strokeWidth={1} />
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

const PhilosophySection = () => {
  return (
    <>
      <div className="bg-[#2d2d2d] text-white py-20 px-6 flex flex-col items-center justify-center text-center xl:hidden">
        <span className="text-sm font-light tracking-widest uppercase mb-8 text-gray-300">Filosofi kami</span>
        <div className="flex space-x-4 mb-4">
          <div className="text-8xl font-serif font-light">民</div>
          <div className="text-8xl font-serif font-light">芸</div>
        </div>
        <h2 className="text-6xl tracking-widest mb-4 mt-2 font-raleway">MINGEI</h2>
        <p className="text-xl font-serif italic text-gray-400">['mɪŋgeɪ]</p>
      </div>

      <div className="hidden xl:flex bg-[#F2F2F2] text-[#2d2d2d] py-32 px-24 justify-between items-start">
        <div className="w-1/3">
            <h2 className="text-7xl font-thin font-raleway leading-tight">
                Kerangka <br/>
                Desain <br/>
                Budaya
            </h2>
        </div>
        
        <div className="w-2/3 grid grid-cols-2 gap-x-12 gap-y-16">
            <div>
                <h3 className="text-5xl font-normal mb-4"><span className="font-bold mr-2">1</span> Being</h3>
                <p className="text-sm font-light leading-relaxed">
                    Tahap memahami nilai, praktik, dan identitas budaya yang telah membentuk kehidupan.
                </p>
            </div>
            <div>
                <h3 className="text-5xl font-normal mb-4"><span className="font-bold mr-2">3</span> Design Process</h3>
                <p className="text-sm font-light leading-relaxed">
                    Tahap menerjemahkan "what should be" ke langkah desain melalui riset, eksperimen, kolaborasi, dan prototyping untuk menghasilkan solusi yang bermakna dan sesuai konteks.
                </p>
            </div>
            <div>
                <h3 className="text-5xl font-normal mb-4"><span className="font-bold mr-2">2</span> What Should Be</h3>
                <p className="text-sm font-light leading-relaxed">
                    Tahap menentukan masa depan budaya yang ideal dengan mengidentifikasi kebutuhan, aspirasi, serta pertimbangan etis yang menentukan arah desain bagi komunitas berbasis temuan dalam "being".
                </p>
            </div>
            <div>
                <h3 className="text-5xl font-normal mb-4"><span className="font-bold mr-2">4</span> Becoming</h3>
                <p className="text-sm font-light leading-relaxed">
                    Tahap ketika hasil desain berkembang dalam komunitas, membentuk ekspresi, praktik, dan identitas budaya baru melalui adaptasi berkelanjutan serta dampak jangka panjang.
                </p>
            </div>
        </div>
      </div>
    </>
  );
};

const PhilosophyGrid = () => {
  return (
    <div className="bg-[#F2F2F2] py-16 xl:hidden">
      <div className="border border-[#2d2d2d]">
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
  const [activeFounder, setActiveFounder] = useState<string | null>(null);

  return (
    <div className="bg-[#2d2d2d] xl:bg-[#F2F2F2] text-white xl:text-[#2d2d2d] py-20 px-6 xl:px-32 xl:py-32 xl:flex xl:flex-row xl:items-center xl:justify-center xl:gap-24">
      <div className="text-center xl:text-right mb-12 xl:mb-0 xl:w-1/3">
        <span className="text-xl font-light text-gray-400 xl:text-gray-600 block mb-2 xl:text-3xl">Pendiri</span>
        <h2 className="text-4xl xl:text-7xl leading-tight tracking-wide font-raleway font-light">
          Lab <br /> Desain <br /> Budaya
        </h2>
        <p className="mt-8 text-sm xl:text-base text-gray-300 xl:text-gray-600 leading-relaxed max-w-xs mx-auto xl:mr-0 xl:ml-auto">
          Lab Desain Budaya terlahir dari ..., berfokus pada pengembangan desain berbasis komunitas, riset material lokal, dan kolaborasi lintas disiplin di berbagai wilayah Indonesia.
        </p>
      </div>

      <div className="bg-[#E5E5E5] text-[#2d2d2d] max-w-md mx-auto xl:mx-0 xl:w-1/2 shadow-lg overflow-hidden border border-transparent xl:border-[#2d2d2d]">
        <div className="relative w-full aspect-4/3 bg-gray-300">
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeFounder === null ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src="/about/dosen/placeholders_founder.png"
              alt="Lab Desain Budaya Founders"
              fill
              className="object-cover grayscale"
              priority
            />
          </div>

          {FOUNDERS_DATA.map((founder) => (
            <div
              key={founder.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activeFounder === founder.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover grayscale"
                priority
              />
            </div>
          ))}
        </div>

        <div className="border-t border-[#2d2d2d] divide-y divide-[#2d2d2d] text-center text-xs xl:text-sm font-medium bg-[#E5E5E5]">
          {FOUNDERS_DATA.map((founder) => (
            <div
              key={founder.id}
              className={`py-4 px-2 transition-colors duration-300 cursor-pointer ${activeFounder === founder.id ? 'bg-[#2d2d2d] text-white' : 'hover:bg-gray-200'
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

const PartnersSection = () => {
  const [activePartner, setActivePartner] = useState<string | null>(null);

  return (
    <div className="bg-[#F2F2F2] py-20 px-6 xl:px-32 xl:pb-40">
      <div className="mb-16 text-center">
        <h3 className="text-3xl xl:text-5xl text-[#333] mb-8 xl:mb-16 font-raleway font-light">Mitra Internasional</h3>

        <div className="bg-[#E5E5E5] text-[#2d2d2d] max-w-md mx-auto overflow-hidden xl:hidden">
          <div className="relative w-full aspect-4/3 bg-gray-300">
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activePartner === null ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <Image
                src="/about/dosen/placeholders_founder.png"
                alt="Lab Desain Budaya Founders"
                fill
                className="object-cover grayscale"
                priority
              />
            </div>
            {MITRA_INTERNATIONAL_DATA.map((founder) => (
              <div
                key={founder.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${activePartner === founder.id ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover grayscale"
                  priority
                />
              </div>
            ))}
          </div>

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

        <div className="hidden xl:flex flex-col gap-2 items-center justify-center">
             {MITRA_INTERNATIONAL_DATA.map((partner) => (
                <p key={partner.id} className="text-[#333] text-lg">
                    <span className="font-bold">{partner.name}</span> - {partner.desc}
                </p>
             ))}
        </div>
      </div>

      <div className="text-center mt-16 xl:mt-32">
        <h3 className="text-3xl xl:text-5xl text-[#333] mb-8 xl:mb-16 font-raleway font-light">Mitra Institusi</h3>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-8 xl:max-w-6xl xl:mx-auto">
          {PARTNERS_INSTITUTIONAL.slice(0, 4).map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
           <div className="col-span-2 flex justify-center xl:col-span-4 xl:mt-8">
              <div className="w-[calc(50%-0.5rem)] xl:w-[calc(25%-1.5rem)]">
                <PartnerCard partner={PARTNERS_INSTITUTIONAL[4]} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PartnerCard = ({ partner }: { partner: { id: number; name: string; src: string } }) => {
  return (
    <div className="flex flex-col items-center gap-3 group">
      <div
        className="
          w-full aspect-4/3
          flex items-center justify-center p-6
          bg-[#EFEFEF] border-[0.8px] border-[#2d2d2d]
          transition-colors duration-300 ease-in
          group-hover:bg-[#2d2d2d]
        "
      >
        <div className="relative w-20 h-20 md:w-24 md:h-24 xl:w-32 xl:h-32">
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

      <p className="text-[11px] md:text-xs xl:text-sm text-[#2d2d2d] text-center leading-tight max-w-[90%] font-medium">
        {partner.name}
      </p>
    </div>
  );
};



export default About;