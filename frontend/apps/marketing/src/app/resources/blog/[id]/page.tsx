'use client'

import { use } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'

// Sample blog post data - in production, fetch from API/CMS
interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author?: string
  authorRole?: string
  authorBio?: string
  date: string
  image?: string
  readTime: string
  featured?: boolean
  tags?: string[]
}

const blogPostsData: Record<string, BlogPost> = {
  '1': {
    id: 1,
    title: 'The Future of Enterprise Security: Zero Trust Architecture',
    excerpt: 'Discover how Zero Trust is transforming enterprise security and why traditional perimeter-based security is no longer enough in today\'s threat landscape.',
    category: 'Security',
    author: 'Sarah Mitchell',
    authorRole: 'Chief Security Officer',
    authorBio: 'Sarah has over 15 years of experience in cybersecurity and enterprise risk management.',
    date: '2025-10-28',
    readTime: '8 min read',
    image: '/images/blog/security-zero-trust.jpg',
    featured: true,
    tags: ['Zero Trust', 'Cybersecurity', 'Enterprise'],
    content: `
      <h2>Understanding Zero Trust Architecture</h2>
      <p>In today's rapidly evolving threat landscape, traditional perimeter-based security models are no longer sufficient. Zero Trust Architecture (ZTA) represents a fundamental shift in how organizations approach security, operating on the principle of "never trust, always verify."</p>

      <h2>Why Traditional Security Models Fail</h2>
      <p>Traditional security models operate on the assumption that everything inside an organization's network can be trusted. However, with the rise of:</p>
      <ul>
        <li>Remote work and distributed teams</li>
        <li>Cloud-based applications and services</li>
        <li>Sophisticated cyberattacks and insider threats</li>
        <li>BYOD (Bring Your Own Device) policies</li>
      </ul>
      <p>This approach leaves organizations vulnerable to breaches and data loss.</p>

      <h2>Core Principles of Zero Trust</h2>
      <p>Zero Trust is built on several key principles:</p>
      <ol>
        <li><strong>Verify explicitly:</strong> Always authenticate and authorize based on all available data points</li>
        <li><strong>Use least privilege access:</strong> Limit user access with just-in-time and just-enough-access (JIT/JEA)</li>
        <li><strong>Assume breach:</strong> Minimize blast radius and segment access</li>
      </ol>

      <h2>Implementation Strategies</h2>
      <p>Implementing Zero Trust requires a comprehensive approach:</p>
      <ul>
        <li>Identity and access management (IAM)</li>
        <li>Multi-factor authentication (MFA)</li>
        <li>Micro-segmentation of networks</li>
        <li>Continuous monitoring and analytics</li>
        <li>Data encryption at rest and in transit</li>
      </ul>

      <h2>Benefits for Enterprises</h2>
      <p>Organizations that adopt Zero Trust Architecture experience:</p>
      <ul>
        <li>Reduced risk of data breaches</li>
        <li>Improved compliance with regulations</li>
        <li>Better visibility into network activity</li>
        <li>Enhanced protection for remote workers</li>
        <li>Faster threat detection and response</li>
      </ul>

      <h2>Getting Started with Zero Trust</h2>
      <p>Begin your Zero Trust journey with these steps:</p>
      <ol>
        <li>Assess your current security posture</li>
        <li>Identify critical assets and data</li>
        <li>Map transaction flows</li>
        <li>Architect Zero Trust network</li>
        <li>Create Zero Trust policy</li>
        <li>Monitor and maintain</li>
      </ol>

      <h2>Conclusion</h2>
      <p>Zero Trust Architecture is no longer optional—it's essential for modern enterprise security. By adopting a Zero Trust approach, organizations can better protect their assets, data, and users in an increasingly complex threat environment.</p>
    `
  },
  '2': {
    id: 2,
    title: 'AI-Powered Automation: Streamlining Business Operations',
    excerpt: 'Learn how artificial intelligence and machine learning are revolutionizing workflow automation and operational efficiency across industries.',
    category: 'AI & Automation',
    author: 'Michael Chen',
    authorRole: 'Head of Innovation',
    authorBio: 'Michael specializes in AI/ML implementations and digital transformation strategies.',
    date: '2025-10-25',
    readTime: '6 min read',
    image: '/images/blog/ai-automation.jpg',
    featured: true,
    tags: ['AI', 'Automation', 'Efficiency'],
    content: `
      <h2>The AI Revolution in Business</h2>
      <p>Artificial intelligence is transforming how businesses operate, enabling unprecedented levels of automation and efficiency. From predictive analytics to intelligent process automation, AI is reshaping industries.</p>

      <h2>Key Areas of Impact</h2>
      <p>AI-powered automation is making significant impact in:</p>
      <ul>
        <li>Customer service and support</li>
        <li>Data analysis and reporting</li>
        <li>Supply chain optimization</li>
        <li>Financial forecasting</li>
        <li>Quality assurance</li>
      </ul>

      <h2>Real-World Applications</h2>
      <p>Discover how leading organizations are leveraging AI to drive business value and operational excellence.</p>
    `
  },
}

