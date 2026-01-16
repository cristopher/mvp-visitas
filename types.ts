
export enum UserRole {
  MANAGER = 'MANAGER',
  WORKER = 'WORKER',
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED',
}

export interface TaskHistory {
  id: number;
  fecha: string; // ISO date string or formatted string
  comentario: string;
  history_image?: string;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  date: string; // ISO date string or formatted string
  time?: string;
  description: string;
  solicitante: string;
  assignee?: string;
  status: TaskStatus;
  duration?: string; // e.g. "2d 15h"
  task_history?: TaskHistory[];
  foto_original: string;
  evidencia_final: string;
  descripcion_final:string;
}

export interface ProjectStats {
  total: number;
  completed: number;
  open: number;
  efficiency: number;
}
