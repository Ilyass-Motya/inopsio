export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Welcome to Inopsio
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The All-in-One Business Platform
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#features"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}
