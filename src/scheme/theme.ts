import { createTheme } from "@ardyfeb/foundation"

export const theme = createTheme(
  {
    colors: {
      // Common colors
      white: '#ffffff',
      green: '#20b87f',
      orange: '#ff5433',
      grey: '#f4f9f8',

      // Typography colors
      textLight: '#a1a1a1',
      textRegular: '#000000',
    },
    spacing: 4,
    fonts: {
      'light': 'Inter-Light',
      'regular': 'Inter-Regular',
      'medium': 'Inter-Medium',
      'bold': 'Inter-Bold'
    },
    breakpoints: {},
    radius: {
      base: 6,
      full: 1000
    },
  }
)

export type Theme = typeof theme