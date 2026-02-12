import { CRAFTSMEN_INFO } from '@/data/craftsmenData';
import { getCraftsmanImages } from '@/util/getCraftsmenImages';
import { notFound } from 'next/navigation';
import CraftsmanClient from './CraftsmanClient'; 

export async function generateStaticParams() {
  return CRAFTSMEN_INFO.map((craftsman) => ({
    slug: craftsman.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CraftsmanPage({ params }: PageProps) {
  const { slug } = await params;
  const craftsman = CRAFTSMEN_INFO.find((item) => item.slug === slug);

  if (!craftsman) {
    return notFound();
  }

  const { thumbnail, gallery } = getCraftsmanImages(slug);
  
  const otherCraftsmen = CRAFTSMEN_INFO
    .filter(c => c.id !== craftsman.id) 
    .sort(() => 0.5 - Math.random())    
    .slice(0, 4)
    .map(item => ({
      data: item,
      thumbnail: getCraftsmanImages(item.slug).thumbnail
    }));

  return (
    <CraftsmanClient 
      craftsman={craftsman} 
      thumbnail={thumbnail} 
      gallery={gallery} 
      otherCraftsmen={otherCraftsmen} 
    />
  );
}