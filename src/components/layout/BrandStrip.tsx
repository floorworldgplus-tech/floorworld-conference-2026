/**
 * The diagonal 4-colour band from the conference banner assets.
 * Blue → Red → Green → Yellow, with angled transitions.
 */
export default function BrandStrip({ height = 10 }: { height?: number }) {
  return (
    <div className="w-full overflow-hidden flex-shrink-0" style={{ height }}>
      <svg
        viewBox="0 0 400 10"
        preserveAspectRatio="none"
        className="w-full h-full"
        aria-hidden="true"
      >
        <polygon points="0,0 108,0 90,10 0,10"   fill="#0095DA" />
        <polygon points="80,0 208,0 190,10 62,10" fill="#E84730" />
        <polygon points="180,0 308,0 290,10 162,10" fill="#5DB13C" />
        <polygon points="280,0 400,0 400,10 262,10" fill="#F5A623" />
      </svg>
    </div>
  )
}
