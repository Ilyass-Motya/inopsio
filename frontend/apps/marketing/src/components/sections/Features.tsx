'use client'

import { useState, useEffect } from 'react'

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3V5a3 3 0 10-6 0v3c0 1.657 1.343 3 3 3zm7 0a7 7 0 11-14 0H3a9 9 0 1018 0h-2z" />
      </svg>
    ),
    title: 'Enterprise Security',
    description: '24/7 protection for IT and OT—real-time monitoring, compliance automation, rapid response.',
    hover: 'Reduce breach risk and audit time with automated controls.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 1.343 3 3v1h3l-4 4-4-4h3v-1a1 1 0 10-2 0v1H7v-1a5 5 0 015-5z" />
      </svg>
    ),
    title: 'AI-Powered Automation',
    description: 'ML-powered workflows accelerate processes and ensure health, security, and performance.',
    hover: 'Automate triage, routing, and anomaly detection across domains.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6M5 6a2 2 0 00-2 2v10l4-2 4 2 4-2 4 2V8a2 2 0 00-2-2H5z" />
      </svg>
    ),
    title: 'CRM & Customer 360',
    description: 'Centralized view of leads, pipeline, and interactions—drive targeted engagement and growth.',
    hover: 'Unify marketing, sales, and support signals in one place.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h12M3 17h18" />
      </svg>
    ),
    title: 'ERP & Business Intelligence',
    description: 'Finance, inventory, and supplier management with powerful reporting and analytics.',
    hover: 'Close books faster with accurate, real-time data.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M6 10h12M8 14h8M10 18h4" />
      </svg>
    ),
    title: 'Multi-Tenant Control',
    description: 'Isolate clients, personalize experience, and scale with subdomain routing and theming.',
    hover: 'Enforce data boundaries with per-tenant policies.'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3v8H3a9 9 0 109-8z" />
      </svg>
    ),
    title: 'Unified Data & Reporting',
    description: 'Real-time dashboards, compliance metrics, and deep insights for better decisions.',
    hover: 'Blend operational, security, and finance data instantly.'
  }
]

export default function Features() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      features.forEach((_, index) => {
        setTimeout(() => {
          setVisibleFeatures(prev => [...prev, index])
        }, index * 100)
      })
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="features"
      className="py-16 sm:py-20 lg:py-24"
      style={{
        paddingTop: '120px'
      }}
    >
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          className="rounded-xl p-6 sm:p-8 lg:p-12"
        >
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-balance text-slate-900">
            Features — Key Capabilities at a Glance
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto text-balance">
            A unified suite for security, automation, and modern enterprise operations.
          </p>
        </div>

        {/* Features Grid: 1 / 2 / 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group ${
                visibleFeatures.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-200">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3 group-hover:text-primary-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="mt-4 pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm text-slate-600">
                  {feature.hover}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h4 className="text-xl font-semibold mb-4">Additional Feature Highlights</h4>
            <ul className="space-y-3 text-slate-700">
              <li>
                <span className="font-semibold">Developer Experience</span> — Fast onboarding, robust CI/CD, one-click deployments.
              </li>
              <li>
                <span className="font-semibold">Cloud-Native Performance</span> — Kubernetes orchestration and IaC for scale.
              </li>
              <li>
                <span className="font-semibold">Workflow & Process Automation</span> — Drag-and-drop design, task assignment, analytics.
              </li>
              <li>
                <span className="font-semibold">Mobile Access</span> — Cross-platform apps with offline support and secure push.
              </li>
              <li>
                <span className="font-semibold">Compliance & Policy Management</span> — Automated ISO, GDPR, and sector rules.
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 flex items-center justify-center">
            <a href="/features" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl">
              Explore All Features
            </a>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-lg p-8 border border-slate-200">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              See the full platform in action
            </h3>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              Explore technical details or try interactive module showcases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/features" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl">
                Explore All Features
              </a>
              <a href="/demo" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 rounded-lg border border-primary-600 shadow-sm hover:shadow-md">
                Schedule Demo
              </a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
