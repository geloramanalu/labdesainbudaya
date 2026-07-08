import { craftsmenImages } from '@/data/staticImageMap';

export function getCraftsmanImages(slug: string) {
  return craftsmenImages[slug] || { thumbnail: null, gallery: [] };
}