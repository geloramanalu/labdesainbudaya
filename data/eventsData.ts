export interface EventItem {
  id: number;
  title: string;
  content: string; 
  content_en?: string;
  year: number;
  slug: string;
  
}
export const EVENT_ITEMS = [
  //  {
  //   id: 1,
  //   title: "Grebek Penjalin",
  //   content: "Grebeg Penjalin adalah perayaan budaya yang diadakan di Desa Trangsan. Kegiatan ini mengangkat potensi Desa Trangsan sebagai sentra rotan sekaligus melestarikan budaya lokal.  Rangkaian kegiatan terdiri dari kirab budaya, kegiatan adat, dan bazar kerajinan rotan. Melalui kegiatan ini diharapkan dapat memberikan kesempatan bagi  pelaku usaha, terutama di Desa Trangsan untuk terus berkembang dan dikenal luas di tingkat nasional maupun internasional.",
  //   image: "/events/event-1.png",
  //   year: 2025
  // },
  {
    id: 2,
    title: "Menjalin Penjalin Rattan Workshop",
    content: "International Rattan Workshop adalah sebuah program kolaboratif antara Universitas Sebelas Maret dan Chiba University Jepang yang berfokus untuk memperkenalkan produk rotan sebagai identitas Desa Trangsan. Workshop ini mengusung pendekatan mingei yang menekankan tentang kerajinan rakyat dan peran komunitas lokal sebagai desainer utama. Program ini bertujuan melestarikan budaya dan tradisi lokal serta memperkenalkan produk rotan Trangsan ke tingkat internasional",
    year: 2025,
    slug: "menjalin-penjalin"
  },
]