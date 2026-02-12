'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Plus, Minus, Check } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  link?: string;
  type?: 'checkbox' | 'link' | 'group'; 
  subItems?: MenuItem[];
}

interface SidebarAccordionProps {
  items: MenuItem[];
  defaultOpenIds?: string[];
}

// Skeleton fallback
function SidebarSkeleton() {
  return (
    <div className="border border-[#2D2D2D] bg-transparent w-full animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="p-4 border-b border-[#2D2D2D] last:border-b-0">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

// Internal component that uses useSearchParams - wrapped in Suspense
function SidebarContent({ items, defaultOpenIds = [] }: SidebarAccordionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Separate state tracking:
  // 1. Which main menu item is active (only ONE at a time)
  const [activeMainItem, setActiveMainItem] = useState<string | null>(
    defaultOpenIds.length > 0 ? defaultOpenIds[0] : null
  );
  
  // 2. Which children of the ACTIVE main item are open
  const [openChildren, setOpenChildren] = useState<Set<string>>(new Set());

  const toggleSection = (id: string, parentId?: string) => {
    if (parentId) {
      // This is a child item - toggle it within the active main item's children
      const newOpenChildren = new Set(openChildren);
      if (newOpenChildren.has(id)) {
        newOpenChildren.delete(id);
      } else {
        newOpenChildren.add(id);
      }
      setOpenChildren(newOpenChildren);
    } else {
      // This is a main item - make it the ONLY active one
      // If clicking the same main item, toggle it closed/open
      if (activeMainItem === id) {
        setActiveMainItem(null);
        setOpenChildren(new Set()); // Clear all children
      } else {
        setActiveMainItem(id);
        setOpenChildren(new Set()); // Clear all children when switching
      }
    }
  };

  const handleCheckboxChange = (groupKey: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === 'all') {
      // Clicking "All" clears all filters for this category
      params.delete(groupKey);
    } else {
      const existingValue = params.get(groupKey);
      let selectedValues = existingValue ? existingValue.split(',') : [];

      if (selectedValues.includes(value)) {
        selectedValues = selectedValues.filter((v) => v !== value);
      } else {
        selectedValues.push(value);
      }

      if (selectedValues.length > 0) {
        params.set(groupKey, selectedValues.join(','));
      } else {
        params.delete(groupKey);
      }
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    const targetPath = pathname.startsWith('/desa/archive') ? pathname : '/desa/archive';
    router.push(`${targetPath}${query}`);
  };

  const isChecked = (groupKey: string, value: string) => {
    const existingValue = searchParams.get(groupKey);
    if (value === 'all') return !existingValue; // "All" is checked if no filter exists
    if (!existingValue) return false;
    return existingValue.split(',').includes(value);
  };

  const renderItem = (item: MenuItem, level: number = 0, parentId?: string) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    
    // Normalize paths by removing trailing slashes for comparison
    const normalizedPathname = pathname.endsWith('/') && pathname !== '/' 
      ? pathname.slice(0, -1) 
      : pathname;
    const normalizedLink = item.link?.endsWith('/') && item.link !== '/' 
      ? item.link.slice(0, -1) 
      : item.link;
    
    const isActiveLink = normalizedLink && normalizedPathname === normalizedLink;
    
    // Determine if this item is open based on level
    const isOpen = level === 0 
      ? activeMainItem === item.id  // Main items: check activeMainItem
      : openChildren.has(item.id);   // Child items: check openChildren

    // Black background logic for level 0 items:
    // 1. Items WITH subItems: Black when they are the active page OR active main item
    // 2. Items WITHOUT subItems: Black when active page (link state)
    const isMainActive = level === 0 && (
      hasSubItems ? (isActiveLink || activeMainItem === item.id) : isActiveLink
    );

    const Header = (
      <div className={`
        flex justify-between items-center p-4 border-b border-[#2D2D2D] transition-colors
        ${level > 0 ? 'pl-8 border-none py-3 text-sm' : ''} 
        ${isMainActive ? 'text-white bg-[#1d1d1d]' : 'text-[#2D2D2D] font-medium'}
      `}>
         <span>{item.label}</span>
         {hasSubItems && (
            <div className="p-1">
                {isOpen ? <Minus size={16}/> : <Plus size={16}/>}
            </div>
         )}
      </div>
    );

    return (
      <div key={item.id} className={`${level === 0 ? 'border-b border-[#2D2D2D] last:border-b-0' : ''} bg-transparent`}>
        {/* Items WITHOUT subItems: Simple navigation link */}
        {item.link && !hasSubItems ? (
           <Link 
             href={item.link} 
             className="block hover:bg-black/5 transition-colors"
             onClick={() => {
               // When navigating to simple pages, clear active main item and children
               setActiveMainItem(null);
               setOpenChildren(new Set());
             }}
           >
              {Header}
           </Link>
        ) : /* Items WITH subItems: Accordion with optional link */ (
           <div 
             className="cursor-pointer hover:bg-black/5 transition-colors"
             onClick={() => {
                 // For items with subItems:
                 // 1. If they have a link AND we're NOT on that page, navigate first
                 // 2. If we're on that page OR no link, toggle accordion
                 
                 const shouldNavigate = item.link && !isActiveLink;
                 
                 if (shouldNavigate && item.link) {
                   // Navigate to the page and set as active
                   if (level === 0) {
                     setActiveMainItem(item.id);
                     setOpenChildren(new Set());
                   }
                   router.push(item.link);
                 } else {
                   // Already on this page or no link - just toggle accordion
                   toggleSection(item.id, parentId);
                 }
             }}
           >
              {Header}
           </div>
        )}

        {hasSubItems && (
           <div className={`
             overflow-hidden transition-all duration-300 ease-in-out bg-transparent
             ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
           `}>
             {item.subItems!.map(sub => {
                if (sub.type === 'checkbox') {
                    const isSelected = isChecked(item.id, sub.id);
                    return (
                        <div 
                            key={sub.id} 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCheckboxChange(item.id, sub.id);
                            }}
                            className="pl-8 pr-4 py-2 text-sm cursor-pointer flex items-center gap-3 transition-colors hover:bg-black/5"
                        >
                            <div className={`
                                w-4 h-4 border border-[#2D2D2D] flex items-center justify-center transition-colors
                                ${isSelected ? 'bg-[#2D2D2D]' : 'bg-transparent'}
                            `}>
                                {isSelected && <Check size={12} className="text-white" />}
                            </div>
                            <span className={`${isSelected ? 'font-bold text-[#1d1d1d]' : 'text-gray-600'}`}>
                                {sub.label}
                            </span>
                        </div>
                    );
                }
                return renderItem(sub, level + 1, item.id); // Pass current item.id as parentId
             })}
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="border border-[#2D2D2D] bg-transparent text-raleway w-full">
      {items.map(item => renderItem(item))}
    </div>
  );
}

// Main component that wraps SidebarContent in Suspense
const SidebarAccordion = ({ items, defaultOpenIds = [] }: SidebarAccordionProps) => {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <SidebarContent items={items} defaultOpenIds={defaultOpenIds} />
    </Suspense>
  );
};

export default SidebarAccordion;