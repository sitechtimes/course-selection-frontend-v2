import { defineStore } from "pinia";
export const useSurveyStore = defineStore("survey", {
  state: () => ({
    currentSurvey: [],
    currentResponse: [],
    currentQuestion: [],
    loading: false,
  }),
  getters: {
    //
  },
  actions: {
    //
  },
  persist: true,
});
