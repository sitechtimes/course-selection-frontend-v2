import { defineStore } from "pinia";
import { useSurveyStore } from "./survey";
import { useStudentStore } from "./student";
import { useGuidanceStore } from "./guidance";
import { useRouter } from "vue-router";
import axios from "axios";
import { user, account_type, userData, guidanceData, studentGuidance } from "../types/interface";
import { ref } from "vue";
import router from "../router";

export const useUserStore = defineStore("user", {
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
        studentSurveyPreview: null,
        currentlyViewingStudents: [],
        guidanceStudents: [],

    }),
    actions: {
        async init(type: account_type) {
            this.userType = type;
            if (type === "guidance") {
                fetch(`${import.meta.env.VITE_URL}/guidance/profiles/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }).then(async (data) => {
                    this.studentSurveyPreview = (await data.json());
                });
                fetch(`${import.meta.env.VITE_URL}/guidance/getGuidanceStudents/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }).then(async (data) => {
                    this.guidanceStudents = (await data.json());
                    this.loading = false;
                });
            } else {
                fetch(`${import.meta.env.VITE_URL}/student/surveyPreview/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                })
                    .then((res) => res.json())
                    .then(async (data) => {
                        const router = useRouter();
                        const surveyStore = useSurveyStore();
                        const studentStore = useStudentStore();

                        if (data.dueDate < new Date() || data.status === "FINALIZED") {
                            surveyStore.open = false;
                        }

                        studentStore.studentSurveyPreview = data
                        surveyStore.currentAnsweredSurvey.status = data.status;
                    })
                    .catch((error) => {
                        console.error("Error fetching surveyPreview:", error);
                    });
                fetch(`${import.meta.env.VITE_URL}/student/survey/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                })
                    .then((res) => res.json())
                    .then(async (data) => {
                        const router = useRouter();
                        const surveyStore = useSurveyStore();
                        const studentStore = useStudentStore();

                        const parsedData = JSON.parse(data);

                        studentStore.survey = parsedData.survey.fields;
                        studentStore.answeredSurvey = parsedData.answeredSurvey.fields;

                        console.log("studentStore.survey", studentStore.survey);
                        console.log("studentStore.answeredSurvey", studentStore.answeredSurvey);
                    })
                    .catch((error) => {
                        console.error("Error fetching survey:", error);
                    });

                this.loading = false;
            }
        },
        async GoogleLogin(res: any) {
            this.loading = true;
            await axios
                .post(`${import.meta.env.VITE_URL}/social-login/google/`, {
                    access_token: res.access_token,
                })
                .then((response) => {
                    this.access_token = response.data.access_token;
                    this.refresh_token = response.data.refresh_token;
                    this.email = response.data.user.email;
                    this.first_name = response.data.user.first_name;
                    this.last_name = response.data.user.last_name;
                    this.isLoggedIn = true;

                    const date = new Date();
                    const expiration = date.setHours(date.getHours() + 1);

                    this.expire_time = expiration;

                    this.getUserType(); //make dj rest auth return user type (backend) to remove this function
                });
        },
        async EmailLogin(username: string, password: string) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_URL}/auth/login/`,
                    {
                        username: username.toLowerCase(),
                        password: password,
                    }
                );

                this.access_token = response.data.access_token;
                this.refresh_token = response.data.refresh_token;
                this.email = response.data.user.email;
                this.first_name = response.data.user.first_name;
                this.last_name = response.data.user.last_name;
                this.isLoggedIn = true;

                const date = new Date();
                const expiration = date.setHours(date.getHours() + 1);

                this.expire_time = expiration;
                this.loading = true;
                await this.getUserType()
                this.init(this.userType);

            } catch (error) {
                this.loading = false;
                alert("Login failed. Please check your credentials.");
            }
        },
        async changeMeeting(
            email: string,
            meetingISO: string,
            description: string
        ) {
            fetch(`${import.meta.env.VITE_URL}/guidance/updateMeeting/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.access_token}`
                },
                body: JSON.stringify({
                    email: email,
                    meeting: meetingISO,
                    description: description,
                }),
            });
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
            });
        },
        async addFlag(email: string, newFlag: string) {
            const res = await fetch(`${import.meta.env.VITE_URL}/guidance/updateFlag/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    flag: newFlag,
                }),
            })
            const data = await res.json()
            if (this.studentSurveyPreview === null) return
            // @ts-ignore
            const student = await this.studentSurveyPreview.find((student) => student.email + "@nycstudents.net" === email);
            student.flag = data.flag
        },
        async deleteFlag(email: string, flagToBeRemoved: string) {
            const res = await fetch(`${import.meta.env.VITE_URL}/guidance/updateFlag/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    flag: flagToBeRemoved,
                }),
            })
            const data = await res.json()
            if (this.studentSurveyPreview === null) return
            // @ts-ignore
            const student = await this.studentSurveyPreview.find((student) => student.email + "@nycstudents.net" === email);
            student.flag = data.flag
        },
        async getUserType() {
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
        }
    },
    persist: {
        storage: sessionStorage,
    }
});
