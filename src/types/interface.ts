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
  ownStudent: number[];
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
  questionType: "BOOLEAN" | "FINAL" | "NOTE" | "GENERAL" | "DROPDOWN" | Subject;
  status: "OPTIONAL" | "STANDARD" | "CLASS";
  classReferenced: Course | null;
  options: string[] | null;
}

export interface Course {
  id: number;
  name: string;
  subject: Subject;
}

export interface Flag {
  flag: string;
  title: string;
  color: string;
}

export interface Meeting {
  id: number;
  name: string;
  meetingDate: Date;
  description: string;
  grade: number;
  email: string;
}

export interface DateInfo {
  type: number;
  todaysDate: number;
  meetings: Meeting[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    label: string;
  }[];
}

export interface CourseStat {
  course: Course;
  picks: number;
  ranks: { [key: number]: number }
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
