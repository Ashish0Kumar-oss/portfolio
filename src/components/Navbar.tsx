import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Mail, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { cn } from '../utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Tech', href: '#tech' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="w-full h-full flex items-center justify-between px-8 bg-background">
      <div className="w-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-heading font-bold shadow-lg group-hover:shadow-primary/50 transition-all">
            A
          </div>
          <span className="font-heading font-bold text-xl tracking-tight hidden sm:block uppercase">
            Ashish.dev
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-muted hover:text-white transition-colors uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="w-px h-6 bg-border-subtle" />
          <div className="flex items-center gap-4">
            <a href="https://github.com/Ashish0Kumar-oss" target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-colors">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/ashish-kumar-464504373" target="_blank" rel="noreferrer" className="text-text-muted hover:text-white transition-colors">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href="#contact" className="px-5 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 hover:bg-primary hover:text-white transition-all">
              Hire Me
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-text-muted hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-text-muted hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px w-full bg-border-subtle my-2" />
              <div className="flex items-center gap-4">
                <a href="https://github.com/Ashish0Kumar-oss" className="p-2 rounded-full glass hover:text-white text-text-muted">
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/ashish-kumar-464504373" className="p-2 rounded-full glass hover:text-white text-text-muted">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
