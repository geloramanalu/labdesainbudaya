import fs from 'fs';
import path from 'path';

export function getCraftsmanImages(slug: string) {
  // 1. target the specific folder for this craftsman
  const dirPath = path.join(process.cwd(), 'public/craftsmen', slug);

  // 2. check folder exist?
  if (!fs.existsSync(dirPath)) {
    return { thumbnail: null, gallery: [] };
  }

  // 3. read all files in that folder
  const files = fs.readdirSync(dirPath);

  // 4. find the thumbnail
  // matches 'thumbnail.jpg', 'thumbnail.png', etc.
  const thumbnailFile = files.find(file => file.match(/^thumbnail\.(jpg|jpeg|png|webp|heic|HEIC)$/i));
  const thumbnail = thumbnailFile ? `/craftsmen/${slug}/${thumbnailFile}` : null;

  // 5. find gallery images (detail-1, detail-2, etc.)
  // matches 'detail-X.jpg'
  const galleryFiles = files
    .filter(file => file.match(/^detail-\d+\.(jpg|jpeg|png|webp|heic|HEIC)$/i))
    .sort(); // ensures detail-1 comes before detail-2
  
  const gallery = galleryFiles.map(file => `/craftsmen/${slug}/${file}`);

  return { thumbnail, gallery };
}