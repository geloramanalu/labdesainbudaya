import React from 'react';
import { ARCHIVE_ITEMS } from '@/data/archiveData';
import { getArchiveImages } from '@/util/getArchiveImages';
import ArchivePaginatedGrid from './ArchivePaginatedGrid';

const ArchivePage = () => {
  const processedItems = ARCHIVE_ITEMS.map((item) => {
    const { thumbnail } = getArchiveImages(item.slug);
    
    return {
      id: item.id,
      title: item.title,
      slug: item.slug,
      thumbnail: thumbnail,
      type_anyaman: item.type_anyaman,
      material_rotan: item.material_rotan,
      alat_produksi: item.alat_produksi,
      pengembangan_desain: item.pengembangan_desain
    };
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1440px]">
       
       <ArchivePaginatedGrid items={processedItems} />
    </div>
  );
};

export default ArchivePage;