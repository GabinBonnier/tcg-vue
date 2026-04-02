<template>
  <div class="player-zone" :class="`player-zone--${side}`">
    <div class="player-zone__header">
      <span class="player-zone__username">{{ board.username }}</span>
      <span class="player-zone__score">KOs : {{ board.score }} / 3</span>
    </div>

    <!-- Carte active -->
    <div class="player-zone__active">
      <PokemonCard
        v-if="board.activeCard"
        :card="board.activeCard"
        :current-hp="board.activeCard.currentHp"
        size="md"
      />
      <div v-else class="player-zone__placeholder">Aucune carte active</div>
    </div>

    <!-- Main du joueur (seulement pour la zone joueur) -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PlayerBoard } from '../types/game.js'
import PokemonCard from './PokemonCard.vue'

defineProps<{
  board: PlayerBoard
  side: 'player' | 'opponent'
}>()
</script>

<style scoped>
.player-zone {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.player-zone--player {
  border: 2px solid #6366f1;
}

.player-zone--opponent {
  border: 2px solid #e5e7eb;
}

.player-zone__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.player-zone__username {
  font-weight: 700;
  font-size: 1rem;
  color: #1a1a2e;
}

.player-zone__score {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 600;
}

.player-zone__active {
  display: flex;
  justify-content: center;
}

.player-zone__placeholder {
  width: 150px;
  height: 200px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 0.85rem;
  text-align: center;
  padding: 12px;
}
</style>
