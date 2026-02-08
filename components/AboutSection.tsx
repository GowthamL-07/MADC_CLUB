'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './AboutSection.css'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
}

// Premium Icons
const Icons = {
    spark: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L18 14L30 16L18 18L16 30L14 18L2 16L14 14L16 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.4" />
        </svg>
    ),
    code: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 9L3 14L8 19" />
            <path d="M20 9L25 14L20 19" />
            <path d="M17 5L11 23" />
        </svg>
    ),
    users: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="8" r="4" />
            <path d="M2 22C2 17.58 5.58 14 10 14C14.42 14 18 17.58 18 22" />
            <circle cx="20" cy="10" r="3" />
            <path d="M22 22C22 18.69 19.31 16 16 16" />
        </svg>
    ),
    rocket: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 25L11 22V16L6 11C6 6 10 2 14 2C18 2 22 6 22 11L17 16V22L14 25Z" />
            <circle cx="14" cy="9" r="2" />
        </svg>
    ),
    trophy: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 4H21V12C21 16.42 17.42 20 14 20C10.58 20 7 16.42 7 12V4Z" />
            <path d="M7 8H4C4 11 5 13 7 13" />
            <path d="M21 8H24C24 11 23 13 21 13" />
            <path d="M14 20V24M10 24H18" />
        </svg>
    ),
    target: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="14" cy="14" r="10" />
            <circle cx="14" cy="14" r="6" />
            <circle cx="14" cy="14" r="2" fill="currentColor" />
        </svg>
    ),
    globe: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="14" cy="14" r="11" />
            <ellipse cx="14" cy="14" rx="5" ry="11" />
            <path d="M3 14H25" />
            <path d="M5 8H23" />
            <path d="M5 20H23" />
        </svg>
    ),
    lightning: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 2L6 16H14L13 26L22 12H14L15 2Z" fill="currentColor" fillOpacity="0.1" />
        </svg>
    )
}



// What we do - focus areas
const focusAreas = [
    {
        icon: 'code',
        title: 'Mobile Development',
        description: 'Building native and cross-platform apps using Flutter, React Native, and Swift.',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
        icon: 'globe',
        title: 'Web Technologies',
        description: 'Modern web development with React, Next.js, and cutting-edge frameworks.',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
        icon: 'lightning',
        title: 'UI/UX Design',
        description: 'Creating intuitive, beautiful interfaces that users love.',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
        icon: 'rocket',
        title: 'Innovation Labs',
        description: 'Exploring AI, IoT, and emerging technologies through hands-on projects.',
        gradient: 'linear-gradient(135deg, #c97d4a 0%, #e09a68 100%)'
    }
]

// Get icon helper
const getIcon = (name: string) => Icons[name as keyof typeof Icons] || Icons.code



// Section wrapper with animations
function Section({ children, className = '', id = '' }: { children: React.ReactNode, className?: string, id?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <motion.section
            ref={ref}
            id={id}
            className={`about-section ${className}`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
        >
            {children}
        </motion.section>
    )
}

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -100])
    const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, 80])

    return (
        <div className="about-wrapper" id="about" ref={containerRef}>
            {/* Premium Background */}
            <div className="about-bg">
                <motion.div className="orb orb-1" style={{ y: parallaxY1 }} />
                <motion.div className="orb orb-2" style={{ y: parallaxY2 }} />
                <div className="grid-overlay" />
                <div className="noise-overlay" />
            </div>

            {/* ═══════════════════════════════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════════════════════════════ */}
            <Section className="about-hero">
                <div className="section-container">
                    <motion.div className="hero-content" variants={fadeInUp}>
                        <div className="hero-label">
                            <span className="label-dot" />
                            <span>About MADC</span>
                        </div>

                        <h1 className="hero-title">
                            <span className="title-thin">Where Ideas</span>
                            <span className="title-bold">Become <span className="text-gradient">Reality</span></span>
                        </h1>

                        <p className="hero-description">
                            MADC is a student-driven technical community at Kongu Engineering College, dedicated
                            to transforming curious minds into skilled builders through hands-on learning,
                            collaboration, and real-world projects.
                        </p>
                    </motion.div>


                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════════
                MISSION STATEMENT
            ═══════════════════════════════════════════════════════════════════ */}
            <Section className="about-mission">
                <div className="section-container">
                    <motion.div className="mission-card" variants={fadeInUp}>
                        <div className="mission-glow" />
                        <div className="mission-content">
                            <div className="spark-icon">{Icons.spark}</div>
                            <blockquote className="mission-quote">
                                "You don't become an engineer by watching.
                                <span className="quote-highlight"> You become an engineer by building.</span>"
                            </blockquote>
                            <p className="mission-text">
                                We bridge the gap between classroom theory and industry practice through
                                workshops, hackathons, and collaborative projects. Every member gets
                                the opportunity to <strong>learn</strong>, <strong>build</strong>, and <strong>lead</strong>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Section>



            {/* ═══════════════════════════════════════════════════════════════════
                VISION & MISSION CARDS
            ═══════════════════════════════════════════════════════════════════ */}
            <Section className="about-vm">
                <div className="section-container">
                    <motion.div className="vm-grid" variants={staggerContainer}>
                        <motion.div className="vm-card vision" variants={fadeInLeft} whileHover={{ y: -8 }}>
                            <div className="vm-accent" />
                            <div className="vm-header">
                                <span className="vm-label">Our Vision</span>
                                <div className="vm-icon vision-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <circle cx="16" cy="16" r="6" />
                                        <circle cx="16" cy="16" r="12" strokeDasharray="4 4" />
                                        <path d="M16 2V6M16 26V30M2 16H6M26 16H30" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="vm-title">Empowering Student Innovation</h3>
                            <p className="vm-text">
                                To create a culture where every student is confident in
                                turning ideas into working solutions using technology.
                            </p>
                        </motion.div>

                        <motion.div className="vm-card mission" variants={fadeInRight} whileHover={{ y: -8 }}>
                            <div className="vm-accent mission-accent" />
                            <div className="vm-header">
                                <span className="vm-label">Our Mission</span>
                                <div className="vm-icon mission-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M16 2L28 10V22L16 30L4 22V10L16 2Z" />
                                        <circle cx="16" cy="16" r="5" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="vm-title">Learn. Build. Lead.</h3>
                            <p className="vm-text">
                                To provide a collaborative environment where students master
                                modern development practices through hands-on projects and events.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </Section>
        </div>
    )
}
