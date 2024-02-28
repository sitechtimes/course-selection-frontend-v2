import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useRouter } from "vue-router";
import { grade, status, surveyAnswer, surveyQuestion, surveyStore, surveyStringAnswer, classReferenced } from "../types/interface";
import axios from "axios";

export const useSurveyStore = defineStore("survey", {
  state: (): surveyStore => ({
    currentAnsweredSurvey: {answers: "[{}]", email: "", grade: "FRESHMAN", status: "INCOMPLETE"},
    currentResponse: [{id: '', question: '', answer:{courses:[], preference: []}}],
    currentSurvey: {dueDate: "", grade: "FRESHMAN", question: [{id: "", questionType: "OTHER", status: 'STANDARD', question:'', classReferenced: null}]},
    loading: false,
    open: true,
    submit: false,
    missingAnswers: [],
  }),
  getters: {
    //
  },
  actions: {
    async checkSurveyAnswers() {
      this.missingAnswers = [];
      this.currentSurvey.question.forEach((question: surveyQuestion) => {
        const questionResponse: surveyStringAnswer | surveyAnswer | undefined = this.currentResponse.find((response) => response.id === question.id);

        const isGeneralOrBoolean = (question: surveyQuestion) => {
          return question.questionType === "GENERAL" || question.questionType || "BOOLEAN"
        }
        const isMissingOrNA = (response: surveyStringAnswer | surveyAnswer | undefined) => {
          if (!response) {
            return true
          }
          if (typeof response.answer === "string") {
            return response.answer.trim.length === 0;
          }
        }

        if(isGeneralOrBoolean(question) && isMissingOrNA(questionResponse)) {
          // check for general and boolean questions
          this.missingAnswers.push(question.id);
        } else if (questionResponse?.answer.courses.length === 0) {
          // check for questions regarding courses
          this.missingAnswers.push(question.id);
        }
      })
    },
    async setSurvey() {
      this.loading = true;
      this.checkSurveyAnswers();
    },
    
  },
  persist: {
    storage: sessionStorage
  },
});