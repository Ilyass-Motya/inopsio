'use client'

import Link from 'next/link'
import {
  RocketLaunchIcon,
  LightBulbIcon,
  BoltIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  CalendarIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  SparklesIcon,
  ArrowRightIcon,
  BookOpenIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

export default function PartnersPage() {
  const whyPartnerBenefits = [
    {
      icon: RocketLaunchIcon,
      title: 'Ground Floor Opportunity',
      items: [
        'Exclusive founding partner benefits and preferential treatment as we scale',
        'Shape the product roadmap - your input directly influences development priorities',
        'Market exclusivity opportunities in specific verticals or regions',
        'Higher margins compared to established platforms due to early partnership benefits',
      ],
    },
    {
      icon: LightBulbIcon,
      title: 'Revolutionary Technology Stack',
      items: [
        'First unified platform combining business operations with AI-powered cybersecurity',
        'Multi-tenant architecture designed for scalability from day one',
        'Modern technology stack - React/Next.js, NestJS, FastAPI, Kubernetes',
        'AI-native design with automation and intelligence built into every module',
      ],
    },
    {
      icon: BoltIcon,
      title: 'Underserved Market Focus',
      items: [
        'MENA region expansion - first mover advantage in growing markets',
        'SME-to-Enterprise sweet spot that larger platforms often neglect',
        'Cybersecurity integration - addressing the #1 concern of modern businesses',
        'Government sector - specialized compliance and security features',
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
        'Marketing platform and brand presence established',
        'Core architecture and infrastructure designed',
        'MVP specifications completed and validated',
        'Design system and component library built',
      ],
    },
    {
      phase: 'Phase 2: Core Platform',
      status: 'In Progress - Q4 2025',
      icon: ArrowPathIcon,
      statusColor: 'text-blue-600 dark:text-blue-400',
      items: [
        'CRM module with lead management and pipeline tracking',
        'ERP module with invoicing and payment processing',
        'Email marketing campaigns and automation',
        'Workflow builder with visual drag-and-drop interface',
        'Basic cybersecurity monitoring and threat detection',
        'Multi-tenant architecture with complete data isolation',
      ],
    },
    {
      phase: 'Phase 3: Advanced Features',
      status: 'Q1-Q2 2026',
      icon: CalendarIcon,
      statusColor: 'text-purple-600 dark:text-purple-400',
      items: [
        'AI-powered analytics and predictive insights',
        'Advanced workflow automation templates',
        'Enhanced cybersecurity dashboard and reporting',
        'Enterprise SSO and SAML integration',
        'Mobile applications (iOS/Android)',
      ],
    },
  ]

  const partnershipTypes = [
    {
      icon: UserGroupIcon,
      title: 'Strategic Development Partners',
      subtitle: 'Perfect for: Systems integrators, consultants, and agencies ready to grow with us',
      lookingFor: {
        title: "What we're looking for:",
        items: [
          'Proven track record in business software implementation',
          'Customer base that would benefit from unified business platforms',
          'Technical expertise in web technologies or cybersecurity',
          'Geographic presence in target markets (MENA, North America, Europe)',
        ],
      },
      benefits: {
        title: 'What you get:',
        items: [
          'Co-development opportunities - influence feature development',
          'Exclusive beta access - test and provide feedback before public launch',
          'Preferential pricing - significant discounts for early partners',
          'Marketing collaboration - joint case studies, webinars, and content',
          'Technical training - comprehensive product education and certification',
          'Protected territories - geographic or vertical exclusivity agreements',
        ],
      },
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Technology Integration Partners',
      subtitle: 'Perfect for: Software vendors, API providers, and technology companies',
      lookingFor: {
        title: "What we're looking for:",
        items: [
          'Complementary technology solutions (payment processors, communication tools, etc.)',
          'API-first architecture and modern integration capabilities',
          'Shared customer base or target market alignment',
          'Quality-focused development practices',
        ],
      },
      benefits: {
        title: 'What you get:',
        items: [
          'Native integrations - featured placement in our integration marketplace',
          'Joint solution development - collaborative product offerings',
          'Co-marketing opportunities - shared go-to-market activities',
          'Technical support - dedicated integration assistance',
          'Revenue sharing - mutual referral and revenue arrangements',
        ],
      },
    },
    {
      icon: AcademicCapIcon,
      title: 'Implementation & Training Partners',
      subtitle: 'Perfect for: Training organizations, consultants, and service providers',
      lookingFor: {
        title: "What we're looking for:",
        items: [
          'Experience in business process consulting',
          'Training and change management capabilities',
          'Regional presence in our target markets',
          'Commitment to customer success',
        ],
      },
      benefits: {
        title: 'What you get:',
        items: [
          'Certification program access - become authorized trainers',
          'Implementation methodologies - proven deployment frameworks',
          'Service revenue opportunities - consulting and training fees',
          'Partner portal access - resources, documentation, and support',
          'Customer referrals - leads from our marketing efforts',
        ],
      },
    },
  ]

  const supportResources = [
    {
      icon: BookOpenIcon,
      title: 'Comprehensive Enablement',
      items: [
        'Technical Documentation - Complete API specs, integration guides, and architecture overviews',
        'Sales Training Materials - Competitive positioning, demo scripts, and customer success stories',
        'Marketing Resources - Co-branded materials, presentation templates, and lead generation tools',
        'Certification Programs - Technical and sales certification tracks with ongoing education',
      ],
    },
    {
      icon: Cog6ToothIcon,
      title: 'Development & Technical Support',
      items: [
        'Sandbox Environments - Full-featured development and testing instances',
        'API Access - Early access to all platform APIs and webhooks',
        'Technical Advisory - Direct access to our engineering team for integration support',
        'Beta Testing Program - Priority access to new features and capabilities',
      ],
    },
    {
      icon: PresentationChartBarIcon,
      title: 'Go-to-Market Support',
      items: [
        'Joint Marketing Plans - Collaborative marketing strategy development',
        'Lead Sharing - Qualified opportunity distribution based on expertise',
        'Event Participation - Shared presence at industry conferences and trade shows',
        'Content Collaboration - Co-created whitepapers, case studies, and thought leadership',
      ],
    },
  ]

  const applicationSteps = [
    {
      step: 'Step 1: Discovery Call',
      duration: '30 minutes',
      items: [
        'Initial qualification and mutual fit assessment',
        'Overview of partnership opportunities and requirements',
        'Discussion of your business goals and market presence',
      ],
    },
    {
      step: 'Step 2: Partnership Proposal',
      duration: '1 week',
      items: [
        'Detailed partnership agreement proposal',
        'Specific terms, benefits, and commitments',
        'Territory and vertical alignment discussion',
      ],
    },
    {
      step: 'Step 3: Technical Evaluation',
      duration: '2 weeks',
      items: [
        'Technical capabilities assessment',
        'Integration requirements and possibilities',
        'Product demonstration and beta access setup',
      ],
    },
    {
      step: 'Step 4: Agreement & Onboarding',
      duration: '2 weeks',
      items: [
        'Final partnership agreement execution',
        'Partner portal access and resource provisioning',
        'Training program enrollment and certification planning',
      ],
    },
    {
      step: 'Step 5: Go-Live Preparation',
      duration: '4 weeks',
      items: [
        'Joint go-to-market planning',
        'Marketing material development',
        'Customer pilot program setup',
      ],
    },
  ]

  return (
    <>
      {/* Hero Introduction Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="heading-lg mb-6 text-slate-900 dark:text-white">
              Inopsio Partners Program - Building the Future Together
            </h1>
            <p className="text-lead text-slate-600 dark:text-slate-400 mb-6">
              Partner with Inopsio - Shape the Next Generation of Business Technology
            </p>
            <p className="text-body text-slate-600 dark:text-slate-400 mb-6">
              Inopsio is launching a revolutionary unified business platform that combines CRM, ERP, AI automation, 
              email marketing, and enterprise cybersecurity in one intelligent SaaS ecosystem. As we prepare for our 
              market launch, we're seeking visionary partners to join us in transforming how businesses operate and 
              secure their digital operations.
            </p>
            <p className="text-body text-slate-600 dark:text-slate-400 mb-8 font-semibold">
              This is your opportunity to become a founding partner in what will become the leading business 
              transformation platform for SMEs, enterprises, and government agencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Join Our Partner Program
                <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                href="/contact?type=discovery"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <PhoneIcon className="w-5 h-5" aria-hidden="true" />
                Schedule Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner with Inopsio Now */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Why Partner with Inopsio Now?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {whyPartnerBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="heading-sm text-slate-900 dark:text-white">
                      {benefit.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {benefit.items.map((item, itemIndex) => (
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

      {/* Current Development Status */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Current Development Status
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {developmentPhases.map((phase, index) => {
              const IconComponent = phase.icon
              return (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700"
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

      {/* Partnership Opportunities */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Partnership Opportunities Available
            </h2>
          </div>
          <div className="space-y-12">
            {partnershipTypes.map((type, index) => {
              const IconComponent = type.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <IconComponent className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="heading-md mb-2 text-slate-900 dark:text-white">
                        {type.title}
                      </h3>
                      <p className="text-body text-slate-600 dark:text-slate-400">
                        {type.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                        {type.lookingFor.title}
                      </h4>
                      <ul className="space-y-3">
                        {type.lookingFor.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <ArrowRightIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-body text-slate-600 dark:text-slate-400">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
                        {type.benefits.title}
                      </h4>
                      <ul className="space-y-3">
                        {type.benefits.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <CheckCircleIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-body text-slate-600 dark:text-slate-400">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partner Support & Resources */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Partner Support & Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportResources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="heading-sm text-slate-900 dark:text-white">
                      {resource.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {resource.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <DocumentTextIcon className="w-5 h-5 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
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

      {/* Partner Requirements & Application Process */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Minimum Partner Qualifications */}
            <div>
              <h2 className="heading-md mb-6 text-slate-900 dark:text-white">
                Minimum Partner Qualifications
              </h2>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
                <ul className="space-y-4">
                  {[
                    'Business Credentials - Established company with relevant industry experience',
                    'Technical Capabilities - Demonstrated ability to implement or integrate business software',
                    'Market Presence - Existing customer relationships in target segments',
                    'Commitment Level - Willingness to invest time and resources in mutual success',
                    'Growth Mindset - Alignment with our mission to transform business operations',
                  ].map((qualification, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-body text-slate-600 dark:text-slate-400">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application & Onboarding Process */}
            <div>
              <h2 className="heading-md mb-6 text-slate-900 dark:text-white">
                Application & Onboarding Process
              </h2>
              <div className="space-y-6">
                {applicationSteps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {step.step}
                      </h3>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {step.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2">
                          <ArrowRightIcon className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <SparklesIcon className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-6" aria-hidden="true" />
            <h2 className="heading-md mb-4 text-slate-900 dark:text-white">
              Success Stories in the Making
            </h2>
            <p className="text-body text-slate-600 dark:text-slate-400 mb-8">
              "We're building these success stories with our founding partners. Your story could be featured here 
              as we grow together and transform businesses worldwide."
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
                Partner Testimonials Coming Soon
              </h3>
              <p className="text-body text-slate-600 dark:text-slate-400">
                As we launch with our founding partners, we'll showcase the incredible results and transformations 
                achieved through our collaborative approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary-600 to-blue-700 dark:from-primary-700 dark:to-blue-800">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-6 text-white">
              Ready to Join the Inopsio Revolution?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-4 leading-relaxed">
              This is more than a partnership - it's an opportunity to be part of the next generation of business 
              technology. We're looking for partners who share our vision of unified, intelligent, and secure business 
              operations.
            </p>
            <p className="text-base sm:text-lg text-blue-100 mb-8 font-semibold">
              Limited founding partner positions available - we're selectively building our initial partner ecosystem 
              to ensure mutual success and market impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-primary-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                Apply for Partnership
                <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
              <Link
                href="/contact?type=discovery"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                <PhoneIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                Schedule Discovery Call
              </Link>
              <Link
                href="/contact?download=partner-pack"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
              >
                <DocumentMagnifyingGlassIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                Download Partner Information Pack
              </Link>
            </div>

            {/* Contact Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h3 className="text-xl font-semibold mb-6 text-white">
                Contact Our Partnership Team
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-100">
                <div className="flex items-center justify-center gap-2">
                  <EnvelopeIcon className="w-5 h-5" aria-hidden="true" />
                  <a href="mailto:partners@inopsio.com" className="hover:text-white transition-colors">
                    partners@inopsio.com
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <PhoneIcon className="w-5 h-5" aria-hidden="true" />
                  <a href="tel:+15551234567" className="hover:text-white transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPinIcon className="w-5 h-5" aria-hidden="true" />
                  <span>Coming Soon - North America & MENA Offices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Tagline */}
      <section className="py-12 bg-slate-900 dark:bg-slate-950">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-2">
              Inopsio - Where Business Intelligence Meets Cybersecurity Excellence
            </p>
            <p className="text-slate-400">
              Building the future of unified business platforms, one partnership at a time.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
