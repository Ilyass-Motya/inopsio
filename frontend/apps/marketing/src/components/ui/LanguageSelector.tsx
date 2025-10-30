'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useLanguage, languages } from '../providers/LanguageProvider'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === language)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex items-center px-3 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-all duration-200 hover:shadow-md"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2">
          {currentLanguage && (
            <currentLanguage.flag className="w-4 h-3" />
          )}
          <span className="text-slate-600 dark:text-slate-300 font-medium text-sm group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200">
            {currentLanguage?.name}
          </span>
          <ChevronDownIcon 
            className={`w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
          {languages.map((lang) => {
            const FlagComponent = lang.flag
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 ${
                  language === lang.code 
                    ? 'text-primary-600 dark:text-primary-400 bg-slate-50 dark:bg-slate-700' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <FlagComponent className="w-5 h-3" />
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-primary-600 dark:text-primary-400">✓</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
