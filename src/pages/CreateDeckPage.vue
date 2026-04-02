<template>
  <div class="container">
    <div class="page-header">
      <button class="btn btn--ghost" @click="router.push(ROUTES.HOME)">
        ← Retour
      </button>
      <h1 class="page-title">Créer un deck</h1>
    </div>

    <div class="deck-form">
      <div class="deck-form__name">
        <label class="form-label" for="deck-name">Nom du deck</label>
        <input
          id="deck-name"
          v-model="deckName"
          class="form-input"
          type="text"
          placeholder="Mon super deck..."
        />
      </div>

      <div class="deck-form__counter">
        <span :class="{ 'counter--valid': selectedIds.length === MAX_CARDS }">
          {{ selectedIds.length }} / {{ MAX_CARDS }} cartes sélectionnées
        </span>
      </div>

      <div v-if="loadingCards" class="state-msg">Chargement des cartes...</div>
      <div v-else-if="cardsError" class="state-msg state-msg--error">
        {{ cardsError }}
      </div>

      <CardGrid
        v-else
        v-model:selected-ids="selectedIds"
        :cards="allCards"
        size="sm"
        selectable
        :max-selected="MAX_CARDS"
      />

      <div class="deck-form__footer">
        <button
          class="btn btn--primary btn--lg"
          :disabled="!isValid || submitting"
          @click="handleSubmit"
        >
          {{ submitting ? 'Création...' : 'Créer le deck' }}
        </button>
        <p v-if="submitError" class="form-error">{{ submitError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import CardGrid from '../components/CardGrid.vue'
import { useApi } from '../composables/useApi.js'
import { ROUTES } from '../router.js'
import type { Card } from '../types/index.js'

const MAX_CARDS = 10

const api = useApi()
const router = useRouter()

const deckName = ref('')
const selectedIds = ref<number[]>([])
const allCards = ref<Card[]>([])
const loadingCards = ref(false)
const cardsError = ref<string | null>(null)
const submitting = ref(false)
const submitError = ref<string | null>(null)

const isValid = computed(
  () => deckName.value.trim() !== '' && selectedIds.value.length === MAX_CARDS,
)

onMounted(async () => {
  loadingCards.value = true
  try {
    allCards.value = await api.getCards()
  } catch (e: unknown) {
    cardsError.value =
      e instanceof Error ? e.message : 'Erreur chargement cartes'
  } finally {
    loadingCards.value = false
  }
})

const handleSubmit = async () => {
  if (!isValid.value) return
  submitting.value = true
  submitError.value = null
  try {
    await api.createDeck({
      name: deckName.value.trim(),
      cards: selectedIds.value,
    })
    router.push(ROUTES.HOME)
  } catch (e: unknown) {
    submitError.value =
      e instanceof Error ? e.message : 'Erreur lors de la création'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.deck-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.deck-form__name {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 400px;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.form-input {
  padding: 10px 14px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.15s;
}

.form-input:focus {
  border-color: #6366f1;
}

.deck-form__counter {
  font-size: 0.95rem;
  font-weight: 600;
  color: #6b7280;
}

.counter--valid {
  color: #18a058;
}

.deck-form__footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding-top: 8px;
}

.form-error {
  color: #d03050;
  font-size: 0.85rem;
  margin: 0;
}

.state-msg {
  text-align: center;
  padding: 40px;
  color: #888;
}

.state-msg--error {
  color: #d03050;
}

/* Boutons */
.btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
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

.btn--ghost {
  background: transparent;
  color: #6b7280;
  padding: 6px 10px;
}

.btn--ghost:hover {
  color: #1a1a2e;
}

.btn--lg {
  padding: 12px 28px;
  font-size: 1rem;
}
</style>
