'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import './TeamSection.css'

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
}

// Faculty Leadership Data
const facultyLeadership = [
    { name: 'Thiru. E.R.K. Krishnan', role: 'Chief Patron', designation: 'M.Com — Correspondent', image: 'https://i.pravatar.cc/300?img=68' },
    { name: 'Dr. R. Parameshwaran', role: 'Patron', designation: 'M.E., Ph.D — Principal', image: 'https://i.pravatar.cc/300?img=60' },
    { name: 'Dr. S. Anandamurugan', role: 'President', designation: 'M.E., Ph.D — HOD / IT', image: '/team/anandamurugan.jpg' },
]

const staffCoordinators = [
    { name: 'Mr. A. P. Ponselvakumar', role: 'Staff Coordinator', designation: 'Assistant Professor (SLG)', image: '/team/ponselvakumar.jpg' },
    { name: 'Mrs. P. Vanitha', role: 'Staff Coordinator', designation: 'Assistant Professor, IT', image: 'https://i.pravatar.cc/300?img=47' },
]

// Office Bearers Data
const officeBearers = [
    { name: 'Ms. M. Madhuvarshini', role: 'Secretary', designation: 'IV CSE (22CSR111)', image: 'https://i.pravatar.cc/300?img=45' },
    { name: 'Mr. S. Mukil', role: 'Joint Secretary', designation: 'IV IT (22ITR064)', image: 'https://i.pravatar.cc/300?img=12' },
    { name: 'Mr. N. Harish Kannan', role: 'Joint Secretary', designation: 'III CSE (23CSR077)', image: 'https://i.pravatar.cc/300?img=11' },
]

// Profile Card Component
function ProfileCard({ member }: { member: any }) {
    const [imgError, setImgError] = useState(false)

    return (
        <motion.div className="profile-card" variants={scaleIn} whileHover={{ scale: 1.02 }}>
            {/* Corner Accents */}
            <div className="card-corner top-left" />
            <div className="card-corner top-right" />
            <div className="card-corner bottom-left" />
            <div className="card-corner bottom-right" />

            {/* Circular Photo */}
            <div className="profile-photo-wrapper">
                <div className="profile-photo">
                    {!imgError ? (
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="140px"
                            className="profile-img"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="profile-img-placeholder">{member.name.charAt(0)}</div>
                    )}
                </div>
                <div className="profile-ring" />
            </div>

            {/* Info */}
            <h4 className="profile-name">{member.name.toUpperCase()}</h4>
            <span className="profile-role">{member.role}</span>
            {member.designation && <span className="profile-designation">{member.designation}</span>}
        </motion.div>
    )
}

export default function TeamSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <div className="team-wrapper" id="team">
            {/* Background - Same as About Section */}
            <div className="team-bg">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="grid-overlay" />
            </div>

            <section className="team-section" ref={ref}>
                <motion.div
                    className="section-container"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                >
                    {/* Main Section Header */}
                    <motion.div className="section-header-main" variants={fadeInUp}>
                        <span className="section-label">
                            <span className="label-dot" />
                            The People Behind MADC
                        </span>
                        <h2 className="section-title-main">
                            Meet Our <span className="gradient-text">Team</span>
                        </h2>
                        <p className="section-description">
                            The dedicated minds driving innovation, organizing events, and building a community of passionate developers and designers.
                        </p>
                    </motion.div>

                    {/* Faculty Leadership */}
                    <motion.div className="team-block" variants={staggerContainer}>
                        <motion.div className="block-header" variants={fadeInUp}>
                            <h3 className="block-title">Faculty Leadership</h3>
                        </motion.div>

                        <motion.div className="profile-grid" variants={staggerContainer}>
                            {facultyLeadership.map((member, i) => (
                                <ProfileCard key={i} member={member} />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Staff Coordinators */}
                    <motion.div className="team-block coordinators" variants={staggerContainer}>
                        <motion.div className="block-header small" variants={fadeInUp}>
                            <h4 className="block-subtitle">Staff Coordinators</h4>
                        </motion.div>

                        <motion.div className="profile-grid two-col" variants={staggerContainer}>
                            {staffCoordinators.map((member, i) => (
                                <ProfileCard key={i} member={member} />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Divider */}
                    <div className="section-divider" />

                    {/* Office Bearers */}
                    <motion.div className="team-block" variants={staggerContainer}>
                        <motion.div className="block-header" variants={fadeInUp}>
                            <h3 className="block-title">Office Bearers</h3>
                            <span className="block-year">2025–2026</span>
                        </motion.div>

                        <motion.div className="profile-grid" variants={staggerContainer}>
                            {officeBearers.map((member, i) => (
                                <ProfileCard key={i} member={member} />
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    )
}
