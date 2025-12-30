import type { Metadata } from "next";
import { Inter, Space_Grotesk, VT323 } from "next/font/google"; // Import requested fonts
import "./globals.css";

// Configure fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shinjan Sarkar | DevOps & Cloud Enthusiast",
  description: "Portfolio of Shinjan Sarkar - Cyber-Industrial Minimalist Design",
};

// Imports removed for Terminal Mode

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${vt323.variable} antialiased bg-black text-[#f8f8f8]`}
      >
        {children}
      </body>
    </html>
  );
}
