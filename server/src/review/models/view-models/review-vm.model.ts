import { BaseModelVm } from '../../../shared/base.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { User } from '../../../user/models/user.model';
import { Product } from '../../../product/models/product.model';
import { UserVM } from 'user/models/view-models/user-vm.model';

export class ReviewVm extends BaseModelVm {
  @ApiModelProperty()
  reviewer: Partial<UserVM>;

  @ApiModelProperty()
  product: string;

  @ApiModelProperty()
  stars: number;

  @ApiModelPropertyOptional()
  description: string;
}
