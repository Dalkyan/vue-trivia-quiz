<template>
  <div class="summary flex-center flex-col">
    <h2>Here goes summary</h2>
    <div class="place-self-center w-1/2 bg-indigo-200 rounded-full h-2.5 mb-4">
      <div
        class="bg-orange-500 h-2.5 rounded-full"
        :style="progressBar(counter)"
      ></div>
    </div>
    <h3>{{ percentageCounter }}% correct</h3>
  </div>
</template>
<script setup lang="ts">
import { useQuizStore } from "@/stores/useQuizStore";
import { reactive, ref } from "vue";

const store = useQuizStore();
const counter = ref(0);
const percentageCounter = ref(0);
const correctAnswersCounter = 8;
const incrementInterval = setInterval(() => {
  counter.value++;
  if (counter.value === correctAnswersCounter) clearInterval(incrementInterval);
}, 100);
const incrementPercentage = setInterval(() => {
  percentageCounter.value++;
  if (percentageCounter.value === correctAnswersCounter * 10)
    clearInterval(incrementPercentage);
}, 10);

//progressBar
const progressBar = (counter: number) => {
  return reactive({
    width: counter + "0%",
  });
};
</script>
<style></style>
