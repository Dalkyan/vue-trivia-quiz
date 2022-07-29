import { defineStore } from "pinia";
import axios from "axios";
import console from "console";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    quizzes: [] as quizResponse,
    array: [] as string[],
  }),
  getters: {
    getQuizzes(state) {
      return state.quizzes.results;
    },
    getAnswers(): string[] {
      this.quizzes.results.map((el) => {
        this.array.push(el.correct_answer);
        this.array.push(...el.incorrect_answers);
      });
      return this.array;
    },
    getCorrectAnswer(number: number): string{
      this.quizzes.results[number]
    },
  },
  actions: {
    async fetchQuizzes() {
      try {
        const data = await axios.get("https://opentdb.com/api.php?amount=10");
        this.quizzes = data.data;
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
  },
});

interface quizResponse {
  results: answers[];
}
interface answers {
  correct_answer: string;
  incorrect_answers: string[];
}
