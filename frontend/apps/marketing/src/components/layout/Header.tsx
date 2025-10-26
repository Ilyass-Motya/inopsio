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
  const timeoutRef = useRef<NodeJS.Timeout>()
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
    <header
      className="fixed z-50 transition-all duration-500 rounded-2xl
        top-4 left-4 right-4
        sm:top-5 sm:left-6 sm:right-6
        lg:top-6 lg:left-8 lg:right-8
        xl:top-8 xl:left-12 xl:right-12"
      style={{
        backdropFilter: isScrolled ? 'blur(30px) saturate(200%)' : 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: isScrolled ? 'blur(30px) saturate(200%)' : 'blur(20px) saturate(150%)',
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isScrolled
          ? '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          : '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <nav className="relative" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16 lg:h-20 px-4 lg:px-6">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center group rounded-lg"
              aria-label="Inopsio home"
            >
              <div className="h-9 w-9 lg:h-10 lg:w-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-xl flex items-center justify-center group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 shadow-md">
                <span className="text-white font-bold text-base lg:text-lg font-sansation">I</span>
              </div>
              <span className="ml-3 text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-sansation group-hover:from-primary-600 group-hover:to-blue-600 transition-all duration-300">
                Inopsio
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2 flex-1 justify-center max-w-3xl mx-4 xl:mx-8">

            {/* Platforms Dropdown */}
            <div
              className="relative"
              data-dropdown="platforms"
              onMouseEnter={() => handleMouseEnter('platforms')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleDropdownToggle('platforms')}
                className={`flex items-center px-2 xl:px-3 py-2.5 text-sm xl:text-base font-medium rounded-lg transition-all duration-200 hover:bg-white/40 whitespace-nowrap
                  ${isActiveSection('platforms')
                    ? 'text-primary-600 bg-white/30'
                    : 'text-gray-700 hover:text-primary-600'
                  }
                `}
                aria-expanded={activeDropdown === 'platforms'}
                aria-haspopup="true"
                aria-label="Platforms menu"
              >
                Platforms
                <ChevronDownIcon
                  className={`ml-1 h-3 w-3 xl:ml-1.5 xl:h-4 xl:w-4 transition-transform duration-200 ${
                    activeDropdown === 'platforms' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {activeDropdown === 'platforms' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-2xl shadow-2xl py-2 opacity-100 transform translate-y-0 transition-all duration-200 ease-out z-50"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  role="menu"
                  aria-orientation="vertical"
                >
                  {navigation.platforms.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600 mt-0.5">
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
                className={`flex items-center px-2 xl:px-3 py-2.5 text-sm xl:text-base font-medium rounded-lg transition-all duration-200 hover:bg-white/40 whitespace-nowrap
                  ${isActiveSection('ai')
                    ? 'text-primary-600 bg-white/30'
                    : 'text-gray-700 hover:text-primary-600'
                  }
                `}
                aria-expanded={activeDropdown === 'ai'}
                aria-haspopup="true"
                aria-label="AI and automation menu"
              >
                <span className="hidden xl:inline">AI & Automation</span>
                <span className="xl:hidden">AI & Auto</span>
                <ChevronDownIcon
                  className={`ml-1 h-3 w-3 xl:ml-1.5 xl:h-4 xl:w-4 transition-transform duration-200 ${
                    activeDropdown === 'ai' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {activeDropdown === 'ai' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-2xl shadow-2xl py-2 opacity-100 transform translate-y-0 transition-all duration-200 ease-out z-50"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  role="menu"
                >
                  {navigation.ai.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600 mt-0.5">
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
                className={`flex items-center px-2 xl:px-3 py-2.5 text-sm xl:text-base font-medium rounded-lg transition-all duration-200 hover:bg-white/40 whitespace-nowrap
                  ${isActiveSection('solutions')
                    ? 'text-primary-600 bg-white/30'
                    : 'text-gray-700 hover:text-primary-600'
                  }
                `}
                aria-expanded={activeDropdown === 'solutions'}
                aria-haspopup="true"
                aria-label="Solutions menu"
              >
                Solutions
                <ChevronDownIcon
                  className={`ml-1 h-3 w-3 xl:ml-1.5 xl:h-4 xl:w-4 transition-transform duration-200 ${
                    activeDropdown === 'solutions' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {activeDropdown === 'solutions' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-2xl shadow-2xl py-2 opacity-100 transform translate-y-0 transition-all duration-200 ease-out z-50"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  role="menu"
                >
                  {navigation.solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600 mt-0.5">
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
                className={`flex items-center px-2 xl:px-3 py-2.5 text-sm xl:text-base font-medium rounded-lg transition-all duration-200 hover:bg-white/40 whitespace-nowrap
                  ${isActiveSection('resources')
                    ? 'text-primary-600 bg-white/30'
                    : 'text-gray-700 hover:text-primary-600'
                  }
                `}
                aria-expanded={activeDropdown === 'resources'}
                aria-haspopup="true"
                aria-label="Resources menu"
              >
                Resources
                <ChevronDownIcon
                  className={`ml-1 h-3 w-3 xl:ml-1.5 xl:h-4 xl:w-4 transition-transform duration-200 ${
                    activeDropdown === 'resources' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {activeDropdown === 'resources' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-2xl shadow-2xl py-2 opacity-100 transform translate-y-0 transition-all duration-200 ease-out z-50"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  role="menu"
                >
                  {navigation.resources.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600 mt-0.5">
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
                className={`flex items-center px-2 xl:px-3 py-2.5 text-sm xl:text-base font-medium rounded-lg transition-all duration-200 hover:bg-white/40 whitespace-nowrap
                  ${isActiveSection('company')
                    ? 'text-primary-600 bg-white/30'
                    : 'text-gray-700 hover:text-primary-600'
                  }
                `}
                aria-expanded={activeDropdown === 'company'}
                aria-haspopup="true"
                aria-label="Company menu"
              >
                Company
                <ChevronDownIcon
                  className={`ml-1 h-3 w-3 xl:ml-1.5 xl:h-4 xl:w-4 transition-transform duration-200 ${
                    activeDropdown === 'company' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {activeDropdown === 'company' && (
                <div
                  className="absolute top-full left-0 mt-3 w-80 rounded-2xl shadow-2xl py-2 opacity-100 transform translate-y-0 transition-all duration-200 ease-out z-50"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(30px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  role="menu"
                >
                  {navigation.company.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block px-4 py-3 text-sm rounded-lg mx-2 transition-all duration-200 group
                        ${isActivePath(item.href)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                        }
                      `}
                      role="menuitem"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600 mt-0.5">
                        {item.description}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2 flex-shrink-0">

            {/* Search Button */}
            <button
              className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 rounded-lg transition-colors duration-200"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-4 h-4 xl:w-5 xl:h-5" aria-hidden="true" />
            </button>


            {/* User Icon - Login/Register */}
            <button
              className="p-2 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 rounded-lg transition-colors duration-200"
              aria-label="User account"
            >
              <UserIcon className="w-4 h-4 xl:w-5 xl:h-5" aria-hidden="true" />
            </button>

            {/* CTA Button */}
            <Link
              href="/demo"
              className="text-white px-3 xl:px-5 py-2 xl:py-2.5 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
              style={{
                background: 'rgba(0, 72, 231, 0.9)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 72, 231, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)'
              }}
            >
              <span className="hidden xl:inline">Request Demo</span>
              <span className="xl:hidden">Demo</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 rounded-lg transition-colors duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
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
            className="border-t max-h-[75vh] overflow-y-auto"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(30px) saturate(200%)',
              WebkitBackdropFilter: 'blur(30px) saturate(200%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="px-4 py-4 space-y-1">

              {/* Platforms Section */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200/50">
                  Platforms
                </div>
                {navigation.platforms.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                      }
                    `}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* AI & Automation Section */}
              <div className="space-y-1 pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200/50">
                  AI & Automation
                </div>
                {navigation.ai.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                      }
                    `}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* Solutions Section */}
              <div className="space-y-1 pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200/50">
                  Solutions
                </div>
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                      }
                    `}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* Resources Section */}
              <div className="space-y-1 pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200/50">
                  Resources
                </div>
                {navigation.resources.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                      }
                    `}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* Company Section */}
              <div className="space-y-1 pt-2">
                <div className="px-3 py-2 text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-200/50">
                  Company
                </div>
                {navigation.company.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 text-sm rounded-lg transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-primary-50/50 hover:text-primary-600'
                      }
                    `}
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 pb-2">
                <Link
                  href="/demo"
                  className="flex items-center justify-center w-full px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Request Demo
                  <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
