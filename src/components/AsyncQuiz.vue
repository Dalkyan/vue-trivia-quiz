<template>
  <div>Hello</div>
  <button class="bg-indigo-800 p-2 m-2" v-for="el in fetchQuiz()">
    {{ el }}
  </button>
</template>

<script setup lang="ts">
import { useQuizStore } from "@/stores/useQuizStore";
import axios from "axios";
import { computed, onMounted } from "vue";

const url = "https://opentdb.com/api.php?amount=10";
const fetchQuiz = async ()=> {
  try {
    const res  = await fetch(url);
    const quizResults = await res.json();
    console.log(res);
    console.log(quizResults.results);
    return res;
  } catch (error) {
    return "error";
  }
}

const number = 0;

interface quizResponse{
  results : string[];
}
</script>

<style lang="scss" scoped></style>
