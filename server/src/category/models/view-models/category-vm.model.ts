import { BaseModelVm } from 'shared/base.model';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { EnumToArray } from 'shared/utilities/enum-to-array';

export class CategoryVm extends BaseModelVm {
  @ApiModelProperty()
  name: string;
  @ApiModelPropertyOptional()
  description: string;

  @ApiModelProperty()
  parent: string;

  @ApiModelProperty()
  thumbnail: string;
}
