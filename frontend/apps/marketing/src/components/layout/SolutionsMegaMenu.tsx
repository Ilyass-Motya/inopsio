'use client'

import Link from 'next/link'
import { 
  BuildingOffice2Icon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  BuildingStorefrontIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface SolutionsMegaMenuProps {
  isActivePath: (href: string) => boolean
  isDark: boolean
  offset?: number
}

export default function SolutionsMegaMenu({ isActivePath, isDark, offset = 0 }: SolutionsMegaMenuProps) {
  const healthcareEducation = [
    { 
      name: 'Healthcare', 
      href: '/solutions/healthcare', 
      description: 'HIPAA-compliant solutions and patient data protection',
      icon: BuildingOffice2Icon 
    },
    { 
      name: 'Education', 
      href: '/solutions/education', 
      description: 'Campus & student data protection and secure learning',
      icon: AcademicCapIcon 
    },
  ]

  const financialCommerce = [
    { 
      name: 'Financial Services', 
      href: '/solutions/financial', 
      description: 'Banking & payments security and compliance',
      icon: BanknotesIcon 
    },
    { 
      name: 'Retail', 
      href: '/solutions/retail', 
      description: 'E-commerce security and customer data protection',
      icon: BuildingStorefrontIcon 
    },
  ]

  const industrialPublic = [
    { 
      name: 'Manufacturing', 
      href: '/solutions/manufacturing', 
      description: 'Industrial IoT security and operational technology',
      icon: WrenchScrewdriverIcon 
    },
    { 
      name: 'Government', 
      href: '/solutions/government', 
      description: 'Public sector security and citizen data protection',
      icon: ShieldCheckIcon 
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
          
          {/* Left Section - Healthcare & Education */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Healthcare & Education
              </h3>
            </div>
            <div className="space-y-2">
              {healthcareEducation.map((item) => {
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

          {/* Middle Section - Financial & Commerce */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Financial & Commerce
              </h3>
            </div>
            <div className="space-y-2">
              {financialCommerce.map((item) => {
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

          {/* Right Section - Industrial & Public Sector */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Industrial & Public Sector
              </h3>
            </div>
            <div className="space-y-2">
              {industrialPublic.map((item) => {
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

        </div>

        {/* Bottom CTA Section */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
              Discover tailored solutions and expert guidance for your industry.
            </p>
            <Link
              href="/solutions"
              className="flex items-center gap-1.5 flex-shrink-0 px-4 py-2
                bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800
                dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700
                text-white font-semibold text-sm rounded-lg
                transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              View All Industries
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
