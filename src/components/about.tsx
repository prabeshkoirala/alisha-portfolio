"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export function About() {
    return (
        <section id="about" className="py-14 sm:py-20 px-4 sm:px-6 relative">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">
                        About Me
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="space-y-4 sm:space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed">
                            <p>
                                As an MBA candidate specializing in <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Business Analytics</span>, I bridge the gap between complex data and strategic business decisions.
                                My background in international operations has honed my ability to navigate cross-cultural environments and lead diverse teams.
                            </p>
                            <p>
                                I believe in the power of <span className="text-purple-600 dark:text-purple-400 font-semibold">discipline</span> and data-driven insights to drive operational excellence.
                            </p>
                        </div>

                        <div className="glass-morphism p-6 sm:p-8 rounded-2xl border border-border dark:neon-border">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-foreground text-center md:text-left">Technical Toolkit</h3>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(13, 204, 242, 0.15)" }}
                                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-cyan-600/10 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 rounded-full border border-cyan-600/20 dark:border-cyan-500/20 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
