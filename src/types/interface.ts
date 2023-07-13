export interface courses{
    courseCode: string
    subject: course_type
    name: string
}

export interface studentData { //this is for guidance use 
    coursesAvailable: Array<courses>
    coursesRequired: Array<courses>
    coursesTaken: Array<courses>
    grade: grade
    homeroom: string
    meeting: string
    // osis: string
    user: object
    // first_name?: string
    // last_name?: string
    // answers: object, 
    // counselor: string,
}

export interface userData { 
    survey?: object //should be empty for guidance, object for students
    students: studentData[] // should be one object for students, filled with all students for guidance
}


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

export interface surveyQuestion {
    question: string
    questionType: string
    id: string
}

export interface surveyAnswer {
    id: string
    question: string
    answer: Array<string>
}

export type course_type = 'MATH' | 'ENGLISH' | 'LANG' | 'SS' | 'TECH' | 'PE' | 'CAREER' | 'SCIENCE' | 'ARTS' | 'OTHER'
export type account_type = 'student' | 'guidance' | null;
export type grade = 'freshman' | 'sophomore' | 'junior' | 'senior';