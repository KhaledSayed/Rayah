import { ApiModelProperty } from '@nestjs/swagger';

export class FcmParam {
  @ApiModelProperty({
    required: true,
    example: 'bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...',
  })
  token: string;
}
