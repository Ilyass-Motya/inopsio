export default function MAFlag({ className = "w-6 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" className={className}>
      <rect width="24" height="16" fill="#C1272D"/>
      <g transform="translate(12, 8)">
        <path d="M0,-4 L1.5,-1.5 L4.5,-1.5 L2.25,0.5 L3,3.5 L0,2 L-3,3.5 L-2.25,0.5 L-4.5,-1.5 L-1.5,-1.5 Z" fill="#006233"/>
        <path d="M0,-2.5 L0.75,-1.25 L1.5,-1.25 L0.75,-0.5 L0.75,0.5 L0,-0.25 L-0.75,0.5 L-0.75,-0.5 L-1.5,-1.25 L-0.75,-1.25 Z" fill="#006233"/>
      </g>
    </svg>
  )
}
