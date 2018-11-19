import { BaseModelVm } from 'shared/base.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginVM extends BaseModelVm {
  @ApiModelProperty({ required: true, minLength: 6 })
  email: string;

  @ApiModelProperty({
    required: true,
    minLength: 6,
    type: String,
    format: 'password',
  })
  password: string;
}
