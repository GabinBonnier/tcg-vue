import type {
  AuthResponse,
  Card,
  Deck,
  DeckPayload,
  SignInPayload,
  SignUpPayload,
} from '../types/index.js'

// ─── Données mockées ───────────────────────────────────────────────────────────

const MOCK_CARDS: Card[] = [
  {
    id: 1,
    name: 'Bulbizarre',
    hp: 45,
    attack: 49,
    type: 'Grass',
    pokedexNumber: 1,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  },
  {
    id: 2,
    name: 'Herbizarre',
    hp: 60,
    attack: 62,
    type: 'Grass',
    pokedexNumber: 2,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
  },
  {
    id: 3,
    name: 'Florizarre',
    hp: 80,
    attack: 82,
    type: 'Grass',
    pokedexNumber: 3,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
  },
  {
    id: 4,
    name: 'Salamèche',
    hp: 39,
    attack: 52,
    type: 'Fire',
    pokedexNumber: 4,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  },
  {
    id: 5,
    name: 'Reptincel',
    hp: 58,
    attack: 64,
    type: 'Fire',
    pokedexNumber: 5,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png',
  },
  {
    id: 6,
    name: 'Dracaufeu',
    hp: 78,
    attack: 84,
    type: 'Fire',
    pokedexNumber: 6,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
  },
  {
    id: 7,
    name: 'Carapuce',
    hp: 44,
    attack: 48,
    type: 'Water',
    pokedexNumber: 7,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
  },
  {
    id: 8,
    name: 'Carabaffe',
    hp: 59,
    attack: 63,
    type: 'Water',
    pokedexNumber: 8,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png',
  },
  {
    id: 9,
    name: 'Tortank',
    hp: 79,
    attack: 83,
    type: 'Water',
    pokedexNumber: 9,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png',
  },
  {
    id: 10,
    name: 'Chenipan',
    hp: 45,
    attack: 30,
    type: 'Bug',
    pokedexNumber: 10,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png',
  },
  {
    id: 11,
    name: 'Chrysacier',
    hp: 50,
    attack: 25,
    type: 'Bug',
    pokedexNumber: 11,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png',
  },
  {
    id: 12,
    name: 'Papilusion',
    hp: 60,
    attack: 45,
    type: 'Bug',
    pokedexNumber: 12,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png',
  },
  {
    id: 25,
    name: 'Pikachu',
    hp: 35,
    attack: 55,
    type: 'Electric',
    pokedexNumber: 25,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  },
  {
    id: 26,
    name: 'Raichu',
    hp: 60,
    attack: 90,
    type: 'Electric',
    pokedexNumber: 26,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png',
  },
  {
    id: 39,
    name: 'Rondoudou',
    hp: 115,
    attack: 45,
    type: 'Normal',
    pokedexNumber: 39,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png',
  },
  {
    id: 52,
    name: 'Miaouss',
    hp: 40,
    attack: 45,
    type: 'Normal',
    pokedexNumber: 52,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png',
  },
  {
    id: 54,
    name: 'Psykokwak',
    hp: 50,
    attack: 52,
    type: 'Water',
    pokedexNumber: 54,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png',
  },
  {
    id: 63,
    name: 'Abra',
    hp: 25,
    attack: 20,
    type: 'Psychic',
    pokedexNumber: 63,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png',
  },
  {
    id: 94,
    name: 'Gengar',
    hp: 60,
    attack: 65,
    type: 'Ghost',
    pokedexNumber: 94,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png',
  },
  {
    id: 131,
    name: 'Lokhlass',
    hp: 130,
    attack: 85,
    type: 'Water',
    pokedexNumber: 131,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png',
  },
  {
    id: 133,
    name: 'Évoli',
    hp: 55,
    attack: 55,
    type: 'Normal',
    pokedexNumber: 133,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png',
  },
  {
    id: 143,
    name: 'Ronflex',
    hp: 160,
    attack: 110,
    type: 'Normal',
    pokedexNumber: 143,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png',
  },
  {
    id: 147,
    name: 'Minidraco',
    hp: 41,
    attack: 64,
    type: 'Dragon',
    pokedexNumber: 147,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png',
  },
  {
    id: 149,
    name: 'Dracolosse',
    hp: 91,
    attack: 134,
    type: 'Dragon',
    pokedexNumber: 149,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
  },
  {
    id: 150,
    name: 'Mewtwo',
    hp: 106,
    attack: 110,
    type: 'Psychic',
    pokedexNumber: 150,
    imgUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png',
  },
]

// ─── État local mocké ──────────────────────────────────────────────────────────

let mockUser = { id: 1, email: 'ash@pokemon.com', username: 'Ash' }
const mockToken = 'mock-jwt-token'
let mockDecks: Deck[] = [
  {
    id: 1,
    name: 'Deck Feu',
    userId: 1,
    cards: [4, 5, 6, 25, 26, 94, 150, 149, 143, 133].map((cardId, i) => ({
      id: i + 1,
      deckId: 1,
      cardId,
    })),
  },
]
let nextDeckId = 2

// ─── Simulateur de délai réseau ────────────────────────────────────────────────

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

// ─── Composable ───────────────────────────────────────────────────────────────

export function useApi() {
  const signIn = async ({
    email,
    password,
  }: SignInPayload): Promise<AuthResponse> => {
    await delay()
    if (!email || !password) throw new Error('Email et mot de passe requis')
    mockUser = { id: 1, email, username: email.split('@')[0] }
    return { token: mockToken, user: mockUser }
  }

  const signUp = async ({
    email,
    password,
    username,
  }: SignUpPayload): Promise<AuthResponse> => {
    await delay()
    if (!email || !password || !username)
      throw new Error('Tous les champs sont requis')
    mockUser = { id: 1, email, username }
    return { token: mockToken, user: mockUser }
  }

  const getCards = async (): Promise<Card[]> => {
    await delay()
    return MOCK_CARDS
  }

  const getMyDecks = async (): Promise<Deck[]> => {
    await delay()
    return mockDecks
  }

  const getDeck = async (id: string | number): Promise<Deck> => {
    await delay()
    const deck = mockDecks.find((d) => d.id === Number(id))
    if (!deck) throw new Error('Deck introuvable')
    return deck
  }

  const createDeck = async ({ name, cards }: DeckPayload): Promise<Deck> => {
    await delay()
    const newDeck: Deck = {
      id: nextDeckId++,
      name,
      userId: mockUser.id,
      cards: cards.map((cardId, i) => ({
        id: i + 1,
        deckId: nextDeckId - 1,
        cardId,
      })),
    }
    mockDecks.push(newDeck)
    return newDeck
  }

  const updateDeck = async (
    id: string | number,
    { name, cards }: DeckPayload,
  ): Promise<Deck> => {
    await delay()
    const index = mockDecks.findIndex((d) => d.id === Number(id))
    if (index === -1) throw new Error('Deck introuvable')
    mockDecks[index] = {
      ...mockDecks[index],
      name,
      cards: cards.map((cardId, i) => ({
        id: i + 1,
        deckId: Number(id),
        cardId,
      })),
    }
    return mockDecks[index]
  }

  const deleteDeck = async (id: string | number): Promise<unknown> => {
    await delay()
    mockDecks = mockDecks.filter((d) => d.id !== Number(id))
    return {}
  }

  return {
    signIn,
    signUp,
    getCards,
    getMyDecks,
    getDeck,
    createDeck,
    updateDeck,
    deleteDeck,
  }
}
