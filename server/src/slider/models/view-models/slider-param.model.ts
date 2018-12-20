import { ApiModelProperty } from '@nestjs/swagger';
import { SliderLevel } from '../slider-level.enum';
import { Slider } from '../slider.model';
import { Category } from '../../../category/models/category.model';
import { Product } from '../../../product/models/product.model';
import { IsEnum, IsString, IsDefined } from 'class-validator';
import { isItem } from '../../../shared/validators/slider/is-item.validator';
import { type } from 'os';

export class SliderParams {
  @ApiModelProperty({ example: SliderLevel.Category })
  @IsEnum(SliderLevel)
  @IsDefined()
  type: SliderLevel;

  @ApiModelProperty()
  @IsString()
  @isItem('type', {
    message: 'Not Valid Item',
  })
  @IsDefined()
  item: string;

  banner: string;
}
