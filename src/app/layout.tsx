import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SocialBar from "@/components/layout/SocialBar";
import { CartProvider } from "@/contexts/CartContext";
import { SessionContextProvider } from "@/contexts/SessionContext";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
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
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="antialiased bg-bbd-charcoal text-bbd-ivory font-body">
        <AuthProvider>
          <SessionContextProvider>
            <CartProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <SocialBar />
            </CartProvider>
          </SessionContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
