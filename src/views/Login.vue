<script setup lang="ts">
import { ref } from 'vue';
import LoginService from '@/service/LoginService';
import router from "@/router";

const loginService = new LoginService();
const username = ref('');
const password = ref('');
const loginError = ref('');

const handleLogin = async () => {
  try {
    const response = await loginService.login(username.value, password.value);
    if (response) {
      console.log('Login successful:', response);
      await router.push("/customers/")
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error(error);
    loginError.value = 'Failed to login. Please check your credentials.';
  }
};
</script>

<template>
  <v-container>
    <v-card class="pa-4">
      <v-form @submit.prevent="handleLogin">
        <v-text-field
          label="Name"
          v-model="username"
          required
        ></v-text-field>

        <v-text-field
          label="Password"
          type="password"
          v-model="password"
          required
        ></v-text-field>

        <v-alert
          v-if="loginError"
          type="error"
          class="my-3"
        >
          {{ loginError }}
        </v-alert>

        <v-btn color="primary" type="submit">Login</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 400px;
  margin: 50px auto;
}

.v-card {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
</style>

