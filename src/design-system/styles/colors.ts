/**
 * MAPS color tokens — derived from MAPS UI usage (fills, strokes, text) in
 * this repo’s MAPS components (aligned to Figma file VuFjMLBDrFeYhOhcqfGJtE).
 * Scales only include stops that appear in those surfaces (no invented midpoints).
 */

const neutral = {
  50: '#f9fafb',
  100: '#f4f5f8',
  200: '#e5e4e7',
  300: '#c9d2e3',
  400: '#a0a9b8',
  500: '#7b8aa3',
  600: '#5a6b85',
  700: '#3d4d66',
  800: '#111827',
  900: '#08060d',
} as const

const primary = {
  50: '#e6ebfa',
  100: '#c7d3f3',
  200: '#9bb2e8',
  500: '#3054b1',
  600: '#25449a',
  700: '#1f3b8c',
} as const

/** Informational / secondary accent (alerts, info callouts) */
const secondary = {
  50: '#e8f1fb',
  100: '#c7daf7',
  600: '#174ea6',
} as const

const success = {
  50: '#e6f4ea',
  200: '#b7dfc6',
  700: '#1e7e34',
} as const

const warning = {
  50: '#fff7e6',
  200: '#f5d9a8',
  700: '#9a6700',
} as const

const critical = {
  50: '#fdeaea',
  200: '#f5c2be',
  700: '#9e1f16',
  800: '#7f1812',
  900: '#681410',
} as const

const alpha = {
  primaryLow: 'rgba(48, 84, 177, 0.04)',
  primaryMuted: 'rgba(48, 84, 177, 0.06)',
  primaryMedium: 'rgba(48, 84, 177, 0.08)',
  primaryElevated: 'rgba(48, 84, 177, 0.18)',
  shadowLow: 'rgba(16, 24, 40, 0.06)',
  shadowMedium: 'rgba(16, 24, 40, 0.08)',
} as const

const common = {
  white: '#ffffff',
  transparent: 'transparent',
} as const

export const colors = {
  common,
  neutral,
  primary,
  secondary,
  success,
  warning,
  critical,
  alpha,
  semantic: {
    text: {
      primary: neutral[900],
      secondary: neutral[600],
      tertiary: neutral[700],
      muted: neutral[500],
      disabled: neutral[400],
      onInverse: common.white,
      link: primary[500],
      linkStrong: primary[700],
      success: success[700],
      warning: warning[700],
      critical: critical[700],
      info: secondary[600],
    },
    border: {
      subtle: neutral[200],
      interactive: neutral[300],
      strong: primary[500],
      focus: primary[200],
      success: success[200],
      warning: warning[200],
      critical: critical[200],
      info: secondary[100],
    },
    background: {
      canvas: common.white,
      muted: neutral[50],
      raised: neutral[100],
      primaryTint: primary[50],
      primaryTintActive: primary[100],
      overlayPrimaryLow: alpha.primaryLow,
      overlayPrimaryMuted: alpha.primaryMuted,
      overlayPrimaryMedium: alpha.primaryMedium,
      success: success[50],
      warning: warning[50],
      critical: critical[50],
      info: secondary[50],
    },
  },
} as const

export type MapsColors = typeof colors

/**
 * Nested map for `theme.extend.colors` (Tailwind v3 / compatibility config).
 * Utilities: `bg-maps-neutral-50`, `text-maps-primary-500`, etc.
 */
export const tailwindThemeExtendColors = {
  maps: {
    common: colors.common,
    neutral: colors.neutral,
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    warning: colors.warning,
    critical: colors.critical,
    alpha: colors.alpha,
    text: colors.semantic.text,
    border: colors.semantic.border,
    background: colors.semantic.background,
  },
} as const
