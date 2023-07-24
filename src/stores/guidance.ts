import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useRouter } from "vue-router";
import { grade, surveyAnswer, surveyQuestion } from "../types/interface";
import axios from "axios";