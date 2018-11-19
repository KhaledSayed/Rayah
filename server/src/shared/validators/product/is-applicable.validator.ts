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
export class CheckProductQuantity implements ValidatorConstraintInterface {
  constructor(
    @Inject('ProductService') private readonly _productService: ProductService,
  ) {
    // console.log(_couponService);
    // console.log(_productService);
  }

  async validate(value: any, args: ValidationArguments) {
    console.log('Validate Product Id');

    const [relatedPropertyName] = args.constraints;
    const id = (args.object as any)[relatedPropertyName];

    try {
      const product = await this._productService.findById(id);
      // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
      return product.quantity >= value;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export function IsApplicable(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isQuantityApplicable',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: CheckProductQuantity,
    });
  };
}
