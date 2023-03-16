import { defineStore } from "pinia";
import axios from 'axios'

interface user {
    first_name: string
    last_name: string
    email: string
    data: userData
    grade?: grade
    userType: account_type
    isLoggedIn: boolean
    access_token: string
    refresh_token: string
}

interface userData { 
    survey?: object //should be empty for guidance, filled for students
    students?: studentData[] // should be empty for students, filled for guidance
}

interface studentData { //this is for guidance use 
    first_name: string
    last_name: string
    survey: object, 
    counselor: string,
}

type account_type = 'student' | 'guidance' | null;
type grade = 'freshman' | 'sophomore' | 'junior' | 'senior';

export const useUserStore = defineStore('user', {
    state: (): user => ({
        first_name: '',
        data: {} ,
        last_name: '',
        email: '',
        userType: null,
        isLoggedIn: false,
        access_token: '',
        refresh_token: '',
    }),
    getters: {
        getStudents(name?: string): object[] | object | undefined {
            if (name) {
                const students = this.data.students?.filter((e) => e.first_name === name);
                return students
            }
            return this.data.students
        },
    },
    actions: {
        async init(type: account_type) {
            this.userType = type;
            if (type === 'guidance') {
                // get all data for counselor and set it here
                const res = await fetch('api.siths.dev');
                this.data.students = await res.json();
            }
            else {
                await axios.post('http://127.0.0.1:8000/graphql/', {
                    query:`query{
                        student{
                            answeredsurveySet{
                                edges{
                                    node{
                                        answers
                                    }
                                }
                            }
                        }
                        }`,
                    },{
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.access_token}`
                    }
    
                }).then((res:any)=>{
                    console.log(res.data) //properly handle survey reponse
                })
            }
        },
        async GoogleLogin(res:any){
            await axios.post('http://127.0.0.1:8000/social-login/google/',{"access_token":res.access_token}
                ).then((response)=>{
                    //clean this up :) 
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