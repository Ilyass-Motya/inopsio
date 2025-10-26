export default function DEFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className}>
      <rect width="24" height="5.33" fill="#000000"/>
      <rect y="5.33" width="24" height="5.33" fill="#DD0000"/>
      <rect y="10.67" width="24" height="5.33" fill="#FFCE00"/>
    </svg>
  )
}
