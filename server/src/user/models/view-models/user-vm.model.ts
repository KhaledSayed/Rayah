import { BaseModelVm } from '../../../shared/base.model';
import { UserRole } from '../user-role.enum';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { EnumToArray } from '../../../shared/utilities/enum-to-array';

export class UserVM extends BaseModelVm {
  @ApiModelProperty()
  email: string;
  @ApiModelPropertyOptional()
  name?: string;
  @ApiModelPropertyOptional()
  phone?: string;
  @ApiModelPropertyOptional({ enum: EnumToArray(UserRole) })
  role?: UserRole;
}
