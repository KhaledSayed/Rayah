import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Category } from '../../../category/models/category.model';
import {
  IsString,
  IsDefined,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
import {
  IsProductUnique,
  isUniqueProductCode,
} from '../../../shared/validators/product/unique-code';
import { IsCategoryExists } from '../../../shared/validators/category/category-exists.validator';

export class ProductParams {
  @ApiModelProperty({ example: 'Chipsey' })
  @IsString()
  @IsDefined()
  name: string;

  @ApiModelProperty({ example: '#F03CLAN' })
  @IsDefined()
  @IsString()
  @isUniqueProductCode()
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
}
