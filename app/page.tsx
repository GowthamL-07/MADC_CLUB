'use client'

import { useRef, useState } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import ScrollSequence from '@/components/ScrollSequence'
import Navbar from '@/components/Navbar'
import AboutSection from '@/components/AboutSection'
import EventsSection from '@/components/EventsSection'
import TeamSection from '@/components/TeamSection'
import GallerySection from '@/components/GallerySection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    // 5 Scenes with refined scroll timing
    // Scene 1: 0-18% - Phone Complete (Hero)
    const scene1Opacity = useTransform(scrollYProgress, [0, 0.12, 0.16], [1, 1, 0])
    const scene1Y = useTransform(scrollYProgress, [0, 0.16], [0, -60])
    const scene1Scale = useTransform(scrollYProgress, [0, 0.16], [1, 0.96])

    // Scene 2: 18-36% - Phone Close-Up
    const scene2Opacity = useTransform(scrollYProgress, [0.16, 0.22, 0.32, 0.38], [0, 1, 1, 0])
    const scene2Y = useTransform(scrollYProgress, [0.16, 0.22, 0.38], [50, 0, -40])
    const scene2X = useTransform(scrollYProgress, [0.16, 0.22], [-20, 0])

    // Scene 3: 36-54% - Internal Parts Visible
    const scene3Opacity = useTransform(scrollYProgress, [0.36, 0.42, 0.50, 0.56], [0, 1, 1, 0])
    const scene3Y = useTransform(scrollYProgress, [0.36, 0.42, 0.56], [50, 0, -40])
    const scene3X = useTransform(scrollYProgress, [0.36, 0.42], [20, 0])

    // Scene 4: 54-72% - Fully Exploded Wide View
    const scene4Opacity = useTransform(scrollYProgress, [0.54, 0.60, 0.68, 0.74], [0, 1, 1, 0])
    const scene4Y = useTransform(scrollYProgress, [0.54, 0.60, 0.74], [50, 0, -40])

    // Scene 5: 74-100% - Hand Holding Phone (CTA)
    const scene5Opacity = useTransform(scrollYProgress, [0.74, 0.82, 1], [0, 1, 1])
    const scene5Y = useTransform(scrollYProgress, [0.74, 0.82], [60, 0])
    const scene5Scale = useTransform(scrollYProgress, [0.74, 0.82], [0.95, 1])

    // Progress bar
    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

    // Scroll indicator
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])

    return (
        <>
            {/* Premium Navbar */}
            <Navbar />

            {/* Fixed Background Canvas */}
            <ScrollSequence
                onLoadComplete={() => setIsLoaded(true)}
                scrollYProgress={scrollYProgress}
            />

            {/* Scrollable Content Container */}
            <div ref={containerRef} className="scroll-content">
                {/* Progress Bar */}
                <motion.div
                    className="progress-bar"
                    style={{ width: progressWidth }}
                />

                {/* Scroll Indicator */}
                <motion.div
                    className="scroll-indicator"
                    style={{ opacity: scrollIndicatorOpacity }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                >
                    <span>Scroll to explore</span>
                    <div className="scroll-indicator-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    </div>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════════════════
                        SCENE 1 — Phone Complete (Hero)
                        ═══════════════════════════════════════════════════════════════════════════ */}
                <motion.div
                    className="text-overlay left hero-section"
                    style={{
                        opacity: scene1Opacity,
                        y: scene1Y,
                        scale: scene1Scale
                    }}
                >
                    {/* College Logo */}
                    <motion.div
                        className="college-logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <img src="/kec-logo.png" alt="Kongu Engineering College" />
                    </motion.div>
                    <motion.span
                        className="hero-tag"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        ✦ KEC IT DEPARTMENT
                    </motion.span>
                    <motion.h1
                        className="hero-headline"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <span className="hero-intro">Welcome to</span><br />
                        <span className="text-gradient">MADC Club</span>
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isLoaded ? 0.7 : 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        Mobile App Development Club
                    </motion.p>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════════════════
                        SCENE 2 — Phone Close-Up
                        ═══════════════════════════════════════════════════════════════════════════ */}
                <motion.div
                    className="text-overlay left"
                    style={{ opacity: scene2Opacity, y: scene2Y, x: scene2X }}
                >
                    <span className="scene-tag">Engineer Your Future</span>
                    <h2 className="scene-headline">
                        Learn Beyond<br />
                        <span className="text-gradient">the Classroom</span>
                    </h2>
                    <p className="scene-description">
                        Workshops, hackathons, and real-world projects that transform
                        curiosity into skill.
                    </p>
                    <div className="scene-accent-line" />
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════════════════
                        SCENE 3 — Internal Parts Visible
                        ═══════════════════════════════════════════════════════════════════════════ */}
                <motion.div
                    className="text-overlay right"
                    style={{ opacity: scene3Opacity, y: scene3Y, x: scene3X }}
                >
                    <span className="scene-tag">Inside the Journey</span>
                    <h2 className="scene-headline">
                        Break. Understand.<br />
                        <span className="text-gradient">Rebuild.</span>
                    </h2>
                    <p className="scene-description">
                        Great engineers are built by understanding every layer —
                        from logic to creativity.
                    </p>
                    <div className="scene-accent-line" />
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════════════════
                        SCENE 4 — Fully Exploded Wide View
                        ═══════════════════════════════════════════════════════════════════════════ */}
                <motion.div
                    className="text-overlay center"
                    style={{ opacity: scene4Opacity, y: scene4Y }}
                >
                    <span className="scene-tag">Innovation in Every Layer</span>
                    <h2 className="scene-headline-large">
                        Skills. Teamwork.<br />
                        <span className="text-gradient">Execution.</span>
                    </h2>
                    <p className="scene-description-center">
                        At MADC, you don't just learn technology — you build with it.
                    </p>
                </motion.div>

                {/* ═══════════════════════════════════════════════════════════════════════════
                        SCENE 5 — Hand Holding Phone (CTA)
                        ═══════════════════════════════════════════════════════════════════════════ */}
                <motion.div
                    className="text-overlay left cta-section"
                    style={{ opacity: scene5Opacity, y: scene5Y, scale: scene5Scale }}
                >
                    <span className="cta-tag">✦ The Future is Mobile</span>
                    <h2 className="cta-headline">
                        Ideas Into<br />
                        <span className="text-gradient">Reality.</span>
                    </h2>
                    <p className="cta-subtitle">
                        Where students become creators.
                    </p>
                </motion.div>
            </div>

            {/* About Section - Appears after scrollytelling */}
            <AboutSection />

            {/* Events Section - Our organized events */}
            <EventsSection />

            {/* Team Section - Club leadership and team */}
            <TeamSection />

            {/* Gallery Section - Photo memories */}
            <GallerySection />

            {/* Contact Section - Get in touch */}
            <ContactSection />
        </>
    )
}
