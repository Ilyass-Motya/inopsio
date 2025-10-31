'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Sample blog data - replace with your actual data source
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Enterprise Security: Zero Trust Architecture',
    excerpt: 'Discover how Zero Trust is transforming enterprise security and why traditional perimeter-based security is no longer enough in today\'s threat landscape.',
    category: 'Security',
    author: 'Sarah Mitchell',
    authorRole: 'Chief Security Officer',
    date: '2025-10-28',
    readTime: '8 min read',
    image: '/images/blog/security-zero-trust.jpg',
    featured: true,
    tags: ['Zero Trust', 'Cybersecurity', 'Enterprise'],
  },
  {
    id: 2,
    title: 'AI-Powered Automation: Streamlining Business Operations',
    excerpt: 'Learn how artificial intelligence and machine learning are revolutionizing workflow automation and operational efficiency across industries.',
    category: 'AI & Automation',
    author: 'Michael Chen',
    authorRole: 'Head of Innovation',
    date: '2025-10-25',
    readTime: '6 min read',
    image: '/images/blog/ai-automation.jpg',
    featured: true,
    tags: ['AI', 'Automation', 'Efficiency'],
  },
  {
    id: 3,
    title: 'Multi-Tenant SaaS: Architecture Best Practices',
    excerpt: 'Explore the key architectural patterns and best practices for building scalable, secure multi-tenant SaaS applications.',
    category: 'Engineering',
    author: 'David Kumar',
    authorRole: 'Senior Solutions Architect',
    date: '2025-10-22',
    readTime: '10 min read',
    image: '/images/blog/saas-architecture.jpg',
    featured: false,
    tags: ['SaaS', 'Architecture', 'Cloud'],
  },
  {
    id: 4,
    title: 'Customer Success Stories: Digital Transformation at Scale',
    excerpt: 'Real-world examples of how enterprises are leveraging Inopsio to accelerate their digital transformation journey.',
    category: 'Case Studies',
    author: 'Emily Rodriguez',
    authorRole: 'Customer Success Manager',
    date: '2025-10-20',
    readTime: '7 min read',
    image: '/images/blog/case-study.jpg',
    featured: false,
    tags: ['Success Stories', 'Transformation'],
  },
  {
    id: 5,
    title: 'CRM Integration Strategies for Enterprise Growth',
    excerpt: 'A comprehensive guide to integrating CRM systems with your existing tech stack for maximum business impact.',
    category: 'CRM',
    author: 'James Wilson',
    authorRole: 'CRM Solutions Lead',
    date: '2025-10-18',
    readTime: '9 min read',
    image: '/images/blog/crm-integration.jpg',
    featured: false,
    tags: ['CRM', 'Integration', 'Sales'],
  },
  {
    id: 6,
    title: 'Data Privacy Compliance: GDPR and Beyond',
    excerpt: 'Navigate the complex landscape of data privacy regulations and ensure your business remains compliant.',
    category: 'Compliance',
    author: 'Lisa Anderson',
    authorRole: 'Compliance Director',
    date: '2025-10-15',
    readTime: '8 min read',
    image: '/images/blog/compliance.jpg',
    featured: false,
    tags: ['GDPR', 'Compliance', 'Privacy'],
  },
  {
    id: 7,
    title: 'Building Resilient Cloud Infrastructure',
    excerpt: 'Essential strategies for designing and maintaining highly available, fault-tolerant cloud infrastructure.',
    category: 'Cloud',
    author: 'Robert Zhang',
    authorRole: 'Cloud Infrastructure Lead',
    date: '2025-10-12',
    readTime: '11 min read',
    image: '/images/blog/cloud-infrastructure.jpg',
    featured: false,
    tags: ['Cloud', 'Infrastructure', 'DevOps'],
  },
  {
    id: 8,
    title: 'The Rise of Low-Code/No-Code Platforms',
    excerpt: 'How low-code platforms are democratizing software development and accelerating time-to-market.',
    category: 'Innovation',
    author: 'Amanda Foster',
    authorRole: 'Product Innovation Manager',
    date: '2025-10-10',
    readTime: '5 min read',
    image: '/images/blog/low-code.jpg',
    featured: false,
    tags: ['Low-Code', 'Innovation', 'Development'],
  },
  {
    id: 9,
    title: 'API-First Development: A Modern Approach',
    excerpt: 'Why API-first development is crucial for building flexible, scalable enterprise applications.',
    category: 'Engineering',
    author: 'Thomas Lee',
    authorRole: 'API Platform Architect',
    date: '2025-10-08',
    readTime: '7 min read',
    image: '/images/blog/api-first.jpg',
    featured: false,
    tags: ['API', 'Development', 'Integration'],
  },
]

