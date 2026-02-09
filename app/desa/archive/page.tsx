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
      thumbnail: thumbnail 
    };
  });

  return (
    <ArchivePaginatedGrid items={processedItems} />
  );
};

export default ArchivePage;