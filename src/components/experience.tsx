"use client";

import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/lib/data";
import { useState } from "react";
import { ChevronDown, MapPin, Briefcase } from "lucide-react";

const springSmooth = { type: "spring" as const, stiffness: 60, damping: 18 };
const springSnappy = { type: "spring" as const, stiffness: 300, damping: 22 };

// Ultra-smooth ease-out-quint for height animation
const expandEase: [number, number, number, number] = [0.33, 1, 0.68, 1];

const expandTransition = {
    height: { duration: 0.45, ease: expandEase },
    opacity: { duration: 0.3, ease: "easeOut" as const },
};

// Stagger container for detail list items
const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const listItemVariants = {
    hidden: { opacity: 0, x: -12, filter: "blur(3px)" },
    visible: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        transition: springSmooth,
        willChange: "transform, opacity",
    },
};

export function Experience() {
    const [active, setActive] = useState<number | null>(null);

    const toggle = (index: number) => setActive(active === index ? null : index);

    return (
        <section id="experience" className="py-14 sm:py-20 px-4 sm:px-6 bg-muted/50 dark:bg-black/20">
            <div className="container mx-auto max-w-3xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={springSmooth}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
                >
                    Professional Journey
                </motion.h2>
                <p className="text-center text-xs sm:text-sm text-muted-foreground mb-10 sm:mb-14">
                    <span className="hidden sm:inline">Hover over</span>
                    <span className="sm:hidden">Tap</span> a card to explore details
                </p>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 opacity-30" />

                    <div className="space-y-4 sm:space-y-6">
                        {experience.map((job, index) => {
                            const isOpen = active === index;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -25, filter: "blur(4px)" }}
                                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true, margin: "-30px" }}
                                    transition={{
                                        delay: index * 0.08,
                                        ...springSmooth,
                                    }}
                                    className="relative pl-8 sm:pl-10 group"
                                    onMouseEnter={() => setActive(index)}
                                    onMouseLeave={() => setActive(null)}
                                    onClick={() => toggle(index)}
                                >
                                    {/* Timeline dot */}
                                    <motion.div
                                        animate={isOpen
                                            ? { scale: 1.5, boxShadow: "0 0 14px rgba(168, 85, 247, 0.7)" }
                                            : { scale: 1, boxShadow: "0 0 0px transparent" }
                                        }
                                        transition={springSnappy}
                                        className="absolute left-0 top-5 sm:top-6 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-background border-2 border-purple-500 z-10"
                                    />

                                    {/* Card */}
                                    <div
                                        className={`glass-morphism rounded-xl sm:rounded-2xl transition-all duration-400 overflow-hidden border ${isOpen
                                            ? "border-purple-500/40 dark:border-purple-400/30 shadow-lg shadow-purple-500/5"
                                            : "border-transparent hover:border-border dark:hover:border-white/10"
                                            }`}
                                    >
                                        {/* Header */}
                                        <div className="p-4 sm:p-5 flex items-start sm:items-center gap-3 sm:gap-4">
                                            <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 sm:mt-0 ${isOpen ? "bg-purple-600/15 dark:bg-purple-500/15 scale-110" : "bg-muted dark:bg-white/5"
                                                }`}>
                                                <Briefcase className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${isOpen ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"
                                                    }`} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">{job.role}</h3>
                                                <div className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-snug line-clamp-2 sm:truncate">
                                                    {job.company}
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end shrink-0 gap-1">
                                                <span className="text-[10px] sm:text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold whitespace-nowrap">
                                                    {job.duration}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                >
                                                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Expandable details */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{
                                                        height: expandTransition.height,
                                                        opacity: expandTransition.opacity,
                                                    }}
                                                    style={{ overflow: "hidden", willChange: "height, opacity" }}
                                                >
                                                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-border/50 dark:border-white/5 pt-3 sm:pt-4 space-y-3 sm:space-y-4">
                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <MapPin className="w-3 h-3" />
                                                            {job.location}
                                                        </div>

                                                        <motion.ul
                                                            className="space-y-2 sm:space-y-3"
                                                            variants={listVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                        >
                                                            {job.description.map((point, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    variants={listItemVariants}
                                                                    className="flex gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                                                                >
                                                                    <span className="text-purple-500 dark:text-purple-400 mt-0.5 sm:mt-1 shrink-0">▸</span>
                                                                    <span>{point}</span>
                                                                </motion.li>
                                                            ))}
                                                        </motion.ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
