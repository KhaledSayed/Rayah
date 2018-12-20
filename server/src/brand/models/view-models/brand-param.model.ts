import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.model';

export class BrandParam extends BaseModelVm {
  @ApiModelProperty({ example: 'Juhayna', type: String, in: 'FormData' })
  name: string;

  logo: string;
}
