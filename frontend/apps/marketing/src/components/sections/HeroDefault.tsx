'use client'

import { useMemo } from 'react'

interface HeroDefaultProps {
  title: string
  description: string
  backgroundImage?: string
}

export default function HeroDefault({
  title,
  description,
  backgroundImage = '/images/main-hero-bg.svg'
}: HeroDefaultProps) {
  // Function to apply gradient to specific words - memoized for hydration consistency
  const renderedTitle = useMemo(() => {
    // Check for common words that should have gradient effect
    const gradientWords = ['Innovation', 'Security', 'Automation', 'Platform', 'Solutions', 'Intelligence']

    return title.split(' ').map((word, index) => {
      const shouldHaveGradient = gradientWords.some(gradientWord =>
        word.includes(gradientWord) || gradientWord.includes(word)
      )

      if (shouldHaveGradient) {
        return (
          <span key={`${word}-${index}`}>
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              {word}
            </span>
            {' '}
          </span>
        )
      }
      return (
        <span key={`${word}-${index}`}>
          {word}{' '}
        </span>
      )
    })
  }, [title])

  return (
    <section
      className="relative pt-60 pb-20 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center gap-5">
          {/* Title - Centered */}
          <div>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
              suppressHydrationWarning
            >
              {renderedTitle}
            </h1>
          </div>

          {/* Description - Centered */}
          <div>
            <p className="text-slate-300 leading-relaxed" style={{ fontSize: '14px' }}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
