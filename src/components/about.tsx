"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const springSmooth = { type: "spring" as const, stiffness: 60, damping: 18 };
const springBouncy = { type: "spring" as const, stiffness: 300, damping: 15 };

// Orchestrated stagger
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
};

const pillVariants = {
    hidden: { opacity: 0, scale: 0.6, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: springBouncy,
    },
};

export function About() {
    return (
        <section id="about" className="py-14 sm:py-20 px-4 sm:px-6 relative">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={springSmooth}
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
                            <motion.div
                                className="flex flex-wrap gap-2 sm:gap-3"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-30px" }}
                            >
                                {skills.map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        variants={pillVariants}
                                        whileHover={{
                                            scale: 1.12,
                                            boxShadow: "0 0 16px rgba(13, 204, 242, 0.25)",
                                        }}
                                        transition={springBouncy}
                                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-cyan-600/10 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 rounded-full border border-cyan-600/20 dark:border-cyan-500/20 transition-colors duration-200 cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
