"use client"
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';


const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent  text-white">
      {/* Logo Placeholder - adjusting for mix-blend to be visible on both light/dark */}
      <div className="font-bold text-2xl tracking-tighter">
        <span className="sr-only">Lab Desain Budaya</span>
        {/* Simulating the logo shape with text/icon for this code block */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
        </svg>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="p-1">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-[#F2F2F2] text-[#2d2d2d] flex flex-col items-center justify-center space-y-6 pt-10 pb-20 transition-all">
          <a href="#" className="text-xl font-medium tracking-wide">TENTANG KAMI</a>
          <a href="#" className="text-xl font-medium tracking-wide">PRAKARSA</a>
          <a href="#" className="text-xl font-medium tracking-wide">PUBLIKASI</a>
          <a href="#" className="text-xl font-medium tracking-wide">KOLABORASI</a>
          <div className="mt-8 text-gray-400">ID / EN</div>
        </div>
      )}
    </nav>
  );
}

export default Navbar