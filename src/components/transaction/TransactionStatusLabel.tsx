import { default as React } from 'react'

import { Box } from '../common/box'
import { Text } from '../common/text'

export interface TransactionStatusLabelProps {
  status: 'PENDING' | 'SUCCESS'
}

export const TransactionStatusLabel: React.FunctionComponent<TransactionStatusLabelProps> = ({ status }) => {
  if (status == 'PENDING') {
    return (
      <Box borderColor="orange" borderWidth={2} borderRadius="base" px={2} py={1}>
        <Text font="bold" color="textRegular">
          Pengecekan
        </Text>
      </Box>
    )
  }
  return (
    <Box bgColor='green' px={2} py={1} borderRadius="base">
      <Text font="bold" color="white">
        Berhasil
      </Text>
    </Box>
  )
}