<template>
  <v-app>

    <header>
      <app-bar></app-bar>
    </header>

    <v-main>
      <router-view></router-view>
    </v-main>

    <footer>
      <foot></foot>
    </footer>

  </v-app>
</template>

<script setup lang="ts">
  import AppBar from "@/components/AppBar.vue";
  import Foot from "@/components/Footer.vue";
</script>

<!--

Repo

Login

Add a cookie based authentication. (Token?)
Secure your client application. You can list and edit your data if you are authenticated.

-->
