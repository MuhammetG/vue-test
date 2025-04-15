<template>
  <div>
    <h1>İşlem Geçmişi</h1>

    <a-input-search
      v-model:value="searchTerm"
      placeholder="Varlık adına göre ara"
      @search="applySearch"
      enter-button
      style="max-width: 300px"
    />

    <a-table
      class="clickable-rows"
      :columns="columns"
      :data-source="filteredData"
      row-key="id"
      :loading="loading"
      :customRow="rowProps"
    />

    <a-modal
      v-model:visible="isModalOpen"
      title="İşlem Detayı"
      @ok="isModalOpen = false"
      @cancel="isModalOpen = false"
    >
      <div v-if="selectedTransaction">
        <p><strong>Tarih:</strong> {{ selectedTransaction.date }}</p>
        <p><strong>Tür:</strong> {{ selectedTransaction.type }}</p>
        <p><strong>Varlık:</strong> {{ selectedTransaction.asset }}</p>
        <p><strong>Miktar:</strong> {{ selectedTransaction.amount }}</p>
        <p><strong>Fiyat:</strong> {{ selectedTransaction.price }}</p>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApiManager } from '@/services/apiManager'
import { transformTransactions } from '@/transformers/transactionTransformer'

const data = ref<any[]>([])
const filteredData = ref<any[]>([])
const loading = ref(false)
const searchTerm = ref('')
const isModalOpen = ref(false)
const selectedTransaction = ref<any>(null)

const columns = [
  { title: 'Tarih', dataIndex: 'date', key: 'date' },
  { title: 'Tür', dataIndex: 'type', key: 'type' },
  { title: 'Varlık', dataIndex: 'asset', key: 'asset' },
  { title: 'Miktar', dataIndex: 'amount', key: 'amount' },
  { title: 'Fiyat', dataIndex: 'price', key: 'price' },
]

const rowProps = (record: any) => {
  return {
    onClick: () => openDetails(record),
    style: { cursor: 'pointer' },
  }
}

const fetchData = async () => {
  loading.value = true
  data.value = await ApiManager.getAdapter().fetchHistory()
  filteredData.value = data.value
  loading.value = false
}

const applySearch = () => {
  filteredData.value = data.value.filter((item) =>
    item.asset.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
}

const openDetails = (record: any) => {
  console.log('Satır tıklandı:', record) // kontrol için log
  selectedTransaction.value = record
  isModalOpen.value = true
}

onMounted(fetchData)
</script>

<style scoped>
.clickable-rows .ant-table-row:hover {
  background-color: #fafafa;
}
</style>
