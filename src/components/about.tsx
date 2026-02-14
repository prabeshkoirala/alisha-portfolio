"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export function About() {
    return (
        <section id="about" className="py-20 px-6 relative">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                        About Me
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                As an MBA candidate specializing in <span className="text-cyan-400 font-semibold">Business Analytics</span>, I bridge the gap between complex data and strategic business decisions.
                                My background in international operations has honed my ability to navigate cross-cultural environments and lead diverse teams.
                            </p>
                            <p>
                                I believe in the power of <span className="text-purple-400 font-semibold">discipline</span> and data-driven insights to drive operational excellence.
                            </p>
                        </div>

                        <div className="glass-morphism p-8 rounded-2xl neon-border">
                            <h3 className="text-xl font-bold mb-6 text-white text-center md:text-left">Technical Toolkit</h3>
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(13, 204, 242, 0.2)", borderColor: "rgba(13, 204, 242, 0.5)" }}
                                        className="px-4 py-2 text-sm font-medium bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20 transition-colors cursor-default"
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
