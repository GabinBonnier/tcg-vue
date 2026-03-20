import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useApi } from '../composables/useApi.js'
import { useStorage } from '../composables/useStorage.js'
import type {
  AuthResponse,
  SignInPayload,
  SignUpPayload,
  User,
} from '../types/index.js'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const storage = useStorage()

  const token = ref<string | null>(storage.get<string>(TOKEN_KEY))
  const user = ref<User | null>(storage.get<User>(USER_KEY))

  const isAuthenticated = computed(() => Boolean(token.value && user.value))

  const persistAuth = () => {
    if (token.value && user.value) {
      storage.set(TOKEN_KEY, token.value)
      storage.set(USER_KEY, user.value)
      return
    }

    storage.remove(TOKEN_KEY, USER_KEY)
  }

  const setAuth = (auth: AuthResponse) => {
    token.value = auth.token
    user.value = auth.user
    persistAuth()
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    persistAuth()
  }

  const signIn = async (payload: SignInPayload) => {
    const auth = await api.signIn(payload)
    setAuth(auth)
    return auth
  }

  const signUp = async (payload: SignUpPayload) => {
    const auth = await api.signUp(payload)
    setAuth(auth)
    return auth
  }

  return {
    token,
    user,
    isAuthenticated,
    setAuth,
    clearAuth,
    signIn,
    signUp,
  }
})
