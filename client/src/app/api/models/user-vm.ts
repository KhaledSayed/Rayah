/* tslint:disable */
export interface UserVM {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  email: string;
  name?: string;
  phone?: string;
  fullname?: string;
  role?: "Admin" | "User";
}
