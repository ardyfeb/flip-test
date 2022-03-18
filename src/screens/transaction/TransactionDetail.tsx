import { default as React, useLayoutEffect, useMemo } from 'react'
import { default as Icon } from 'react-native-remix-icon'

import { Box } from "@/components/common/box"
import { Text } from '@/components/common/text'
import { StackNavigationProps } from '@/navigator/types'
import { useTheme } from '@/hooks/useTheme'
import { Pressable } from '@/components/common/pressable'
import { getBankName } from '@/utils/getBankName'
import { formatIdr } from '@/utils/formatIdr'
import { formatTransactionDate } from '@/utils/formatTransactionDate'

export type TransactionDetailScreenProps = StackNavigationProps<'Transaction.Detail'>

export const TransactionDetailScreen: React.FunctionComponent<TransactionDetailScreenProps> = ({ navigation, route }) => {
  const theme = useTheme()
  const transaction = useMemo(() => route.params.transaction, [route])

  useLayoutEffect(
    (): void => {
      navigation.setOptions(
        {
          title: 'Transaksi',
        }
      )
    }
  )
  
  /**
   * Transaction details grid map
   */
  const transactionDetails = useMemo(
    () => {
      return [
        [
          [transaction.beneficiary_name.toUpperCase(), transaction.account_number], 
          ['NOMINAL', formatIdr(transaction.amount)],
        ],
        [
          ['BERITA TRANSFER', transaction.remark], 
          ["KODE UNIK", transaction.unique_code]
        ],
        [
          ['WAKTU DIBUAT', formatTransactionDate(transaction.created_at)]
        ]
      ]
    },
    [transaction]
  )

  return (
    <Box my={4} bgColor="white">
      <Box p={4} borderBottomColor="grey" borderBottomWidth={1}>
        <Box flexDirection="row">
          <Text color="textRegular" font="medium" size={16}>
            ID TRANSAKSI: #{transaction.id}
          </Text>
          <Pressable ml={2}>
            <Icon 
              name="file-copy-line" 
              color={theme.colors.orange} 
              size={18}
            />
          </Pressable>
        </Box>
      </Box>
      <Box p={4} borderBottomColor="grey" borderBottomWidth={2}>
        <Box flexDirection="row" alignItems="center" justifyContent="space-between">
          <Text color="textRegular" font="medium" size={16}>
            DETAIL TRANSAKSI
          </Text>
          <Pressable>
            <Text font="regular" color="orange">Tutup</Text>
          </Pressable>
        </Box>
      </Box>
      <Box p={4}>
        <Box flexDirection="row" alignItems='center'>
          <Text color="textRegular"font="bold" mr={1} size={16}>
            {getBankName(transaction.sender_bank)}
          </Text>
          <Icon name="arrow-right-line" size={18}/>
          <Text color="textRegular" font="bold" ml={1} size={16}>
            {getBankName(transaction.beneficiary_bank)}
          </Text>
        </Box>
        <Box mt={1}>
          {
            transactionDetails.map(
              (row, index) => (
                <Box flexDirection="row" justifyContent="space-between" py={3} key={`row-${index}`}>
                  {
                    row.map(
                      ([title, value], index) => (
                        <Box flex={1} key={`row-item-${index}`}>
                          <Text color="textRegular" font="medium">
                            {title}
                          </Text>
                          <Text color="textRegular" font="regular" mt={1}>
                            {value}
                          </Text>
                        </Box>
                      )
                    )
                  }
                </Box>
              )
            )
          }
        </Box>
      </Box>
    </Box>
  )
}