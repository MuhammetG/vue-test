import { defineStore } from 'pinia'

export const useApiConfigStore = defineStore('apiConfig', {
  state: () => ({
    provider: 'mock',
    apiUrl: '',
    apiKey: '',
    environment: 'dev',
    params: [] as { key: string; value: string }[],
  }),

  actions: {
    setProvider(name: string) {
      this.provider = name
    },
    setConfig(config: any) {
      Object.assign(this, config)
    },
  },
})
