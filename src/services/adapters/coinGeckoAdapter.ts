import { type ApiAdapter } from './baseAdapter'
import { buildQueryParams } from '@/utils/queryParams'

export class CoinGeckoAdapter implements ApiAdapter {
  async fetchPortfolio() {
    return { portfolioValue: 12345, currency: 'USD' }
  }

  async fetchMarketData() {
    const query = buildQueryParams()

    const url = `https://api.coingecko.com/api/v3/coins/markets${query || '?vs_currency=usd'}`
    const res = await fetch(url)
    return res.json()
  }

  async fetchHistory() {
    return [
      { date: '2024-01-01', value: 100 },
      { date: '2024-02-01', value: 200 },
    ]
  }
}
