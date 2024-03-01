import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { surveyAnswer, surveyQuestion, surveyStore, surveyStringAnswer, studentSurveyData } from "../types/interface";

export const useSurveyStore = defineStore("survey", {
  state: (): surveyStore => ({
    currentAnsweredSurvey: { answers: "[{}]", email: "", grade: "FRESHMAN", status: "INCOMPLETE" },
    currentResponse: [{ id: '', question: '', answer: { courses: [], preference: [] } }],
    currentSurvey: { dueDate: "", grade: "FRESHMAN", question: [{ id: "", questionType: "OTHER", status: 'STANDARD', question: '', classReferenced: null }] },
    loading: false,
    open: true,
    submit: false,
    missingAnswers: [],
    studentCourses: { coursesTaken: [], coursesAvailable: [] },
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
        
        if (isGeneralOrBoolean(question) && isMissingOrNA(questionResponse)) {
          // check for general and boolean questions
          this.missingAnswers.push(question.id);
        } else if (questionResponse?.answer.courses.length === 0) {
          // check for questions regarding courses
          this.missingAnswers.push(question.id);
        }
      })
    },
    async fetchSurvey() {
      const userStore = useUserStore();
      const url = userStore.userType === "student" ? "/student/survey/" : `/guidance/survey/${this.currentAnsweredSurvey.email}`;

      const res = await fetch(import.meta.env.VITE_URL + url, {
        method:
          "GET"
        ,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.access_token}`,
        },
      });
      const surveyData: studentSurveyData = await res.json();
      console.log(surveyData);

      this.currentSurvey = surveyData.survey;
      this.currentAnsweredSurvey = surveyData.answeredSurvey;

      this.studentCourses.coursesAvailable = surveyData.coursesAvailable;
      this.studentCourses.coursesTaken = surveyData.coursesTaken;
      
      if (Array.isArray(surveyData.answeredSurvey.answers)) {
        const formattedResponses= surveyData.answeredSurvey.answers
          .filter((answer) => answer.answer)
          .map((answer) => ({
            id: answer.id,
            question: answer.question,
            answer: answer.answer,
          }))
          this.currentResponse = formattedResponses
      } else {
        this.currentResponse = JSON.parse(surveyData.answeredSurvey.answers);
      }
      console.log("Fetched and set student survey data.");
    },
    async postSurvey(status: "COMPLETE" | "FINALIZED") {
      const userStore = useUserStore();
      const url = userStore.userType === "student" ? "/student/survey/" : `/guidance/survey/${this.currentAnsweredSurvey.email}`;
      try {
        await fetch(import.meta.env.VITE_URL + url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userStore.access_token}`,
          },
          body: JSON.stringify({
            grade: this.currentSurvey.grade,
            status: status,
            answers: JSON.stringify(this.currentResponse),
          })
        })
      } catch (error) {
        console.error("Error posting survey:", error);
      }
    },
    async saveSurvey() {
      const userStore = useUserStore();
      this.loading = true;
      await this.checkSurveyAnswers();
      console.log(this.missingAnswers)
      // if (this.missingAnswers.length !== 0) return;

      // students should be able to save their survey without setting the status to COMPLETE
      if (userStore.userType === "student") {
        await this.postSurvey("COMPLETE");
      } else if (userStore.userType === "guidance") {
        await this.postSurvey("FINALIZED");
      }
      this.loading = false;
    },

  },
  persist: {
    storage: sessionStorage
  },
});