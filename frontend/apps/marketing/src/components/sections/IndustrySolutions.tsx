'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 max-w-8xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

const BentoGridItem = ({
  className,
  title,
  description,
  outcomes,
  icon,
  index,
  isDark,
}: {
  className?: string
  title?: string
  description?: string
  outcomes?: string[]
  icon?: string
  index: number
  isDark?: boolean
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-slate-300/50 dark:hover:border-slate-600/50 overflow-hidden",
        className
      )}
      style={{
        background: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px) saturate(150%)',
        WebkitBackdropFilter: 'blur(10px) saturate(150%)',
      }}
    >
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        viewport={{ once: false, amount: 0.1 }}
      >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 dark:from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="mb-4">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
            {icon}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>

        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed text-sm group-hover:translate-x-1 transition-transform duration-300 delay-75">
          {description}
        </p>

        <div className="space-y-2">
          {outcomes?.map((outcome, outcomeIndex) => (
            <motion.div
              key={outcomeIndex}
              initial={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: (index * 0.05) + (outcomeIndex * 0.03) }}
              viewport={{ once: false, amount: 0.1 }}
            >
              <div className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                <div className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:bg-primary-700 dark:group-hover:bg-primary-300 transition-colors duration-300"></div>
                <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{outcome}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </motion.div>
    </div>
  )
}

export default function IndustrySolutions() {
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const industries = [
    {
      name: 'Government & Public Sector',
      icon: '🏛️',
      summary: 'Modernize citizen services while reducing risk and ensuring compliance at scale.',
      outcomes: ['Simplify regulatory audits', 'Accelerate public service workflows', 'Enhance data resilience and privacy']
    },
    {
      name: 'Healthcare',
      icon: '🏥',
      summary: 'Keep patient trust and compliance at the core with secure data flows and automated responses.',
      outcomes: ['Automate incident response', 'Protect sensitive records', 'Streamline audit readiness']
    },
    {
      name: 'Retail & eCommerce',
      icon: '🛒',
      summary: 'Drive growth and customer trust with secure, connected operations and smarter analytics.',
      outcomes: ['Reduce fraud and chargebacks', 'Optimize customer engagement', 'Centralize omnichannel data']
    },
    {
      name: 'Financial Services',
      icon: '💰',
      summary: 'Protect revenue and compliance with real-time risk intelligence and automated workflows.',
      outcomes: ['Reduce fraud & regulatory exposure', 'Accelerate digital onboarding', 'Real-time operations monitoring']
    },
    {
      name: 'Tech & SaaS Providers',
      icon: '💻',
      summary: 'Enable rapid growth with secure multi-tenancy, seamless integration, and agile delivery.',
      outcomes: ['Cut time-to-market for features', 'Ensure robust client separation', 'Continuous security monitoring']
    },
    {
      name: 'Manufacturing & OT',
      icon: '🏭',
      summary: 'Safeguard production and supply chain with advanced OT/IT visibility and automated threat prevention.',
      outcomes: ['Minimize downtime with predictive insights', 'Secure every device and workflow', 'Boost productivity through automation']
    }
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: false, amount: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Industry Solutions — Powered by Inopsio
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto italic">
              Unlock measurable business value in every industry. Inopsio delivers unified IT, OT, security, and automation to drive resilience, efficiency, and competitive advantage.
            </p>
          </motion.div>
        </div>

        <BentoGrid className="mb-16">
          {industries.map((industry, index) => (
            <BentoGridItem
              key={index}
              title={industry.name}
              description={industry.summary}
              outcomes={industry.outcomes}
              icon={industry.icon}
              index={index}
              isDark={isDark}
              className={
                // Create bento grid layout: Government & Public Sector and Manufacturing & OT span 2 columns
                index === 0 || index === 5 ? "md:col-span-2 md:row-span-1" : ""
              }
            />
          ))}
        </BentoGrid>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: false, amount: 0.1 }}
          >
            <button className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105">
              See Industry Success Stories
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
