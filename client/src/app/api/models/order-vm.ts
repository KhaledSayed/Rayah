/* tslint:disable */
import { ObjectID } from "./object-id";
import { ProductVm } from "./product-vm";
import { UserVM } from "./user-vm";

interface BasketProduct {
  product: ProductVm;
  quantity: number;
  price: number;
  totalItemPrice: number;
}
export interface OrderVm {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  user: UserVM;
  status: string;
  basket: Array<BasketProduct>;
  coupon: ObjectID;
  address: string;
  note: string;
}
