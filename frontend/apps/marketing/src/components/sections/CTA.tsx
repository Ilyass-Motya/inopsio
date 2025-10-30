'use client'

import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          className="relative rounded-xl shadow-lg overflow-hidden py-16 sm:py-20"
          style={{
            backgroundImage: 'url(/images/cta-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="relative z-10 px-6 sm:px-8">
        <div className="text-center max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight sm:leading-tight md:leading-normal">
            Managed Security Meets Intelligent Operations
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-blue-100 leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto font-medium drop-shadow-md px-4">
            Inopsio combines proactive cybersecurity, infrastructure management, and automation to keep your organization secure, visible, and always operational.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link 
              href="/demo" 
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-2xl hover:shadow-3xl hover:scale-105 text-sm sm:text-base"
            >
              Request a Demo
            </Link>
            <Link 
              href="/managed-services" 
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 text-sm sm:text-base"
            >
              Book Consultation
            </Link>
          </div>
        </div>
          </div>
        </div>
      </div>
    </section>
  )
}
