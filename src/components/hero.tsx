"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { useRef } from "react";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Background Noise & Gradient */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 space-y-8 text-center md:text-left"
                >
                    <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-600 dark:text-cyan-400 uppercase">
                        Portfolio
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-foreground">
                        Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">{personalInfo.name}</span>
                    </h1>
                    <p className="text-2xl font-light text-muted-foreground dark:text-gray-300">
                        {personalInfo.title}
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-2xl glass-morphism border border-border/50 dark:border-white/10 text-base md:text-lg italic text-muted-foreground dark:text-gray-400 max-w-lg mx-auto md:mx-0 cursor-default"
                    >
                        &quot;{personalInfo.philosophy}&quot;
                    </motion.div>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="px-8 py-4 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black font-bold hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(13,204,242,0.3)] dark:shadow-[0_0_20px_rgba(13,204,242,0.5)]"
                        >
                            Get in Touch
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                            whileTap={{ scale: 0.95 }}
                            href="#experience"
                            className="px-8 py-4 rounded-full glass-morphism border border-border/50 dark:border-white/10 transition-colors text-foreground"
                        >
                            View Work
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div
                    style={{ y, opacity, scale }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative group perspective-1000"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-[2rem] blur-3xl opacity-20 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-60 transition-opacity duration-500" />
                    <motion.div
                        whileHover={{ rotateY: 5, rotateX: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative w-72 h-72 md:w-96 md:h-96 rounded-[2rem] overflow-hidden glass-morphism p-3 border border-border/50 dark:border-white/10 dark:neon-border transform transition-all duration-500"
                    >
                        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                            <Image
                                src={personalInfo.images.portrait}
                                alt={personalInfo.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
