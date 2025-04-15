<template>
  <a-button type="primary" @click="panelStore.open">API Panelini Aç</a-button>
  <ApiConfigDrawer />
</template>

<script setup lang="ts">
import { useApiPanelStore } from '@/stores/useApiPanelStore'
import ApiConfigDrawer from '@/components/ApiConfigDrawer.vue'

const panelStore = useApiPanelStore()
</script>
