import { defineStore } from 'pinia'

interface PriceAlert {
  symbol: string
  threshold: number
  direction: 'above' | 'below'
}

export const usePriceAlertStore = defineStore('priceAlerts', {
  state: () => ({
    alerts: [] as PriceAlert[],
  }),
  actions: {
    addAlert(alert: PriceAlert) {
      this.alerts.push(alert)
    },
    removeAlert(index: number) {
      this.alerts.splice(index, 1)
    },
  },
})
