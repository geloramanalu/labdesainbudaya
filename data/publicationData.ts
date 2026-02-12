
export interface PublicationItem {
  id: number;
  title: string;
  // Split 'type' into two fields
  type_id: "Artikel" | "Jurnal" | "Lainnya"; 
  type_en: "Article" | "Journal" | "Others";
  year: number;
  url: string;
  imageSrc: string;
}

export const PUBLICATION_DATA: PublicationItem[] = [
   {
      id: 1,
      title: "Mahasiswa Desain Interior UNS dan Chiba University Kembangkan Kerajinan Lokal Rotan Desa Trangsan",
      type_id: "Artikel",
      type_en: "Article",
      year: 2026,
      url: "https://uns.ac.id/id/uns-research/mahasiswa-desain-interior-uns-dan-chiba-university-kembangkan-kerajinan-lokal-rotan-desa-trangsan.html", 
      imageSrc: "/homepage/thumbnail-publikasi-2026.jpeg"
    },
    {
      id: 2,
      title: "Utilization of Augmented Reality and Direct Practices in Introducing Traditional Rice Farming Culture in Delanggu Subdistrict, Indonesia",
      type_id: "Jurnal",
      type_en: "Journal",
      year: 2025,
      url: "https://iopscience.iop.org/article/10.1088/1755-1315/1452/1/012002",
      imageSrc: "/homepage/thumbnail-publikasi-2025.png"
    },
    {
      id: 3,
      title: "Prodi Desain Interior UNS Lakukan Preservasi Padi Varietas Lokal di Desa Sabrang, Klaten",
      type_id: "Artikel",
      type_en: "Article",
      year: 2024,
      url: "https://uns.ac.id/id/pengabdian/prodi-desain-interior-uns-lakukan-preservasi-padi-varietas-lokal-di-desa-sabrang-klaten.html",
      imageSrc: "/homepage/thumbnail-publikasi-2024.jpeg"
    },
    {
      id: 4,
      title: "Integrating Local Culture and Sustainability in Educational Play Tools: Conceptual Design of a Punokawan Puzzle with PLA-Based 3D Printing",
      type_id: "Jurnal",
      type_en: "Journal",
      year: 2025,
      imageSrc: "/archive/gantungan-kunci/thumbnail.jpg", 
      url: "#" 
    },
    {
      id: 5,
      title: "Sustainable Rattan Craftsmanship: Bridging Tradition and Modernity",
      type_id: "Artikel",
      type_en: "Article",
      year: 2024,
      imageSrc: "/archive/kursi-lengkung/IMG_2488.png", 
      url: "#" 
    },
    {
      id: 6,
      title: "Community-Based Design: A Case Study in Central Java",
      type_id: "Lainnya",
      type_en: "Others",
      year: 2024,
      imageSrc: "/homepage/jurnal-thumbnail.png", 
      url: "#" 
    },
    {
      id: 7,
      title: "Digital Archiving of Tangible Cultural Heritage",
      type_id: "Jurnal",
      type_en: "Journal",
      year: 2024,
      imageSrc: "/homepage/desa-trangsan-card-thumbnail.png", 
      url: "#" 
    },
    {
      id: 8,
      title: "Mingei Philosophy in Contemporary Indonesian Design",
      type_id: "Artikel",
      type_en: "Article",
      year: 2024,
      imageSrc: "/archive/tempat-teh/thumbnail.jpg", 
      url: "#" 
    }
];