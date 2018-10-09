import { LoginVM } from './login-vm.model';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class RegisterVM extends LoginVM {
  @ApiModelPropertyOptional()
  firstName?: string;
  @ApiModelPropertyOptional()
  lastName?: string;
}
