import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Product } from 'product/models/product.model';
import { Coupon } from 'coupon/models/coupon.model';
import {
  IsDefined,
  IsPositive,
  IsNumber,
  IsArray,
  IsMongoId,
  MinLength,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { isObject } from 'typegoose/lib/utils';
import { IsOrderValid } from 'shared/validators/orders/valid-order.validator';
import { IsProductValid } from 'shared/validators/product/valid-product.validator';
import { IsApplicable } from 'shared/validators/product/is-applicable.validator';
import { IsCouponValid } from 'shared/validators/orders/valid-coupon.validator';
import { isNullOrUndefined } from 'util';
import { BaseModelVm } from 'shared/base.model';
import { OrderLevel } from '../order-level.enum';

class OrderedProduct {
  @IsDefined()
  @IsMongoId()
  @IsProductValid({ message: 'Product is Invalid' })
  id: string;

  @IsDefined()
  @IsPositive()
  @IsNumber()
  quantity: number;
}

export class OrderPutParams extends BaseModelVm {
  @ApiModelProperty()
  @IsDefined()
  @IsArray()
  @ArrayMinSize(1, { message: 'Basket is empty' })
  basket: OrderedProduct[];

  @ApiModelProperty()
  @IsDefined()
  address: string;

  @ApiModelProperty()
  status: OrderLevel;

  @ApiModelPropertyOptional()
  note: string;
}
