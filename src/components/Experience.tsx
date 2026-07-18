import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data';
import { Briefcase, GraduationCap } from 'lucide-react';

export function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Journey</span>
          <h2 className="hero-h1 mb-4">Experience & Education</h2>
        </motion.div>

        <div className="relative border-l border-border-subtle ml-4 md:ml-0 md:pl-0 md:border-l-0">
          {/* Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border-subtle transform -translate-x-1/2"></div>
          
          <div className="flex flex-col gap-12">
            {/* Experience Items */}
            {portfolioData.experience.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-21px] md:left-1/2 w-10 h-10 rounded-full glass border border-primary/30 bg-background flex items-center justify-center transform md:-translate-x-1/2 z-10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                   <Briefcase className="w-4 h-4" />
                </div>

                <div className="md:w-1/2 w-full pl-8 md:pl-0">
                   <div className={`glass-card p-8 ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                     <span className="text-primary font-mono text-sm mb-2 block">{exp.duration}</span>
                     <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                     <h4 className="text-text-muted font-medium mb-4">{exp.company}</h4>
                     <p className="text-sm text-text-muted mb-6 leading-relaxed">
                       {exp.description}
                     </p>
                     <div className="flex flex-wrap gap-2 mt-4">
                       {exp.technologies.map(tech => (
                         <span key={tech} className="pill">
                           {tech}
                         </span>
                       ))}
                     </div>
                   </div>
                </div>
              </motion.div>
            ))}

            {/* Education Items */}
            {portfolioData.education.map((edu, idx) => (
              <motion.div
                key={`edu-${edu.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (portfolioData.experience.length + idx) * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${(portfolioData.experience.length + idx) % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-21px] md:left-1/2 w-10 h-10 rounded-full glass border border-secondary/30 bg-background flex items-center justify-center transform md:-translate-x-1/2 z-10 text-secondary shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                   <GraduationCap className="w-4 h-4" />
                </div>

                <div className="md:w-1/2 w-full pl-8 md:pl-0">
                   <div className={`glass-card p-8 border-t-2 border-t-secondary/50 ${(portfolioData.experience.length + idx) % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                     <span className="text-secondary font-mono text-sm mb-2 block">{edu.duration}</span>
                     <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                     <h4 className="text-text-muted font-medium mb-4">{edu.institution}</h4>
                     <p className="text-sm text-text-muted mb-4 leading-relaxed">
                       {edu.description}
                     </p>
                     {edu.cgpa && (
                        <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20">
                          CGPA: {edu.cgpa}
                        </div>
                     )}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
