import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { answeredSurvey, getStudentSurvey, survey, status, surveyAnswer, surveyQuestion, surveyStringAnswer, studentCourses} from "../types/interface";

export const useSurveyStore = defineStore("survey", () => {
    const userStore = useUserStore();
    let missingAnswers: Array<string> = [];
    let loading:boolean = false;
    let open:boolean = true;
    let student:studentCourses = {coursesTaken: [], coursesAvailable: []}
    let currentResponse:Array<surveyAnswer> = [{id: '', question: '', answer:{courses:[], preference: []}}];
    let currentSurvey: survey = 
      {
        dueDate: "", 
        grade: "FRESHMAN", 
        question: [
          {id: "", questionType: "OTHER", status: 'STANDARD', question:'', classReferenced: null}
        ]
      };
    let currentAnswers: answeredSurvey = {answers: "", email: "", grade: "FRESHMAN", status: "INCOMPLETE"};
    
    const $reset = () => {
      missingAnswers = [];
    loading = false;
    currentResponse = [{id: '', question: '', answer:{courses:[], preference: []}}];
    student = {coursesTaken: [], coursesAvailable: []}
    currentSurvey = 
      {
        dueDate: "", 
        grade: "FRESHMAN", 
        question: [
          {id: "", questionType: "OTHER", status: 'STANDARD', question:'', classReferenced: null}
        ]
      };
    currentAnswers = {answers: "[{}]", email: "", grade: "FRESHMAN", status: "INCOMPLETE"};
     }

    async function setSurvey() {
      loading = true;
      console.log(2)
      await getSurvey()
      console.log(2)
      if (!currentAnswers.answers) {
          await startSurvey();
      } else {
        checkSurvey();
        if(missingAnswers.length === 0) {
          if(userStore.userType === "student") await postSurvey('COMPLETE')
          else if(userStore.userType === "guidance") await postSurvey('FINALIZED')
        }   
      } 
      loading = false;
    };    

    async function getSurvey() {
      console.log(userStore.userType, currentAnswers.email)
      let url = ""
      if (userStore.userType === "student") url = "/student/survey/"
      else url = `/guidance/survey/${currentAnswers.email}`
      
       await fetch(
        import.meta.env.VITE_URL +
          url, 
        {
          headers: {
            'Authorization': 'Bearer ' + userStore.access_token
          }
        }).then((res) => res.json())
        .then((res:getStudentSurvey) => {
          currentSurvey = res.survey;
          currentAnswers = res.answeredSurvey;
          
          student.coursesAvailable = res.coursesAvailable;
          student.coursesTaken = res.coursesTaken
          //@ts-ignore
          currentResponse = res.survey.question.map((question) =>
          {
            return {
            id: question.id,
            question: question.question,
            answer: {
              courses: [],
              preferences: []
            }
            }
          })
          console.log(currentResponse, currentAnswers)
        })
    }

    async function startSurvey() {
      const answers: Array<object> = [
        {
          id: "allChosenCourses",
          answer: {
            courses: [],
            preference: [],
          }
        },
        {
          id: "noteToGuidance",
          answer: "",
        },
        {
          id: "guidanceFinalNote",
          answer: "",
        }
      ];
      
      await fetch(import.meta.env.VITE_URL + "/student/survey/", 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userStore.access_token
          },
          body: JSON.stringify({
            grade: currentSurvey.grade,
            status: "INCOMPLETE",
            answers: JSON.stringify(answers)
          })
        }
      )
      .then((res) => {console.log(res);return res.json()})
      .then((res) => {
        currentAnswers.answers = res.answers;
      });
    };

    async function checkSurvey() {
      missingAnswers = []
      
      currentSurvey.question.forEach((question: surveyQuestion) => {
        const answer: surveyStringAnswer| surveyAnswer | undefined = currentResponse.find(y => y.id === question.id)
        if((
          (question.questionType === 'GENERAL' || question.questionType === 'BOOLEAN')
          //@ts-ignore
          && answer?.answer.trim()[0] === undefined) ) {
            missingAnswers.push(question.id)
        } else if(answer?.answer.courses.length === 0){
            missingAnswers.push(question.id)
        }
      })
      
    }

    async function postSurvey(status:status) {
      let url = ""
      if (userStore.userType === "student") url = "/student/survey/"
      else url = `/guidance/survey/${currentAnswers.email}`
      
      await fetch(import.meta.env.VITE_URL + url, 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + userStore.access_token
            },
            body: JSON.stringify({
              grade: currentSurvey.grade,
              status: status, 
              answers: JSON.stringify(currentResponse)
            })
          }
        )
        .then((res) => {console.log(res);return res.json()})
        .then(res => {
          currentAnswers.answers = JSON.stringify(res)
        })
    }
    return {
      currentSurvey,
      currentResponse,
      currentAnswers,
      loading,
      setSurvey,
      checkSurvey,
      missingAnswers,
      open,
      student,
      $reset
    }
});