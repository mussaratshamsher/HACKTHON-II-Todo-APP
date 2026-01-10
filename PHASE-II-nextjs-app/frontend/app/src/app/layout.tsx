import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TodoMaster",
  description: "The ultimate todo application for professionals",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased bg-background text-foreground`}
      >
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-4xl mx-auto">{children}</div>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}