import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useRouter } from "vue-router";
import { grade, surveyAnswer, surveyQuestion } from "../types/interface";
import axios from "axios";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    currentAnsweredSurvey: [],
    currentResponse: [],
    currentSurvey: [],
    loading: false,
    open: true,
    missingAnswers: [],
  }),
  getters: {
    //
  },
  actions: {
    //
    async saveSurvey(status: String, grade: String) {
      const userStore = useUserStore();
      const email = this.currentAnsweredSurvey.email;
      const answers = this.currentResponse;
      const jsonString = JSON.stringify(answers);
      console.log(status)

      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation updateSurvey($email: String, $answers: JSONString, $status: String, $grade: String) {
                updateSurvey(email: $email, answers: $answers, status: $status, grade: $grade) {
                    survey {
                        id
                        answers
                        status
                    }
                }
            }`,
            variables: {
              email: email,
              answers: jsonString,
              status: status,
              grade: grade,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userStore.access_token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (userStore.userType === "student") {
            userStore.data.answeredSurvey[0].answers = jsonString;
            userStore.data.answeredSurvey[0].status = status;
          } else if (userStore.userType === "guidance") {
            let survey = userStore.data.allAnsweredSurveys.edges.filter(x => x.node.email === this.currentAnsweredSurvey.email && x.node.grade === this.currentAnsweredSurvey.grade)
            let studentIndex = userStore.data.allAnsweredSurveys.edges.indexOf(survey[0])
            // console.log(userStore.data.allAnsweredSurveys.edges)
            userStore.data.allAnsweredSurveys.edges[studentIndex].node.answers = jsonString;
            userStore.data.allAnsweredSurveys.edges[studentIndex].node.status = status;
          } else {
            console.log("not logged in??");
          }
        });
    },
    async startSurvey(email: string, survey: Array<object>, grade: grade) {
      const userStore = useUserStore();
      const answers: Array<object> = [];
      const allChosen = {
        id: "allChosenCourses",
        answer: {
          courses: [],
          preference: [],
        }
      };

      const noteToGuidance = {
        id: "noteToGuidance",
        answer: "",
      };

      const guidanceFinalNote = {
        id: "guidanceFinalNote",
        answer: "",
      };

      answers.push(noteToGuidance, allChosen, guidanceFinalNote);
      const jsonString = JSON.stringify(answers);
      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation updateSurvey($email: String, $answers: JSONString, $grade: String) {
              newSurvey(email: $email, answers: $answers, grade: $grade) {
                  survey {
                      id
                      email
                      answers
                      status
                      grade
                  }
              }
          }`,
            variables: {
              email: email,
              answers: jsonString,
              grade: grade,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userStore.access_token}`,
            },
          }
        )
        .then((res) => {
          if (userStore.userType === "student") {
            userStore.data.answeredSurvey[0] = res.data.data.newSurvey.survey;
          } else if (userStore.userType === "guidance") {
            const newStudentSurvey = {
              node: res.data.data.newSurvey.survey,
            };
            userStore.data.allAnsweredSurveys.edges.push(newStudentSurvey);
          } else {
            console.log("not logged in??");
          }
        });
    },
    async setSurvey(email: string, survey: Array<object>, grade: grade) {
      const userStore = useUserStore();
      this.loading = true;

      if (userStore.userType === "student") {
        if (userStore.data.answeredSurvey[0] === undefined) {
          await this.startSurvey(email, survey, grade);
        }

        this.currentAnsweredSurvey = userStore.data.answeredSurvey[0];
        this.currentResponse = JSON.parse(
          userStore.data.answeredSurvey[0].answers
        );

        this.loading = false;
      } else if (userStore.userType === "guidance") {
        let survey = userStore.data.allAnsweredSurveys.edges.filter(x => x.node.email === email && x.node.grade === grade)
        let studentIndex = userStore.data.allAnsweredSurveys.edges.indexOf(survey[0])

        if (studentIndex < 0) {
          await this.startSurvey(email, survey, grade);
          survey = userStore.data.allAnsweredSurveys.edges.filter(x => x.node.email === email && x.node.grade === grade)
          studentIndex = userStore.data.allAnsweredSurveys.edges.indexOf(survey[0])
          
        }
        console.log(survey)
        this.currentAnsweredSurvey = userStore.data.allAnsweredSurveys.edges[studentIndex].node;
        this.currentResponse = JSON.parse(this.currentAnsweredSurvey.answers);

        this.loading = false;
      } else {
        console.log("not logged in??");
      }
    },
    async checkAnswers() {
      const check: Array<string> = []
      const userStore = useUserStore()
      // const router = useRouter()
      this.currentSurvey.question.forEach((x: surveyQuestion) => {
        const answer: surveyAnswer | undefined = this.currentResponse.find(y => y.id === x.id)
        if(x.questionType === 'GENERAL' || x.questionType === 'BOOLEAN') {
          if(answer.answer.trim()[0] === undefined) {
            check.push(x.id)
          } 
        } else {
          if(answer.answer.courses.length === 0){
            check.push(x.id)
          }
        }
      })
      this.missingAnswers = check
      if(check.length === 0) {
        if(userStore.userType === "student") {
          // const router = useRouter()
          await this.saveSurvey('COMPLETE', this.currentAnsweredSurvey.grade)
          // router.push('/student/dashboard')
        } else if(userStore.userType === "guidance") {
          // const router = useRouter()
          await this.saveSurvey('COMPLETE', this.currentAnsweredSurvey.grade)
          // router.push('/guidance/studentlist')
        }
      } 
    },
  },
  persist: true,
});
