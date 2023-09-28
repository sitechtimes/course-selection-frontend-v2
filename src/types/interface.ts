// user store interfaces
export interface user {
    first_name: string
    last_name: string
    email: string
    userType: account_type
    isLoggedIn: boolean
    access_token: string
    refresh_token: string
    loading: boolean
    expire_time: number
}

// guidance store interface

export interface guidanceData {
    allAnsweredSurveys: allAnsweredSurveys
    allStudents: allStudents
    allSurveys: allSurveys
    guidance: guidanceStudentData
    user: userData
    surveyStats: surveyStats
    currentlyViewing: studentGuidance[]
}

// student store interface

export interface studentUser {
    answeredSurvey: answeredSurvey[]
    student: studentData
    survey: survey
    user: userData
}

// survey store interface
export interface surveyStore {
    currentAnsweredSurvey: answeredSurvey
    currentResponse: surveyAnswer[]
    currentSurvey: survey
    loading: boolean
    open: boolean
    submit: boolean
    missingAnswers: string[]
}

// user object
export interface userData {
    email: string
    firstName: string
    lastName: string
    isActive?: boolean
    isGuidance?: boolean
    isStudent?: boolean
}

// student object (student side)
export interface studentData {
    coursesAvailable: course[]
    coursesRequired: course[]
    coursesTaken: course[]
    grade: grade
    homeroom: string
    meeting: string | null
}

// student object (guidance side)
export interface studentGuidance extends studentData {
    user: userData
    flag: string
}

// guidance edges and nodes interfaces
export interface guidanceStudentData {
    students: studentGuidance[]
}

export interface surveyStats {
    edges: surveyStatsNodes[]
}

export interface surveyStatsNodes {
    node: stats
}

export interface stats {
    year: number
    stats: string
}

export interface allAnsweredSurveys {
    edges: answeredSurveyNodes[]
}

export interface answeredSurveyNodes {
    node: answeredSurvey
}

export interface allStudents {
    edges: allStudentNodes[]
}

export interface allStudentNodes {
    node: studentGuidance
}

export interface allSurveys {
    edges: allSurveysNodes[]
}

export interface allSurveysNodes {
    node: survey
}

// survey interfaces
export interface answeredSurvey {
    id?: string
    answers: string
    email: string
    grade: grade
    status: status
}

export interface survey {
    dueDate: string
    grade: grade
    question: surveyQuestion[]
}

export interface surveyQuestion {
    question: string
    questionType: question_type
    id: string
    status: question_status
    className: string
}

export interface surveyAnswer {
    id: string
    question?: string
    answer: checkboxAnswer
}

export interface surveyStringAnswer {
    id: string
    question: string
    answer: string
}

export interface checkboxAnswer {
    courses: string[]
    preference: preferences[]
}

export interface preferences {
    rank: number
    name: string
}

// course interfaces
export interface course {
    courseCode: string
    subject: course_type
    name: string
}

export interface StudentMeeting {
    name: string;
    meetingDate: string;
}

export type course_type = 'MATH' | 'ENGLISH' | 'LANG' | 'SS' | 'TECH' | 'PE' | 'CAREER' | 'SCIENCE' | 'ARTS' | 'OTHER'
export type account_type = 'student' | 'guidance' | null;
export type grade = 'FRESHMAN' | 'SOPHOMORE' | 'JUNIOR' | 'SENIOR';
export type status = 'COMPLETE' | 'INCOMPLETE' | 'FINALIZED' | null | undefined
export type question_type = 'BOOLEAN' | 'GENERAL' | 'MATH' | 'ENGLISH' | 'LANG' | 'SS' | 'TECH' | 'PE' | 'CAREER' | 'SCIENCE' | 'ARTS' | 'OTHER'
export type question_status = 'STANDARD' | 'CLASS' | 'OPTIONAL' 