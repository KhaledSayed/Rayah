import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Product } from '../../../product/models/product.model';

export class ReviewParam {
  @ApiModelProperty()
  stars: number;

  @ApiModelPropertyOptional()
  description?: string;
}
