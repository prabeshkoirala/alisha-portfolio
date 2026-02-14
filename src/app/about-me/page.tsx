"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Globe, Cpu, TrendingUp, Languages, ChevronRight } from "lucide-react";
import Link from "next/link";

const springSmooth = { type: "spring" as const, stiffness: 60, damping: 18 };
const springBouncy = { type: "spring" as const, stiffness: 300, damping: 15 };

/* ── Animated Counter ──────────────────────────────── */
function AnimatedCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let frame: number;
        const duration = 1800;
        const start = performance.now();
        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Expo ease-out for dramatic count-up
            const eased = 1 - Math.pow(2, -10 * progress);
            setCount(Math.round(eased * value));
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [started, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={springSmooth}
            className="text-center"
        >
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">
                {count}{suffix}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{label}</div>
        </motion.div>
    );
}

/* ── Animated Bar Chart ────────────────────────────── */
function SkillBar({ skill, level, color, delay }: { skill: string; level: number; color: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay, ...springSmooth }}
            className="group"
        >
            <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                <span className="font-medium text-foreground">{skill}</span>
                <span className="text-muted-foreground">{level}%</span>
            </div>
            <div className="h-2.5 sm:h-3 rounded-full bg-muted dark:bg-white/5 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${level}%` }}
                    viewport={{ once: true }}
                    transition={{
                        delay: delay + 0.15,
                        type: "spring",
                        stiffness: 40,
                        damping: 15,
                        mass: 0.8,
                    }}
                    className={`h-full rounded-full ${color} shadow-sm`}
                />
            </div>
        </motion.div>
    );
}

/* ── Timeline Milestone ────────────────────────────── */
function Milestone({ year, title, description, index }: { year: string; title: string; description: string; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: index * 0.1, ...springSmooth }}
            className="relative pl-7 sm:pl-8 pb-8 sm:pb-10 last:pb-0"
        >
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.15, ...springBouncy }}
                className="absolute left-0 top-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_8px_rgba(13,204,242,0.5)]"
            />
            <div className="absolute left-[4px] sm:left-[5px] top-5 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/40 to-transparent last:hidden" />
            <span className="text-[10px] sm:text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">{year}</span>
            <h4 className="text-base sm:text-lg font-bold text-foreground mt-1 leading-snug">{title}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">{description}</p>
        </motion.div>
    );
}

