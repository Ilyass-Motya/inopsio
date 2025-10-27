'use client'

import { useTheme } from '../providers/ThemeProvider'
import { cn } from '@/lib/utils'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative group inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Soft circle blur background */}
      <div className="absolute inset-0 rounded-full bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Main button circle */}
      <div className={cn(
        "relative z-10 w-full h-full rounded-full flex items-center justify-center transition-all duration-300",
        "bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900",
        "border border-slate-200/50 dark:border-slate-700/50",
        "shadow-sm dark:shadow-[0_0_20px_rgba(0,0,0,0.3)]",
        "hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600"
      )}>
        {/* Animated sun/moon icons */}
        <div className="relative w-5 h-5">
          {/* Sun icon */}
          <svg 
            className={cn(
              "absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300",
              theme === 'light' 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 rotate-90 scale-0'
            )}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 18v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M18 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          
          {/* Moon icon */}
          <svg 
            className={cn(
              "absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300",
              theme === 'dark' 
                ? 'opacity-100 rotate-0 scale-100' 
                : 'opacity-0 -rotate-90 scale-0'
            )}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        </div>

        {/* Glowing orb effect */}
        <div className={cn(
          "absolute inset-0 rounded-full blur-xl opacity-20 transition-all duration-300",
          theme === 'light' 
            ? 'bg-amber-300' 
            : 'bg-blue-400'
        )} />
      </div>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full scale-0 group-active:scale-150 group-active:bg-current group-active:opacity-10 transition-all duration-500" />
    </button>
  )
}
