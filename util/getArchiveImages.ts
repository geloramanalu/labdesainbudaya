import fs from 'fs';
import path from 'path';

export function getArchiveImages(slug: string) {
  const dirPath = path.join(process.cwd(), 'public/archive', slug);

  if (!fs.existsSync(dirPath)) {
    return { thumbnail: null, gallery: [] };
  }

  const files = fs.readdirSync(dirPath);

  const thumbnailFile = files.find(file => file.match(/^thumbnail\.(jpg|jpeg|png|webp|heic|HEIC)$/i));
  const thumbnail = thumbnailFile ? `/archive/${slug}/${thumbnailFile}` : null;

  const galleryFiles = files
    .filter(file => file.match(/^detail-\d+\.(jpg|jpeg|png|webp|heic|HEIC)$/i))
    .sort();
  
  const gallery = galleryFiles.map(file => `/archive/${slug}/${file}`);

  return { thumbnail, gallery };
}