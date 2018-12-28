import { BaseModelVm } from '../../../shared/base.model';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { EnumToArray } from '../../../shared/utilities/enum-to-array';
import { BrandVm } from 'brand/models/view-models/brand-vm.model';

export class Rating {
  @ApiModelProperty()
  rate: Number;

  @ApiModelProperty()
  length: Number;
}
export class ProductVm extends BaseModelVm {
  @ApiModelProperty({ example: 'Chipsey' })
  name: string;

  @ApiModelPropertyOptional()
  description: string;

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

  @ApiModelProperty({ required: true })
  rating: Rating;

  @ApiModelProperty()
  brand: BrandVm;
}
