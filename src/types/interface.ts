interface BaseStudent {
  id: number;
  grade: number;
  meetingDate: string | null;
  description: string;
  dueDate: string;
}

export interface Student extends BaseStudent {
  grade: number;
  meetingDate: string | null;
  status: "Completed" | "Finalized" | "In Progress";
  description: string;
  dueDate: string;
}

export interface GuidanceStudent extends BaseStudent {
  id: number;
  name: string;
  email: string;
  status: "Completed" | "Finalized" | "In Progress" | "Not Started";
  enl: boolean;
  transfer: boolean;
  team: boolean;
  regents: boolean;
}

export interface Survey {
  dueDate: string;
  grade: number;
  questions: Question[];
  answers: Answer[];
  status: "Completed" | "Finalized" | "In Progress" | "Not Started";
  guidanceNotes: string;
}

export interface Answer<T = string | boolean | null | Rank[]> {
  id: number;
  question: number;
  answer: T;
}

export interface Rank {
  course: number;
  rank: number;
}

export type Subject =
  | "ENGLISH"
  | "SS"
  | "MATH"
  | "SCIENCE"
  | "LANG"
  | "TECH"
  | "ARTS"
  | "PE";

type classReferenced = Pick<Course, "id" | "name" | "subject">;
export interface Question {
  id: number;
  question: string;
  questionType: "BOOLEAN" | "FINAL" | "NOTE" | "GENERAL" | "DROPDOWN" | Subject;
  status: "OPTIONAL" | "STANDARD" | "CLASS";
  classReferenced: classReferenced | null;
  options: string[] | null;
}

export interface Course {
  id: number;
  name: string;
  subject: Subject;
  freshman?: boolean;
  sophomore?: boolean;
  junior?: boolean;
  senior?: boolean;
  description?: string;
  ap?: boolean;
  honors?: boolean;
  mandatoryCourse?: boolean;
  doublePeriod?: boolean;
  prerequisites?: string[];
  codes?: string[];
}

export interface SortArray {
  sortBy: string;
  text: string;
}

export interface Flag {
  flag: string;
  title: string;
  color: string;
}

export interface Meeting {
  id: number;
  name: string;
  date: Date;
  memo: string;
  grade: number;
  email: string;
  student: string;
  studentId: number;
  period: number;
}

export interface DateInfo {
  todaysDate: Date;
  meetings: Meeting[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor?: string[];
    label: string;
  }[];
}

export interface CourseStat {
  course: Course;
  picks: number;
  ranks: { [key: number]: number };
}

export interface Stats {
  year: number;
  courses: CourseStat[];
}

export interface PieChartStats {
  [key: string]: {
    ranks: number[];
  };
}
