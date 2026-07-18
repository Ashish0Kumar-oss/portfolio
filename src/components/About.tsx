import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data';
import { Terminal, Code, Cpu, Trophy, BookOpen } from 'lucide-react';

export function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { label: 'Projects', value: portfolioData.stats.projects, icon: <Code className="w-5 h-5 text-primary" /> },
    { label: 'Repositories', value: portfolioData.stats.repositories, icon: <Terminal className="w-5 h-5 text-secondary" /> },
    { label: 'Years Exp.', value: portfolioData.stats.yearsExperience, icon: <Cpu className="w-5 h-5 text-accent" /> },
    { label: 'Contributions', value: '1K+', icon: <Trophy className="w-5 h-5 text-success" /> },
  ];

  return (
    <section id="about" className="flex flex-col gap-8 w-full">
      <div>
        <span className="section-label">Hero</span>
        <h1 className="hero-h1 mb-4">
          Full Stack<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Architect & Engineer
          </span>
        </h1>
        <p className="text-lg text-text-muted leading-relaxed max-w-xl">
          Specializing in the modern web stack. Bridging the gap between robust backend systems and beautiful user interfaces.
        </p>
      </div>

      <div className="flex gap-4 mt-4 mb-8">
        <a href="#projects" className="bg-white text-black px-6 py-2.5 rounded-xl font-bold hover:bg-white/90 transition-colors">
          View Projects
        </a>
        <a href="#" className="border border-border-subtle px-6 py-2.5 rounded-xl font-bold hover:bg-surface transition-colors">
          Read Resume
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
            className="glass-card p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="tech-icon w-8 h-8 rounded-lg">{stat.icon}</div>
              <span className="stat-val">{stat.value}</span>
            </div>
            <span className="stat-label uppercase tracking-wider">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
