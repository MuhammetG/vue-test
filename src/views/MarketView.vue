<template>
  <template v-if="error">
    <a-alert
      type="error"
      :message="error"
      description="Lütfen API ayarlarınızı kontrol edin veya tekrar deneyin."
      show-icon
    />
    <a-button type="primary" @click="fetchMarketData">Tekrar Dene</a-button>
  </template>

  <template v-else>
    <div>
      <h1>Piyasa Verileri</h1>

      <a-table
        :columns="columns"
        :data-source="marketData"
        row-key="id"
        :loading="loading"
        bordered
      />

      <div>
        <h2>Fiyat Dağılımı (Grafik)</h2>
        <div>
          <BarChart v-if="chartData" :chart-data="chartData" />
        </div>
        <a-modal
          v-model:visible="alertModalOpen"
          title="Fiyat Alarmı Kur"
          @ok="saveAlert"
          @cancel="() => (alertModalOpen = false)"
        >
          <p>
            <strong>{{ selectedSymbol }}</strong> için fiyat eşiğini ayarla:
          </p>
          <a-input-number
            v-model:value="alertThreshold"
            addon-after="USD"
            :min="0"
            style="width: 100%; margin-bottom: 1rem"
          />
          <a-select v-model:value="alertDirection" style="width: 100%">
            <a-select-option value="above">Üzerine çıkarsa</a-select-option>
            <a-select-option value="below">Altına inerse</a-select-option>
          </a-select>
        </a-modal>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, h } from 'vue'
import { useApiConfigStore } from '@/stores/useApiConfigStore'
import { ApiManager } from '@/services/apiManager'
import { transformMarketData } from '@/transformers/marketTransformer'
import BarChart from '@/components/charts/BarChart.vue'
import { useWatchlist } from '@/composables/useWatchlist'
import { usePriceAlert } from '@/composables/usePriceAlert'

const error = ref<string | null>(null)
const { toggle, isWatched } = useWatchlist()
const config = useApiConfigStore()
const marketData = ref<any[]>([])
const loading = ref(false)

const alertModalOpen = ref(false)
const selectedSymbol = ref('')
const alertThreshold = ref(0)
const alertDirection = ref<'above' | 'below'>('above')

const { addAlert, checkAlerts } = usePriceAlert()

const columns = [
  {
    title: 'Takip',
    dataIndex: 'symbol',
    key: 'watch',
    customRender: ({ text }: { text: string }) => {
      return h(
        'span',
        {
          style: 'cursor: pointer;',
          onClick: () => toggle(text),
        },
        isWatched(text) ? '⭐' : '☆',
      )
    },
  },
  { title: 'İsim', dataIndex: 'name', key: 'name' },
  { title: 'Fiyat', dataIndex: 'price', key: 'price' },
  {
    title: 'Alarm',
    dataIndex: 'symbol',
    key: 'alert',
    customRender: ({ text }: { text: string }) => {
      return h('a', { onClick: () => showAlertModal(text) }, 'Alarm Kur')
    },
  },
]

const chartData = ref()

const fetchMarketData = async () => {
  loading.value = true
  error.value = null

  try {
    ApiManager.setAdapter(config.provider as any)
    const data = await ApiManager.getAdapter().fetchMarketData()

    marketData.value = transformMarketData(data)
    checkAlerts(marketData.value)

    chartData.value = {
      labels: marketData.value.map((item) => item.name),
      datasets: [
        {
          label: 'Fiyat (USD)',
          backgroundColor: '#1890ff',
          data: marketData.value.map((item) => item.price),
        },
      ],
    }
  } catch (err) {
    console.error('[Fetch Error]', err)
    error.value = 'Veriler alınırken bir hata oluştu.'
  }

  loading.value = false
}

const showAlertModal = (symbol: string) => {
  selectedSymbol.value = symbol
  alertThreshold.value = 0
  alertDirection.value = 'above'
  alertModalOpen.value = true
}

const saveAlert = () => {
  if (selectedSymbol.value && alertThreshold.value > 0) {
    addAlert({
      symbol: selectedSymbol.value,
      threshold: alertThreshold.value,
      direction: alertDirection.value,
    })
  }
  alertModalOpen.value = false
}

watch(() => config.provider, fetchMarketData)
onMounted(fetchMarketData)
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
