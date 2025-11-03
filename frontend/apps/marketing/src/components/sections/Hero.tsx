'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

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
      {characters.map((char, index) => (
        <div
          key={`${char.id}-${index}`}
          className="absolute text-[10px] text-slate-400/40 font-mono font-bold select-none"
          style={{
            left: `${char.x}px`,
            top: `${char.y}px`,
            transform: 'none' // No transform needed for top-left positioning
          }}
        >
          {char.text}
        </div>
      ))}
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,.08)_1px,transparent_1px)] bg-[size:128px_128px]"></div>

      {/* Grid characters overlay */}
      <GridCharacters />

      {/* Content - Centered */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col items-center text-center">
          {/* INOPSIO Text with Typing Animation */}
          <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out mb-6 sm:mb-8 ${isVisible ? 'opacity-100 translate-y-0' : ''}`}>
            <h1
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-black flex items-baseline justify-center tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] lg:tracking-[0.3em] xl:tracking-[0.3em]"
              style={{
                fontFamily: "'Modern Sport', sans-serif"
              }}
            >
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #030208 0%, #1e1b4b 20%, #1e40af 40%, #2563eb 60%, #3b82f6 80%, #030208 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  backgroundSize: '300% 300%',
                  backgroundPosition: 'center center',
                  animation: 'gradient-shift 5s ease-in-out infinite'
                }}
              >
                {typedText}
              </span>
              <span
                className="-ml-[0.15em] sm:-ml-[0.2em] md:-ml-[0.25em] lg:-ml-[0.3em] xl:-ml-[0.3em] tracking-[0] inline-block"
                style={{
                  opacity: showCursor ? 1 : 0,
                  transition: 'opacity 0.1s',
                  verticalAlign: 'baseline',
                  background: 'linear-gradient(135deg, #030208 0%, #1e1b4b 20%, #1e40af 40%, #2563eb 60%, #3b82f6 80%, #030208 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  backgroundSize: '300% 300%',
                  backgroundPosition: 'center center',
                  animation: 'gradient-shift 5s ease-in-out infinite'
                }}
              >
                _
              </span>
            </h1>
          </div>

          {/* Main Headline */}
          <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`} style={{ transitionDelay: '200ms' }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight mb-6 text-balance break-words">
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
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-700 dark:text-gray-200 leading-relaxed mb-10 max-w-3xl font-medium">
              Make technology your competitive edge. Inopsio empowers enterprises with intelligent systems.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link 
                href="/demo" 
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
              >
                <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
                Request Demo
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 rounded-lg border border-slate-300 dark:border-slate-600 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}