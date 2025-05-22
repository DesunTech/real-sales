import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import HomePage from "../container/HomePage";
import SEO from "../utils/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <SEO
        title={"RealSales"}
        description={"RealSales accelerate your sales team performance"}
        keywords={"Supercharging your sales teams with AI-Driven Selling"}
      />
      <HomePage />
    </>
  );
}
