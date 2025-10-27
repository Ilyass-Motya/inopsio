'use client'

import { useTheme } from '../providers/ThemeProvider'
import { ThemeToggleButton } from './shadcn-io/theme-toggle-button'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <ThemeToggleButton
      theme={theme}
      onClick={toggleTheme}
      variant="circle-blur"
      start="center"
    />
  )
}
