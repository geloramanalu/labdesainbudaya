import { eventImages } from '@/data/staticImageMap';

export function getEventImages(slug: string) {
  return eventImages[slug] || { thumbnail: null, gallery: [] };
}