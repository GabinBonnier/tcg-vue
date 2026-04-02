<template>
  <div class="container">
    <div class="home-page">
      <div class="home-page__decks">
        <DeckList />
      </div>
      <div class="home-page__lobby">
        <LobbyPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DeckList from '../components/DeckList.vue'
import LobbyPanel from '../components/LobbyPanel.vue'
</script>

<style scoped>
.home-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

@media (max-width: 768px) {
  .home-page {
    grid-template-columns: 1fr;
  }
}
</style>
