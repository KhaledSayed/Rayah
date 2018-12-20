import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CouponLevel } from '../../../coupon/models/coupon-level.enum';
import { Coupon } from '../../../coupon/models/coupon.model';
import { Typegoose, ModelType, InstanceType } from 'typegoose';
import { throws } from 'assert';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CouponService } from '../../../coupon/coupon.service';
import { Model } from 'mongoose';
import { CategoryService } from '../../../category/category.service';
import { ProductService } from '../../../product/product.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckOrderValidation implements ValidatorConstraintInterface {
  constructor(
    @Inject('ProductService') private readonly _productService: ProductService,
  ) {
    // console.log(_couponService);
  }
  async validate(productItems: any, args: ValidationArguments) {
    // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
    let valid: boolean = true;

    for (let i = 0; i < productItems.length; i++) {
      const productItem = productItems[i];

      const product = await this._productService.findById(productItem.id);

      if (!product) {
        valid = false;
        break;
      }
    }

    return true ? true : false;
  }
}

export function IsOrderValid(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCategoryExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: CheckOrderValidation,
    });
  };
}
