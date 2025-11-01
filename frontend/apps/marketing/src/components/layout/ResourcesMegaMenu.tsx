'use client'

import Link from 'next/link'
import { 
  BookOpenIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  ChartBarIcon,
  VideoCameraIcon,
  CalendarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface ResourcesMegaMenuProps {
  isActivePath: (href: string) => boolean
  isDark: boolean
  offset?: number
}

export default function ResourcesMegaMenu({ isActivePath, isDark, offset: _offset = 0 }: ResourcesMegaMenuProps) {
  const learn = [
    { 
      name: 'Blog', 
      href: '/resources/blog', 
      description: 'Latest insights, updates, and industry news',
      icon: BookOpenIcon 
    },
    { 
      name: 'Documentation', 
      href: '/resources/docs', 
      description: 'Technical guides and API references',
      icon: DocumentTextIcon 
    },
  ]

  const researchInsights = [
    { 
      name: 'Whitepapers', 
      href: '/resources/whitepapers', 
      description: 'Security research and deep-dive analysis',
      icon: PresentationChartLineIcon 
    },
    { 
      name: 'Case Studies', 
      href: '/resources/case-studies', 
      description: 'Customer success stories and implementations',
      icon: ChartBarIcon 
    },
  ]

  const eventsTraining = [
    { 
      name: 'Webinars', 
      href: '/resources/webinars', 
      description: 'Live & on-demand training sessions',
      icon: VideoCameraIcon 
    },
    { 
      name: 'Events', 
      href: '/resources/events', 
      description: 'Conferences, workshops, and meetups',
      icon: CalendarIcon 
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
          
          {/* Left Section - Learn */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Learn
              </h3>
            </div>
            <div className="space-y-2">
              {learn.map((item) => {
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

          {/* Middle Section - Research & Insights */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Research & Insights
              </h3>
            </div>
            <div className="space-y-2">
              {researchInsights.map((item) => {
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

          {/* Right Section - Events & Training */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Events & Training
              </h3>
            </div>
            <div className="space-y-2">
              {eventsTraining.map((item) => {
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
              Access comprehensive resources to help you succeed. Explore our complete resource library.
            </p>
            <Link
              href="/resources"
              className="flex items-center gap-1.5 flex-shrink-0 px-4 py-2
                bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800
                dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700
                text-white font-semibold text-sm rounded-lg
                transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              Resource Center
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
