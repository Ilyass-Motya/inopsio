'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { USFlag, ESFlag, FRFlag, DEFlag, ITFlag, MAFlag } from '../ui/flags'

type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const languages = [
  { code: 'en', name: 'English', flag: USFlag },
  { code: 'es', name: 'Español', flag: ESFlag },
  { code: 'fr', name: 'Français', flag: FRFlag },
  { code: 'de', name: 'Deutsch', flag: DEFlag },
  { code: 'it', name: 'Italiano', flag: ITFlag },
  { code: 'ar', name: 'Arabic', flag: MAFlag },
] as const

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    const browserLanguage = navigator.language.split('-')[0] as Language

    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setLanguageState(savedLanguage)
    } else if (languages.some(lang => lang.code === browserLanguage)) {
      setLanguageState(browserLanguage)
    }

    setMounted(true)
  }, [])

  // Update language
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem('language', newLanguage)
    // Update document language attribute
    document.documentElement.lang = newLanguage
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export { languages }
