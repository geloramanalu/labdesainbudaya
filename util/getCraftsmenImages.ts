import fs from 'fs';
import path from 'path';

// PSA: make sure craftsmen folder contains image that are STANDARDIZED
// STANDARDIZED: no multiple v1/v2/revision image for both thumbnail & detail with vague naming
// if possible, have naming convention for image files
// rationale being, current logic -- loose matching allows multiple similar filenames that are quite ambiguistic
// e.g. thumbnail.jpg, thumbnail-final.jpg in a folder. this leads to unpredictable matchign at a large scale
export function getCraftsmanImages(slug: string) {
  const dirPath = path.join(process.cwd(), 'public/craftsmen', slug);

  if (!fs.existsSync(dirPath)) {
    return { thumbnail: null, gallery: [] };
  }

  const files = fs.readdirSync(dirPath);

  const isImage = (file: string) => /\.(jpg|jpeg|png|webp|heic|HEIC)$/i.test(file);

  // loose matching thumbnail 
  // logic: First valid image file containing the word "thumbnail" (case-insensitive)
  const thumbnailFile = files.find(file => 
    file.toLowerCase().includes('thumbnail') && isImage(file)
  );

  const thumbnail = thumbnailFile ? `/craftsmen/${slug}/${thumbnailFile}` : null;

  // loose matching detail/gallery image
  // Logic: Valid image files containing "detail", excluding the file we already picked as thumbnail
  const galleryFiles = files
    .filter(file => 
      file.toLowerCase().includes('detail') && 
      isImage(file) &&
      file !== thumbnailFile // prevent duplicates
    )
    .sort(); // sorts alphabetically (e.g. "detail-A-BuBroto" comes before "detail-B-PakJoni")
  
  const gallery = galleryFiles.map(file => `/craftsmen/${slug}/${file}`);

  return { thumbnail, gallery };
}