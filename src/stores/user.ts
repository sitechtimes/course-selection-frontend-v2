import { defineStore } from "pinia";

interface userStore {
    name: string,
    email: string,
    data: userData,
    grade?: grade,
    homeroom?: string,
    accountType: string,
    isLoggedIn: boolean
}
interface userData {
    survey?: object,
    //each object will include the student and their survey data?
    students?: studentData[],
    homeroom?: string,
    counselor?: string,
}
interface studentData {
    name: string,
    osis: number,  //may not be needed
    email: string, 
    survey: object, 
    counselor: string,
}

type account_type = 'student' | 'guidance';
type grade = 'freshman' | 'sophomore' | 'junior' | 'senior';

export const useUserStore = defineStore('user', {
    state: (): userStore => ({
        name: '',
        email: '',
        data: {},
        accountType: '',
        isLoggedIn: false
    }),
    getters: {
        getStudents(name?: string): object[] | object | undefined {
            if (name) {
                const students = this.data.students?.filter((e) => e.name === name);
                return students
            }
            return this.data.students
        },
    },
    actions: {
        async init(type: account_type) {
            this.accountType = type;
            if (type === 'guidance') {
                // get all data for counselor and set it here
                const res = await fetch('api.siths.dev');
                this.data.students = await res.json();
            }
            else {
                //get all student data from the api and set it here
                const res = await fetch('api.siths.dev');
                this.data.survey = await res.json();
            }
        }
    },
})