'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MegaMenu from './HeaderMegaMenu'
import HeaderSearchModal from './HeaderSearchModal'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
  ServerIcon,
  CloudArrowUpIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  BoltIcon,
  CpuChipIcon,
  SparklesIcon,
  ChartBarIcon,
  LockClosedIcon,
  BuildingOffice2Icon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  BuildingStorefrontIcon,
  BookOpenIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  VideoCameraIcon,
  CalendarIcon,
  InformationCircleIcon,
  UsersIcon,
  BriefcaseIcon,
  NewspaperIcon,
  UserGroupIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

// Navigation data structure with icons and CTAs
const navigation = {
  platforms: {
    items: [
      { name: 'CRM Platform', href: '/platforms/crm', description: 'Customer relationship management', icon: UsersIcon },
      { name: 'ERP Platform', href: '/platforms/erp', description: 'Enterprise resource planning', icon: ServerIcon },
      { name: 'Email Marketing', href: '/platforms/email-marketing', description: 'Campaign management & automation', icon: EnvelopeIcon },
      { name: 'Workflow Automation', href: '/platforms/workflow', description: 'Process automation tools', icon: Cog6ToothIcon },
      { name: 'InoSec Core', href: '/platforms/inosec-core', description: 'Cloud security monitoring', icon: ShieldCheckIcon },
      { name: 'InoSec Edge', href: '/platforms/inosec-edge', description: 'Endpoint security', icon: LockClosedIcon },
      { name: 'InoSec One', href: '/platforms/inosec-one', description: 'Unified security dashboard', icon: CloudArrowUpIcon },
    ],
    cta: { text: 'View All Platforms', href: '/platforms', position: 'bottom' as const }
  },
  ai: {
    items: [
      { name: 'AI Assistant', href: '/ai/assistant', description: 'Natural language processing', icon: SparklesIcon },
      { name: 'ML Platform', href: '/ai/ml-platform', description: 'Custom model training', icon: CpuChipIcon },
      { name: 'Intelligent Automation', href: '/ai/automation', description: 'Workflow intelligence', icon: BoltIcon },
      { name: 'Predictive Analytics', href: '/ai/analytics', description: 'Business forecasting', icon: ChartBarIcon },
      { name: 'AI Security', href: '/ai/security', description: 'Threat intelligence', icon: ShieldCheckIcon },
    ],
    cta: { text: 'Explore AI Solutions', href: '/ai', position: 'bottom' as const }
  },
  solutions: {
    items: [
      { name: 'Healthcare', href: '/solutions/healthcare', description: 'HIPAA-compliant solutions', icon: BuildingOffice2Icon },
      { name: 'Financial Services', href: '/solutions/financial', description: 'Banking & payments security', icon: BanknotesIcon },
      { name: 'Manufacturing', href: '/solutions/manufacturing', description: 'Industrial IoT security', icon: WrenchScrewdriverIcon },
      { name: 'Government', href: '/solutions/government', description: 'Public sector security', icon: BuildingOffice2Icon },
      { name: 'Education', href: '/solutions/education', description: 'Campus & student data protection', icon: AcademicCapIcon },
      { name: 'Retail', href: '/solutions/retail', description: 'E-commerce security', icon: BuildingStorefrontIcon },
    ],
    cta: { text: 'View All Industries', href: '/solutions', position: 'bottom' as const }
  },
  resources: {
    items: [
      { name: 'Blog', href: '/resources/blog', description: 'Latest insights & updates', icon: BookOpenIcon },
      { name: 'Documentation', href: '/resources/docs', description: 'Technical guides', icon: DocumentTextIcon },
      { name: 'Whitepapers', href: '/resources/whitepapers', description: 'Security research', icon: PresentationChartLineIcon },
      { name: 'Case Studies', href: '/resources/case-studies', description: 'Customer success stories', icon: ChartBarIcon },
      { name: 'Webinars', href: '/resources/webinars', description: 'Live & on-demand sessions', icon: VideoCameraIcon },
      { name: 'Events', href: '/resources/events', description: 'Conferences & workshops', icon: CalendarIcon },
    ],
    cta: { text: 'Resource Center', href: '/resources', position: 'right' as const }
  },
  company: {
    items: [
      { name: 'About Us', href: '/company/about', description: 'Our story & mission', icon: InformationCircleIcon },
      { name: 'Leadership', href: '/company/leadership', description: 'Executive team', icon: UsersIcon },
      { name: 'Careers', href: '/company/careers', description: 'Join our team', icon: BriefcaseIcon },
      { name: 'News & Press', href: '/company/news', description: 'Latest announcements', icon: NewspaperIcon },
      { name: 'Partners', href: '/company/partners', description: 'Technology partners', icon: UserGroupIcon },
      { name: 'Contact', href: '/contact', description: 'Get in touch', icon: PhoneIcon },
    ],
    cta: { text: 'Contact Us', href: '/contact', position: 'right' as const }
  },
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const pathname = usePathname()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
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
    return navigation[section].items.some(item => isActivePath(item.href))
  }

  return (
    <>
      <header className="fixed z-50 top-4 sm:top-5 lg:top-6 left-0 right-0">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <nav
            className={`
              relative rounded-2xl transition-all duration-500
              border border-gray-200/50 dark:border-gray-700/50
              ${isScrolled ? 'shadow-lg shadow-black/10 dark:shadow-black/50' : 'shadow-md shadow-black/5 dark:shadow-black/30'}
            `}
            style={{
              background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
            aria-label="Main navigation"
          >
            <div className="flex justify-between items-center h-[60px] lg:h-[60px] px-4 sm:px-6 lg:px-8">

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
              <div className="hidden lg:flex lg:items-center lg:gap-2 xl:gap-3 flex-1 justify-center max-w-4xl mx-6 xl:mx-10">

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
                      flex items-center px-2.5 lg:px-3 xl:px-4 py-2.5 text-sm font-semibold rounded-lg
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
                    <MegaMenu
                      items={navigation.platforms.items}
                      cta={navigation.platforms.cta}
                      isActivePath={isActivePath}
                      isDark={isDark}
                      columns={2}
                    />
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
                      flex items-center px-2.5 lg:px-3 xl:px-4 py-2.5 text-sm font-semibold rounded-lg
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
                    <MegaMenu
                      items={navigation.ai.items}
                      cta={navigation.ai.cta}
                      isActivePath={isActivePath}
                      isDark={isDark}
                      columns={1}
                    />
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
                      flex items-center px-2.5 lg:px-3 xl:px-4 py-2.5 text-sm font-semibold rounded-lg
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
                    <MegaMenu
                      items={navigation.solutions.items}
                      cta={navigation.solutions.cta}
                      isActivePath={isActivePath}
                      isDark={isDark}
                      columns={2}
                    />
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
                      flex items-center px-2.5 lg:px-3 xl:px-4 py-2.5 text-sm font-semibold rounded-lg
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
                    <MegaMenu
                      items={navigation.resources.items}
                      cta={navigation.resources.cta}
                      isActivePath={isActivePath}
                      isDark={isDark}
                      columns={2}
                    />
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
                      flex items-center px-2.5 lg:px-3 xl:px-4 py-2.5 text-sm font-semibold rounded-lg
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
                    <MegaMenu
                      items={navigation.company.items}
                      cta={navigation.company.cta}
                      isActivePath={isActivePath}
                      isDark={isDark}
                      columns={2}
                    />
                  )}
                </div>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex lg:items-center lg:gap-1.5 xl:gap-2.5 flex-shrink-0">

                {/* Search Button */}
                <button
                  onClick={() => setIsSearchModalOpen(true)}
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
                    inline-flex items-center gap-1.5
                    px-3 py-2
                    bg-primary-600 hover:bg-primary-700
                    dark:bg-primary-500 dark:hover:bg-primary-600
                    text-white font-semibold text-sm
                    rounded-lg
                    transition-all duration-200
                    shadow-md hover:shadow-lg
                    hover:scale-105
                  "
                >
                  <span className="hidden xl:inline">Request Demo</span>
                  <span className="xl:hidden">Demo</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
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
                    {navigation.platforms.items.map((item) => (
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
                    {navigation.ai.items.map((item) => (
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
                    {navigation.solutions.items.map((item) => (
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
                    {navigation.resources.items.map((item) => (
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
                    {navigation.company.items.map((item) => (
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
                      <ArrowUpRightIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <HeaderSearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  )
}
