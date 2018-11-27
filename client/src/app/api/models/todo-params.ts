/* tslint:disable */
export interface TodoParams {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  content: string;
  level?: 'Low' | 'Normal' | 'High';
  isCompleted?: boolean;
}
