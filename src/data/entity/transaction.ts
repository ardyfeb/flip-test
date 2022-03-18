
export const TRANSACTION_ORDER_OPTIONS = [
  { key: null, title: 'URUTKAN' },
  { key: 'az', title: 'Nama A-Z' },
  { key: 'za', title: 'Nama Z-A' },
  { key: 'newest', title: 'Tanggal Terbaru' },
  { key: 'oldest', title: 'Tanggal Terlama' }
]

export interface Transaction {
  id: string
  amount: number
  unique_code: number
  status: 'PENDING' | 'SUCCESS'
  sender_bank: string
  account_number: string
  beneficiary_name: string
  beneficiary_bank: string
  remark: string
  created_at: string
  completed_at: string
  fee: number
}