export function transactionDateToJsDate(value: string) {
  const date = value
    .split(' ')[0] // split between space and take first one
    .split('-') // split the number
    .map(Number) as [number, number, number] // convert into number 

  return new Date(...date)
}

export function formatTransactionDate(value: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return transactionDateToJsDate(value).toLocaleDateString('id-ID', options)
}