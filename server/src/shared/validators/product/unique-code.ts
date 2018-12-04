import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CouponLevel } from 'coupon/models/coupon-level.enum';
import { Typegoose, ModelType, InstanceType } from 'typegoose';
import { throws } from 'assert';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductService } from 'product/product.service';
import { CouponService } from 'coupon/coupon.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsProductUnique implements ValidatorConstraintInterface {
  constructor(
    @Inject('ProductService') private readonly _productService: ProductService,
  ) {
    // console.log(_couponService);
    // console.log(_productService);
  }

  async validate(value: any, args: ValidationArguments) {
    console.log('Validate Product Code');

    try {
      const product = await this._productService.findOne({ code: value });
      // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
      console.log('Code Product', product);
      return !product;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export function isUniqueProductCode(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUniqueProductCode',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsProductUnique,
    });
  };
}
