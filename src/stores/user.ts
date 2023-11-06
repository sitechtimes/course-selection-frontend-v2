import { defineStore } from "pinia";
import { useSurveyStore } from "./survey";
import { useStudentStore } from "./student";
import { useGuidanceStore } from "./guidance";
import { useRouter } from "vue-router";
import axios from "axios";
import { user, account_type, userData } from "../types/interface";

export const useUserStore = defineStore("user", {
  state: (): user => ({
    first_name: "",
    last_name: "",
    email: "",
    userType: null,
    isLoggedIn: false,
    access_token: "",
    refresh_token: "",
    loading: false,
    expire_time: 0,
  }),
  getters: {
    // getStudents(name?: string): object[] | object | undefined {
    //     if (name) {
    //         const students = this.data.students?.filter((e) => e.first_name === name);
    //         return students
    //     }
    //     return this.data.students
    // },
  },
  actions: {
    async init(type: account_type) {
      this.userType = type;
      if (type === "guidance") {
        await axios
          .post(
            `${import.meta.env.VITE_URL}/graphql/`,
            {
              query: `query{
                            user{
                                firstName
                                lastName
                                email
                            }
                            guidance{
                                students{
                                    user{
                                        firstName
                                        lastName
                                        email
                                    }
                                    homeroom
                                    flag
                                    grade
                                    coursesTaken{
                                        courseCode
                                    }
                                    coursesRequired{
                                        courseCode
                                    }
                                    coursesAvailable{
                                        courseCode
                                        subject
                                        name
                                    }
                                    meeting
                                }
                            }
                            allSurveys {
                                edges{
                                    node{
                                        grade
                                        question{
                                            question
                                            questionType
                                            id
                                            status
                                            classReferenced {
                                                name
                                            }
                                        }
                                        dueDate
                                    }
                                }
                            }
                            allAnsweredSurveys {
                                edges{
                                    node{
                                        email
                                        answers
                                        status
                                        grade
                                    }
                                }
                            }
                            surveyStats {
                              edges {
                                  node {
                                      year
                                      stats
                                  }
                              }
                          }
                            allStudents {
                              edges{
                                node{
                                  user{
                                    firstName
                                    lastName
                                    email
                                  }
                                  homeroom
                                  flag
                                  grade
                                  coursesTaken{
                                    courseCode
                                  }
                                  coursesRequired{
                                    courseCode
                                  }
                                  coursesAvailable{
                                    courseCode
                                    subject
                                    name
                                  }
                                  meeting
                                }
                              }
                            }                       

                    }`,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.access_token}`,
              },
            }
          )
          .then((res) => {
            const guidanceStore = useGuidanceStore();
            guidanceStore.allAnsweredSurveys = res.data.data.allAnsweredSurveys;
            guidanceStore.allStudents = res.data.data.allStudents;
            guidanceStore.allSurveys = res.data.data.allSurveys;
            guidanceStore.guidance = res.data.data.guidance;
            guidanceStore.user = res.data.data.user;
            guidanceStore.surveyStats = res.data.data.surveyStats;

            this.loading = false;
          });
      } else {
        await axios
          .post(
            `${import.meta.env.VITE_URL}/graphql/`,
            {
              query: `query{
                        user{
                            firstName
                            lastName
                            email
                        }
                        student{
                            homeroom
                            grade
                            coursesTaken{
                                courseCode
                            }
                            coursesRequired{
                                courseCode
                            }
                            coursesAvailable{
                                courseCode
                                subject
                                name
                            }
                            meeting
                        }
                        survey{
                            grade
                            question{
                                question
                                questionType
                                id
                                status
                                classReferenced {
                                    name
                                }
                            }
                            dueDate
                        }
                        answeredSurvey{
                            email
                            answers
                            status
                            grade
                        }
                        }`,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.access_token}`,
              },
            }
          )
          .then((res: any) => {
            const studentStore = useStudentStore();
            studentStore.answeredSurvey = res.data.data.answeredSurvey;
            studentStore.student = res.data.data.student;
            studentStore.survey = res.data.data.survey;
            studentStore.user = res.data.data.user;

            const surveyStore = useSurveyStore();
            const router = useRouter();
            if (studentStore.student.homeroom === "") {
              console.log("profile not updated");
            } else {
              const currentDate = new Date();
              const closeTime = studentStore.survey.dueDate
                .substring(0, 10)
                .split("-");
              if (
                studentStore.answeredSurvey.length !== 0 &&
                studentStore.answeredSurvey[0].status === "FINALIZED"
              ) {
                surveyStore.open = false;
              }

              if (Number(closeTime[0]) < currentDate.getFullYear()) {
                surveyStore.open = false;
              } else if (Number(closeTime[0]) === currentDate.getFullYear()) {
                if (Number(closeTime[1]) < currentDate.getMonth() + 1) {
                  // Get month starts at 0, not 1
                  surveyStore.open = false;
                } else if (
                  Number(closeTime[1]) ===
                  currentDate.getMonth() + 1
                ) {
                  if (Number(closeTime[2]) < currentDate.getDate()) {
                    surveyStore.open = false;
                  }
                }
              }
              surveyStore.currentSurvey = studentStore.survey;
            }
            this.loading = false;
          });
      }
    },
    async getUserType() {
      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `query{
                            user{
                                isGuidance
                                isStudent
                            }
                        }`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((res3: any) => {
          if (res3.data.data.user.isGuidance) {
            this.userType = "guidance";
          } else {
            this.userType = "student";
          }
          this.init(this.userType);
        });
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
      this.loading = true;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_URL}/auth/login/`,
          {
            username: username.toLowerCase(),
            password: password,
          }
        );

        console.log(response);
        this.access_token = response.data.access_token;
        this.refresh_token = response.data.refresh_token;
        this.email = response.data.user.email;
        this.first_name = response.data.user.first_name;
        this.last_name = response.data.user.last_name;
        this.isLoggedIn = true;

        const date = new Date();
        const expiration = date.setHours(date.getHours() + 1);

        this.expire_time = expiration;

        this.getUserType(); // make dj rest auth return user type (backend) to remove this function
      } catch (error) {
        this.loading = false;
        alert("Login failed. Please check your credentials.");
      }
    },
    async changeMeeting(email: string, meetingISO: string, description: string) {
      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation {
                            updateMeeting(email: "${email}", meeting:"${meetingISO}",  meetingDescription:"${description}") {
                                student{
                                    meeting
                                    meetingDescription
                                }
                            }
                        }`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          const guidanceStore = useGuidanceStore();
          const studentIndexAll = guidanceStore.allStudents.edges.findIndex(
            (student) => student.node.user.email === email
          );
          const studentIndex = guidanceStore.guidance.students.findIndex(
            (student) => student.user.email === email
          );

          if (studentIndex > -1) {
            guidanceStore.guidance.students[studentIndex].meeting =
              res.data.data.updateMeeting.student.meeting;
            guidanceStore.guidance.students[studentIndex].description = description;
          }

          console.log(guidanceStore.allStudents.edges[studentIndexAll].node);
          guidanceStore.allStudents.edges[studentIndexAll].node.meeting =
            res.data.data.updateMeeting.student.meeting;
          guidanceStore.allStudents.edges[studentIndexAll].node.description = description;
        });
    },
    async deleteMeeting(email: string) {
      console.log(email)
      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation {
                            deleteMeeting(email: "${email}") {
                                student{
                                  email
                                }
                            }
                        }`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((res) => {
          callFunctionInGuidanceCalender()
          callFunctionInUpcomingMeeting()   
        });
    },
    async addFlag(email: string, newFlag: string) {
      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation {
                            updateFlag(email: "${email}", flag:"${newFlag}") {
                                student{
                                    flag
                                }
                            }
                        }`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((res) => {
          const guidanceStore = useGuidanceStore()
          const studentIndexAll = guidanceStore.allStudents.edges.findIndex(student => student.node.user.email === email)
          const studentIndex = guidanceStore.guidance.students.findIndex(student => student.user.email === email)
          if (studentIndex > -1) {
            guidanceStore.guidance.students[studentIndex].flag =
              res.data.data.updateFlag.student.flag;
          }
          guidanceStore.allStudents.edges[studentIndexAll].node.flag = res.data.data.updateFlag.student.flag
          console.log(res.data.data.updateFlag.student.flag)
        });
    },
    async deleteFlag(email: string, flagToBeRemoved: string) {
      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation {
                          removeFlag(email: "${email}", flag:"${flagToBeRemoved}") {
                              student{
                                  flag
                              }
                          }
                      }`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((res) => {
          const guidanceStore = useGuidanceStore()
          const studentIndexAll = guidanceStore.allStudents.edges.findIndex(student => student.node.user.email === email)
          const studentIndex = guidanceStore.guidance.students.findIndex(student => student.user.email === email)
          if (studentIndex > -1) {
            guidanceStore.guidance.students[studentIndex].flag = res.data.data.removeFlag.student.flag
          }

          guidanceStore.allStudents.edges[studentIndexAll].node.flag = res.data.data.removeFlag.student.flag
          console.log(res.data.data.removeFlag.student.flag)
        });
    },
  },
  persist: true,
});
