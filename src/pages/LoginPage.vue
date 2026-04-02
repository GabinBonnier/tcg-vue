<template>
  <div class="auth-page">
    <NCard title="Connexion" class="auth-card">
      <NAlert v-if="errorMessage" type="error" style="margin-bottom: 16px">
        {{ errorMessage }}
      </NAlert>

      <NForm @submit.prevent="onSubmit">
        <NFormItem label="Email">
          <NInput
            v-model:value="form.email"
            type="email"
            placeholder="vous@exemple.com"
            :disabled="isSubmitting"
          />
        </NFormItem>

        <NFormItem label="Mot de passe">
          <NInput
            v-model:value="form.password"
            type="password"
            show-password-on="click"
            placeholder="Votre mot de passe"
            :disabled="isSubmitting"
          />
        </NFormItem>

        <NButton
          attr-type="submit"
          type="primary"
          block
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          Se connecter
        </NButton>
      </NForm>

      <NText depth="3" style="display: block; margin-top: 16px">
        Pas encore de compte ?
        <RouterLink :to="ROUTES.REGISTER">Créer un compte</RouterLink>
      </NText>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { ROUTES } from '../router.js'
import { useAuthStore } from '../stores/auth.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isSubmitting = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: '',
})

const resolveRedirect = () => {
  const redirect = route.query.redirect
  if (typeof redirect === 'string' && redirect.startsWith('/')) {
    return redirect
  }

  return ROUTES.HOME
}

const onSubmit = async () => {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await authStore.signIn({
      email: form.email.trim(),
      password: form.password,
    })

    await router.push(resolveRedirect())
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Identifiants incorrects.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 12px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
}
</style>
