import { BaseModel, schemaOptions } from '../../shared/base.model';
import { prop, ModelType } from 'typegoose';
import { CouponLevel } from './coupon-level.enum';
import * as moment from 'moment';

export class Coupon extends BaseModel<Coupon> {
  @prop({ enum: CouponLevel, default: CouponLevel.Fixed })
  type: CouponLevel;

  @prop({
    required: true,
    default: 0,
    min: this.type === CouponLevel.Percentage ? 1 : 10,
    max: this.type === CouponLevel.Percentage ? 100 : 1000,
  })
  value: number;

  @prop({ required: true, unique: true })
  code: string;

  @prop({ default: 1000 })
  numberOfPeople: number;

  @prop({ required: false, default: 0 })
  usedBy: number;

  @prop({ required: this.endDate != undefined ? true : false })
  startDate: Date;

  @prop({ required: this.startDate != undefined ? true : false })
  endDate: Date;

  @prop({ default: true })
  active: boolean;

  @prop({ required: true })
  minTotal: number;

  @prop({ required: true })
  maxTotal: number;

  @prop({})
  get status() {
    console.log(this.usedBy, this.numberOfPeople);
    return (
      moment(new Date().toISOString()).isSameOrBefore(moment(this.endDate)) &&
      this.usedBy + 1 <= this.numberOfPeople &&
      this.active
    );
  }

  static get model(): ModelType<Coupon> {
    return new Coupon().getModelForClass(Coupon, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
