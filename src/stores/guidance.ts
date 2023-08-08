import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { guidanceData } from "../types/interface";
import axios from "axios";

export const useGuidanceStore = defineStore("guidance", {
    state: (): guidanceData => ({
        allAnsweredSurveys: {edges: []},
        allStudents: {edges: []},
        allSurveys: {edges: []},
        guidance: {students: []},
        user: {email: "", firstName: "", lastName: ""},
        currentlyViewing: []
    }),
    getters: {
        //
    },
    actions: {
        //
    },
    persist: true,
});