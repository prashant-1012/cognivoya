import { useState } from 'react'
import { cn } from '@/utils/cn'

// Single star — renders full, half, or empty fill based on `fill` prop (0, 0.5, or 1)
const StarIcon = ({ fill = 0, size = 16, className }) => {
  const id = `half-${Math.random().toString(36).slice(2, 7)}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {fill === 0.5 && (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={
          fill === 1
            ? 'currentColor'
            : fill === 0.5
            ? `url(#${id})`
            : 'none'
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const getFill = (starIndex, value) => {
  if (value >= starIndex) return 1
  if (value >= starIndex - 0.5) return 0.5
  return 0
}

// Display-only star row for showing a decimal rating (e.g. 4.9)
export const StarDisplay = ({ value, size = 16, className }) => (
  <div className={cn('flex items-center gap-0.5 text-yellow-400', className)}>
    {[1, 2, 3, 4, 5].map((i) => (
      <StarIcon key={i} fill={getFill(i, value)} size={size} />
    ))}
  </div>
)

// Interactive star picker — calls onChange(rating: 1-5) on click
const StarRating = ({ value = null, onChange, size = 22, label = 'Rate this tool' }) => {
  const [hovered, setHovered] = useState(null)
  const display = hovered ?? value

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex items-center gap-1"
        onMouseLeave={() => setHovered(null)}
        role="radiogroup"
        aria-label={label}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            className={cn(
              'transition-transform duration-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded',
              display >= star ? 'text-yellow-400 scale-110' : 'text-border hover:text-yellow-300'
            )}
          >
            <StarIcon fill={display >= star ? 1 : 0} size={size} />
          </button>
        ))}
      </div>
      {value && (
        <p className="text-xs text-muted">
          You rated this <span className="font-semibold text-foreground">{value} / 5</span>
          {' '}— <button
            type="button"
            onClick={() => onChange(null)}
            className="text-brand-primary hover:underline cursor-pointer"
          >
            clear
          </button>
        </p>
      )}
    </div>
  )
}

export default StarRating
