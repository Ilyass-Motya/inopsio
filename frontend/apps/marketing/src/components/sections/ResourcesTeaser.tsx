'use client'

import Link from 'next/link'
import Image from 'next/image'

const resources = [
  {
    id: 1,
    type: 'blog',
    title: 'The Future of Enterprise Security: AI-Powered Threat Detection',
    image: '/images/resources/blog-1.jpg',
    contentType: 'Blog',
    status: 'Trending',
    contentTypeColor: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
    statusColor: 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200',
    description: 'Discover how AI is revolutionizing enterprise security with advanced threat detection capabilities.'
  },
  {
    id: 2,
    type: 'blog',
    title: 'Zero Trust Architecture: Building Unbreachable Networks',
    image: '/images/resources/blog-2.jpg',
    contentType: 'Blog',
    status: '',
    contentTypeColor: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200',
    statusColor: '',
    description: 'Learn the fundamentals of zero trust security and how to implement it in your organization.'
  },
  {
    id: 3,
    type: 'whitepaper',
    title: 'Enterprise Security Compliance: A Complete Guide',
    image: '/images/resources/whitepaper-1.jpg',
    contentType: 'Whitepaper',
    status: 'New',
    contentTypeColor: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200',
    statusColor: 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200',
    description: 'Comprehensive guide to enterprise security compliance frameworks and best practices.'
  }
]

export default function ResourcesTeaser() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-6">
            Insights That Matter
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto px-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            Discover expert perspectives, industry trends, and actionable strategies designed to help you secure, manage, and scale your digital operations.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="relative rounded-2xl overflow-hidden group transition-all duration-300"
              style={{
                backdropFilter: 'blur(30px) saturate(200%)',
                WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="h-full flex flex-col">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden rounded-t-2xl bg-slate-200 dark:bg-slate-800 flex-shrink-0">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 dark:bg-black/40 transition-colors duration-300"></div>
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${resource.contentTypeColor}`}>
                      {resource.contentType}
                    </span>
                    {resource.status && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${resource.statusColor}`}>
                        {resource.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                    {resource.description}
                  </p>

                  <Link
                    href={`/resources/${resource.type}/${resource.id}`}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold text-sm transition-colors duration-200"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
