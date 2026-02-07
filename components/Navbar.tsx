'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

// Define navigation items with appropriate routing
const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About', href: '/#about' },
    { id: 'events', label: 'Events', href: '/#events' },
    { id: 'team', label: 'Team', href: '/#team' },
    { id: 'gallery', label: 'Gallery', href: '/#gallery' },
    { id: 'contact', label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const pathname = usePathname()

    // Scroll detection for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Scroll-based active section detection
    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = ['about', 'events', 'team', 'gallery', 'contact']
            const scrollPosition = window.scrollY + 200 // Offset for navbar height

            // Check if we're at the very top (home)
            if (scrollPosition < 500) {
                setActiveSection('home')
                return
            }

            // Find which section is currently in view
            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId)
                        return
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScrollSpy)
        handleScrollSpy() // Run once on mount
        return () => window.removeEventListener('scroll', handleScrollSpy)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuOpen && !(event.target as Element).closest('.navbar')) {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [mobileMenuOpen])

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileMenuOpen(false)
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [])

    // Check if a nav item is active based on scroll position
    const isActive = (item: typeof navItems[0]) => {
        return item.id === activeSection
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-wrapper">
                <div className="navbar-content">
                    {/* Logo */}
                    <div className="navbar-brand">
                        <Link href="/">
                            <motion.div
                                className="logo-wrapper"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <img
                                    src="/madc-logo.png"
                                    alt="MADC Logo"
                                    className="logo-image"
                                />
                            </motion.div>
                        </Link>
                    </div>

                    {/* Desktop Navigation Menu */}
                    <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
                        {navItems.map((item, index) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`nav-link ${isActive(item) ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <motion.span
                                    className="nav-text"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {item.label}
                                </motion.span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            setMobileMenuOpen(!mobileMenuOpen)
                        }}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </nav>
    )
}
