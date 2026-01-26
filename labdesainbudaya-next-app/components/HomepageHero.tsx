"use client"
import Image from 'next/image';
import { ArrowRight } from "lucide-react";

const HomepageHero = () => {
  return (
    <div className="flex flex-col justify-end h-screen w-full relative text-white">

      <div className="absolute inset-0 -z-10">
        <Image
          src="/Homepage/hero-mobile.jpg"
          alt="Craftsman hand"
          fill
          className="object-cover object-bottom-left"
          priority
        />
      </div>


      <div
        className="absolute bottom-0 left-0 w-full h-[60%] -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.7) 53.36%, rgba(45, 45, 45, 0.7) 100%)'
        }}
      />

      <h1 className="leading-[1.1] tracking-wide absolute top-24 mx-auto text-7xl left-0 w-full text-center">Lab <br />
        Desain <br />
        Budaya</h1>

      <div className=" mb-24 flex flex-col gap-4 mx-10">

        <div className="flex justify-around font-raleway  mb-11 text-xl">
          <h3>01 / Research </h3>
          <h3>02 / Archive </h3>
          <h3>03 / Innovate </h3>
        </div>

        <p className="text-center">Lab Desain Budaya merupakan ruang kolaboratif yang berfokus pada <span className="font-bold">pengembangan desain</span> berbasis potensi lokal di Indonesia, khususnya wilayah Jawa Tengah. </p>

        {/* hero -> about CTA */}
        <div
          className="mt-5 transparent border border-white py-2 px-4 w-62 mx-auto flex justify-between group cursor-pointer"
          onClick={() => window.location.href = '/about'}
        >
          <a className="group-hover:cursor-pointer font-raleway">Read more about us</a>
          <ArrowRight size={20} strokeWidth={1} />

        </div>

      </div>
    </div>
  )
}

export default HomepageHero;