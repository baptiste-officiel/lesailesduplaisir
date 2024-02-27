import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { montserrat } from "./fonts/fonts";
import Footer from "./components/footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./provider/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Les Ailes Du Plaisir",
  description: "Location d'ULM de tourisme, formation glass cockpit",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} font-main relative`}>
      <Providers>
        <Navbar />  
          {children}
        <Footer />
      </Providers>
      </body>
    </html>
  );
}
