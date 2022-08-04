<template>
  <main class="grid">
    <Suspense>
      <AsyncQuiz></AsyncQuiz>
      <template #fallback>
        <div class="self-center">
          <h2 class="text-8xl animate-vertical-spinner">?</h2>
          <h2 class="text-4xl">Loading...</h2>
        </div>
      </template>
    </Suspense>
  </main>
</template>
<script setup lang="ts">
import AsyncQuiz from "@/components/AsyncQuiz.vue";
</script>
<style>
main {
  max-width: 100vw;
}
</style>
