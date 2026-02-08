import { ARCHIVE_ITEMS } from '@/data/archiveData'; // Your 17 items

// 1. This function tells Next.js WHICH pages to build
export async function generateStaticParams() {
  return ARCHIVE_ITEMS.map((item) => ({
    slug: item.id, // This must match the folder name [slug]
  }));
}

// 2. This is your actual page component
export default function Page({ params }: { params: { slug: string } }) {
  // Find the specific item data
  const item = ARCHIVE_ITEMS.find((i) => i.id === params.slug);

  if (!item) return <div>Not Found</div>;

  return (
    <div>
      <h1>{item.title}</h1>
      {/* ... rest of your layout */}
    </div>
  );
}