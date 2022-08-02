<template>
  <Suspense>
    <AsyncQuiz></AsyncQuiz>
    <template #fallback>
     <h2>Loading...</h2>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import AsyncQuiz from "@/components/AsyncQuiz.vue";

const answeredCounter = ref(2);
const isAnswered = ref(false);
const progressBar = reactive({
  width: answeredCounter.value + "0%",
});

function toggle() {
  return (isAnswered.value = !isAnswered.value);
}
</script>
<style>
.orange {
  @apply bg-orange-500;
}
</style>
