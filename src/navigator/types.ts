import { StackScreenProps } from '@react-navigation/stack'

import { Transaction } from '@/data/entity/transaction'

export type Params<K extends string, P> = {
  [key in K]: P
}

export type ParamList<P extends string, C> = {
  [K in keyof C as `${P}.${K extends string ? K : never}`]: C[K]
}

export type StackNavigationProps<R extends keyof RootParamList = never> = StackScreenProps<RootParamList, R>

export type TransactionParamList = {
  List: undefined
  Detail: {
    transaction: Transaction
  }
}

export type RootParamList =
  & ParamList<'Transaction', TransactionParamList>