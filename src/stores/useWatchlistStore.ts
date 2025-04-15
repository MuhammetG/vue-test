import { defineStore } from 'pinia'

export const useWatchlistStore = defineStore('watchlist', {
  state: () => ({
    list: [] as string[],
  }),
  actions: {
    toggle(symbol: string) {
      if (this.list.includes(symbol)) {
        this.list = this.list.filter((s) => s !== symbol)
      } else {
        this.list.push(symbol)
      }
    },
    isWatched(symbol: string) {
      return this.list.includes(symbol)
    },
  },
})
