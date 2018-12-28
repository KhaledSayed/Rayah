import { LoginVM } from './login-vm.model';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class RegisterParams extends LoginVM {
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  // @Length({ min: 11, max: 11 })
  phone?: string;
  @ApiModelProperty({ example: 'admin@google.com' })
  email: string;
  @ApiModelProperty({ example: '123456' })
  password: string;

  role: string;
}
