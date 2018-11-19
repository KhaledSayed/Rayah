import { LoginVM } from './login-vm.model';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

export class RegisterVM extends LoginVM {
  @ApiModelPropertyOptional()
  firstName?: string;
  @ApiModelPropertyOptional()
  lastName?: string;
  @ApiModelProperty({ example: 'admin@google.com' })
  email: string;
  @ApiModelProperty({ example: '123456' })
  password: string;
}
