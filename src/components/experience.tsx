"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export function Experience() {
    return (
        <section id="experience" className="py-20 px-6 bg-muted/50 dark:bg-black/20">
            <div className="container mx-auto max-w-3xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
                >
                    Professional Journey
                </motion.h2>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 opacity-30" />

                    <div className="space-y-10">
                        {experience.map((job, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="relative pl-10 group"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-background border-2 border-purple-500 group-hover:scale-150 transition-all duration-300 group-hover:shadow-[0_0_12px_#a855f7] group-hover:border-cyan-500 z-10" />

                                {/* Card */}
                                <div className="glass-morphism p-6 rounded-2xl transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.12)] group-hover:translate-x-1">
                                    {/* Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1">
                                        <span className="text-sm font-mono tracking-wider text-purple-600 dark:text-purple-400 font-semibold">
                                            {job.duration}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            📍 {job.location}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-1">
                                        {job.role}
                                    </h3>
                                    <div className="text-base text-cyan-700 dark:text-cyan-400 mb-4 font-medium">
                                        {job.company}
                                    </div>

                                    {/* Bullet points */}
                                    <ul className="space-y-3">
                                        {job.description.map((point, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                                <span className="text-purple-500 dark:text-purple-400 mt-1.5 shrink-0">▸</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
