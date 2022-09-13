<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
const route = useRoute();
route.name == "home";
</script>

<template>
  <div class="h-[90vh] grid grid-rows-[min-content_auto]">
    <header class="transition md:mt-4">
      <h1
        class="transition text-xl md:text-4xl mb-1 lg:mb-4 text-indigo-800 font-bold text-shadow"
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
</style>
