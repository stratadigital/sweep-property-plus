import { ImageResponse } from 'next/og'

// Branded social-share card (used for og:image and, via the metadata below,
// Twitter/X large summary cards). Generated at build time — no binary asset.
export const alt = 'Sweep Property Plus — Commercial Cleaning Services'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#1C4A43',
        backgroundImage:
          'radial-gradient(circle at 85% 15%, rgba(51,112,104,0.55), transparent 55%)',
        padding: '90px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Sweep mark */}
      <svg width="130" height="130" viewBox="0 0 36 36" fill="none">
        <path
          d="M 9,27 A 13,13 0 0,1 27,9"
          stroke="#F2BD71"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M 12,24 A 8.5,8.5 0 0,1 24,12"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Gold accent bar */}
      <div
        style={{
          width: '64px',
          height: '5px',
          backgroundColor: '#F2BD71',
          marginTop: '48px',
          marginBottom: '28px',
        }}
      />

      <div
        style={{
          display: 'flex',
          fontSize: '76px',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
        }}
      >
        Sweep Property Plus
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: '36px',
          fontWeight: 500,
          color: '#F2BD71',
          marginTop: '24px',
        }}
      >
        Commercial Cleaning Services
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: '26px',
          color: 'rgba(255,255,255,0.65)',
          marginTop: '14px',
        }}
      >
        Cleaning · Concierge · Security — across New York &amp; New Jersey
      </div>
    </div>,
    size
  )
}
