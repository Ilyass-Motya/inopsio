'use client'

import Link from 'next/link'
import LanguageSelector from '../ui/LanguageSelector'
import ThemeSwitcher from '../ui/ThemeSwitcher'

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
  solutions: [
    { name: 'Healthcare', href: '/solutions/healthcare' },
    { name: 'Financial Services', href: '/solutions/financial' },
    { name: 'Manufacturing', href: '/solutions/manufacturing' },
    { name: 'Government', href: '/solutions/government' },
    { name: 'Education', href: '/solutions/education' },
    { name: 'Retail', href: '/solutions/retail' },
  ],
  resources: [
    { name: 'Blog', href: '/resources/blog' },
    { name: 'Documentation', href: '/resources/docs' },
    { name: 'Whitepapers', href: '/resources/whitepapers' },
    { name: 'Case Studies', href: '/resources/case-studies' },
    { name: 'Webinars', href: '/resources/webinars' },
    { name: 'Events', href: '/resources/events' },
  ],
  company: [
    { name: 'About Us', href: '/company/about' },
    { name: 'Leadership', href: '/company/leadership' },
    { name: 'Careers', href: '/company/careers' },
    { name: 'News & Press', href: '/company/news' },
    { name: 'Partners', href: '/company/partners' },
    { name: 'Contact', href: '/company/contact' },
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

export default function Footer() {
  return (
    <footer 
      className="pt-16 sm:pt-20 lg:pt-24 pb-4 bg-white rounded-lg shadow-lg border border-slate-200"
      style={{
        marginLeft: '50px',
        marginRight: '50px',
        marginBottom: '20px'
      }}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-8">
              <div className="h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="ml-4 text-2xl font-bold text-slate-900 font-sansation">
                Inopsio
              </span>
            </Link>
            <p className="text-slate-600 leading-relaxed mb-8 max-w-lg text-base">
              Empowering businesses with intelligent, integrated solutions — from Cyber Security and managed Infrastructure to CRM and ERP.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-slate-500 hover:text-primary-600 transition-colors duration-200 p-2 rounded-lg hover:bg-slate-100"
                  aria-label={social.name}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-slate-900 font-semibold text-lg mb-6">Platforms</h3>
            <ul className="space-y-4">
              {footerLinks.platforms.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-primary-600 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-slate-900 font-semibold text-lg mb-6">Solutions</h3>
            <ul className="space-y-4">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-primary-600 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Company */}
          <div>
            <h3 className="text-slate-900 font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-4 mb-8">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-primary-600 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-slate-900 font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-primary-600 transition-colors duration-200 text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-500 text-sm mb-4 md:mb-0 font-medium">
              © 2024 Inopsio. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-8 items-center">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-500 hover:text-primary-600 transition-colors duration-200 text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}