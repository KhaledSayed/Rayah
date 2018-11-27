/* tslint:disable */

export interface CouponVm {
  usedBy: number;
  createdAt?: string;
  id?: string;
  type: string;
  value: number;
  code: string;
  numberOfPeople: number;
  updatedAt?: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  minTotal: number;
  maxTotal: number;
  status: boolean;
}
