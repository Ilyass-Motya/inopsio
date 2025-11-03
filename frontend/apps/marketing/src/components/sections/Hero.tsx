'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// Matrix-style falling binary animation component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const columnsRef = useRef<Array<{ y: number; speed: number; length: number }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Set canvas size
    const setCanvasSize = () => {
      const viewportHeight = window.innerHeight
      const blueSectionHeight = viewportHeight * 0.44
      canvas.width = window.innerWidth
      canvas.height = blueSectionHeight
    }
    setCanvasSize()

    // Binary characters - using 0s and 1s for Matrix effect
    const chars = '01'
    const fontSize = 16
    const columnWidth = 24
    const numColumns = Math.floor(canvas.width / columnWidth)

    // Initialize columns with staggered starting positions
    if (columnsRef.current.length === 0) {
      columnsRef.current = Array.from({ length: numColumns }, () => ({
        y: Math.random() * -canvas.height * 2,
        speed: 1.5 + Math.random() * 2.5,
        length: 15 + Math.floor(Math.random() * 25)
      }))
    }

    // Animation loop
    const animate = () => {
      // Clear with fade effect - creates trailing effect
      ctx.fillStyle = 'rgba(0, 72, 231, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `bold ${fontSize}px 'Courier New', 'Monaco', 'Consolas', monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'

      columnsRef.current.forEach((column, i) => {
        const x = i * columnWidth + (columnWidth / 2)

        // Draw falling characters with Matrix-style fade
        for (let j = 0; j < column.length; j++) {
          const char = chars[Math.floor(Math.random() * chars.length)]
          const y = column.y + (j * fontSize)
          
          if (y > -fontSize && y < canvas.height + fontSize) {
            // Matrix effect: first character is brightest (head), rest fade
            const isHead = j === 0
            let opacity = 1
            
            if (!isHead) {
              // Exponential fade for trailing characters
              const fadePosition = j / column.length
              opacity = Math.max(0.1, 1 - fadePosition * 0.9)
            }
            
            // Color gradient - brighter at top of column
            if (isHead) {
              // Bright white/cyan for leading character
              ctx.fillStyle = '#60a5fa' // Light blue for head
            } else if (j < 3) {
              // Very bright blue for immediate trail
              ctx.fillStyle = `rgba(37, 99, 235, ${opacity})` // blue-600
            } else {
              // Primary color for rest
              ctx.fillStyle = `rgba(0, 72, 231, ${opacity})` // primary-600
            }
            
            ctx.fillText(char, x, y)
          }
        }

        // Update column position
        column.y += column.speed

        // Reset column when it goes completely off screen
        if (column.y > canvas.height + column.length * fontSize) {
          column.y = -column.length * fontSize - Math.random() * 200
          column.speed = 1.5 + Math.random() * 2.5
          column.length = 15 + Math.floor(Math.random() * 25)
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      setCanvasSize()
      const newNumColumns = Math.floor(canvas.width / columnWidth)
      if (newNumColumns !== columnsRef.current.length) {
        columnsRef.current = Array.from({ length: newNumColumns }, (_, i) => {
          if (i < columnsRef.current.length) {
            return columnsRef.current[i]
          }
          return {
            y: Math.random() * -canvas.height,
            speed: 2 + Math.random() * 3,
            length: 10 + Math.floor(Math.random() * 20)
          }
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none z-[5]"
      aria-hidden="true"
      role="presentation"
      style={{
        mixBlendMode: 'screen',
        willChange: 'contents'
      }}
    />
  )
}

// Grid characters overlay component
function GridCharacters() {
  const [characters, setCharacters] = useState<Array<{ x: number; y: number; text: string; id: string }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isUpdating = false
    
    const updateCharacters = () => {
      // Prevent overlapping updates
      if (isUpdating) return
      isUpdating = true
      
      // Wait for container to be ready
      const container = containerRef.current
      if (!container) {
        isUpdating = false
        // Retry after a short delay if container isn't ready
        setTimeout(updateCharacters, 100)
        return
      }
      
      // Generate random characters for grid squares
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const numbers = '0123456789'
      
      const gridSize = 128 // Match the grid size - bigger grids
      const width = container.offsetWidth || window.innerWidth
      const height = container.offsetHeight || window.innerHeight
      
      const cols = Math.ceil(width / gridSize)
      const rows = Math.ceil(height / gridSize)
      
      const chars: Array<{ x: number; y: number; text: string; id: string }> = []
      const usedPositions = new Set<string>() // Track used positions to prevent duplicates
      
      // Generate exactly one character for each grid position
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Create unique ID for each grid position (row-col combination is unique)
          const gridId = `grid-r${row}-c${col}`
          const positionKey = `${row}-${col}`
          
          // Skip if this position already has a character
          if (usedPositions.has(positionKey)) {
            continue
          }
          
          usedPositions.add(positionKey)
          
          // Generate character for this specific grid position
          const letter = letters[Math.floor(Math.random() * letters.length)]
          const number = numbers[Math.floor(Math.random() * numbers.length)]
          
          chars.push({
            x: col * gridSize + 4, // Top-left corner with 4px padding
            y: row * gridSize + 4, // Top-left corner with 4px padding
            text: `${letter}${number}`,
            id: gridId
          })
        }
      }
      
      // Only set if we have valid characters
      if (chars.length > 0) {
        setCharacters(chars)
      }
      
      isUpdating = false
    }

    // Initial update with a small delay to ensure DOM is ready
    const timer = setTimeout(updateCharacters, 50)
    
    // Update on resize with debounce
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateCharacters, 150)
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => {
        clearTimeout(timer)
        clearTimeout(resizeTimer)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {characters.map((char, index) => {
        // Calculate if character is in the top 44vh (blue section)
        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1000
        const blueSectionHeight = viewportHeight * 0.44
        const isInBlueSection = char.y < blueSectionHeight
        
        return (
          <div
            key={`${char.id}-${index}`}
            className={`absolute text-[10px] font-mono font-bold select-none z-[4] ${
              isInBlueSection 
                ? 'text-white/40 dark:text-white/50' // Lighter for blue background
                : 'text-slate-400/40 dark:text-slate-300/40' // Original colors for white/dark
            }`}
            style={{
              left: `${char.x}px`,
              top: `${char.y}px`,
              transform: 'none'
            }}
          >
            {char.text}
          </div>
        )
      })}
    </div>
  )
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const fullText = 'INOPSIO'

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // INOPSIO typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 250) // Slower typing speed
      return () => clearTimeout(timeout)
    }
  }, [typedText])

  // INOPSIO cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500) // Cursor blink speed
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900">
      {/* 44% Primary Color Background from Top with Enhanced Smoke Effect */}
      <div 
        className="absolute top-0 left-0 right-0 z-[2]"
        style={{
          width: '100%',
          height: '44vh',
          background: 'linear-gradient(to bottom, #0048e7 0%, #0048e7 88%, rgba(0, 72, 231, 0.95) 90%, rgba(0, 72, 231, 0.85) 91.5%, rgba(0, 72, 231, 0.7) 93%, rgba(0, 72, 231, 0.55) 94.5%, rgba(0, 72, 231, 0.4) 96%, rgba(0, 72, 231, 0.25) 97.5%, rgba(0, 72, 231, 0.12) 99%, transparent 100%)',
          pointerEvents: 'none',
          // Enhanced fade with mask for smoother transition
          maskImage: 'linear-gradient(to bottom, black 0%, black 88%, rgba(0,0,0,0.95) 90%, rgba(0,0,0,0.85) 91.5%, rgba(0,0,0,0.7) 93%, rgba(0,0,0,0.55) 94.5%, rgba(0,0,0,0.4) 96%, rgba(0,0,0,0.25) 97.5%, rgba(0,0,0,0.12) 99%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 88%, rgba(0,0,0,0.95) 90%, rgba(0,0,0,0.85) 91.5%, rgba(0,0,0,0.7) 93%, rgba(0,0,0,0.55) 94.5%, rgba(0,0,0,0.4) 96%, rgba(0,0,0,0.25) 97.5%, rgba(0,0,0,0.12) 99%, transparent 100%)'
        }}
      >
        {/* Subtle noise texture for organic smoke effect */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            maskImage: 'linear-gradient(to bottom, transparent 88%, rgba(0,0,0,0.3) 95%, rgba(0,0,0,0.6) 98%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 88%, rgba(0,0,0,0.3) 95%, rgba(0,0,0,0.6) 98%, black 100%)'
          }}
        ></div>
        
        {/* Blur layer for soft smoke diffusion */}
        <div 
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '12%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 72, 231, 0.1) 50%, rgba(0, 72, 231, 0.2) 100%)',
            filter: 'blur(20px)',
            transform: 'translateY(50%)',
            pointerEvents: 'none'
          }}
        ></div>
      </div>

      {/* Grid pattern overlay - white grid for blue section (top 44%) */}
      <div 
        className="absolute top-0 left-0 right-0 z-[3]"
        style={{
          height: '44vh',
          backgroundImage: 'linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)',
          backgroundSize: '128px 128px'
        }}
      ></div>
      
      {/* Grid pattern overlay - normal grid for white/dark section (bottom 56%) */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-[3] bg-[linear-gradient(rgba(100,116,139,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,.08)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(148,163,184,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.15)_1px,transparent_1px)]"
        style={{
          top: '44vh',
          backgroundSize: '128px 128px'
        }}
      ></div>

      {/* Matrix-style falling binary animation from blue section */}
      <MatrixRain />

      {/* Grid characters overlay */}
      <GridCharacters />

      {/* Content - 2 Column Layout */}
      <div className="relative z-[10] max-w-[1750px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col items-start text-left">
          {/* INOPSIO Text with Typing Animation - Center Aligned */}
          <div className={`w-full opacity-0 translate-y-8 transition-all duration-700 ease-out mb-6 sm:mb-8 ${isVisible ? 'opacity-100 translate-y-0' : ''}`}>
            <h1
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-black flex items-baseline justify-center tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] lg:tracking-[0.3em] xl:tracking-[0.3em]"
              style={{
                fontFamily: "'Modern Sport', sans-serif"
              }}
            >
              <span
                className="inline-block drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 15%, #e0f2fe 30%, #bae6fd 50%, #7dd3fc 70%, #38bdf8 85%, #0ea5e9 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  backgroundSize: '200% 200%',
                  backgroundPosition: 'center center',
                  animation: 'gradient-shift 5s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 16px rgba(147, 197, 253, 0.3))',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                }}
              >
                {typedText}
              </span>
              <span
                className="-ml-[0.15em] sm:-ml-[0.2em] md:-ml-[0.25em] lg:-ml-[0.3em] xl:-ml-[0.3em] tracking-[0] inline-block drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                style={{
                  opacity: showCursor ? 1 : 0,
                  transition: 'opacity 0.1s',
                  verticalAlign: 'baseline',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 15%, #e0f2fe 30%, #bae6fd 50%, #7dd3fc 70%, #38bdf8 85%, #0ea5e9 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  backgroundSize: '200% 200%',
                  backgroundPosition: 'center center',
                  animation: 'gradient-shift 5s ease-in-out infinite',
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 16px rgba(147, 197, 253, 0.3))',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                }}
              >
                _
              </span>
            </h1>
          </div>

          {/* 2 Column Grid Layout */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Title, Description, CTA Buttons */}
            <div className="flex flex-col items-start text-left space-y-4 sm:space-y-6">
              {/* Main Headline */}
              <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`} style={{ transitionDelay: '200ms' }}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight mb-6 text-balance break-words text-left m-0 p-0">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Unify, Automate, and Secure
                  </span>
                  <br />
                  <span className="text-slate-900 dark:text-white">
                    Your Business Operations
                  </span>
                </h2>
              </div>

              {/* Subheading */}
              <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`} style={{ transitionDelay: '200ms' }}>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 dark:text-gray-200 leading-relaxed mb-6 sm:mb-8 lg:mb-10 font-medium text-left m-0 p-0">
                  Make technology your competitive edge. Inopsio empowers enterprises with intelligent systems.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`} style={{ transitionDelay: '400ms' }}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start justify-start m-0 p-0 w-full sm:w-auto">
                  <Link 
                    href="/demo" 
                    className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                    Request Demo
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 rounded-lg border border-slate-300 dark:border-slate-600 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - AI Head Image */}
            <div className={`relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`} style={{ transitionDelay: '300ms' }}>
              <div className="relative w-full h-full overflow-visible flex items-center justify-center">
                <img
                  src="/images/ai-head.png"
                  alt="AI Technology"
                  className="w-full h-full object-contain object-center max-w-full"
                  style={{
                    display: 'block',
                    margin: 0,
                    padding: 0,
                    lineHeight: 0
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}