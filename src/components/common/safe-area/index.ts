import { Theme } from "@/scheme/theme"
import { BoxProps, createBox } from "@ardyfeb/foundation"
import { SafeAreaView as SafeAreaBase, SafeAreaViewProps } from "react-native-safe-area-context"

export const SafeAreaView = createBox<Theme, SafeAreaViewProps & BoxProps<Theme>>(SafeAreaBase)