import { defineStore } from "pinia";

export const useQuizStore = defineStore({
  id: "results",
  state: () => ({
    answeredCounter: 0,
    questionNumber: 1,
    selectedAnswer: Array(10).fill(0),
  }),
  getters: {
    getAnsweredCounter: (state) => state.answeredCounter,
  },
  actions: {
    incrementCounter(){
      this.answeredCounter++;
    }
  },
});
