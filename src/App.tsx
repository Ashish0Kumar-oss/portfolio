import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { PhotoStory } from './components/PhotoStory';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  return (
    <div className="grid-container w-full bg-background text-text-main selection:bg-primary selection:text-white h-screen overflow-hidden grid lg:grid-cols-[260px_1fr_300px] lg:grid-rows-[72px_1fr_40px] gap-[1px] bg-border-subtle font-sans">
      
      {/* Header */}
      <div className="lg:col-span-3 bg-background border-b border-border-subtle flex items-center justify-between z-50">
        <Navbar />
      </div>

      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col bg-background p-8 border-r border-border-subtle overflow-y-auto">
        <Hero />
      </aside>

      {/* Main Content */}
      <main className="bg-background p-8 lg:p-12 overflow-y-auto flex flex-col gap-16 relative">
        <About />
        <Projects />
        <Experience />
        <PhotoStory />
      </main>

      {/* Right Panel */}
      <aside className="hidden lg:flex flex-col bg-background p-8 border-l border-border-subtle overflow-y-auto gap-12">
        <TechStack />
        <Contact />
      </aside>

      {/* Footer */}
      <div className="lg:col-span-3 bg-background border-t border-border-subtle flex items-center">
        <Footer />
      </div>
    </div>
  );
}
