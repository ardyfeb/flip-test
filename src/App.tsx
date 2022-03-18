import 'react-native-gesture-handler'

import { default as React, useEffect } from 'react'
import { ThemeProvider as FoundationProvider } from '@ardyfeb/foundation'
import { NavigationContainer } from '@react-navigation/native'

import { theme } from './scheme/theme'
import { RootNavigator } from './navigator/screen/RootNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PortalProvider } from '@gorhom/portal'
import { Platform, StatusBar } from 'react-native'

export const App: React.FunctionComponent = props => {
  useEffect(
    (): void => {
      if (Platform.OS == 'android') {
        StatusBar.setBackgroundColor('transparent')
        StatusBar.setBarStyle('dark-content')
        StatusBar.setTranslucent(true)
      }
    }
  )
  return (
    <FoundationProvider theme={theme}>
      <SafeAreaProvider>
        <PortalProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PortalProvider>
      </SafeAreaProvider>
    </FoundationProvider>
  )
}