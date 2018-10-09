import { BaseModelVm } from 'shared/base.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginVM extends BaseModelVm {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
}
