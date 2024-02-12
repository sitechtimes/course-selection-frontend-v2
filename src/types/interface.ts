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
    allStudents: guidanceSurveyPreview[]
    // guidance: guidanceStudentData
    user: userData
    currentlyViewing: studentGuidance[]
}

// student store interface
export interface studentUser {
    answeredSurvey: answeredSurvey[]
    student: studentData
    survey: survey
    user: userData
    studentSurveyPreview: studentSurveyPreview
}

export interface studentSurveyPreview {
    dueDate: string
    grade: string
    status: status
}



export interface guidanceSurveyPreview {
    name: string,
    hr: string,
    grade: string,
    email: string,
    status: status,
    flag: string,
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
    description: string
}

// student object (guidance side)
export interface studentGuidance extends studentData {
    name: string
    status: string
    email: string
    user: userData
    flag: string
    description: string
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

export interface getStudentSurvey {
    survey: survey
    answeredSurvey: answeredSurvey
    coursesTaken: course[]
    coursesAvailable: course[]
}

export interface studentCourses {
    coursesTaken: course[],
    coursesAvailable: course[]
}

export interface student {
    homeroom: string | null,
    meeting: null | string,
    meeting_description: string,
}

export interface flagAPI {
    email:string,
    flag: string,
}

export interface surveyQuestion {
    question: string
    questionType: question_type
    id: string
    status: question_status
    classReferenced: any
}

export interface surveyAnswer {
    id: string
    question?: string
    answer: checkboxAnswer | string | boolean
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
    id: number,
    courseCode: string,
    subject: course_type,
    name: string
}

export interface studentMeetings {
    name: string;
    meetingDate: Date;
    meetingTime: Date;
    memo: string;
}

export interface calendarData {
    dateInfo: Array<{
        type: string;
        todaysDate: number;
        id: string;
        meetings: Array<{
            id: string,
            name: string;
            meetingDate: Date | null;
            grade: string;
        }>;
    }>;
}

export interface classReferenced {
    name: string;
}

export type course_type = 'MATH' | 'ENGLISH' | 'LANG' | 'SS' | 'TECH' | 'PE' | 'CAREER' | 'SCIENCE' | 'ARTS' | 'OTHER'
export type account_type = 'student' | 'guidance' | null;
export type grade = 'FRESHMAN' | 'SOPHOMORE' | 'JUNIOR' | 'SENIOR';
export type status = 'COMPLETE' | 'INCOMPLETE' | 'FINALIZED' | null | undefined
export type question_type = 'BOOLEAN' | 'GENERAL' | 'MATH' | 'ENGLISH' | 'LANG' | 'SS' | 'TECH' | 'PE' | 'CAREER' | 'SCIENCE' | 'ARTS' | 'OTHER'
export type question_status = 'STANDARD' | 'CLASS' | 'OPTIONAL' 