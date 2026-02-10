import fs from 'fs';
import path from 'path';

export function getCraftsmanImages(slug: string) {
  // 1. Target the specific folder
  const dirPath = path.join(process.cwd(), 'public/craftsmen', slug);

  // 2. Check if folder exists
  if (!fs.existsSync(dirPath)) {
    return { thumbnail: null, gallery: [] };
  }

  // 3. Read all files
  const files = fs.readdirSync(dirPath);

  // Helper: valid image extensions
  const isImage = (file: string) => /\.(jpg|jpeg|png|webp|heic|HEIC)$/i.test(file);

  // 4. Find Thumbnail (Loose Match)
  // Logic: First valid image file containing the word "thumbnail" (case-insensitive)
  const thumbnailFile = files.find(file => 
    file.toLowerCase().includes('thumbnail') && isImage(file)
  );

  const thumbnail = thumbnailFile ? `/craftsmen/${slug}/${thumbnailFile}` : null;

  // 5. Find Gallery Images (Loose Match)
  // Logic: Valid image files containing "detail", excluding the file we already picked as thumbnail
  const galleryFiles = files
    .filter(file => 
      file.toLowerCase().includes('detail') && 
      isImage(file) &&
      file !== thumbnailFile // Prevent duplicates
    )
    .sort(); // Sorts alphabetically
  
  const gallery = galleryFiles.map(file => `/craftsmen/${slug}/${file}`);

  return { thumbnail, gallery };
}