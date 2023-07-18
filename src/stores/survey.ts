import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { grade } from "../types/interface";
import axios from "axios";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    currentSurvey: [],
    currentResponse: [],
    currentQuestion: [],
    loading: false,
    open: false,
  }),
  getters: {
    //
  },
  actions: {
    //
    async saveSurvey(status: String) {
      const userStore = useUserStore();
      const email = this.currentSurvey.email;
      const answers = this.currentResponse;
      const jsonString = JSON.stringify(answers);

      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation updateSurvey($email: String, $answers: JSONString, $status: String) {
                updateSurvey(email: $email, answers: $answers, status: $status) {
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
          // console.log(res);
          if (userStore.userType === "student") {
            userStore.data.answeredSurvey[0].answers = jsonString;
            userStore.data.answeredSurvey[0].status = "COMPLETE";
          } else if (userStore.userType === "guidance") {
            const studentIndex =
              userStore.data.allAnsweredSurveys.edges.findIndex(
                (x) => x.node.email == this.currentSurvey.email
              );
            // console.log(userStore.data.allAnsweredSurveys.edges)
            userStore.data.allAnsweredSurveys.edges[studentIndex].node.answers =
              jsonString;
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
        courses: [],
        preference: [],
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
        if (userStore.data.answeredSurvey[0] === null) {
          await this.startSurvey(email, survey, grade);
        }

        this.currentSurvey = userStore.data.answeredSurvey[0];
        this.currentResponse = JSON.parse(
          userStore.data.answeredSurvey[0].answers
        );

        this.loading = false;
      } else if (userStore.userType === "guidance") {
        let studentIndex = userStore.data.allAnsweredSurveys.edges.findIndex(
          (x) => x.node.email === email
        );

        if (studentIndex < 0) {
          await this.startSurvey(email, survey, grade);
          studentIndex = userStore.data.allAnsweredSurveys.edges.findIndex(
            (x) => x.node.email === email
          );
        }
        this.currentSurvey =
          userStore.data.allAnsweredSurveys.edges[studentIndex].node;
        this.currentResponse = JSON.parse(this.currentSurvey.answers);

        this.loading = false;
      } else {
        console.log("not logged in??");
      }
    },
  },
  persist: true,
});
