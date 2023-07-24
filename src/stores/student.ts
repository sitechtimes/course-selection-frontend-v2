import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { grade, surveyAnswer, surveyQuestion, studentUser } from "../types/interface";
import axios from "axios";

export const useStudentStore = defineStore("student", {
    state: (): studentUser => ({
        answeredSurvey: [{answers: "[{}]", email: "", grade: "FRESHMAN", status: "INCOMPLETE"}],
        student: {coursesAvailable: [{courseCode: "", subject: "OTHER", name: ""}], coursesRequired: [{courseCode: "", subject: "OTHER", name: ""}], coursesTaken: [{courseCode: "", subject: "OTHER", name: ""}], grade: "FRESHMAN", homeroom: "", meeting: null},
        survey: {dueDate: "", grade: "FRESHMAN", questions: [{id: "", questionType: "OTHER"}]},
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
