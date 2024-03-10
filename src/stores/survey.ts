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
    name: "",
  }),
  getters: {
    //
  },
  actions: {
    async checkSurveyAnswers() {
      this.missingAnswers = [];
      this.currentResponse.forEach((question: surveyQuestion, index: number) => {
        const isMissingOrNA = (response: surveyStringAnswer | surveyAnswer | undefined) => {
          if (!response) {
            return true;
          }
          if (typeof response.answer === "string" && response.answer.trim() === "") {
            return true;
          }
          return false;
        };
    
        if ((question.questionType === "GENERAL" || question.questionType === "BOOLEAN") && isMissingOrNA(question.answer)) {
          this.missingAnswers.push({ question, index });
        } else if ((question.questionType === "COURSES" || question.questionType === "PE" || question.questionType === "SCIENCE" || question.questionType === "TECH") && !question.answer?.courses) {
          this.missingAnswers.push({ question, index });
        }
      });
    },      
    async fetchSurvey(email: string) {
      const userStore = useUserStore();
      const url = userStore.userType === "student" ? "/student/survey" : `/guidance/survey/${email}`;

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
      console.log("Survey Data:", surveyData);

      this.currentSurvey = surveyData.survey;
      this.currentAnsweredSurvey = surveyData.answeredSurvey;

      this.studentCourses.coursesAvailable = surveyData.coursesAvailable;
      this.studentCourses.coursesTaken = surveyData.coursesTaken;

      this.name = surveyData.name;
      
      const surveyAnswers = surveyData.answeredSurvey.answers;
      if (surveyAnswers.length === 0) {
        // this.currentResponse = [];
        this.currentResponse = surveyData.survey.question;
      } else {
        // resolve type errors here
        const formattedResponses = userStore.userType === "guidance"
          ? surveyData.answeredSurvey.answers
          : JSON.parse(surveyData.answeredSurvey.answers);
        this.currentResponse = formattedResponses;

        // .filter((answer) => answer.answer)
        // .map((answer) => ({
        //   id: answer.id,
        //   question: answer.question,
        //   answer: answer.answer,
        // }))

      }
      console.log("Fetched and set student survey data.");
      console.log("Current Response:", this.currentResponse);
      console.log("Answered Survey:", this.currentAnsweredSurvey)
    },
    async postSurvey(status: "INCOMPLETE" | "COMPLETE" | "FINALIZED") {
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
      console.log("Missing Answers:", this.missingAnswers)
      // if (this.missingAnswers.length !== 0) return;
      if (userStore.userType === "student") {
        (this.missingAnswers.length !== 0) ? await this.postSurvey("INCOMPLETE") : await this.postSurvey("COMPLETE");
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