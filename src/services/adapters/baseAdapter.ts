export interface ApiAdapter {
  fetchPortfolio(): Promise<any>
  fetchMarketData(): Promise<any>
  fetchHistory(): Promise<any>
}
