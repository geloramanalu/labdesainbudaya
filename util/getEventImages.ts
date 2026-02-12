import fs from 'fs';
import path from 'path';

export function getEventImages(slug: string) {
  const dirPath = path.join(process.cwd(), 'public/events', slug);

  if (!fs.existsSync(dirPath)) return { thumbnail: null, gallery: [] };

  const files = fs.readdirSync(dirPath);

  const thumbnailFile = files.find(file => file.match(/^thumbnail\.(jpg|jpeg|png|webp|heic|HEIC)$/i));
  const thumbnail = thumbnailFile ? `/events/${slug}/${thumbnailFile}` : null;

  const galleryFiles = files
    .filter(file => file.match(/^detail-\d+\.(jpg|jpeg|png|webp|heic|HEIC)$/i))
    .sort();
  
  const gallery = galleryFiles.map(file => `/events/${slug}/${file}`);

  return { thumbnail, gallery };
}