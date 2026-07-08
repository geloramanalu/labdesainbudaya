import { archiveImages } from '@/data/staticImageMap';

export function getArchiveImages(slug: string) {
  return archiveImages[slug] || { thumbnail: null, gallery: [] };
}