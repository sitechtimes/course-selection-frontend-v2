//@ts-nocheck
import { useRouter } from "vue-router";
import { useUserStore } from "./user";
import { defineStore } from "pinia";
import { ref } from "vue";
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

export const useSurveyStore = defineStore("survey", () => {
  const router = useRouter();
  const userStore = useUserStore();
  const loaded = ref(false);
  const open = ref(true);
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
      id === 0 ? "student/survey/" : `guidance/survey/${id}`,
    );
    if (!res.ok) return (open.value = false);
    const data: SurveyData = await res.json();
    survey.value = data.survey;
    userStore.student.status = survey.value.status;
    answers.value = JSON.parse(JSON.stringify(data.survey.answers));
    coursesAvailable.value = data.coursesAvailable;
    coursesTaken.value = data.coursesTaken;
    const finalQuestion = data.survey.questions.find(
      (q) => q.questionType === "FINAL",
    );
    const finalAnswer = data.survey.answers.find(
      (a) => a.question === finalQuestion.id,
    );
    selectedCourses.value = finalAnswer.answer
      .map((ans) => data.coursesAvailable.find((c) => c.id === ans.course))
      .flat();
    loaded.value = true;
  }

  async function saveSurvey(status: Number) {
    if (!checkAnswers() && !userStore.isGuidance && status === 0)
      return userStore.setPopup("No changes detected.");
    const res = await fetchData(
      userStore.isGuidance
        ? `guidance/survey/${router.currentRoute.value.params.id}`
        : "student/survey/",
      "POST",
      {
        answers: changes.value,
        notes: userStore.isGuidance ? survey.value.guidanceNotes : undefined,
        status: status || undefined,
      },
    );
    survey.value.answers = JSON.parse(JSON.stringify(answers.value));
    changes.value = [];
    if (!res.ok) return;
    userStore.setPopup(
      `Survey successfully ${status === 0 ? "saved" : "submitted"}.`,
    );
    if (status === 0) return (open.value = false);
    userStore.student.status = await res.json();
    if (userStore.isGuidance) return router.push("/guidance/studentlist");
    router.push("/student/dashboard");
  }
  async function createSurveyForStudent(id: number) {
    const res = await fetchData(`guidance/survey/${id}`, "POST");

    if (!res.ok) {
      userStore.setPopup("Failed to create survey.");
      throw new Error("Creation failed");
    }

    const data = await res.json();

    survey.value = data.survey;
    answers.value = JSON.parse(JSON.stringify(data.survey.answers));
    coursesAvailable.value = data.coursesAvailable;
    coursesTaken.value = data.coursesTaken;

    open.value = true;
  }
  function checkAnswers() {
    changes.value = answers.value.filter((ans) => {
      const old = survey.value.answers.find((q) => q.question === ans.question);
      if (ans.answer === null) return false;
      if (typeof ans.answer === "object")
        return (
          ans.answer.length !== old.answer.length ||
          ans.answer.some((item, i) => item.course !== old.answer[i].course)
        );
      return ans.answer !== old.answer;
    });
    missingAnswers.value = answers.value
      .slice(0, -2)
      .filter((ans) => {
        let q = survey.value.questions.find((q) => q.id === ans.question);
        if (ans.answer === null) return true;
        if (q.status === "OPTIONAL") return false;
        if (typeof ans.answer === "object") return ans.answer.length === 0;
        if (typeof ans.answer === "string") return ans.answer.trim() === "";
        return false;
      })
      .map((ans) => ans.question);
    return changes.value.length > 0;
  }

  function $reset() {
    open.value = true;
    loaded.value = false;
    missingAnswers.value = [];
    coursesTaken.value = [];
    coursesAvailable.value = [];
    survey.value = {} as Survey;
    answers.value = [];
  }

  return {
    open,
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
    createSurveyForStudent,
  };
});
