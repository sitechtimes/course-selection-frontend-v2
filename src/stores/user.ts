import {
  Student,
  Meeting,
  GuidanceStudent,
  Stats,
  Course,
  Question,
} from "../types/interface";
import { useSurveyStore } from "./survey";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const surveyStore = useSurveyStore();
  const loading = ref(false);
  const profileID = ref(0);
  const initComplete = ref(false);
  const isAuth = ref(false);
  const firstName = ref("");
  const lastName = ref("");
  const email = ref("");
  const isGuidance = ref(false);
  const student = ref<Student>({} as Student);
  const courseList = ref<Course[]>([]);
  const students = ref<number[]>([]); // Only the guidance counselor's students
  const allStudents = ref<GuidanceStudent[]>([]);
  const meetings = ref<Meeting[]>([]);
  const meetingsFetched = ref(false);
  const popup = reactive({ error: true, message: "", update: false });

  async function fetchData(url: string, method?: string, body?: any) {
    loading.value = true;
    const options: RequestInit = { credentials: "include" };
    if (method) {
      options["method"] = method;
      options["headers"] = { "Content-Type": "application/json" };
      options["body"] = JSON.stringify(body);
    }
    const res = await fetch(import.meta.env.VITE_URL + url, options);
    loading.value = false;
    return res;
  }

  function setPopup(message: string, error: boolean = false) {
    popup.message = "";
    popup.update = !popup.update;
    popup.error = error;
    popup.message = message;
  }

  async function init() {
    const res = await fetchData("init/");
    initComplete.value = true;
    if (!res.ok || res.status === 204) return;
    const data = await res.json();
    profileID.value = data.id;
    firstName.value = data.firstName[0] + data.firstName.slice(1).toLowerCase();
    lastName.value = data.lastName[0] + data.lastName.slice(1).toLowerCase();
    email.value = data.email;
    isGuidance.value = data.isGuidance;
    if (isGuidance.value) {
      students.value = data.profile;
      await getStudents();
    } else {
      student.value = data.profile;
      if (student.value.status === "Finalized") surveyStore.open = false;
    }
    isAuth.value = true;
  }

  async function login(username: string, password: string) {
    if (!username || !password)
      return setPopup("Username and password cannot be empty.", true);
    const res = await fetchData("auth/login/", "POST", {
      username: username.split("@")[0].toLowerCase(),
      password: password,
    });
    const data = (await res.json()) as Record<string, any>;
    if (!res.ok) {
      const error = Object.values(data)[0];
      return setPopup(typeof error === "object" ? error[0] : error, true);
    }
    console.log(data);
    profileID.value = data.id;
    firstName.value =
      data.user.firstName[0].toUpperCase() +
      data.user.firstName.slice(1).toLowerCase();
    lastName.value =
      data.user.lastName[0].toUpperCase() +
      data.user.lastName.slice(1).toLowerCase();
    email.value = data.user.email;
    isGuidance.value = data.user.isGuidance;
    if (isGuidance.value) await getStudents();
    else {
      student.value = data.user.profile;
      surveyStore.open = data.user.profile.status !== "Finalized";
    }
    isAuth.value = true;
    router.push(`/${isGuidance.value ? "guidance" : "student"}/dashboard`);
  }

  async function resetPassword(email: string) {
    if (!email) return setPopup("Email cannot be empty.", true);
    const res = await fetchData("auth/password/reset/", "POST", { email });
    if (!res.ok) return setPopup((await res.json())["email"][0], true);
    setPopup("Password reset email sent.");
  }

  async function resetPasswordConfirm(
    new_password1: string,
    new_password2: string,
    token: string,
    uid: string
  ) {
    if (new_password1 !== new_password2)
      return setPopup("Passwords do not match.", true);
    if (!new_password1 || !new_password2)
      return setPopup("Password cannot be empty.", true);
    if (!token || !uid)
      return setPopup("Invalid reset link. Try reseting again.", true);
    const res = await fetchData("auth/password/reset/confirm/", "POST", {
      new_password1,
      new_password2,
      token,
      uid,
    });
    let data = await res.json();
    if ("token" in data)
      return setPopup(
        "Password already reset, please request another email.",
        true
      );
    data = Object.values(data as Record<string, string[]>)[0];
    setPopup(typeof data === "object" ? data[0] : data, !res.ok);
    return res.ok;
  }

  async function logout() {
    const res = await fetchData("auth/logout/", "POST");
    if (!res.ok) return await res.json();
    setPopup("Successfully logged out.");
    surveyStore.$reset();
    $reset();
    router.push("/");
  }

  async function fetchStats() {
    const res = await fetchData("guidance/stats");
    const data = await res.json();
    if (!res.ok) return { years: [], data: [] };
    return { years: data.map((item: Stats) => item.year), data: data };
  }

  async function getStudents() {
    const res = await fetchData("guidance/profiles/");
    const data = await res.json();
    allStudents.value = data;
  }
  async function getCourses() {
    const res = await fetchData("course/");
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch courses");
    return data;
  }
  async function getSurveys() {
    const res = await fetchData("guidance/survey/");
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch surveys");
    return data;
  }
  async function getQuestions() {
    const res = await fetchData("guidance/surveyquestions/");
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to fetch surveys");
    return data;
  }
  async function createQuestion(question: Question) {
    const res = await fetchData("guidance/surveyquestions/", "POST", question);
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to create question");
    return data;
  }
  async function deleteQuestion(id: number) {
    const res = await fetchData("guidance/surveyquestions/", "DELETE", id);
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to delete question");
    return data;
  }
  async function changeFlag(
    student: GuidanceStudent,
    flag: string,
    remove: boolean = false
  ) {
    const res = await fetchData("guidance/flag/", "POST", {
      id: student.id,
      remove,
    });
    if (!res.ok) return await res.json();
    const data = await res.json();
    // const index = allStudents.value.findIndex((student) => student.id === id);
    // allStudents.value[index] = data.flag;
  }
  async function getMeetings() {
    const res = await fetchData("guidance/meetings/");
    if (!res.ok) return await res.json();
    const data = await res.json();

    meetings.value = data.map((meeting: Meeting) => {
      meeting.date = new Date(meeting.date);
      return meeting;
    });
    meetingsFetched.value = true;
  }

  async function changeMeeting(
    deleteMeeting: boolean,
    meeting_id?: number,
    student_id?: number,
    date?: string,
    period?: number,
    memo?: string,
    notify?: boolean
  ) {
    const res = await fetchData(
      "guidance/meetings/",
      deleteMeeting ? "DELETE" : "PUT",
      {
        meeting_id,
        student_id,
        date: date,
        period,
        memo,
        notify,
      }
    );
    if (!res.ok) return await res.json();
    const data = await res.json();
    meetings.value = data.map((meeting: Meeting) => {
      meeting.date = new Date(meeting.date);
      return meeting;
    });
  }

  function titleCase(name: string) {
    return name
      .split(",")
      .map((chunk) =>
        chunk
          .split(" ")
          .map((part) => part.trim().toLowerCase())
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ")
      )
      .join(", ");
  }

  function $reset() {
    profileID.value = 0;
    initComplete.value = false;
    isAuth.value = false;
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    isGuidance.value = false;
    student.value = {} as Student;
  }

  return {
    init,
    login,
    logout,
    isAuth,
    loading,
    student,
    lastName,
    meetings,
    students,
    firstName,
    profileID,
    titleCase,
    isGuidance,
    fetchStats,
    changeFlag,
    getMeetings,
    allStudents,
    initComplete,
    changeMeeting,
    meetingsFetched,
    $reset,
    popup,
    getCourses,
    getSurveys,
    fetchData,
    getQuestions,
    createQuestion,
    deleteQuestion,
    resetPassword,
    resetPasswordConfirm,
  };
});