const categories = ['All', 'Security', 'AI & Automation', 'Engineering', 'CRM', 'Case Studies', 'Compliance', 'Cloud', 'Innovation']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isDark, setIsDark] = useState(false)

  const POSTS_PER_PAGE = 6

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const allRegularPosts = filteredPosts.filter(post => !post.featured)

  // Pagination
  const totalPages = Math.ceil(allRegularPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const regularPosts = allRegularPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])

  // Detect dark mode
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* Navigation Section with Categories and Search */}
      <section className="py-6 sm:py-8">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <nav
            className="relative rounded-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 shadow-lg shadow-black/10 dark:shadow-black/50"
            style={{
              background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            {/* L-shaped corner brackets */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-2xl z-10"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-2xl z-10"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-2xl z-10"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-2xl z-10"></div>
            <div className="relative px-4 sm:px-6 py-2.5 z-20">
              <div className="flex items-center justify-between gap-4">
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-2.5 lg:px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white dark:bg-primary-500 shadow-md'
                          : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      style={{ fontSize: '12.5px' }}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Search Icon */}
                <button
                  onClick={() => {
                    setShowSearch(!showSearch)
                    if (!showSearch) {
                      setTimeout(() => {
                        const input = document.getElementById('blog-search-input') as HTMLInputElement
                        if (input) input.focus()
                      }, 100)
                    } else {
                      setSearchQuery('')
                    }
                  }}
                  className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
                    showSearch
                      ? 'bg-primary-600 text-white dark:bg-primary-500'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title="Search articles"
                >
                  {showSearch ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Search Bar (collapsible) */}
              {showSearch && (
                <div className="mt-3 pt-3 border-t animate-slideDown" style={{ borderTopWidth: '1px', borderColor: 'rgba(156, 163, 175, 0.3)' }}>
                  <div className="relative max-w-xl">
                    <input
                      id="blog-search-input"
                      type="text"
                      placeholder="Search articles, topics, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-1.5 pl-9 bg-white/50 dark:bg-gray-900/50 rounded-lg shadow-sm focus:outline-none transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      style={{
                        fontSize: '12.5px',
                        border: '1px solid rgba(209, 213, 219, 0.5)'
                      }}
                      onFocus={(e) => e.target.style.border = '1px solid rgba(99, 102, 241, 0.8)'}
                      onBlur={(e) => e.target.style.border = '1px solid rgba(209, 213, 219, 0.5)'}
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="heading-sm mb-8">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/resources/blog/${post.id}`}
                className="group relative bg-white dark:bg-slate-800/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-flip-down border-2 border-gray-200 dark:border-gray-700"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* L-shaped corner brackets */}
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-2xl z-20"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-2xl z-20"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-2xl z-20"></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-2xl z-20"></div>
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                    <svg className="w-20 h-20 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="absolute top-4 left-4 z-20 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-600 text-white shadow-lg">
                    Featured
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                      {post.category}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">{post.author}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{post.authorRole}</p>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="py-12 max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        {regularPosts.length > 0 ? (
          <>
            <h2 className="heading-sm mb-8">Latest Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {regularPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/resources/blog/${post.id}`}
                  className="group relative bg-white dark:bg-slate-800/80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-200 dark:border-gray-700 animate-flip-down"
                  style={{ animationDelay: `${(featuredPosts.length * 0.1) + (index * 0.08)}s` }}
                >
                  {/* L-shaped corner brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-xl z-20"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-xl z-20"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-xl z-20"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-xl z-20"></div>
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                      <svg className="w-16 h-16 text-slate-400 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                        {post.category}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{post.author}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <nav
                  className="relative inline-flex items-center gap-2 p-2 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg"
                  style={{
                    background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  {/* L-shaped corner brackets */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-2xl z-10"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-2xl z-10"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-2xl z-10"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-2xl z-10"></div>
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`relative z-20 p-2 rounded-lg transition-all duration-200 ${
                      currentPage === 1
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)

                    if (!showPage) {
                      // Show ellipsis
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="relative z-20 px-2 text-gray-400 dark:text-gray-600">
                            ...
                          </span>
                        )
                      }
                      return null
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative z-20 min-w-[40px] h-10 px-3 rounded-lg font-semibold transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-primary-600 text-white dark:bg-primary-500 shadow-md scale-105'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                        }`}
                        style={{ fontSize: '12.5px' }}
                      >
                        {page}
                      </button>
                    )
                  })}

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`relative z-20 p-2 rounded-lg transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No articles found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