/* ── Main Page Component ───────────────────────────── */
export default function AboutMePage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.6], ["0%", "25%"]);

    const skillsData = [
        { skill: "CRM & Client Management (Klozer)", level: 90, color: "bg-gradient-to-r from-cyan-500 to-cyan-400" },
        { skill: "Opera PMS — Hospitality", level: 85, color: "bg-gradient-to-r from-purple-500 to-purple-400" },
        { skill: "Advanced Excel & Data Analysis", level: 88, color: "bg-gradient-to-r from-emerald-500 to-emerald-400" },
        { skill: "Project & Event Management", level: 92, color: "bg-gradient-to-r from-pink-500 to-pink-400" },
        { skill: "Cross‑cultural Communication", level: 95, color: "bg-gradient-to-r from-amber-500 to-amber-400" },
    ];

    const milestones = [
        { year: "2027", title: "MBA — Utica University (Expected)", description: "Business Analytics specialization, sharpening data-driven decision-making." },
        { year: "2025", title: "G.P.G. Services — Customer Service Specialist", description: "Managed 150+ Australian clients daily; 95% first-call resolution rate." },
        { year: "2024", title: "Reformer Body Pilates — Administrative Assistant", description: "Drove 25% business growth through optimized scheduling for 60+ weekly clients." },
        { year: "2023", title: "The Soaltee Kathmandu — Guest Relations Intern", description: "Served 200+ international guests from 15+ countries; earned Letter of Appreciation." },
        { year: "2023", title: "Prom Event Organizer — Orchid International College", description: "Led planning and execution of a 200-attendee prom event." },
    ];

    const languages = [
        { name: "English", level: "Fluent", percent: 95 },
        { name: "Nepali", level: "Native", percent: 100 },
        { name: "Hindi", level: "Fluent", percent: 90 },
    ];

    // Stagger variants for strength cards
    const strengthContainerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    };

    const strengthCardVariants = {
        hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: springSmooth,
        },
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* ── Hero Section ─────────────────────────── */}
            <section ref={heroRef} className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-20 sm:pt-0">
                <motion.div style={{ opacity: heroOpacity, y: heroY }} className="max-w-3xl text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ type: "spring", stiffness: 50, damping: 15, mass: 1.2 }}
                    >
                        <Link href="/" className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-6 sm:mb-10 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                            Back to Portfolio
                        </Link>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mt-4 sm:mt-6">
                            My <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">Story</span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 sm:mt-6 leading-relaxed max-w-2xl mx-auto px-2">
                            I am a business professional and Utica University MBA student passionate about turning complex operational challenges into streamlined growth.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Decorative gradient orbs */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-20 -left-10 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="absolute bottom-10 -right-10 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
                />
            </section>

            {/* ── Bio Section ──────────────────────────── */}
            <section className="py-14 sm:py-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={springSmooth}
                        className="glass-morphism p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-border dark:border-white/10"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                            With a career spanning luxury hospitality at <span className="text-foreground font-semibold">The Soaltee Kathmandu</span> and high-velocity contact centers, I have developed a sharp analytical lens and the ability to navigate diverse, multilingual business environments.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Impact Numbers ───────────────────────── */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/50 dark:bg-black/20">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
                        <AnimatedCounter value={25} suffix="%" label="Business Growth Driven" />
                        <AnimatedCounter value={150} suffix="+" label="Clients Managed Daily" />
                        <AnimatedCounter value={95} suffix="%" label="First-Call Resolution" />
                        <AnimatedCounter value={15} suffix="+" label="Countries Served" />
                    </div>
                </div>
            </section>

            {/* ── Key Strengths Cards ──────────────────── */}
            <section className="py-14 sm:py-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={springSmooth}
                        className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center"
                    >
                        Key <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">Strengths</span>
                    </motion.h2>

                    <motion.div
                        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
                        variants={strengthContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {[
                            {
                                icon: Languages,
                                title: "Multilingual",
                                desc: "Fluent in English, Nepali, and Hindi — enabling seamless cross-cultural collaboration.",
                                gradient: "from-blue-500 to-cyan-400",
                            },
                            {
                                icon: Cpu,
                                title: "Tech‑Fluent",
                                desc: "Experienced in CRM (Klozer), Opera, and advanced data tools like Excel.",
                                gradient: "from-purple-500 to-pink-400",
                            },
                            {
                                icon: TrendingUp,
                                title: "Impact‑Focused",
                                desc: "Supported 25% business growth at Reformer Body Pilates through optimized scheduling and client management.",
                                gradient: "from-emerald-500 to-teal-400",
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                variants={strengthCardVariants}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="p-5 sm:p-6 rounded-xl sm:rounded-2xl glass-morphism border border-border dark:border-white/10 hover:shadow-xl hover:shadow-cyan-500/5 transition-shadow duration-300 group cursor-default"
                            >
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5 sm:mb-2">{card.title}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Languages Viz ─────────────────────────── */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/50 dark:bg-black/20">
                <div className="container mx-auto max-w-md sm:max-w-2xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={springSmooth}
                        className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center"
                    >
                        <Globe className="w-6 h-6 sm:w-8 sm:h-8 inline-block mr-2 text-cyan-600 dark:text-cyan-400 -mt-1" />
                        Languages
                    </motion.h2>
                    <div className="grid grid-cols-3 gap-3 sm:gap-6">
                        {languages.map((lang, i) => (
                            <motion.div
                                key={lang.name}
                                initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
                                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, ...springBouncy }}
                                className="text-center"
                            >
                                {/* Circular progress ring */}
                                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-2 sm:mb-3">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" fill="none" strokeWidth="6" className="stroke-muted dark:stroke-white/10" />
                                        <motion.circle
                                            cx="50" cy="50" r="42" fill="none" strokeWidth="6"
                                            strokeLinecap="round"
                                            className="stroke-cyan-500 dark:stroke-cyan-400"
                                            initial={{ strokeDasharray: "0 264" }}
                                            whileInView={{ strokeDasharray: `${lang.percent * 2.64} 264` }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: i * 0.15 + 0.2,
                                                type: "spring",
                                                stiffness: 30,
                                                damping: 12,
                                                mass: 0.8,
                                            }}
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-sm sm:text-base md:text-lg font-bold text-foreground">{lang.percent}%</span>
                                    </div>
                                </div>
                                <div className="text-xs sm:text-sm font-semibold text-foreground">{lang.name}</div>
                                <div className="text-[10px] sm:text-xs text-muted-foreground">{lang.level}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Skills Bar Graph ──────────────────────── */}
            <section className="py-14 sm:py-20 px-4 sm:px-6">
                <div className="container mx-auto max-w-2xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={springSmooth}
                        className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center"
                    >
                        Skills & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">Proficiency</span>
                    </motion.h2>
                    <div className="space-y-4 sm:space-y-6">
                        {skillsData.map((s, i) => (
                            <SkillBar key={s.skill} {...s} delay={i * 0.08} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Journey Timeline ──────────────────────── */}
            <section className="py-14 sm:py-20 px-4 sm:px-6 bg-muted/50 dark:bg-black/20">
                <div className="container mx-auto max-w-2xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={springSmooth}
                        className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center"
                    >
                        Career <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">Timeline</span>
                    </motion.h2>
                    <div>
                        {milestones.map((m, i) => (
                            <Milestone key={i} {...m} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Footer ───────────────────────────── */}
            <section className="py-14 sm:py-20 px-4 sm:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={springSmooth}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6">Interested in working together?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={springBouncy}
                        >
                            <Link
                                href="/#contact"
                                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold hover:shadow-xl hover:shadow-cyan-500/30 transition-shadow duration-300 text-sm sm:text-base"
                            >
                                Get in Touch
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={springBouncy}
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full glass-morphism border border-border dark:border-white/10 text-foreground font-medium hover:shadow-lg transition-shadow duration-300 text-sm sm:text-base"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Portfolio
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
