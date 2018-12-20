import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { CouponLevel } from '../coupon-level.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  Length,
  IsDate,
  IsBoolean,
  IsDateString,
  IsDefined,
} from 'class-validator';
import { IsBefore } from '../../../shared/validators/coupons/time-validators';
import { IsPercentage } from '../../../shared/validators/coupons/percentage.validators';
import { IsUniqueCouponCode } from '../../../shared/validators/coupons/unique-coupon.validator';
import { BetweenMinAndMaximum } from '../../../shared/validators/coupons/min-max.validator';

export class CouponParams {
  @ApiModelProperty({ example: CouponLevel.Fixed })
  @IsEnum(CouponLevel)
  @IsDefined()
  type: CouponLevel;

  @ApiModelProperty({ example: 100 })
  @IsNumber()
  @IsPercentage('type', {
    message: 'value must be between (1-99)%',
  })
  @IsDefined()
  value: number;

  @ApiModelProperty({ example: 'Oct200' })
  @IsString()
  @Length(4, 22222222222)
  @IsDefined()
  @IsUniqueCouponCode({
    message: 'code:$value is reserved',
  })
  code: string;

  @ApiModelPropertyOptional()
  @IsNumber()
  numberOfPeople?: number;

  @ApiModelProperty()
  @IsDateString()
  @IsBefore('endDate', {
    message: "startDate can't be the same or more than endDate",
  })
  @IsDefined()
  startDate?: Date;

  @ApiModelProperty()
  @IsDateString()
  @IsDefined()
  endDate?: Date;

  @ApiModelProperty()
  @IsNumber()
  @BetweenMinAndMaximum('maxTotal', 'sm')
  minTotal: number;

  @ApiModelProperty()
  @IsNumber()
  @BetweenMinAndMaximum('maxTotal', 'sm')
  maxTotal: number;

  @ApiModelPropertyOptional()
  @IsBoolean()
  active?: boolean;
}
