"use client";

import { motion } from "framer-motion";
import { involvement } from "@/lib/data";
import { Calendar, Users } from "lucide-react";

export function Involvement() {
    return (
        <section id="involvement" className="py-14 sm:py-20 px-4 sm:px-6 bg-muted/50 dark:bg-black/20">
            <div className="container mx-auto max-w-3xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-600 dark:from-pink-400 dark:to-orange-400"
                >
                    Campus Involvement
                </motion.h2>

                <div className="space-y-5 sm:space-y-8">
                    {involvement.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="glass-morphism p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border dark:border-white/10 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-pink-600/10 dark:bg-pink-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 dark:text-pink-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-1 mb-2">
                                        <h3 className="text-base sm:text-lg font-bold text-foreground">{item.title}</h3>
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                                            <Calendar className="w-3 h-3" />
                                            {item.date}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-cyan-700 dark:text-cyan-400 font-medium mb-2 sm:mb-3">{item.organization}</p>
                                    <ul className="space-y-1.5 sm:space-y-2">
                                        {item.description.map((point, i) => (
                                            <li key={i} className="flex gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                <span className="text-pink-500 dark:text-pink-400 mt-0.5 shrink-0">▸</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
