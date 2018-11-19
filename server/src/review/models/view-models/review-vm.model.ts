import { BaseModelVm } from 'shared/base.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { User } from 'user/models/user.model';
import { Product } from 'product/models/product.model';

export class ReviewVm extends BaseModelVm {
  @ApiModelProperty()
  reviewer: User;

  @ApiModelProperty()
  product: Product;

  @ApiModelProperty()
  stars: number;

  @ApiModelPropertyOptional()
  description: string;
}
