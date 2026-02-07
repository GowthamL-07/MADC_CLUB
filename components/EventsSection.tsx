'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import './EventsSection.css'

// Animation variants
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
}

const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
}

// Icons
const Icons = {
    arrowLeft: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
    ),
    arrowRight: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    ),
    close: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    ),
    calendar: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    ),
    location: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
        </svg>
    ),
    users: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        </svg>
    ),
    check: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
        </svg>
    )
}

// Events Data
const events = [
    {
        id: 'genai-workshop',
        title: 'Gen-AI Workshop',
        subtitle: 'Innovation & Creativity',
        tagline: 'FUTURE OF AI',
        category: 'WORKSHOP',
        teamSize: 'Individual',
        date: '7 Feb 2026',
        time: '9:00 AM - 4:00 PM',
        venue: 'IT Park',
        image: '/events/genai.png',
        description: 'A hands-on session fostering innovation and creativity among students with participation from college leadership. Explore the cutting-edge world of Generative AI and its applications.',
        highlights: [
            'Hands-on with Gen-AI tools',
            'Prompt Engineering basics',
            'Real-world use cases',
            'Interactive Q&A session'
        ],
        listTitle: 'AGENDA',
        listItems: [
            { title: 'Introduction to Gen-AI', desc: 'Basics and evolution' },
            { title: 'Prompt Engineering', desc: 'Mastering inputs' },
            { title: 'Tools & Platforms', desc: 'ChatGPT, Midjourney, etc.' },
            { title: 'Future Trends', desc: 'What comes next' }
        ]
    },
    {
        id: 'madathon',
        title: 'MADATHON 2K25',
        subtitle: '24-Hour Non-Stop Hackathon',
        tagline: '24 HOURS OF NON-STOP BUILDING',
        category: 'HACKATHON',
        teamSize: '2 to 4 Members',
        date: 'Dec 26-27, 2025',
        time: '9:00 AM - 6:00 PM',
        venue: 'IT Park',
        image: '/events/madathon.jpeg',
        description: 'MADATHON is our flagship 24-hour hackathon where students ideate, develop, and present working solutions. Teams go through multiple evaluation rounds across two days, building real projects from scratch with mentorship and guidance.',
        highlights: [
            'Full 24-hour development cycle',
            'Industry mentors available',
            'Networking opportunities',
            'Multiple evaluation rounds',
            'Prizes worth ₹50,000+',
            'Certificate for all participants'
        ],
        listTitle: 'ROUNDS',
        listItems: [
            { title: 'Abstract Submission', desc: 'Submit your project idea' },
            { title: 'Development Phase', desc: 'Build your solution' },
            { title: 'Mid Evaluation', desc: 'Progress check by mentors' },
            { title: 'Final Presentation', desc: 'Demo and Q&A' }
        ]
    },
    {
        id: 'cloud-talk',
        title: 'Cloud Engineering Talk',
        subtitle: 'Low Code Meets Mobility',
        tagline: 'INDUSTRY EXPERT INSIGHTS',
        category: 'GUEST LECTURE',
        teamSize: 'Open to All',
        date: '28 July 2025',
        venue: 'IT Seminar Hall',
        image: '/events/oracle.png',
        speaker: 'Mr. Sankar Madhappan',
        speakerRole: 'Senior Cloud Engineer, Oracle Solutions',
        description: 'The inaugural session of MADC featured an industry guest lecture focusing on how low-code platforms like Oracle VBCS are transforming hybrid mobile app development.',
        highlights: [
            'Industry expert insights from Oracle',
            'Introduction to Low-Code platforms',
            'Hybrid app development concepts',
            'Career guidance in cloud engineering'
        ],
        listTitle: 'KEY TOPICS',
        listItems: [
            { title: 'Oracle VBCS Overview', desc: 'Visual Builder Cloud Service' },
            { title: 'Low-Code Development', desc: 'Building apps faster' },
            { title: 'Hybrid App Architecture', desc: 'Cross-platform solutions' },
            { title: 'Career in Cloud', desc: 'Industry opportunities' }
        ]
    },
    {
        id: 'react-native',
        title: 'React Native Workshop',
        subtitle: 'Introduction to Mobile Development',
        tagline: 'BUILD ONCE. RUN EVERYWHERE.',
        category: 'TECHNICAL WORKSHOP',
        teamSize: 'Individual',
        date: '18 August 2025',
        venue: 'IT Park – CC8',
        image: '/events/reactnative.png',
        speaker: 'Mr. Mukil S',
        speakerRole: 'Final Year IT, KEC',
        description: 'This hands-on workshop introduced students to cross-platform mobile app development using React Native. Participants learned environment setup, project structure, and components.',
        highlights: [
            'Environment setup for React Native',
            'Component-based architecture',
            'Cross-platform app building',
            'Hands-on coding session'
        ],
        listTitle: 'TOPICS COVERED',
        listItems: [
            { title: 'Environment Setup', desc: 'Node.js, Expo, VS Code' },
            { title: 'React Fundamentals', desc: 'Components and props' },
            { title: 'Mobile Development', desc: 'Android & iOS support' },
            { title: 'Project Building', desc: 'Your first mobile app' }
        ]
    },
    {
        id: 'uiux',
        title: 'UI/UX Workshop',
        subtitle: 'Introduction to Design Principles',
        tagline: 'DESIGN BEFORE YOU CODE',
        category: 'DESIGN WORKSHOP',
        teamSize: 'Individual',
        date: '20 September 2025',
        venue: 'IT Park',
        image: '/events/uiux.png',
        speaker: 'Mr. Naveen',
        speakerRole: 'Final Year IT, KEC',
        description: 'This workshop focused on design thinking and user-centered design. Students were introduced to Figma and Adobe XD, learning wireframing, prototyping, and layout principles.',
        highlights: [
            'Figma & Adobe XD introduction',
            'Wireframing and prototyping',
            'Typography & layout design',
            'Accessibility and design trends'
        ],
        listTitle: 'TOPICS COVERED',
        listItems: [
            { title: 'Design Thinking', desc: 'User-centered approach' },
            { title: 'Wireframing', desc: 'Sketching interfaces' },
            { title: 'Figma Basics', desc: 'Industry-standard tool' },
            { title: 'Prototyping', desc: 'Interactive designs' }
        ]
    },
    {
        id: 'jarvis',
        title: 'JARVIS 2K25',
        subtitle: 'Student Technical & Creative Events',
        tagline: 'TECHNOLOGY MEETS CREATIVITY',
        category: 'TECH FEST',
        teamSize: '1 to 3 Members',
        date: '4 October 2025',
        venue: 'Srinivasa Ramanujan Hall',
        image: '/events/jarvis.png',
        organizer: 'Department of CSE, KEC',
        description: 'JARVIS 2K25 was a large-scale student tech fest featuring both technical and creative competitions. Students showcased innovation and design skills across multiple events.',
        highlights: [
            'Technical + Non-Technical competitions',
            'Creativity meets technology',
            'Inter-department participation',
            'Innovation and presentation skills'
        ],
        listTitle: 'EVENTS',
        listItems: [
            { title: 'Paper Presentation', desc: 'Present your research' },
            { title: 'AI Image Prompting', desc: 'Creative AI challenges' },
            { title: 'Web Design Battle', desc: 'Build stunning websites' },
            { title: 'Video Editing', desc: 'Showcase editing skills' },
            { title: 'Melody Drama', desc: 'Creative performance' }
        ]
    }
]

