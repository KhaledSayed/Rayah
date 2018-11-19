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
import { SliderLevel } from 'slider/models/slider-level.enum';
import { Slider } from 'slider/models/slider.model';
import { CategoryService } from 'category/category.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class CheckItemValidity implements ValidatorConstraintInterface {
  constructor(
    @Inject('ProductService') private readonly _productService: ProductService,
    @Inject('CategoryService')
    private readonly _categoryService: CategoryService,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    console.log('Validate Slider Item');

    const [relatedPropertyName] = args.constraints;
    const sliderLevel: SliderLevel = (args.object as any)[relatedPropertyName];

    let item = null;
    if (SliderLevel.Category === sliderLevel) {
      //category
      item = await this._categoryService.findById(value);
    } else {
      //product
      item = await this._productService.findById(value);
    }

    return item;
  }
}

export function isItem(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isItem',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: CheckItemValidity,
    });
  };
}
