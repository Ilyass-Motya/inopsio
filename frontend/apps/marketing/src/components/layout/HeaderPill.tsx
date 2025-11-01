'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import PlatformsMegaMenu from './PlatformsMegaMenu'
import AIMegaMenu from './AIMegaMenu'
import SolutionsMegaMenu from './SolutionsMegaMenu'
import ResourcesMegaMenu from './ResourcesMegaMenu'
import CompanyMegaMenu from './CompanyMegaMenu'

// Real navigation structure from main header
const navigation = [
  { name: 'Platforms', href: '/platforms', hasDropdown: true },
  { name: 'AI & Automation', href: '/ai', hasDropdown: true },
  { name: 'Solutions', href: '/solutions', hasDropdown: true },
  { name: 'Resources', href: '/resources', hasDropdown: true },
  { name: 'Company', href: '/company', hasDropdown: true },
]

export default function HeaderPill() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)
  const pathname = usePathname()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const platformsRef = useRef<HTMLDivElement>(null)
  const [menuOffsets, setMenuOffsets] = useState<Record<string, number>>({})

  // Calculate menu offsets to align all menus with Platforms menu
  const calculateMenuOffsets = () => {
    if (!platformsRef.current) return

    const platformsButton = platformsRef.current
    const navContainer = platformsButton.closest('nav')
    if (!navContainer) return

    const navRect = navContainer.getBoundingClientRect()
    const platformsRect = platformsButton.getBoundingClientRect()

    // Calculate the left position relative to the nav container
    const platformsLeft = platformsRect.left - navRect.left

    const offsets: Record<string, number> = {}
    const menuKeys = ['ai', 'solutions', 'resources', 'company']

    menuKeys.forEach((key) => {
      const menuButton = document.querySelector(`[data-dropdown="${key}"]`)
      if (menuButton) {
        const menuRect = menuButton.getBoundingClientRect()
        const menuLeft = menuRect.left - navRect.left
        // Offset needed to shift menu back to platforms position
        offsets[key] = menuLeft - platformsLeft
      }
    })

    setMenuOffsets(offsets)
  }

  // Detect dark mode
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Calculate menu positions on mount and resize
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateMenuOffsets()
    }, 100)
    calculateMenuOffsets()
    window.addEventListener('resize', calculateMenuOffsets)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', calculateMenuOffsets)
    }
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

  // Handle ESC key
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

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(dropdown)
    if (dropdown !== 'platforms') {
      setTimeout(calculateMenuOffsets, 10)
    }
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const isActivePath = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const isActiveSection = (section: string) => {
    return pathname.startsWith(section)
  }

  return (
    <header className="fixed z-50 top-8 left-0 right-0">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <nav
          className={`
            relative overflow-visible h-[60px] rounded-lg
            transition-all duration-300
            border border-gray-200/50 dark:border-gray-700/50
            ${isScrolled ? 'shadow-lg shadow-black/10 dark:shadow-black/50' : 'shadow-md shadow-black/5 dark:shadow-black/30'}
          `}
          style={{
            background: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
          aria-label="Main navigation"
        >
          <div className="flex justify-between items-center h-full pl-8 pr-2 relative">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-3 group"
                aria-label="Inopsio home"
              >
                {/* Inopsio Icon */}
                <Image
                  src="/inopsio-icon.png"
                  alt="Inopsio"
                  width={32}
                  height={32}
                  className="w-8 h-8 group-hover:opacity-80 transition-opacity"
                />
                <span className="text-lg text-gray-700 dark:text-gray-100 font-medium tracking-tight transition-all duration-200 uppercase">
                  Inopsio
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  data-dropdown={item.href.replace('/', '')}
                  ref={item.href === '/platforms' ? platformsRef : null}
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.href.replace('/', ''))}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-1 text-sm font-medium tracking-tight
                      transition-all duration-200 whitespace-nowrap px-3 py-2 rounded-lg
                      ${isActiveSection(item.href)
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100/50 dark:hover:bg-white/5'
                      }
                    `}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.href.replace('/', '') ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </Link>

                  {/* Mega Menu Dropdowns */}
                  {item.hasDropdown && activeDropdown === item.href.replace('/', '') && (
                    <div
                      className="absolute left-0 top-full z-50"
                      style={{
                        transform: item.href === '/platforms'
                          ? 'none'
                          : `translateX(-${menuOffsets[item.href.replace('/', '')] || 0}px)`
                      }}
                    >
                      {item.href === '/platforms' && (
                        <PlatformsMegaMenu isActivePath={isActivePath} isDark={isDark} />
                      )}
                      {item.href === '/ai' && (
                        <AIMegaMenu isActivePath={isActivePath} isDark={isDark} />
                      )}
                      {item.href === '/solutions' && (
                        <SolutionsMegaMenu isActivePath={isActivePath} isDark={isDark} />
                      )}
                      {item.href === '/resources' && (
                        <ResourcesMegaMenu isActivePath={isActivePath} isDark={isDark} />
                      )}
                      {item.href === '/company' && (
                        <CompanyMegaMenu isActivePath={isActivePath} isDark={isDark} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm transition-all duration-200 hover:shadow-lg rounded-lg h-11 px-6 my-2 mr-2"
              >
                Book a Demo
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-full hover:bg-gray-100/50 dark:hover:bg-white/5"
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
              isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    block px-4 py-3 text-sm rounded-full transition-all duration-200
                    ${isActivePath(item.href)
                      ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4">
                <Link
                  href="/demo"
                  className="flex items-center justify-center w-full px-6 py-3.5 text-base font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg transition-all duration-200"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
