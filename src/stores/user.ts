import { defineStore } from "pinia";
import { useSurveyStore } from "./survey";
import { useRouter } from "vue-router";
import axios from "axios";
import { user, account_type, userData } from "../types/interface";

export const useUserStore = defineStore("user", {
  state: (): user => ({
    first_name: "",
    data: {},
    last_name: "",
    email: "",
    userType: null,
    isLoggedIn: false,
    access_token: "",
    refresh_token: "",
    loading: false,
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
        console.log("guidance logged");
        await axios
          .post(
            `${import.meta.env.VITE_URL}/graphql/`,
            {
              query: `query{
                            user{
                                firstName
                            }
                            guidance{
                                students{
                                    user{
                                        firstName
                                        lastName
                                        email
                                    }
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
                            }
                            allSurveys {
                                edges{
                                    node{
                                        grade
                                        question{
                                            question
                                            questionType
                                            id
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
                            allStudents {
                              edges{
                                node{
                                  user{
                                    firstName
                                    lastName
                                    email
                                  }
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
            this.data = res.data.data;
            this.loading = false;
            const surveyStore = useSurveyStore()
            const router = useRouter()
            router.push('guidance/dashboard')
            console.log(res.data);
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
                            isActive
                            isStudent
                            isGuidance
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
            this.data = res.data.data; // data needs to be filtered properly
            const surveyStore = useSurveyStore() 
            const router = useRouter()
            if(this.data.student.homeroom === "") {
              console.log("o")
            } else {
              console.log(this.data.student.homeroom)
              const currentDate = new Date()
            const closeTime = this.data.survey.dueDate.substring(0,10).split("-")

            if (Number(closeTime[0]) < currentDate.getFullYear()) {
              surveyStore.open = false
            } else if (Number(closeTime[0]) === currentDate.getFullYear()) {
              if (Number(closeTime[1]) < currentDate.getMonth() + 1) { // Get month starts at 0, not 1
                surveyStore.open = false
              } else if (Number(closeTime[1]) === currentDate.getMonth() + 1) {
                if (Number(closeTime[2]) < currentDate.getDate()) {
                  surveyStore.open = false
                }
              }
            }
            
            // testing purposes only
            this.data.survey.question.forEach((question, index) => {
              if(question.questionType === 'BOOLEAN') {
                question.status = 'CLASS'
                question.class = 'comp sci' + index
              } else if (question.questionType === 'GENERAL') {
                console.log(question.questionType)
              } else {
                question.status = 'OPTIONAL'
              }
              // array.push(question)
            })
            surveyStore.currentSurvey = this.data.survey
            // console.log(surveyStore.currentSurvey.question, 'ookkk')
            }
            this.loading = false;
            router.push('student/dashboard')
            console.log(this.data, this.access_token);
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
          console.log(this.first_name);
          this.getUserType(); //make dj rest auth return user type (backend) to remove this function
        });
    },
    //2007-12-03T10:15:30Z
    async changeMeeting(email: string, newTime: string) {
      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation {
                            updateMeeting(email: "${email}", meeting:"${newTime}") {
                                student{
                                    meeting
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
          console.log(res)
          console.log("meeting changed");
        });
    },
  },
  persist: true,
});
