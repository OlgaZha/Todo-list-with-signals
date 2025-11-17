export interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  subtasks?: string[];
  priority?: 'Low' | 'Medium' | 'High';
}
