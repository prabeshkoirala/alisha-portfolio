"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";

const springSmooth = { type: "spring" as const, stiffness: 60, damping: 18 };
const springHover = { type: "spring" as const, stiffness: 200, damping: 15 };

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: springSmooth,
    },
};

export function Education() {
    return (
        <section id="education" className="py-14 sm:py-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={springSmooth}
                    className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400"
                >
                    Education &amp; Achievements
                </motion.h2>

                <motion.div
                    className="grid sm:grid-cols-2 gap-5 sm:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ scale: 1.03, y: -8 }}
                            transition={springHover}
                            className="p-5 sm:p-8 rounded-2xl glass-morphism border border-border dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-colors duration-300 shadow-lg group cursor-default hover:shadow-xl hover:shadow-cyan-500/5"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600 dark:text-cyan-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
                                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 leading-snug">{edu.degree}</h3>
                                    <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium mb-2 sm:mb-3 italic">{edu.major}</p>
                                    <div className="text-sm sm:text-base text-cyan-700 dark:text-cyan-400 font-medium mb-1">{edu.school}</div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3 sm:mb-4">
                                        <MapPin className="w-3 h-3" />
                                        {edu.location}
                                    </div>
                                </div>
                                {(edu as any).logo && (
                                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white/90 dark:bg-white/10 rounded-xl p-2 flex items-center justify-center border border-black/5 dark:border-white/10 shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                        <Image
                                            src={(edu as any).logo}
                                            alt={edu.school}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-border dark:border-white/10 pt-3 sm:pt-4 mt-2">
                                <span className="text-xs sm:text-sm font-mono text-muted-foreground">{edu.year}</span>
                                {edu.details && (
                                    <ul className="mt-2 sm:mt-3 space-y-1">
                                        {edu.details.map((detail, i) => (
                                            <li key={i} className="text-xs sm:text-sm text-muted-foreground flex gap-2">
                                                <span className="text-cyan-600 dark:text-cyan-400">•</span>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
