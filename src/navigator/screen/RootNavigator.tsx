import { default as React } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { TransactionDetailScreen } from '@/screens/transaction/TransactionDetail'
import { TransactionListScreen } from '@/screens/transaction/TransactionList'

import { useTheme } from '@/hooks/useTheme'

import { RootParamList } from '../types'

const RootStack = createStackNavigator<RootParamList>()

export const RootNavigator: React.FunctionComponent = props => {
  const theme = useTheme()
  return (
    <RootStack.Navigator 
      initialRouteName="Transaction.List" 
      screenOptions={
        { 
          headerBackTitle: 'Kembali',
          cardStyle: {
            backgroundColor: theme.colors.grey
          }
        }
      }
    >
      <RootStack.Screen 
        name="Transaction.List" 
        component={TransactionListScreen}
        options={
          {
            headerShown: false
          }
        } 
      />
      <RootStack.Screen name="Transaction.Detail" component={TransactionDetailScreen} />
    </RootStack.Navigator>
  )
}