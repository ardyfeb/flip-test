const bankNames = {
  bri: 'BRI',
  bca: 'BCA',
  bni: 'BNI',
  btpn: 'BTPN',
  bsm: 'BSM',
  mandiri: 'Mandiri',
  muamalat: 'Muamalat',
  permata: 'Permata',

}

export function getBankName(code: string) {
  return bankNames[code as keyof typeof bankNames] || code
}