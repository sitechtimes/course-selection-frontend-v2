import { defineStore } from "pinia";
import { useSurveyStore } from "./survey";
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
            "https://api.siths.dev/graphql/",
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
                                    osis
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
                                        questions{
                                            question
                                            questionType
                                            id
                                        }
                                    }
                                }
                            }
                            allAnsweredSurveys {
                                edges{
                                    node{
                                        osis 
                                        answers
                                        status
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
            console.log(res.data);
          });
      } else {
        await axios
          .post(
            "https://api.siths.dev/graphql/",
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
                            osis
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
                            questions{
                                id
                                question
                                questionType
                            }
                        }
                        answeredSurvey{
                            osis
                            answers
                            status
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
            this.loading = false;
            console.log(this.data, this.access_token);
          });
      }
    },
    async getUserType() {
      await axios
        .post(
          "https://api.siths.dev/graphql/",
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
        .post("https://api.siths.dev/social-login/google/", {
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
    async changeMeeting(osis: string, newTime: string) {
      await axios
        .post(
          "https://api.siths.dev/graphql/",
          {
            query: `mutation {
                            updateMeeting(osis: "${osis}", meeting:"${newTime}") {
                                student{
                                    osis
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
          console.log("meeting changed");
        });
    },
    async saveSurvey() {
      const surveyStore = useSurveyStore();
      const osis = surveyStore.currentSurvey.osis;
      const answers = surveyStore.currentResponse;
      const jsonString = JSON.stringify(answers);

      await axios
        .post(
          "https://api.siths.dev/graphql/",
          {
            query: `mutation updateSurvey($osis: String, $answers: JSONString) {
                updateSurvey(osis: $osis, answers: $answers) {
                    survey {
                        id
                        answers
                    }
                }
            }`,
            variables: {
              osis: osis,
              answers: jsonString,
            },
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
          if (this.userType === "student") {
            this.data.answeredSurvey.answers = jsonString;
          } else if (this.userType === "guidance") {
            // needs testing
            const studentIndex = this.data.allAnsweredSurveys.edges.findIndex(
              (x) => x.node.osis == surveyStore.currentSurvey.osis
            );
            this.data.allAnsweredSurveys.edges[studentIndex].node.answers =
              jsonString;
          } else {
            console.log("not logged in??");
          }
        });
    },
    async startSurvey(osis: string, survey: Array<object>) {
      await axios
        .post(
          "https://api.siths.dev/graphql/",
          {
            query: `mutation updateSurvey($osis: String) {
              newSurvey(osis: $osis, answers: "[]") {
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
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((res) => {
          if (this.userType === "student") {
            this.data.answeredSurvey = res.data.data.newSurvey.survey;
          } else if (this.userType === "guidance") {
            const newStudentSurvey = {
              node: res.data.data.newSurvey.survey,
            };
            this.data.allAnsweredSurveys.edges.push(newStudentSurvey);
          } else {
            console.log("not logged in??");
          }
        });
    },
    async setSurvey(osis: string, survey: Array<object>) {
      const surveyStore = useSurveyStore();
      surveyStore.loading = true;

      if (this.userType === "student") {
        if (this.data.answeredSurvey === null) {
          await this.startSurvey(osis, survey);
        }

        surveyStore.currentSurvey = this.data.answeredSurvey;
        surveyStore.currentResponse = JSON.parse(
          this.data.answeredSurvey.answers
        );

        surveyStore.loading = false;
      } else if (this.userType === "guidance") {
        let studentIndex = this.data.allAnsweredSurveys.edges.findIndex(
          (x) => x.node.osis === osis
        );

        if (studentIndex < 0) {
          await this.startSurvey(osis, survey);
          studentIndex = this.data.allAnsweredSurveys.edges.findIndex(
            (x) => x.node.osis === osis
          );
        }
        surveyStore.currentSurvey =
          this.data.allAnsweredSurveys.edges[studentIndex].node;
        surveyStore.currentResponse = JSON.parse(
          surveyStore.currentSurvey.answers
        );

        surveyStore.loading = false;
      } else {
        console.log("not logged in??");
      }
    },
  },
  persist: true,
});
