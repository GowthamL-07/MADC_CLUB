'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Navbar from '@/components/Navbar'
import './about.css'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
}

// Activity data
const activities = [
    {
        icon: '🧠',
        title: 'Gen-AI Workshop',
        date: '7 Feb 2026',
        location: 'IT Park',
        description: 'A hands-on workshop fostering innovation and creativity among students with participation from college leadership.'
    },
    {
        icon: '☁️',
        title: 'Guest Lecture — Cloud Engineering',
        date: '28 July 2025',
        speaker: 'Mr. Sankar Madhappan, Senior Cloud Engineer, Oracle Solutions',
        description: '"Low Code Meets Mobility: Developing Hybrid Apps with Oracle VBCS" — encouraging students to explore hybrid app platforms.'
    },
    {
        icon: '📱',
        title: 'React Native Workshop',
        date: '18 Aug 2025',
        description: 'Students learned cross-platform app development, environment setup, and component architecture with hands-on practice.'
    },
    {
        icon: '🎨',
        title: 'UI/UX Design Workshop',
        date: '20 Sep 2025',
        description: 'Introduction to Figma, Adobe XD, wireframing, typography, and user-centered design principles.'
    },
    {
        icon: '🤖',
        title: 'JARVIS 2K25',
        date: '4 Oct 2025',
        description: 'A large technical & creative event including Paper Presentation, AI Prompting, Web Design, Video Editing, and more.'
    },
    {
        icon: '💥',
        title: 'MADATHON 2K25',
        date: '26 & 27 Dec 2025',
        description: 'A full-scale hackathon with multiple evaluation rounds, overnight development, and prize distribution.'
    }
]

// Leadership roles
const leadershipRoles = [
    'Secretary',
    'Joint Secretaries',
    'Treasurers',
    'Additional Secretaries',
    'Media Team',
    'Executive Members'
]

// Student benefits
const benefits = [
    { icon: '💻', text: 'Practical development experience' },
    { icon: '🤝', text: 'Team collaboration skills' },
    { icon: '🎤', text: 'Public speaking & presentation confidence' },
    { icon: '🛠️', text: 'Exposure to modern tools and technologies' },
    { icon: '👑', text: 'Leadership and event management experience' }
]

// Differentiators
const differentiators = [
    'Students conduct workshops for students',
    'Real projects are built, not just discussed',
    'Events aligned with SDG 4 & SDG 9 (Quality Education & Innovation)',
    'Industry experts and senior engineers interact directly with members'
]

// Section component for reusability
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

