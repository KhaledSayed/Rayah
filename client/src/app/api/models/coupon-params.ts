/* tslint:disable */
export interface CouponParams {
  type: string;
  value: number;
  code: string;
  numberOfPeople?: number;
  startDate: Date;
  endDate: Date;
  minTotal: number;
  maxTotal: number;
  active?: boolean;
}
