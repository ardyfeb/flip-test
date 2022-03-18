import { default as React } from 'react'
import { default as Icon} from 'react-native-remix-icon'

import { Transaction } from '@/data/entity/transaction'
import { getBankName } from '@/utils/getBankName'
import { formatIdr } from '@/utils/formatIdr'
import { formatTransactionDate } from '@/utils/formatTransactionDate'

import { Box } from '../common/box'
import { Text } from '../common/text'
import { TransactionStatusLabel } from './TransactionStatusLabel'
import { Pressable } from '../common/pressable'

export interface TransactionListCardProps {
  transaction: Transaction
  onPress: (transaction: Transaction) => void
}

export const TransactionListCard: React.FunctionComponent<TransactionListCardProps> = ({ transaction, onPress }) => {
  return (
    <Pressable 
      flex={1} 
      borderRadius="base" 
      bgColor="white" 
      p={4}
      borderLeftWidth={6}
      borderLeftColor={transaction.status == 'PENDING' ? 'orange' : 'green'}
      onPress={() => onPress(transaction)}
    >
      <Box flex={1} flexDirection="row">
        <Box flex={1}>
          <Box flexDirection="row" alignItems='center'>
            <Text color='textRegular' font="bold" mr={1} size={16}>
              {getBankName(transaction.sender_bank)}
            </Text>
            <Icon name="arrow-right-line" size={18}/>
            <Text color="textRegular" font="bold" ml={1} size={16}>
              {getBankName(transaction.beneficiary_bank)}
            </Text>
          </Box>
          <Text color="textRegular" font="regular" mt={1}>
            {transaction.beneficiary_name}
          </Text>
          <Text color="textRegular" font="regular" mt={1}>
            {formatIdr(transaction.amount)} • {formatTransactionDate(transaction.created_at)}
          </Text>
        </Box>
        <Box flex={0} justifyContent="center">
          <TransactionStatusLabel status={transaction.status} />
        </Box>
      </Box>
    </Pressable>
  )
}