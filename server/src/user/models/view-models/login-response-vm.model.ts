import { UserVM } from './user-vm.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResponseVM {
  @ApiModelProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGNsYW4uY29tIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE1NDMxMDAxNzMsImV4cCI6MTU0MzE0MzM3M30.q9HFCQqIKUwCuO2X106VlAUsUkrpnCDFq_FSBk3lIS8',
  })
  token: string;
  @ApiModelProperty()
  user: UserVM;
}
