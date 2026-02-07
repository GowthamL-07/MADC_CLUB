'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion'

const TOTAL_FRAMES = 273
const IMAGE_PATH = '/animated%20iphone/ezgif-frame-'

interface ScrollSequenceProps {
    onLoadComplete?: () => void
    scrollYProgress: any // Passed from parent
}

export default function ScrollSequence({ onLoadComplete, scrollYProgress }: ScrollSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imagesRef = useRef<HTMLImageElement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [loadProgress, setLoadProgress] = useState(0)
    const currentFrameRef = useRef(0)
    const rafRef = useRef<number>()
    const [showLoader, setShowLoader] = useState(true)
    const [canvasReady, setCanvasReady] = useState(false)

    // Map scroll progress to frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1])

    // Draw frame to canvas
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: false })
        const img = imagesRef.current[index]

        if (!ctx || !img || !img.complete || img.naturalWidth === 0) return

        const viewportWidth = window.innerWidth
        const navbarHeight = 80
        const viewportHeight = window.innerHeight - navbarHeight

        if (canvas.width !== viewportWidth || canvas.height !== viewportHeight) {
            canvas.width = viewportWidth
            canvas.height = viewportHeight
        }

        const imgAspect = img.naturalWidth / img.naturalHeight
        const viewportAspect = viewportWidth / viewportHeight

        let drawWidth, drawHeight, drawX, drawY

        // Cover the viewport
        if (imgAspect > viewportAspect) {
            drawHeight = viewportHeight
            drawWidth = viewportHeight * imgAspect
            drawX = (viewportWidth - drawWidth) / 2
            drawY = 0
        } else {
            drawWidth = viewportWidth
            drawHeight = viewportWidth / imgAspect
            drawX = 0
            drawY = (viewportHeight - drawHeight) / 2
        }

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.fillStyle = '#0a0a0a'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight)
    }, [])

    // Preload all images
    useEffect(() => {
        let loadedCount = 0
        let isMounted = true

        const loadImage = (index: number): Promise<HTMLImageElement> => {
            return new Promise((resolve) => {
                const img = new Image()
                const frameNum = String(index + 1).padStart(3, '0')
                img.src = `${IMAGE_PATH}${frameNum}.jpg`

                img.onload = () => {
                    if (isMounted) {
                        loadedCount++
                        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))
                    }
                    resolve(img)
                }

                img.onerror = () => {
                    if (isMounted) {
                        loadedCount++
                        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))
                    }
                    resolve(img)
                }
            })
        }

        const loadAllImages = async () => {
            const loadPromises = Array.from({ length: TOTAL_FRAMES }, (_, i) => loadImage(i))
            const allImages = await Promise.all(loadPromises)

            if (!isMounted) return

            imagesRef.current = allImages
            setCanvasReady(true)

            setTimeout(() => {
                if (isMounted) {
                    setIsLoading(false)
                    setShowLoader(false)
                    onLoadComplete?.()
                    drawFrame(0)
                }
            }, 300)
        }

        loadAllImages()
        return () => { isMounted = false }
    }, [onLoadComplete, drawFrame])

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasReady) drawFrame(currentFrameRef.current)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [canvasReady, drawFrame])

    // Subscribe to scroll
    useEffect(() => {
        if (isLoading || !canvasReady) return

        const unsubscribe = frameIndex.on('change', (latest) => {
            const index = Math.min(Math.max(Math.round(latest), 0), TOTAL_FRAMES - 1)
            if (index !== currentFrameRef.current) {
                currentFrameRef.current = index
                if (rafRef.current) cancelAnimationFrame(rafRef.current)
                rafRef.current = requestAnimationFrame(() => drawFrame(index))
            }
        })

        drawFrame(0)

        return () => {
            unsubscribe()
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [isLoading, canvasReady, frameIndex, drawFrame])

    return (
        <>
            {/* Loading Screen */}
            <AnimatePresence>
                {showLoader && (
                    <motion.div
                        className="loader-container"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="loader-inner">
                            <div className="loader-ring">
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" className="loader-track" />
                                    <motion.circle
                                        cx="50" cy="50" r="45"
                                        className="loader-progress-ring"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: loadProgress / 100 }}
                                    />
                                </svg>
                                <div className="loader-percentage">{loadProgress}%</div>
                            </div>
                            <p className="loader-text">Loading Experience</p>
                            <p className="loader-subtext">Preparing immersive visuals...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Canvas Background */}
            <div className="canvas-fixed">
                <canvas ref={canvasRef} className="sequence-canvas" />
            </div>
        </>
    )
}
