export function formatIdr(value: number, prefix = 'Rp') {
  return prefix + new Intl.NumberFormat('id-ID').format(value)
}