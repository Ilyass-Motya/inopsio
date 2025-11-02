'use client'

import { useTheme } from '../providers/ThemeProvider'

// Vertical Theme Toggle Component
function VerticalThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative flex flex-col items-center justify-center bg-white/10 dark:bg-slate-900/40 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-lg p-2 transition-all duration-300 hover:bg-white/20 dark:hover:bg-slate-800/60 hover:shadow-lg"
      aria-label={`Switch theme (current: ${theme})`}
      style={{ width: '48px', height: '120px' }}
    >
      {/* Moon icon - Top (Dark mode) */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
          theme === 'dark' ? 'bg-slate-700/50' : 'bg-transparent'
        }`}
      >
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${
            theme === 'dark' ? 'text-blue-300' : 'text-slate-400'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* System icon - Middle */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
          theme === 'system' ? 'bg-blue-500/30' : 'bg-transparent'
        }`}
      >
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${
            theme === 'system' ? 'text-blue-400' : 'text-slate-400'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Sun icon - Bottom (Light mode) */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
          theme === 'light' ? 'bg-yellow-400/30' : 'bg-transparent'
        }`}
      >
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${
            theme === 'light' ? 'text-yellow-400' : 'text-slate-400'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      </div>
    </button>
  )
}

// Vertical Scroll Indicator Component
function VerticalScrollIndicator() {
  const scrollToExplore = () => {
    // Scroll down by viewport height to explore more content
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={scrollToExplore}
        className="flex flex-col items-center text-slate-400 hover:text-slate-300 dark:text-slate-500 dark:hover:text-slate-400 transition-colors duration-200 cursor-pointer group"
      >
        <div className="h-12 w-0.5 bg-slate-400 dark:bg-slate-600 group-hover:bg-slate-300 dark:group-hover:bg-slate-500 transition-colors duration-200" style={{ marginBottom: '2rem' }}></div>
        <span
          className="text-xs font-medium whitespace-nowrap"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            letterSpacing: '0.05em',
            marginTop: '1rem'
          }}
        >
          Scroll to explore
        </span>
      </button>
    </div>
  )
}

// Main Floating Controls Component
export default function FloatingControls() {
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-6">
      <VerticalThemeToggle />
      <VerticalScrollIndicator />
    </div>
  )
}
