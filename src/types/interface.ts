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
  enl: boolean;
  email: string;
  status: "Completed" | "Finalized" | "In Progress" | "Not Started";
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
}

export interface Answer {
  id: number;
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

export interface Stats {
  year: number;
  stats: string;
}

export interface PieChartStats {
  [key: string]: {
    ranks: number[];
  };
}
export interface studentMeetings {
  name: string;
  meetingDate: Date;
  description: string;
  grade: string;
  email: string;
}
