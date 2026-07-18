import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    // Simulate EmailJS or API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative bg-surface/30 border-t border-border-subtle">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="section-label">Contact</span>
          <h2 className="hero-h1 mb-4">Get In Touch</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 md:p-12 relative overflow-hidden"
        >
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-surface/95 backdrop-blur-xl z-20"
            >
              <CheckCircle className="w-16 h-16 text-success mb-4" />
              <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
              <p className="text-text-muted">I'll get back to you as soon as possible.</p>
            </motion.div>
          ) : null}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-muted ml-1">Name</label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-background/50 border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-text-muted/50"
                />
                {errors.name && <span className="text-xs text-red-500 ml-1">{errors.name.message}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-text-muted ml-1">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-background/50 border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-text-muted/50"
                />
                {errors.email && <span className="text-xs text-red-500 ml-1">{errors.email.message}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-muted ml-1">Subject</label>
              <input
                {...register('subject')}
                type="text"
                placeholder="Project Proposal"
                className="w-full bg-background/50 border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-text-muted/50"
              />
              {errors.subject && <span className="text-xs text-red-500 ml-1">{errors.subject.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-muted ml-1">Message</label>
              <textarea
                {...register('message')}
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-background/50 border border-border-subtle rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white placeholder:text-text-muted/50 resize-none"
              />
              {errors.message && <span className="text-xs text-red-500 ml-1">{errors.message.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Send Message <Send className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
