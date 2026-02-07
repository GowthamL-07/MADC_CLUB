'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import './GallerySection.css'

// Gallery images - completely different set, mobile/app development themed
const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&q=80', title: 'App Design' },
    { id: 2, src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80', title: 'Mobile First' },
    { id: 3, src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80', title: 'App Interface' },
    { id: 4, src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', title: 'Analytics Dashboard' },
    { id: 5, src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', title: 'Data Insights' },
    { id: 6, src: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80', title: 'Code Editor' },
    { id: 7, src: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&q=80', title: 'Developer Setup' },
    { id: 8, src: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80', title: 'GitHub Workflow' },
    { id: 9, src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80', title: 'React Development' },
    { id: 10, src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&q=80', title: 'UI Prototype' },
    { id: 11, src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80', title: 'Creative Coding' },
    { id: 12, src: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80', title: 'Design System' },
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
