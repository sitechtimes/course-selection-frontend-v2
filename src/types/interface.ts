export interface Student {
  grade: number;
  meetingDate: string | null;
  description: string;
  status: "Complete" | "Finalized" | "In Progress" | "Not Started";
  dueDate: string;
}

export interface GuidanceStudent extends Student {
  id: number;
  name: string;
  enl: boolean;
  email: string;
  transfer: boolean;
  team: boolean;
  regents: boolean;
  ownStudent: number[];
}

export interface Survey {
  dueDate: string;
  grade: number;
  questions: Question[];
  answers: Answer[];
}

export interface Answer {
  question: number;
  answer: string | boolean | null | Rank[];
}

export interface Rank {
  course: number;
  rank: number;
}

type Subject =
  | "ENGLISH"
  | "SS"
  | "MATH"
  | "SCIENCE"
  | "LANG"
  | "TECH"
  | "ART"
  | "PE";

export interface Question {
  id: number;
  question: string;
  questionType: "BOOLEAN" | "FINAL" | "GENERAL" | "DROPDOWN" | Subject;
  status: "OPTIONAL" | "STANDARD" | "CLASS";
  classReferenced: Course | null;
  options: string[] | null;
}

export interface Checkbox {
  courses: string[];
  preference: string[];
}

export interface Course {
  id: number;
  name: string;
  subject: Subject;
}

// guidance store interface
export interface guidanceData {
  allStudents: studentPreview[];
  // guidance: guidanceStudentData
  user: userData;
  currentlyViewing: studentGuidance[];
}

// student store interface
export interface studentUser {
  answeredSurvey: answeredSurvey[];
  student: studentData;
  survey: survey;
  user: userData;
  studentSurveyPreview: SurveyPreview;
}

export interface SurveyPreview {
  dueDate: string;
  grade: string;
  status: string;
}

// survey store interface
export interface surveyStore {
  currentAnsweredSurvey: answeredSurvey;
  currentResponse: Array<surveyAnswer | surveyStringAnswer>;
  currentSurvey: survey;
  loading: boolean;
  open: boolean;
  submit: boolean;
  missingAnswers: string[];
  studentCourses: studentCourses;
  name: string;
}

// user object
export interface userData {
  email: string;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  isGuidance?: boolean;
  isStudent?: boolean;
}

// student object (student side)
export interface studentData {
  coursesAvailable: course[];
  coursesRequired: course[];
  coursesTaken: course[];
  grade: grade;
  meeting: string | null;
  description: string;
}

// student object (guidance side)
export interface studentGuidance extends studentData {
  name: string;
  status: string;
  email: string;
  user: userData;
  flag: string;
  description: string;
  ownStudent?: boolean;
}

export interface SurveyData {
  survey: Survey;
  coursesTaken: course[];
  coursesAvailable: course[];
}

export interface studentCourses {
  coursesTaken: course[];
  coursesAvailable: course[];
}
// guidance edges and nodes interfaces
export interface guidanceStudentData {
  students: studentGuidance[];
}

export interface surveyStats {
  edges: surveyStatsNodes[];
}

export interface surveyStatsNodes {
  node: stats;
}

export interface stats {
  year: number;
  stats: string;
}

export interface allAnsweredSurveys {
  edges: answeredSurveyNodes[];
}

export interface answeredSurveyNodes {
  node: answeredSurvey;
}

export interface allStudents {
  edges: allStudentNodes[];
}

export interface studentPreview {
  name: string;
  grade: string;
  email: string;
  status: string;
  flag: string;
  dueDate?: string;
  meetingDate?: string;
}

export interface allStudentNodes {
  node: studentGuidance;
}

export interface allSurveys {
  edges: allSurveysNodes[];
}

export interface allSurveysNodes {
  node: survey;
}

// survey interfaces
export interface answeredSurvey {
  id?: string;
  answers: string;
  email: string;
  grade: grade;
  status: status;
}

export interface survey {
  dueDate: string;
  grade: grade;
  question: surveyQuestion[];
}

export interface surveyQuestion {
  question: string;
  questionType: question_type;
  status: question_status;
  classReferenced: any;
  id: string;
  options: string[];
}

export interface surveyAnswer {
  id: string;
  question: string;
  answer: checkboxAnswer;
}

export interface surveyStringAnswer {
  id: string;
  question: string;
  answer: string;
}

export interface checkboxAnswer {
  courses: Array<course | string>;
  preference: preferences[];
}

export interface allCoursesAnswer {
  answer: checkboxAnswer;
  id: "allChosenCourses";
}

export interface surveyGuidanceAnswer {
  answer: string;
  id: "noteToGuidance" | "guidanceFinalNote";
}

export interface pieChartStats {
  [key: string]: {
    ranks: number[];
  };
}

export interface preferences {
  rank: number;
  name: string;
}

// course interfaces
export interface course {
  courseCode: string;
  subject: course_type;
  name: string;
  //id for each course should be required, fix later
  id?: number;
}

export interface studentMeetings {
  name: string;
  meetingDate: Date;
  meetingTime?: Date;
  description: string;
  grade: string;
  email: string;
}

export interface calendarMeetings extends studentMeetings {
  id: string;
  meetingDetails: studentMeetings;
}

export interface calendarData {
  dateInfo: Array<{
    type: string;
    todaysDate: number;
    id: string;
    meetings: calendarMeetings[];
  }>;
}

export interface classReferenced {
  name: string;
}

export type course_type =
  | "MATH"
  | "ENGLISH"
  | "LANG"
  | "SS"
  | "TECH"
  | "PE"
  | "CAREER"
  | "SCIENCE"
  | "ARTS"
  | "OTHER";
export type account_type = "student" | "guidance" | null;
export type grade = "FRESHMAN" | "SOPHOMORE" | "JUNIOR" | "SENIOR";
export type status = "COMPLETE" | "INCOMPLETE" | "FINALIZED" | null | undefined;
export type question_type =
  | "BOOLEAN"
  | "GENERAL"
  | "CHECKBOX"
  | "DROPDOWN"
  | "MATH"
  | "ENGLISH"
  | "LANG"
  | "SS"
  | "TECH"
  | "PE"
  | "CAREER"
  | "SCIENCE"
  | "ARTS"
  | "OTHER";
export type question_status = "STANDARD" | "CLASS" | "OPTIONAL";
