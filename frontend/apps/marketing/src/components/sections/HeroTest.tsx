'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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
          className="absolute text-[10px] text-blue-400/30 font-mono font-bold select-none"
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

// AI Head image component
function AIHeadImage() {
  return (
    <div className="absolute right-0 overflow-visible" style={{ bottom: '0px', height: '100vh', width: '65%' }}>
      {/* AI Head Image */}
      <div className="absolute right-0 w-full h-full" style={{ bottom: '0px', margin: 0, padding: 0, lineHeight: 0 }}>
        <Image
          src="/images/ai-head.png"
          alt="AI Technology"
          width={1200}
          height={1200}
          priority
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            margin: 0,
            padding: 0,
            lineHeight: 0,
            transform: 'none',
            transformOrigin: 'bottom right',
            objectFit: 'cover',
            objectPosition: 'bottom right',
            verticalAlign: 'bottom'
          }}
        />
        {/* Orange line at image's visual bottom edge */}
        <div
          className="absolute left-0 right-0 h-1 bg-orange-500 z-40"
          style={{
            bottom: '0px',
            margin: 0,
            padding: 0,
            width: '100%'
          }}
        ></div>
      </div>
    </div>
  )
}

export default function HeroTest() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [typedSubtitle, setTypedSubtitle] = useState('')
  const [showSubtitleCursor, setShowSubtitleCursor] = useState(false)
  const fullText = 'INOPSIO'
  const fullSubtitle = 'Unify, Automate, and Secure Your Enterprise'

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // INOPSIO typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 150) // Typing speed
      return () => clearTimeout(timeout)
    } else {
      // Start subtitle typing after INOPSIO is complete
      setShowSubtitleCursor(true)
    }
  }, [typedText])

  // Subtitle typing effect
  useEffect(() => {
    if (typedText.length >= fullText.length && typedSubtitle.length < fullSubtitle.length) {
      const timeout = setTimeout(() => {
        setTypedSubtitle(fullSubtitle.slice(0, typedSubtitle.length + 1))
      }, 50) // Faster typing speed for subtitle
      return () => clearTimeout(timeout)
    }
  }, [typedSubtitle, typedText])

  // INOPSIO cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500) // Cursor blink speed
    return () => clearInterval(cursorInterval)
  }, [])

  // Subtitle cursor blink
  useEffect(() => {
    if (showSubtitleCursor) {
      const cursorInterval = setInterval(() => {
        setShowSubtitleCursor(prev => typeof prev === 'boolean' ? !prev : prev)
      }, 500)
      return () => clearInterval(cursorInterval)
    }
  }, [showSubtitleCursor])

  return (
    <>
      {/* 44% Primary Color Background from Top with Smoke Effect */}
      <div 
        className="fixed inset-0 top-0 z-0"
        style={{
          width: '100%',
          height: '44%',
          top: 0,
          background: 'linear-gradient(to bottom, #0048e7 0%, #0048e7 91%, rgba(0, 72, 231, 0.8) 94%, rgba(0, 72, 231, 0.5) 96%, rgba(0, 72, 231, 0.2) 98%, transparent 100%)'
        }}
      ></div>

      {/* Hero Container with Border - Matches Header Pill */}
      <div className="fixed inset-0 top-4 z-0">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-full">
          <div 
            className="relative h-full rounded-lg backdrop-blur-xl bg-slate-900/40 border border-white/20 dark:border-white/10 shadow-2xl"
            style={{ 
              overflow: 'visible',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)'
            }}
          >

        {/* BOTTOM LINE TO SEE THE BOUNDARY */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 z-50" style={{ margin: 0, padding: 0 }}></div>
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.15)_1px,transparent_1px)] bg-[size:128px_128px]"></div>

        {/* Grid characters overlay */}
        <GridCharacters />

        {/* AI Head Image - Outside of layout */}
        <AIHeadImage />

        {/* Main content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
          <div className="w-full py-20">

            {/* Left side - Content */}
            <div className={`max-w-3xl space-y-8 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>

              {/* Main headline */}
              <div className="space-y-4">
                {/* INOPSIO Text */}
                <h1
                  className="text-8xl sm:text-9xl lg:text-[12rem] font-black mb-8 text-white flex items-baseline"
                  style={{
                    fontFamily: "'Modern Sport', sans-serif",
                    letterSpacing: '0.3em'
                  }}
                >
                  <span>{typedText}</span>
                  <span
                    style={{
                      opacity: showCursor ? 1 : 0,
                      transition: 'opacity 0.1s',
                      marginLeft: '0.1em',
                      display: 'inline-block',
                      verticalAlign: 'baseline'
                    }}
                  >
                    _
                  </span>
                </h1>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/50 rounded-full backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-blue-400">
                    Next-Gen Enterprise Security Platform
                  </span>
                </div>

                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight flex items-baseline">
                  <span className="text-white">
                    {typedSubtitle}
                  </span>
                  {typedSubtitle.length > 0 && typedSubtitle.length < fullSubtitle.length && (
                    <span
                      style={{
                        opacity: showSubtitleCursor ? 1 : 0,
                        transition: 'opacity 0.1s',
                        marginLeft: '0.1em',
                        display: 'inline-block',
                        verticalAlign: 'baseline'
                      }}
                    >
                      _
                    </span>
                  )}
                </h2>

                <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                  Make technology your competitive edge. Inopsio empowers enterprises with intelligent security systems, real-time threat detection, and seamless integrations.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 rounded-xl shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Watch Demo
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 rounded-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Sales
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-300 font-medium">SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-300 font-medium">ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-300 font-medium">GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>


      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 20s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  )
}
