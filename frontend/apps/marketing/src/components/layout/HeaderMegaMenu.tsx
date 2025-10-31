import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface MegaMenuItem {
  name: string
  href: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface MegaMenuProps {
  items: MegaMenuItem[]
  cta: {
    text: string
    href: string
    position: 'bottom' | 'right'
  }
  isActivePath: (href: string) => boolean
  isDark: boolean
  columns?: 1 | 2
}

export default function MegaMenu({ items, cta, isActivePath, isDark, columns = 2 }: MegaMenuProps) {
  const gridCols = columns === 2 ? 'grid-cols-2' : 'grid-cols-1'
  const showCTARight = cta.position === 'right' && columns === 2
  const menuWidth = columns === 2 ? 'w-[600px]' : 'w-[400px]'

  return (
    <div
      className={`absolute top-full left-0 mt-3 ${menuWidth} rounded-2xl shadow-2xl z-50
        border border-gray-200/50 dark:border-gray-700/50`}
      style={{
        background: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      role="menu"
    >
      <div className="p-4">
        {showCTARight ? (
          <div className="flex gap-4">
            {/* Items Grid */}
            <div className={`flex-1 grid ${gridCols} gap-2`}>
              {items.map((item) => {
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

            {/* CTA on Right */}
            <div className="flex items-center">
              <Link
                href={cta.href}
                className="flex flex-col items-center justify-center gap-3 px-6 py-8
                  bg-gradient-to-br from-primary-600 to-primary-700
                  dark:from-primary-500 dark:to-primary-600
                  text-white font-semibold text-sm rounded-xl
                  transition-all duration-200 hover:scale-105 hover:shadow-xl
                  min-w-[140px]"
              >
                <ArrowRightIcon className="w-6 h-6" />
                <span className="text-center leading-tight">{cta.text}</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Items Grid */}
            <div className={`grid ${gridCols} gap-2`}>
              {items.map((item) => {
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

            {/* CTA at Bottom */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Link
                href={cta.href}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5
                  bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600
                  text-white font-semibold text-sm rounded-lg
                  transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
              >
                {cta.text}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
