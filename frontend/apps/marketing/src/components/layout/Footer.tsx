'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import LanguageSelector from '../ui/LanguageSelector'
import ThemeSwitcher from '../ui/ThemeSwitcher'
import ComplianceBadge from '../ui/ComplianceBadge'
import FooterCTA from '../sections/FooterCTA'

const footerLinks = {
  platforms: [
    { name: 'CRM Platform', href: '/platforms/crm' },
    { name: 'ERP Platform', href: '/platforms/erp' },
    { name: 'Email Marketing', href: '/platforms/email-marketing' },
    { name: 'Workflow Automation', href: '/platforms/workflow' },
    { name: 'InoSec Core', href: '/platforms/inosec-core' },
    { name: 'InoSec Edge', href: '/platforms/inosec-edge' },
    { name: 'InoSec One', href: '/platforms/inosec-one' },
  ],
  ai: [
    { name: 'AI Assistant', href: '/ai/assistant' },
    { name: 'ML Platform', href: '/ai/ml-platform' },
    { name: 'Intelligent Automation', href: '/ai/automation' },
    { name: 'Predictive Analytics', href: '/ai/analytics' },
  ],
  solutions: [
    { name: 'Healthcare', href: '/solutions/healthcare' },
    { name: 'Financial Services', href: '/solutions/financial' },
    { name: 'Manufacturing', href: '/solutions/manufacturing' },
    { name: 'Government', href: '/solutions/government' },
    { name: 'Education', href: '/solutions/education' },
  ],
  resources: [
    { name: 'Blog', href: '/resources/blog' },
    { name: 'Documentation', href: '/resources/docs' },
    { name: 'Whitepapers', href: '/resources/whitepapers' },
    { name: 'Case Studies', href: '/resources/case-studies' },
    { name: 'Webinars', href: '/resources/webinars' },
  ],
  company: [
    { name: 'About Us', href: '/company/about' },
    { name: 'Leadership', href: '/company/leadership' },
    { name: 'Careers', href: '/company/careers' },
    { name: 'News & Press', href: '/company/news' },
    { name: 'Partners', href: '/company/partners' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
    { name: 'GDPR Compliance', href: '/legal/gdpr' },
  ]
}

const socialLinks = [
  { name: 'Twitter', href: '#', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
  { name: 'LinkedIn', href: '#', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
  { name: 'GitHub', href: '#', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22' },
  { name: 'YouTube', href: '#', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z' },
]

const complianceBadges = [
  { name: 'M-Law 09-08', status: 'achieved' as const },         // ✅ CNDP Certified
  { name: 'GDPR', status: 'achieved' as const },                 // ✅ Implemented
  { name: 'ISO 27001', status: 'achieved' as const },           // ✅ Compliant
  { name: 'SOC 2 Type II', status: 'in-progress' as const },    // 🟡 Partially Complete
  { name: 'ISO 27701', status: 'planned' as const },            // ⚪ Privacy Extension
  { name: 'ISO 22301', status: 'planned' as const }             // ⚪ Business Continuity
]

export default function Footer() {
  const pathname = usePathname()
  const isHeroTestPage = pathname === '/hero-test'

  return (
    <footer className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Main Footer Content */}
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 sm:p-10 lg:p-12 mb-8 shadow-xl border-2 border-gray-200 dark:border-gray-700">

          {/* CTA Section inside Footer */}
          {!isHeroTestPage && (
            <div className="mb-12 pb-12 border-b border-slate-300/50 dark:border-white/20">
              <FooterCTA />
            </div>
          )}
          {/* Logo and System Status */}
          <div className="mb-12 pb-8 border-b border-slate-300/50 dark:border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Logo */}
              <Link href="/" className="inline-block">
                <Image src="/inopsio-logo.svg" alt="Inopsio Logo" width={120} height={40} className="h-10 w-auto" />
              </Link>

              {/* System Status */}
              <Link
                href="https://uptime.inopsio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-3 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-slate-600 dark:text-slate-300 font-medium text-sm group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200">
                    All systems operational
                  </span>
                  <svg className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

            {/* Platforms */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Platforms</h3>
              <ul className="space-y-3">
                {footerLinks.platforms.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI & Automation */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">AI & Automation</h3>
              <ul className="space-y-3">
                {footerLinks.ai.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Solutions</h3>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Compliance Badges Section */}
          <div className="border-t border-slate-300/50 dark:border-white/20 pt-8 pb-8 mb-8">
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {complianceBadges.map((badge) => (
                <ComplianceBadge
                  key={badge.name}
                  type={badge.name}
                  status={badge.status}
                />
              ))}
            </div>
          </div>

          {/* Social & Controls Bar */}
          <div className="border-t border-slate-300/50 dark:border-white/20 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Social Media Icons */}
              <div className="flex items-center gap-6">
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
                      aria-label={social.name}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Theme & Language Switchers */}
              <div className="flex items-center gap-3">
                <ThemeSwitcher />
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © {new Date().getFullYear()} Inopsio. All rights reserved. Built with enterprise-grade security and compliance.
          </p>
        </div>

      </div>
    </footer>
  )
}