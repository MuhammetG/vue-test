import { usePriceAlertStore } from '@/stores/usePriceAlertStore'

export function usePriceAlert() {
  const store = usePriceAlertStore()

  const checkAlerts = (marketData: any[]) => {
    marketData.forEach((item) => {
      store.alerts.forEach((alert) => {
        if (item.symbol === alert.symbol) {
          const condition =
            alert.direction === 'above'
              ? item.price >= alert.threshold
              : item.price <= alert.threshold

          if (condition) {
            alertUser(item.symbol, alert.threshold, alert.direction)
          }
        }
      })
    })
  }

  const alertUser = (symbol: string, threshold: number, dir: string) => {
    alert(`💡 ${symbol} ${dir === 'above' ? 'yukarı' : 'aşağı'} yönde ${threshold} eşiğini geçti!`)
  }

  return {
    alerts: store.alerts,
    addAlert: store.addAlert,
    removeAlert: store.removeAlert,
    checkAlerts,
  }
}
