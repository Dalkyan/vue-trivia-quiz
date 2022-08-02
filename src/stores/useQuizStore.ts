import { defineStore } from "pinia";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    answeredCounter: 0,
    isAnswered: Array(10).fill(false),
  }),
  getters: {
    getAnsweredCounter: (state) => state.answeredCounter,
  },
  actions: {},
});
