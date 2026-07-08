'use client';

import React from 'react';
import { useSearchParams, notFound } from 'next/navigation';
import { useSupabaseItem } from '@/hooks/useSupabaseItem';
import { getEventImages } from '@/util/getEventImages';
import EventClient from './EventClient';
import { EventItem } from '@/data/eventsData';

interface DbEvent {
  id: number;
  title: string;
  description_id?: string;
  description_en?: string;
  year?: number | string;
  slug?: string;
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

function EventDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // Fetch the item
  const { data: dbItem, isLoading, error } = useSupabaseItem<DbEvent>('events', id);

  if (!id) {
    return notFound();
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading event details...</div>
      </div>
    );
  }

  if (error || !dbItem) {
    return notFound();
  }

  const slug = dbItem.slug || slugify(dbItem.title);
  const { thumbnail, gallery } = getEventImages(slug);

  const eventItem: EventItem = {
    id: dbItem.id,
    title: dbItem.title,
    content: dbItem.description_id || '',
    content_en: dbItem.description_en || '',
    year: dbItem.year ? Number(dbItem.year) : 2025,
    slug: slug,
  };

  return (
    <EventClient
      item={eventItem}
      thumbnail={thumbnail}
      gallery={gallery}
    />
  );
}

export default function EventDetailPage() {
  return (
    <React.Suspense fallback={
      <div className="container mx-auto px-4 py-8 max-w-[1440px] flex items-center justify-center min-h-[300px]">
        <div className="text-lg text-gray-500 animate-pulse">Loading...</div>
      </div>
    }>
      <EventDetailContent />
    </React.Suspense>
  );
}
