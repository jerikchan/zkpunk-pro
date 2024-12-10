'use client';

import dynamic from 'next/dynamic';
import { TextGenerateEffect } from './components/ui/text-generate-effect';
import { TypewriterEffect } from './components/ui/typewriter-effect';
import { Button } from './components/ui/moving-border';
import { FaGithub } from 'react-icons/fa';
import { IoBookSharp } from 'react-icons/io5';
import { IoMdBulb } from 'react-icons/io';
import { FaXTwitter } from "react-icons/fa6";

const MatrixBackground = dynamic(
  () => import('./components/MatrixBackground'),
  { ssr: false }
);

export default function Home() {
  const words = [
    {
      text: "ZK",
      className: "text-6xl font-bold",
    },
    {
      text: "Punk",
      className: "text-blue-500 text-6xl font-bold",
    },
  ];

  return (
    <main className="min-h-screen w-full relative">
      <div className="absolute inset-0 z-0">
        <MatrixBackground />
      </div>
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center bg-black/50">
        <div className="relative z-20 flex flex-col items-center justify-center">
          <div className="scale-150">
            <TypewriterEffect words={words} />
          </div>
          <div className="max-w-2xl mx-auto px-4 mt-12 text-xl">
            <TextGenerateEffect words="A Punk Org for ZKP R&D" />
          </div>
          
          <div className="flex flex-row gap-3 mt-8">
            <Button
              borderRadius="1.5rem"
              className="text-white border-neutral-200 flex items-center gap-1.5 text-sm px-4 py-2"
              as="a"
              href="https://insights.zkpunk.pro/"
              target="_blank"
            >
              <IoMdBulb className="w-4 h-4" />
              ZK Insights
            </Button>
            <Button
              borderRadius="1.5rem"
              className="text-white border-neutral-200 flex items-center gap-1.5 text-sm px-4 py-2"
              as="a"
              href="https://learn.zkpunk.pro/"
              target="_blank"
            >
              <IoBookSharp className="w-4 h-4" />
              ZKPedia
            </Button>
            <Button
              borderRadius="1.5rem"
              className="text-white border-neutral-200 flex items-center gap-1.5 text-sm px-4 py-2"
              as="a"
              href="https://github.com/ZKPunk-Org"
              target="_blank"
            >
              <FaGithub className="w-4 h-4" />
              Github
            </Button>
          </div>
        </div>
      </div>
      
      <a 
        href="https://x.com/ZKPunk_org" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed top-6 right-6 z-50"
      >
        <Button
          borderRadius="9999px"
          className="w-10 h-10 flex items-center justify-center text-white bg-transparent hover:bg-white/10 transition-colors"
        >
          <FaXTwitter className="w-5 h-5" />
        </Button>
      </a>
    </main>
  );
}
