"use client";

import { motion } from "framer-motion";
import { hobbies } from "@/lib/data";
import { Dumbbell, BookOpen, Target } from "lucide-react";

const hobbyIcons = [Dumbbell, BookOpen, Target];

export function Hobbies() {
    return (
        <section id="hobbies" className="py-14 sm:py-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400"
                >
                    Personal Interests
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {hobbies.map((hobby, index) => {
                        const Icon = hobbyIcons[index % hobbyIcons.length];
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="p-5 sm:p-6 rounded-xl sm:rounded-2xl glass-morphism border border-border dark:border-white/10 text-center hover:shadow-lg transition-all duration-300 group cursor-default"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-600/10 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{hobby}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
