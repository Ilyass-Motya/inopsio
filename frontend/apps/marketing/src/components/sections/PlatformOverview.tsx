'use client'
import type { ReactNode } from 'react'

export default function PlatformOverview() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="rounded-xl">
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="text-center mb-12 sm:mb-14 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-6">
                Platform Overview — The Inopsio Advantage
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Inopsio is a cloud-native, multi-tenant SaaS platform that unifies enterprise operations, security, and automation. Designed for scale and agility, it powers CRM, ERP, IT/OT security, and AI-driven intelligence — all in one seamless environment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <FeatureCard
                colorClass="text-primary-600 bg-primary-100"
                title="Security-Driven Architecture"
                description="Enterprise-grade, modular security across IT and OT, with real-time threat detection, compliance automation, and incident response."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c.943 0 1.809.324 2.5.867A3.99 3.99 0 0015 11a4 4 0 10-8 0c0 .476.083.933.234 1.357A4.002 4.002 0 0012 19a4.002 4.002 0 003.766-2.643M12 11v8" />
                  </svg>
                }
              />

              <FeatureCard
                colorClass="text-blue-600 bg-blue-100"
                title="AI Automation & Analytics"
                description="FastAPI-based machine learning services power predictive analytics and automated workflows to boost efficiency and resilience."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              />

              <FeatureCard
                colorClass="text-emerald-600 bg-emerald-100"
                title="Unified Operations"
                description="Integrated CRM, ERP, Email, and Workflow modules provide end-to-end visibility and management of business processes."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v7h6v-7c0-1.657-1.343-3-3-3zM5 21h14M7 8a5 5 0 0110 0" />
                  </svg>
                }
              />

              <FeatureCard
                colorClass="text-amber-600 bg-amber-100"
                title="Multi-Tenant & Scalable"
                description="Subdomain strategy, tenant isolation, and dynamic theming enable SaaS delivery for any customer size or need."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                  </svg>
                }
              />

              <FeatureCard
                colorClass="text-purple-600 bg-purple-100"
                title="Cloud-Native Engineering"
                description="Containerized microservices, Kubernetes orchestration, and Infrastructure-as-Code for rapid deployment and robust scaling."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                  </svg>
                }
              />

              <FeatureCard
                colorClass="text-rose-600 bg-rose-100"
                title="Observability & Monitoring"
                description="Prometheus metrics, Grafana dashboards, and alerting keep your teams proactive and informed."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18M7 15l3-3 3 3 4-4" />
                  </svg>
                }
              />

              <FeatureCard
                colorClass="text-cyan-600 bg-cyan-100"
                title="Plug-and-Play Modules"
                description="Easily add, remove, or tailor modules for CRM, ERP, automation, security, and reporting — all managed through a modern UI."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                }
              />

              <FeatureCard
                colorClass="text-slate-700 bg-slate-200"
                title="Developer-Ready Foundation"
                description="Automated CI/CD pipelines, test suites, and rich documentation ensure fast onboarding and confident releases."
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                  </svg>
                }
              />
            </div>

            <div className="text-center mt-12 sm:mt-14 lg:mt-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/modules" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl">
                  Explore Platform Modules
                </a>
                <a href="/demo" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 rounded-lg border border-primary-600 shadow-sm hover:shadow-md">
                  View Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type FeatureCardProps = {
  title: string
  description: string
  icon: ReactNode
  colorClass: string
}

function FeatureCard({ title, description, icon, colorClass }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group">
      <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center mb-4 group-hover:opacity-90`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600">
        {description}
      </p>
    </div>
  )
}
