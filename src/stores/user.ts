import { defineStore } from "pinia";
import { useSurveyStore } from "./survey";
import { account_type, student, studentSurveyPreview, guidanceSurveyPreview, flagAPI } from "../types/interface";

export const useUserStore = defineStore("user", {
    state: () => ({
        first_name: "",
        last_name: "",
        email: "",
        student: 
        {
            homeroom: null, 
            meeting: null, 
            meeting_description: ""
        } as student,
        userType: null as account_type | null,
        isLoggedIn: false,
        access_token: "",
        refresh_token: "",
        loading: false,
        expire_time: 0,
        studentSurveyPreview: [] as Array<studentSurveyPreview|guidanceSurveyPreview>,
        currentlyViewingStudents: [],
        guidanceStudents: [],
    }),
    actions: {
        async init(type: account_type) {
            //@ts-ignore
            if (type === "guidance") {
                fetch(`${import.meta.env.VITE_URL}/guidance/profiles/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                }).then(async (data) => {
                    const json = await data.json();
                    console.log(json)
                    this.studentSurveyPreview = json
                    //@ts-ignore
                    this.guidanceStudents = await json.filter(student => student.ownStudent)
                    console.log(this.guidanceStudents)
                    this.loading = false;
                });
            } else {
                const surveyStore = useSurveyStore();
                surveyStore.getSurvey()
                fetch(`${import.meta.env.VITE_URL}/student/surveyPreview/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                })
                    .then((res) => res.json())
                    .then(async (data:studentSurveyPreview) => {
                        const surveyStore = useSurveyStore();
                        console.log(surveyStore.currentSurvey)

                        if (new Date(data.dueDate) < new Date() || data.status === "FINALIZED") {
                            surveyStore.open = false;
                        }

                        this.studentSurveyPreview.push(data)
                        surveyStore.currentAnswers.status = data.status;
                    })
                    .catch((error) => {
                        console.error("Error fetching surveyPreview:", error);
                    }).then(() => this.loading = false)
                
    
                
                

               
            }
        },
        async GoogleLogin(res: any) {
            this.loading = true;
            fetch(`${import.meta.env.VITE_URL}/social-login/google/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    access_token: res.access_token,
                }),
            })
                .then((res) => res.json())
                .then(async (data) => {
                    this.access_token = data.access_token;
                    this.refresh_token = data.refresh_token;
                    this.email = data.user.email;
                    this.first_name = data.user.first_name;
                    this.last_name = data.user.last_name;
                    this.isLoggedIn = true;

                    const date = new Date();
                    const expiration = date.setHours(date.getHours() + 1);

                    this.expire_time = expiration;

                    this.getUserType(); //make dj rest auth return user type (backend) to remove this function
                });
        },
        async EmailLogin(username: string, password: string) {
            const surveyStore = useSurveyStore()
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
                        this.access_token = data.access_token;
                        this.refresh_token = data.refresh_token;
                        this.email = data.user.email;
                        surveyStore.currentAnswers.email = data.user.email
                        this.first_name = data.user.first_name;
                        this.last_name = data.user.last_name;
                        this.isLoggedIn = true;

                        const date = new Date();
                        const expiration = date.setHours(date.getHours() + 1);

                        this.expire_time = expiration;
                        this.loading = true;
                        await this.getUserType()
                        this.init(this.userType);
                    });

            } catch (error) {
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
            console.log(JSON.stringify({
                email: email,
                date: meetingISO,
                memo: description,
                notify: notify,
            }),)
            fetch(`${import.meta.env.VITE_URL}/guidance/updateMeeting/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.access_token}`
                },
                body: JSON.stringify({
                    email: email,
                    date: meetingISO,
                    memo: description,
                    notify: notify,
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
            const res:flagAPI = await fetch(`${import.meta.env.VITE_URL}/guidance/updateFlag/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    flag: newFlag,
                }),
            }).then(res => res.json())
            this.updatePreview(res)
        },
        async deleteFlag(email: string, flagToBeRemoved: string) {
            const res:flagAPI = await fetch(`${import.meta.env.VITE_URL}/guidance/updateFlag/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${this.access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    flag: flagToBeRemoved,
                }),
            }).then(res =>res.json())
            this.updatePreview(res)
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
                this.student = data.studentProfile
            }
        },
        updatePreview(data:flagAPI) {
            if (this.currentlyViewingStudents === null) return
            // @ts-ignore
            const studentIndex = this.currentlyViewingStudents.findIndex((student) => student.email + "@nycstudents.net" === email);
            //@ts-ignore
            const previewIndex = this.studentSurveyPreview.findIndex((student:guidanceSurveyPreview) => student.email + "@nycstudents.net" === email);
            if (studentIndex !== -1 && previewIndex !== -1) {
                //@ts-ignore
                this.currentlyViewingStudents[studentIndex].flag = data.flag;
                //@ts-ignore
                this.studentSurveyPreview[previewIndex].flag = data.flag;
            }

         }
    },
    persist: {
        storage: sessionStorage,
    }
});