// Get other blog posts for related articles
const relatedPosts = [
  {
    id: 3,
    title: 'Multi-Tenant SaaS: Architecture Best Practices',
    category: 'Engineering',
    readTime: '10 min read',
  },
  {
    id: 4,
    title: 'Customer Success Stories: Digital Transformation at Scale',
    category: 'Case Studies',
    readTime: '7 min read',
  },
  {
    id: 5,
    title: 'CRM Integration Strategies for Enterprise Growth',
    category: 'CRM',
    readTime: '9 min read',
  },
]

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const post = blogPostsData[id]

  if (!post) {
    return (
      <div className="min-h-screen">
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/resources/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  // Build image source with CDN support
  const imageSrc = process.env.NEXT_PUBLIC_CDN_URL 
    ? `${process.env.NEXT_PUBLIC_CDN_URL}${post.image}`
    : post.image

  return (
    <div className="min-h-screen">
      <div className="relative z-50">
        <Header />
      </div>

      {/* Modern Blog Post Hero Section */}
      <section 
        className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden pt-20"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 dark:from-black/95 dark:via-black/85 dark:to-black/60"></div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          <div className="max-w-4xl">
            {/* Category Badge and Read Time */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-primary-500 text-white shadow-lg backdrop-blur-sm bg-opacity-90">
                {post.category}
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 dark:bg-white/5 text-white backdrop-blur-sm border border-white/20">
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {post.title}
            </h1>

          </div>
        </div>
      </section>

      <main className="relative -mt-20 z-20">
        {/* Article Content */}
        <article className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Excerpt Card */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10 mb-12 border-2 border-gray-200 dark:border-gray-700">
            {/* L-shaped corner brackets */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-2xl"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-2xl"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-2xl"></div>
            
            {/* Excerpt Text */}
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed italic mb-6">
              {post.excerpt}
            </p>

            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-200 dark:border-primary-800 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {post.author?.split(' ').map((n: string) => n[0]).join('') || '??'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{post.author || 'Unknown Author'}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{post.authorRole || ''}</p>
                </div>
              </div>
              <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Main Article Content */}
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 sm:p-10 mb-12 border-2 border-gray-200 dark:border-gray-700">
          {/* L-shaped corner brackets */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-2xl"></div>
          <div
            className="prose prose-lg prose-slate dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:mb-2
              prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-700
              prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-6 prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-gray-200 dark:border-gray-700">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Section */}
          <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 mb-16 border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Share this article</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Help others discover this content</p>
              </div>
              <div className="flex gap-3">
            <button className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Share on Twitter">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Share on LinkedIn">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
            <button className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Copy link">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Related Articles */}
      <section className="py-20">
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="heading-md mb-8">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/resources/blog/${relatedPost.id}`}
                className="group relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-gray-200 dark:border-gray-700"
              >
                {/* L-shaped corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-xl z-10"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-xl z-10"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-xl z-10"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-xl z-10"></div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-3">
                  {relatedPost.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {relatedPost.title}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">{relatedPost.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
