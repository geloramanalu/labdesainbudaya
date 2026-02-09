export interface Craftsman {
  id: number;
  slug: string; // added slug
  name: string;
  address: string;
  description: string;
}

export const CRAFTSMEN_INFO: Craftsman[] = [
  {
    id: 1,
    slug: "pak-suwarto", // ! folder name must match this exactly !
    name: "Pak Suwarto / Warta Rotan",
    address: "Jl. Sega, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Warto lahir dan besar di Trangsan. Orang tua dan kakek-neneknya semuanya merupakan pengrajin rotan..."
  },
  {
    id: 2,
    slug: "pak-triyono",
    name: "Pak Triyono / Tri Rotan",
    address: "Jl. Kubu, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Triyono lahir dan besar di Delanggu, kemudian menikah dengan sang istri yang berasal dari Trangsan..."
  },
  {
    id: 3,
    slug: "pak-sukino",
    name: "Pak Sukino / Kino Rotan",
    address: "Dusun II, Luwang, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Sukino adalah seorang pengrajin yang berasal dari Trangsan. Beliau membangun usahanya dari nol..."
  },
  {
    id: 4,
    slug: "pak-bambang",
    name: "Pak Bambang / Bambang Rotan",
    address: "Jl. Manau, Jamur, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Bambang lahir dan besar di Luwang. Beliau memulai usaha sejak tahun 90-an..."
  },
  {
    id: 5,
    slug: "pak-pungky",
    name: "Pak Pungky / Pratama Rotan",
    address: "Jl. Manau, Jamur, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Pungky memulai perjalanannya sebagai pengrajin pada tahun 2014..."
  },
  {
    id: 6,
    slug: "pak-daliman",
    name: "Pak Daliman / Ade Rotan",
    address: "Jl. Kubu, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Daliman merupakan seorang pengrajin rotan yang mewarisi keterampilannya..."
  },
  {
    id: 7,
    slug: "pak-sardimin",
    name: "Pak Sardimin / Mbah Kacong",
    address: "Jl. Kubu, Dusun Jamur, RT 02/RW06, Trangsan, Kec. Gatak, Kab. Sukoharjo...",
    description: "Pak Sardimin yang sering dikenal dengan nama Mbah Kacong ini sudah sejak kecil..."
  },
  {
    id: 8,
    slug: "pak-andi",
    name: "Pak Andi / Andi Rotan",
    address: "Jl. Dukuh, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Andi merupakan generasi ketiga di keluarganya yang menjadi pengrajin rotan..."
  },
  {
    id: 9,
    slug: "pak-seno",
    name: "Pak Seno / Seno Rotan",
    address: "Jl. Sarang Buaya, Dukuh Trangsan, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Seno adalah seorang owner kerajinan rotan yang meneruskan keahlian..."
  },
  {
    id: 10,
    slug: "pak-warsino",
    name: "Pak Warsino / Warna Warni Furniture",
    address: "Jl. Raya Gawok, Trangsan, Trosemi, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description: "Pak Warsino merupakan pengrajin rotan yang turun temurun dari keluarga..."
  },
  {
    id: 11,
    slug: "pak-purnomo",
    name: "Pak Purnomo / Arafif Meubeul",
    address: "Jl sibaliu no 5, Jl. Dukuh No.3/6, Trangsan, Kec. Gatak, Kabupaten Sukoharjo...",
    description: "Sekitar tahun 2000-an, Pak Purnomo berhenti bekerja dari perusahaan swasta..."
  },
  {
    id: 12,
    slug: "pak-sarbini",
    name: "Pak Sarbini / Sarbini Rotan",
    address: "Jl. Dukuh RT 03/RW 06 Dukuh, Trangsan, Kec. Gatak, Kab. Sukoharjo, jawa Tengah",
    description: "Pak Sarbini mengikuti jejak orang tuanya sebagai pengrajin rotan sejak 1972..."
  },
  {
    id: 13,
    slug: "pak-sardjito",
    name: "Pak Sardjito / Asri Rotan",
    address: "Jl. Manau, Tembungan, Trangsan, Kec. Gatak",
    description: "Pak Sardjito merupakan generasi ke 3 dalam meneruskan usaha keluarganya..."
  },
  {
    id: 14,
    slug: "pak-heru",
    name: "Pak Heru / Putra Jaya Rotan",
    address: "Jl. Raya Klewer, Trangsan, Kec. Gatak, Kab. Sukoharjo, jawa Tengah",
    description: "Pak Heru melanjutkan usaha keluarga yang sudah dirintis sejak zaman kakeknya..."
  },
  {
    id: 15,
    slug: "pak-ikhsan",
    name: "Pak Ikhsan / Putra Istana Rotan",
    address: "Jl. Tohiti Kramat, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description: "Pak Ikhsan sebagai generasi ketiga di keluarganya memiliki keterampilan khusus..."
  },
  {
    id: 16,
    slug: "tina-rotan",
    name: "Pak Joko dan Ibu Giyarti / Tina Rotan",
    address: "Jl. Kubu, Dusun Jamur, RT 02/RW06, Trangsan, Kec. Gatak, Kab. Sukoharjo...",
    description: "Pak Joko merupakan seorang pendatang dan kemudian menikah dengan istrinya..."
  },
  {
    id: 17,
    slug: "pak-triyanto",
    name: "Pak Triyanto / Agus Souvenir",
    address: "Jl. Lidah Buaya No.02, dusun Kudurejo, Purbayan, Kec. Baki, Kabupaten Sukoharjo...",
    description: "Pak Triyanto merupakan generasi ke 2 di keluarganya yang meneruskan menjadi pengrajin rotan..."
  },
  {
    id: 18,
    slug: "mas-teguh",
    name: "Mas Teguh / Warung Furniture",
    address: "Jl. Manau, Jamur, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Mas Teguh mulai menjadi pengrajin di tahun 2022 dan merupakan spesialis kerajinan..."
  },
  {
    id: 19,
    slug: "pak-muklis",
    name: "Pak Muklis / Micromini",
    address: "Trangsan, Kec. Gatak, Kabupaten Sukoharjo, Jawa Tengah 57557",
    description: "Keahlian yang diperoleh Pak Muklis berasal dari ajaran keluarga..."
  },
  {
    id: 20,
    slug: "pak-ari",
    name: "Pak Ari / Fadhil Rotan",
    address: "Kramat, Trangsan, Kec. Gatak, Kabupaten Sukoharjo, Jawa Tengah 57557",
    description: "Pak Ari melanjutkan usaha menjadi pengrajin rotan sudah sejak 10 tahun yang lalu..."
  },
  {
    id: 21,
    slug: "putra-istana-rotan",
    name: "Putra Istana Rotan",
    address: "Jl. Tohiti Kramat, Trangsan",
    description: "Saat ini, pemilik Putra Istana Rotan merupakan generasi ke 3 di keluarganya..."
  },
  {
    id: 22,
    slug: "pak-suparmin",
    name: "Pak Suparmin / Puji Furniture",
    address: "Jl. Sudan, Trangsan, Gawok, Kec. Gatak, Kab. Sukoharjo",
    description: "Puji Furniture ini sudah berdiri sejak 30 tahun yang lalu..."
  },
  {
    id: 23,
    slug: "pak-marjono",
    name: "Pak Marjono / Margo Husodo",
    address: "Jl. Raya Gawok, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description: "Pak Marjono memperoleh keterampilan secara turun-temurun dari keluarga..."
  },
  {
    id: 24,
    slug: "pak-supri",
    name: "Pak Supri / Rahmatika Rotan",
    address: "RT 02/RW 08, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description: "Pak Supri memulai usahanya sejak tahun 80-an. Keahlian membuat kerajinan rotan..."
  }
];