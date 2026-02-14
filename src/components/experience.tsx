"use client";

import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/lib/data";
import { useState } from "react";
import { ChevronDown, MapPin, Briefcase } from "lucide-react";

export function Experience() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section id="experience" className="py-20 px-6 bg-muted/50 dark:bg-black/20">
            <div className="container mx-auto max-w-3xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
                >
                    Professional Journey
                </motion.h2>
                <p className="text-center text-sm text-muted-foreground mb-14">Hover over a card to explore details</p>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 opacity-30" />

                    <div className="space-y-6">
                        {experience.map((job, index) => {
                            const isOpen = hovered === index;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15, duration: 0.5 }}
                                    className="relative pl-10 group"
                                    onMouseEnter={() => setHovered(index)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {/* Timeline dot */}
                                    <motion.div
                                        animate={isOpen ? { scale: 1.5, boxShadow: "0 0 12px #a855f7" } : { scale: 1, boxShadow: "0 0 0px transparent" }}
                                        className="absolute left-0 top-6 w-4 h-4 rounded-full bg-background border-2 border-purple-500 transition-colors z-10"
                                    />

                                    {/* Card */}
                                    <div
                                        className={`glass-morphism rounded-2xl transition-all duration-300 overflow-hidden border ${isOpen
                                                ? "border-purple-500/40 dark:border-purple-400/30 shadow-lg shadow-purple-500/5"
                                                : "border-transparent hover:border-border dark:hover:border-white/10"
                                            }`}
                                    >
                                        {/* Always visible header */}
                                        <div className="p-5 flex items-center gap-4">
                                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen
                                                    ? "bg-purple-600/15 dark:bg-purple-500/15"
                                                    : "bg-muted dark:bg-white/5"
                                                }`}>
                                                <Briefcase className={`w-5 h-5 transition-colors duration-300 ${isOpen ? "text-purple-600 dark:text-purple-400" : "text-muted-foreground"
                                                    }`} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-bold text-foreground truncate">{job.role}</h3>
                                                <div className="text-sm text-muted-foreground mt-0.5 truncate">
                                                    {job.company}
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end shrink-0 gap-1">
                                                <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold whitespace-nowrap">
                                                    {job.duration}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* Expandable details on hover */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                                >
                                                    <div className="px-5 pb-5 border-t border-border/50 dark:border-white/5 pt-4 space-y-4">
                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <MapPin className="w-3 h-3" />
                                                            {job.location}
                                                        </div>

                                                        <ul className="space-y-3">
                                                            {job.description.map((point, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.08 }}
                                                                    className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                                                                >
                                                                    <span className="text-purple-500 dark:text-purple-400 mt-1 shrink-0">▸</span>
                                                                    <span>{point}</span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
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
