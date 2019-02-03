import { BaseModelVm } from '../../../shared/base.model';
import { User } from '../../../user/models/user.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { OrderLevel } from '../order-level.enum';
import { Product } from '../../../product/models/product.model';
import { Coupon } from '../../../coupon/models/coupon.model';
import { ObjectId } from 'bson';
import { ProductVm } from '../../../product/models/view-models/product-vm.model';

export class GiftVm {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  class: string;

  @ApiModelProperty()
  school: string;

  avatar: string;
}
