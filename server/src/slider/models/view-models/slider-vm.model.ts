import { BaseModelVm } from 'shared/base.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { Category } from 'category/models/category.model';
import { Product } from 'product/models/product.model';
import { SliderLevel } from '../slider-level.enum';
import { IsMongoId } from 'class-validator';

export class SliderVm extends BaseModelVm {
  @ApiModelProperty({ example: SliderLevel.Category })
  type: SliderLevel;

  @ApiModelProperty()
  item: string;

  @ApiModelProperty()
  banner: string;
}
