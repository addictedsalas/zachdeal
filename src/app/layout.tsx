import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SocialBar from "@/components/layout/SocialBar";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Built By Deal - Elite Training Programs & Supplements",
  description: "Transform your body with Zach Deal's proven training programs and premium supplements. Join thousands achieving their fitness goals.",
  keywords: "fitness, training programs, supplements, bodybuilding, workout plans, Zach Deal",
  openGraph: {
    title: "Built By Deal - Elite Training Programs & Supplements",
    description: "Transform your body with Zach Deal's proven training programs and premium supplements.",
    type: "website",
    locale: "en_US",
    siteName: "Built By Deal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Built By Deal - Elite Training Programs & Supplements",
    description: "Transform your body with Zach Deal's proven training programs and premium supplements.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-bbd-charcoal text-bbd-ivory font-body">
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <SocialBar />
        </CartProvider>
      </body>
    </html>
  );
}
