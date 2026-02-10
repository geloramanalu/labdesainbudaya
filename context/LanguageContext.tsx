'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../data/translations';

// 1. Define the allowed languages
export type Language = 'ID' | 'EN';

// 2. Define the shape of the Context
interface LanguageContextType {
  lang: Language;
  switchLang: (newLang: Language) => void;
  t: (keyString: string) => string;
}

// 3. Define the Props for the Provider
interface LanguageProviderProps {
  children: ReactNode;
}

// Create the context with undefined initial value (handled in the hook)
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [lang, setLang] = useState<Language>('ID');

  useEffect(() => {
    // Check localStorage safely
    const savedLang = localStorage.getItem('siteLang') as Language | null;
    // Validate that the saved lang is actually a valid Language type
    if (savedLang === 'ID' || savedLang === 'EN') {
      setLang(savedLang);
    }
  }, []);

  const switchLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('siteLang', newLang);
  };

  // Helper function to get text
  const t = (keyString: string): string => {
    const keys = keyString.split('.');
    
    // We cast to 'any' here for traversal because the translations structure 
    // is deeply nested and dynamic.
    let value: any = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    // Fallback logic for English if translation is missing
    if (!value && lang === 'EN') {
        let fallback: any = translations['ID'];
        for (const k of keys) {
           if (fallback && typeof fallback === 'object') {
             fallback = fallback[k];
           } else {
             fallback = undefined;
             break;
           }
        }
        return (fallback as string) || keyString;
    }
    
    return (value as string) || keyString;
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook with error handling
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};