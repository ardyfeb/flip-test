import { default as React, useCallback, useEffect, useMemo, useState } from 'react'
import { ListRenderItemInfo, FlatList } from 'react-native'
import { default as axios } from 'axios'
import { useSnapshot } from 'valtio'
import { createDraft, finishDraft } from 'immer'

import { Box } from "@/components/common/box"
import { TransactionFilter } from '@/components/transaction/TransactionFilter'
import { TransactionFilterDialog } from '@/components/transaction/TransactionFilterDialog'
import { TransactionListCard } from '@/components/transaction/TransactionListCard'
import { SafeAreaView } from '@/components/common/safe-area'
import { StackNavigationProps } from '@/navigator/types'
import { Transaction } from '@/data/entity/transaction'
import { transactionFilter } from '@/state/transaction'
import { useTheme } from '@/hooks/useTheme'
import { includesIgnoreCase } from '@/utils/includesIgnoreCase'
import { transactionDateToJsDate } from '@/utils/formatTransactionDate'


export type TransactionListScreenProps = StackNavigationProps<'Transaction.List'>

export const TransactionListScreen: React.FunctionComponent<TransactionListScreenProps> = ({ navigation, route }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const theme = useTheme()
  const transactionFilterSnap = useSnapshot(transactionFilter)

  const filteredTransactions = useMemo(
    (): Transaction[] => {
      let temp = transactions

      if (!!transactionFilterSnap.query) {
        temp = temp.filter(
          trx => {
            const { query } = transactionFilterSnap

            return (
              includesIgnoreCase(trx.beneficiary_bank, query) || // search in destination bank
              includesIgnoreCase(trx.beneficiary_name, query) || // search in destination holder name
              (
                !isNaN(parseInt(query)) && +query < trx.amount // search in nominal which query < transaction amount
              )
            )
          }
        )
      }

      if (!!transactionFilterSnap.orderBy) {
        temp = createDraft(temp)
        
        switch (transactionFilterSnap.orderBy) {
          case 'az':
            temp = temp.sort(
              (a, b) => a.beneficiary_name > b.beneficiary_name ? 1 : -1
            )

            break
          case 'za':
            temp = temp.sort(
              (a, b) =>  a.beneficiary_name > b.beneficiary_name ? -1 : 1
            ) 

            break
          case 'newest':
            temp = temp.sort(
              (a, b) => transactionDateToJsDate(a.created_at) > transactionDateToJsDate(b.created_at) ? -1 : 1
            ) 

            break
          case 'oldest':
            temp = temp.sort(
              (a, b) => transactionDateToJsDate(a.created_at) > transactionDateToJsDate(b.created_at) ? 1 : -1
            ) 
        }

        temp = finishDraft(temp)
      }

      return temp
    },
    [transactionFilterSnap, transactions]
  )

  useEffect(
    (): void => {
      axios
        .get<Transaction[]>('https://nextar.flip.id/frontend-test')
        .then(
          response => {
            setTransactions(Object.values(response.data))
          }
         )
        .catch(error => console.error(error))
    },
    []
  )

  const navigateToDetail = useCallback(
    (transaction: Transaction): void => {
      navigation.navigate('Transaction.Detail', { transaction })
    },
    [navigation]
  )

  const renderTransactionItem = useCallback(
    ({ item }: ListRenderItemInfo<Transaction>): JSX.Element => {
      
      return (
        <Box flex={1} px={2} py={1}>
          <TransactionListCard transaction={item} onPress={navigateToDetail}/>
        </Box>
      )
    },
    [navigateToDetail]
  )

  return (
    <SafeAreaView flex={1} pt={2}> 
      <Box mx={2}>
        <TransactionFilter />
      </Box>
      <FlatList 
        data={filteredTransactions}
        keyExtractor={item => item.id}
        renderItem={renderTransactionItem}
        contentContainerStyle={
          {
            paddingVertical: theme.spacing * 1
          }
        }
      />
      <TransactionFilterDialog />
    </SafeAreaView>
  )
}