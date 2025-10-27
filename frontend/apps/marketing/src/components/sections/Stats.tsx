'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const stats = [
  {
    metric: '12+',
    label: 'Microservices in Production',
    description: 'Modular architecture built for scalability and continuous iteration',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    metric: '6+',
    label: 'Core Business Modules',
    description: 'CRM, ERP, Email Automation, CyberOps, Workflow, and AI Services',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    metric: '100%',
    label: 'Cloud-Native',
    description: 'Fully containerized, Kubernetes-based, and Infrastructure-as-Code managed',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    metric: '24/7',
    label: 'Monitoring & Observability',
    description: 'Real-time metrics through Prometheus and Grafana integrations',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    metric: '99.99%',
    label: 'Uptime Design Standard',
    description: 'Multi-tenant, self-healing clusters designed for high availability',
    gradient: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    metric: '50+',
    label: 'Security Controls Implemented',
    description: 'Compliance with ISO 27001, SOC 2, and CNDP Law 09-08 baselines',
    gradient: 'from-red-500/20 to-rose-500/20',
  },
  {
    metric: 'AI-Driven',
    label: 'Security & Automation',
    description: 'FastAPI-powered ML services for predictive analytics and anomaly detection',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    metric: 'Zero Downtime',
    label: 'CI/CD Deployments',
    description: 'GitHub Actions pipelines with approval gates and compliance checks',
    gradient: 'from-teal-500/20 to-green-500/20',
  },
  {
    metric: 'Multi-Region',
    label: 'Global Deployment',
    description: 'Available across AWS, Azure, and OVH with geo-redundant infrastructure',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    metric: '<60min',
    label: 'Disaster Recovery RTO',
    description: 'Automated backup and recovery with quarterly DR testing and validation',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    metric: '3',
    label: 'Compliance Frameworks',
    description: 'ISO 27001, SOC 2 Type II, and CNDP Law 09-08 certification ready',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    metric: '1000+',
    label: 'Tenant Scale Support',
    description: 'Multi-tenant architecture with domain-based isolation and schema separation',
    gradient: 'from-fuchsia-500/20 to-pink-500/20',
  },
]

export default function Stats() {
  const [activeCard, setActiveCard] = useState<number | null>(1)

  return (
    <section className="py-20 bg-background dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Inopsio by the Numbers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Powered by modern architecture, intelligent automation, and enterprise-grade security.
              Every component of Inopsio is engineered for scale, speed, and resilience.
            </p>
          </div>
        </motion.div>

        {/* Interactive Stats Cards - Desktop Only (1400px+) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="hidden 2xl:flex w-full items-center justify-center gap-2">
          {stats.map((stat, index) => {
            const isActive = activeCard === index
            
            return (
              <motion.div
                key={index}
                initial={{ width: '5rem', height: '28rem' }}
                animate={{
                  width: isActive ? '28rem' : '6rem',
                  height: '28rem',
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ 
                  display: 'flex',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '1rem'
                }}
              >
                <div 
                  className="h-full w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  onClick={() => setActiveCard(index)}
                  onMouseEnter={() => setActiveCard(index)}
                >
                  {/* Gradient Overlay - Only show when expanded */}
                  <AnimatePresence>
                    {activeCard === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          zIndex: 0
                        }}
                      >
                        <div className={`bg-gradient-to-br ${stat.gradient} absolute inset-0`} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Content */}
                  <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-6">
                    {/* Collapsed State - Vertical Text */}
                    <AnimatePresence>
                      {activeCard !== index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                          }}
                        >
                        <div className="text-3xl font-bold text-[#0066CC] dark:text-[#3B82F6] mb-4 writing-mode-vertical transform rotate-180">
                          {stat.metric}
                        </div>
                        <div
                          className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap"
                          style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                          }}
                        >
                          {stat.label}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                    {/* Expanded State - Full Details */}
                    <AnimatePresence>
                      {activeCard === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                            height: '100%',
                            width: '100%'
                          }}
                        >
                        <div className="text-6xl font-bold text-[#0066CC] dark:text-[#3B82F6] mb-4">
                          {stat.metric}
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {stat.label}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {stat.description}
                        </p>
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )
          })}
          </div>
        </motion.div>

        {/* Mobile/Tablet/Desktop Grid (below 1400px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:hidden gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50 z-0`} />
              <div className="relative z-10">
                <div className="text-5xl font-bold text-[#0066CC] dark:text-[#3B82F6] mb-3">
                  {stat.metric}
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
