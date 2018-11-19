import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CouponLevel } from 'coupon/models/coupon-level.enum';
import { Coupon } from 'coupon/models/coupon.model';
import { Typegoose, ModelType, InstanceType } from 'typegoose';
import { throws } from 'assert';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CouponService } from 'coupon/coupon.service';
import { Model } from 'mongoose';
import { CategoryService } from 'category/category.service';
import { ProductService } from 'product/product.service';
import * as moment from 'moment';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckCouponValidity implements ValidatorConstraintInterface {
  constructor(
    @Inject('CouponService') private readonly _couponService: CouponService,
  ) {
    // console.log(_couponService);
  }

  async validate(value: any, args: ValidationArguments) {
    // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }

    console.log(value);
    if (value === null) {
      return true;
    }

    const coupon = await this._couponService.findById(value);
    console.log(coupon);
    return coupon.status;
  }
}

export function IsCouponValid(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCouponValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: CheckCouponValidity,
    });
  };
}
