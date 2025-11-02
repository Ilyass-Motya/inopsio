import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import MainLayout from '@/components/layout/MainLayout'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.inopsio.com'),
  title: {
    default: 'Inopsio — Unify, Automate, and Secure Your Business Operations',
    template: '%s | Inopsio'
  },
  description: 'Make technology your competitive edge. Inopsio empowers enterprises with intelligent systems that connect data, teams, and security for sustainable growth.',
  keywords: ['enterprise security', 'CRM', 'ERP', 'AI automation', 'multi-tenant SaaS', 'cybersecurity', 'business intelligence', 'cloud-native platform', 'IT/OT security', 'workflow automation'],
  authors: [{ name: 'Inopsio' }],
  creator: 'Inopsio',
  publisher: 'Inopsio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.inopsio.com/',
    title: 'Inopsio — Unify, Automate, and Secure Your Business Operations',
    description: 'Empower your enterprise with intelligent systems that connect data, teams, and security for sustainable growth.',
    siteName: 'Inopsio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Inopsio Platform - Unified Business Operations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@inopsio',
    creator: '@inopsio',
    title: 'Inopsio — Unify, Automate, and Secure Your Business Operations',
    description: 'Empower your enterprise with intelligent systems that connect data, teams, and security.',
    images: ['/twitter-card.png'],
  },
  alternates: {
    canonical: 'https://www.inopsio.com/',
  },
  verification: {
    google: 'your-google-site-verification-code',
    // Add other verification codes as needed
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Inopsio',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web, iOS, Android',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: '0',
                  priceCurrency: 'USD',
                  referenceQuantity: {
                    '@type': 'QuantitativeValue',
                    value: '1',
                    unitText: 'TRIAL'
                  }
                }
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '150',
                bestRating: '5',
                worstRating: '1'
              },
              provider: {
                '@type': 'Organization',
                name: 'Inopsio',
                url: 'https://www.inopsio.com',
                logo: 'https://www.inopsio.com/inopsio-logo.svg',
                sameAs: [
                  'https://twitter.com/inopsio',
                  'https://linkedin.com/company/inopsio',
                  'https://github.com/inopsio'
                ]
              },
              description: 'Inopsio is a cloud-native, multi-tenant SaaS platform that unifies enterprise operations, security, and automation. Designed for scale and agility, it powers CRM, ERP, IT/OT security, and AI-driven intelligence.',
              screenshot: 'https://www.inopsio.com/og-image.png',
              softwareVersion: '1.0',
              releaseNotes: 'Initial release with full enterprise feature set'
            })
          }}
        />

        {/* Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={roboto.className} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            {/* Global Background */}
            <div className="fixed inset-0 z-0 bg-background dark:bg-slate-950 transition-colors duration-300"></div>
            <MainLayout>{children}</MainLayout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
