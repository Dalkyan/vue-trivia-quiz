<template>
  <div class="quiz">
    <div class="flex-center flex-col m-6">
      <h2>Answered {{ answeredCounter }} out of {{ myNumber }}</h2>
      <div class="w-1/2 bg-indigo-200 rounded-full h-2.5 mb-4">
        <div
          class="bg-orange-500 h-2.5 rounded-full"
          :style="progressBar"
        ></div>
      </div>
    </div>
    <div><h2 class="text-2xl m-6">Here goes the question</h2></div>
    <div class="flex-center flex-col flex-wrap">
      <button class="btn" v-for="n in 4">
        Here goes answer number {{ n }}
      </button>
    </div>
    <div class="flex-center mt-8">
      <template v-for="n in myNumber">
        <button
          class="rounded w-8 md:m-2 border-2 bg-indigo-200 hover:bg-indigo-800 hover:text-indigo-100"
          :class="{ orange: isAnswered }"
          @click="toggle"
        >
          {{ n }}
        </button>
      </template>
    </div>
    <button
      disabled
      class="rounded p-2 border-2 border-indigo-800 bg-orange-500 text-indigo-800 disabled:bg-indigo-100 disabled:text-indigo-300 disabled:border-indigo-300"
    >
      Submit your answers
    </button>
  </div>
  <Suspense>
    <AsyncQuiz></AsyncQuiz>
    <template #fallback>Loading...</template>
  </Suspense>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import AsyncQuiz from "@/components/AsyncQuiz.vue";

const myNumber = 10;
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
