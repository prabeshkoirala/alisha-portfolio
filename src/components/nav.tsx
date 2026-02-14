"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Mail, FileText, Download } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function Nav() {
    const navLinks = [
        { name: "About", href: "#about", icon: User },
        { name: "Experience", href: "#experience", icon: Briefcase },
        { name: "Contact", href: "#contact", icon: Mail },
    ];

    const [showResumeConfirm, setShowResumeConfirm] = useState(false);

    const handleResumeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowResumeConfirm(true);
    };

    const confirmDownload = () => {
        setShowResumeConfirm(false);
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Alisha_Tajpuriya_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 glass-morphism border-b border-border/40 dark:border-white/5 backdrop-blur-xl"
            >
                <Link href="/" className="text-3xl font-bold tracking-wide font-pinyon bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 hover:scale-105 transition-transform cursor-pointer">
                    Alisha Tajpuriya
                </Link>

                <div className="flex items-center gap-6">
                    <ul className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="relative text-sm font-medium text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors group cursor-pointer"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all group-hover:w-full" />
                                </a>
                            </li>
                        ))}
                        <li key="about-me">
                            <Link
                                href="/about-me"
                                className="relative text-sm font-medium text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors group cursor-pointer"
                            >
                                Story
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all group-hover:w-full" />
                            </Link>
                        </li>
                    </ul>

                    {/* Resume CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResumeClick}
                        className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/30 dark:hover:shadow-cyan-500/40 transition-all duration-300"
                    >
                        <Download className="w-4 h-4" />
                        Resume
                    </motion.button>

                    <ThemeToggle />
                </div>
            </motion.nav>

            {/* Resume Confirmation Modal */}
            <AnimatePresence>
                {showResumeConfirm && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-card dark:bg-slate-900 border border-border dark:border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-cyan-600/10 dark:bg-cyan-500/10 flex items-center justify-center mx-auto mb-5">
                                <FileText className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-foreground">Download Resume?</h3>
                            <p className="text-muted-foreground mb-8">
                                Get the latest PDF resume for Alisha Tajpuriya.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowResumeConfirm(false)}
                                    className="px-6 py-2.5 rounded-full border border-border dark:border-white/10 hover:bg-muted transition-colors text-foreground text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDownload}
                                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold transition-all shadow-lg shadow-cyan-500/20 text-sm flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
