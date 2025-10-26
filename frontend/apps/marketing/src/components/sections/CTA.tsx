'use client'

import Link from 'next/link'

export default function CTA() {
  return (
    <section 
      className="py-16 sm:py-20 lg:py-24 bg-white rounded-xl shadow-lg border border-slate-200"
      style={{
        marginLeft: '50px',
        marginRight: '50px',
        marginBottom: '20px'
      }}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Ready to Strengthen Your Security Posture?
          </h2>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto">
            Get enterprise-grade protection tailored to your infrastructure. 
            Start with a personalized demo today.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/demo" 
              className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              Request a Demo
            </Link>
            <Link 
              href="/contact-sales" 
              className="px-8 py-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
