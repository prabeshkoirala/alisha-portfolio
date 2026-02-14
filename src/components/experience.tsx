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

                <div className="space-y-12">
                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative pl-8 border-l-2 border-border dark:border-white/10 hover:border-purple-500 transition-colors group"
                        >
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-purple-500 group-hover:scale-125 transition-transform group-hover:shadow-[0_0_10px_#a855f7]" />

                            <div className="glass-morphism p-6 rounded-2xl transition-all duration-300 hover:shadow-lg dark:hover:bg-white/5 dark:hover:border-purple-500/30 dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                                <div className="mb-2 text-sm text-purple-600 dark:text-purple-400 font-mono tracking-wider">
                                    {job.duration}
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {job.role}
                                </h3>
                                <div className="text-lg text-muted-foreground mb-4 font-medium">
                                    {job.company}
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {job.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
