"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, MapPin, Linkedin } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-20 px-6 bg-muted/50 dark:bg-black/40">
            <div className="container mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">
                        Let&apos;s Connect
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        I&apos;m always open to discussing new opportunities in business analytics and operations.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-8 mb-20">
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black font-bold hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-all hover:scale-105 shadow-lg"
                        >
                            <Mail className="w-5 h-5" />
                            Send an Email
                        </a>
                        <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-full glass-morphism border border-border dark:border-white/10 text-foreground">
                            <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <span>{personalInfo.location}</span>
                        </div>
                    </div>

                    <footer className="border-t border-border dark:border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
                        <p>© {new Date().getFullYear()} Alisha Tajpuriya. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors transform hover:scale-110">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </footer>
                </motion.div>
            </div>
        </section>
    );
}
