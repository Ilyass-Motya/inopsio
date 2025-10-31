'use client'

import { useState, useEffect } from 'react'

export default function HeroTest() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Monitor dark mode changes if needed in the future
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#222222]">
      {/* Figma SVG Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 688"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Blur filter for first circle */}
            <filter id="filter0_f_88_1075" x="-310.518" y="-246.518" width="1253.09" height="1253.09" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_88_1075"/>
            </filter>

            {/* Blur filter for second circle */}
            <filter id="filter1_f_88_1075" x="853.805" y="-360.195" width="893.201" height="893.201" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="90" result="effect1_foregroundBlur_88_1075"/>
            </filter>

            {/* Radial gradient 1 - Blue to Teal */}
            <radialGradient id="paint0_radial_88_1075" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-107.455 361.282) rotate(-2.26679) scale(842.86)">
              <stop stopColor="#2563EB"/>
              <stop offset="1" stopColor="#34897B"/>
            </radialGradient>

            {/* Radial gradient 2 - Blue to Teal */}
            <radialGradient id="paint1_radial_88_1075" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1035.72 74.688) rotate(-2.26679) scale(526.805)">
              <stop stopColor="#2563EB"/>
              <stop offset="1" stopColor="#34897B"/>
            </radialGradient>
          </defs>

          {/* Background base - Dark gray */}
          <rect width="100%" height="100%" fill="#222222"/>

          {/* Large circle - Left side with animation */}
          <g opacity="0.3" filter="url(#filter0_f_88_1075)">
            <circle
              cx="316.029"
              cy="380.029"
              r="426.5"
              transform="rotate(56.5118 316.029 380.029)"
              fill="url(#paint0_radial_88_1075)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; -25,20; 0,0"
                dur="20s"
                repeatCount="indefinite"
                additive="sum"
              />
            </circle>
          </g>

          {/* Smaller circle - Top right with animation */}
          <g opacity="0.48" filter="url(#filter1_f_88_1075)">
            <circle
              cx="1300.41"
              cy="86.405"
              r="266.571"
              transform="rotate(56.5118 1300.41 86.405)"
              fill="url(#paint1_radial_88_1075)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; 20,-15; 0,0"
                dur="15s"
                repeatCount="indefinite"
                additive="sum"
              />
            </circle>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              Beautiful <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Mesh Gradients</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Fluid, organic backgrounds with smooth color transitions and flowing animations
            </p>
          </div>
        </div>
      </div>

      {/* Demo Content Toggle (like in reference image) */}
      <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
        <span className="text-sm text-slate-400 font-medium">Demo Content</span>
        <button className="w-12 h-6 bg-slate-700/50 rounded-full relative backdrop-blur-sm border border-slate-600/50 transition-all hover:bg-slate-600/50">
          <div className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow-lg"></div>
        </button>
      </div>
    </section>
  )
}
