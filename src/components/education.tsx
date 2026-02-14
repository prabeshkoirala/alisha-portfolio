"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { GraduationCap } from "lucide-react";

export function Education() {
    return (
        <section id="education" className="py-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400">
                    Education &amp; Achievements
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.03, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-8 rounded-2xl glass-morphism border border-border dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-colors shadow-lg group cursor-default hover:shadow-xl"
                        >
                            <GraduationCap className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
                            <h3 className="text-2xl font-bold text-foreground mb-2">{edu.degree}</h3>
                            <div className="text-cyan-600 dark:text-cyan-400 mb-4 font-medium">{edu.school}</div>
                            <div className="flex justify-between text-sm text-muted-foreground border-t border-border dark:border-white/10 pt-4 mt-4">
                                <span>{edu.year}</span>
                                {edu.grade && <span className="font-mono text-foreground">{edu.grade}</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
