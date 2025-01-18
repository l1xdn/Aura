import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura",
  description: "Aura, a learning platform ment to orginize your learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  min-h-screen `}
      >
        <div className="bg-gray min-h-screen">
          <header className="border-b border-gray-800">
            <div className="flex justify-center items-center h-16 px-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 bg-clip-text text-transparent">
                Aura
              </h1>
            </div>
          </header>
          <Analytics/>
          <SpeedInsights/>

          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
