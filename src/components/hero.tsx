"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { useRef } from "react";

// Spring configs
const springOrganic = { type: "spring" as const, stiffness: 60, damping: 15 };
const springWeighty = { type: "spring" as const, stiffness: 80, damping: 18, mass: 1.2 };
const springFluid = { type: "spring" as const, stiffness: 200, damping: 15 };
const springBouncy = { type: "spring" as const, stiffness: 400, damping: 15 };

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

    // Stagger children
    const containerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.12, delayChildren: 0.2 },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: springOrganic,
        },
    };

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 space-y-6 md:space-y-8 text-center md:text-left"
                >
                    <motion.h2
                        variants={childVariants}
                        className="text-xs sm:text-sm font-bold tracking-[0.2em] text-cyan-600 dark:text-cyan-400 uppercase"
                    >
                        Portfolio
                    </motion.h2>
                    <motion.h1
                        variants={childVariants}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-foreground"
                    >
                        Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">{personalInfo.name}</span>
                    </motion.h1>
                    <motion.p
                        variants={childVariants}
                        className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground dark:text-gray-300"
                    >
                        {personalInfo.title}
                    </motion.p>
                    <motion.div
                        variants={childVariants}
                        whileHover={{ scale: 1.02, y: -2 }}
                        transition={springFluid}
                        className="p-4 sm:p-6 rounded-2xl glass-morphism border border-border/50 dark:border-white/10 text-sm sm:text-base md:text-lg italic text-muted-foreground dark:text-gray-400 max-w-lg mx-auto md:mx-0 cursor-default hover:shadow-lg dark:hover:shadow-cyan-500/5 transition-shadow duration-500"
                    >
                        &quot;{personalInfo.philosophy}&quot;
                    </motion.div>
                    <motion.div
                        variants={childVariants}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start pt-2 sm:pt-4"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={springBouncy}
                            href="#contact"
                            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black font-bold hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors duration-200 shadow-[0_0_20px_rgba(13,204,242,0.3)] dark:shadow-[0_0_20px_rgba(13,204,242,0.5)] hover:shadow-[0_0_30px_rgba(13,204,242,0.4)] dark:hover:shadow-[0_0_30px_rgba(13,204,242,0.6)] text-center"
                        >
                            Get in Touch
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={springBouncy}
                            href="#experience"
                            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full glass-morphism border border-border/50 dark:border-white/10 transition-colors duration-200 text-foreground text-center hover:shadow-lg"
                        >
                            View Work
                        </motion.a>
                    </motion.div>
                </motion.div>

                <motion.div
                    style={{ y, opacity, scale }}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={springWeighty}
                    className="relative group perspective-1000"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-[2rem] blur-3xl opacity-20 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-60 transition-opacity duration-700" />
                    <motion.div
                        whileHover={{ rotateY: 5, rotateX: 5 }}
                        transition={springFluid}
                        className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-[2rem] overflow-hidden glass-morphism p-2 sm:p-3 border border-border/50 dark:border-white/10 dark:neon-border transform transition-shadow duration-500 hover:shadow-2xl"
                    >
                        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
                            <Image
                                src={personalInfo.images.portrait}
                                alt={personalInfo.name}
                                fill
                                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                priority
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
