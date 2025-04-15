import { type ApiAdapter } from './baseAdapter'

export class AlphaVantageAdapter implements ApiAdapter {
  async fetchPortfolio() {
    return { portfolioValue: 54321, currency: 'USD' }
  }

  async fetchMarketData() {
    // Gerçek endpoint buraya gelecek
    return []
  }

  async fetchHistory() {
    return []
  }
}
