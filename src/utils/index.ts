function formatPrice(x: number | string, float = 0) {
  x = Number(x)
  const price = Number.parseFloat(String(x)).toFixed(float).replace('.', ',')

  return `${price}`
}

function truncateAddress(address: string) {
  return `${address.slice(0, 8)}.......${address.slice(24, address.length)}`
}

export { formatPrice, truncateAddress }
