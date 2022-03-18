import { useTheme as useFoundationTheme } from '@ardyfeb/foundation/hooks'
import { Theme } from '../scheme/theme'

export const useTheme = () => useFoundationTheme<Theme>()