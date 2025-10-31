import Header from '@/components/layout/Header'

export default function MLPlatformPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      <Header />

      <main className="pt-20">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ML Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              I'm working on this page. Content coming soon!
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-blue-800 dark:text-blue-200">
                This page is under development. Please check back later for updates.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
