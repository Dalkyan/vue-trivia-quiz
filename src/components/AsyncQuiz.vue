<template>
  <div class="quiz">
    <div class="flex-center flex-col m-6">
      <h2>Answered {{ answeredCounter }} out of {{ array.length }}</h2>
      <div class="w-1/2 bg-indigo-200 rounded-full h-2.5 mb-4">
        <div
          class="bg-orange-500 h-2.5 rounded-full"
          :style="progressBar"
        ></div>
      </div>
    </div>
    <div>
      <h2 class="text-2xl m-6">{{ decodeURIComponent(array[0].question) }}</h2>
    </div>
    <div class="flex-center flex-col flex-wrap">
      <div
        class="flex w-10/12"
        v-for="(oneAnswer, index) in allAnswers[0]"
        :key="index"
      >
        <div
          class="w-1/4 min-w-max btn text-4xl rounded-l-full rounded-r-none mr-0 bg-indigo-800 text-indigo-100"
        >
          {{ answerLetter[index] }}
        </div>
        <button
          class="btn w-3/4 min-w-max rounded-l-none rounded-r-full ml-0"
          style=""
          @click="selectAnswer(index)"
        >
          {{ decodeURIComponent(oneAnswer) }}
        </button>
      </div>
    </div>
    <div class="flex-center mt-8">
      <template v-for="(el, index) in array.length" :key="index">
        <button
          class="rounded w-8 md:m-2 border-2 bg-indigo-200 hover:bg-indigo-800 hover:text-indigo-100"
          :class="{ orange: quizStore.isAnswered[index - 1] }"
        >
          {{ el }}
        </button>
      </template>
    </div>
    <button
      disabled
      class="rounded-2xl p-2 border-2 border-indigo-800 bg-orange-500 text-indigo-800 disabled:bg-indigo-100 disabled:text-indigo-300 disabled:border-indigo-300"
    >
      Submit your answers
    </button>
  </div>

  <p>{{ correct_answer0 }}</p>
  <button
    class="bg-indigo-200 rounded-2xl w-12 h-12 border-2 p-2 m-2"
    v-for="el in array.length"
    :class="{ orange: quizStore.isAnswered[el - 1] }"
  >
    {{ el }}
  </button>
</template>

<script setup lang="ts">
import { useQuizStore } from "@/stores/useQuizStore";
import axios from "axios";
import { reactive, ref } from "vue";

const answerLetter = ["A", "B", "C", "D"];
const quizStore = useQuizStore();
const answeredCounter = ref(quizStore.answeredCounter);
//async function to fetch data from API
const url = "https://opentdb.com/api.php?amount=10&encode=url3986";
const fetchQuiz = async () => {
  try {
    const res = await fetch(url);
    const quizResults = await res.json();
    console.log(res);
    console.log(quizResults.results);
    return quizResults.results;
  } catch (error) {
    return "error";
  }
};
const array = ref(await fetchQuiz());
console.log(array.value);
function getCorrectAnswer(index: number): string {
  return array.value[index].correct_answer;
}

function getIncorrectAnswers(index: number): string[] {
  return array.value[index].incorrect_answers;
}

const badAnswers0 = getIncorrectAnswers(0);
const correct_answer0 = getCorrectAnswer(0);
const allAnswers0 = [...badAnswers0, correct_answer0].sort();
const allAnswers = Array(10);
for (let i = 0; i < allAnswers.length; i++) {
  allAnswers[i] = [...getIncorrectAnswers(i), getCorrectAnswer(i)];
}

[...badAnswers0, correct_answer0];
console.log(allAnswers0);

interface quizResponse {
  results: string[];
}

function selectAnswer(number: number) {
  //todo
}
//progressBar
const progressBar = reactive({
  width: answeredCounter.value + "0%",
});
</script>

<style scoped>
.orange {
  @apply bg-orange-500;
}
</style>
