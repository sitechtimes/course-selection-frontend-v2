//@ts-nocheck
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import {
  Course,
  surveyAnswer,
  surveyQuestion,
  surveyStore,
  surveyStringAnswer,
  studentSurveyData,
} from "../types/interface";
import { ref } from "vue";

export const useSurveyStore = defineStore("survey", () => {
  const userStore = useUserStore();
  const loaded = ref(false);
  const open = ref(true);
  const submit = ref(false);
  const status = ref("");
  const missingAnswers = ref([]);
  const coursesTaken = ref<Course[]>([]);
  const coursesAvailable = ref<Course[]>([]);
  const survey = ref({} as Survey);
  const answers = ref<Question>([]);

  async function getSurvey(email: string = "") {
    const res = await fetch(import.meta.env.VITE_URL + "student/survey/", {
      credentials: "include",
    });
    if (!res.ok) {
      open.value = false;
      return;
    }
    const data: studentSurveyData = await res.json();
    survey.value = data.survey;
    status.value = data.survey.status;
    answers.value =
      data.survey.answers.length === 0
        ? data.survey.questions
        : data.survey.answers;
    coursesTaken.value = data.coursesTaken;
    coursesAvailable.value = data.coursesAvailable;
    loaded.value = true;
  }

  async function saveSurvey() {
    const res = await fetch(import.meta.env.VITE_URL + "student/survey/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers: answers.value,
      }),
    });
    if (res.ok) {
      status.value = "SAVED";
    }
  }

  function checkAnswers(a: any) {
    missingAnswers.value = [];
    answers.value.forEach((question) => {
      if (question.answer === "") {
        missingAnswers.value.push(question.id);
      }
    });

    const existingQuestions = survey.value.questions.map((q) => q.id);

    answers.value.forEach((question: surveyQuestion) => {
      if (!existingQuestions.includes(question.id)) return;
      const isMissingOrNA = (
        response: surveyStringAnswer | surveyAnswer | undefined
      ) => {
        let r: boolean = false;
        switch (question.questionType) {
          case "GENERAL":
            if (response.trim().length === 0) r = true;
            break;
          case "BOOLEAN":
            if (!response) r = true;
            break;
          case "DROPDOWN":
            if (response === null) r = true;
            break;
          case undefined:
            // final note to guidance counselor has no questionType nor status
            r = false;
            break;
          default:
            // for checkbox question type
            r = question.answer.courses.length === 0;
            break;
        }
        if (question.status === "OPTIONAL") r = false;
        return r;
      };

      if (isMissingOrNA(question.answer)) {
        if (!this.missingAnswers.includes(question.id)) {
          this.missingAnswers.push(question.id);
        }
      } else {
        const index = this.missingAnswers.indexOf(question.id);
        if (index !== -1) this.missingAnswers.splice(index, 1);
      }
    });
  }
  function $reset() {
    open.value = true;
    submit.value = false;
    loaded.value = false;
    missingAnswers.value = [];
    coursesTaken.value = [];
    coursesAvailable.value = [];
    survey.value = {} as studentSurveyData;
    answers.value = [];
    savedSurvey.value = {};
    status.value = "";
  }

  return {
    open,
    submit,
    missingAnswers,
    coursesTaken,
    coursesAvailable,
    answers,
    survey,
    loaded,
    getSurvey,
    status,
    saveSurvey,
    checkAnswers,
    $reset,
  };
});

