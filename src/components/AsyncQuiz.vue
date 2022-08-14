<template>
  <div class="grid">
    <div class="flex justify-center align-justify flex-col">
      <h2>Answered {{ answeredCounter }} out of {{ array.length }}</h2>
      <div
        class="place-self-center w-1/2 bg-indigo-200 rounded-full h-2.5 mb-4"
      >
        <div
          class="bg-orange-500 h-2.5 rounded-full"
          :style="progressBar(answeredCounter)"
        ></div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="min-h-max overflow-hidden" :key="questionNumber">
        <h2 class="text-l md:text-xl">Question number {{ questionNumber }}:</h2>

        <div>
          <h3 class="text-xl lg:text-2xl m-2 lg:m-6">
            {{
              decodeURIComponent(array[decrease(questionNumber, 1)].question)
            }}
          </h3>
        </div>
        <div class="flex-center flex-col flex-wrap">
          <div
            class="flex-center w-10/12"
            v-for="(oneAnswer, index) in allAnswers[
              decrease(questionNumber, 1)
            ]"
            :key="index"
          >
            <button
              class="btn w-3/4 rounded-full ml-0"
              :class="{
                orange:
                  increase(index, 1) ===
                  selectedAnswer[decrease(questionNumber, 1)],
              }"
              @click="selectAnswer(index)"
            >
              {{ decodeURIComponent(oneAnswer) }}
            </button>
          </div>
        </div>
      </div>
    </transition>
    <div class="nav mt-8">
      <button
        class="prev uppercase px-2 rounded-l-full border-2 lg:text-3xl bg-indigo-500 text-orange-300 hover:bg-indigo-800"
        :class="{ disabled: questionNumber <= 1 }"
        @click="questionNumber--"
      >
        Prev
      </button>
      <div class="btns">
        <template v-for="(i, index) in array.length" :key="index">
          <button
            class="btns rounded-lg w-8 md:m-2 border-2 lg:text-3xl bg-indigo-200 hover:bg-indigo-800 hover:text-indigo-100 hover:-translate-y-1"
            :class="{
              orange: selectedAnswer[index],
              'active-question': questionNumber === increase(index, 1),
            }"
            @click="questionNumber = increase(index, 1)"
          >
            {{ i }}
          </button>
        </template>
      </div>
      <button
        class="next uppercase px-2 rounded-r-full border-2 lg:text-3xl bg-indigo-500 text-orange-300 hover:bg-indigo-800"
        :class="{ disabled: questionNumber >= array.length }"
        @click="questionNumber++"
      >
        Next
      </button>
    </div>
    <router-link
      to="/summary"
      @click="submitAnswers()"
      :class="{ disabled: answeredCounter < 10 }"
      class="rounded-2xl self-center m-2 p-2 border-2 text-lg lg:text-3xl border-indigo-800 bg-orange-500 text-indigo-800"
    >
      Submit your answers</router-link
    >
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from "@/stores/useQuizStore";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

// const answerLetter = ["A", "B", "C", "D"];
const quizStore = useQuizStore();
const {
  answeredCounter,
  questionNumber,
  selectedAnswer,
  myAnswers,
  correctAnswers,
  questionsArray,
} = storeToRefs(useQuizStore());
//async function to fetch data from API
const url = "https://opentdb.com/api.php?amount=10&encode=url3986";
const fetchQuiz = async () => {
  try {
    quizStore.$reset();
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
function getQuestion(index: number): string {
  return array.value[index].question;
}
for (let index = 0; index < array.value.length; index++) {
  questionsArray.value[index] = getQuestion(index);
}

const allAnswers = Array(10);
const localCorrectAnswers = Array(10);
for (let i = 0; i < allAnswers.length; i++) {
  allAnswers[i] = [...getIncorrectAnswers(i), getCorrectAnswer(i)];
  localCorrectAnswers[i] = [getCorrectAnswer(i)];
}
correctAnswers.value = localCorrectAnswers;

const selectAnswer = (number: number) => {
  console.log(allAnswers[questionNumber.value - 1][number]);
  if (!selectedAnswer.value[questionNumber.value - 1]) {
    quizStore.incrementCounter();
  }
  selectedAnswer.value[questionNumber.value - 1] = number + 1;
  console.log(
    " For question number:",
    questionNumber.value,
    " selected answer is:",
    selectedAnswer.value[questionNumber.value - 1]
  );
  myAnswers.value[questionNumber.value - 1] =
    allAnswers[questionNumber.value - 1][number];
};
const submitAnswers = () => {
  console.log("Answers submitted");
  console.log(decodeURIComponent(myAnswers.value.toString()));
  console.log("Correct answers:");
  console.log(decodeURIComponent(correctAnswers.value.toString()));
  console.log(decodeURIComponent(localCorrectAnswers.toString()));
};
const increase = (number: number, howMuch: number) => {
  return number + howMuch;
};
const decrease = (number: number, howMuch: number) => {
  return number - howMuch;
};
//progressBar
const progressBar = (counter: number) => {
  return reactive({
    width: counter + "0%",
  });
};
</script>

<style scoped>
.disabled {
  opacity: 0.2;
  pointer-events: none;
}
.orange {
  @apply bg-orange-500 hover:bg-orange-800;
}
.active-question {
  @apply border-indigo-800 scale-125;
}

/* grid for navigation buttons to prevent exceeding width on small screens; */
.prev {
  grid-area: prev;
}
.next {
  grid-area: next;
}
.btns {
  grid-area: btns;
}
.nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content min-content;
  gap: 0px 0px;
  grid-template-areas:
    "prev next"
    "btns btns";
}

@media (min-width: 640px) {
  .nav {
    @apply flex flex-row justify-center items-center;
  }
}
</style>
