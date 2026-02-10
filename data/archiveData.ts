// populated from https://docs.google.com/spreadsheets/d/1IAiQMO9Lheu49FEVsxmAkwjRq6W8coAlBGLCx1f-ihQ/edit?usp=sharing
export interface ArchiveItem {
  id: number;
  slug: string;
  title: string;
  description_id: string;
  description_en: string;
  image: string;
  type_anyaman?: string;
  material_rotan?: {
    type: string;
    detail_id: string;
    detail_en: string;
  };
  alat_produksi?: {
    name: string;
    detail_id: string;
    detail_en: string;
  };
  pengembangan_desain?: string;
}

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 1,
    slug: "bola-takraw",
    title: "Bola Takraw",
    description_id: "Sepak Takraw merupakan permainan tradisional yang memiliki aturan seperti voli namun dimainkan menggunakan kaki. Bola takraw dibuat dari material rotan ulu dengan diameter 10 -13 cm dengan alur produksi antara lain: membelah rotan ulu menjadi 3–4 bilah, membersihkan rotan dengan teknik sisik, yaitu dengan memasukkan bilah rotan ke alat serit, dan menganyam rotan menjadi bola takraw. Setiap bola menggunakan 3 bilah rotan, yang kemudian dianyam sebanyak 9 kali hingga membentuk sebuah bola.",
    description_en: "Sepak Takraw is a traditional game with rules similar to volleyball, but played with the feet. Takraw balls are made from ulu rattan with a diameter of 10-13 cm. The production process includes: splitting the ulu rattan into 3-4 strips, cleaning the rattan using a slicing technique, which involves inserting the strips into a serit tool, and weaving the rattan into a takraw ball. Each ball uses 3 strips of rattan, which are then woven nine times to form a ball.",
    image: "/archive/bola-takraw/thumbnail.png",
    type_anyaman: "Durno",
    material_rotan: {
      type: "Pitrit",
      detail_id: "Pitrit merupakan jenis rotan dengan bentuk menyerupai lidi dengan panjang mencapai 6 meter. Rotan ini berukuran kecil dan bersifat lunak. Rotan pitrit biasanya digunakan untuk membuat produk yang membutuhkan kelenturan dan detail estetis.",
      detail_en: "Pitrit is a type of rattan with a stick-like shape and can reach up to 6 meters in length. It is small and soft. Pitrit rattan is typically used to create products that require flexibility and aesthetic detail.",
    },
    alat_produksi: {
      name: "Gol Kayu",
      detail_id: "Alat ini digunakan untuk membengkokkan rotan berukuran kecil secara manual.",
      detail_en: "This tool is used to bend small rattan manually.",
    },
    pengembangan_desain: "Pitrit Bag",
  },
  {
    id: 2,
    slug: "dingklik",
    title: "Dingklik",
    description_id: "Dingklik memiliki fungsi sebagai kursi dengan posisi mendekati lantai dan juga sebagai pijakan untuk mencapai tempat yang agak tinggi. Dingklik biasanya terbuat dari material rotan CL/mandola dan rotan jawit.",
    description_en: "A dingklik serves as a chair positioned close to the floor and also as a step for reaching higher places. Dingkliks are typically made from CL/mandola rattan and jawit rattan.",
    image: "/archive/dingklik/thumbnail.png",
    type_anyaman: "Diamond Tengah",
    material_rotan: {
      type: "Rotan Semi Poles",
      detail_id: "Rotan semi poles adalah jenis rotan yang sudah melalui proses pengupasan kulit dan permukaannya telah dihaluskan, tetapi masih menyisakan tekstur alami dari rotan tersebut. Umumnya, rotan ini belum dilapisi pelindung atau lapisan warna. Produk yang dihasilkan dari material rotan semi poles akan memiliki tampilan yang natural.",
      detail_en: "Semi-polished rattan is a type of rattan that has undergone a skin-stripping process and a smoothed surface, but still retains its natural texture. Generally, this rattan has not been coated with a protective coating or color. Products made from semi-polished rattan will have a natural appearance.",
    },
    alat_produksi: {
      name: "Gol Besi",
      detail_id: "Alat ini digunakan untuk melindungi tangan saat membengkokkan rotan dengan suhu tinggi.",
      detail_en: "This tool is used to protect hands when bending rattan at high temperatures.",
    },
    pengembangan_desain: "Kobayashi Tray",
  },
  // {
  //   id: 3,
  //   slug: "gelas",
  //   title: "Gelas",
  //   description_id: "Gelas ini dibuat pada tahun 2018-2019 dengan permintaan klien. Material yang digunakan yaitu rotan pitrit dengan finishing waterbase.",
  //   description_en: "",
  //   image: "/archive/gelas/thumbnail.png",
  //   type_anyaman: "Double 3",
  //   material_rotan: {
  //     type: "Rotan Sega",
  //     detail_id: "Rotan sega adalah jenis rotan berkualitas tinggi yang berasal dari Kalimantan. Karakteristik rotan sega memiliki serat yang kuat, ukurannya beragam, dan bersifat lentur. Jenis rotan ini digunakan untuk membuat segala jenis kerajinan, seperti keranjang, tas, dan produk lainnya.",
  //     detail_en: "",
  //   },
  //   alat_produksi: {
  //     name: "Rool",
  //     detail_id: "Alat ini digunakan untuk membengkokkan rotan berdiameter besar secara manual.",
  //     detail_en: "This tool is used to bend small rattan manually.",
  //   },
  //   pengembangan_desain: "Laundry Basket",
  // },
  {
    id: 4,
    slug: "hiasan-dinding",
    title: "Hiasan Dinding",
    description_id: "Hiasan dinding Desa Trangsan memiliki bentuk yang variatif, seperti frame kaca, gantungan, dekorasi flora fauna (contoh: kupu-kupu dan kura-kura).",
    description_en: "Trangsan Village wall decorations have various forms, such as glass frames, hangers, flora and fauna decorations (for example: butterflies and turtles).",
    image: "/archive/hiasan-dinding/thumbnail.png",
    type_anyaman: "Motif Kotak",
    material_rotan: {
      type: "Rotan Jawit",
      detail_id: "Rotan jawit merupakan jenis rotan yang tumbuh di hutan hujan Kalimantan dan Sumatera. Rotan ini memiliki diameter yang bervariasi, mulai dari kecil hingga sedang dengan batang yang lurus. Sifatnya yang kuat dan lentur menjadikan rotan jawit banyak dimanfaatkan sebagai rangka furnitur.",
      detail_en: "Jawit rattan is a type of rattan that grows in the rainforests of Kalimantan and Sumatra. It varies in diameter, from small to medium, with straight stems. Its strength and flexibility make it widely used in furniture frames.",
    },
    alat_produksi: {
      name: "Garuk",
      detail_id: "Alat ini digunakan untuk mengikis rotan yang berwarna gelap akibat proses pemanasan.",
      detail_en: "This tool is used to scrape rattan that is dark in color due to the heating process.",
    },
    pengembangan_desain: "Handbag",
  },
  {
    id: 5,
    slug: "rak-buku",
    title: "Rak Buku",
    description_id: "Rak ini menggunakan material lidi tenun, dan rotan CL. Rak ini digunakan untuk meletakkan koran atau majalah.",
    description_en: "This shelf is made from woven palm fronds and CL rattan. It's used to display newspapers or magazines.",
    image: "/archive/rak-buku/thumbnail.png",
    type_anyaman: "Motif Pil Biasa",
    material_rotan: {
      type: "Rotan Lambang",
      detail_id: "Rotan lambang adalah jenis rotan alami yang tumbuh berumpun dan dapat ditemukan di pinggiran sungai, dataran rendah, serta dataran tinggi. Warna rotan hijau kekuningan dengan diameter 1-2 cm. Masyarakat lokal memanfaatkan rotan lambang untuk membuat anyaman.",
      detail_en: "The symbolic rattan is a type of natural rattan that grows in clumps and can be found on riverbanks, in lowlands, and in highlands. It is yellowish-green in color and measures 1-2 cm in diameter. Local communities use the symbolic rattan to weave.",
    },
    alat_produksi: {
      name: "Semprotan",
      detail_id: "Alat ini digunakan untuk mengaplikasikan material finishing atau top coat pada kerajinan rotan.",
      detail_en: "This tool is used to apply finishing materials or top coats to rattan crafts.",
    },
    pengembangan_desain: "-",
  },
  {
    id: 6,
    slug: "kursi-lengkung",
    title: "Kursi Lengkung",
    description_id: "Kursi ini terinspirasi oleh mahkota yang digunakan oleh raja-raja Tiongkok. Keunikan pada kursi ini terletak pada bentuk lengkungan rotan yang dikunci tanpa menggunakan tali kulit rotan biasa dan proses pembuatannya cukup rumit.",
    description_en: "This chair was inspired by the crowns worn by Chinese kings. Its unique feature lies in its curved rattan structure, which is secured without the use of traditional rattan rope, and its complex manufacturing process.",
    image: "/archive/kursi-lengkung/thumbnail.png",
    type_anyaman: "Double 2",
    material_rotan: {
      type: "Rotan Kubu",
      detail_id: "Rotan kubu terkenal dengan warna uniknya yaitu abu-abu alami yang dihasilkan melalui proses perendaman yang merupakan metode pewarnaan tradisional. Permukaan yang lentur dan halus membuat rotan ini sangat ideal untuk produk anyaman di berbagai jenis produk kerajinan.",
      detail_en: "Kubu rattan is renowned for its unique natural gray color, achieved through a traditional dyeing process. Its supple and smooth surface makes it ideal for woven products in a variety of crafts.",
    },
    alat_produksi: {
      name: "Gunting Bergerigi",
      detail_id: "Alat ini digunakan untuk memotong rotan pada saat proses menganyam.",
      detail_en: "This tool is used to cut rattan during the weaving process.",
    },
    pengembangan_desain: "-",
  },
  {
    id: 7,
    slug: "rak-bakul-sayur",
    title: "Rak Bakul Sayur",
    description_id: "Rak bakul sayur biasanya digunakan oleh pedagang sayur tradisional untuk membawa barang jualan biasanya menggunakan sepeda kayuh atau sepeda motor.",
    description_en: "Vegetable basket racks are usually used by traditional vegetable traders to carry goods for sale, usually using bicycles or motorbikes.",
    image: "/archive/rak-bakul-sayur/thumbnail.png",
    type_anyaman: "Motif V",
    material_rotan: {
      type: "Rotan Mandola",
      detail_id: "Rotan mandola dapat dibengkokkan dan dirancang menjadi berbagai bentuk tanpa risiko patah. Hal ini menjadikan rotan mandola sangat cocok digunakan untuk furnitur dan kerajinan yang memerlukan desain melengkung. Rotan ini memiliki diameter sedang dan cukup elastis tetapi tetap memiliki kekuatan.",
      detail_en: "Mandola rattan can be bent and shaped into various shapes without risk of breaking. This makes it ideal for furniture and crafts that require curved designs. This rattan has a medium diameter and is quite elastic yet strong.",
    },
    alat_produksi: {
      name: "Pemanas Rotan",
      detail_id: "Alat ini digunakan untuk memanaskan rotan agar mudah dibentuk.",
      detail_en: "This tool is used to heat rattan so that it is easy to shape.",
    },
    pengembangan_desain: "-",
  },
  {
    id: 8,
    slug: "lonceng",
    title: "Lonceng",
    description_id: "Lonceng ini merupakan produk asli Desa Trangsan yang melambangkan kedamaian, keberuntungan, perlindungan, dan spiritualitas.",
    description_en: "This bell is an original product of Trangsan Village which symbolizes peace, good luck, protection, and spirituality.",
    image: "/archive/lonceng/thumbnail.png",
    material_rotan: {
      type: "Rotan Manau",
      detail_id: "Rotan manau merupakan tumbuhan yang sering ditemui di kawasan Asia Tenggara. Rotan ini memiliki variasi dalam ukuran dan warna. Diameter rotan ini tergolong besar karena memiliki diameter lebih dari 1,8 cm. Tangkai rotan manau cukup tahan lama dengan kekuatan dan fleksibilitas yang besar sehingga dapat digunakan sebagai bahan perabot.",
      detail_en: "Manau rattan is a plant commonly found in Southeast Asia. It varies in size and color. Its diameter is considered large, exceeding 1.8 cm. Manau rattan stems are quite durable, possessing considerable strength and flexibility, making them suitable for use in furniture.",
    },
    alat_produksi: {
      name: "Palu",
      detail_id: "Alat ini digunakan untuk meratakan permukaan anyaman rotan.",
      detail_en: "This tool is used to smooth the surface of rattan weaving.",
    },
    pengembangan_desain: "-",
  },
  {
    id: 9,
    slug: "kursi-sofa-ece",
    title: "Kursi / Sofa Ece",
    description_id: "Kursi Ece merupakan kursi tradisional yang terinspirasi dari cangkang siput dan memiliki ukurannya yang kecil.",
    description_en: "The Ece chair is a traditional chair inspired by a snail shell and has a small size.",
    image: "/archive/kursi-sofa-ece/thumbnail.png",
    pengembangan_desain: "-",
  },
  // {
  //   id: 11,
  //   slug: "rak-sepatu",
  //   title: "Rak Sepatu",
  //   description_id: "Rak sepatu ini mulai dibuat pada tahun 2024 dengan menggunakan material rotan cl. Desain yang digunakan merupakan desain dari keinginan klien.",
  //   description_en: "",
  //   image: "/archive/rak-sepatu/thumbnail.png",
  //   pengembangan_desain: "-",
  // },
  {
    id: 12,
    slug: "peti-mati",
    title: "Peti Mati",
    description_id: "Peti mati melambangkan dari akhir kehidupan seseorang dan mencerminkan penghormatan terakhir menuju kehidupan berikutnya. Memiliki bentuk oval, lonjong, dan tergantung dari permintaan klien. Material yang digunakan adalah jenis rotan lambang.",
    description_en: "Coffins symbolize the end of a person's life and reflect a final tribute to the next. They come in oval, oblong, and rectangular shapes, depending on the client's request. The material used is a type of symbolic rattan.",
    image: "/archive/peti-mati/thumbnail.png",
    pengembangan_desain: "-",
  },
  {
    id: 13,
    slug: "hula-hoop",
    title: "Hula Hoop",
    description_id: "Hula hoop terbuat dari material rotan CL yang biasanya memiliki diameter 35 - 100 cm",
    description_en: "Hula hoops are made from CL rattan material which usually has a diameter of 35 - 100 cm.",
    image: "/archive/hula-hoop/thumbnail.png",
    pengembangan_desain: "-",
  },
  {
    id: 14,
    slug: "sesaji",
    title: "Sesaji",
    description_id: "Sesaji ini berbentuk tabung yang berfungsi untuk meletakkan barang. Material yang digunakan adalah rotan pitrit dan menggunakan teknik anyaman melengkung pada bagian tengah.",
    description_en: "This offering is shaped like a tube, used to hold items. The material used is pitrit rattan, and the weaving technique is curved in the center.",
    image: "/archive/sesaji/thumbnail.png",
    pengembangan_desain: "-",
  },
  // {
  //   id: 15,
  //   slug: "teko",
  //   title: "Teko",
  //   description_id: "Teko ini dibuat pada tahun 2018-2019 dengan permintaan klien. Material yang digunakan yaitu rotan pitrit dengan finishing waterbase.",
  //   description_en: "",
  //   image: "/archive/teko/thumbnail.png",
  //   pengembangan_desain: "-",
  // },
  // {
  //   id: 16,
  //   slug: "lampu-tidur",
  //   title: "Lampu Tidur",
  //   description_id: "Desain lampu tidur terinspirasi dari tudung saji yang ditransformasi menjadi bentuk kap lampu. Material yang digunakan dalam membuat lampu tidur adalah rotan pitrit dengan finishing natural.",
  //   description_en: "",
  //   image: "/archive/lampu-tidur/thumbnail.png",
  //   pengembangan_desain: "-",
  // },
  {
    id: 17,
    slug: "gantungan-kunci",
    title: "Gantungan Kunci",
    description_id: "Produk ini terinspirasi dari geblek (pemukul kasur tradisional dari rotan) yang kemudian diinovasi menjadi gantungan kunci. Menggunakan material rotan pitrit with ukuran 2 mm and memiliki ciri khas berupa anyaman lilitan.",
    description_en: "This product was inspired by geblek (a traditional rattan mattress beater) and then transformed into a keychain. It uses 2 mm pitrit rattan and features a distinctive twisted weave.",
    image: "/archive/gantungan-kunci/thumbnail.png",
    pengembangan_desain: "-",
  },
  {
    id: 18,
    slug: "kursi-malas",
    title: "Kursi Malas",
    description_id: "Kursi malas di desain dengan fungsi untuk duduk, tidur, dan bersantai. Bentuknya cukup beragam, ada yang berbentuk kotak, persegi panjang, dan lonjong. Kerangka kursi terbuat dari rotan mandola, sedangkan anyamannya menggunakan teknik anyam ceplok.",
    description_en: "Recliners are designed for sitting, sleeping, and relaxing. They come in a variety of shapes, including square, rectangular, and oval. The frame is made of mandola rattan, and the weaving uses a ceplok weaving technique.",
    image: "/archive/kursi-malas/thumbnail.png",
    pengembangan_desain: "-",
  },
  // {
  //   id: 19,
  //   slug: "tempat-teh",
  //   title: "Tempat Teh",
  //   description_id: "Tempat teh ini dibuat pada tahun 2018-2019 dengan permintaan klien. Material yang digunakan yaitu rotan pitrit dengan finishing waterbase.",
  //   description_en: "",
  //   image: "/archive/tempat-teh/thumbnail.png",
  //   pengembangan_desain: "-",
  // },
  // {
  //   id: 20,
  //   slug: "set-gelas",
  //   title: "Set Gelas",
  //   description_id: "Set gelas ini dibuat pada tahun 2018-2019 dengan permintaan klien. Material yang digunakan yaitu rotan pitrit dengan finishing waterbase.",
  //   description_en: "",
  //   image: "/archive/set-gelas/thumbnail.png",
  //   pengembangan_desain: "-",
  // },
  {
    id: 21,
    slug: "kursi-momon",
    title: "Kursi Momon",
    description_id: "Kursi ini diproduksi dengan mengembangkan desain sebelumnya dan pengrajin melakukan riset ke pasar untuk mencari model baru yang paling banyak peminat.",
    description_en: "This chair was produced by developing the previous design and the craftsmen conducted market research to find the new model that was most in demand.",
    image: "/archive/kursi-momon/thumbnail.png",
    pengembangan_desain: "-",
  },
  {
    id: 22,
    slug: "kursi-tanggok",
    title: "Kursi Tanggok",
    description_id: "Kursi ini menggunakan material rotan sega, kubu, dan pitrit dengan menggunakan finishing lokal.",
    description_en: "This chair uses sega, kubu, and pitrit rattan materials with local finishing.",
    image: "/archive/kursi-tanggok/thumbnail.png",
    pengembangan_desain: "-",
  },
  {
    id: 23,
    slug: "kursi-bonceng",
    title: "Kursi Bonceng",
    description_id: "Dulu, kursi ini banyak diproduksi karena banyak anak kecil yang menggunakan sepeda tetapi sekarang sudah langka sehingga tidak diproduksi lagi. Untuk memasang kursi di jok belakang sepeda menggunakan tali pengikat yang sudah ada.",
    description_en: "These seats were once widely available due to the large number of children riding bicycles, but they are now rare and no longer available. To attach the seat to the rear seat of a bicycle, use the existing straps.",
    image: "/archive/kursi-bonceng/thumbnail.png",
    pengembangan_desain: "-",
  },
];