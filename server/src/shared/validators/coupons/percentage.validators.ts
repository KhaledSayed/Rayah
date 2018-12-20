import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { CouponLevel } from '../../../coupon/models/coupon-level.enum';

export function IsPercentage(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPercentage',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (relatedValue === CouponLevel.Percentage) {
            return value > 0 && value <= 100; // you can return a Promise<boolean> here as well, if you want to make async validation
          } else {
            return true;
          }
        },
      },
    });
  };
}
