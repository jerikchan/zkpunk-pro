import { Metadata } from 'next'
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: 'ZKPunk',
  description: 'A Punk Org for ZKP R&D',
  keywords: 'ZKP, Zero Knowledge Proof, Blockchain, Privacy, Web3',
  openGraph: {
    title: 'ZKPunk',
    description: 'A Punk Org for ZKP R&D',
    images: 'https://zkpunk-pro.netlify.app/logo.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZKPunk',
    description: 'A Punk Org for ZKP R&D',
    images: ['https://zkpunk-pro.netlify.app/logo.png'],
  },
  icons: {
    icon: 'https://zkpunk-pro.netlify.app/logo.png',
    shortcut: 'https://zkpunk-pro.netlify.app/logo.png',
    apple: 'https://zkpunk-pro.netlify.app/logo.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
