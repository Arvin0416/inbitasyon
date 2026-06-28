import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingParticles, CursorGlow } from "@/components/FloatingParticles";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imbitasyon — Beautiful Wedding Websites in Minutes",
  description:
    "Create a beautiful wedding invitation website with RSVP in minutes. Choose a romantic design, add your details, and share your personal wedding URL.",
  icons: {
    icon: "/Icon-imbitasyon.svg",
    shortcut: "/Icon-imbitasyon.svg",
  },
  openGraph: {
    title: "Imbitasyon — Beautiful Wedding Websites in Minutes",
    description:
      "Create a beautiful wedding invitation website with RSVP in minutes.",
    siteName: "Imbitasyon",
    type: "website",
    images: [
      {
        url: "/Icon-imbitasyon.svg",
        width: 360,
        height: 360,
        alt: "Imbitasyon — Wedding Invitation Websites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imbitasyon — Beautiful Wedding Websites in Minutes",
    description:
      "Create a beautiful wedding invitation website with RSVP in minutes.",
    images: ["/Icon-imbitasyon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <FloatingParticles />
            <CursorGlow />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#283618",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
