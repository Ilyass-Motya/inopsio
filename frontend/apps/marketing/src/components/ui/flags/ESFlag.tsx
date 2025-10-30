export default function ESFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className}>
      <rect width="24" height="4" fill="#C60B1E"/>
      <rect y="4" width="24" height="8" fill="#FFC400"/>
      <rect y="12" width="24" height="4" fill="#C60B1E"/>
      <rect x="8" y="6" width="8" height="4" fill="#C60B1E"/>
      <circle cx="12" cy="8" r="1.2" fill="#FFC400"/>
    </svg>
  )
}
