<template>
  <main class="summary flex-center flex-col">
    <h2 class="text-indigo-800 text-xl">
      Your Score: {{ percentageCounter }}% correct
    </h2>
    <div
      class="place-self-center w-1/2 bg-indigo-200 border-indigo-800 rounded-full h-2.5 mb-4"
    >
      <div
        class="bg-orange-500 h-2.5 rounded-full"
        :style="progressBar(counter)"
      ></div>
    </div>
    <details
      class="rounded-lg p-2 shadow-[2px_2px] shadow-orange-500 border-indigo-800 border-4 flex flex-col"
    >
      <summary>Click to check your answers</summary>
      <details class="flex" v-for="(answer, index) in myAnswers" :key="index">
        <summary>{{ index + 1 }}. question</summary>
        <p>{{ decodeURIComponent(questionsArray[index]) }}</p>
        <p class="flex-center gap-2">
          <span v-if="isCorrectArray[index]"> ✅ </span>
          <span v-else-if="!isCorrectArray[index]"
            >❌
            <!-- {{ decodeURIComponent(correctAnswers[index]) }} --> </span
          ><span :class="{ wrong: !isCorrectArray[index] }">{{ decodeURIComponent(answer) }}</span>
          <span v-if="!isCorrectArray[index]">{{decodeURIComponent(correctAnswers[index])}}</span>
        </p>
      </details>
      >
    </details>
    <router-link
      class="rounded-2xl self-center m-2 p-2 border-2 text-lg border-indigo-800 bg-orange-500 text-indigo-800"
      to="/"
      >Play again?</router-link
    >
  </main>
</template>
<script setup lang="ts">
import { useQuizStore } from "@/stores/useQuizStore";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

const { myAnswers, correctAnswers, questionsArray } = storeToRefs(
  useQuizStore()
);
const counter = ref(0);
const percentageCounter = ref(0);
const correctAnswersCounter = ref(0);
const isCorrectArray = ref(Array(10).fill(false));

for (let index = 0; index < correctAnswers.value.length; index++) {
  if (myAnswers.value[index] == correctAnswers.value[index]) {
    isCorrectArray.value[index] = true;
    console.log(index, isCorrectArray.value[index]);
    correctAnswersCounter.value++;
  }
}
if (correctAnswersCounter.value > 0) {
  const incrementInterval = setInterval(() => {
    counter.value++;
    if (counter.value == correctAnswersCounter.value)
      clearInterval(incrementInterval);
  }, 100);
  const incrementPercentage = setInterval(() => {
    percentageCounter.value++;
    if (percentageCounter.value == correctAnswersCounter.value * 10)
      clearInterval(incrementPercentage);
  }, 10);
}
//progressBar
const progressBar = (counter: number) => {
  return reactive({
    width: counter + "0%",
  });
};
console.log(isCorrectArray.value.toString());
</script>
<style>
.wrong {
  text-decoration: line-through red;
}
</style>
