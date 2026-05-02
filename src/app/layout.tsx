import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Playfair_Display, Source_Sans_3 } from "next/font/google";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});


export const metadata = {
  title: "Naga Sai Teja Bollimuntha - Blogger, Developer, Fitness Enthusiast",
  description: "Personal Blog CMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
  <body className={`${bodyFont.variable} ${headingFont.variable}`}>
  <Navbar />

  <main className="flex-1 w-full">
    {children}
  </main>

  <Footer />
  
</body>

    </html>
  );
}