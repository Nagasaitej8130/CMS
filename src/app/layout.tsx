import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My CMS",
  description: "Personal Blog CMS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
  <body className="flex flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white">
  <Navbar />

  <main className="flex-1 w-full">
    {children}
  </main>

  <Footer />
</body>
    </html>
  );
}