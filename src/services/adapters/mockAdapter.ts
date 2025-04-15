import { type ApiAdapter } from './baseAdapter'

export class MockAdapter implements ApiAdapter {
  async fetchPortfolio() {
    return { portfolioValue: 12345, currency: 'USD' }
  }

  async fetchMarketData() {
    return [
      { name: 'Bitcoin', price: 50000 },
      { name: 'Ethereum', price: 3000 },
    ]
  }

  async fetchPortfolioHistory() {
    return [
      { date: '2024-01-01', value: 10000 },
      { date: '2024-02-01', value: 11000 },
      { date: '2024-03-01', value: 12000 },
      { date: '2024-04-01', value: 9500 },
      { date: '2024-05-01', value: 12345 },
    ]
  }

  async fetchHistory() {
    return [
      {
        id: 1,
        date: '2024-01-01',
        type: 'Alım',
        asset: 'Bitcoin',
        amount: 0.5,
        price: 50000,
        value: 10000,
      },
      {
        id: 2,
        date: '2024-02-01',
        type: 'Satım',
        asset: 'Ethereum',
        amount: 2,
        price: 3000,
        value: 11000,
      },
      {
        id: 3,
        date: '2024-03-10',
        type: 'Alım',
        asset: 'Cardano',
        amount: 100,
        price: 1.2,
        value: 12000,
      },
      {
        id: 3,
        date: '2024-04-10',
        type: 'Alım',
        asset: 'Cardano',
        amount: 100,
        price: 1.2,
        value: 9500,
      },
      {
        id: 3,
        date: '2024-05-10',
        type: 'Alım',
        asset: 'Cardano',
        amount: 100,
        price: 1.2,
        value: 12345,
      },
    ]
  }
}
