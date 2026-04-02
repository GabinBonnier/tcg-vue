<template>
  <div class="player-hand">
    <div class="player-hand__info">
      <span class="player-hand__label">Main ({{ board.hand.length }}/5)</span>
      <span class="player-hand__deck"
        >🃏 {{ board.deckCount }} cartes restantes</span
      >
    </div>
    <div class="player-hand__cards">
      <PokemonCard
        v-for="card in board.hand"
        :key="card.id"
        :card="card"
        size="sm"
        :selectable="canPlay"
        @click="handlePlay(card.id)"
      />
      <div v-if="board.hand.length === 0" class="player-hand__empty">
        Aucune carte en main
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useGameStore } from '../stores/game.js'
import type { PlayerBoard } from '../types/game.js'
import PokemonCard from './PokemonCard.vue'

const props = defineProps<{
  board: PlayerBoard
}>()

const gameStore = useGameStore()

// Peut jouer une carte si : c'est son tour ET pas de carte active
const canPlay = computed(
  () => gameStore.isMyTurn && props.board.activeCard === null,
)

const handlePlay = (cardId: number) => {
  if (!canPlay.value) return
  gameStore.playCard(cardId)
}
</script>

<style scoped>
.player-hand {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.player-hand__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.player-hand__label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #374151;
}

.player-hand__deck {
  font-size: 0.8rem;
  color: #6b7280;
}

.player-hand__cards {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.player-hand__empty {
  color: #9ca3af;
  font-size: 0.85rem;
  padding: 12px 0;
}
</style>
