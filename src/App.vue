<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
route.name == "home";
</script>

<template>
  <div class="h-screen grid grid-rows-[min-content_auto]">
    <header class="md:mt-4">
      <router-link to="/"
        ><h1
          class="text-xl md:text-4xl lg:mb-4 text-indigo-800 font-bold"
          :class="{ huge: route.name === 'home' }"
        >
          Trivia Quiz
        </h1></router-link
      >
      <hr />
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
</style>
