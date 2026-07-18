import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Mail, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data';

export function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = [
    'Full Stack Developer',
    'MERN Stack Developer',
    'Open Source Contributor',
    'Backend Developer',
    'Problem Solver',
  ];

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, typingSpeed);

    return () => {
      clearInterval(ticker);
    };
  }, [text, isDeleting, loopNum, typingSpeed]);

  const tick = () => {
    let i = loopNum % titles.length;
    let fullText = titles[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed((prevSpeed) => prevSpeed / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(1000); // Wait before deleting
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(150); // Reset typing speed
    }
  };

  return (
    <section id="home" className="flex flex-col relative w-full h-full gap-8">
      {/* Profile Sidebar Look */}
      <div className="flex flex-col">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 mb-6 overflow-hidden flex items-center justify-center text-4xl shadow-xl">
           👨‍💻
        </div>
        <h2 className="hero-h1 text-2xl mb-2">{portfolioData.personal.name}</h2>
        
        <div className="h-8 flex items-center mb-2">
          <h3 className="text-sm font-mono text-primary">
            {text}<span className="animate-ping ml-1">|</span>
          </h3>
        </div>

        <p className="text-text-muted text-sm leading-relaxed mb-6">
          {portfolioData.personal.bio}
        </p>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <span className="text-primary">📍</span> New Delhi, India
          </div>
          <div className="flex items-center gap-3 text-sm text-text-muted">
            <span className="text-primary">📧</span> {portfolioData.personal.email}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <span className="section-label">Online</span>
        <div className="flex gap-4 opacity-70">
          <div className="w-5 h-5 bg-white/20 rounded"></div>
          <div className="w-5 h-5 bg-white/20 rounded animate-pulse"></div>
          <div className="w-5 h-5 bg-white/20 rounded"></div>
        </div>
      </div>
    </section>
  );
}
