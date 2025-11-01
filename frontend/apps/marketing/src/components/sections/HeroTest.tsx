'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Floating metric card component
function MetricCard({
  title,
  value,
  trend,
  icon,
  delay = 0,
  badge
}: {
  title: string
  value: string
  trend?: string
  icon: React.ReactNode
  delay?: number
  badge?: string
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`
        backdrop-blur-xl bg-white/10 dark:bg-slate-900/40
        border border-white/20 dark:border-slate-700/50
        rounded-2xl p-5 shadow-2xl
        transform transition-all duration-700 ease-out
        hover:scale-105 hover:bg-white/15 hover:shadow-blue-500/20
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
          {icon}
        </div>
        {badge && (
          <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-slate-300 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {trend && (
          <p className="text-xs text-green-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            {trend}
          </p>
        )}
      </div>
    </div>
  )
}

// Dashboard preview component
function DashboardPreview() {
  return (
    <div className="relative w-full h-full">
      {/* Main dashboard mockup */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        {/* Dashboard header */}
        <div className="bg-slate-800/50 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs text-slate-400 font-medium">Live</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 space-y-4">
          {/* Title bar */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gradient-to-r from-slate-700 to-slate-600 rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-slate-700/50 rounded"></div>
            </div>
            <div className="h-10 w-10 bg-blue-500/20 rounded-lg"></div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                <div className="h-2 w-16 bg-slate-600 rounded mb-3"></div>
                <div className="h-6 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
              </div>
            ))}
          </div>

          {/* Chart area */}
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
            <div className="h-32 flex items-end gap-2">
              {[40, 70, 45, 80, 60, 95, 75, 85, 65, 90, 70, 100].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t opacity-60 hover:opacity-100 transition-opacity"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Activity list */}
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800/30 rounded-lg p-3 border border-slate-700/20">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 bg-slate-600 rounded w-3/4"></div>
                  <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                </div>
                <div className="h-6 w-16 bg-green-500/20 rounded text-xs"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating metric cards - positioned absolutely */}
      <div className="absolute -right-8 top-8 w-64">
        <MetricCard
          title="Threats Blocked Today"
          value="2,847"
          trend="+12% vs yesterday"
          badge="LIVE"
          delay={200}
          icon={
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </div>

      <div className="absolute -right-4 top-52 w-56">
        <MetricCard
          title="System Uptime"
          value="99.99%"
          trend="Last 30 days"
          delay={400}
          icon={
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      <div className="absolute -left-8 bottom-20 w-60">
        <MetricCard
          title="Active Integrations"
          value="47"
          trend="+3 this week"
          delay={600}
          icon={
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
      </div>
    </div>
  )
}

export default function HeroTest() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      {/* Hero Container with Border - Matches Header Pill */}
      <div className="fixed inset-0 top-4 z-0">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-full">
          <div className="relative h-full rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        {/* Main content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-20">

            {/* Left side - Content */}
            <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Next-Gen Enterprise Security Platform
                </span>
              </div>

              {/* Main headline */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="text-white">
                    Unify, Automate,
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                    and Secure
                  </span>
                  <br />
                  <span className="text-white">
                    Your Enterprise
                  </span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                  Make technology your competitive edge. Inopsio empowers enterprises with intelligent security systems, real-time threat detection, and seamless integrations.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/demo"
                  className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 rounded-xl shadow-xl hover:shadow-blue-500/50 transform hover:scale-105 hover:-translate-y-1"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Watch Demo
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 rounded-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Sales
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-300 font-medium">SOC 2 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-300 font-medium">ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-300 font-medium">GDPR Compliant</span>
                </div>
              </div>
            </div>

            {/* Right side - Dashboard preview */}
            <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <DashboardPreview />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-slate-400 font-medium">Scroll to explore</span>
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
          </div>
        </div>
      </div>


      {/* Add custom animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 20s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  )
}
