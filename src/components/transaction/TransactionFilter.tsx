import { default as React } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { default as Icon } from 'react-native-remix-icon'
import { useSnapshot } from 'valtio'

import { useTheme } from '@/hooks/useTheme'
import { transactionFilter } from '@/state/transaction'
import { TRANSACTION_ORDER_OPTIONS } from '@/data/entity/transaction'

import { Box } from '../common/box'
import { Text } from '../common/text'
import { Pressable } from '../common/pressable'

export const TransactionFilter: React.FunctionComponent = props => {
  const theme = useTheme()
  const transactionFilterSnap = useSnapshot(transactionFilter)

  const onSearchChange = (value: string): void => {
    transactionFilter.query = value
  }

  const openOrderDialog = (): void => {
    transactionFilter.dialogVisible = true
  }

  return (
    <Box bgColor="white" px={4} height={56} borderRadius="base" >
      <Box flex={1} flexDirection="row" alignItems="center">
        <Icon name="search-line" color={theme.colors.textLight}/>
        <Box mx={2} flex={1}>
          <TextInput 
            placeholder="Cari nama, bank, atau nominal"
            placeholderTextColor={theme.colors.textLight}
            onChangeText={onSearchChange}
            style={
              { 
                fontFamily: theme.fonts.regular 
              }
            }
          />
        </Box>
        <Pressable onPress={openOrderDialog}>
          <Box flex={1} flexDirection="row" alignItems="center">
            <Text color="orange" font="bold">
              {TRANSACTION_ORDER_OPTIONS.find(option => option.key == transactionFilterSnap.orderBy)?.title}
            </Text>
            <Icon name="arrow-down-s-line" color={theme.colors.orange} />
          </Box>
        </Pressable>
      </Box>
    </Box>
  )
}