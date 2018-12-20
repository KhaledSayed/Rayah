import { BaseModelVm } from '../../../shared/base.model';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CategoryParams extends BaseModelVm {
  @ApiModelProperty()
  name: string;
  @ApiModelPropertyOptional()
  description: string;

  @ApiModelProperty()
  parent: string;

  thumbnail: string;
}
