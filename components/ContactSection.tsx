'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './ContactSection.css'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
}

export default function ContactSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

    return (
        <div className="contact-wrapper" id="contact" ref={sectionRef}>
            {/* Background Effects */}
            <div className="contact-bg">
                <div className="contact-orb contact-orb-1" />
                <div className="contact-orb contact-orb-2" />
            </div>

            <motion.div
                className="contact-container"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={staggerContainer}
            >
                {/* Hero */}
                <motion.p className="contact-tagline" variants={fadeInUp}>
                    Have a question or an idea? Let&apos;s connect.
                </motion.p>

                <motion.h2 className="contact-title" variants={fadeInUp}>
                    Get in <span className="gradient-text">Touch</span>
                </motion.h2>

                {/* Two Column Layout */}
                <div className="contact-grid">
                    {/* LEFT COLUMN — Contact Info */}
                    <motion.div className="contact-info-column" variants={fadeInUp}>
                        {/* Address Card */}
                        <div className="info-card">
                            <div className="info-card-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                    <circle cx="12" cy="9" r="2.5" />
                                </svg>
                            </div>
                            <div className="info-card-content">
                                <span className="info-label">Address</span>
                                <p className="info-value">IT Park, Kongu Engineering College</p>
                                <p className="info-value">Perundurai, Erode – 638060</p>
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="info-card">
                            <div className="info-card-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M2 6l10 7 10-7" />
                                </svg>
                            </div>
                            <div className="info-card-content">
                                <span className="info-label">Email</span>
                                <a href="mailto:madc@kongu.edu" className="info-link">madc@kongu.edu</a>
                                <p className="info-note">For collaborations, events & membership</p>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="social-card">
                            <span className="info-label">Follow Us</span>
                            <p className="social-text">Stay connected with our latest events and builds.</p>
                            <div className="social-icons">
                                <a href="https://instagram.com/madc_club" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="2" width="20" height="20" rx="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="2" width="20" height="20" rx="2" />
                                        <path d="M8 11v5M8 8v.01M12 16v-4c0-1.5 1-2 2-2s2 .5 2 2v4" />
                                    </svg>
                                </a>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN — Contact Form */}
                    <motion.div className="contact-form-wrapper" variants={fadeInUp}>
                        <div className="contact-form-card">
                            <h3 className="form-heading">Send a Message</h3>
                            <p className="form-subtext">
                                Have something in mind? Drop us a message and we&apos;ll get back to you shortly.
                            </p>

                            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                                <input type="text" className="form-input" placeholder="Your Name" required />
                                <input type="email" className="form-input" placeholder="Your Email" required />
                                <input type="text" className="form-input" placeholder="Subject" required />
                                <textarea className="form-textarea" placeholder="Message" rows={4} required></textarea>
                                <button type="submit" className="form-submit-btn">
                                    <span>Send Message</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <motion.p className="contact-footer-text" variants={fadeInUp}>
                    MADC is open to <span>builders</span>, <span>collaborators</span>, and <span>new ideas</span>.
                </motion.p>
            </motion.div>
        </div>
    )
}
