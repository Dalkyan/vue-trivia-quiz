<template>
  <main class="summary flex-center flex-col" v-if="myAnswers[0] != ''">
    <h2 class="text-indigo-800 text-xl">
      Your score:
      <span :class="{ grow: percentageCounter == correctAnswersCounter * 10 }"
        >{{ percentageCounter }}%</span
      >
      correct
    </h2>
    <div
      class="place-self-center w-1/2 bg-indigo-200 border-indigo-800 rounded-full h-2.5 mb-4"
    >
      <div
        class="bg-orange-500 h-2.5 rounded-full"
        :style="progressBar(counter)"
      ></div>
    </div>

    <div
      @click="show = !show"
      class="cursor-pointer rounded-lg p-2 shadow-[2px_2px] shadow-orange-800 border-indigo-800 border-4"
    >
      <h2 class="hover:animate-pulse">
        Click to <span v-if="!show">check</span><span v-else>close</span> your
        answers
      </h2>
      <transition name="grow">
        <div v-if="show" class="grid grid-cols-2 place-content-start grid-">
          <div
            class="flex flex-col justify-between m-1 border-orange-500 border-4 rounded place-self-stretch"
            v-for="(answer, index) in myAnswers"
            :key="index"
          >
            <p>
              {{ index + 1 }}. {{ decodeURIComponent(questionsArray[index]) }}
            </p>
            <div class="flex-center flex-wrap border-indigo-800 border-4">
              <p>
                <span v-if="isCorrectArray[index]"> ✅ </span>
                <span v-else-if="!isCorrectArray[index]">❌</span
                ><span
                  class="font-bold"
                  :class="{ wrong: !isCorrectArray[index] }"
                  >{{ decodeURIComponent(answer) }}</span
                >
              </p>
              <p class="mx-2 font-bold" v-if="!isCorrectArray[index]">
                {{ decodeURIComponent(correctAnswers[index]) }}
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <router-link
      class="rounded-2xl self-center m-2 p-2 border-2 text-lg shadow-sm shadow-orange-800 border-indigo-800 bg-orange-500 text-indigo-800 hover:bg-indigo-800 hover:text-orange-500 hover:border-orange-500"
      to="/"
      >Play again?</router-link
    >
  </main>
  <main v-else-if="myAnswers[0] == ''" class="flex-center flex-col">
    <h2>No results to show, because you haven't played the game yet!</h2>
    <router-link
      class="rounded-2xl self-center m-2 p-2 border-2 text-lg shadow-sm shadow-orange-800 border-indigo-800 bg-orange-500 text-indigo-800 hover:bg-indigo-800 hover:text-orange-500 hover:border-orange-500"
      to="/"
      >Play the game</router-link
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
const show = ref(false);

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
console.log(myAnswers.value);
</script>
<style scoped>
.wrong {
  text-decoration: line-through red;
  font-weight: 200;
}
.grow {
  font-size: 2em;
  color: rgb(249 115 22);
}
</style>
