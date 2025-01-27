//@ts-nocheck
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import {
  Course,
  surveyAnswer,
  surveyQuestion,
  surveyStore,
  surveyStringAnswer,
  SurveyData,
  Survey,
  Answer,
} from "../types/interface";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useSurveyStore = defineStore("survey", () => {
  const router = useRouter();
  const userStore = useUserStore();
  const loaded = ref(false);
  const open = ref(true);
  const submit = ref(false);
  const coursesTaken = ref<Course[]>([]);
  const coursesAvailable = ref<Course[]>([]);
  const survey = ref({} as Survey);
  const answers = ref<Answer[]>([]);
  const selectedCourses = ref<Course[]>([]);
  const changes = ref<Answer[]>([]);
  const missingAnswers = ref<Number[]>([]);

  async function fetchData(url: string, method?: string, body?: any) {
    const options: RequestInit = { credentials: "include" };
    if (method) {
      options["method"] = method;
      options["headers"] = { "Content-Type": "application/json" };
      options["body"] = JSON.stringify(body);
    }
    return await fetch(import.meta.env.VITE_URL + url, options);
  }

  async function getSurvey(id: number = 0) {
    const res = await fetchData(
      id === 0 ? "student/survey/" : `guidance/survey/${id}`
    );
    if (!res.ok) return (open.value = false);
    const data: SurveyData = await res.json();
    survey.value = data.survey;
    userStore.student.status = survey.value.status;
    answers.value = JSON.parse(JSON.stringify(data.survey.answers));
    coursesAvailable.value = data.coursesAvailable;
    coursesTaken.value = data.coursesTaken;
    const finalQuestion = data.survey.questions.find(
      (q) => q.questionType === "FINAL"
    );
    const finalAnswer = data.survey.answers.find(
      (a) => a.question === finalQuestion.id
    );
    selectedCourses.value = finalAnswer.answer
      .map((ans) => data.coursesAvailable.find((c) => c.id === ans.course))
      .flat();
    loaded.value = true;
  }

  async function saveSurvey(status: Number) {
    if (!checkAnswers()) return alert("No changes detected.");
    const res = await fetchData("student/survey/", "POST", {
      answers: changes.value,
      status: status || undefined,
    });
    if (!res.ok || status === 0) return;
    submit.value = true;
    setTimeout(() => (submit.value = false), 3000);
    userStore.student.status = await res.json();
    survey.value.answers = JSON.parse(JSON.stringify(answers.value));
    checkAnswers();
    if (userStore.isGuidance) return router.push("/guidance/studentlist");
    router.push("/student/dashboard");
  }

  function checkAnswers() {
    changes.value = answers.value.filter((ans) => {
      const old = survey.value.answers.find((q) => q.question === ans.question);
      if (ans.answer === null) return false;
      if (typeof ans.answer === "object")
        return (
          ans.answer.length !== old.answer.length ||
          ans.answer.some((item, i) => item.rank !== old.answer[i].rank)
        );
      if (typeof ans.answer === "string") ans.answer = ans.answer.trim();
      if (ans.answer !== old.answer) return true;
    });
    missingAnswers.value = answers.value
      .slice(0, -2)
      .filter((ans) => {
        let q = survey.value.questions.find((q) => q.id === ans.question);
        if (ans.answer === null) return true;
        if (q.status === "OPTIONAL") return false;
        if (typeof ans.answer === "object") return ans.answer.length === 0;
        console.log(ans.answer.trim() === "");
        if (typeof ans.answer === "string") return ans.answer.trim() === "";
        return false;
      })
      .map((ans) => ans.question);
    return changes.value.length > 0;
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
  }

  return {
    open,
    submit,
    status,
    survey,
    loaded,
    changes,
    answers,
    getSurvey,
    saveSurvey,
    coursesTaken,
    checkAnswers,
    missingAnswers,
    selectedCourses,
    coursesAvailable,
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
