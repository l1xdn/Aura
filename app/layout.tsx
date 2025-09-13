import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ClerkProvider } from '@clerk/nextjs'
import ConvexClientProvider from "./components/ConvexClientProvider";
// import Header from "./components/Header";
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
        <ClerkProvider 
          signInUrl="/sign-in"
          afterSignInUrl="/admin"
          appearance={{
            elements: {
              // Hide sign up link in sign in form
              signInStart: {
                "& [data-localization-key='signIn.start.actionLink']": {
                  display: "none"
                }
              }
            }
          }}
        >
          <ConvexClientProvider>
            <div className="bg-gray min-h-screen">
              <Analytics/>
              <SpeedInsights/>

              <main>
                {children}
              </main>
            </div>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
