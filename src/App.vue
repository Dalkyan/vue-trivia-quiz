<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
route.name == "home";
</script>

<template>
  <div class="h-screen grid grid-rows-[min-content_auto]">
    <header class="md:mt-4">
      <h1
        class="text-xl md:text-4xl mb-1 lg:mb-4 text-indigo-800 font-bold text-shadow"
        :class="{ huge: route.name === 'home' }"
      >
        <router-link to="/"> Trivia Quiz </router-link>
      </h1>
      <hr class="border-t-orange-500 border-b-indigo-800 border-4" />
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
.huge {
  @apply text-6xl lg:text-9xl;
}
.text-shadow {
  text-shadow: 0 1px rgb(249 115 22);
}
</style>
