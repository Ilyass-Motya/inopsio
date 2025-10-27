'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/components/providers/ThemeProvider'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

// Navigation data structure
const navigation = {
  platforms: [
    { name: 'CRM Platform', href: '/platforms/crm', description: 'Customer relationship management' },
    { name: 'ERP Platform', href: '/platforms/erp', description: 'Enterprise resource planning' },
    { name: 'Email Marketing', href: '/platforms/email-marketing', description: 'Campaign management & automation' },
    { name: 'Workflow Automation', href: '/platforms/workflow', description: 'Process automation tools' },
    { name: 'InoSec Core', href: '/platforms/inosec-core', description: 'Cloud security monitoring' },
    { name: 'InoSec Edge', href: '/platforms/inosec-edge', description: 'Endpoint security' },
    { name: 'InoSec One', href: '/platforms/inosec-one', description: 'Unified security dashboard' },
  ],
  ai: [
    { name: 'AI Assistant', href: '/ai/assistant', description: 'Natural language processing' },
    { name: 'ML Platform', href: '/ai/ml-platform', description: 'Custom model training' },
    { name: 'Intelligent Automation', href: '/ai/automation', description: 'Workflow intelligence' },
    { name: 'Predictive Analytics', href: '/ai/analytics', description: 'Business forecasting' },
    { name: 'AI Security', href: '/ai/security', description: 'Threat intelligence' },
  ],
  solutions: [
    { name: 'Healthcare', href: '/solutions/healthcare', description: 'HIPAA-compliant solutions' },
    { name: 'Financial Services', href: '/solutions/financial', description: 'Banking & payments security' },
    { name: 'Manufacturing', href: '/solutions/manufacturing', description: 'Industrial IoT security' },
    { name: 'Government', href: '/solutions/government', description: 'Public sector security' },
    { name: 'Education', href: '/solutions/education', description: 'Campus & student data protection' },
    { name: 'Retail', href: '/solutions/retail', description: 'E-commerce security' },
  ],
  resources: [
    { name: 'Blog', href: '/resources/blog', description: 'Latest insights & updates' },
    { name: 'Documentation', href: '/resources/docs', description: 'Technical guides' },
    { name: 'Whitepapers', href: '/resources/whitepapers', description: 'Security research' },
    { name: 'Case Studies', href: '/resources/case-studies', description: 'Customer success stories' },
    { name: 'Webinars', href: '/resources/webinars', description: 'Live & on-demand sessions' },
    { name: 'Events', href: '/resources/events', description: 'Conferences & workshops' },
  ],
  company: [
    { name: 'About Us', href: '/company/about', description: 'Our story & mission' },
    { name: 'Leadership', href: '/company/leadership', description: 'Executive team' },
    { name: 'Careers', href: '/company/careers', description: 'Join our team' },
    { name: 'News & Press', href: '/company/news', description: 'Latest announcements' },
    { name: 'Partners', href: '/company/partners', description: 'Technology partners' },
    { name: 'Contact', href: '/company/contact', description: 'Get in touch' },
  ],
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { theme, toggleTheme } = useTheme()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (activeDropdown && !target.closest(`[data-dropdown="${activeDropdown}"]`)) {
        setActiveDropdown(null)
      }
    }

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeDropdown])

  // Handle ESC key to close dropdowns/menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(dropdown)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const isActivePath = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const isActiveSection = (section: keyof typeof navigation) => {
    return navigation[section].some(item => isActivePath(item.href))
  }

  return (
    <header className="fixed z-50 top-4 sm:top-5 lg:top-6 left-0 right-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <nav
          className={`
            relative rounded-2xl transition-all duration-500
            bg-white/90 dark:bg-gray-900/90
            backdrop-blur-xl
            border border-gray-200/50 dark:border-gray-700/50
            ${isScrolled ? 'shadow-lg' : 'shadow-md'}
          `}
          aria-label="Main navigation"
        >
        <div className="flex justify-between items-center h-16 lg:h-[72px] px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center group"
              aria-label="Inopsio home"
            >
              <img src="/inopsio-logo.svg" alt="Inopsio Logo" className="h-8 w-auto sm:h-9 lg:h-10 group-hover:scale-105 transition-transform duration-300" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1 xl:gap-2 flex-1 justify-center max-w-3xl mx-4 xl:mx-8">

            {/* Platforms Dropdown */}
            <div
              className="relative"
              data-dropdown="platforms"
              onMouseEnter={() => handleMouseEnter('platforms')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleDropdownToggle('platforms')}
                className={`
                  flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg
                  transition-all duration-200 whitespace-nowrap
                  ${isActiveSection('platforms')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
                aria-expanded={activeDropdown === 'platforms'}
                aria-haspopup="true"
              >
                Platforms
                <ChevronDownIcon
                  className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'platforms' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'platforms' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-xl shadow-xl py-2 z-50
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700"
                  role="menu"
                >
                  {navigation.platforms.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mt-0.5">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* AI & Automation Dropdown */}
            <div
              className="relative"
              data-dropdown="ai"
              onMouseEnter={() => handleMouseEnter('ai')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleDropdownToggle('ai')}
                className={`
                  flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg
                  transition-all duration-200 whitespace-nowrap
                  ${isActiveSection('ai')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
                aria-expanded={activeDropdown === 'ai'}
                aria-haspopup="true"
              >
                <span className="hidden xl:inline">AI & Automation</span>
                <span className="xl:hidden">AI & Auto</span>
                <ChevronDownIcon
                  className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'ai' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'ai' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-xl shadow-xl py-2 z-50
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700"
                  role="menu"
                >
                  {navigation.ai.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mt-0.5">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              data-dropdown="solutions"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleDropdownToggle('solutions')}
                className={`
                  flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg
                  transition-all duration-200 whitespace-nowrap
                  ${isActiveSection('solutions')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
                aria-expanded={activeDropdown === 'solutions'}
                aria-haspopup="true"
              >
                Solutions
                <ChevronDownIcon
                  className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'solutions' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'solutions' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-xl shadow-xl py-2 z-50
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700"
                  role="menu"
                >
                  {navigation.solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mt-0.5">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              data-dropdown="resources"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleDropdownToggle('resources')}
                className={`
                  flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg
                  transition-all duration-200 whitespace-nowrap
                  ${isActiveSection('resources')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
                aria-expanded={activeDropdown === 'resources'}
                aria-haspopup="true"
              >
                Resources
                <ChevronDownIcon
                  className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'resources' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'resources' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-xl shadow-xl py-2 z-50
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700"
                  role="menu"
                >
                  {navigation.resources.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mt-0.5">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative"
              data-dropdown="company"
              onMouseEnter={() => handleMouseEnter('company')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleDropdownToggle('company')}
                className={`
                  flex items-center px-3 py-2.5 text-sm font-semibold rounded-lg
                  transition-all duration-200 whitespace-nowrap
                  ${isActiveSection('company')
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
                aria-expanded={activeDropdown === 'company'}
                aria-haspopup="true"
              >
                Company
                <ChevronDownIcon
                  className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'company' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {activeDropdown === 'company' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-xl shadow-xl py-2 z-50
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700"
                  role="menu"
                >
                  {navigation.company.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mt-0.5">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:gap-2 xl:gap-3 flex-shrink-0">

            {/* Search Button */}
            <button
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* User Icon - Login/Register */}
            <button
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
              aria-label="User account"
            >
              <UserIcon className="w-5 h-5" />
            </button>

            {/* CTA Button */}
            <Link
              href="/demo"
              className="
                inline-flex items-center gap-2
                px-4 xl:px-5 py-2.5
                bg-primary-600 hover:bg-primary-700
                dark:bg-primary-500 dark:hover:bg-primary-600
                text-white font-semibold text-sm
                rounded-lg
                transition-all duration-200
                shadow-md hover:shadow-lg
                hover:scale-105
              "
            >
              <span>Request Demo</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Slide-down panel */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className="border-t border-gray-200 dark:border-gray-700 max-h-[75vh] overflow-y-auto
            bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg"
          >
            <div className="px-4 py-4 space-y-1">

              {/* Platforms Section */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200/50 dark:border-gray-700/50">
                  Platforms
                </div>
                {navigation.platforms.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                    `}
                  >
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* AI & Automation Section */}
              <div className="space-y-1 pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200/50 dark:border-gray-700/50">
                  AI & Automation
                </div>
                {navigation.ai.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                    `}
                  >
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* Solutions Section */}
              <div className="space-y-1 pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200/50 dark:border-gray-700/50">
                  Solutions
                </div>
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                    `}
                  >
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* Resources Section */}
              <div className="space-y-1 pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200/50 dark:border-gray-700/50">
                  Resources
                </div>
                {navigation.resources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                    `}
                  >
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* Company Section */}
              <div className="space-y-1 pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200/50 dark:border-gray-700/50">
                  Company
                </div>
                {navigation.company.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                      }
                    `}
                  >
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 pb-2">
                <Link
                  href="/demo"
                  className="flex items-center justify-center w-full px-6 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 gap-2"
                >
                  Request Demo
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        </nav>
      </div>
    </header>
  )
}
