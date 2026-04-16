/**
 * MAPS design tokens (Tailwind arbitrary literals / Dev Mode).
 * Centralize literals here so components reference names instead of duplicating hex/radius/shadow values.
 */
export const MAPS_TOKENS = {
  font: {
    /** Design-system sans stack — matches `font-maps-sans` in Tailwind theme */
    sans: 'font-maps-sans',
  },
  motion: {
    surface:
      'transition-[border-color,background-color,box-shadow,color,opacity] duration-200 ease-out',
    progressFill: 'transition-[width] duration-200 ease-out',
  },
  focus: {
    ring: 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3054b1]',
  },
  shadow: {
    xs: 'shadow-[0px_1px_2px_rgba(16,24,40,0.06)]',
    cardHover: 'shadow-[0px_4px_12px_rgba(16,24,40,0.08)]',
    dragOver: 'shadow-[0px_6px_16px_rgba(48,84,177,0.18)]',
  },
  /** Full hover utilities for Tailwind JIT (avoid string concatenation). */
  compound: {
    uploadDefaultHover:
      'hover:border-[#c9d2e3] hover:shadow-[0px_4px_12px_rgba(16,24,40,0.08)]',
  },
  border: {
    subtle: 'border-[#e5e4e7]',
    dividerTop: 'border-t border-solid border-[#e5e4e7]',
    interactive: 'border-[#c9d2e3]',
    primary: 'border-[#3054b1]',
    success: 'border-[#b7dfc6]',
    error: 'border-[#f5c2be]',
  },
  background: {
    canvas: 'bg-[#ffffff]',
    subtle: 'bg-[#f9fafb]',
    dragOver: 'bg-[rgba(48,84,177,0.06)]',
    success: 'bg-[#e6f4ea]',
    error: 'bg-[#fdeaea]',
    progressTrack: 'bg-[#e5e4e7]',
    progressFill: 'bg-[#3054b1]',
  },
  text: {
    heading: 'text-[#08060d]',
    body: 'text-[#5a6b85]',
    meta: 'text-[#3d4d66]',
    muted: 'text-[#7b8aa3]',
    disabled: 'text-[#a0a9b8]',
    primary: 'text-[#3054b1]',
    primaryStrong: 'text-[#1f3b8c]',
    success: 'text-[#1e7e34]',
    error: 'text-[#9e1f16]',
  },
  opacity: {
    disabledSurface: 'opacity-[0.55]',
  },
} as const
