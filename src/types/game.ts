import type { Card } from './card.js'

export interface PlayerBoard {
  userId: number
  username: string
  hand: Card[]
  activeCard: (Card & { currentHp: number }) | null
  deckCount: number
  score: number // nombre de KOs (0 à 3)
}

export interface GameState {
  roomId: string
  hostId: number
  guestId: number
  currentTurnUserId: number
  host: PlayerBoard
  guest: PlayerBoard
  lastMessage: string | null
}

export interface Room {
  id: string
  hostUsername: string
  guestCount: number // 0 ou 1
}

export type GameResult = 'win' | 'loss' | null
