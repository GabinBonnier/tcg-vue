import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import { useAuthStore } from './stores/auth.js'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
} as const

const routes = [
  { path: ROUTES.HOME, component: HomePage, meta: { requiresAuth: true } },
  { path: ROUTES.LOGIN, component: LoginPage },
  { path: ROUTES.REGISTER, component: RegisterPage },
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
