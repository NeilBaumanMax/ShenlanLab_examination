export interface Resource {
  label: string;
  url: string;
}

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
}

export interface Question {
  id: string;
  phaseId: string;
  title: string;
  shortTitle: string;
  theme: string;
  task: string;
  expectation: string;
  assessment: string;
  outcome: string;
  answerType: "textarea" | "mixed";
  answerLabel: string;
  placeholder: string;
  fields?: AnswerField[];
  resources: Resource[];
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
