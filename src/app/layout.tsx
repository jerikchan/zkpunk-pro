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
  title: 'ZKPunk | Zero Knowledge Proof Community',
  description: 'ZKPunk is a community dedicated to Zero Knowledge Proofs and blockchain privacy technology',
  keywords: 'ZKP, Zero Knowledge Proof, Blockchain, Privacy, Web3',
  openGraph: {
    title: 'ZKPunk | Zero Knowledge Proof Community',
    description: 'ZKPunk is a community dedicated to Zero Knowledge Proofs and blockchain privacy technology',
    images: '/logo.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZKPunk | Zero Knowledge Proof Community',
    description: 'ZKPunk is a community dedicated to Zero Knowledge Proofs and blockchain privacy technology',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
