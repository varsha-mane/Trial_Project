import { tailwindThemeExtendColors } from './src/design-system/styles/colors'
import { tailwindThemeExtendTypography } from './src/design-system/styles/typography'

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: tailwindThemeExtendColors,
      ...tailwindThemeExtendTypography,
    },
  },
}
