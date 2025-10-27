'use client'

import {
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ServerIcon,
  LockClosedIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

interface ComplianceBadgeProps {
  type: string
  status: 'achieved' | 'in-progress' | 'planned'
  className?: string
}

export default function ComplianceBadge({ type, status, className = '' }: ComplianceBadgeProps) {
  // Icon mapping
  const getIcon = () => {
    if (type.includes('M-Law') || type.includes('CNDP')) return DocumentTextIcon
    if (type.includes('GDPR')) return GlobeAltIcon
    if (type.includes('ISO 27001')) return ShieldCheckIcon
    if (type.includes('SOC 2')) return ServerIcon
    if (type.includes('ISO 27701')) return LockClosedIcon
    if (type.includes('ISO 22301')) return ArrowPathIcon
    return ShieldCheckIcon
  }

  // Status icon (override for achieved/in-progress)
  const getStatusIcon = () => {
    if (status === 'achieved') return CheckCircleIcon
    if (status === 'in-progress') return ClockIcon
    return getIcon()
  }

  // Status text
  const getStatusText = () => {
    if (type.includes('GDPR')) {
      if (status === 'achieved') return 'Compliant'
      if (status === 'in-progress') return 'In Progress'
      return 'Planned'
    }
    if (status === 'achieved') return 'Certified'
    if (status === 'in-progress') return 'In Progress'
    return 'Planned'
  }

  // Color scheme based on status
  const colors = {
    achieved: {
      iconBg: 'bg-emerald-600 dark:bg-emerald-500',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-700/50',
    },
    'in-progress': {
      iconBg: 'bg-amber-600 dark:bg-amber-500',
      textColor: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-200 dark:border-amber-700/50',
    },
    planned: {
      iconBg: 'bg-slate-500 dark:bg-slate-600',
      textColor: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-700/50',
    },
  }[status]

  const Icon = getStatusIcon()

  return (
    <div
      className={`
        inline-flex items-stretch
        rounded-lg
        border ${colors.border}
        bg-white dark:bg-gray-800
        shadow-sm hover:shadow-md
        transition-all duration-300 ease-out
        hover:-translate-y-0.5
        overflow-hidden
        ${className}
      `}
    >
      {/* Icon Box */}
      <div className={`
        flex items-center justify-center
        px-3 py-2.5
        ${colors.iconBg}
      `}>
        <Icon className="w-5 h-5 text-white" />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center px-3 py-2 min-w-[100px]">
        <span className={`text-xs font-bold leading-tight ${colors.textColor}`}>
          {type}
        </span>
        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide leading-tight mt-0.5">
          {getStatusText()}
        </span>
      </div>
    </div>
  )
}
