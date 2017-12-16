export function formatMoneyToWan (value, fixedLength) {
  fixedLength = fixedLength >= 0
    ? fixedLength
    : 2
  return value > 0
    ? (value / 10000).toFixed(fixedLength)
    : fixedLength === 2 ? '0.00' : value
}

export function formatMoneyToYi (value, fixedLength) {
  fixedLength = fixedLength >= 0
    ? fixedLength
    : 2
  return value > 0
    ? (value / 100000000).toFixed(fixedLength)
    : '0.00'
}

export function formatMoneyToYuan (value) {
  return value > 0
    ? (value * 10000).toFixed()
    : 0
}
