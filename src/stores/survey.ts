import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { answeredSurvey, getStudentSurvey, survey, status, surveyAnswer, surveyQuestion, surveyStringAnswer, studentCourses} from "../types/interface";
import {ref, Ref} from "vue"

export const useSurveyStore = defineStore("survey", () => {
    const userStore = useUserStore();
    let missingAnswers: Ref<string[]> = ref([]);
    let loading:Ref<boolean> = ref(false);
    let open: Ref<boolean> = ref(true);
    let student:Ref<studentCourses> = ref({coursesTaken: [], coursesAvailable: []})
    let currentResponse: Ref<surveyAnswer[]> = ref([{id: '', question: '', answer:{courses:[], preference: []}}]);
    //@ts-expect-error 
    let currentSurvey: Ref<survey> = 
      ref({
        dueDate: "", 
        grade: "FRESHMAN", 
        question: [
          {id: "", questionType: "OTHER", status: 'STANDARD', question:'', classReferenced: null}
        ]
      });
      //@ts-expect-error
    let currentAnswers: Ref<answeredSurvey> = ref({answers: "", email: "", grade: "FRESHMAN", status: "INCOMPLETE"});
    
    const $reset = () => {
      missingAnswers.value = [];
    loading.value = false;
    currentResponse.value = [{id: '', question: '', answer:{courses:[], preference: []}}];
    student.value = {coursesTaken: [], coursesAvailable: []}
    currentSurvey.value = 
      {
        dueDate: "", 
        grade: "FRESHMAN", 
        question: [
          {id: "", questionType: "OTHER", status: 'STANDARD', question:'', classReferenced: null}
        ]
      };
    currentAnswers.value = {answers: "[{}]", email: "", grade: "FRESHMAN", status: "INCOMPLETE"};
     }

    async function setSurvey() {
      loading.value = true;
      checkSurvey();
      if(missingAnswers.value.length === 0) {
        if(userStore.userType === "student") await postSurvey('COMPLETE')
        else if(userStore.userType === "guidance") await postSurvey('FINALIZED')
      }   
      loading.value = false;
    };    

    async function getSurvey() {
      let url = ""
      let preview = {}
      if (userStore.userType === "student") url = "/student/survey/"
      else url = `/guidance/survey/${currentAnswers.value.email}`
      
       await fetch(
        import.meta.env.VITE_URL +
          url, 
        {
          headers: {
            'Authorization': 'Bearer ' + userStore.access_token
          }
        }).then((res) => res.json())
        .then((res:getStudentSurvey) => {
          currentSurvey.value = res.survey;
          currentAnswers.value = res.answeredSurvey;
          
          student.value.coursesAvailable = res.coursesAvailable;
          student.value.coursesTaken = res.coursesTaken
          
          currentResponse.value = JSON.parse(res.answeredSurvey.answers)

          currentResponse.value.push(...JSON.parse(res.answeredSurvey.answers))
          fetch(`${import.meta.env.VITE_URL}/student/surveyPreview/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${userStore.access_token}`,
            },
        }).then(res => preview = res.json())
        })
    }

    async function checkSurvey() {
      missingAnswers.value = []
      
      currentSurvey.value.question.forEach((question: surveyQuestion) => {
        const answer: surveyStringAnswer| surveyAnswer | undefined = currentResponse.value.find(y => y.id === question.id)
        if((
          (question.questionType === 'GENERAL' || question.questionType === 'BOOLEAN')
          //@ts-ignore
          && answer?.answer.trim()[0] === undefined) ) {
            missingAnswers.value.push(question.id)
            //@ts-ignore
        } else if(answer?.answer.courses.length === 0){
            missingAnswers.value.push(question.id)
        }
      })
      
    }

    async function postSurvey(status:status) {
      let url = ""
      if (userStore.userType === "student") url = "/student/survey/"
      else url = `/guidance/survey/${currentAnswers.value.email}`
      
      await fetch(import.meta.env.VITE_URL + url, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + userStore.access_token
            },
            body: JSON.stringify({
              grade: currentSurvey.value.grade,
              status: status, 
              answers: JSON.stringify(currentResponse)
            })
          }
        )
        .then((res) => {console.log(res);return res.json()})
        .then(res => {
          currentAnswers.value.answers = JSON.stringify(res)
        })
    }
    return {
      currentSurvey,
      currentResponse,
      currentAnswers,
      loading,
      setSurvey,
      getSurvey,
      checkSurvey,
      missingAnswers,
      open,
      student,
      $reset
    }
});