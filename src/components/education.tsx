"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import { GraduationCap, MapPin } from "lucide-react";

export function Education() {
    return (
        <section id="education" className="py-14 sm:py-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-emerald-600 dark:from-cyan-400 dark:to-emerald-400">
                    Education &amp; Achievements
                </h2>

                <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.03, y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-5 sm:p-8 rounded-2xl glass-morphism border border-border dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/50 transition-colors shadow-lg group cursor-default hover:shadow-xl"
                        >
                            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600 dark:text-cyan-400 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300" />
                            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1 leading-snug">{edu.degree}</h3>
                            <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium mb-2 sm:mb-3 italic">{edu.major}</p>
                            <div className="text-sm sm:text-base text-cyan-700 dark:text-cyan-400 font-medium mb-1">{edu.school}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3 sm:mb-4">
                                <MapPin className="w-3 h-3" />
                                {edu.location}
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
                </div>
            </div>
        </section>
    );
}
