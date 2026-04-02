import { defineStore } from 'pinia'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { GameResult, GameState, Room } from '../types/game.js'
import { useAuthStore } from './auth.js'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

export const useGameStore = defineStore('game', () => {
  const authStore = useAuthStore()
  const router = useRouter()

  // ─── Socket ───────────────────────────────────────────────────────────────
  let socket: Socket | null = null

  // ─── État lobby ───────────────────────────────────────────────────────────
  const rooms = ref<Room[]>([])
  const currentRoomId = ref<string | null>(null)
  const lobbyError = ref<string | null>(null)

  // ─── État partie ──────────────────────────────────────────────────────────
  const gameState = ref<GameState | null>(null)
  const gameResult = ref<GameResult>(null)
  const opponentDisconnected = ref(false)

  // ─── Getters ──────────────────────────────────────────────────────────────
  const isMyTurn = computed(() => {
    if (!gameState.value || !authStore.user) return false
    return gameState.value.currentTurnUserId === authStore.user.id
  })

  const myRole = computed<'host' | 'guest' | null>(() => {
    if (!gameState.value || !authStore.user) return null
    return gameState.value.hostId === authStore.user.id ? 'host' : 'guest'
  })

  const myBoard = computed(() => {
    if (!gameState.value || !myRole.value) return null
    return myRole.value === 'host'
      ? gameState.value.host
      : gameState.value.guest
  })

  const opponentBoard = computed(() => {
    if (!gameState.value || !myRole.value) return null
    return myRole.value === 'host'
      ? gameState.value.guest
      : gameState.value.host
  })

  // ─── Connexion Socket ─────────────────────────────────────────────────────
  const connect = () => {
    if (socket?.connected) return

    socket = io(SOCKET_URL, {
      auth: { token: authStore.token },
    })

    socket.on('roomsList', (data: Room[]) => {
      rooms.value = data
    })

    socket.on('roomsListUpdated', (data: Room[]) => {
      rooms.value = data
    })

    socket.on('roomCreated', (roomId: string) => {
      currentRoomId.value = roomId
    })

    socket.on('gameStarted', (state: GameState) => {
      gameState.value = state
      router.push('/game')
    })

    socket.on('gameStateUpdated', (state: GameState) => {
      gameState.value = state
    })

    socket.on('gameEnded', (result: { winnerId: number }) => {
      if (!authStore.user) return
      gameResult.value = result.winnerId === authStore.user.id ? 'win' : 'loss'
    })

    socket.on('opponentDisconnected', () => {
      opponentDisconnected.value = true
    })

    socket.on('error', (message: string) => {
      lobbyError.value = message
    })
  }

  const disconnect = () => {
    socket?.disconnect()
    socket = null
  }

  // ─── Actions lobby ────────────────────────────────────────────────────────
  const createRoom = (deckId: number) => {
    lobbyError.value = null
    socket?.emit('createRoom', { deckId })
  }

  const joinRoom = (roomId: string, deckId: number) => {
    lobbyError.value = null
    socket?.emit('joinRoom', { roomId, deckId })
  }

  // ─── Actions de jeu ──────────────────────────────────────────────────────
  const drawCards = () => {
    socket?.emit('drawCards')
  }

  const playCard = (cardId: number) => {
    socket?.emit('playCard', { cardId })
  }

  const attack = () => {
    socket?.emit('attack')
  }

  const endTurn = () => {
    socket?.emit('endTurn')
  }

  // ─── Reset ────────────────────────────────────────────────────────────────
  const resetGame = () => {
    gameState.value = null
    gameResult.value = null
    currentRoomId.value = null
    opponentDisconnected.value = false
    lobbyError.value = null
  }

  return {
    // État
    rooms,
    currentRoomId,
    lobbyError,
    gameState,
    gameResult,
    opponentDisconnected,
    // Getters
    isMyTurn,
    myRole,
    myBoard,
    opponentBoard,
    // Actions
    connect,
    disconnect,
    createRoom,
    joinRoom,
    drawCards,
    playCard,
    attack,
    endTurn,
    resetGame,
  }
})
