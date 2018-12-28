import { CategoryVm } from "./category-vm";
import { BrandVm } from "./brand-vm";

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
  brand: BrandVm;
  description: string;
  thumbnail: string;
  gallery: string[];
}
