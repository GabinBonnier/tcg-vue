import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useApi } from '../composables/useApi.js'
import { useStorage } from '../composables/useStorage.js'
import type { SignInPayload, SignUpPayload, User } from '../types/index.js'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  const storage = useStorage()

  const token = ref(storage.get('token'))
  const user = ref<User | null>(storage.get('user'))

  const isAuthenticated = computed(() => {
    return token.value && user.value ? true : false
  })

  const signIn = async (payload: SignInPayload) => {
    const response = await api.signIn(payload)
    storage.set(TOKEN_KEY, response.token)
    storage.set(USER_KEY, response.user)
    token.value = response.token
    user.value = response.user
  }

  const signUp = async (payload: SignUpPayload) => {
    const response = await api.signUp(payload)
    storage.set(TOKEN_KEY, response.token)
    storage.set(USER_KEY, response.user)
    token.value = response.token
    user.value = response.user
  }

  const signOut = async () => {
    storage.remove(TOKEN_KEY)
    storage.remove(USER_KEY)
    token.value = null
    user.value = null
  }
  return {
    token,
    user,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  }
})
