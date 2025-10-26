'use client'

import { useState, useEffect, useRef } from 'react'

const stats = [
  {
    value: 10000,
    suffix: '+',
    label: 'Active Users',
    description: 'Businesses worldwide trust Inopsio',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'indigo'
  },
  {
    value: 99.9,
    suffix: '%',
    label: 'Uptime',
    description: 'Reliable service you can count on',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'green'
  },
  {
    value: 50,
    suffix: '%',
    label: 'Cost Reduction',
    description: 'Average savings for our customers',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    color: 'purple'
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Support',
    description: 'Round-the-clock customer support',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
      </svg>
    ),
    color: 'blue'
  }
]

const achievements = [
  {
    title: 'SOC 2 Type II Certified',
    description: 'Enterprise-grade security and compliance',
    icon: '🛡️'
  },
  {
    title: 'ISO 27001 Compliant',
    description: 'International security management standard',
    icon: '🔒'
  },
  {
    title: 'GDPR Ready',
    description: 'Full compliance with data protection regulations',
    icon: '🌍'
  },
  {
    title: 'HIPAA Compliant',
    description: 'Healthcare data protection standards',
    icon: '🏥'
  }
]

const performanceMetrics = [
  {
    category: 'Performance',
    metrics: [
      { label: 'Page Load Time', value: '< 2s', improvement: '+40%' },
      { label: 'API Response Time', value: '< 100ms', improvement: '+60%' },
      { label: 'System Availability', value: '99.9%', improvement: '+15%' }
    ]
  },
  {
    category: 'Security',
    metrics: [
      { label: 'Threat Detection', value: '99.9%', improvement: '+25%' },
      { label: 'False Positive Rate', value: '< 0.1%', improvement: '+80%' },
      { label: 'Compliance Score', value: '100%', improvement: '+100%' }
    ]
  },
  {
    category: 'Customer Success',
    metrics: [
      { label: 'Customer Satisfaction', value: '98%', improvement: '+20%' },
      { label: 'Support Response', value: '< 5min', improvement: '+50%' },
      { label: 'Implementation Time', value: '< 30 days', improvement: '+70%' }
    ]
  }
]

// Custom hook for animated counter
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          const startTime = Date.now()
          const startValue = 0

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3)
            const currentValue = Math.floor(startValue + (end - startValue) * easeOutCubic)
            
            setCount(currentValue)
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, isVisible])

  return { count, ref }
}

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const { count, ref } = useAnimatedCounter(end, duration)
  
  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold">
      {count.toLocaleString()}
    </span>
  )
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section 
      className="py-20"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-sansation">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sansation">
            Our platform delivers measurable results and exceptional performance across all industries
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                stat.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {stat.icon}
              </div>
              
              <div className="text-center">
                <div className="flex items-baseline justify-center mb-2">
                  {stat.value === 10000 ? (
                    <AnimatedCounter end={stat.value} />
                  ) : stat.value === 99.9 ? (
                    <span className="text-4xl md:text-5xl font-bold">{stat.value}</span>
                  ) : stat.value === 50 ? (
                    <span className="text-4xl md:text-5xl font-bold">{stat.value}</span>
                  ) : (
                    <span className="text-4xl md:text-5xl font-bold">{stat.value}</span>
                  )}
                  <span className="text-2xl font-bold text-gray-400 ml-1">{stat.suffix}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 font-sansation">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm font-sansation">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 font-sansation">
            Industry Certifications & Compliance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 text-center">{achievement.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 text-center font-sansation">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 text-sm text-center font-sansation">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 font-sansation">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {performanceMetrics.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center font-sansation">
                  {category.category}
                </h4>
                <div className="space-y-4">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-600 font-sansation">{metric.label}</div>
                        <div className="text-lg font-semibold text-gray-900 font-sansation">
                          {metric.value}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600 font-semibold font-sansation">
                          {metric.improvement}
                        </div>
                        <div className="text-xs text-gray-500 font-sansation">improvement</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 font-sansation">
            Trusted by Leading Organizations
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder for company logos */}
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">Fortune 500</span>
            </div>
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">Global 2000</span>
            </div>
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">Enterprise</span>
            </div>
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">Startups</span>
            </div>
            <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">SMBs</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-sansation">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-gray-600 mb-8 font-sansation">
            Experience the same results that our customers achieve with Inopsio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/get-started"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors font-sansation"
            >
              Start Your Journey
            </a>
            <a
              href="/case-studies"
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors font-sansation"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
