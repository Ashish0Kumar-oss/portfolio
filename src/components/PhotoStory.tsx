import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data';
import { Calendar } from 'lucide-react';

export function PhotoStory() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="story" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Moments</span>
          <h2 className="hero-h1 mb-4">Photo Story</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative h-80 group perspective-1000"
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <motion.div 
                className="w-full h-full relative preserve-3d transition-all duration-700 ease-out shadow-xl rounded-[20px]"
                animate={{ rotateY: activeIndex === idx ? 180 : 0 }}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden rounded-[20px] overflow-hidden border border-border-subtle bg-surface">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                  <img src={photo.image} alt={photo.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl font-bold font-heading">{photo.title}</h3>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[20px] glass-card p-6 flex flex-col justify-center items-center text-center bg-surface border border-primary/20">
                  <h4 className="text-xl font-bold text-primary mb-4">{photo.title}</h4>
                  <p className="text-sm text-text-muted mb-6 leading-relaxed">"{photo.description}"</p>
                  <div className="flex items-center gap-2 text-xs font-mono text-text-muted mt-auto">
                    <Calendar className="w-3 h-3" />
                    {photo.date}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
