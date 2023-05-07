import { defineStore } from "pinia";
import axios from 'axios'
import { user, account_type, userData } from "../types/interface";






export const useUserStore = defineStore('user', {
    state: (): user => ({
        first_name: '',
        data: {},
        last_name: '',
        email: '',
        userType: null,
        isLoggedIn: false,
        access_token: '',
        refresh_token: '',
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
            if (type === 'guidance') {
                console.log('guidance logged')
                await axios.post('https://api.siths.dev/graphql/', {
                    query: `query{
                            user{
                                firstName
                            }
                            guidance{
                                students{
                                    user{
                                        firstName
                                    }
                                }
                            }
                            allSurveys {
                                edges{
                                    node{
                                        questions{
                                            question
                                            questionType
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

                    }`
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.access_token}`
                    }
                }).then((res) => {
                    this.data = res.data.data
                    console.log(res.data)
                })
            }
            else {
                await axios.post('https://api.siths.dev/graphql/', {
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
                                question
                                questionType
                            }
                        }
                        answeredSurvey{
                            answers
                        }
                        
                        }`,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.access_token}`
                    }

                }).then((res: any) => {
                    this.data = res.data.data // data needs to be filtered properly
                    console.log(this.data)

                })
            }
        },
        async getUserType() {
            await axios.post('https://api.siths.dev/graphql/', {
                query: `query{
                            user{
                                isGuidance
                                isStudent
                            }
                        }`
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.access_token}`
                }
            }).then((res3: any) => {
                if (res3.data.data.user.isGuidance) {
                    this.userType = 'guidance'
                } else {
                    this.userType = 'student'
                }
                this.init(this.userType)
            })
        },
        async GoogleLogin(res: any) {
            await axios.post('https://api.siths.dev/social-login/google/', { "access_token": res.access_token }
            ).then((response) => {
                this.access_token = response.data.access_token
                this.refresh_token = response.data.refresh_token
                this.email = response.data.user.email
                this.first_name = response.data.user.first_name
                this.last_name = response.data.user.last_name
                this.isLoggedIn = true
                console.log(this.first_name)
                this.getUserType() //make dj rest auth return user type (backend) to remove this function

            })
        },
        //2007-12-03T10:15:30Z
        async changeMeeting(osis: string, newTime: string) {
            await axios.post('https://api.siths.dev/graphql/', {
                        query: `mutation {
                            updateMeeting(osis: "${osis}", meeting:"${newTime}") {
                                student{
                                    osis
                                    meeting
                                }
                            }
                        }`
                    },{
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.access_token}`
                        }
                    }).then((res)=>{
                        // this.data = res.data.data 
                        console.log("meeting changed")
                    })  
        },
        async saveSurvey(osis: string, answers: object) {
            let json = JSON.stringify(answers)
            await axios.post('https://api.siths.dev/graphql/', {
                        query: `mutation {
                            updateSurvey(osis: "123", answers: "{\"yep\": 15}") {
                                survey {
                                    osis
                                    answers
                                }
                            }
                        }`
                    },{
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.access_token}`
                        }
                    }).then((res)=>{
                        // this.data = res.data.data 
                        console.log("survey updated")
                    }) 
        },
    },
    persist: true,
})