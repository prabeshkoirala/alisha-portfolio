"use client";

import { motion } from "framer-motion";
import { hobbies } from "@/lib/data";
import { Dumbbell, BookOpen, Target } from "lucide-react";

const hobbyIcons = [Dumbbell, BookOpen, Target];

const springSmooth = { type: "spring" as const, stiffness: 60, damping: 18 };

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 25, filter: "blur(5px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: springSmooth,
    },
};

export function Hobbies() {
    return (
        <section id="hobbies" className="py-14 sm:py-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={springSmooth}
                    className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400"
                >
                    Personal Interests
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                >
                    {hobbies.map((hobby, index) => {
                        const Icon = hobbyIcons[index % hobbyIcons.length];
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -8 }}
                                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                className="p-5 sm:p-6 rounded-xl sm:rounded-2xl glass-morphism border border-border dark:border-white/10 text-center hover:shadow-lg hover:shadow-emerald-500/5 hover:border-emerald-500/30 dark:hover:border-emerald-400/20 transition-all duration-300 group cursor-default"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-600/10 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{hobby}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
