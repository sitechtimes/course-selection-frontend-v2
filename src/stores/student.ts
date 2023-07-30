import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { grade, surveyAnswer, surveyQuestion, studentUser } from "../types/interface";
import axios from "axios";

export const useStudentStore = defineStore("student", {
    state: (): studentUser => ({
        answeredSurvey: [{answers: "[{}]", email: "", grade: "FRESHMAN", status: "INCOMPLETE"}],
        student: {coursesAvailable: [], coursesRequired: [], coursesTaken: [], grade: "FRESHMAN", homeroom: "", meeting: null},
        survey: {dueDate: "", grade: "FRESHMAN", question: [{id: "", question:'', questionType: "OTHER", status: 'STANDARD', className: ''}]},
        user: {email: "", firstName: "", lastName: ""},
    }),
    getters: {
        //
    },
    actions: {
        //
    },
    persist: true,
});
