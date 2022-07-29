<template>
  <div>Hello</div>
  <button class="bg-indigo-800 p-2 m-2" v-for="el in array">
    {{ el }}
  </button>
</template>

<script setup lang="ts">
import { useQuizStore } from "@/stores/useQuizStore";
import { computed, onMounted } from "vue";

const number = 0;
const store = useQuizStore();
const getQuizzes = computed(() => {
  return store.getQuizzes;
});
const array = computed(()=>{
  return store.getAnswers;
});

// const questions = (number) => {getQuizzes.value[number]}
onMounted(() => {
  store.fetchQuizzes();
  console.log("Does it work?");
  console.log(array);
});
</script>

<style lang="scss" scoped></style>
