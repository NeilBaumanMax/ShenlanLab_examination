export interface AnswerField {
  id: string;
  label: string;
  type: "text" | "url";
  placeholder?: string;
}

export interface Phase {
  id: string;
  title: string;
  summary: string;
  questionIds: string[];
  tone: "sky" | "indigo" | "teal";
}

export interface Question {
  id: string;
  phaseId: string;
  title: string;
  shortTitle: string;
  theme: string;
  answerLabel: string;
  placeholder: string;
  fields?: AnswerField[];
  allowedExtensions: string[];
}

export interface QuestionData {
  phases: Phase[];
  questions: Question[];
  uploadDefaults: {
    maxFileBytes: number;
    accept: string;
  };
}
