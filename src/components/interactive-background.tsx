"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let w: number, h: number;
        let dpr: number;

        const mouse = { x: -1000, y: -1000 };
        let mouseRAF = false;

        // Configuration — adaptive to viewport
        const connectionDistanceSq = 150 * 150; // squared for perf
        const mouseDistanceSq = 200 * 200;
        const damping = 0.995;

        function getParticleCount() {
            const vw = window.innerWidth;
            if (vw < 640) return 25;
            if (vw < 1024) return 40;
            return 55;
        }

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseSize: number;
            phase: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.baseSize = Math.random() * 1.8 + 0.8;
                this.phase = Math.random() * Math.PI * 2;
            }

            update(time: number) {
                this.x += this.vx;
                this.y += this.vy;

                // Velocity damping for smooth deceleration
                this.vx *= damping;
                this.vy *= damping;

                // Gentle re-acceleration so particles never stop
                if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.08;
                if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.08;

                // Bounce off edges smoothly
                if (this.x < 0) { this.x = 0; this.vx = Math.abs(this.vx) * 0.8; }
                if (this.x > w) { this.x = w; this.vx = -Math.abs(this.vx) * 0.8; }
                if (this.y < 0) { this.y = 0; this.vy = Math.abs(this.vy) * 0.8; }
                if (this.y > h) { this.y = h; this.vy = -Math.abs(this.vy) * 0.8; }

                // Mouse interaction (squared distance — no sqrt)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < mouseDistanceSq && distSq > 0) {
                    const dist = Math.sqrt(distSq); // only sqrt when needed
                    const force = (Math.sqrt(mouseDistanceSq) - dist) / Math.sqrt(mouseDistanceSq);
                    this.vx -= (dx / dist) * force * 0.3;
                    this.vy -= (dy / dist) * force * 0.3;
                }

                // Subtle size pulsing
                return this.baseSize + Math.sin(time * 0.001 + this.phase) * 0.3;
            }

            draw(size: number) {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(13, 204, 242, 0.25)";
                ctx.fill();
            }
        }

        const init = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            particles = [];
            const count = getParticleCount();
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const animate = (time: number) => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, w, h);

            // Update & draw particles
            const sizes: number[] = [];
            for (let i = 0; i < particles.length; i++) {
                const size = particles[i].update(time);
                sizes[i] = size;
                particles[i].draw(size);
            }

            // Draw connections (squared distance — no sqrt in hot path)
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < connectionDistanceSq) {
                        const alpha = 0.12 * (1 - distSq / connectionDistanceSq);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(13, 204, 242, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(init, 150);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (mouseRAF) return;
            mouseRAF = true;
            requestAnimationFrame(() => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                mouseRAF = false;
            });
        };

        window.addEventListener("resize", handleResize, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        init();
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none opacity-50 dark:opacity-100"
            style={{ background: "transparent" }}
        />
    );
}
