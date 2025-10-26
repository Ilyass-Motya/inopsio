'use client'

import { useTheme } from '../providers/ThemeProvider'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-1 rounded-full transition-all duration-300 ease-in-out"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-16 h-8 rounded-full overflow-hidden transition-all duration-500 ease-in-out">
        {/* Background with sky theme */}
        <div className={`absolute inset-0 transition-all duration-500 ease-in-out ${
          theme === 'light' 
            ? 'bg-gradient-to-r from-blue-300 to-blue-400' 
            : 'bg-gradient-to-r from-purple-900 to-indigo-900'
        }`}>
          {/* Day sky clouds */}
          {theme === 'light' && (
            <>
              <div className="absolute top-1 left-2 w-3 h-2 bg-white/80 rounded-full blur-sm"></div>
              <div className="absolute top-2 left-4 w-2 h-1.5 bg-white/60 rounded-full blur-sm"></div>
              <div className="absolute top-1.5 right-3 w-2.5 h-1.5 bg-white/70 rounded-full blur-sm"></div>
              <div className="absolute top-2.5 right-1 w-2 h-1 bg-white/50 rounded-full blur-sm"></div>
            </>
          )}
          
          {/* Night sky stars */}
          {theme === 'dark' && (
            <>
              <div className="absolute top-1 left-3 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute top-2 left-6 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute top-1.5 right-4 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute top-3 right-2 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute top-2.5 left-8 w-0.5 h-0.5 bg-white rounded-full"></div>
              <div className="absolute top-1 right-6 w-0.5 h-0.5 bg-white rounded-full"></div>
            </>
          )}
        </div>
        
        {/* Toggle handle */}
        <div className={`absolute top-1 transition-all duration-500 ease-in-out transform ${
          theme === 'light' ? 'translate-x-8' : 'translate-x-1'
        } w-6 h-6 rounded-full shadow-lg`}>
          {/* Sun/Moon icon */}
          <div className="w-full h-full rounded-full flex items-center justify-center">
            {theme === 'light' ? (
              // Sun
              <div className="w-4 h-4 bg-yellow-400 rounded-full relative">
                <div className="absolute -top-1 -left-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                <div className="absolute -top-1 left-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                <div className="absolute -top-1 right-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-1 -left-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                <div className="absolute -bottom-1 left-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                <div className="absolute -bottom-1 right-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
                <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full"></div>
              </div>
            ) : (
              // Moon
              <div className="w-4 h-4 bg-gray-200 rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-2 h-2 bg-purple-900 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
