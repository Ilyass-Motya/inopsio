'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  CloudArrowUpIcon,
  Cog6ToothIcon,
  UsersIcon,
  ServerIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface PlatformsMegaMenuProps {
  isActivePath: (href: string) => boolean
  isDark: boolean
}

export default function PlatformsMegaMenu({ isActivePath, isDark }: PlatformsMegaMenuProps) {
  const securityPlatforms = [
    { 
      name: 'Inopsio Core', 
      href: '/platforms/inosec-core', 
      description: 'Cloud security monitoring and threat detection',
      icon: ShieldCheckIcon 
    },
    { 
      name: 'Edge', 
      href: '/platforms/inosec-edge', 
      description: 'Endpoint security and device protection',
      icon: LockClosedIcon 
    },
    { 
      name: 'One', 
      href: '/platforms/inosec-one', 
      description: 'Unified security dashboard and analytics',
      icon: CloudArrowUpIcon 
    },
  ]

  const businessAutomation = [
    { 
      name: 'Workflows and Automation', 
      href: '/platforms/workflow', 
      description: 'Process automation and workflow optimization',
      icon: Cog6ToothIcon 
    },
    { 
      name: 'CRM', 
      href: '/platforms/crm', 
      description: 'Customer relationship management platform',
      icon: UsersIcon 
    },
    { 
      name: 'ERP', 
      href: '/platforms/erp', 
      description: 'Enterprise resource planning solutions',
      icon: ServerIcon 
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
          
          {/* Left Section - Cyber Security Platform */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Cyber Security Platform
              </h3>
            </div>
            <div className="space-y-2">
              {securityPlatforms.map((item) => {
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

          {/* Middle Section - Business Automation */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Business Automation
              </h3>
            </div>
            <div className="space-y-2">
              {businessAutomation.map((item) => {
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

          {/* Right Section - Integrations */}
          <div className="space-y-4">
            <div className="mb-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Integrations
              </h3>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 border border-purple-100 dark:border-purple-800/50">
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-white dark:bg-gray-800">
                <Image
                  src="/images/integration-preview.png"
                  alt="Platform Integrations Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                Connect your tools seamlessly and build powerful workflows.
              </p>
              <Link
                href="/platforms/integrations"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
              >
                View all integrations
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom CTA Section */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
              See how our platforms transform your business with a personalized demo.
            </p>
            <Link
              href="/demo"
              className="flex items-center gap-1.5 flex-shrink-0 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              Book a Demo
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
