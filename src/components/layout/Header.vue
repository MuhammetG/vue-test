<template>
  <div class="header">
    <div class="title">🚀 Varlık Takip Paneli</div>
    <a-button @click="handleExport">Profili Dışa Aktar</a-button>

    <a-upload :show-upload-list="false" accept=".json" :before-upload="handleImport">
      <a-button>Profili Yükle</a-button>
    </a-upload>
    <a-button type="primary" @click="drawerVisible = true">API Panelini Aç</a-button>
    <ApiConfigDrawer v-model:open="drawerVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ApiConfigDrawer from '@/components/ApiConfigDrawer.vue'
import { exportApiProfile, importApiProfile } from '@/utils/apiProfile'
import { useApiConfigStore } from '@/stores/useApiConfigStore'

const config = useApiConfigStore()

const handleExport = () => exportApiProfile(config)
const handleImport = (file: File) => {
  importApiProfile(file, config)
  return false
}

const drawerVisible = ref(false)
</script>

<style scoped>
.header {
  height: 64px;
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.title {
  font-weight: 600;
  font-size: 18px;
}
</style>
