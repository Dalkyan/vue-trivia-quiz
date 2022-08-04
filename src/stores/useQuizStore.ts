import { defineStore } from "pinia";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    answeredCounter: 0,
    questionNumber: 1,
    questionsArray: Array(10).fill(""),
    selectedAnswer: Array(10).fill(0),
    myAnswers: Array(10).fill(""),
    correctAnswers: Array(10).fill(""),
  }),
  getters: {
    getAnsweredCounter: (state) => state.answeredCounter,
  },
  actions: {
    incrementCounter() {
      this.answeredCounter++;
    },
  },
});
