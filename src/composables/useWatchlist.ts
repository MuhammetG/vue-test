import { storeToRefs } from 'pinia'
import { useWatchlistStore } from '@/stores/useWatchlistStore'

export function useWatchlist() {
  const store = useWatchlistStore()
  const { list } = storeToRefs(store)

  const toggle = (symbol: string) => store.toggle(symbol)
  const isWatched = (symbol: string) => store.isWatched(symbol)

  return { list, toggle, isWatched }
}
