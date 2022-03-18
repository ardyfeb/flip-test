import { proxy } from 'valtio'

export type TransactionFilterOrderBy = 'az' | 'za' | 'newest' | 'oldest' | null

export const transactionFilter = proxy(
  {
    query: '',
    orderBy: null as TransactionFilterOrderBy,
    dialogVisible: false as boolean
  }
)