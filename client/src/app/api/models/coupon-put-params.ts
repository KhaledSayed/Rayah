/* tslint:disable */
export interface CouponPutParams {
  numberOfPeople?: number;
  createdAt?: string;
  id?: string;
  type: string;
  value: number;
  code: string;
  updatedAt?: string;
  startDate: Date;
  endDate: Date;
  minTotal: number;
  maxTotal: number;
  active?: boolean;
}
