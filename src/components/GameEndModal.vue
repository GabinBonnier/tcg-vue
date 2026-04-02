<template>
  <Teleport to="body">
    <div v-if="show" class="modal-overlay">
      <div class="modal">
        <div class="modal__icon">{{ isWin ? '🏆' : '💀' }}</div>
        <h2 class="modal__title">{{ isWin ? 'Victoire !' : 'Défaite...' }}</h2>
        <p class="modal__subtitle">
          <template v-if="isWin"
            >Félicitations, vous avez gagné la partie !</template
          >
          <template v-else
            >Vous avez perdu. Bonne chance la prochaine fois !</template
          >
        </p>
        <button class="btn btn--primary" @click="handleBack">
          Retour au lobby
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { ROUTES } from '../router.js'
import { useGameStore } from '../stores/game.js'

const gameStore = useGameStore()
const router = useRouter()

const show = computed(() => gameStore.gameResult !== null)
const isWin = computed(() => gameStore.gameResult === 'win')

const handleBack = () => {
  gameStore.resetGame()
  router.push(ROUTES.HOME)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 16px;
  padding: 40px 48px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 360px;
  width: 90%;
}

.modal__icon {
  font-size: 3rem;
}

.modal__title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0;
}

.modal__subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

.btn {
  padding: 12px 28px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
}

.btn--primary {
  background: #6366f1;
  color: white;
}

.btn--primary:hover {
  opacity: 0.85;
}
</style>
