import { CoinGeckoAdapter } from './adapters/coinGeckoAdapter'
import { AlphaVantageAdapter } from './adapters/alphaVantageAdapter'
import { MockAdapter } from './adapters/mockAdapter'
import { type ApiAdapter } from './adapters/baseAdapter'

const adapters: Record<string, ApiAdapter> = {
  coingecko: new CoinGeckoAdapter(),
  alphavantage: new AlphaVantageAdapter(),
  mock: new MockAdapter(),
}

let current: ApiAdapter = adapters['mock']

export const ApiManager = {
  setAdapter(name: keyof typeof adapters) {
    current = adapters[name]
  },
  getAdapter(): ApiAdapter {
    return current
  },
}
