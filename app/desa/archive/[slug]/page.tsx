import { ARCHIVE_ITEMS } from '@/data/archiveData';
import { getArchiveImages } from '@/util/getArchiveImages';
import { notFound } from 'next/navigation';
import ArchiveClient from './ArchiveClient';

export async function generateStaticParams() {
  return ARCHIVE_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArchiveDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = ARCHIVE_ITEMS.find((i) => i.slug === slug);

  if (!item) return notFound();

  const { thumbnail, gallery } = getArchiveImages(slug);
  
  // Pre-calculate suggestions and their images on server
  const otherItems = ARCHIVE_ITEMS
    .filter(i => i.id !== item.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map(other => ({
      data: other,
      thumbnail: getArchiveImages(other.slug).thumbnail
    }));

  return (
    <ArchiveClient 
      item={item} 
      thumbnail={thumbnail} 
      gallery={gallery} 
      otherItems={otherItems} 
    />
  );
}