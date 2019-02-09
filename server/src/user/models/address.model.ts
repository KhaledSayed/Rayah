import { ApiModelProperty } from '@nestjs/swagger';

class AddressVm {
  @ApiModelProperty()
  address: string;
}
