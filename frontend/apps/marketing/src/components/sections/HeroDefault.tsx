'use client'

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
  // Function to apply gradient to specific words
  const renderTitleWithGradient = (titleText: string) => {
    // Check for common words that should have gradient effect
    const gradientWords = ['Innovation', 'Security', 'Automation', 'Platform', 'Solutions', 'Intelligence']

    return titleText.split(' ').map((word, index) => {
      const shouldHaveGradient = gradientWords.some(gradientWord =>
        word.includes(gradientWord) || gradientWord.includes(word)
      )

      if (shouldHaveGradient) {
        return (
          <span key={index}>
            <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              {word}
            </span>
            {' '}
          </span>
        )
      }
      return word + ' '
    })
  }

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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Title - Left Side */}
          <div className="flex-shrink-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white whitespace-nowrap">
              {renderTitleWithGradient(title)}
            </h1>
          </div>

          {/* Description - Right Side */}
          <div className="flex-1 lg:mt-36">
            <p className="text-slate-300 leading-relaxed" style={{ fontSize: '14px' }}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
