<template>
  <div class="action-bar">
    <div class="action-bar__turn">
      <span
        class="action-bar__turn-badge"
        :class="
          gameStore.isMyTurn
            ? 'action-bar__turn-badge--mine'
            : 'action-bar__turn-badge--opponent'
        "
      >
        {{ gameStore.isMyTurn ? '⚡ Votre tour' : '⏳ Tour adversaire' }}
      </span>
    </div>

    <div class="action-bar__buttons">
      <button
        class="btn btn--action"
        :disabled="!canDraw"
        @click="gameStore.drawCards()"
      >
        🃏 Piocher
      </button>
      <button
        class="btn btn--action btn--attack"
        :disabled="!canAttack"
        @click="gameStore.attack()"
      >
        ⚔️ Attaquer
      </button>
      <button
        class="btn btn--action btn--end"
        :disabled="!gameStore.isMyTurn"
        @click="gameStore.endTurn()"
      >
        ✅ Fin de tour
      </button>
    </div>

    <div v-if="gameStore.gameState?.lastMessage" class="action-bar__message">
      {{ gameStore.gameState.lastMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useGameStore } from '../stores/game.js'

const gameStore = useGameStore()

const canDraw = computed(() => {
  if (!gameStore.isMyTurn) return false
  const board = gameStore.myBoard
  if (!board) return false
  return board.hand.length < 5 && board.deckCount > 0
})

const canAttack = computed(() => {
  if (!gameStore.isMyTurn) return false
  return (
    gameStore.myBoard?.activeCard !== null &&
    gameStore.opponentBoard?.activeCard !== null
  )
})
</script>

<style scoped>
.action-bar {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.action-bar__turn {
  flex-shrink: 0;
}

.action-bar__turn-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.875rem;
}

.action-bar__turn-badge--mine {
  background: #6366f1;
  color: white;
}

.action-bar__turn-badge--opponent {
  background: #374151;
  color: #9ca3af;
}

.action-bar__buttons {
  display: flex;
  gap: 10px;
  flex: 1;
  flex-wrap: wrap;
}

.action-bar__message {
  width: 100%;
  font-size: 0.8rem;
  color: #9ca3af;
  font-style: italic;
}

.btn {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: opacity 0.15s;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn--action {
  background: #374151;
  color: white;
}

.btn--action:hover:not(:disabled) {
  background: #4b5563;
}

.btn--attack {
  background: #7f1d1d;
  color: white;
}

.btn--attack:hover:not(:disabled) {
  background: #991b1b;
}

.btn--end {
  background: #18a058;
  color: white;
}

.btn--end:hover:not(:disabled) {
  background: #16803c;
}
</style>
