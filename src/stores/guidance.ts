import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { grade, surveyAnswer, surveyQuestion, guidanceData } from "../types/interface";
import axios from "axios";

export const useGuidanceStore = defineStore("guidance", {
    state: (): guidanceData => ({
        allAnsweredSurveys: {edges: []},
        allStudents: {edges: []},
        allSurveys: {edges: []},
        guidance: {students: []},
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