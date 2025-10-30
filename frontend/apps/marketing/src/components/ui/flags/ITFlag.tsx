export default function ITFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className}>
      <rect width="8" height="16" fill="#009246"/>
      <rect x="8" width="8" height="16" fill="#FFFFFF"/>
      <rect x="16" width="8" height="16" fill="#CE2B37"/>
    </svg>
  )
}
