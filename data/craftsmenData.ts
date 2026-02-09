export interface Craftsman {
  id: number;
  slug: string;
  name: string;
  address: string;
  description: string;
}

export const CRAFTSMEN_INFO: Craftsman[] = [
  {
    id: 1,
    slug: "pak-suwarto",
    name: "Pak Suwarto / Warta Rotan",
    address: "Jl. Sega, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Warto lahir dan besar di Trangsan. Orang tua dan kakek-neneknya semuanya merupakan pengrajin rotan. Perjalanannya dimulai dari kebiasaannya melihat orang tuanya membuat berbagai kerajinan rotan tradisional. Sekarang, ia hanya menerima pekerjaan untuk menganyam beberapa bagian kecil dari sebuah furnitur, seperti bagian dudukannya saja."
  },
  {
    id: 2,
    slug: "pak-triyono",
    name: "Pak Triyono / Tri Rotan",
    address: "Jl. Kubu, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Triyono lahir dan besar di Delanggu, kemudian menikah dengan sang istri yang berasal dari Trangsan. Sejak saat itu, beliau mulai mengenal kerajinan rotan lebih dekat. Dari sang mertua, pak Triyono belajar membuat bola takraw yang menjadi titik awal perjalanan kreatifnya menjadi pengrajin. Hingga saat ini, Pak Triyono berhasil membangun bisnisnya sendiri dan mengembangkan produk sesuai pesanan."
  },
  {
    id: 3,
    slug: "pak-sukino",
    name: "Pak Sukino / Kino Rotan",
    address: "Dusun II, Luwang, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Sukino adalah seorang pengrajin yang berasal dari Trangsan. Beliau membangun usahanya dari nol dengan ketekunan dan belajar secara otodidak. Saat ini, Pak Sukino dikenal dengan spesialisasinya dalam membuat kategori produk rumah tangga dan produk bermain, seperti kursi ece dan hulahop. Selain itu, Pak Sukino juga melayani permintaan khusus sesuai keinginan pelanggan."
  },
  {
    id: 4,
    slug: "pak-bambang",
    name: "Pak Bambang / Bambang Rotan",
    address: "Jl. Manau, Jamur, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Bambang lahir dan besar di Luwang. Beliau memulai usaha sejak tahun 90-an sebagai penyedia bahan baku rotan. Seiring berjalannya waktu, Pak Bambang mulai menekuni keterampilan sebagai pengrajin yang diperoleh dari belajar otodidak dan berbagi pengetahuan dengan sesama pengrajin. Dengan ketelatenan dan kreativitas, beliau menghasilkan produk kerajinan yang khas."
  },
  {
    id: 5,
    slug: "pak-pungky",
    name: "Pak Pungky / Pratama Rotan",
    address: "Jl. Manau, Jamur, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Pungky memulai perjalanannya sebagai pengrajin pada tahun 2014. Terlahir di keluarga pengrajin rotan, beliau mewarisi keterampilan membuat kerajinan dari orang tuanya. Sebagian besar produk yang beliau hasilkan berasal dari keinginan pelanggan. Namun, dalam beberapa tahun terakhir beliau membuka peluang kolaborasi sebagai ruang eksplorasi yang dapat memperkaya kreativitas dalam berkarya."
  },
  {
    id: 6,
    slug: "pak-daliman",
    name: "Pak Daliman / Ade Rotan",
    address: "Jl. Kubu, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Daliman merupakan seorang pengrajin rotan yang mewarisi keterampilannya secara turun-temurun sejak tahun 1992. Keahliannya dalam mengolah rotan kemudian berkembang, pada 2005 terbentuk UKM Adhe Rotan sebagai wadah untuk menjaga dan meneruskan tradisi keluarga."
  },
  {
    id: 7,
    slug: "pak-sardimin",
    name: "Pak Sardimin / Mbah Kacong",
    address: "Jl. Kubu, Dusun Jamur, RT 02/RW06, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah 57557",
    description: "Pak Sardimin yang sering dikenal dengan nama Mbah Kacong ini sudah sejak kecil membantu orangtuanya untuk membuat kerajinan rotan. Pada tahun 1997 ketika beliau berumur 16 tahun sudah mulai membuat anyaman."
  },
  {
    id: 8,
    slug: "pak-andi",
    name: "Pak Andi / Andi Rotan",
    address: "Jl. Dukuh, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Andi merupakan generasi ketiga di keluarganya yang menjadi pengrajin rotan. Pada awalnya pengolahan rotan dilakukan dengan teknik tradisional. Seiring berkembangnya waktu, mulai ada kombinasi material dan menggunakan alat produksi yang lebih memadai. Saat ini usahanya sudah berlangsung hingga 15 tahun dengan spesialisasi produk berupa barang rumah tangga."
  },
  {
    id: 9,
    slug: "pak-seno",
    name: "Pak Seno / Seno Rotan",
    address: "Jl. Sarang Buaya, Dukuh Trangsan, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Pak Seno adalah seorang owner kerajinan rotan yang meneruskan keahlian dari orangtuanya dan merupakan generasi ke 2. Beliau sudah memiliki bakat dalam menjadi pengrajin sehingga mudah mempelajari rotan anyaman dan rangka."
  },
  {
    id: 10,
    slug: "pak-warsino",
    name: "Pak Warsino / Warna Warni Furniture",
    address: "Jl. Raya Gawok, Trangsan, Trosemi, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description: "Pak Warsino merupakan pengrajin rotan yang turun temurun dari keluarga, yaitu Ki Demang yang merupakan om dari Pak Warsito. Keahlian ini dimiliki karena belajar dari Ki Demang yang kemudian pindah ke Trangsan untuk membuat kerajinan rotan."
  },
  {
    id: 11,
    slug: "pak-purnomo",
    name: "Pak Purnomo / Arafif Meubeul",
    address: "Jl sibaliu no 5, Jl. Dukuh No.3/6, Trangsan, Kec. Gatak, Kabupaten Sukoharjo, Jawa Tengah 57557",
    description: "Sekitar tahun 2000-an, Pak Purnomo berhenti bekerja dari perusahaan swasta dan beralih untuk belajar mengenai rotan. Dahulu hanya tengkulak saja, tetapi sekarang beliau sudah bisa membuat produk sendiri dan menjualnya secara online."
  },
  {
    id: 12,
    slug: "pak-sarbini",
    name: "Pak Sarbini / Sarbini Rotan",
    address: "Jl. Dukuh RT 03/RW 06 Dukuh, Trangsan, Kec. Gatak, Kab. Sukoharjo, jawa Tengah",
    description: "Pak Sarbini mengikuti jejak orang tuanya sebagai pengrajin rotan sejak 1972. Pengetahuan dan keterampilannya tentang kerajinan rotan diperoleh secara turun-temurun. jenis produk yang dibuat sangat beragam, seperti keranjang bayi, rak, dan keranjang buah."
  },
  {
    id: 13,
    slug: "pak-sardjito",
    name: "Pak Sardjito / Asri Rotan",
    address: "Jl. Manau, Tembungan, Trangsan, Kec. Gatak",
    description: "Pak Sardjito merupakan generasi ke 3 dalam meneruskan usaha keluarganya menjadi pengrajin rotan. Pada tahun 1984, beliau masih menjadi buruh yang kemudian diminta untuk mengikuti beberapa pameran. Setelah di undang di beberapa pameran, akhirnya beliau memutuskan untuk berdiri sendiri."
  },
  {
    id: 14,
    slug: "pak-heru",
    name: "Pak Heru / Putra Jaya Rotan",
    address: "Jl. Raya Klewer, Trangsan, Kec. Gatak, Kab. Sukoharjo, jawa Tengah",
    description: "Pak Heru melanjutkan usaha keluarga yang sudah dirintis sejak zaman kakeknya. Hingga saat ini, usaha tersebut telah berkembang dan bertahan lintas generasi, menjadikan Pak Heru sebagai generasi ketiga. Produk utama yang dihasilkan meliputi box, pot bunga, dan aksesoris."
  },
  {
    id: 15,
    slug: "pak-ikhsan",
    name: "Pak Ikhsan / Putra Istana Rotan",
    address: "Jl. Tohiti Kramat, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description: "Pak Ikhsan sebagai generasi ketiga di keluarganya memiliki keterampilan khusus dalam membuat anyaman truntum dan anyaman tokek. Jenis produk yang dihasilkan memiliki keunikan tersendiri, seperti kursi raja dan kursi keong. Selain itu, beliau juga membuat berbagai kategori kerajinan lainnya, mulai dari kerajinan rumah tangga, mainan, hingga produk sosial dan tradisi."
  },
  {
    id: 16,
    slug: "tina-rotan",
    name: "Pak Joko dan Ibu Giyarti / Tina Rotan",
    address: "Jl. Kubu, Dusun Jamur, RT 02/RW06, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah 57557",
    description: "Pak Joko merupakan seorang pendatang dan kemudian menikah dengan istrinya yang berasal dari Trangsan. Keahlian Pak Joko dalam membuat kerajinan rotan ini didapat karena belajar dari mertuanya di tahun 2000-an. Dalam membuat produk, Pak Joko membuat desainnya sendiri."
  },
  {
    id: 17,
    slug: "pak-triyanto",
    name: "Pak Triyanto / Agus Souvenir",
    address: "Jl. Lidah Buaya No.02, dusun Kudurejo, Purbayan, Kec. Baki, Kabupaten Sukoharjo",
    description: "Pak Triyanto merupakan generasi ke 2 di keluarganya yang meneruskan menjadi pengrajin rotan..." // Data for ID 17 was not included in the provided text update.
  },
  {
    id: 18,
    slug: "mas-teguh",
    name: "Mas Teguh / Warung Furniture",
    address: "Jl. Manau, Jamur, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description: "Mas Teguh mulai menjadi pengrajin di tahun 2022 dan merupakan spesialis kerajinan yang berupa peti mati."
  },
  {
    id: 19,
    slug: "pak-muklis",
    name: "Pak Muklis / Micromini",
    address: "Trangsan, Kec. Gatak, Kabupaten Sukoharjo, Jawa Tengah 57557",
    description: "Keahlian yang diperoleh Pak Muklis berasal dari ajaran keluarga dan kemudian melanjutkan usaha tersebut. Beliau merupakan spesialis produk kursi, kaca, dingklik, tempat gelas, kap lampu."
  },
  {
    id: 20,
    slug: "pak-ari",
    name: "Pak Ari / Fadhil Rotan",
    address: "Kramat, Trangsan, Kec. Gatak, Kabupaten Sukoharjo, Jawa Tengah 57557",
    description: "Pak Ari melanjutkan usaha menjadi pengrajin rotan sudah sejak 10 tahun yang lalu dan usahanya pun turun temurun. Beliau merupakan pengrajin spesialis produk boncengan rotan."
  },
  {
    id: 21,
    slug: "putra-istana-rotan",
    name: "Putra Istana Rotan",
    address: "Jl. Tohiti Kramat, Trangsan",
    description: "Saat ini, pemilik Putra Istana Rotan merupakan generasi ke 3 di keluarganya dan sejak kecil sudah diajarkan oleh orang tua beliau. Spesialisasi produk pada Putra Istana Rotan berupa kursi raja dan kursi keong."
  },
  {
    id: 22,
    slug: "pak-suparmin",
    name: "Pak Suparmin / Puji Furniture",
    address: "Jl. Sudan, Trangsan, Gawok, Kec. Gatak, Kab. Sukoharjo",
    description: "Puji Furniture ini sudah berdiri sejak 30 tahun yang lalu. Proses produksinya hanya sebagai suplier, mengambil barang dari pengrajin, melakukan proses finishing, lalu dijual. Puji Furnitur merupakan spesialis produk yang berupa furnitur rumah tangga dan dekorasi."
  },
  {
    id: 23,
    slug: "pak-marjono",
    name: "Pak Marjono / Margo Husodo",
    address: "Jl. Raya Gawok, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description: "Pak Marjono memperoleh keterampilan secara turun-temurun dari keluarga. Di samping itu, beliau juga belajar langsung dari Ki Demang. Awal mula menjadi pengrajin dimulai pada tahun 1957, produk pertama yang dibuat adalah manekin rotan dan cangkrik dawet. Saat ini, Pak Marjono lebih sering membuat kursi rotan."
  },
  {
    id: 24,
    slug: "pak-supri",
    name: "Pak Supri / Rahmatika Rotan",
    address: "RT 02/RW 08, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description: "Pak Supri memulai usahanya sejak tahun 80-an. Keahlian membuat kerajinan rotan diperoleh dari orang tuanya. Jenis produk yang dihasilkan berupa dekorasi dan aksesoris, seperti hiasan dinding, frame kaca, dan gantungan."
  }
];