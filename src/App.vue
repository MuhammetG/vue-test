<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue'
import Header from '@/components/layout/Header.vue'
</script>

<template>
  <div class="layout">
    <Sidebar />
    <div class="main">
      <Header />
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100vh;
}
.content {
  flex: 1;
  padding: 24px;
  background: #f9f9f9;
  overflow-y: auto;
}
</style>
