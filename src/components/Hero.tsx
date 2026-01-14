import { useState } from 'react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-illustration.png';
import { Skeleton } from '@/components/ui/skeleton';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <h1 className="heading-hero mb-6">
              Book 1-on-1 IT consultation with a{' '}
              <span className="text-accent">senior engineer</span>
            </h1>
            <p className="text-body mb-8 max-w-lg">
              Architecture, backend, cloud, scaling & system design — no fluff. 
              Direct access to expert guidance for your technical challenges.
            </p>
            <motion.a
              href="#booking"
              className="btn-primary inline-flex items-center gap-2 text-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Consultation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/5 rounded-3xl blur-3xl" />
              
              {/* Skeleton loader */}
              {!imageLoaded && (
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden">
                  <Skeleton className="absolute inset-0 w-full h-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
                      <span className="text-sm text-muted-foreground">Loading...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <img
                src={heroImage}
                alt="Abstract tech illustration"
                className={`relative w-full rounded-3xl shadow-card transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
