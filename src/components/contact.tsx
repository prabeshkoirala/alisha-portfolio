"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { Mail, MapPin, Linkedin } from "lucide-react";

export function Contact() {
    return (
        <section id="contact" className="py-14 sm:py-20 px-4 sm:px-6 bg-muted/50 dark:bg-black/40">
            <div className="container mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">
                        Let&apos;s Connect
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
                        I&apos;m always open to discussing new opportunities in business analytics and operations.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-14 sm:mb-20">
                        <a
                            href={`mailto:${personalInfo.email}`}
                            className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white dark:text-black font-bold hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-all hover:scale-105 shadow-lg text-sm sm:text-base"
                        >
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                            Send an Email
                        </a>

                        {/* Location + LinkedIn */}
                        <div className="flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 rounded-full glass-morphism border border-border dark:border-white/10 text-foreground text-sm sm:text-base">
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                            <span>{personalInfo.location}</span>
                            <span className="w-px h-4 sm:h-5 bg-border dark:bg-white/20" />
                            <a
                                href={personalInfo.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors hover:scale-110 transform"
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                            </a>
                        </div>
                    </div>

                    <footer className="border-t border-border dark:border-white/5 pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-muted-foreground gap-4">
                        <p>© {new Date().getFullYear()} Alisha Tajpuriya. All rights reserved.</p>
                    </footer>
                </motion.div>
            </div>
        </section>
    );
}
