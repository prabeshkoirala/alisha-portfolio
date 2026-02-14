"use client";

import { motion } from "framer-motion";
import { involvement } from "@/lib/data";
import { Calendar, Users } from "lucide-react";

export function Involvement() {
    return (
        <section id="involvement" className="py-20 px-6 bg-muted/50 dark:bg-black/20">
            <div className="container mx-auto max-w-3xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-600 dark:from-pink-400 dark:to-orange-400"
                >
                    Campus Involvement
                </motion.h2>

                <div className="space-y-8">
                    {involvement.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="glass-morphism p-6 rounded-2xl border border-border dark:border-white/10 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-pink-600/10 dark:bg-pink-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Users className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                        <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                                            <Calendar className="w-3 h-3" />
                                            {item.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-cyan-700 dark:text-cyan-400 font-medium mb-3">{item.organization}</p>
                                    <ul className="space-y-2">
                                        {item.description.map((point, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
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
