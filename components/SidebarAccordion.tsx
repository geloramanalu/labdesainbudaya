'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Plus } from 'lucide-react';

interface SubItem {
  id: string;
  title: string;
}

interface MenuItem {
  label: string;
  link: string;
  subItems?: SubItem[]; // <--- Attach subItems directly to the menu item type
}

interface SidebarAccordionProps {
  items: MenuItem[];
  activeLabel: string;
}

const SidebarAccordion = ({ items, activeLabel }: SidebarAccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="border border-[#2D2D2D] bg-[#F2F2F2] text-raleway max-w-xs md:max-w-md mx-auto xl:mx-0 xl:w-full">
      {items.map((menu) => {
        const isActive = menu.label === activeLabel;
        // Check if THIS specific menu has subItems
        const hasSubItems = menu.subItems && menu.subItems.length > 0;

        if (isActive) {
          return (
            <div key={menu.label}>
              <div 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#2D2D2D] text-white p-4 flex justify-between items-center cursor-pointer transition-colors border-b border-[#2D2D2D]"
              >
                <span className="text-lg font-medium">{menu.label}</span>
                {hasSubItems && <Menu size={20} />}
              </div>

              <div className={`
                overflow-hidden transition-all duration-500 ease-in-out bg-[#F2F2F2]
                ${isOpen && hasSubItems ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <ul className="flex flex-col text-sm border-b border-[#2D2D2D]">
                  {/* Map through the menu's OWN subItems */}
                  {menu.subItems?.map((sub) => (
                    <li key={sub.id}>
                      <button 
                        onClick={() => scrollToSection(sub.id)}
                        className="w-full text-left py-3 pl-8 pr-4 hover:bg-[#2D2D2D]/5 text-[#2D2D2D]/70 hover:text-[#2D2D2D] transition-colors border-l-4 border-transparent hover:border-[#2D2D2D]"
                      >
                        {sub.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }

        return (
          <Link 
            key={menu.label} 
            href={menu.link}
            className="flex justify-between items-center p-4 border-b border-[#2D2D2D] last:border-b-0 hover:bg-gray-100 cursor-pointer group transition-colors"
          >
            <span className="text-[#2D2D2D] font-light">{menu.label}</span>
            <Plus 
              size={20} 
              strokeWidth={1} 
              className="text-[#2D2D2D] group-hover:rotate-90 transition-transform" 
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarAccordion;