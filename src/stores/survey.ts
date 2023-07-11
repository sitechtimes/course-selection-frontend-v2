import { defineStore } from "pinia";
import { useUserStore } from "./user";
import axios from "axios";

export const useSurveyStore = defineStore("survey", {
  state: () => ({
    currentSurvey: [],
    currentResponse: [],
    currentQuestion: [],
    loading: false,
  }),
  getters: {
    //
  },
  actions: {
    //
    async saveSurvey(status: String) {
      const userStore = useUserStore();
      const osis = this.currentSurvey.osis;
      const answers = this.currentResponse;
      const jsonString = JSON.stringify(answers);

      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation updateSurvey($osis: String, $answers: JSONString, $status: String) {
                updateSurvey(osis: $osis, answers: $answers, status: $status) {
                    survey {
                        id
                        answers
                        status
                    }
                }
            }`,
            variables: {
              osis: osis,
              answers: jsonString,
              status: status
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
            userStore.data.answeredSurvey.answers = jsonString
            userStore.data.answeredSurvey.status = 'COMPLETE'
          } else if (userStore.userType === "guidance") {
            const studentIndex = userStore.data.allAnsweredSurveys.edges.findIndex(
              (x) => x.node.osis == this.currentSurvey.osis
            );
            // console.log(userStore.data.allAnsweredSurveys.edges)
            userStore.data.allAnsweredSurveys.edges[studentIndex].node.answers =
              jsonString;
          } else {
            console.log("not logged in??");
          }
        });
    },
    async startSurvey(osis: string, survey: Array<object>) {
      const userStore = useUserStore()
      const answers: Array<object> = []
      const allChosen = {
        id: "allChosenCourses",
        courses: [],
        preference: []
      }

      const noteToGuidance = {
        id: "noteToGuidance",
        answer: ''
      }

      const guidanceFinalNote = {
        id: 'guidanceFinalNote',
        answer: ''
      }

      answers.push(noteToGuidance, allChosen, guidanceFinalNote)
      const jsonString = JSON.stringify(answers);
      await axios
        .post(
          `${import.meta.env.VITE_URL}/graphql/`,
          {
            query: `mutation updateSurvey($osis: String, $answers: JSONString) {
              newSurvey(osis: $osis, answers: $answers) {
                  survey {
                      id
                      osis
                      answers
                      status
                  }
              }
          }`,
            variables: {
              osis: osis,
              answers: jsonString
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
            userStore.data.answeredSurvey = res.data.data.newSurvey.survey;
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
    async setSurvey(osis: string, survey: Array<object>) {
      const userStore = useUserStore();
      this.loading = true;

      if (userStore.userType === "student") {
        if (userStore.data.answeredSurvey === null) {
          await this.startSurvey(osis, survey);
        }

        this.currentSurvey = userStore.data.answeredSurvey;
        this.currentResponse = JSON.parse(
          userStore.data.answeredSurvey.answers
        );

        this.loading = false;
      } else if (userStore.userType === "guidance") {
        let studentIndex = userStore.data.allAnsweredSurveys.edges.findIndex(
          (x) => x.node.osis === osis
        );

        if (studentIndex < 0) {
          await this.startSurvey(osis, survey);
          studentIndex = userStore.data.allAnsweredSurveys.edges.findIndex(
            (x) => x.node.osis === osis
          );
        }
        this.currentSurvey =
          userStore.data.allAnsweredSurveys.edges[studentIndex].node;
        this.currentResponse = JSON.parse(
          this.currentSurvey.answers
        );

        this.loading = false;
      } else {
        console.log("not logged in??");
      }
    },
  },
  persist: true,
});
