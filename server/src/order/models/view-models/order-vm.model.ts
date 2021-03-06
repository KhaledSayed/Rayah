import { BaseModelVm } from '../../../shared/base.model';
import { User } from '../../../user/models/user.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { OrderLevel } from '../order-level.enum';
import { Product } from '../../../product/models/product.model';
import { Coupon } from '../../../coupon/models/coupon.model';
import { ObjectId } from 'bson';
import { ProductVm } from '../../../product/models/view-models/product-vm.model';
import { GiftVm } from './gift-params.vm';

// class ProductItem {
//   product: ProductVm;
//   quantity: number;
//   price: number;
//   totalItemPrice: number;
// }

export class OrderVm extends BaseModelVm {
  @ApiModelProperty()
  user: ObjectId;

  @ApiModelProperty({
    example: OrderLevel.New,
  })
  status: OrderLevel;

  @ApiModelProperty()
  basket: any;

  @ApiModelProperty()
  coupon: ObjectId;

  @ApiModelProperty()
  address: string;

  @ApiModelPropertyOptional()
  gift: GiftVm;
}
