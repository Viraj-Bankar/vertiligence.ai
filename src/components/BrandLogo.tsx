import React, { useState } from 'react'

interface BrandLogoProps {
  className?: string
  iconOnly?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'emblem' | 'full'
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  variant = 'emblem',
}) => {
  const [imageError, setImageError] = useState(false)

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  }

  if (variant === 'full') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src="/logo-full.webp"
          alt="Vertiligence AI — Intelligence. Automation. Impact."
          className="h-auto max-h-16 w-auto object-contain drop-shadow-[0_0_20px_rgba(0,210,255,0.25)]"
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official 3D Glowing V Emblem */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 rounded-xl overflow-hidden bg-[#07090E] border border-cyan-500/30 shadow-[0_0_15px_rgba(0,210,255,0.25)] transition-transform duration-300 hover:scale-105 group`}
      >
        {!imageError ? (
          <img
            src="/logo-emblem.webp"
            alt="Vertiligence AI Emblem"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          /* High-fidelity vector fallback */
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            aria-hidden="true"
          >
            <path
              d="M16 18L32 48L48 18"
              stroke="#00D2FF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="18" r="4" fill="#00D2FF" />
            <circle cx="48" cy="18" r="4" fill="#00D2FF" />
            <circle cx="32" cy="48" r="4.5" fill="#38BDF8" />
          </svg>
        )}
      </div>

      {!iconOnly && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span className={`font-extrabold tracking-tight text-white ${textSizes[size]}`}>
              Vertiligence
            </span>
            <span className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 ${textSizes[size]}`}>
              AI
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 mt-1">
            Technology Engineering · India
          </span>
        </div>
      )}
    </div>
  )
}
