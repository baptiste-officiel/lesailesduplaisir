import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mdxeditor/editor/style.css'
import Navbar from "./components/navbar/Navbar";
import AuthProvider from "./context/AuthContext";
import { montserrat } from "./fonts/fonts";
import Footer from "./components/footer/Footer";
import { EdgeStoreProvider } from "@/app/provider/edgestore";

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
        <AuthProvider>
        <EdgeStoreProvider>
        <Navbar />  
        {children}
        <Footer />
        </EdgeStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
