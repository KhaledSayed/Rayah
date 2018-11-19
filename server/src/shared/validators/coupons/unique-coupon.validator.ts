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

@ValidatorConstraint({ async: true })
@Injectable()
export class IsCouponUnique implements ValidatorConstraintInterface {
  constructor(
    @Inject('CouponService') private readonly _couponService: CouponService,
  ) {
    // console.log(_couponService);
  }
  async validate(value: any, args: ValidationArguments) {
    console.log('Validate Coupon Code');

    const coupon = await this._couponService.findOne({ code: value });
    // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
    return !coupon;
  }
}

export function IsUniqueCouponCode(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUniqueCouponCode',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsCouponUnique,
    });
  };
}
