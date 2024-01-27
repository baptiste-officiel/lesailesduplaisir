import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import AuthProvider from "./context/AuthContext";

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
      <body className={`relative`}>
        <AuthProvider>
        <header>
        <Navbar />  
        </header>
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
