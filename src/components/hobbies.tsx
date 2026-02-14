"use client";

import { motion } from "framer-motion";
import { hobbies } from "@/lib/data";
import { Dumbbell, BookOpen, Target } from "lucide-react";

const hobbyIcons = [Dumbbell, BookOpen, Target];

export function Hobbies() {
    return (
        <section id="hobbies" className="py-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400"
                >
                    Personal Interests
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-6">
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
                                className="p-6 rounded-2xl glass-morphism border border-border dark:border-white/10 text-center hover:shadow-lg transition-all duration-300 group cursor-default"
                            >
                                <div className="w-12 h-12 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{hobby}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
