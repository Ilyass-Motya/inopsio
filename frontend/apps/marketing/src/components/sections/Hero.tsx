'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BackgroundPaths } from '@/components/ui/shadcn-io/background-paths'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/30">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-90 dark:opacity-90">
        <Image
          src="/images/hero-img22.png"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
          aria-hidden="true"
        />
      </div>

      {/* Animated Background Paths */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 pointer-events-none">
        <BackgroundPaths
          backgroundOnly
          colorClass="text-primary-600 dark:text-primary-400"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            {/* Main Headline */}
            <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance text-white drop-shadow-lg">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Unify, Automate, and Secure</span>
                <br />Your Business Operations
              </h1>
            </div>

            {/* Subheading */}
            <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`} style={{ transitionDelay: '200ms' }}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed mb-6 max-w-2xl drop-shadow-md">
                Make technology your competitive edge. Inopsio empowers enterprises with intelligent systems.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`} style={{ transitionDelay: '400ms' }}>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
                <Link href="/demo" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1">
                  <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4a9 9 0 1118 0 9 9 0 01-18 0z" />
                  </svg>
                  Request Demo
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200 rounded-lg border border-slate-300 shadow-sm hover:shadow-md hover:border-slate-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          {/* Right visual image */}
          <div className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : ''}`} style={{ transitionDelay: '200ms' }}>
            <div className="relative rounded-3xl border border-white/30 bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl overflow-hidden aspect-square max-w-full">
              <Image
                src="/images/hero-img22.png"
                alt="Inopsio Platform Overview"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}