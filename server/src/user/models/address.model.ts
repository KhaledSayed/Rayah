import { ApiModelProperty } from '@nestjs/swagger';

export class AddressVm {
  @ApiModelProperty()
  address: string;
}
