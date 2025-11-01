export default function HeroTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout overrides the MainLayout for /hero-test route
  // It doesn't render Header or Footer, just the children
  return <>{children}</>
}
