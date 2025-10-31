'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  ServerIcon,
  CpuChipIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  ArrowRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface HeaderSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

type CommandItem = {
  id: string
  label: string
  subtitle?: string
  icon?: React.ReactNode
  category?: string
  action?: string
}

const ShortcutKey = ({ children }: { children: React.ReactNode }) => (
  <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
    {children}
  </kbd>
)

const HeaderSearchModal: React.FC<HeaderSearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMac, setIsMac] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Detect dark mode
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    setIsMac(/Mac|iPod|iPhone|iPad/.test(navigator.platform))
  }, [])

  const recentSearches: CommandItem[] = useMemo(() => ([
    { id: 'r1', label: 'InoSec Core Platform', subtitle: 'Cloud security monitoring', icon: <ShieldCheckIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />, category: 'Platform' },
    { id: 'r2', label: 'Security Analytics Dashboard', subtitle: 'Real-time threat intelligence', icon: <ChartBarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />, category: 'Analytics' },
    { id: 'r3', label: 'API Documentation', subtitle: 'Developer resources', icon: <DocumentTextIcon className="w-5 h-5 text-green-600 dark:text-green-400" />, category: 'Docs' },
  ]), [])

  const quickActions: CommandItem[] = useMemo(() => ([
    { id: 'a1', label: 'Request Demo', subtitle: 'Schedule a product walkthrough', icon: <VideoCameraIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />, action: '/demo' },
    { id: 'a2', label: 'Contact Support', subtitle: 'Get help from our team', icon: <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />, action: '/support' },
    { id: 'a3', label: 'Platform Status', subtitle: 'Check system health', icon: <ServerIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />, action: '/status' },
    { id: 'a4', label: 'AI Features', subtitle: 'Explore AI-powered security', icon: <CpuChipIcon className="w-5 h-5 text-pink-600 dark:text-pink-400" />, action: '/ai' },
    { id: 'a5', label: 'Settings', subtitle: 'Manage preferences', icon: <Cog6ToothIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />, action: '/settings' },
  ]), [])

  const sections: { title: string; items: CommandItem[] }[] = useMemo(() => ([
    { title: 'Recent Searches', items: recentSearches },
    { title: 'Quick Actions', items: quickActions },
  ]), [recentSearches, quickActions])

  const allItems: CommandItem[] = useMemo(() => sections.flatMap(s => s.items), [sections])
  const totalItems = allItems.length

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections
    const query = searchQuery.toLowerCase()
    return sections.map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.label.toLowerCase().includes(query) ||
        item.subtitle?.toLowerCase().includes(query)
      )
    })).filter(section => section.items.length > 0)
  }, [searchQuery, sections])

  const handleOpen = (index: number) => {
    const item = allItems[index]
    if (!item) return
    // eslint-disable-next-line no-console
    console.log('Navigate to:', item.action || item.label)
    onClose()
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, totalItems - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        handleOpen(activeIndex)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIndex, totalItems, onClose])

  useEffect(() => {
    const el = containerRef.current?.querySelector(`[data-index='${activeIndex}']`)
    if (el && 'scrollIntoView' in el) {
      (el as HTMLElement).scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-24 px-4"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {/* Enhanced Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/70"
        style={{
          backdropFilter: 'blur(12px) saturate(120%)',
          WebkitBackdropFilter: 'blur(12px) saturate(120%)',
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl overflow-hidden"
        style={{
          background: isDark ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          animation: 'slideUp 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search platforms, docs, or actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-base bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            <ShortcutKey>{isMac ? '⌘' : 'Ctrl'}</ShortcutKey>
            <ShortcutKey>K</ShortcutKey>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            aria-label="Close"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div ref={containerRef} className="max-h-[60vh] overflow-y-auto">
          {filteredSections.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <MagnifyingGlassIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            filteredSections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="py-2">
                <div className="px-4 sm:px-6 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {section.title}
                  </h3>
                </div>
                <div className="px-4 sm:px-6">
                  {section.items.map((item, idx) => {
                    const flatIndex = sections.slice(0, sectionIdx).reduce((acc, s) => acc + s.items.length, 0) + idx
                    const isActive = activeIndex === flatIndex
                    return (
                      <button
                        key={item.id}
                        data-index={flatIndex}
                        onMouseEnter={() => setActiveIndex(flatIndex)}
                        onClick={() => handleOpen(flatIndex)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-150 ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-900/30 ring-1 ring-primary-200 dark:ring-primary-800'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            isActive ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-800'
                          } transition-colors duration-150`}>
                            {item.icon}
                          </div>
                          <div className="flex flex-col items-start min-w-0">
                            <span className={`text-sm font-semibold truncate ${
                              isActive ? 'text-primary-700 dark:text-primary-300' : 'text-gray-900 dark:text-white'
                            }`}>
                              {item.label}
                            </span>
                            {item.subtitle && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {item.subtitle}
                              </span>
                            )}
                          </div>
                        </div>
                        {isActive && (
                          <ArrowRightIcon className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Hints */}
        <div className="px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-1">
                <ShortcutKey>↑</ShortcutKey>
                <ShortcutKey>↓</ShortcutKey>
              </div>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShortcutKey>↵</ShortcutKey>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShortcutKey>Esc</ShortcutKey>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderSearchModal
