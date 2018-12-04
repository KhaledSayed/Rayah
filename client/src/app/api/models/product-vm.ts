import { CategoryVm } from "./category-vm";

/* tslint:disable */
export interface ProductVm {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  name: string;
  code: string;
  quantity: number;
  price: number;
  featured: boolean;
  category: CategoryVm;
  thumbnail: string;
  gallery: string[];
}