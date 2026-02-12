import { EVENT_ITEMS } from '@/data/eventsData';
import { getEventImages } from '@/util/getEventImages';
import { notFound } from 'next/navigation';
import EventClient from './EventClient';

export async function generateStaticParams() {
  return EVENT_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export default async function EventsDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = EVENT_ITEMS.find((i) => i.slug === slug);

  if (!item) return notFound();

  const { thumbnail, gallery } = getEventImages(slug);

  return (
    <EventClient 
      item={item} 
      thumbnail={thumbnail} 
      gallery={gallery} 
    />
  );
}