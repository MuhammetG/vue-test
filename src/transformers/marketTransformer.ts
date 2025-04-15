export interface MarketItem {
  name: string
  price: number
  symbol: string
  change24h: number
  marketCap: number
}

export const transformMarketData = (raw: any[]): MarketItem[] => {
  return raw.map((item) => ({
    name: item.name || item.symbol || 'Unknown',
    price: item.current_price ?? item.price ?? 0,
    symbol: item.symbol ?? '',
    change24h: item.price_change_percentage_24h ?? 0,
    marketCap: item.market_cap ?? 0,
  }))
}
