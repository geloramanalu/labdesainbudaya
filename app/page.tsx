import HomeView from "@/components/HomeView"; // client wrapper
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lab Desain Budaya | Home",
  description: "Digital Archive and Exhibition Platform for Trangsan Village Crafts",
  openGraph: {
    images: ['/og-image.jpg'],
  },
};

export default function Home() {
  return (
    <main>
      <HomeView />
    </main>
  );
}