import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import { portfolioData } from '../data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex items-center justify-between px-8 bg-background">
      <div className="text-xs text-text-muted font-mono hidden md:block">SYSTEM STATUS: OPTIMIZED [200 OK]</div>
      <div className="text-xs text-text-muted font-mono uppercase tracking-wider">
        &copy; {currentYear} {portfolioData.personal.name} — BUILT WITH REACT & TAILWIND
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
        <span className="text-[10px] uppercase tracking-widest text-text-muted">Available for hire</span>
      </div>
    </footer>
  );
}
