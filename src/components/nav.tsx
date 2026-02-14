"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Mail, FileText, Download, Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export function Nav() {
    const navLinks = [
        { name: "About", href: "#about", icon: User },
        { name: "Experience", href: "#experience", icon: Briefcase },
        { name: "Contact", href: "#contact", icon: Mail },
        { name: "Story", href: "/about-me", icon: Sparkles, isPage: true },
    ];

    const [showResumeConfirm, setShowResumeConfirm] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleResumeClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowResumeConfirm(true);
        setMobileOpen(false);
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

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 md:py-5 glass-morphism border-b border-border/40 dark:border-white/5 backdrop-blur-xl"
            >
                <Link href="/" className="text-2xl md:text-3xl font-bold tracking-wide font-pinyon bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 hover:scale-105 transition-transform cursor-pointer">
                    Alisha Tajpuriya
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <ul className="flex items-center gap-6">
                        {navLinks.map((link) =>
                            link.isPage ? (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="relative text-sm font-medium text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors group cursor-pointer"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all group-hover:w-full" />
                                    </Link>
                                </li>
                            ) : (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="relative text-sm font-medium text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors group cursor-pointer"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all group-hover:w-full" />
                                    </a>
                                </li>
                            )
                        )}
                    </ul>

                    {/* Resume CTA */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResumeClick}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20 dark:shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/30 dark:hover:shadow-cyan-500/40 transition-all duration-300"
                    >
                        <Download className="w-4 h-4" />
                        Resume
                    </motion.button>

                    <ThemeToggle />
                </div>

                {/* Mobile: Theme + Hamburger */}
                <div className="flex md:hidden items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="relative w-10 h-10 flex items-center justify-center rounded-xl glass-morphism border border-border/50 dark:border-white/10"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {mobileOpen ? (
                                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <X className="w-5 h-5 text-foreground" />
                                </motion.div>
                            ) : (
                                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Menu className="w-5 h-5 text-foreground" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeMobile}
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                        />

                        {/* Slide-down panel */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                            className="fixed top-[65px] left-4 right-4 z-50 glass-morphism rounded-2xl border border-border/50 dark:border-white/10 shadow-2xl p-5 md:hidden overflow-hidden"
                        >
                            <ul className="space-y-1">
                                {navLinks.map((link, i) => {
                                    const Icon = link.icon;
                                    const content = (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.07 }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted dark:hover:bg-white/5 transition-colors"
                                        >
                                            <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                            <span className="text-base font-medium text-foreground">{link.name}</span>
                                        </motion.div>
                                    );

                                    return (
                                        <li key={link.name}>
                                            {link.isPage ? (
                                                <Link href={link.href} onClick={closeMobile}>{content}</Link>
                                            ) : (
                                                <a href={link.href} onClick={closeMobile}>{content}</a>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* Mobile Resume CTA */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={handleResumeClick}
                                className="w-full mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white font-semibold shadow-lg shadow-cyan-500/20 transition-all"
                            >
                                <Download className="w-4 h-4" />
                                Download Resume
                            </motion.button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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
