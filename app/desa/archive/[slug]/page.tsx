import { ARCHIVE_ITEMS } from '@/data/archiveData';
import { getArchiveImages } from '@/util/getArchiveImages';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ArchiveImageGallery from './ArchiveImageGallery'; // Import here

export async function generateStaticParams() {
  return ARCHIVE_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArchiveDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = ARCHIVE_ITEMS.find((i) => i.slug === slug);

  if (!item) return notFound();

  const { thumbnail, gallery } = getArchiveImages(slug);
  const otherItems = ARCHIVE_ITEMS
    .filter(i => i.id !== item.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <main className="min-h-screen text-[#2D2D2D]">
      <div className="mx-auto px-4 md:px-8 py-8 md:py-16">
        
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          
          {/* Info Section (Order 1) */}
          <div className="lg:col-span-4 flex flex-col order-1">
            <h1 className="text-5xl lg:text-7xl font-medium mb-6 tracking-tight">
              {item.title}
            </h1>
            <div className="text-gray-600 leading-relaxed text-sm md:text-base text-justify">
              <p>{item.detail}</p>
            </div>

            <div className="mt-10 space-y-6">
              {item.type_anyaman && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-bold">Tipe Anyaman</h4>
                  <p className="font-medium">{item.type_anyaman}</p>
                </div>
              )}
              {item.material_rotan && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-bold">Material ({item.material_rotan.type})</h4>
                  <p className="text-sm text-gray-600">{item.material_rotan.detail}</p>
                </div>
              )}
              {item.alat_produksi && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-bold">Alat: {item.alat_produksi.name}</h4>
                  <p className="text-sm text-gray-600">{item.alat_produksi.detail}</p>
                </div>
              )}
            </div>
          </div>

          <ArchiveImageGallery 
            initialImage={thumbnail} 
            gallery={gallery} 
            title={item.title} 
          />

          <div className="lg:col-span-4 lg:col-start-9 flex flex-col order-4">
             <div className="mt-auto border-t border-black pt-6">
              <h4 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Pengembangan Desain</h4>
              <p className="font-medium text-xl">{item.pengembangan_desain || "-"}</p>
            </div>
          </div>
        </div>

        {/* Suggestions Section */}
        <section className="border border-black p-6 md:p-10 bg-[#F5F5F5]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Koleksi Arsip Lainnya:</p>
              <h3 className="text-4xl md:text-5xl font-medium tracking-tight">Desa Trangsan</h3>
            </div>
            <Link href="/desa/archive" className="bg-[#2D2D2D] text-white px-8 py-3 flex items-center gap-6 hover:opacity-90 transition-opacity group group-hover:bg-[#1d1d1d]">
              <span className="text-sm font-medium group-hover:text-[#1d1d1d]">Lihat Semua</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {otherItems.map((other) => {
               const { thumbnail: otherThumb } = getArchiveImages(other.slug);
               return (
                <Link key={other.id} href={`/desa/archive/${other.slug}`} className="group block border border-gray-300 hover:border-black transition-colors">
                  <div className="relative aspect-square overflow-hidden bg-gray-200">
                    {otherThumb ? (
                      <Image src={otherThumb} alt={other.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                    )}
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <p className="font-medium text-sm truncate">{other.title}</p>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black shrink-0" />
                  </div>
                </Link>
               )
            })}
          </div>
        </section>

      </div>
    </main>
  );
}