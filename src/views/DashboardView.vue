<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useApiConfigStore } from '@/stores/useApiConfigStore'
import { ApiManager } from '@/services/apiManager'

const config = useApiConfigStore()
const marketData = ref<any[]>([])

watch(
  () => config.provider,
  (newProvider) => {
    ApiManager.setAdapter(newProvider as any)
    loadData()
  },
)

onMounted(() => {
  ApiManager.setAdapter(config.provider as any)
  loadData()
})

const loadData = async () => {
  const data = await ApiManager.getAdapter().fetchMarketData()
  marketData.value = data
}
</script>

<template>
  <div>
    <h2>Piyasa Verileri</h2>
    <pre>{{ marketData }}</pre>
  </div>
</template>
