'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  InformationCircleIcon,
  UsersIcon,
  BriefcaseIcon,
  NewspaperIcon,
  UserGroupIcon,
  PhoneIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface CompanyMegaMenuProps {
  isActivePath: (href: string) => boolean
  isDark: boolean
  offset?: number
}

export default function CompanyMegaMenu({ isActivePath, isDark, offset: _offset = 0 }: CompanyMegaMenuProps) {
  const about = [
    { 
      name: 'About Us', 
      href: '/company/about', 
      description: 'Our story, mission, and vision',
      icon: InformationCircleIcon 
    },
    { 
      name: 'Leadership', 
      href: '/company/leadership', 
      description: 'Meet our executive team',
      icon: UsersIcon 
    },
  ]

  const connect = [
    { 
      name: 'Partners', 
      href: '/company/partners', 
      description: 'Technology partners and alliances',
      icon: UserGroupIcon 
    },
    { 
      name: 'Contact', 
      href: '/contact', 
      description: 'Get in touch with our team',
      icon: PhoneIcon 
    },
    { 
      name: 'Careers', 
      href: '/company/careers', 
      description: 'Join our growing team',
      icon: BriefcaseIcon 
    },
    { 
      name: 'News & Press', 
      href: '/company/news', 
      description: 'Latest announcements and updates',
      icon: NewspaperIcon 
    },
  ]

  return (
    <div
      className={`mt-3 w-[900px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl
        border border-gray-200/50 dark:border-gray-700/50`}
      style={{
        background: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
      role="menu"
    >
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Section - About */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                About
              </h3>
            </div>
            <div className="space-y-2">
              {about.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-start gap-3 p-3 rounded-xl
                      transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/30 ring-1 ring-primary-200 dark:ring-primary-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }
                    `}
                    role="menuitem"
                  >
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                      ${isActivePath(item.href)
                        ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                      }
                      transition-all duration-200
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`
                        font-semibold text-sm mb-0.5
                        ${isActivePath(item.href)
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                        }
                      `}>
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Middle Section - Connect */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Connect
              </h3>
            </div>
            <div className="space-y-2">
              {connect.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-start gap-3 p-3 rounded-xl
                      transition-all duration-200
                      ${isActivePath(item.href)
                        ? 'bg-primary-50 dark:bg-primary-900/30 ring-1 ring-primary-200 dark:ring-primary-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }
                    `}
                    role="menuitem"
                  >
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center
                      ${isActivePath(item.href)
                        ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                      }
                      transition-all duration-200
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`
                        font-semibold text-sm mb-0.5
                        ${isActivePath(item.href)
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                        }
                      `}>
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right Section - Threat Report */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Latest Report
              </h3>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 border border-purple-100 dark:border-purple-800/50">
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-white dark:bg-gray-800">
                <Image
                  src="/images/threat-report-book.png"
                  alt="Threat Report: Software Under Siege 2025"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <Link
                href="/resources/whitepapers"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5
                  bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800
                  dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700
                  text-white font-semibold text-sm rounded-lg
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              >
                Download Report
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
