<template>
  <div class="lobby">
    <h2 class="lobby__title">Lobby</h2>

    <!-- Sélection du deck -->
    <div class="lobby__section">
      <label class="form-label">Choisir un deck</label>
      <div v-if="loadingDecks" class="state-msg">Chargement des decks...</div>
      <div v-else class="lobby__decks">
        <button
          v-for="deck in decks"
          :key="deck.id"
          class="deck-btn"
          :class="{ 'deck-btn--selected': selectedDeckId === deck.id }"
          @click="selectedDeckId = deck.id"
        >
          {{ deck.name }}
        </button>
      </div>
    </div>

    <!-- Erreur -->
    <div v-if="gameStore.lobbyError" class="lobby__error">
      {{ gameStore.lobbyError }}
    </div>

    <!-- Créer une room -->
    <div class="lobby__section">
      <button
        class="btn btn--primary"
        :disabled="!selectedDeckId"
        @click="handleCreateRoom"
      >
        Créer une partie
      </button>
      <span v-if="gameStore.currentRoomId" class="lobby__room-id">
        Room : <strong>{{ gameStore.currentRoomId }}</strong> — En attente d'un
        adversaire...
      </span>
    </div>

    <!-- Liste des rooms -->
    <div class="lobby__section">
      <h3 class="lobby__subtitle">Parties disponibles</h3>
      <div v-if="gameStore.rooms.length === 0" class="state-msg">
        Aucune partie disponible pour le moment.
      </div>
      <ul v-else class="lobby__rooms">
        <li v-for="room in gameStore.rooms" :key="room.id" class="room-item">
          <span class="room-item__host">{{ room.hostUsername }}</span>
          <button
            class="btn btn--secondary"
            :disabled="!selectedDeckId || room.guestCount >= 1"
            @click="handleJoinRoom(room.id)"
          >
            Rejoindre
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import { useApi } from '../composables/useApi.js'
import { useGameStore } from '../stores/game.js'
import type { Deck } from '../types/index.js'

const api = useApi()
const gameStore = useGameStore()

const decks = ref<Deck[]>([])
const loadingDecks = ref(false)
const selectedDeckId = ref<number | null>(null)

onMounted(async () => {
  gameStore.connect()
  loadingDecks.value = true
  try {
    decks.value = await api.getMyDecks()
  } finally {
    loadingDecks.value = false
  }
})

onUnmounted(() => {
  gameStore.disconnect()
})

const handleCreateRoom = () => {
  if (!selectedDeckId.value) return
  gameStore.createRoom(selectedDeckId.value)
}

const handleJoinRoom = (roomId: string) => {
  if (!selectedDeckId.value) return
  gameStore.joinRoom(roomId, selectedDeckId.value)
}
</script>

<style scoped>
.lobby {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.lobby__title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.lobby__subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 10px;
}

.lobby__section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lobby__decks {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.deck-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  background: #f9fafb;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.15s;
}

.deck-btn--selected {
  border-color: #6366f1;
  background: #eef2ff;
  color: #6366f1;
}

.lobby__error {
  color: #d03050;
  font-size: 0.875rem;
  background: #fee2e2;
  padding: 10px 14px;
  border-radius: 8px;
}

.lobby__room-id {
  font-size: 0.85rem;
  color: #6b7280;
}

.lobby__rooms {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.room-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.room-item__host {
  font-weight: 600;
  color: #1a1a2e;
}

.state-msg {
  color: #888;
  font-size: 0.9rem;
  padding: 12px 0;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: opacity 0.15s;
  align-self: flex-start;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--primary {
  background: #6366f1;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  opacity: 0.85;
}

.btn--secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn--secondary:hover:not(:disabled) {
  background: #e5e7eb;
}
</style>
