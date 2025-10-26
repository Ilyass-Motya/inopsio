import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import Image from 'next/image'

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'Inopsio - All-in-One Business Platform',
  description: 'Transform your business with our integrated CRM, ERP, Email Marketing, and Security Platform.',
  keywords: ['CRM', 'ERP', 'Business Platform', 'Email Marketing', 'Cybersecurity'],
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
        <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
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
      <body className={geistMono.className}>
        <ThemeProvider>
          <LanguageProvider>
            {/* Global Background SVG */}
            <div className="fixed inset-0 z-0">
              <Image
                src="/images/bg.svg"
                alt="Background"
                fill
                className="object-cover"
                priority
              />
            </div>
            <Header />
            <main className="relative z-10">{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
