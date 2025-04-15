import { useApiConfigStore } from '@/stores/useApiConfigStore'

export const buildQueryParams = (): string => {
  const { params } = useApiConfigStore()

  const query = params
    .filter((p) => p.key && p.value)
    .map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
    .join('&')

  return query ? `?${query}` : ''
}
