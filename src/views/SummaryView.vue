<template>
  <div class="summary">
    <h2>Here goes summary</h2>
    <!-- <button class="rounded m-2 p-2 bg-emerald-600" @click="store.fetchQuizzes()">Fetch fetchQuizzes</button> -->
    <button class="rounded m-2 p-2 bg-emerald-600" @click="toConsole">
      get Quizzes
    </button>
  </div>
</template>
<script setup lang="ts">
import { useQuizStore } from "@/stores/useQuizStore";
import { onMounted } from "vue";

const store = useQuizStore();

onMounted(() => {
  store.fetchQuizzes();
  console.log("Does it work?");
});

let array: [] = [];
array = store.quizzes.results;

const toConsole = () => {
  console.log(array);
};
</script>
<style></style>
