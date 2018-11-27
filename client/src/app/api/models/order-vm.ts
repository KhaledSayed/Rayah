/* tslint:disable */
import { ObjectID } from './object-id';
export interface OrderVm {
  createdAt?: string;
  updatedAt?: string;
  id?: string;
  user: ObjectID;
  status: string;
  basket: Array<string>;
  coupon: ObjectID;
  address: string;
}
