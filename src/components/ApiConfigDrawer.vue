<template>
  <a-drawer
    :visible="panelStore.isOpen"
    placement="right"
    width="400"
    title="API Yapılandırması"
    @close="panelStore.close"
  >
    <a-form layout="vertical">
      <a-form-item label="API URL">
        <a-input v-model:value="form.apiUrl" placeholder="https://api.example.com" />
      </a-form-item>

      <a-form-item label="API Sağlayıcısı">
        <a-select v-model:value="form.provider" placeholder="Seçiniz">
          <a-select-option value="coingecko">CoinGecko</a-select-option>
          <a-select-option value="alphavantage">Alpha Vantage</a-select-option>
          <a-select-option value="mock">Mock API</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Ortam">
        <a-select v-model:value="form.environment" placeholder="Seçiniz">
          <a-select-option value="dev">Development</a-select-option>
          <a-select-option value="staging">Staging</a-select-option>
          <a-select-option value="prod">Production</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="API Anahtarı">
        <a-input-password v-model:value="form.apiKey" placeholder="Gizli API anahtarı" />
      </a-form-item>

      <div class="mb-4">
        <h4>API Parametreleri</h4>
        <div
          v-for="(param, index) in form.params"
          :key="index"
          class="flex items-center gap-2 mb-2"
        >
          <a-input v-model:value="param.key" placeholder="Parametre adı" style="width: 45%" />
          <a-input v-model:value="param.value" placeholder="Değer" style="width: 45%" />
          <a-button type="text" danger @click="removeParam(index)">Sil</a-button>
        </div>
        <a-button type="dashed" @click="addParam">+ Parametre Ekle</a-button>
      </div>

      <a-divider />

      <div>
        <div class="button-container">
          <a-button @click="saveProfile">Profili Kaydet</a-button>
        </div>
        <div class="button-container">
          <a-button @click="loadProfile">Profili Yükle</a-button>
        </div>
        <div class="button-container">
          <a-button type="primary" @click="handleTestConnection">Bağlantıyı Test Et</a-button>
        </div>
      </div>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useApiPanelStore } from '@/stores/useApiPanelStore'
import { useApiConfigStore } from '@/stores/useApiConfigStore'
const configStore = useApiConfigStore()

const panelStore = useApiPanelStore()

const form = reactive({
  apiUrl: '',
  provider: 'mock',
  environment: '',
  apiKey: '',
  params: [] as { key: string; value: string }[],
})

const addParam = () => {
  form.params.push({ key: '', value: '' })
}

const removeParam = (index: number) => {
  form.params.splice(index, 1)
}

const handleTestConnection = () => {
  console.log('TEST >>', { ...form })
  alert('Bağlantı bilgisi loglandı.')
}

const saveProfile = () => {
  configStore.setConfig(form)
  localStorage.setItem('apiProfile', JSON.stringify(form))
  alert('Konfigürasyon kaydedildi ✅')
}

const loadProfile = () => {
  const saved = localStorage.getItem('apiProfile')
  if (saved) {
    const parsed = JSON.parse(saved)
    Object.assign(form, parsed)
    configStore.setConfig(parsed)
    alert('Konfigürasyon yüklendi 📦')
  } else {
    alert('Kayıtlı profil bulunamadı.')
  }
}
</script>

<style scoped>
.button-container {
  margin-top: 12px;
}
</style>
