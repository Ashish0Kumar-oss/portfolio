import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data';
import { Code2, GitMerge, Layout, Server, Database, Cloud } from 'lucide-react';

export function TechStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = Array.from(new Set(portfolioData.skills.map((s) => s.category)));

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend': return <Layout className="w-5 h-5" />;
      case 'Backend': return <Server className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Tools': return <GitMerge className="w-5 h-5" />;
      case 'DevOps': return <Cloud className="w-5 h-5" />;
      default: return <Code2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="tech" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Tech Stack</span>
          <h2 className="hero-h1 mb-4">Technologies</h2>
        </motion.div>

        <div className="grid grid-cols-4 gap-4">
          {portfolioData.skills.slice(0, 8).map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="tech-icon text-xl group relative"
              title={skill.name}
            >
              {skill.category === 'Frontend' ? '⚛️' : 
               skill.category === 'Backend' ? '🟢' : 
               skill.category === 'Database' ? '🍃' : 
               skill.category === 'Tools' ? '🚀' : '🐳'}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
