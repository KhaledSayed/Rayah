import { BaseModelVm } from 'shared/base.model';
import { User } from 'user/models/user.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { OrderLevel } from '../order-level.enum';
import { Product } from 'product/models/product.model';
import { Coupon } from 'coupon/models/coupon.model';
import { ObjectId } from 'bson';

class ProductItem {
  product: ObjectId;
  quantity: number;
  price: number;
  totalItemPrice: number;
}

export class OrderVm extends BaseModelVm {
  @ApiModelProperty()
  user: ObjectId;

  @ApiModelProperty({ example: OrderLevel.Created })
  status: OrderLevel;

  @ApiModelProperty()
  basket: ProductItem[];

  @ApiModelProperty()
  coupon: ObjectId;

  @ApiModelProperty()
  address: string;
}
