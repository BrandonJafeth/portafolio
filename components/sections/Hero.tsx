"use client";

import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/useTranslations";
import Image from "next/image";
import { GravityStarsBackground } from "@/components/animate-ui/components/backgrounds/gravity-stars";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

export default function Hero() {
  const { t } = useTranslations();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden z-10">
      <GravityStarsBackground 
        className="absolute inset-0 z-0 opacity-30 text-primary"
        starsCount={90}
        gravityStrength={50}
      />
      
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10 pt-20 pb-24 lg:py-0">
        
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

        {/* Right Column: Dev-Inspired Composition */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center items-center order-1 lg:order-2"
        >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-[340px] md:h-[340px] lg:w-[400px] lg:h-[400px]">

                {/* SVG Ring that draws itself */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                    <defs>
                        <linearGradient id="ring-gradient" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#22c559" />
                            <stop offset="0.5" stopColor="#0ea5e9" />
                            <stop offset="1" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                    <motion.circle
                        cx="200"
                        cy="200"
                        r="190"
                        stroke="url(#ring-gradient)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
                    />
                    {/* Inner dashed ring */}
                    <motion.circle
                        cx="200"
                        cy="200"
                        r="174"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeDasharray="4 12"
                        fill="none"
                        className="text-border/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                    />
                </svg>

                {/* Illustration — absolutely centered */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="relative w-[75%] h-[75%]">
                        <Image
                            src="/profile-picture.png"
                            alt="Profile"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Floating dev badges — appear once with spring */}
                {[
                    { icon: "</>",  x: "88%", y: "18%", delay: 1.0 },
                    { icon: "{ }",  x: "8%",  y: "75%", delay: 1.3 }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: item.delay, duration: 0.5, type: "spring", stiffness: 200 }}
                        className="absolute z-20"
                        style={{ left: item.x, top: item.y }}
                    >
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono font-bold text-xs backdrop-blur-sm">
                            {item.icon}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>

      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
