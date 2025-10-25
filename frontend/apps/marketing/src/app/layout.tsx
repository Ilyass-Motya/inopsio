import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
