import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { portfolioData } from '../data';
import { ExternalLink, Star, GitFork } from 'lucide-react';
import { GithubIcon } from './Icons';
import { useGitHub } from '../hooks/useGitHub';

export function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const githubUsername = "Ashish0Kumar-oss";
  const { repos, loading, error } = useGitHub(githubUsername);

  // Combine featured manual projects with fetched repos if we want,
  // but for a highly controlled look, using the manual data is often better.
  // We'll show manual featured projects first, then recent repos.
  
  return (
    <section id="projects" className="py-24 relative bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Featured Projects</span>
          <h2 className="hero-h1 mb-4">My Work</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {portfolioData.projects.filter(p => p.featured).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card group flex flex-col p-5"
            >
              <div className="relative h-48 bg-slate-800 rounded-xl mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col flex-grow gap-3">
                <h3 className="font-heading font-bold text-xl">{project.title}</h3>
                <p className="text-sm text-text-muted flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border-subtle">
                  <a href={project.github} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <GithubIcon className="w-4 h-4" /> Code
                  </a>
                  <a href={project.live} className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ml-auto">
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Repositories via API */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Recent Repositories</h3>
          {loading ? (
             <div className="flex justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
          ) : error ? (
            <div className="text-center text-red-400">Failed to load repositories: {error}</div>
          ) : repos.length === 0 ? (
            <div className="text-center text-text-muted">No repositories found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, idx) => (
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  key={repo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="glass p-6 rounded-xl hover:border-primary/50 transition-all hover:-translate-y-1 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <GithubIcon className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors" />
                    <div className="flex gap-3 text-text-muted text-sm font-mono">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks_count}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{repo.name}</h4>
                  <p className="text-sm text-text-muted line-clamp-2 mb-4 h-10">{repo.description || "No description provided."}</p>
                  <div className="flex items-center gap-2 text-xs font-mono text-secondary">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    {repo.language || "Multiple"}
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
