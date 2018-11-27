/* tslint:disable */
export interface TodoVm {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  content: string;
  level?: 'Low' | 'Normal' | 'High';
  isCompleted: boolean;
}
