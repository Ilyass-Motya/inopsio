'use client'

export default function FooterCTA() {
  return (
    <section className="relative overflow-hidden rounded-2xl min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/integration-preview.png')`,
        }}
      >
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-blue-900 to-indigo-900"></div>
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/75 to-slate-900/85 dark:from-slate-900/90 dark:via-slate-800/85 dark:to-slate-900/90"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Headline and Description */}
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Scale without limits
            </h2>
            <p className="text-lg sm:text-xl text-slate-200 dark:text-slate-300 leading-relaxed">
              Find the right solution for your enterprise, get started in minutes with our intelligent platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

