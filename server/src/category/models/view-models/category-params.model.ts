import { BaseModelVm } from 'shared/base.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Category } from '../category.model';

export class CategoryParams extends BaseModelVm {
  @ApiModelProperty()
  name: string;
  @ApiModelPropertyOptional()
  description: string;

  @ApiModelProperty()
  parent: string;

  thumbnail: string;
}
