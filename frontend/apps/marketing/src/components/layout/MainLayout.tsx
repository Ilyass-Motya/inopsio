'use client'

import { usePathname } from 'next/navigation'
import HeaderPill from '@/components/layout/HeaderPill'
import Footer from '@/components/layout/Footer'
import HeroDefault from '@/components/sections/HeroDefault'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  // Skip HeroDefault for individual blog posts - they have their own header
  const isBlogPost = pathname?.match(/^\/resources\/blog\/[^/]+$/)
  // Skip HeroDefault for /company/about - it has its own custom hero
  const isAboutPage = pathname === '/company/about'

  // Hero content mapping for different page sections
  const getHeroContent = (path: string) => {
    // AI & Automation pages
    if (path.startsWith('/ai/')) {
      if (path.includes('assistant')) {
        return {
          title: 'AI Assistant & Innovation',
          description: 'Harness the power of artificial intelligence to transform your business operations and decision-making processes.'
        }
      }
      if (path.includes('automation')) {
        return {
          title: 'Intelligent Automation',
          description: 'Streamline workflows and eliminate repetitive tasks with advanced AI-powered automation solutions.'
        }
      }
      if (path.includes('ml-platform')) {
        return {
          title: 'Machine Learning Platform',
          description: 'Build, deploy, and scale machine learning models with our enterprise-grade ML platform.'
        }
      }
      if (path.includes('analytics')) {
        return {
          title: 'Predictive Analytics',
          description: 'Turn data into actionable insights with advanced analytics and business intelligence tools.'
        }
      }
      if (path.includes('security')) {
        return {
          title: 'AI Security Solutions',
          description: 'Protect your enterprise with AI-powered threat detection and intelligent security automation.'
        }
      }
      return {
        title: 'AI & Automation',
        description: 'Transform your business with cutting-edge artificial intelligence and automation technologies.'
      }
    }

    // Platforms pages
    if (path.startsWith('/platforms/')) {
      if (path.includes('crm')) {
        return {
          title: 'CRM Platform',
          description: 'Manage customer relationships effectively with our comprehensive CRM solution designed for enterprise scale.'
        }
      }
      if (path.includes('erp')) {
        return {
          title: 'ERP Platform',
          description: 'Streamline your business operations with our integrated enterprise resource planning system.'
        }
      }
      if (path.includes('email-marketing')) {
        return {
          title: 'Email Marketing Platform',
          description: 'Create, automate, and optimize email campaigns that drive results and engagement.'
        }
      }
      if (path.includes('workflow')) {
        return {
          title: 'Workflow Automation',
          description: 'Design and automate complex business processes with our intuitive workflow platform.'
        }
      }
      if (path.includes('inosec-core')) {
        return {
          title: 'InoSec Core',
          description: 'The foundation of enterprise security with comprehensive threat protection and compliance.'
        }
      }
      if (path.includes('inosec-edge')) {
        return {
          title: 'InoSec Edge',
          description: 'Secure your network perimeter and edge devices with advanced threat detection.'
        }
      }
      if (path.includes('inosec-one')) {
        return {
          title: 'InoSec One',
          description: 'Unified security platform that combines multiple security layers for complete protection.'
        }
      }
      return {
        title: 'Enterprise Platforms',
        description: 'Comprehensive business platforms designed for modern enterprises and digital transformation.'
      }
    }

    // Solutions pages
    if (path.startsWith('/solutions/')) {
      if (path.includes('healthcare')) {
        return {
          title: 'Healthcare Solutions',
          description: 'Transform healthcare delivery with secure, compliant, and efficient digital solutions.'
        }
      }
      if (path.includes('financial')) {
        return {
          title: 'Financial Services',
          description: 'Secure and scalable solutions for the financial industry with regulatory compliance.'
        }
      }
      if (path.includes('government')) {
        return {
          title: 'Government Solutions',
          description: 'Mission-critical systems designed for government agencies with the highest security standards.'
        }
      }
      if (path.includes('education')) {
        return {
          title: 'Education Solutions',
          description: 'Digital learning platforms and tools that enhance education delivery and outcomes.'
        }
      }
      if (path.includes('manufacturing')) {
        return {
          title: 'Manufacturing Solutions',
          description: 'Optimize production processes and supply chains with intelligent manufacturing solutions.'
        }
      }
      if (path.includes('retail')) {
        return {
          title: 'Retail Solutions',
          description: 'Enhance customer experience and operational efficiency in retail environments.'
        }
      }
      return {
        title: 'Industry Solutions',
        description: 'Tailored solutions for specific industries with deep domain expertise and compliance.'
      }
    }

    // Resources pages
    if (path.startsWith('/resources/')) {
      if (path.includes('blog')) {
        return {
          title: 'Insights & Innovation',
          description: 'Explore the latest trends, best practices, and expert insights on enterprise technology, security, and digital transformation.'
        }
      }
      if (path.includes('docs')) {
        return {
          title: 'Documentation',
          description: 'Comprehensive guides, API references, and technical documentation for developers.'
        }
      }
      if (path.includes('case-studies')) {
        return {
          title: 'Case Studies',
          description: 'Real-world success stories showcasing how enterprises achieve transformation with our platform.'
        }
      }
      if (path.includes('whitepapers')) {
        return {
          title: 'Whitepapers',
          description: 'In-depth research and technical whitepapers covering enterprise technology trends.'
        }
      }
      if (path.includes('webinars')) {
        return {
          title: 'Webinars',
          description: 'On-demand webinars featuring industry experts discussing technology and business trends.'
        }
      }
      if (path.includes('events')) {
        return {
          title: 'Events',
          description: 'Join industry events, conferences, and workshops to connect and learn from experts.'
        }
      }
      return {
        title: 'Resources',
        description: 'Access comprehensive resources including documentation, case studies, and learning materials.'
      }
    }

    // Company pages
    if (path.startsWith('/company/')) {
      if (path.includes('about')) {
        return {
          title: 'About Us',
          description: 'Learn about our mission, vision, and the team driving innovation in enterprise technology.'
        }
      }
      if (path.includes('leadership')) {
        return {
          title: 'Leadership Team',
          description: 'Meet the experienced leaders guiding our strategic vision and technological innovation.'
        }
      }
      if (path.includes('careers')) {
        return {
          title: 'Careers',
          description: 'Join our team of talented professionals working on cutting-edge enterprise solutions.'
        }
      }
      if (path.includes('news')) {
        return {
          title: 'News & Press',
          description: 'Stay updated with the latest company news, product launches, and industry insights.'
        }
      }
      if (path.includes('partners')) {
        return {
          title: 'Partners',
          description: 'Discover our partner ecosystem and how we collaborate to deliver exceptional solutions.'
        }
      }
      return {
        title: 'Company',
        description: 'Learn more about our company, mission, and the people behind our innovative solutions.'
      }
    }

    // Other pages
    if (path === '/features') {
      return {
        title: 'Platform Features',
        description: 'Explore the comprehensive features that make our platform the choice for enterprise transformation.'
      }
    }

    if (path === '/contact') {
      return {
        title: 'Contact Us',
        description: 'Get in touch with our team to discuss your enterprise technology needs and solutions.'
      }
    }

    if (path === '/demo') {
      return {
        title: 'Request a Demo',
        description: 'Experience our platform firsthand with a personalized demonstration tailored to your needs.'
      }
    }

    if (path === '/managed-services') {
      return {
        title: 'Managed Services',
        description: 'Professional support and management services to ensure optimal platform performance.'
      }
    }

    if (path === '/modules') {
      return {
        title: 'Platform Modules',
        description: 'Modular components that can be combined to create the perfect solution for your business.'
      }
    }

    if (path.startsWith('/legal/') || path.startsWith('/privacy') || path.startsWith('/terms')) {
      return {
        title: 'Legal & Compliance',
        description: 'Important legal information, terms of service, and privacy policies for our platform.'
      }
    }

    // Default fallback
    return {
      title: 'Enterprise Solutions',
      description: 'Discover how our comprehensive platform can transform your business operations and drive innovation.'
    }
  }

  const heroContent = getHeroContent(pathname)

  return (
    <>
      {!isBlogPost && <HeaderPill />}
      {!isHomePage && !isBlogPost && !isAboutPage && (
        <HeroDefault
          title={heroContent.title}
          description={heroContent.description}
        />
      )}
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  )
}
