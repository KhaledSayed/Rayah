import { BaseModelVm } from 'shared/base.model';
import { ApiModelProperty } from '@nestjs/swagger';
import { CouponLevel } from '../coupon-level.enum';

export class CouponVm extends BaseModelVm {
  @ApiModelProperty({ example: CouponLevel.Percentage })
  type: string;

  @ApiModelProperty({ example: null })
  value: number;

  @ApiModelProperty({ example: 'OCT200' })
  code: string;

  @ApiModelProperty()
  numberOfPeople: number;

  @ApiModelProperty()
  usedBy: number;

  @ApiModelProperty()
  startDate: Date;

  @ApiModelProperty()
  endDate: Date;

  @ApiModelProperty()
  active: boolean;

  @ApiModelProperty()
  minTotal: number;

  @ApiModelProperty()
  maxTotal: number;

  @ApiModelProperty()
  status: boolean;
}
