<template>
  <div class="sidebar">
    <nav>
      <RouterLink to="/market">📊 Piyasa</RouterLink>
      <RouterLink to="/portfolio">💼 Portföy</RouterLink>
      <RouterLink to="/transactions">🧾 İşlemler</RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #f0f2f5;
  height: 100vh;
  padding: 1rem;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}
nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
a.router-link-exact-active {
  font-weight: bold;
  color: #1677ff;
}
</style>
