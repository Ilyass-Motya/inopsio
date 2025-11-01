'use client'

import Link from 'next/link'
import HeaderPill from '@/components/layout/HeaderPill'
import HeroDefault from '@/components/sections/HeroDefault'
import {
  ShieldCheckIcon,
  Squares2X2Icon,
  SparklesIcon,
  GlobeAltIcon,
  CpuChipIcon,
  PuzzlePieceIcon,
  ServerIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  CalendarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClockIcon,
  DocumentCheckIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BuildingOffice2Icon,
  LightBulbIcon,
  BoltIcon,
  HeartIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline'

export default function AboutPage() {
  const coreValues = [
    {
      icon: ShieldCheckIcon,
      title: 'Security First',
      description: 'Security isn\'t an add-on—it\'s the foundation of everything we build. Every feature, every integration, and every line of code is designed with enterprise-grade security at its core, ensuring our customers can operate with confidence.',
    },
    {
      icon: Squares2X2Icon,
      title: 'Unified Excellence',
      description: 'We believe in breaking down silos. Our platform brings together traditionally separate business functions into one cohesive, intelligent ecosystem that works better together than apart.',
    },
    {
      icon: SparklesIcon,
      title: 'Innovation Through AI',
      description: 'We harness the power of artificial intelligence not as a buzzword, but as a practical tool that automates complexity, predicts needs, and provides actionable insights that drive real business value.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Impact, Local Understanding',
      description: 'While we think globally about technology and innovation, we understand that every market has unique needs. Our platform is designed to be flexible and adaptable to local business practices and compliance requirements.',
    },
    {
      icon: HeartIcon,
      title: 'Customer Success Obsession',
      description: 'Our success is measured by our customers\' success. We\'re not just building software—we\'re building partnerships that help organizations transform and thrive in an increasingly digital world.',
    },
  ]

  const whatSetsUsApart = [
    {
      icon: PuzzlePieceIcon,
      title: 'Revolutionary Integration Approach',
      items: [
        'Single source of truth for all business data',
        'Real-time synchronization across all modules',
        'Unified user experience with consistent design and workflows',
        'Seamless data flow between CRM, ERP, security, and automation systems',
      ],
    },
    {
      icon: CpuChipIcon,
      title: 'AI-Native Architecture',
      items: [
        'Predictive analytics for sales forecasting and business planning',
        'Intelligent automation that learns from user behavior',
        'Advanced threat detection powered by machine learning',
        'Smart recommendations for process optimization',
      ],
    },
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise-Grade Security Built In',
      items: [
        'Multi-tenant architecture with complete data isolation',
        'Zero-trust security model across all components',
        'Real-time threat monitoring and automated response',
        'Compliance-ready for SOC 2, ISO 27001, GDPR, and industry-specific regulations',
      ],
    },
  ]

  const technologyStack = [
    {
      icon: ServerIcon,
      title: 'Modern, Scalable Architecture',
      items: [
        'Cloud-native design with Kubernetes orchestration',
        'Microservices architecture for modularity and resilience',
        'Event-driven communication for real-time data processing',
        'API-first development for seamless integrations',
      ],
    },
    {
      icon: CodeBracketIcon,
      title: 'Open Standards & Integration',
      items: [
        'Open API architecture for custom integrations',
        'Standard protocols for easy data import/export',
        'Webhook support for real-time external integrations',
        'Partner ecosystem for specialized add-ons and services',
      ],
    },
  ]

  const developmentPhases = [
    {
      phase: 'Phase 1: Foundation',
      status: 'Completed',
      icon: CheckCircleIcon,
      statusColor: 'text-green-600 dark:text-green-400',
      items: [
        'Core platform architecture designed',
        'Design system and brand identity established',
        'Marketing platform and documentation created',
        'MVP specifications completed and validated',
      ],
    },
    {
      phase: 'Phase 2: Core Modules',
      status: 'In Progress - Q4 2025',
      icon: ArrowPathIcon,
      statusColor: 'text-blue-600 dark:text-blue-400',
      items: [
        'CRM with lead management and sales automation',
        'ERP with financial management and invoicing',
        'Email marketing with campaign automation',
        'Workflow builder with visual drag-and-drop interface',
        'Basic cybersecurity monitoring and threat detection',
      ],
    },
    {
      phase: 'Phase 3: Advanced Intelligence',
      status: 'Planned Q1-Q2 2026',
      icon: CalendarIcon,
      statusColor: 'text-purple-600 dark:text-purple-400',
      items: [
        'AI-powered predictive analytics',
        'Advanced workflow automation templates',
        'Enhanced cybersecurity dashboard',
        'Enterprise SSO and compliance features',
        'Mobile applications for iOS and Android',
      ],
    },
  ]

  const leadershipRoles = [
    {
      icon: BuildingOffice2Icon,
      title: 'Chief Executive Officer',
      description: 'Visionary leader with extensive experience in SaaS platform development and go-to-market strategy',
    },
    {
      icon: CpuChipIcon,
      title: 'Chief Technology Officer',
      description: 'Technical architect with deep expertise in distributed systems, AI/ML, and enterprise security',
    },
    {
      icon: LightBulbIcon,
      title: 'Chief Product Officer',
      description: 'Product strategist focused on user experience and business value delivery',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Chief Security Officer',
      description: 'Cybersecurity expert with background in enterprise threat detection and compliance',
    },
  ]

  const commitments = [
    {
      icon: ClockIcon,
      title: 'Quality Assurance',
      items: [
        '99.9% uptime SLA with redundant infrastructure',
        'Sub-2 second response times for optimal user experience',
        'Comprehensive testing including automated security scanning',
        'Continuous monitoring with proactive issue resolution',
      ],
    },
    {
      icon: DocumentCheckIcon,
      title: 'Compliance & Certifications',
      items: [
        'SOC 2 Type II certification in progress',
        'ISO 27001 compliance framework implemented',
        'GDPR ready with built-in privacy controls',
        'Industry-specific compliance for healthcare, finance, and government',
      ],
    },
    {
      icon: UserGroupIcon,
      title: 'Customer Success',
      items: [
        '24/7 support for critical business operations',
        'Comprehensive onboarding with dedicated success managers',
        'Extensive documentation and training resources',
        'Regular webinars and best practice sharing',
      ],
    },
  ]

  const openPositions = [
    'Software Engineers (Full-stack, Backend, Frontend)',
    'DevOps Engineers (Cloud infrastructure, Security)',
    'Product Managers (Platform, Security, AI/ML)',
    'Sales & Customer Success (Enterprise, Channel Partners)',
    'Security Engineers (Compliance, Threat Detection)',
  ]

  return (
    <>
      <HeaderPill />
      <HeroDefault
        title="Transforming Business Through Intelligent Innovation"
        description="We're building the world's first truly unified business platform that seamlessly combines operational excellence with enterprise-grade cybersecurity."
      />

      {/* Our Story Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-md mb-6 text-slate-900 dark:text-white">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-body mb-6">
                <strong>Inopsio was born from a simple yet powerful vision</strong>: to create the world's first truly unified business platform that seamlessly combines operational excellence with enterprise-grade cybersecurity. Founded in 2024, we recognized that businesses were struggling with fragmented systems, isolated data, and the growing complexity of maintaining security across multiple platforms.
              </p>
              <p className="text-body mb-8">
                Our journey began when our founding team, with decades of combined experience in enterprise software, cybersecurity, and artificial intelligence, witnessed firsthand how organizations were forced to choose between operational efficiency and security. <strong>We believed there had to be a better way.</strong>
              </p>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent my-12"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-md mb-12 text-center text-slate-900 dark:text-white">
              Mission & Vision
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <BoltIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  <h3 className="heading-sm text-slate-900 dark:text-white">
                    Our Mission
                  </h3>
                </div>
                <p className="text-body mb-4">
                  <strong>To empower businesses and government agencies with a secure, scalable, and intelligent platform that streamlines operations, enhances security, and drives growth through automation and AI-powered insights.</strong>
                </p>
                <p className="text-body text-slate-600 dark:text-slate-400">
                  We achieve this by delivering a unified ecosystem where CRM, ERP, workflow automation, email marketing, and enterprise cybersecurity work together seamlessly, powered by artificial intelligence and built on a foundation of security-first principles.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <SparklesIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  <h3 className="heading-sm text-slate-900 dark:text-white">
                    Our Vision
                  </h3>
                </div>
                <p className="text-body mb-4">
                  <strong>To become the world's leading unified business platform, combining CRM, ERP, workflow automation, and enterprise-grade cybersecurity powered by AI.</strong>
                </p>
                <p className="text-body text-slate-600 dark:text-slate-400">
                  We envision a future where businesses no longer need to manage dozens of disconnected tools, where security is built into every process, and where intelligent automation handles routine tasks so teams can focus on innovation and growth.
                </p>
              </div>
            </div>
            
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent my-12"></div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="heading-sm text-slate-900 dark:text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-body text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {whatSetsUsApart.map((item, index) => {
              const IconComponent = item.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="heading-sm text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {item.items.map((listItem, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-body text-slate-600 dark:text-slate-400">{listItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Technology Philosophy Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Our Technology Philosophy
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologyStack.map((tech, index) => {
              const IconComponent = tech.icon
              return (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="heading-sm text-slate-900 dark:text-white">
                      {tech.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {tech.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <ArrowRightIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-body text-slate-600 dark:text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Development Journey Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Our Development Journey
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {developmentPhases.map((phase, index) => {
              const IconComponent = phase.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-6 h-6 ${phase.statusColor}`} aria-hidden="true" />
                      <h3 className="heading-sm text-slate-900 dark:text-white">
                        {phase.phase}
                      </h3>
                    </div>
                  </div>
                  <p className={`text-sm font-semibold mb-4 ${phase.statusColor}`}>
                    {phase.status}
                  </p>
                  <ul className="space-y-2">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Leadership Team
            </h2>
            <p className="text-body text-slate-600 dark:text-slate-400 mb-8">
              Our leadership team brings together decades of experience in enterprise software, cybersecurity, and business transformation.
            </p>
          </div>
          
          <div className="mb-12">
            <h3 className="heading-sm mb-6 text-slate-900 dark:text-white">
              Executive Leadership
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadershipRoles.map((role, index) => {
                const IconComponent = role.icon
                return (
                  <div
                    key={index}
                    className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {role.title}
                      </h4>
                    </div>
                    <p className="text-body text-slate-600 dark:text-slate-400 italic">
                      {role.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <AcademicCapIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              <h3 className="heading-sm text-slate-900 dark:text-white">
                Advisory Board
              </h3>
            </div>
            <p className="text-body text-slate-600 dark:text-slate-400">
              We're supported by industry veterans and subject matter experts who guide our strategic direction and ensure we're building solutions that truly meet market needs.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment to Excellence Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Our Commitment to Excellence
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => {
              const IconComponent = commitment.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="heading-sm text-slate-900 dark:text-white">
                      {commitment.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {commitment.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-body text-slate-600 dark:text-slate-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Join Our Mission Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-md mb-6 text-slate-900 dark:text-white">
              Join Our Mission
            </h2>
            <p className="text-body mb-8 text-slate-600 dark:text-slate-400">
              <strong>We're not just building software—we're building the future of business operations.</strong> As we continue to grow and expand our platform, we're always looking for talented individuals who share our passion for innovation, security, and customer success.
            </p>
            <p className="text-body mb-8 text-slate-600 dark:text-slate-400">
              Whether you're a potential customer, partner, or team member, we invite you to be part of the Inopsio journey as we transform how businesses operate in the digital age.
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 text-left mb-8">
              <h3 className="heading-sm mb-4 text-slate-900 dark:text-white">
                Current Openings
              </h3>
              <p className="text-body mb-4 text-slate-600 dark:text-slate-400">
                We're actively hiring across multiple disciplines:
              </p>
              <ul className="space-y-2">
                {openPositions.map((position, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <ArrowRightIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-body text-slate-600 dark:text-slate-400">{position}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/company/careers"
              className="btn-primary inline-flex items-center gap-2"
            >
              View Career Opportunities
              <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-600 to-blue-700 dark:from-primary-700 dark:to-blue-800">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6 text-white">
              Get in Touch
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Ready to learn more about how Inopsio can transform your business operations?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <EnvelopeIcon className="w-8 h-8 text-white mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-2 text-white">Sales Inquiries</h3>
                <a href="mailto:sales@inopsio.com" className="text-blue-100 hover:text-white transition-colors">
                  sales@inopsio.com
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <UserGroupIcon className="w-8 h-8 text-white mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-2 text-white">Partnership Opportunities</h3>
                <a href="mailto:partners@inopsio.com" className="text-blue-100 hover:text-white transition-colors">
                  partners@inopsio.com
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <BriefcaseIcon className="w-8 h-8 text-white mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-2 text-white">Career Opportunities</h3>
                <a href="mailto:careers@inopsio.com" className="text-blue-100 hover:text-white transition-colors">
                  careers@inopsio.com
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <EnvelopeIcon className="w-8 h-8 text-white mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-2 text-white">General Information</h3>
                <a href="mailto:info@inopsio.com" className="text-blue-100 hover:text-white transition-colors">
                  info@inopsio.com
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Follow our journey:
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="https://linkedin.com/company/inopsio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRightIcon className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="https://twitter.com/inopsio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <span>Twitter</span>
                  <ArrowUpRightIcon className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/inopsio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  <span>GitHub</span>
                  <ArrowUpRightIcon className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mt-12 text-blue-100 italic">
              <p className="text-lg">
                At Inopsio, we're not just building the next generation of business software—we're building the foundation for the future of intelligent, secure, and unified business operations. Join us in this transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
