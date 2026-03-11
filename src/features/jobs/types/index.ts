export interface JobApplication {
  id: number;
  company: string;
  role: string;
  location?: string | null;
  region: string;
  type: string;
  status: string;
  round?: string | null;
  date: string;
  deadline?: string | null;
  followUp?: string | null;
  link?: string | null;
  salary?: string | null;
  contact?: string | null;
  notes?: string | null;
  priority: string;
  resume?: string | null;
  coverLetter?: string | null;
  source?: string | null;
  tags?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Goal {
  id: number;
  count: number;
  target: string;
}

export interface GoalTask {
  id: number;
  text: string;
  note?: string | null;
  done: boolean;
  category: string;
}

export type SortByOptions = "date" | "company";
export type TabState = "tracker" | "kanban" | "stats" | "goals";
