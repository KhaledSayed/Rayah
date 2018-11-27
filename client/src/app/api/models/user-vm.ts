/* tslint:disable */
export interface UserVM {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  role?: 'Admin' | 'User';
}
