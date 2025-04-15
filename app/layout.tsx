import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/language/LanguageProvider";
import type { Metadata } from 'next';
import SEOConfig from "@/config/seo.config";

export const metadata: Metadata = {
  title: SEOConfig.title,
  description: SEOConfig.description,
  keywords: ['web development', 'full stack', 'React', 'Next.js', 'TypeScript'],
  openGraph: {
    type: 'website',
    locale: SEOConfig.openGraph.locale,
    url: SEOConfig.openGraph.url,
    title: SEOConfig.openGraph.title,
    description: SEOConfig.openGraph.description,
    siteName: SEOConfig.openGraph.site_name,
    images: SEOConfig.openGraph.images,
  },
  metadataBase: new URL(SEOConfig.canonical),
  alternates: {
    canonical: '/',
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"], 
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "700"], 
});

// Tus fuentes locales
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/sun-svgrepo-com.svg" type="image/png" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system">
          <LanguageProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
