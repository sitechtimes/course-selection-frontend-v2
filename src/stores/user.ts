import { defineStore } from "pinia";
import { useSurveyStore } from "./survey";
import { useStudentStore } from "./student";
import { useGuidanceStore } from "./guidance";
import { useRouter } from "vue-router";
import axios from "axios";
import { user, account_type, userData } from "../types/interface";
import { ref } from "vue";
import router from "../router";

export const useUserStore = defineStore("user", () => {
    const first_name = ref("");
    const last_name = ref("");
    const email = ref("");
    const userType = ref<account_type>(null);
    const isLoggedIn = ref(false);
    const access_token = ref("");
    const refresh_token = ref("");
    const loading = ref(false);
    const expire_time = ref(0);
    const studentSurveyPreview = ref(null);

    async function init(type: account_type) {
        userType.value = type;
        if (type === "guidance") {
            fetch(`${import.meta.env.VITE_URL}/guidance/profiles/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${access_token.value}`,
                },
            }).then(async (data) => {
                studentSurveyPreview.value = await data.json();
                loading.value = false;
            });
        } else {
            fetch(`${import.meta.env.VITE_URL}/student/surveyPreview/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${access_token.value}`,
                },
            }).then((res: any) => {
                const router = useRouter();
                const surveyStore = useSurveyStore();
                const studentStore = useStudentStore();
                const data = res.json();
                if (data.dueDate < new Date() || data.status === "FINALIZED") {
                    surveyStore.open = false;
                }
                console.log(data)
                studentStore.survey.dueDate=data.dueDate
                surveyStore.status = data.status;
            });
            loading.value = false;
        }
    }
    async function GoogleLogin(res: any) {
        loading.value = true;
        await axios
            .post(`${import.meta.env.VITE_URL}/social-login/google/`, {
                access_token: res.access_token,
            })
            .then((response) => {
                access_token.value = response.data.access_token;
                refresh_token.value = response.data.refresh_token;
                email.value = response.data.user.email;
                first_name.value = response.data.user.first_name;
                last_name.value = response.data.user.last_name;
                isLoggedIn.value = true;

                const date = new Date();
                const expiration = date.setHours(date.getHours() + 1);

                expire_time.value = expiration;

                getUserType(); //make dj rest auth return user type (backend) to remove this function
            });
    }
    async function EmailLogin(username: string, password: string) {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_URL}/auth/login/`,
                {
                    username: username.toLowerCase(),
                    password: password,
                }
            );

            console.log(response);
            access_token.value = response.data.access_token;
            refresh_token.value = response.data.refresh_token;
            email.value = response.data.user.email;
            first_name.value = response.data.user.first_name;
            last_name.value = response.data.user.last_name;
            isLoggedIn.value = true;

            const date = new Date();
            const expiration = date.setHours(date.getHours() + 1);

            expire_time.value = expiration;
            loading.value = true;
            await getUserType()
            init(userType.value);

        } catch (error) {
            loading.value = false;
            alert("Login failed. Please check your credentials.");
        }
    }
    async function changeMeeting(
        email: string,
        meetingISO: string,
        description: string
    ) {
        fetch(`${import.meta.env.VITE_URL}/guidance/updateMeeting/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token.value}`
            },
            body: JSON.stringify({
                email: email,
                meeting: meetingISO,
                description: description,
            }),
        });
    }
    async function deleteMeeting(email: string) {
        fetch(`${import.meta.env.VITE_URL}/guidance/updateMeeting/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${access_token.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        });
    }
    async function addFlag(email: string, newFlag: string) {
        const res = await fetch(`${import.meta.env.VITE_URL}/guidance/updateFlag/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                flag: newFlag,
            }),
        })
        const data = await res.json()
        if (studentSurveyPreview.value === null) return
        // @ts-ignore
        const student = await studentSurveyPreview.value.find((student) => student.email + "@nycstudents.net" === email);
        student.flag = data.flag
    }

    async function deleteFlag(email: string, flagToBeRemoved: string) {
        const res = await fetch(`${import.meta.env.VITE_URL}/guidance/updateFlag/`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${access_token.value}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                flag: flagToBeRemoved,
            }),
        })
        const data = await res.json()
        if (studentSurveyPreview.value === null) return
        // @ts-ignore
        const student = await studentSurveyPreview.value.find((student) => student.email + "@nycstudents.net" === email);
        student.flag = data.flag
    }
    async function getUserType() {
        const res = await fetch(`${import.meta.env.VITE_URL}/user/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token.value}`,
            },
        });
        const data = await res.json();
        if (data.is_guidance) {
            userType.value = "guidance";
        } else {
            userType.value = "student";
        }
    }
    return { first_name, last_name, email, userType, isLoggedIn, access_token, refresh_token, loading, expire_time, studentSurveyPreview, init, GoogleLogin, EmailLogin, changeMeeting, deleteMeeting, addFlag, deleteFlag, getUserType }
});
