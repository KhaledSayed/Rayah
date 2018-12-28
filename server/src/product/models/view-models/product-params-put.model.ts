import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Category } from '../../../category/models/category.model';
import {
  IsString,
  IsDefined,
  IsNumber,
  IsPositive,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import {
  IsProductUnique,
  isUniqueProductCode,
} from '../../../shared/validators/product/unique-code';
import { IsCategoryExists } from '../../../shared/validators/category/category-exists.validator';
import { BaseModelVm } from '../../../shared/base.model';

export class ProductParamsPut {
  @ApiModelProperty({ example: 'Chipsey' })
  @IsString()
  @IsDefined()
  name: string;

  @ApiModelPropertyOptional()
  @IsString()
  description: string;

  @ApiModelProperty({ example: '#F03CLAN' })
  @IsDefined()
  @IsString()
  code: string;

  @ApiModelProperty({ example: 100 })
  @IsDefined()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiModelProperty({ example: 2499 })
  @IsDefined()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiModelPropertyOptional({ example: true })
  @IsOptional()
  featured: boolean;

  @ApiModelProperty({ example: '5be2d3bb3f06152dc1804cdd' })
  @IsDefined()
  @IsCategoryExists()
  category: string;

  @IsDefined()
  @IsMongoId()
  brand: string;
}
