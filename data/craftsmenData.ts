// populated from https://docs.google.com/spreadsheets/d/1IAiQMO9Lheu49FEVsxmAkwjRq6W8coAlBGLCx1f-ihQ/edit?usp=sharing
export interface Craftsman {
  id: number;
  slug: string;
  name: string;
  address: string;
  description_id: string;
  description_en: string;
}

export const CRAFTSMEN_INFO: Craftsman[] = [
  {
    id: 1,
    slug: "pak-suwarto",
    name: "Pak Suwarto / Warta Rotan",
    address: "Jl. Sega, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description_id: "Pak Warto lahir dan besar di Trangsan. Orang tua dan kakek-neneknya semuanya merupakan pengrajin rotan. Perjalanannya dimulai dari kebiasaannya melihat orang tuanya membuat berbagai kerajinan rotan tradisional. Sekarang, ia hanya menerima pekerjaan untuk menganyam beberapa bagian kecil dari sebuah furnitur, seperti bagian dudukannya saja.",
    description_en: "Pak Warto was born and raised in Trangsan. His parents and grandparents were all rattan craftsmen. His journey began with watching his parents make various traditional rattan crafts. Now, he only accepts jobs weaving small pieces of furniture, such as the seats.",
  },
  {
    id: 2,
    slug: "pak-triyono",
    name: "Pak Triyono / Tri Rotan",
    address: "Jl. Kubu, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description_id: "Pak Triyono lahir dan besar di Delanggu, kemudian menikah dengan sang istri yang berasal dari Trangsan. Sejak saat itu, beliau mulai mengenal kerajinan rotan lebih dekat. Dari sang mertua, pak Triyono belajar membuat bola takraw yang menjadi titik awal perjalanan kreatifnya menjadi pengrajin. Hingga saat ini, Pak Triyono berhasil membangun bisnisnya sendiri dan mengembangkan produk sesuai pesanan.",
    description_en: "Mr. Triyono was born and raised in Delanggu, then married his wife, who is from Trangsan. From then on, he became more familiar with rattan crafts. From his father-in-law, Mr. Triyono learned to make takraw balls, which marked the beginning of his creative journey as a craftsman. To date, Mr. Triyono has successfully built his own business and developed custom-made products.",
  },
  {
    id: 3,
    slug: "pak-sukino",
    name: "Pak Sukino / Kino Rotan",
    address: "Dusun II, Luwang, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description_id: "Pak Sukino adalah seorang pengrajin yang berasal dari Trangsan. Beliau membangun usahanya dari nol dengan ketekunan dan belajar secara otodidak. Saat ini, Pak Sukino dikenal dengan spesialisasinya dalam membuat kategori produk rumah tangga dan produk bermain, seperti kursi ece dan hulahop. Selain itu, Pak Sukino juga melayani permintaan khusus sesuai keinginan pelanggan.",
    description_en: "Mr. Sukino is a craftsman from Trangsan. He built his business from scratch through perseverance and self-study. Today, Mr. Sukino is known for specializing in household and play products, such as ece chairs and hula hoops. He also accommodates custom requests.",
  },
  {
    id: 4,
    slug: "pak-bambang",
    name: "Pak Bambang / Bambang Rotan",
    address: "Jl. Manau, Jamur, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description_id: "Pak Bambang lahir dan besar di Luwang. Beliau memulai usaha sejak tahun 90-an sebagai penyedia bahan baku rotan. Seiring berjalannya waktu, Pak Bambang mulai menekuni keterampilan sebagai pengrajin yang diperoleh dari belajar otodidak dan berbagi pengetahuan dengan sesama pengrajin. Dengan ketelatenan dan kreativitas, beliau menghasilkan produk kerajinan yang khas.",
    description_en: "Mr. Bambang was born and raised in Luwang. He started his business in the 1990s as a supplier of rattan raw materials. Over time, Mr. Bambang began to hone his skills as a craftsman, learning through self-study and sharing his knowledge with fellow craftsmen. With diligence and creativity, he produces distinctive crafts.",
  },
  {
    id: 5,
    slug: "pak-pungky",
    name: "Pak Pungky / Pratama Rotan",
    address: "Jl. Manau, Jamur, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description_id: "Pak Pungky memulai perjalanannya sebagai pengrajin pada tahun 2014. Terlahir di keluarga pengrajin rotan, beliau mewarisi keterampilan membuat kerajinan dari orang tuanya. Sebagian besar produk yang beliau hasilkan berasal dari keinginan pelanggan. Namun, dalam beberapa tahun terakhir beliau membuka peluang kolaborasi sebagai ruang eksplorasi yang dapat memperkaya kreativitas dalam berkarya.",
    description_en: "Mr. Pungky began his journey as a craftsman in 2014. Born into a family of rattan artisans, he inherited his crafting skills from his parents. Most of his products are custom-made to meet customer needs. However, in recent years, he has opened up opportunities for collaboration as a space for exploration that can enrich his creativity."
  },
  {
    id: 6,
    slug: "pak-daliman",
    name: "Pak Daliman / Ade Rotan",
    address: "Jl. Kubu, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description_id: "Pak Daliman merupakan seorang pengrajin rotan yang mewarisi keterampilannya secara turun-temurun sejak tahun 1992. Keahliannya dalam mengolah rotan kemudian berkembang, pada 2005 terbentuk UKM Adhe Rotan sebagai wadah untuk menjaga dan meneruskan tradisi keluarga.",
    description_en: "Mr. Daliman is a rattan craftsman who has inherited his skills from generation to generation since 1992. His expertise in processing rattan then developed, in 2005 the Adhe Rotan UKM was formed as a forum to maintain and continue the family tradition.",
  },
  {
    id: 7,
    slug: "pak-sardimin",
    name: "Pak Sardimin / Mbah Kacong",
    address: "Jl. Kubu, Dusun Jamur, RT 02/RW06, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah 57557",
    description_id: "Pak Sardimin yang sering dikenal dengan nama Mbah Kacong ini sudah sejak kecil membantu orangtuanya untuk membuat kerajinan rotan. Pada tahun 1997 ketika beliau berumur 16 tahun sudah mulai membuat anyaman.",
    description_en: "Mr. Sardimin, often known as Mbah Kacong, has been helping his parents make rattan crafts since childhood. In 1997, at the age of 16, he began weaving."
  },
  {
    id: 8,
    slug: "pak-andi",
    name: "Pak Andi / Andi Rotan",
    address: "Jl. Dukuh, Kramat, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description_id: "Pak Andi merupakan generasi ketiga di keluarganya yang menjadi pengrajin rotan. Pada awalnya pengolahan rotan dilakukan dengan teknik tradisional. Seiring berkembangnya waktu, mulai ada kombinasi material dan menggunakan alat produksi yang lebih memadai. Saat ini usahanya sudah berlangsung hingga 15 tahun dengan spesialisasi produk berupa barang rumah tangga.",
    description_en: "Mr. Andi is the third generation of his family to become a rattan craftsman. Initially, the rattan was processed using traditional techniques. Over time, he began combining materials and using more appropriate production equipment. His business has been running for 15 years, specializing in household goods."
  },
  {
    id: 9,
    slug: "pak-seno",
    name: "Pak Seno / Seno Rotan",
    address: "Jl. Sarang Buaya, Dukuh Trangsan, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description_id: "Pak Seno adalah seorang owner kerajinan rotan yang meneruskan keahlian dari orangtuanya dan merupakan generasi ke 2. Beliau sudah memiliki bakat dalam menjadi pengrajin sehingga mudah mempelajari rotan anyaman dan rangka.",
    description_en: "Mr. Seno is a rattan craft owner who continues the skills of his parents and is the second generation. He already has talent in being a craftsman so it is easy to learn rattan weaving and frames."
  },
  {
    id: 10,
    slug: "pak-warsino",
    name: "Pak Warsino / Warna Warni Furniture",
    address: "Jl. Raya Gawok, Trangsan, Trosemi, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description_id: "Pak Warsino merupakan pengrajin rotan yang turun temurun dari keluarga, yaitu Ki Demang yang merupakan om dari Pak Warsito. Keahlian ini dimiliki karena belajar dari Ki Demang yang kemudian pindah ke Trangsan untuk membuat kerajinan rotan.",
    description_en: "Mr. Warsino is a rattan craftsman whose skills have been passed down through generations through his family, including Ki Demang, Pak Warsito's uncle. He learned this skill from Ki Demang, who later moved to Trangsan to make rattan crafts."
  },
  {
    id: 11,
    slug: "pak-purnomo",
    name: "Pak Purnomo / Arafif Meubeul",
    address: "Jl sibaliu no 5, Jl. Dukuh No.3/6, Trangsan, Kec. Gatak, Kabupaten Sukoharjo, Jawa Tengah 57557",
    description_id: "Sekitar tahun 2000-an, Pak Purnomo berhenti bekerja dari perusahaan swasta dan beralih untuk belajar mengenai rotan. Dahulu hanya tengkulak saja, tetapi sekarang beliau sudah bisa membuat produk sendiri dan menjualnya secara online.",
    description_en: "Around the 2000s, Mr. Purnomo quit his private company job and began learning about rattan. Previously a middleman, he now makes his own products and sells them online."
  },
  {
    id: 12,
    slug: "pak-sarbini",
    name: "Pak Sarbini / Sarbini Rotan",
    address: "Jl. Dukuh RT 03/RW 06 Dukuh, Trangsan, Kec. Gatak, Kab. Sukoharjo, jawa Tengah",
    description_id: "Pak Sarbini mengikuti jejak orang tuanya sebagai pengrajin rotan sejak 1972. Pengetahuan dan keterampilannya tentang kerajinan rotan diperoleh secara turun-temurun. jenis produk yang dibuat sangat beragam, seperti keranjang bayi, rak, dan keranjang buah.",
    description_en: "Mr. Sarbini has followed in his parents' footsteps as a rattan craftsman since 1972. His knowledge and skills in rattan crafts have been passed down through generations. He creates a wide variety of products, including baby baskets, shelves, and fruit baskets."
  },
  {
    id: 13,
    slug: "pak-sardjito",
    name: "Pak Sardjito / Asri Rotan",
    address: "Jl. Manau, Tembungan, Trangsan, Kec. Gatak",
    description_id: "Pak Sardjito merupakan generasi ke 3 dalam meneruskan usaha keluarganya menjadi pengrajin rotan. Pada tahun 1984, beliau masih menjadi buruh yang kemudian diminta untuk mengikuti beberapa pameran. Setelah di undang di beberapa pameran, akhirnya beliau memutuskan untuk berdiri sendiri.",
    description_en: "Mr. Sardjito is the third generation to continue his family's rattan business. In 1984, while still a laborer, he was asked to participate in several exhibitions. After being invited to several exhibitions, he finally decided to strike out on his own."
  },
  {
    id: 14,
    slug: "pak-heru",
    name: "Pak Heru / Putra Jaya Rotan",
    address: "Jl. Raya Klewer, Trangsan, Kec. Gatak, Kab. Sukoharjo, jawa Tengah",
    description_id: "Pak Heru melanjutkan usaha keluarga yang sudah dirintis sejak zaman kakeknya. Hingga saat ini, usaha tersebut telah berkembang dan bertahan lintas generasi, menjadikan Pak Heru sebagai generasi ketiga. Produk utama yang dihasilkan meliputi box, pot bunga, dan aksesoris.",
    description_en: "Mr. Heru continues the family business that began in his grandfather's time. To date, the business has grown and endured across generations, making Mr. Heru the third generation. Their main products include boxes, flower pots, and accessories."
  },
  {
    id: 15,
    slug: "pak-ikhsan",
    name: "Pak Ikhsan / Putra Istana Rotan",
    address: "Jl. Tohiti Kramat, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description_id: "Pak Ikhsan sebagai generasi ketiga di keluarganya memiliki keterampilan khusus dalam membuat anyaman truntum dan anyaman tokek. Jenis produk yang dihasilkan memiliki keunikan tersendiri, seperti kursi raja dan kursi keong. Selain itu, beliau juga membuat berbagai kategori kerajinan lainnya, mulai dari kerajinan rumah tangga, mainan, hingga produk sosial dan tradisi.",
    description_en: "As the third generation in his family, Mr. Ikhsan specializes in weaving truntum and gecko. His products are unique, including king chairs and snail chairs. He also creates a variety of other crafts, from household items and toys to social and traditional products."
  },
  {
    id: 16,
    slug: "tina-rotan",
    name: "Pak Joko dan Ibu Giyarti / Tina Rotan",
    address: "Jl. Kubu, Dusun Jamur, RT 02/RW06, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah 57557",
    description_id: "Pak Joko merupakan seorang pendatang dan kemudian menikah dengan istrinya yang berasal dari Trangsan. Keahlian Pak Joko dalam membuat kerajinan rotan ini didapat karena belajar dari mertuanya di tahun 2000-an. Dalam membuat produk, Pak Joko membuat desainnya sendiri.",
    description_en: "Mr. Joko is a migrant who later married his wife, a native of Trangsan. He learned his expertise in rattan crafts from his in-laws in the 2000s. He creates his own designs for his products."
  },
  {
    id: 17,
    slug: "pak-triyanto",
    name: "Pak Triyanto / Agus Souvenir",
    address: "Jl. Lidah Buaya No.02, dusun Kudurejo, Purbayan, Kec. Baki, Kabupaten Sukoharjo",
    description_id: "Pak Triyanto merupakan generasi ke 2 di keluarganya yang meneruskan menjadi pengrajin rotan. Keahlian yang dimiliki diwariskan dari Bapak beliau dan kemudian melanjutkannya bersama adik Pak Triyanto.",
    description_en: "Mr. Triyanto is the second generation of his family to continue the rattan craftsmanship. He inherited his skills from his father, and they were later passed on to his younger brother."
  },
  {
    id: 18,
    slug: "mas-teguh",
    name: "Mas Teguh / Warung Furniture",
    address: "Jl. Manau, Jamur, Kec. Gatak, Kab. Sukoharjo. Jawa Tengah 57557",
    description_id: "Mas Teguh mulai menjadi pengrajin di tahun 2022 dan merupakan spesialis kerajinan yang berupa peti mati.",
    description_en: "Mas Teguh started his career as a craftsman in 2022 and specializes in coffin crafts."
  },
   // {
  //   id: 19,
  //   slug: "pak-muklis",
  //   name: "Pak Muklis / Micromini",
  //   address: "Trangsan, Kec. Gatak, Kabupaten Sukoharjo, Jawa Tengah 57557",
  //   description_id: "Keahlian yang diperoleh Pak Muklis berasal dari ajaran keluarga dan kemudian melanjutkan usaha tersebut. Beliau merupakan spesialis produk kursi, kaca, dingklik, tempat gelas, kap lampu.",
  // description_en: ""
  // },
  {
    id: 20,
    slug: "pak-ari",
    name: "Pak Ari / Fadhil Rotan",
    address: "Kramat, Trangsan, Kec. Gatak, Kabupaten Sukoharjo, Jawa Tengah 57557",
    description_id: "Pak Ari melanjutkan usaha menjadi pengrajin rotan sudah sejak 10 tahun yang lalu dan usahanya pun turun temurun. Beliau merupakan pengrajin spesialis produk boncengan rotan.",
    description_en: "Mr. Ari has been a rattan craftsman for the past 10 years, and his business has been passed down through generations. He specializes in rattan ride-on products."
  },
  {
    id: 21,
    slug: "putra-istana-rotan",
    name: "Putra Istana Rotan",
    address: "Jl. Tohiti Kramat, Trangsan",
    description_id: "Saat ini, pemilik Putra Istana Rotan merupakan generasi ke 3 di keluarganya dan sejak kecil sudah diajarkan oleh orang tua beliau. Spesialisasi produk pada Putra Istana Rotan berupa kursi raja dan kursi keong.",
    description_en: "The current owner of Putra Istana Rotan is the third generation in his family, having been taught by his parents since childhood. Putra Istana Rotan specializes in royal chairs and snail chairs."
  },
  {
    id: 22,
    slug: "pak-suparmin",
    name: "Pak Suparmin / Puji Furniture",
    address: "Jl. Sudan, Trangsan, Gawok, Kec. Gatak, Kab. Sukoharjo",
    description_id: "Puji Furniture ini sudah berdiri sejak 30 tahun yang lalu. Proses produksinya hanya sebagai suplier, mengambil barang dari pengrajin, melakukan proses finishing, lalu dijual. Puji Furnitur merupakan spesialis produk yang berupa furnitur rumah tangga dan dekorasi.",
    description_en: "Puji Furniture has been around for 30 years. Its production process is limited to supplying items from craftsmen, finishing them, and then selling them. Puji Furniture specializes in home furniture and decor."
  },
  {
    id: 23,
    slug: "pak-marjono",
    name: "Pak Marjono / Margo Husodo",
    address: "Jl. Raya Gawok, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description_id: "Pak Marjono memperoleh keterampilan secara turun-temurun dari keluarga. Di samping itu, beliau juga belajar langsung dari Ki Demang. Awal mula menjadi pengrajin dimulai pada tahun 1957, produk pertama yang dibuat adalah manekin rotan dan cangkrik dawet. Saat ini, Pak Marjono lebih sering membuat kursi rotan.",
    description_en: "Mr. Marjono inherited his skills from his family. He also learned directly from Ki Demang. He began his career as a craftsman in 1957, producing rattan mannequins and dawet (a type of bamboo). Currently, Mr. Marjono mostly makes rattan chairs."
  },
  {
    id: 24,
    slug: "pak-supri",
    name: "Pak Supri / Rahmatika Rotan",
    address: "RT 02/RW 08, Trangsan, Kec. Gatak, Kab. Sukoharjo, Jawa Tengah",
    description_id: "Pak Supri memulai usahanya sejak tahun 80-an. Keahlian membuat kerajinan rotan diperoleh dari orang tuanya. Jenis produk yang dihasilkan berupa dekorasi dan aksesoris, seperti hiasan dinding, frame kaca, dan gantungan.",
    description_en: "Mr. Supri started his business in the 1980s. He inherited his rattan crafting skills from his parents. His products include decorations and accessories, such as wall hangings, glass frames, and hangers."
  }
];