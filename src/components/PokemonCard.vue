<template>
  <div
    class="pokemon-card"
    :class="[
      `pokemon-card--${size}`,
      {
        'pokemon-card--selected': selected,
        'pokemon-card--disabled': disabled,
        'pokemon-card--selectable': selectable,
      },
    ]"
    @click="handleClick"
  >
    <div class="pokemon-card__image-wrapper">
      <img :src="card.imgUrl" :alt="card.name" class="pokemon-card__image" />
      <span class="pokemon-card__pokedex"
        >#{{ String(card.pokedexNumber).padStart(3, '0') }}</span
      >
      <div v-if="selected" class="pokemon-card__check">✓</div>
    </div>

    <div class="pokemon-card__body">
      <div class="pokemon-card__header">
        <span class="pokemon-card__name">{{ card.name }}</span>
        <span
          class="pokemon-card__type"
          :style="{ backgroundColor: typeColor }"
          >{{ card.type }}</span
        >
      </div>

      <div class="pokemon-card__stats">
        <span class="pokemon-card__stat">
          ❤️ <strong>{{ card.hp }}</strong> HP
        </span>
        <span class="pokemon-card__stat">
          ⚔️ <strong>{{ card.attack }}</strong> ATK
        </span>
      </div>

      <div v-if="currentHp !== undefined" class="pokemon-card__hp-bar">
        <div
          class="pokemon-card__hp-bar-fill"
          :style="{
            width: `${hpPercent}%`,
            backgroundColor: hpBarColor,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useColors } from '../composables/useColors.js'
import type { Card } from '../types/index.js'

const props = withDefaults(
  defineProps<{
    card: Card
    size?: 'sm' | 'md'
    selected?: boolean
    disabled?: boolean
    selectable?: boolean
    currentHp?: number
  }>(),
  {
    size: 'md',
    selected: false,
    disabled: false,
    selectable: false,
  },
)

const emit = defineEmits<(e: 'click', card: Card) => void>()

const { getTypeColor, hpColor } = useColors()

const typeColor = computed(() => getTypeColor(props.card.type))

const hpPercent = computed(() => {
  if (props.currentHp === undefined) return 100
  return Math.max(0, Math.min(100, (props.currentHp / props.card.hp) * 100))
})

const hpBarColor = computed(() => hpColor(hpPercent.value))

const handleClick = () => {
  if (!props.disabled && props.selectable) {
    emit('click', props.card)
  }
}
</script>

<style scoped>
.pokemon-card {
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.15s,
    box-shadow 0.15s,
    opacity 0.15s;
  display: flex;
  flex-direction: column;
}

.pokemon-card--selectable {
  cursor: pointer;
}

.pokemon-card--selectable:hover:not(.pokemon-card--disabled) {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.pokemon-card--selected {
  border: 3px solid #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}

.pokemon-card--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Tailles */
.pokemon-card--sm .pokemon-card__image {
  height: 80px;
}

.pokemon-card--sm .pokemon-card__name {
  font-size: 0.75rem;
}

.pokemon-card--sm .pokemon-card__stat {
  font-size: 0.65rem;
}

.pokemon-card--sm .pokemon-card__type {
  font-size: 0.6rem;
  padding: 1px 5px;
}

.pokemon-card--md .pokemon-card__image {
  height: 130px;
}

.pokemon-card--md .pokemon-card__name {
  font-size: 0.95rem;
}

.pokemon-card--md .pokemon-card__stat {
  font-size: 0.78rem;
}

/* Image */
.pokemon-card__image-wrapper {
  position: relative;
  background: linear-gradient(135deg, #f0f4ff, #e8eeff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-card__image {
  width: 100%;
  object-fit: contain;
}

.pokemon-card__pokedex {
  position: absolute;
  top: 6px;
  left: 8px;
  font-size: 0.65rem;
  color: #888;
  font-weight: 600;
}

.pokemon-card__check {
  position: absolute;
  top: 6px;
  right: 8px;
  background: #6366f1;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}

/* Body */
.pokemon-card__body {
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.pokemon-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.pokemon-card__name {
  font-weight: 700;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pokemon-card__type {
  color: white;
  border-radius: 20px;
  padding: 2px 8px;
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}

.pokemon-card__stats {
  display: flex;
  gap: 8px;
}

.pokemon-card__stat {
  color: #555;
}

/* HP bar */
.pokemon-card__hp-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 99px;
  overflow: hidden;
}

.pokemon-card__hp-bar-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.3s;
}
</style>
