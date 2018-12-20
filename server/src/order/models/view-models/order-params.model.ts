import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Product } from '../../../product/models/product.model';
import { Coupon } from '../../../coupon/models/coupon.model';
import {
  IsDefined,
  IsPositive,
  IsNumber,
  IsArray,
  IsMongoId,
  MinLength,
  ArrayMinSize,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { isObject } from 'typegoose/lib/utils';
import { IsOrderValid } from '../../../shared/validators/orders/valid-order.validator';
import { IsProductValid } from '../../../shared/validators/product/valid-product.validator';
import { IsApplicable } from '../../../shared/validators/product/is-applicable.validator';
import { IsCouponValid } from '../../../shared/validators/orders/valid-coupon.validator';
import { isNullOrUndefined } from 'util';
import { BaseModelVm } from '../../../shared/base.model';
import { OrderLevel } from '../order-level.enum';

class OrderedProduct {
  @IsDefined()
  @IsMongoId()
  @ApiModelProperty()
  @IsProductValid({ message: 'Product is Invalid' })
  id: string;

  @IsDefined()
  @IsPositive()
  @IsNumber()
  // @IsApplicable('id')
  @ApiModelProperty()
  quantity: number;
}

export class OrderParam extends BaseModelVm {
  @ApiModelProperty({ type: OrderedProduct, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1, { message: 'Basket is empty' })
  basket?: OrderedProduct[];

  @ApiModelProperty()
  @IsCouponValid({ message: "Coupon isn't valid" })
  coupon?: string;

  @ApiModelProperty()
  @IsDefined()
  address: string;

  status: OrderLevel;

  user: string;

  note: string;
}
