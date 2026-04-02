import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import CreateDeckPage from './pages/CreateDeckPage.vue'
import DeckDetailPage from './pages/DeckDetailPage.vue'
import GamePage from './pages/GamePage.vue'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import { useAuthStore } from './stores/auth.js'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CREATE_DECK: '/decks/create',
  DECK_DETAIL: '/decks/:id',
  GAME: '/game',
} as const

const routes = [
  { path: ROUTES.HOME, component: HomePage, meta: { requiresAuth: true } },
  { path: ROUTES.LOGIN, component: LoginPage },
  { path: ROUTES.REGISTER, component: RegisterPage },
  {
    path: ROUTES.CREATE_DECK,
    component: CreateDeckPage,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.DECK_DETAIL,
    component: DeckDetailPage,
    meta: { requiresAuth: true },
  },
  { path: ROUTES.GAME, component: GamePage, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const { isAuthenticated } = storeToRefs(authStore)
  if (to.meta.requiresAuth === true) {
    if (isAuthenticated.value === false) {
      router.push(ROUTES.LOGIN)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
