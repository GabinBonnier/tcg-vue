<template>
  <div class="game-page">
    <div v-if="!gameStore.gameState" class="state-msg">
      Chargement de la partie...
    </div>

    <template v-else>
      <!-- Zone adversaire -->
      <PlayerZone :board="gameStore.opponentBoard!" side="opponent" />

      <!-- Barre d'actions -->
      <ActionBar />

      <!-- Zone joueur -->
      <PlayerZone :board="gameStore.myBoard!" side="player">
        <PlayerHand :board="gameStore.myBoard!" />
      </PlayerZone>

      <!-- Message déconnexion adversaire -->
      <div
        v-if="gameStore.opponentDisconnected"
        class="game-page__disconnected"
      >
        ⚠️ Votre adversaire s'est déconnecté.
      </div>
    </template>

    <!-- Modal fin de partie -->
    <GameEndModal />
  </div>
</template>

<script setup lang="ts">
import ActionBar from '../components/ActionBar.vue'
import GameEndModal from '../components/GameEndModal.vue'
import PlayerHand from '../components/PlayerHand.vue'
import PlayerZone from '../components/PlayerZone.vue'
import { useGameStore } from '../stores/game.js'

const gameStore = useGameStore()
</script>

<style scoped>
.game-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  min-height: calc(100vh - 80px);
}

.state-msg {
  text-align: center;
  padding: 60px;
  color: #888;
}

.game-page__disconnected {
  background: #fef3c7;
  border: 1px solid #f59e0b;
  color: #92400e;
  border-radius: 8px;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
