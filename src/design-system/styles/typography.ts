/**
 * MAPS typography tokens — derived from Figma (Color Palette frame, node 1746:3545,
 * file VuFjMLBDrFeYhOhcqfGJtE). Normalized to a single sans stack (Inter + Roboto
 * as in file) and merged near-duplicate 16px treatments by line-height + tracking.
 */

export const typography = {
  fontFamily: {
    /** Primary UI stack (Inter + Roboto both appear in MAPS frames) */
    sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
  },

  fontSize: {
    /** Page / marketing title (24 / 28) */
    display: ['24px', { lineHeight: '28px', letterSpacing: '0.125em' }] as const,
    /** Section titles, e.g. usage tables (20 / 30) */
    headingLg: ['20px', { lineHeight: '30px', letterSpacing: '-0.022em' }] as const,
    /** Default body, tables, UI lines (16 / 24, ~1.5) */
    body: ['16px', { lineHeight: '24px', letterSpacing: '0em' }] as const,
    /** Intro / lead copy (16 / 24, slightly open tracking) */
    bodyLead: ['16px', { lineHeight: '24px', letterSpacing: '0.03125em' }] as const,
    /** Uppercase section rails (16 / 20) */
    overline: ['16px', { lineHeight: '20px', letterSpacing: '0.125em' }] as const,
    /** Badges, chips, uppercase UI (16 / 24) */
    ui: ['16px', { lineHeight: '24px', letterSpacing: '0.03em' }] as const,
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.25,
    snug: 1.167,
    normal: 1.5,
    relaxed: 1.6,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.03em',
    wider: '0.125em',
  },
} as const

export type MapsTypography = typeof typography

/**
 * Flat `theme.extend` fragment for Tailwind.
 * Utilities: `font-maps-sans`, `text-maps-body`, `leading-maps-normal`, `tracking-maps-tight`, `font-maps-medium`, …
 */
export const tailwindThemeExtendTypography = {
  fontFamily: {
    'maps-sans': typography.fontFamily.sans,
  },
  fontSize: {
    'maps-display': [...typography.fontSize.display],
    'maps-heading-lg': [...typography.fontSize.headingLg],
    'maps-body': [...typography.fontSize.body],
    'maps-body-lead': [...typography.fontSize.bodyLead],
    'maps-overline': [...typography.fontSize.overline],
    'maps-ui': [...typography.fontSize.ui],
  },
  fontWeight: {
    'maps-regular': typography.fontWeight.regular,
    'maps-medium': typography.fontWeight.medium,
    'maps-semibold': typography.fontWeight.semibold,
    'maps-bold': typography.fontWeight.bold,
  },
  lineHeight: {
    'maps-tight': typography.lineHeight.tight,
    'maps-snug': typography.lineHeight.snug,
    'maps-normal': typography.lineHeight.normal,
    'maps-relaxed': typography.lineHeight.relaxed,
  },
  letterSpacing: {
    'maps-tight': typography.letterSpacing.tight,
    'maps-normal': typography.letterSpacing.normal,
    'maps-wide': typography.letterSpacing.wide,
    'maps-wider': typography.letterSpacing.wider,
  },
} as const
