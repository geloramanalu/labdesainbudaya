'use client';

import React, { useState, useEffect, useCallback } from 'react';
import HomepageHero from "@/components/HomepageHero";
import HomeLoader from "@/components/HomeLoader";
import Link from "next/link";
import CardPublikasi from "@/components/CardPublikasi";
import Image from 'next/image';
import { ArrowRight } from "lucide-react";
import Desa from "@/components/Desa";
import { useLanguage } from '@/context/LanguageContext';

const renderWithBold = (text: string) => {
  if (!text) return "";
  const parts = text.split('**');
  return parts.map((part, index) =>
    index % 2 === 1 ? <span key={index} className="font-bold">{part}</span> : part
  );
};

const HomeView = () => {
  const [heroAnimationStart, setHeroAnimationStart] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("home-loaded");

    if (hasLoadedBefore) {
      setShowLoader(false);
      setHeroAnimationStart(true);
    } else {
      setShowLoader(true);
    }

    setIsChecking(false);
  }, []);

  // FIX: useCallback prevents the function from being recreated on every render.
  // This stops the HomeLoader from "thinking" it needs to restart.
  const handleLoaderComplete = useCallback(() => {
    setHeroAnimationStart(true);

    // FIX: Increased to 1200ms to match the fade-out duration.
    // This prevents the "White Gap" (loader disappearing before opacity hits 0).
    setTimeout(() => {
      setShowLoader(false);
      sessionStorage.setItem("home-loaded", "true");
    }, 1200);
  }, []);

  if (isChecking) return null;

  return (
    <>
      {showLoader && (
        <HomeLoader 
          onComplete={handleLoaderComplete} 
        />
      )} 
      <HomepageHero startAnimation={heroAnimationStart} />

      {/* Other Components */}
      {/* <Prakarsa /> */}
      {/* <Desa /> */}
      {/* <Publikasi /> */}
      {/* <CTAPesanBuku /> */}
      {/* <CTAKolaborasi /> */}
    </>
  );
};

export default HomeView;