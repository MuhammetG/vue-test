<template>
  <div>
    <h1>Portföy Performansı</h1>

    <a-card title="Toplam Portföy Değeri">
      <p>{{ portfolio.currency }} {{ portfolio.portfolioValue }}</p>
    </a-card>

    <div>
      <h2>Zaman İçinde Değişim</h2>
      <div>
        <LineChart v-if="historyChartData" :chart-data="historyChartData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApiManager } from '@/services/apiManager'
import LineChart from '@/components/charts/LineChart.vue'
import { transformPortfolio, transformPortfolioHistory } from '@/transformers/portfolioTransformer'
import { useApiConfigStore } from '@/stores/useApiConfigStore'
import dayjs from 'dayjs'
const config = useApiConfigStore()

const portfolio = ref({ portfolioValue: 0, currency: 'USD' })
const historyChartData = ref()

const fetchData = async () => {
  ApiManager.setAdapter(config.provider as any)

  const rawPortfolio = await ApiManager.getAdapter().fetchPortfolio()
  const rawHistory = await ApiManager.getAdapter().fetchHistory()

  portfolio.value = transformPortfolio(rawPortfolio)

  historyChartData.value = {
    labels: rawHistory.map((h) => dayjs(h.date).format('MMM YY')),
    datasets: [
      {
        label: 'Portföy Değeri',
        data: rawHistory.map((h) => h.value),
        fill: false,
        borderColor: '#52c41a',
        tension: 0.3,
      },
    ],
  }
}

onMounted(fetchData)
</script>
<style scoped>
.chart-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
</style>
