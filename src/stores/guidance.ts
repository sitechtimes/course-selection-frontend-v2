import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { grade, surveyAnswer, surveyQuestion } from "../types/interface";
import axios from "axios";

export const useGuidanceStore = defineStore("guidance", {
    state: () => ({
        
    }),
    getters: {
        //
    },
    actions: {
        //
    },
    persist: true,
});