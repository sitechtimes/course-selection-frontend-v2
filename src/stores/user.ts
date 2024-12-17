import { defineStore } from "pinia";
import { useSurveyStore } from "./survey";
import { useRouter } from "vue-router";
import {
  account_type,
  Student,
  studentGuidance,
  studentMeetings,
  studentPreview,
  GuidanceStudent,
  Stats,
} from "../types/interface";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
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
  const studentList = ref<GuidanceStudent[]>([]);
  const viewedStudents = ref<GuidanceStudent[]>([]);

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
    const res = await fetchData("auth/login/", "POST", {
      username: username.toLowerCase(),
      password: password,
    });
    if (!res.ok) return await res.json();
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
    router.push(`/${isGuidance.value ? "guidance" : "student"}/dashboard`);
  }

  async function logout() {
    const res = await fetchData("auth/logout/", "POST");
    if (!res.ok) return await res.json();
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
    firstName,
    isGuidance,
    fetchStats,
    changeFlag,
    studentList,
    initComplete,
    viewedStudents,
    $reset,
  };
});

// old one
export const useUserStore1 = defineStore("user", {
  state: () => ({
    first_name: "",
    last_name: "",
    email: "",
    userType: null as account_type | null,
    isLoggedIn: false,
    access_token: "",
    refresh_token: "",
    loading: false,
    expire_time: 0,
    studentSurveyPreview: {} as studentPreview,
    currentlyViewingStudents: [] as studentPreview[],
    guidanceStudents: [] as studentGuidance[],
    guidanceMeetings: [] as studentMeetings[],
  }),
  actions: {
    async init(type: account_type) {
      this.userType = type;
      if (type === "guidance") {
        try {
          fetch(`${import.meta.env.VITE_URL}/guidance/profiles/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          })
            .then(async (data) => {
              const guidanceProfiles = await data.json();
              this.studentSurveyPreview = guidanceProfiles;
              this.guidanceStudents = await guidanceProfiles.filter(
                (student: studentGuidance) => student.ownStudent
              );
              this.loading = true;
            })
            .then(() => {
              this.loading = false;
            })
            .catch((error) => {
              throw new Error("Error fetching profiles:", error.message);
            });
          fetch(`${import.meta.env.VITE_URL}/guidance/meetings`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          })
            .then(async (data) => {
              const meetingsData = (await data.json()).map(
                (student: studentMeetings) => ({
                  name: student.name
                    .split(",")
                    .map((chunk) =>
                      chunk
                        .split(" ")
                        .map((part) => part.trim().toLowerCase())
                        .map(
                          (part) => part.charAt(0).toUpperCase() + part.slice(1)
                        )
                        .join(" ")
                    )
                    .join(","),
                  meetingDate: student.meetingDate,
                  description: student.description,
                  grade: student.grade,
                  email: student.email,
                })
              );
              this.guidanceMeetings = meetingsData;
            })
            .catch((error) => {
              throw new Error("Error fetching meetings:", error.message);
            });
        } catch (error) {
          console.error("Error in init:", error);
        }
      } else {
        const surveyStore = useSurveyStore();
        await surveyStore.fetchSurvey();

        await fetch(`${import.meta.env.VITE_URL}/student/surveyPreview/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
          .then((res) => res.json())
          .then(async (data) => {
            const surveyStore = useSurveyStore();

            if (
              data.dueDate < new Date().toISOString() ||
              data.status === "FINALIZED"
            ) {
              surveyStore.open = false;
            }
            this.studentSurveyPreview = data;
            surveyStore.currentAnsweredSurvey.status = data.status;
          })
          .catch((error) => {
            console.error("Error fetching surveyPreview:", error);
          });

        this.loading = false;
      }
    },
    async EmailLogin(username: string, password: string) {
      try {
        fetch(`${import.meta.env.VITE_URL}/auth/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.toLowerCase(),
            password: password,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            const surveyStore = useSurveyStore();
            this.access_token = data.access_token;
            this.refresh_token = data.refresh_token;
            this.email = data.user.email;
            this.first_name = data.user.first_name;
            this.last_name = data.user.last_name;
            this.isLoggedIn = true;

            const date = new Date();
            const expiration = date.setHours(date.getHours() + 1);

            this.expire_time = expiration;
            this.loading = true;
            await this.getUserType();
            await this.init(this.userType);

            this.savePersistentSession();
          })
          .catch((error) => {
            alert("Login failed. Please check your credentials.");
            throw new Error("Error fetching login:", error.message);
          });
      } catch (error) {
        console.error(error);
        this.loading = false;
        alert("Login failed. Please check your credentials.");
      }
    },
    async changeMeeting(
      email: string,
      meetingISO: string,
      description: string,
      notify: boolean
    ) {
      try {
        await fetch(`${import.meta.env.VITE_URL}/guidance/updateMeeting/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.access_token}`,
          },
          body: JSON.stringify({
            email: email,
            description: description,
            notify: notify,
            date: meetingISO,
          }),
        });
        const meetingExists = this.guidanceMeetings.some(
          (meeting) => meeting.email === email
        );
        if (!meetingExists) {
          const student = this.guidanceStudents.find(
            (student: studentGuidance) => student.email === email.split("@")[0]
          );
          if (student !== undefined) {
            const meetingData: studentMeetings = {
              name: student.name
                .replace(",", ", ")
                .split(" ")
                .map((part) => part.trim().toLowerCase())
                .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                .join(" "),
              meetingDate: new Date(meetingISO),
              description: description,
              email: email,
              grade: student.grade,
            };
            this.guidanceMeetings.push(meetingData);
          }
        }
      } catch (error) {
        console.error("Error fetching updateMeeting:", error);
      }
    },
    async deleteMeeting(email: string) {
      fetch(`${import.meta.env.VITE_URL}/guidance/updateMeeting/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then(() => {
          const updatedMeetings = this.guidanceMeetings.filter(
            (meeting) => meeting.email !== email
          );
          this.guidanceMeetings = updatedMeetings;
        })
        .catch((error) => {
          console.error("Error fetching updateMeeting:", error);
        });
    },
    async addFlag(email: string, newFlag: string, viewAll: boolean) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/guidance/updateFlag/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${this.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              flag: newFlag,
            }),
          }
        );
        const data = await res.json();
        if (this.currentlyViewingStudents === null) return;
        const studentIndex = this.currentlyViewingStudents.findIndex(
          (student: studentPreview) =>
            student.email + "@nycstudents.net" === email
        );
        const previewIndex = this.guidanceStudents.findIndex(
          (student: studentGuidance) =>
            student.email + "@nycstudents.net" === email
        );

        if (viewAll === true) {
          //if viewAll students is on
          if (studentIndex !== -1 && previewIndex === -1) {
            //if the guidance counseler is adding flag to a student that is not their's
            this.currentlyViewingStudents[studentIndex].flag = data.flag;
          } else {
            //or else if the guidance counseler has the student
            this.currentlyViewingStudents[studentIndex].flag = data.flag;
            this.guidanceStudents[previewIndex].flag = data.flag;
          }
        } else {
          //else if viewAll is not on
          if (studentIndex !== -1 && previewIndex !== -1) {
            this.currentlyViewingStudents[studentIndex].flag = data.flag;
            this.guidanceStudents[previewIndex].flag = data.flag;
          }
        }
      } catch (error) {
        console.error("Error fetching updateFlag:", error);
      }
    },
    async deleteFlag(email: string, flagToBeRemoved: string, viewAll: boolean) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/guidance/updateFlag/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${this.access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              flag: flagToBeRemoved,
            }),
          }
        );
        const data = await res.json();
        if (this.currentlyViewingStudents === null) return;
        const studentIndex = this.currentlyViewingStudents.findIndex(
          (student: studentPreview) =>
            student.email + "@nycstudents.net" === email
        );
        const previewIndex = this.guidanceStudents.findIndex(
          (student: studentGuidance) =>
            student.email + "@nycstudents.net" === email
        );

        if (viewAll === true) {
          //if viewAll students is on
          if (studentIndex !== -1 && previewIndex === -1) {
            //if the guidance counseler is deleting flag of a student that is not their's
            this.currentlyViewingStudents[studentIndex].flag = data.flag;
          } else {
            //or else if the guidance counseler has the student
            this.currentlyViewingStudents[studentIndex].flag = data.flag;
            this.guidanceStudents[previewIndex].flag = data.flag;
          }
        } else {
          //else if viewAll is not on
          if (studentIndex !== -1 && previewIndex !== -1) {
            this.currentlyViewingStudents[studentIndex].flag = data.flag;
            this.guidanceStudents[previewIndex].flag = data.flag;
          }
        }
      } catch (error) {
        console.error("Error fetching updateFlag:", error);
      }
    },
    async getUserType() {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL}/user/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        });
        const data = await res.json();
        if (data.is_guidance) {
          this.userType = "guidance";
        } else {
          this.userType = "student";
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    savePersistentSession() {
      const persistentData = JSON.stringify({
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        account_type: this.userType,
        access_token: this.access_token,
        refresh_token: this.refresh_token,
        expire_time: this.expire_time,
      });

      localStorage.setItem("session", persistentData);
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
