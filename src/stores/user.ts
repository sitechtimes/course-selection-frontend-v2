import { defineStore } from "pinia";
import { useSurveyStore } from "./survey";
import { useStudentStore } from "./student";
import { useGuidanceStore } from "./guidance";
import { useRouter } from "vue-router";
import axios from "axios";
import { user, account_type, userData, guidanceData, studentGuidance, studentMeetings } from "../types/interface";
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
        studentSurveyPreview: [],
        currentlyViewingStudents: [],
        guidanceStudents: [],
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
                    }).then(async (data) => {
                        this.studentSurveyPreview = await data.json();
                    }).catch((error) => {
                        throw new Error('Error fetching profiles:', error.message);
                    });
                    fetch(`${import.meta.env.VITE_URL}/guidance/getGuidanceStudents/`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${this.access_token}`,
                        },
                    }).then(async (data) => {
                        this.guidanceStudents = await data.json();
                    }).catch((error) => {
                        throw new Error('Error fetching getGuidanceStudents:', error.message);
                    });
                    fetch(`${import.meta.env.VITE_URL}/guidance/meetings`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${this.access_token}`,
                        },
                    }).then(async (data) => {
                        const meetingsData = (await data.json()).map((student) => ({
                            name: student.name
                              .split(",")
                              .map((part) => part.trim().toLowerCase())
                              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                              .join(", "),
                            meetingDate: student.meeting,
                            description: student.meeting_description,
                            grade: student.grade,
                            email: student.email,
                        }));
                        this.guidanceMeetings = meetingsData;
                        this.loading = false;
                    }).catch((error) => {
                        throw new Error('Error fetching meetings:', error.message);
                    });
                } catch(error) {
                    console.error('Error in init:', error);
                };
            } else {
                fetch(`${import.meta.env.VITE_URL}/student/surveyPreview/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                    },
                })
                    .then((res) => res.json())
                    .then(async (data) => {
                        const surveyStore = useSurveyStore();
                        const studentStore = useStudentStore();

                        if (data.dueDate < new Date() || data.status === "FINALIZED") {
                            surveyStore.open = false;
                        }

                        studentStore.studentSurveyPreview = data
                        this.studentSurveyPreview =data
                        console.log(this.studentSurveyPreview)
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
                        const studentStore = useStudentStore();
                        const parsedData = JSON.parse(data);

                        studentStore.survey = parsedData.survey.fields;
                        studentStore.answeredSurvey = parsedData.answeredSurvey.fields;
                    })
                    .catch((error) => {
                        console.error("Error fetching survey:", error);
                    });

                this.loading = false;
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
                }).catch((error) => {
                    console.error('Error fetching GoogleLogin:', error);
                });
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
                        await this.getUserType()
                        this.init(this.userType);
                        this.savePersistentSession();
                    })
                    .catch((error) => {
                        throw new Error('Error fetching login:', error.message);
                    });

            } catch (error) {
                console.error(error);
                this.loading = false;
                alert("Login failed. Please check your credentials.");
            };
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
                        Authorization: `Bearer ${this.access_token}`
                    },
                    body: JSON.stringify({
                        email: email,
                        date: meetingISO,
                        memo: description,
                        notify: notify,
                    }),
                });
                const meetingExists = this.guidanceMeetings.filter((meeting: object) => meeting.email === email).length > 0
                if(!meetingExists) {
                    const student = this.guidanceStudents.find((student) => 
                        student.email === email.split("@")[0]
                    )
                    const meetingData = {
                        name: student.name
                            .split(",")
                            .map((part) => part.trim().toLowerCase())
                            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                            .join(", "),
                        meetingDate: meetingISO,
                        description: description,
                        email: email,
                        grade: student.grade,
                    };
                    this.guidanceMeetings.push(meetingData);
                }
            } catch (error) {
                console.error('Error fetching updateMeeting:', error);
            };
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
            }).then(() => {
                const updatedMeetings = this.guidanceMeetings.filter((meeting) => meeting.email !== email);
                this.guidanceMeetings = updatedMeetings;
            }).catch((error) => {
                console.error('Error fetching updateMeeting:', error);
            });
        },
        async addFlag(email: string, newFlag: string) {
            try {
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
                if (this.currentlyViewingStudents === null) return
                // @ts-ignore
                const studentIndex = this.currentlyViewingStudents.findIndex((student) => student.email + "@nycstudents.net" === email);
                const previewIndex = this.studentSurveyPreview.findIndex((student) => student.email + "@nycstudents.net" === email);
                if (studentIndex !== -1 && previewIndex !== -1) {
                    this.currentlyViewingStudents[studentIndex].flag = data.flag;
                    this.studentSurveyPreview[previewIndex].flag = data.flag;
                }
            } catch (error) {
                console.error('Error fetching updateFlag:', error);
            };
        },
        async deleteFlag(email: string, flagToBeRemoved: string) {
            try {
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
                if (this.currentlyViewingStudents === null) return
                // @ts-ignore
                const studentIndex = this.currentlyViewingStudents.findIndex((student) => student.email + "@nycstudents.net" === email);
                const previewIndex = this.studentSurveyPreview.findIndex((student) => student.email + "@nycstudents.net" === email);
                if (studentIndex !== -1 && previewIndex !== -1) {
                    this.currentlyViewingStudents[studentIndex].flag = data.flag;
                    this.studentSurveyPreview[previewIndex].flag = data.flag;
                }
            } catch (error) {
                console.error('Error fetching updateFlag:', error);
            };
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
                console.error('Error fetching user:', error);
            };
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

            localStorage.setItem('session', persistentData);
        },
    },
    persist: {
        storage: sessionStorage,
    }
});
