import { defineStore } from "pinia";

export const useResultsStore = defineStore({
  id: "results",
  state: () => ({
    answers: [""],
  }),
  getters: {},
  actions: {},
});
