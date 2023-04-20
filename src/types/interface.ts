interface courses{
    
}


export interface studentData { //this is for guidance use 
    first_name?: string
    last_name?: string
    answers: object, 
    counselor: string,
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
}



export type account_type = 'student' | 'guidance' | null;
export type grade = 'freshman' | 'sophomore' | 'junior' | 'senior';