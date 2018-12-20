import { BaseModelVm } from '../../../shared/base.model';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { EnumToArray } from '../../../shared/utilities/enum-to-array';

export class ProductVm extends BaseModelVm {
  @ApiModelProperty({ example: 'Chipsey' })
  name: string;

  @ApiModelProperty({ example: '#F03CLAN' })
  code: string;

  @ApiModelProperty({ example: 100 })
  quantity: number;

  @ApiModelProperty({ example: 2499 })
  price: number;

  @ApiModelProperty({ example: true })
  featured: boolean;

  @ApiModelProperty()
  thumbnail: string;

  @ApiModelProperty()
  gallery: string[];
}
