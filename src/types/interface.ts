// general user store interfaces
export interface user {
    first_name: string
    last_name: string
    email: string
    data: object // this is a temporary fix , will have fields for the diff types of data
    grade?: grade
    userType: account_type
    isLoggedIn: boolean
    access_token: string
    refresh_token: string
    loading: boolean
}
export interface student {
    user: userData
}
export interface studentUser {
    answeredSurvey: answeredSurvey[]
    student: studentData
    survey: survey
    user: userData
}

// user related interfaces
export interface userData {
    email: string
    firstName: string
    lastName: string
    isActive?: boolean
    isGuidance?: boolean
    isStudent?: boolean
}

export interface studentData { 
    coursesAvailable: courses[]
    coursesRequired: courses[]
    coursesTaken: courses[]
    grade: grade
    homeroom: string
    meeting: string | null
    // user?: userData
    user: userData
}

export interface guidanceData {
    allAnsweredSurveys: allAnsweredSurveys
    allStudents: allStudents
    allSurveys: allSurveys
    guidance: guidanceStudentData
    user: userData
}

// guidance edges and nodes interfaces
export interface guidanceStudentData { 
    students: studentData[]
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
    node: studentData
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
    question?: string
    questionType: question_type
    id: string
}

export interface surveyAnswer {
    id: string
    question: string
    answer: checkboxAnswer | string
}

export interface checkboxAnswer {
    courses: string[]
    preference: preference[]
}

export interface preference {
    rank: string
    name: string
}

// course interfaces
export interface courses{
    courseCode: string
    subject: course_type
    name: string
}

export type course_type = 'MATH' | 'ENGLISH' | 'LANG' | 'SS' | 'TECH' | 'PE' | 'CAREER' | 'SCIENCE' | 'ARTS' | 'OTHER'
export type account_type = 'student' | 'guidance' | null;
export type grade = 'FRESHMAN' | 'SOPHOMORE' | 'JUNIOR' | 'SENIOR';
export type status= 'COMPLETE' | 'INCOMPLETE' | null | undefined
export type question_type = 'BOOLEAN' | 'GENERAL' | 'MATH' | 'ENGLISH' | 'LANG' | 'SS' | 'TECH' | 'PE' | 'CAREER' | 'SCIENCE' | 'ARTS' | 'OTHER'