// Event Detail Modal
function EventModal({ event, onClose }: { event: typeof events[0], onClose: () => void }) {
    const [imageError, setImageError] = useState(false)

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [])

    // Prevent background scroll
    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation()
    }

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            onWheel={handleWheel}
        >
            <motion.div
                className="modal-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                onWheel={handleWheel}
            >
                {/* Close Button */}
                <button className="modal-close-btn" onClick={onClose}>
                    {Icons.close}
                </button>

                {/* Modal Layout: Fixed Image + Scrollable Content */}
                <div className="modal-layout">
                    {/* Fixed Image */}
                    <div className="modal-image-fixed">
                        <div className="modal-image-container">
                            {!imageError ? (
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    sizes="220px"
                                    className="modal-img"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="modal-img-placeholder">
                                    <span>{event.title}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="modal-content-scroll">
                        <span className="modal-category">{event.category}</span>
                        <h2 className="modal-title">{event.title}</h2>
                        <p className="modal-subtitle">{event.subtitle}</p>

                        <p className="modal-description">{event.description}</p>

                        {/* Info Cards */}
                        <div className="modal-info-row">
                            <div className="modal-info-card">
                                <span className="info-icon">{Icons.calendar}</span>
                                <div className="info-text">
                                    <span className="info-label">DATE</span>
                                    <span className="info-value">{event.date}</span>
                                </div>
                            </div>
                            <div className="modal-info-card">
                                <span className="info-icon">{Icons.location}</span>
                                <div className="info-text">
                                    <span className="info-label">VENUE</span>
                                    <span className="info-value">{event.venue}</span>
                                </div>
                            </div>
                            <div className="modal-info-card">
                                <span className="info-icon">{Icons.users}</span>
                                <div className="info-text">
                                    <span className="info-label">PARTICIPATION</span>
                                    <span className="info-value">{event.teamSize}</span>
                                </div>
                            </div>
                        </div>

                        {/* Highlights */}
                        <div className="modal-section">
                            <span className="section-label">HIGHLIGHTS</span>
                            <div className="highlights-list">
                                {event.highlights.map((item, i) => (
                                    <div key={i} className="highlight-item">
                                        <span className="highlight-check">{Icons.check}</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Topics/Events */}
                        <div className="modal-section">
                            <div className="section-header">
                                <span className="section-label">{event.listTitle}</span>
                                <span className="section-count">{event.listItems.length} Items</span>
                            </div>
                            <div className="topics-list">
                                {event.listItems.map((item, i) => (
                                    <div key={i} className="topic-item">
                                        <span className="topic-num">{i + 1}</span>
                                        <div className="topic-content">
                                            <span className="topic-title">{item.title}</span>
                                            <span className="topic-desc">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function EventsSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
    const [imageError, setImageError] = useState<Record<string, boolean>>({})
    const [isPaused, setIsPaused] = useState(false)
    const [progress, setProgress] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const progressRef = useRef(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const currentEvent = events[currentIndex]
    const AUTO_PLAY_INTERVAL = 5000 // 5 seconds

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length)
        setProgress(0)
        progressRef.current = 0
    }, [])

    const prevEvent = () => {
        setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
        setProgress(0)
        progressRef.current = 0
    }

    const nextEvent = () => {
        setCurrentIndex((prev) => (prev + 1) % events.length)
        setProgress(0)
        progressRef.current = 0
    }

    // Auto-play functionality
    useEffect(() => {
        if (isPaused || selectedEvent) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            return
        }

        intervalRef.current = setInterval(() => {
            progressRef.current += 1
            setProgress(progressRef.current)

            if (progressRef.current >= 100) {
                progressRef.current = 0
                setProgress(0)
                setCurrentIndex((prev) => (prev + 1) % events.length)
            }
        }, AUTO_PLAY_INTERVAL / 100)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isPaused, selectedEvent])

    // Reset progress when slide changes manually
    const handleDotClick = (index: number) => {
        setCurrentIndex(index)
        setProgress(0)
        progressRef.current = 0
    }

    return (
        <section
            className="events-section"
            id="events"
            ref={ref}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background */}
            <div className="events-bg">
                <div className="events-orb events-orb-1" />
                <div className="events-orb events-orb-2" />
                <div className="events-grid-bg" />
            </div>

            <motion.div
                className="events-container"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            >
                {/* Header */}
                <motion.div className="events-header" variants={fadeIn}>
                    <span className="event-type-tag">{currentEvent.category}</span>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentEvent.id + '-header'}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="header-text"
                        >
                            <h2 className="event-main-title">{currentEvent.title}</h2>
                            <p className="event-main-tagline">{currentEvent.tagline}</p>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Main Content Grid */}
                <div className="events-grid">
                    {/* Left Sidebar */}
                    <motion.div className="sidebar-left" variants={slideInLeft}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentEvent.id + '-left'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="sidebar-cards"
                            >
                                <div className="sidebar-card">
                                    <span className="card-label">PARTICIPATION</span>
                                    <span className="card-value">{currentEvent.teamSize}</span>
                                </div>
                                <div className="sidebar-card">
                                    <span className="card-label">DATE</span>
                                    <span className="card-value-lg">{currentEvent.date}</span>
                                </div>
                                <div className="sidebar-card">
                                    <span className="card-label">VENUE</span>
                                    <span className="card-value">{currentEvent.venue}</span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Center - Image */}
                    <motion.div className="center-area" variants={scaleIn}>
                        <button className="nav-arrow nav-prev" onClick={prevEvent}>
                            {Icons.arrowLeft}
                        </button>

                        <div className="poster-wrapper">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentEvent.id}
                                    className="poster-container"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {!imageError[currentEvent.id] ? (
                                        <Image
                                            src={currentEvent.image}
                                            alt={currentEvent.title}
                                            fill
                                            sizes="320px"
                                            className="poster-img"
                                            onError={() => setImageError(prev => ({ ...prev, [currentEvent.id]: true }))}
                                        />
                                    ) : (
                                        <div className="poster-fallback">
                                            <span>{currentEvent.title}</span>
                                        </div>
                                    )}
                                    <div className="poster-border" />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <button className="nav-arrow nav-next" onClick={nextEvent}>
                            {Icons.arrowRight}
                        </button>
                    </motion.div>

                    {/* Right Sidebar */}
                    <motion.div className="sidebar-right" variants={slideInRight}>
                        <div className="list-header">
                            <span className="list-label">{currentEvent.listTitle}</span>
                            <span className="list-count">{currentEvent.listItems.length} Items</span>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentEvent.id + '-right'}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="list-items"
                            >
                                {currentEvent.listItems.slice(0, 4).map((item, i) => (
                                    <div key={i} className="list-item">
                                        <span className="item-num">{i + 1}</span>
                                        <div className="item-text">
                                            <span className="item-title">{item.title}</span>
                                            <span className="item-desc">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                        <motion.button
                            className="learn-more-btn"
                            onClick={() => setSelectedEvent(currentEvent)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>LEARN MORE</span>
                            {Icons.arrowRight}
                        </motion.button>
                    </motion.div>
                </div>

                {/* Counter with Progress */}
                <motion.div className="events-counter" variants={fadeIn}>
                    <div className="counter-info">
                        <span className="counter-label">EVENT {currentIndex + 1} OF {events.length}</span>
                        <span className="scroll-hint">
                            SCROLL TO EXPLORE
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                        </span>
                    </div>
                    <div className="counter-dots">
                        {events.map((_, i) => (
                            <button
                                key={i}
                                className={`dot ${i === currentIndex ? 'active' : ''}`}
                                onClick={() => handleDotClick(i)}
                            >
                                {i === currentIndex && (
                                    <span
                                        className="dot-progress"
                                        style={{ width: `${progress}%` }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                )}
            </AnimatePresence>
        </section>
    )
}