export default function AboutPage() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()

    // Parallax effects
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

    return (
        <div className="about-page" ref={containerRef}>
            <Navbar />

            {/* Background Effects */}
            <div className="about-bg">
                <motion.div className="bg-orb bg-orb-1" style={{ y: y1 }} />
                <motion.div className="bg-orb bg-orb-2" style={{ y: y2 }} />
                <motion.div className="bg-orb bg-orb-3" />
                <div className="bg-grid" />
                <div className="bg-noise" />
            </div>

            {/* Progress Bar */}
            <motion.div
                className="scroll-progress"
                style={{ scaleX: scrollYProgress }}
            />

            {/* ═══════════════════════════════════════════════════════════════════
                HERO SECTION
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="about-hero">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.span
                        className="hero-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <span className="badge-dot" />
                        Kongu Engineering College
                    </motion.span>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        About <span className="gradient-text">MADC Club</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Where Students Become <span className="highlight">Builders</span>, <span className="highlight">Creators</span>, and <span className="highlight">Innovators</span>
                    </motion.p>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        The Mobile Application Development Club (MADC) of Kongu Engineering College is a student-driven technical community dedicated to practical learning, innovation, and collaboration in the fields of mobile app development, web technologies, UI/UX design, and emerging technologies. MADC bridges the gap between classroom knowledge and real-world engineering by creating opportunities for students to learn, build, and lead.
                    </motion.p>

                    <motion.div
                        className="hero-scroll-indicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        style={{ opacity }}
                    >
                        <span>Scroll to explore</span>
                        <div className="scroll-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                ORIGIN & PURPOSE
            ═══════════════════════════════════════════════════════════════════ */}
            <Section id="origin" className="origin-section">
                <div className="section-container">
                    <motion.div className="section-header" variants={fadeInUp}>
                        <span className="section-tag">Our Story</span>
                        <h2 className="section-title">Origin & Purpose</h2>
                    </motion.div>

                    <motion.div className="origin-content" variants={fadeInUp}>
                        <div className="origin-card glass-card">
                            <div className="origin-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="20" stroke="url(#origin-gradient)" strokeWidth="2" />
                                    <path d="M24 14v10l6 6" stroke="url(#origin-gradient)" strokeWidth="2" strokeLinecap="round" />
                                    <defs>
                                        <linearGradient id="origin-gradient" x1="0" y1="0" x2="48" y2="48">
                                            <stop stopColor="#c97d4a" />
                                            <stop offset="1" stopColor="#e09a68" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <p className="origin-text">
                                MADC was formed with a clear mission — to create a platform where students can explore technology beyond academics. The club nurtures curiosity, teamwork, and hands-on development through workshops, hackathons, design sessions, and technical events conducted throughout the academic year.
                            </p>
                            <p className="origin-text">
                                The club operates under the guidance of faculty coordinators and is supported by the institution's leadership, ensuring both academic alignment and practical relevance.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════════
                WHAT MAKES US DIFFERENT
            ═══════════════════════════════════════════════════════════════════ */}
            <Section id="different" className="different-section">
                <div className="section-container">
                    <motion.div className="section-header" variants={fadeInUp}>
                        <span className="section-tag">Why MADC?</span>
                        <h2 className="section-title">What Makes Us <span className="gradient-text">Different</span></h2>
                        <p className="section-subtitle">Unlike typical technical clubs, MADC focuses on <strong>learning by doing</strong>.</p>
                    </motion.div>

                    <motion.div className="differentiators-grid" variants={staggerContainer}>
                        {differentiators.map((item, index) => (
                            <motion.div
                                key={index}
                                className="differentiator-card glass-card"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                <div className="diff-number">0{index + 1}</div>
                                <p className="diff-text">{item}</p>
                                <div className="diff-line" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════════
                ACTIVITIES / EVENTS
            ═══════════════════════════════════════════════════════════════════ */}
            <Section id="activities" className="activities-section">
                <div className="section-container">
                    <motion.div className="section-header" variants={fadeInUp}>
                        <span className="section-tag">Real Impact</span>
                        <h2 className="section-title">Proof Through <span className="gradient-text">Activities</span></h2>
                        <p className="section-subtitle">These are not plans — these are <strong>executed programs</strong>.</p>
                    </motion.div>

                    <motion.div className="activities-timeline" variants={staggerContainer}>
                        {activities.map((activity, index) => (
                            <motion.div
                                key={index}
                                className={`activity-card glass-card ${index % 2 === 0 ? 'left' : 'right'}`}
                                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="activity-icon">{activity.icon}</div>
                                <div className="activity-content">
                                    <h3 className="activity-title">{activity.title}</h3>
                                    <div className="activity-meta">
                                        <span className="activity-date">{activity.date}</span>
                                        {activity.location && <span className="activity-location">{activity.location}</span>}
                                    </div>
                                    {activity.speaker && <p className="activity-speaker">{activity.speaker}</p>}
                                    <p className="activity-description">{activity.description}</p>
                                </div>
                                <div className="activity-glow" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════════
                LEADERSHIP & STRUCTURE
            ═══════════════════════════════════════════════════════════════════ */}
            <Section id="leadership" className="leadership-section">
                <div className="section-container">
                    <motion.div className="section-header" variants={fadeInUp}>
                        <span className="section-tag">Organization</span>
                        <h2 className="section-title">Leadership & <span className="gradient-text">Structure</span></h2>
                        <p className="section-subtitle">A well-defined student leadership ensuring smooth conduct of events.</p>
                    </motion.div>

                    <motion.div className="leadership-grid" variants={staggerContainer}>
                        {leadershipRoles.map((role, index) => (
                            <motion.div
                                key={index}
                                className="leadership-card glass-card"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, y: -8 }}
                            >
                                <div className="leadership-icon">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <circle cx="16" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
                                        <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <h3 className="leadership-role">{role}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════════
                LEARNING PHILOSOPHY
            ═══════════════════════════════════════════════════════════════════ */}
            <Section id="philosophy" className="philosophy-section">
                <div className="section-container">
                    <motion.div className="philosophy-content" variants={fadeInUp}>
                        <div className="philosophy-quote glass-card">
                            <div className="quote-mark">"</div>
                            <blockquote>
                                You don't become an engineer by watching.<br />
                                <span className="gradient-text">You become an engineer by building.</span>
                            </blockquote>
                            <div className="quote-mark end">"</div>
                        </div>

                        <div className="philosophy-actions">
                            <motion.div className="action-item" variants={fadeInUp}>
                                <span className="action-icon">🎯</span>
                                <span>Participate</span>
                            </motion.div>
                            <motion.div className="action-item" variants={fadeInUp}>
                                <span className="action-icon">📋</span>
                                <span>Organize</span>
                            </motion.div>
                            <motion.div className="action-item" variants={fadeInUp}>
                                <span className="action-icon">📚</span>
                                <span>Teach</span>
                            </motion.div>
                            <motion.div className="action-item" variants={fadeInUp}>
                                <span className="action-icon">👑</span>
                                <span>Lead</span>
                            </motion.div>
                            <motion.div className="action-item" variants={fadeInUp}>
                                <span className="action-icon">🚀</span>
                                <span>Build Real Solutions</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════════
                IMPACT ON STUDENTS
            ═══════════════════════════════════════════════════════════════════ */}
            <Section id="impact" className="impact-section">
                <div className="section-container">
                    <motion.div className="section-header" variants={fadeInUp}>
                        <span className="section-tag">Student Growth</span>
                        <h2 className="section-title">Impact on <span className="gradient-text">Students</span></h2>
                    </motion.div>

                    <motion.div className="benefits-grid" variants={staggerContainer}>
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="benefit-card glass-card"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.03, y: -5 }}
                            >
                                <span className="benefit-icon">{benefit.icon}</span>
                                <p className="benefit-text">{benefit.text}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════════
                VISION & MISSION
            ═══════════════════════════════════════════════════════════════════ */}
            <Section id="vision-mission" className="vision-mission-section">
                <div className="section-container">
                    <motion.div className="vm-grid" variants={staggerContainer}>
                        <motion.div className="vm-card vision-card glass-card" variants={fadeInLeft}>
                            <div className="vm-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                                    <path d="M24 4v8M24 36v8M4 24h8M36 24h8" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3 className="vm-title">Vision</h3>
                            <p className="vm-text">
                                To create a culture of innovation where every student is confident in turning ideas into working solutions using technology.
                            </p>
                        </motion.div>

                        <motion.div className="vm-card mission-card glass-card" variants={fadeInRight}>
                            <div className="vm-icon">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M24 4L44 16v16L24 44 4 32V16L24 4z" stroke="currentColor" strokeWidth="2" />
                                    <path d="M24 4v40M4 16l20 12 20-12" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3 className="vm-title">Mission</h3>
                            <p className="vm-text">
                                To provide a collaborative environment where students learn modern development practices through workshops, projects, and events.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </Section>

            {/* ═══════════════════════════════════════════════════════════════════
                CLOSING CTA
            ═══════════════════════════════════════════════════════════════════ */}
            <Section id="cta" className="cta-section">
                <div className="section-container">
                    <motion.div className="cta-content" variants={fadeInUp}>
                        <h2 className="cta-title">
                            MADC is not just a club.
                        </h2>
                        <p className="cta-description">
                            It is a platform where students discover their potential, explore technology deeply, and prepare themselves for the real engineering world.
                        </p>
                        <motion.button
                            className="cta-button"
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(201, 125, 74, 0.5)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Join MADC Club</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
            </Section>

            {/* Footer */}
            <footer className="about-footer">
                <div className="footer-content">
                    <p>&copy; 2026 MADC Club — Kongu Engineering College</p>
                </div>
            </footer>
        </div>
    )
}
