import { Student, Meeting, GuidanceStudent, Stats } from "../types/interface";
import { useSurveyStore } from "./survey";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();
  const surveyStore = useSurveyStore();
  const loading = ref(false);
  const profileID = ref(0);
  const popup = reactive({ error: true, message: "", update: false });
  const initComplete = ref(false);
  const isAuth = ref(false);
  const firstName = ref("");
  const lastName = ref("");
  const email = ref("");
  const isGuidance = ref(false);
  const student = ref<Student>({} as Student);
  const studentList = ref<GuidanceStudent[]>([]);
  const viewedStudents = ref<GuidanceStudent[]>([]);
  const meetings = ref<Meeting[]>([]);
  const meetingsFetched = ref(false);

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
    if (!isGuidance.value) {
      student.value = data.student;
      if (data.student.status === "Finalized") surveyStore.open = false;
    } else await getStudents();
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

    profileID.value = data.id;
    firstName.value =
      data.firstName[0].toUpperCase() + data.firstName.slice(1).toLowerCase();
    lastName.value =
      data.lastName[0].toUpperCase() + data.lastName.slice(1).toLowerCase();
    email.value = data.email;
    isGuidance.value = data.isGuidance;
    if (isGuidance.value) await getStudents();
    else {
      student.value = data.student;
      surveyStore.open = data.student.status !== "Finalized";
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
    return setPopup(typeof data === "object" ? data[0] : data, !res.ok);
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
    if (!res.ok) return await res.json();
    const data = await res.json();
    studentList.value = data;
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
    // const index = studentList.value.findIndex((student) => student.id === id);
    // studentList.value[index] = data.flag;
  }

  async function getMeetings() {
    const res = await fetchData("guidance/meetings/");
    if (!res.ok) return await res.json();
    const data = await res.json();

    meetings.value = data.map((meeting: Meeting) => ({
      ...meeting,
      meetingDate: new Date(meeting.meetingDate),
      name: meeting.name
        .split(",")
        .map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
        .join(", "),
    }));
    meetingsFetched.value = true;
  }

  async function changeMeeting(
    id: number,
    deleteMeeting: boolean,
    date?: string,
    description?: string,
    notify?: boolean
  ) {
    if (deleteMeeting) return;
    const res = await fetchData(
      "guidance/updateMeeting/",
      deleteMeeting ? "DELETE" : "POST",
      { id, date, description, notify }
    );
    if (!res.ok) return await res.json();
    const data = await res.json();
    console.log(data);
    // guidanceMeetings.value.push(data);
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
    popup,
    login,
    logout,
    isAuth,
    loading,
    student,
    setPopup,
    lastName,
    meetings,
    firstName,
    titleCase,
    isGuidance,
    fetchStats,
    changeFlag,
    getMeetings,
    studentList,
    initComplete,
    resetPassword,
    changeMeeting,
    viewedStudents,
    meetingsFetched,
    resetPasswordConfirm,
    $reset,
  };
});
