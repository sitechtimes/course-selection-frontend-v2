import { defineStore } from "pinia";
import axios from "axios";
import { user, account_type, userData } from "../types/interface";

// create empty answeredsurvey
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
      const surveyStore = useSurveyStore()
      const osis = surveyStore.currentSurvey.osis
      const answers = surveyStore.currentResponse
      console.log(answers, 'oo')
      let jsonString = JSON.stringify(answers);
      
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
          if(this.userType === "student") {
            this.data.answeredSurvey.answers = jsonString
          } else if(this.userType === "guidance") {
            // find student in list and update their survey
            const studentIndex = this.data.allAnsweredSurveys.edges.findIndex(x => x.node.osis == surveyStore.currentSurvey.osis)
            this.data.allAnsweredSurveys.edges[studentIndex].node.answers = jsonString
          } else {
            console.log("not logged in??")
          }
        });
    },
    async createSurvey(osis: string) {
      await axios
        .post(
          "https://api.siths.dev/graphql/",
          {
            query: `mutation {
                newSurvey(osis: ${osis}, answers: "[]") {
                      survey {
                          id
                          
                      }
                }
          }`
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
        });
    },
  },
  persist: true,
});

export const useSurveyStore = defineStore("survey", { 
  state: () => ({
    currentSurvey: [],
    currentResponse: [],
    currentQuestion: [],
  }),
  getters: {
    //
  },
  actions: {
    //
  },
  persist: true,
});