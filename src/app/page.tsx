'use client';

import dynamic from 'next/dynamic';
import { TextGenerateEffect } from './components/ui/text-generate-effect';
import { TypewriterEffect } from './components/ui/typewriter-effect';
import { Button } from './components/ui/moving-border';
import { TracingBeam } from './components/ui/tracing-beam';

const MatrixBackground = dynamic(
  () => import('./components/MatrixBackground'),
  { ssr: false }
);

export default function Home() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "ZK",
    },
    {
      text: "applications",
    },
    {
      text: "with",
    },
    {
      text: "ZKPunk.",
      className: "text-blue-500",
    },
  ];

  return (
    <main className="min-h-screen w-full relative">
      <div className="absolute inset-0 z-0">
        <MatrixBackground />
      </div>
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center bg-black/50">
        <div className="relative z-20 flex flex-col items-center justify-center">
          <TypewriterEffect words={words} />
          <div className="max-w-2xl mx-auto px-4 mt-8">
            <TextGenerateEffect words="ZKPunk is your ultimate toolkit for building zero-knowledge applications. Dive into the world of privacy-preserving computation with our comprehensive suite of tools and frameworks." />
          </div>
          
          <div className="flex flex-row gap-4 mt-8">
            <Button
              borderRadius="1.75rem"
              className="bg-white text-black border-neutral-200"
            >
              Get Started
            </Button>
            <Button
              borderRadius="1.75rem"
              className="bg-white text-black border-neutral-200"
            >
              Documentation
            </Button>
          </div>

          <TracingBeam className="px-6 mt-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-white">Key Features</h2>
              <ul className="space-y-4 text-white">
                <li>🔒 Advanced Zero-Knowledge Proofs</li>
                <li>⚡ High Performance & Scalability</li>
                <li>🛠️ Developer-Friendly Tools</li>
                <li>🔐 Enhanced Privacy Solutions</li>
              </ul>
            </div>
          </TracingBeam>
        </div>
      </div>
    </main>
  );
}
