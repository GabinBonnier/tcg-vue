<template>
  <div class="auth-page">
    <NCard title="Inscription" class="auth-card">
      <NAlert v-if="errorMessage" type="error" style="margin-bottom: 16px">
        {{ errorMessage }}
      </NAlert>

      <NForm @submit.prevent="onSubmit">
        <NFormItem label="Nom d'utilisateur">
          <NInput
            v-model:value="form.username"
            placeholder="Votre pseudo"
            :disabled="isSubmitting"
          />
        </NFormItem>

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
            placeholder="Choisissez un mot de passe"
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
          Créer le compte
        </NButton>
      </NForm>

      <NText depth="3" style="display: block; margin-top: 16px">
        Déjà inscrit ?
        <RouterLink :to="ROUTES.LOGIN">Se connecter</RouterLink>
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
  username: '',
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
    await authStore.signUp({
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
    })

    await router.push(resolveRedirect())
  } catch (error) {
    errorMessage.value =
      error instanceof Error
        ? error.message
        : "L'inscription a échoué. Veuillez réessayer."
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
