"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { User, Briefcase, Mail, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
    const links = [
        { name: "About", href: "#about", icon: User },
        { name: "Experience", href: "#experience", icon: Briefcase },
        { name: "Resume", href: "#resume", icon: FileText },
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
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 glass-morphism border-b border-border/40 dark:border-white/5 backdrop-blur-xl"
            >
                <div className="text-3xl font-bold tracking-wide font-pinyon bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500 hover:scale-105 transition-transform cursor-pointer">
                    Alisha Tajpuriya
                </div>

                <div className="flex items-center gap-8">
                    <ul className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={link.name === "Resume" ? handleResumeClick : undefined}
                                    className="relative text-sm font-medium text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors group cursor-pointer"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 dark:bg-cyan-400 transition-all group-hover:w-full" />
                                </a>
                            </li>
                        ))}
                    </ul>
                    <ThemeToggle />
                </div>
            </motion.nav>

            {/* Resume Confirmation Modal */}
            {showResumeConfirm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-card dark:bg-slate-900 border border-border dark:border-white/10 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 text-center"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-foreground">Download Resume?</h3>
                        <p className="text-muted-foreground mb-8">
                            Would you like to download the PDF resume for Alisha Tajpuriya?
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowResumeConfirm(false)}
                                className="px-6 py-2 rounded-full border border-border dark:border-white/10 hover:bg-muted transition-colors text-foreground"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDownload}
                                className="px-6 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors shadow-lg shadow-cyan-500/20"
                            >
                                Yes, Download
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}
