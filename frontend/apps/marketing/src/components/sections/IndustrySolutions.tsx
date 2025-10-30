'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { m } from 'framer-motion'

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
}: {
  className?: string
  title?: string
  description?: string
  outcomes?: string[]
  icon?: string
  index: number
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-slate-200/50 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-slate-300/50 overflow-hidden",
        className
      )}
    >
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="mb-4">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
            {icon}
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>

        <p className="text-slate-600 mb-4 leading-relaxed text-sm group-hover:translate-x-1 transition-transform duration-300 delay-75">
          {description}
        </p>

        <div className="space-y-2">
          {outcomes?.map((outcome, outcomeIndex) => (
            <div
              key={outcomeIndex}
              className="flex items-start group-hover:translate-x-1 transition-transform duration-300"
              style={{ transitionDelay: `${outcomeIndex * 50}ms` }}
            >
              <m.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (index * 0.1) + (outcomeIndex * 0.05) }}
                viewport={{ once: true }}
              >
                <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:bg-primary-700 transition-colors duration-300"></div>
                <span className="text-slate-700 text-sm leading-relaxed">{outcome}</span>
              </m.div>
            </div>
          ))}
        </div>
      </div>
      </m.div>
    </div>
  )
}

export default function IndustrySolutions() {
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
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Industry Solutions — Powered by Inopsio
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto italic">
              Unlock measurable business value in every industry. Inopsio delivers unified IT, OT, security, and automation to drive resilience, efficiency, and competitive advantage.
            </p>
          </m.div>
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
              className={
                // Create bento grid layout: Government & Public Sector and Manufacturing & OT span 2 columns
                index === 0 || index === 5 ? "md:col-span-2 md:row-span-1" : ""
              }
            />
          ))}
        </BentoGrid>

        <div className="text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105">
              See Industry Success Stories
            </button>
          </m.div>
        </div>
      </div>
    </section>
  )
}
