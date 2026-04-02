<template>
  <div class="card-grid">
    <PokemonCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      :size="size"
      :selectable="selectable"
      :selected="isSelected(card.id)"
      :disabled="isDisabled(card.id)"
      @click="handleCardClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { Card } from '../types/index.js'
import PokemonCard from './PokemonCard.vue'

const props = withDefaults(
  defineProps<{
    cards: Card[]
    size?: 'sm' | 'md'
    selectable?: boolean
    selectedIds?: number[]
    maxSelected?: number
  }>(),
  {
    size: 'md',
    selectable: false,
    selectedIds: () => [],
    maxSelected: undefined,
  },
)

const emit = defineEmits<(e: 'update:selectedIds', ids: number[]) => void>()

const isSelected = (id: number) => props.selectedIds.includes(id)

const maxReached = computed(
  () =>
    props.maxSelected !== undefined &&
    props.selectedIds.length >= props.maxSelected,
)

const isDisabled = (id: number) => {
  if (!props.selectable) return false
  return maxReached.value && !isSelected(id)
}

const handleCardClick = (card: Card) => {
  if (!props.selectable) return

  const newIds = isSelected(card.id)
    ? props.selectedIds.filter((id) => id !== card.id)
    : [...props.selectedIds, card.id]

  emit('update:selectedIds', newIds)
}
</script>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}
</style>
