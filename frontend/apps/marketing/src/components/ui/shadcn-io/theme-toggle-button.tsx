'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface ThemeToggleButtonProps {
  theme: 'light' | 'dark'
  onClick: () => void
  variant?: 'circle' | 'circle-blur' | 'polygon' | 'gif'
  start?: 'center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  url?: string
  className?: string
}

export function ThemeToggleButton({
  theme,
  onClick,
  variant = 'circle',
  start = 'center',
  url,
  className,
}: ThemeToggleButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextTheme, setNextTheme] = useState<'light' | 'dark'>(theme)

  const handleClick = () => {
    setNextTheme(theme === 'light' ? 'dark' : 'light')
    setIsAnimating(true)
    setTimeout(() => {
      onClick()
      setIsAnimating(false)
    }, 300)
  }

  // Get animation origin based on start prop
  const getOriginPosition = () => {
    switch (start) {
      case 'top-right':
        return { top: '10%', right: '10%', bottom: 'auto', left: 'auto' }
      case 'top-left':
        return { top: '10%', left: '10%', bottom: 'auto', right: 'auto' }
      case 'bottom-right':
        return { bottom: '10%', right: '10%', top: 'auto', left: 'auto' }
      case 'bottom-left':
        return { bottom: '10%', left: '10%', top: 'auto', right: 'auto' }
      default:
        return { top: '50%', left: '50%', bottom: 'auto', right: 'auto' }
    }
  }

  const originPos = getOriginPosition()

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 overflow-hidden',
        'border border-slate-200 dark:border-slate-700',
        'shadow-sm hover:shadow-md',
        className
      )}
      aria-label={`Switch to ${nextTheme} mode`}
    >
      {/* Background with current theme */}
      <div
        className={cn(
          'absolute inset-0 transition-colors duration-300',
          theme === 'light' ? 'bg-slate-50' : 'bg-slate-800'
        )}
      />

      {/* Animation layer - expanding circle with blur */}
      {isAnimating && (
        <div
          className={cn(
            'absolute rounded-full transition-all duration-500',
            variant === 'circle-blur'
              ? 'backdrop-blur-xl opacity-70'
              : variant === 'circle'
              ? ''
              : ''
          )}
          style={{
            width: isAnimating ? '200%' : '0%',
            height: isAnimating ? '200%' : '0%',
            ...originPos,
            transform: 'translate(-50%, -50%)',
            backgroundColor: nextTheme === 'dark' ? '#1e293b' : '#f8fafc',
            filter: variant === 'circle-blur' ? 'blur(20px)' : 'none',
          }}
        />
      )}

      {/* Icons */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Sun icon */}
        <svg
          className={cn(
            'absolute w-5 h-5 text-amber-500 transition-all duration-300',
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
          )}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            d="M12 2v2M12 18v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M18 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Moon icon */}
        <svg
          className={cn(
            'absolute w-5 h-5 text-blue-400 transition-all duration-300',
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

      {/* Glow effect */}
      <div
        className={cn(
          'absolute inset-0 rounded-full blur-xl opacity-20 transition-all duration-300',
          theme === 'light' ? 'bg-amber-300' : 'bg-blue-400'
        )}
      />
    </button>
  )
}

// Hook for theme transitions
export function useThemeTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = (callback: () => void) => {
    setIsTransitioning(true)
    callback()
    setTimeout(() => setIsTransitioning(false), 600)
  }

  return { isTransitioning, startTransition }
}

export type { ThemeToggleButtonProps }