export const useSurveyStore1 = defineStore("survey", {
  state: (): surveyStore => ({
    currentAnsweredSurvey: {
      answers: "[{}]",
      email: "",
      grade: "FRESHMAN",
      status: "INCOMPLETE",
    },
    currentResponse: [
      { id: "", question: "", answer: { courses: [], preference: [] } },
    ],
    currentSurvey: {
      dueDate: "",
      grade: "FRESHMAN",
      question: [
        {
          id: "",
          questionType: "OTHER",
          status: "STANDARD",
          question: "",
          classReferenced: null,
        },
      ],
    },
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
    async checkSurveyAnswers(
      answers: Array<surveyAnswer | surveyStringAnswer>
    ) {
      const existingQuestions = this.currentSurvey.question.map((q) => q.id);

      answers.forEach((question: surveyQuestion) => {
        if (!existingQuestions.includes(question.id)) return;
        const isMissingOrNA = (
          response: surveyStringAnswer | surveyAnswer | undefined
        ) => {
          let r: boolean = false;
          switch (question.questionType) {
            case "GENERAL":
              if (response.trim().length === 0) r = true;
              break;
            case "BOOLEAN":
              if (!response) r = true;
              break;
            case "DROPDOWN":
              if (response === null) r = true;
              break;
            case undefined:
              // final note to guidance counselor has no questionType nor status
              r = false;
              break;
            default:
              // for checkbox question type
              r = question.answer.courses.length === 0;
              break;
          }
          if (question.status === "OPTIONAL") r = false;
          return r;
        };

        if (isMissingOrNA(question.answer)) {
          if (!this.missingAnswers.includes(question.id)) {
            this.missingAnswers.push(question.id);
          }
        } else {
          const index = this.missingAnswers.indexOf(question.id);
          if (index !== -1) this.missingAnswers.splice(index, 1);
        }
      });
    },
    async fetchSurvey(email: string = "") {
      const url = !userStore.isGuidance
        ? "/student/survey"
        : `/guidance/survey/${email}`;

      this.loading = true;
      const res = await fetch(import.meta.env.VITE_URL + url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userStore.access_token}`,
        },
      });
      const surveyData: studentSurveyData = await res.json();

      this.currentSurvey = surveyData.survey;
      this.currentAnsweredSurvey = surveyData.answeredSurvey;
      this.studentCourses.coursesAvailable = surveyData.coursesAvailable;
      this.studentCourses.coursesTaken = surveyData.coursesTaken;
      this.name = surveyData.name;

      const surveyAnswers = surveyData.answeredSurvey.answers;
      if (surveyAnswers.length === 0) {
        this.currentResponse = surveyData.survey.question;
      } else {
        const formattedResponses = JSON.parse(
          surveyData.answeredSurvey.answers
        );
        this.currentResponse = formattedResponses;
      }

      //remove questions with empty choices except for "GENERAL", "BOOLEAN", "DROPDOWN", and "CHECKBOX" types
      this.currentSurvey.question = this.currentSurvey.question.filter(
        (question) => {
          if (
            ["GENERAL", "BOOLEAN", "DROPDOWN", "CHECKBOX"].includes(
              question.questionType
            )
          ) {
            return true; //keep the question for these question types
          } else {
            const choices = this.studentCourses.coursesAvailable.filter(
              (course) => course.subject === question.questionType
            );
            if (choices.length === 0) {
              return false; //filter out the question
            }
            return true; //keep question
          }
        }
      );
      console.log("Fetched and set student survey data.");
      this.loading = false;
    },
    async postSurvey(status: "INCOMPLETE" | "COMPLETE" | "FINALIZED") {
      const userStore = useUserStore();
      const url = !userStore.isGuidance
        ? "/student/survey/"
        : `/guidance/survey/${this.currentAnsweredSurvey.email}`;
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
          }),
        });
      } catch (error) {
        console.error("Error posting survey:", error);
      }
    },
    async saveSurvey() {
      this.currentAnsweredSurvey.answers = JSON.stringify(this.currentResponse);
      const userStore = useUserStore();
      this.loading = true;
      await this.checkSurveyAnswers(this.currentResponse);
      // if (this.missingAnswers.length !== 0) return;
      if (!userStore.isGuidance) {
        {
          await this.postSurvey("INCOMPLETE");
          userStore.surveyPreview.status = "INCOMPLETE";
        }
      } else if (userStore.isGuidance) {
        await this.postSurvey("FINALIZED");
        userStore.surveyPreview.status = "FINALIZED";
      }
      this.loading = false;
    },
    async submitSurvey() {
      this.currentAnsweredSurvey.answers = JSON.stringify(this.currentResponse);
      const userStore = useUserStore();
      this.loading = true;
      await this.checkSurveyAnswers(this.currentResponse);
      // if (this.missingAnswers.length !== 0) return;
      if (!userStore.isGuidance) {
        if (this.missingAnswers.length === 0) {
          await this.postSurvey("COMPLETE");
          userStore.surveyPreview.status = "COMPLETE";
        } else {
          await this.postSurvey("INCOMPLETE");
          userStore.surveyPreview.status = "INCOMPLETE";
        }
      } else if (userStore.isGuidance) {
        await this.postSurvey("FINALIZED");
        userStore.surveyPreview.status = "FINALIZED";
      }
      this.loading = false;
    },
  },
});
