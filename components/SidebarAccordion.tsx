import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Plus, Minus, Check } from 'lucide-react';

// --- TYPES ---
export interface MenuItem {
  id: string;
  label: string;
  link?: string;
  type?: 'checkbox' | 'link' | 'group'; 
  subItems?: MenuItem[];
}

interface SidebarAccordionProps {
  items: MenuItem[];
  defaultOpenIds?: string[]; // IDs of items to be open by default
}

const SidebarAccordion = ({ items, defaultOpenIds = [] }: SidebarAccordionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State to track open sections
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(defaultOpenIds));

  // --- HANDLERS ---

  const toggleSection = (id: string) => {
    const newOpen = new Set(openSections);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenSections(newOpen);
  };

  const handleCheckboxChange = (groupKey: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const existing = current.get(groupKey);

    // Toggle logic: If strict single select, replace. If multi, add/remove.
    // Implementing SINGLE SELECT per category as per typical filter behavior for simplicity first,
    // or toggle if same.
    if (existing === value) {
      current.delete(groupKey);
    } else {
      current.set(groupKey, value);
    }
    
    // Reset page to 1 on filter change
    // We assume the grid reads 'page' param or handles it, but usually standard to reset.
    // current.delete('page'); 

    const search = current.toString();
    const query = search ? `?${search}` : "";
    
    // Push new URL. 
    // Note: If we are NOT on /desa/archive, we should probably navigate there?
    // But this component is likely rendered in Layout, so it persists.
    // If the checkbox is clicked, we assume the user intends to filter the archive.
    if (!pathname.startsWith('/desa/archive')) {
       router.push(`/desa/archive${query}`);
    } else {
       router.push(`${pathname}${query}`);
    }
  };

  const isChecked = (groupKey: string, value: string) => {
    return searchParams.get(groupKey) === value;
  };

  // --- RECURSIVE RENDERER ---
  const renderItem = (item: MenuItem, level: number = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openSections.has(item.id);
    const isActiveLink = item.link && pathname === item.link;

    // -- LEAF: CHECKBOX --
    if (item.type === 'checkbox') {
        // We assume the PARENT ID is the group key (e.g. 'jenis-anyaman')
        // But here 'item' is the leaf. We need the parent context.
        // To solve this in recursion, we relies on structure: Group -> Checkbox Items.
        // Actually, simpler: The PARENT calls this with context, or we flatten?
        // Let's assume the item.id IS the value, and we need the key.
        // We'll handle this by checking if the Parent passed the key logic. 
        // Refactor: renderItem doesn't know parent.
        // Solution: We strictly define structure in data.
        // Level 1: Main (Arsip)
        // Level 2: Filter Group (Jenis Anyaman) -> id="jenis-anyaman"
        // Level 3: Option (Durno) -> type="checkbox"
        return (
            <div key={item.id} className="pl-8 py-2 flex items-center gap-3 cursor-pointer hover:bg-gray-100" 
                 onClick={() => {
                     // Hacky access to parent ID? No.
                     // The `renderItem` needs to know the parent ID if it's a checkbox.
                     // Let's pass `parentId` to recursive call.
                 }}>
                 {/* Logic moved to recursive call below */}
            </div>
        );
    }

    // -- HEADER CONTENT --
    const Header = (
      <div className={`
        flex justify-between items-center p-4 border-b border-[#2D2D2D] transition-colors
        ${isActiveLink ? 'bg-gray-100' : ''}
        ${level > 0 ? 'pl-8 border-none py-3 text-sm' : ''} 
        ${level === 0 ? 'font-medium' : 'font-light'}
      `}>
         <span className={`${isActiveLink ? 'font-bold' : ''}`}>{item.label}</span>
         {hasSubItems && (
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSection(item.id);
                }}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
                {isOpen ? <Minus size={16}/> : <Plus size={16}/>}
            </button>
         )}
      </div>
    );

    return (
      <div key={item.id} className={`${level === 0 ? 'border-b border-[#2D2D2D] last:border-b-0' : ''}`}>
        
        {/* -- CLICKABLE AREA -- */}
        {item.link ? (
           <Link href={item.link} className="block hover:bg-gray-50 transition-colors">
              {Header}
           </Link>
        ) : (
           <div 
             className="cursor-pointer hover:bg-gray-50 transition-colors"
             onClick={() => hasSubItems && toggleSection(item.id)}
           >
              {Header}
           </div>
        )}

        {/* -- SUB ITEMS -- */}
        {hasSubItems && (
           <div className={`
             overflow-hidden transition-all duration-300 ease-in-out bg-white
             ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
           `}>
             {item.subItems!.map(sub => {
                if (sub.type === 'checkbox') {
                    // Checkbox Logic: The 'item.id' is the Filter Category (e.g. 'jenis-anyaman')
                    const isSelected = isChecked(item.id, sub.id);
                    return (
                        <div 
                            key={sub.id} 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCheckboxChange(item.id, sub.id);
                            }}
                            className={`
                                pl-8 pr-4 py-2 text-sm cursor-pointer flex items-center gap-3 transition-colors
                                hover:bg-gray-100
                            `}
                        >
                            <div className={`
                                w-4 h-4 border border-[#2D2D2D] flex items-center justify-center
                                ${isSelected ? 'bg-[#2D2D2D]' : 'bg-white'}
                            `}>
                                {isSelected && <Check size={12} className="text-white" />}
                            </div>
                            <span className={`${isSelected ? 'font-medium' : 'text-gray-600'}`}>
                                {sub.label}
                            </span>
                        </div>
                    );
                }
                // Recursive call for non-checkbox items
                return renderItem(sub, level + 1);
             })}
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="border border-[#2D2D2D] bg-[#F2F2F2] text-raleway w-full">
      {items.map(item => renderItem(item))}
    </div>
  );
};

export default SidebarAccordion;