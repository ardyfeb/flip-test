import { Pressable as NativePressable, PressableProps } from "react-native"
import { BoxProps, createBox } from "@ardyfeb/foundation"

import { Theme } from "@/scheme/theme"

export const Pressable = createBox<Theme, BoxProps<Theme> & PressableProps>(
  NativePressable
)