import { CRAFTSMEN_INFO } from '@/data/craftsmenData';
import { getCraftsmanImages } from '@/util/getCraftsmenImages'; // Update with your actual util path
import CraftsmenGrid from './CraftsmenGrid';
import CraftsmenPaginatedGrid from './CraftsmenPaginatedGrid';

// const Craftsmen = () => {
  
//   // We run the file-system check here for ALL items before sending to client.
//   const processedCraftsmen = CRAFTSMEN_INFO.map((item) => {
//     const { thumbnail } = getCraftsmanImages(item.slug);
    
//     // We only pass the necessary serializable data to the client component
//     return {
//       id: item.id,
//       name: item.name,
//       slug: item.slug,
//       thumbnail: thumbnail // This is either "/path/to/img.jpg" or null
//     };
//   });

//   return (
//     <div>
//       <CraftsmenGrid items={processedCraftsmen} />
//     </div>
//   )
// }

const Craftsmen = () => {
  
  // 1. Prepare Data on Server
  const processedCraftsmen = CRAFTSMEN_INFO.map((item) => {
    const { thumbnail } = getCraftsmanImages(item.slug);
    
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      thumbnail: thumbnail 
    };
  });

  return (
    <div>
      <CraftsmenPaginatedGrid items={processedCraftsmen} />
    </div>
  )
}

export default Craftsmen;