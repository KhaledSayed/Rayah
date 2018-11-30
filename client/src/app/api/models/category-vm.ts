/* tslint:disable */
export interface CategoryVm {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name: string;
  description?: string;
  parent: CategoryVm;
  thumbnail: string;
}
