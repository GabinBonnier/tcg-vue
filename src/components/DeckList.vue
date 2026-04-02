<template>
  <div class="deck-list">
    <div class="deck-list__header">
      <h2 class="deck-list__title">Mes Decks</h2>
      <button class="btn btn--primary" @click="router.push(ROUTES.CREATE_DECK)">
        + Nouveau deck
      </button>
    </div>

    <div v-if="loading" class="deck-list__state">Chargement...</div>

    <div v-else-if="error" class="deck-list__state deck-list__state--error">
      {{ error }}
    </div>

    <div v-else-if="decks.length === 0" class="deck-list__state">
      Aucun deck pour l'instant. Créez votre premier deck !
    </div>

    <ul v-else class="deck-list__items">
      <li v-for="deck in decks" :key="deck.id" class="deck-item">
        <div class="deck-item__info">
          <span class="deck-item__name">{{ deck.name }}</span>
          <span class="deck-item__count">{{ deck.cards.length }} cartes</span>
        </div>
        <div class="deck-item__actions">
          <button
            class="btn btn--secondary"
            @click="router.push(`/decks/${deck.id}`)"
          >
            Voir
          </button>
          <button
            class="btn btn--secondary"
            @click="router.push(`/decks/${deck.id}/edit`)"
          >
            Modifier
          </button>
          <button
            class="btn btn--danger"
            :disabled="deletingId === deck.id"
            @click="handleDelete(deck.id)"
          >
            {{ deletingId === deck.id ? '...' : 'Supprimer' }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useApi } from '../composables/useApi.js'
import { ROUTES } from '../router.js'
import type { Deck } from '../types/index.js'

const api = useApi()
const router = useRouter()

const decks = ref<Deck[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const deletingId = ref<number | null>(null)

const fetchDecks = async () => {
  loading.value = true
  error.value = null
  try {
    decks.value = await api.getMyDecks()
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Erreur lors du chargement'
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: number) => {
  if (!confirm('Supprimer ce deck ?')) return
  deletingId.value = id
  try {
    await api.deleteDeck(id)
    await fetchDecks()
  } catch (e: unknown) {
    alert(e instanceof Error ? e.message : 'Erreur lors de la suppression')
  } finally {
    deletingId.value = null
  }
}

onMounted(fetchDecks)
</script>

<style scoped>
.deck-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.deck-list__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.deck-list__state {
  text-align: center;
  padding: 40px;
  color: #888;
  font-size: 1rem;
}

.deck-list__state--error {
  color: #d03050;
}

.deck-list__items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.deck-item {
  background: #fff;
  border-radius: 10px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.deck-item__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.deck-item__name {
  font-weight: 700;
  font-size: 1rem;
  color: #1a1a2e;
}

.deck-item__count {
  font-size: 0.8rem;
  color: #888;
}

.deck-item__actions {
  display: flex;
  gap: 8px;
}

/* Boutons */
.btn {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: opacity 0.15s;
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

.btn--danger {
  background: #fee2e2;
  color: #d03050;
}

.btn--danger:hover:not(:disabled) {
  background: #fecaca;
}
</style>
