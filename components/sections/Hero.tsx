"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/useTranslations";
import Image from "next/image";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

export default function Hero() {
  const { t } = useTranslations();

  return (
    <section className="relative min-h-screen flex items-start lg:items-center justify-center overflow-hidden z-10">
      <GravityStarsBackground 
        className="absolute inset-0 z-0 opacity-30 text-primary"
        starsCount={90}
        gravityStrength={50}
      />
      
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-20 items-center z-10 pt-24 lg:pt-0">
        
        {/* Left Column: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8 order-2 lg:order-1">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-inter text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
            >
                {t('hero.greeting')}
                <motion.div
                    className="inline-block ml-3 sm:ml-4 align-middle"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{
                        scale: { duration: 0.5, delay: 0.2 },
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                    }}
                >
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16">
                        <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" fill="url(#spark-gradient)" />
                        <defs>
                            <linearGradient id="spark-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#22c559" />
                                <stop offset="1" stopColor="#0ea5e9" />
                            </linearGradient>
                        </defs>
                    </svg>
                </motion.div>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-xl"
            >
                {t('hero.introduction')}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-secondary/50 backdrop-blur-sm rounded-full border border-border/50 text-sm font-medium text-foreground/80 shadow-sm"
            >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span>{t('hero.available')}</span>
            </motion.div>
        </div>

        {/* Right Column: Image & Decoration */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center items-center order-1 lg:order-2"
        >
            {/* Background Composition Circles matching the reference vibe */}
            <div className="absolute inset-0 z-0">
                 <motion.div 
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" 
                 />
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-0 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" 
                 />
            </div>

            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
                {/* Decorative Circles behind image */}
                <motion.div 
                    className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary rounded-full"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                
                {/* Main Image Mask/Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background/50 ring-1 ring-border shadow-2xl">
                    <Image
                        src="/profile-picture.png"
                        alt="Profile"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
        </motion.div>

      </div>
      
      {/* Scroll Down Indicator - Hidden on mobile to prevent overlap */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
