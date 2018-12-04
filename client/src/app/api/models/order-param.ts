/* tslint:disable */
import { OrderedProduct } from "./ordered-product";
export interface OrderParam {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  basket: Array<OrderedProduct>;
  coupon: string;
  address: string;
  user?: string;
  note?: string;
}
