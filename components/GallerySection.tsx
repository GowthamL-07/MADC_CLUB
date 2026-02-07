'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './GallerySection.css'

// Gallery images - completely different set, mobile/app development themed
const galleryImages = [
    { id: 1, src: '/gallery/image1.jpeg', title: 'MADC Event' },
    { id: 2, src: '/gallery/image2.jpeg', title: 'Workshop' },
    { id: 3, src: '/gallery/image3.jpeg', title: 'Team Work' },
    { id: 4, src: '/gallery/image4.jpeg', title: 'Innovation' },
    { id: 5, src: '/gallery/image5.jpeg', title: 'Hackathon' },
    { id: 6, src: '/gallery/image6.jpeg', title: 'Coding' },
    { id: 7, src: '/gallery/image7.png', title: 'Design' },
    { id: 8, src: '/gallery/image8.jpeg', title: 'Development' },
    { id: 9, src: '/gallery/image9.png', title: 'Collaboration' },
    { id: 10, src: '/gallery/image10.png', title: 'Projects' },
    { id: 11, src: '/gallery/image11.png', title: 'Success' },
]

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
}

const photoVariant = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
}

// Floating Photo Component with parallax
function FloatingPhoto({ image, index, scrollYProgress }: {
    image: typeof galleryImages[0],
    index: number,
    scrollYProgress: any
}) {
    // Different parallax amounts for each photo
    const parallaxAmount = (index % 3 === 0) ? 80 : (index % 3 === 1) ? -60 : 40
    const y = useTransform(scrollYProgress, [0, 1], [0, parallaxAmount])

    // Size variations
    const sizeClass = index % 4 === 0 ? 'photo-large' : index % 4 === 2 ? 'photo-small' : 'photo-medium'

    // Slight rotation variations
    const rotations = [-3, 2, -2, 3, -1, 2, -3, 1, 2, -2, 1, -1]
    const rotation = rotations[index % rotations.length]

    return (
        <motion.div
            className={`floating-photo ${sizeClass}`}
            style={{ y, rotate: rotation }}
            variants={photoVariant}
            whileHover={{
                scale: 1.08,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.3 }
            }}
        >
            <div className="photo-frame">
                <div className="photo-image">
                    <img
                        src={image.src}
                        alt={image.title}
                        loading="lazy"
                    />
                </div>
                <div className="photo-shine" />
                <div className="photo-overlay">
                    <span className="photo-title">{image.title}</span>
                </div>
            </div>
        </motion.div>
    )
}

export default function GallerySection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef(null)
    const gridRef = useRef(null)

    const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })
    const isGridInView = useInView(gridRef, { once: true, margin: "-50px" })

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    })

    return (
        <section className="gallery-section" id="gallery" ref={sectionRef}>
            {/* Background Elements */}
            <div className="gallery-bg">
                <div className="gallery-orb gallery-orb-1" />
                <div className="gallery-orb gallery-orb-2" />
                <div className="gallery-noise" />
            </div>

            {/* Section Header */}
            <motion.div
                ref={headerRef}
                className="gallery-header"
                initial="hidden"
                animate={isHeaderInView ? "visible" : "hidden"}
                variants={fadeInUp}
            >
                <span className="gallery-label">
                    <span className="label-dot" />
                    Our Memories
                </span>
                <h2 className="gallery-title">
                    Photo <span className="text-gradient">Gallery</span>
                </h2>
                <p className="gallery-subtitle">
                    Capturing moments from our events, workshops, and activities
                </p>
            </motion.div>

            {/* Floating Photo Wall */}
            <motion.div
                ref={gridRef}
                className="photo-wall"
                initial="hidden"
                animate={isGridInView ? "visible" : "hidden"}
                variants={staggerContainer}
            >
                {galleryImages.map((image, index) => (
                    <FloatingPhoto
                        key={image.id}
                        image={image}
                        index={index}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </motion.div>

            {/* Decorative Elements */}
            <div className="gallery-decor">
                <div className="decor-line decor-line-1" />
                <div className="decor-line decor-line-2" />
            </div>
        </section>
    )
}
