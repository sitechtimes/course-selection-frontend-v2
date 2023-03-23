import { defineStore } from "pinia";
import axios from 'axios'
import {user, account_type, userData} from "../types/interface";






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
                // get all data for counselor and set it here
                // const res = await fetch('api.siths.dev');
                // this.data.students = await res.json();
            }
            else {
                await axios.post('http://127.0.0.1:8000/graphql/', {
                    query:`query{
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
                            }
                        }
                        survey{
                            questions{
                                question
                                questionType
                            }
                        }
                        answeredSurvey{
                            answers
                        }
                        }`,
                    },{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.access_token}`
                    }
    
                }).then((res:any)=>{
                    this.data = res.data.data // data needs to be filtered properly
                    console.log(this.data)
                    
                })
            }
        },
        async GoogleLogin(res:any){
            await axios.post('http://127.0.0.1:8000/social-login/google/',{"access_token":res.access_token}
                ).then((response)=>{
                    //clean this up :) 
                    console.log(response.data.access_token)
                    this.access_token = response.data.access_token
                    this.refresh_token = response.data.refresh_token
                    this.email = response.data.user.email
                    this.first_name = response.data.user.first_name
                    this.last_name = response.data.user.last_name

                    console.log(this.first_name)
                    this.init('student') //make dj rest auth return user type (backend)

            })
        },
    },
    persist: true,
})