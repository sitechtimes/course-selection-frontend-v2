import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useStudentStore } from "./student";
import { useGuidanceStore } from "./guidance";
import { useRouter } from "vue-router";
import { grade, status, surveyAnswer, surveyQuestion, surveyStore, surveyStringAnswer } from "../types/interface";
import axios from "axios";

export const useSurveyStore = defineStore("survey", {
  state: (): surveyStore => ({
    currentAnsweredSurvey: {answers: "[{}]", email: "", grade: "FRESHMAN", status: "INCOMPLETE"},
    currentResponse: [{id: '', question: '', answer:{courses:[], preference: []}}],
    currentSurvey: {dueDate: "", grade: "FRESHMAN", question: [{id: "", questionType: "OTHER", status: 'STANDARD', question:'', className: ''}]},
    loading: false,
    open: true,
    submit: false,
    missingAnswers: [],
  }),
  getters: {
    //
  },
  actions: {
    async saveSurvey(status: status, grade: String) {
      const userStore = useUserStore();
      const email = this.currentAnsweredSurvey.email;
      const answers = this.currentResponse;
      const jsonString = JSON.stringify(answers);

      if(status === 'COMPLETE') {
        this.submit = true
        setTimeout(() => {
          this.submit = false
        }, 1500)
      }

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
          const studentStore = useStudentStore()
          const guidanceStore = useGuidanceStore()
          if (userStore.userType === "student") {
            studentStore.answeredSurvey[0].answers = jsonString;
            studentStore.answeredSurvey[0].status = status;
          } else if (userStore.userType === "guidance") {
            let survey = guidanceStore.allAnsweredSurveys.edges.filter(x => x.node.email === this.currentAnsweredSurvey.email && x.node.grade === this.currentAnsweredSurvey.grade)
            let studentIndex = guidanceStore.allAnsweredSurveys.edges.indexOf(survey[0])
            guidanceStore.allAnsweredSurveys.edges[studentIndex].node.answers = jsonString;
            guidanceStore.allAnsweredSurveys.edges[studentIndex].node.status = status;
          } 
        });
    },
    async startSurvey(email: string, grade: grade) {
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
          const studentStore = useStudentStore()
          const guidanceStore = useGuidanceStore()
          if (userStore.userType === "student") {
            studentStore.answeredSurvey[0] = res.data.data.newSurvey.survey;
          } else if (userStore.userType === "guidance") {
            const newStudentSurvey = {
              node: res.data.data.newSurvey.survey,
            };
            guidanceStore.allAnsweredSurveys.edges.push(newStudentSurvey);
          }
        });
    },
    async setSurvey(email: string, grade: grade) {
      const userStore = useUserStore();
      const studentStore = useStudentStore();
      const guidanceStore = useGuidanceStore()
      this.loading = true;

      if (userStore.userType === "student") {
        if (studentStore.answeredSurvey[0] === undefined) {
          await this.startSurvey(email, grade);
        }

        this.currentAnsweredSurvey = studentStore.answeredSurvey[0];
        this.currentResponse = JSON.parse(
          studentStore.answeredSurvey[0].answers
        );

        this.loading = false;
      } else if (userStore.userType === "guidance") {
        let survey = guidanceStore.allAnsweredSurveys.edges.filter(x => x.node.email === email && x.node.grade === grade)
        let studentIndex = guidanceStore.allAnsweredSurveys.edges.indexOf(survey[0])

        if (studentIndex < 0) {
          await this.startSurvey(email, grade);
          survey = guidanceStore.allAnsweredSurveys.edges.filter(x => x.node.email === email && x.node.grade === grade)
          studentIndex = guidanceStore.allAnsweredSurveys.edges.indexOf(survey[0])
          
        }
        this.currentAnsweredSurvey = guidanceStore.allAnsweredSurveys.edges[studentIndex].node;
        this.currentResponse = JSON.parse(this.currentAnsweredSurvey.answers);

        this.loading = false;
      } 
    },
    async checkAnswers() {
      const check: Array<string> = []
      const userStore = useUserStore()

      this.currentSurvey.question.forEach((x: surveyQuestion) => {
        const answer: surveyStringAnswer| surveyAnswer | undefined = this.currentResponse.find(y => y.id === x.id)
        if(x.questionType === 'GENERAL' || x.questionType === 'BOOLEAN') {
          //@ts-ignore
          if(answer?.answer.trim()[0] === undefined) {
            check.push(x.id)
          } 
        } else {
          if(answer?.answer.courses.length === 0){
            check.push(x.id)
          }
        }
      })
      this.missingAnswers = check
      if(check.length === 0) {
        if(userStore.userType === "student") {
          await this.saveSurvey('COMPLETE', this.currentAnsweredSurvey.grade)
        } else if(userStore.userType === "guidance") {
          await this.saveSurvey('COMPLETE', this.currentAnsweredSurvey.grade)
        }
      } 
    },
  },
  persist: true,
});
