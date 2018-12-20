import { BaseModelVm } from '../../../shared/base.model';
import { ApiModelProperty } from '@nestjs/swagger';

export class BrandVm extends BaseModelVm {
  @ApiModelProperty({ example: 'Juhayna' })
  name: string;

  @ApiModelProperty({
    example: 'uploads/ace74ed1934c5ed010332a68e4d23eb78.png',
  })
  logo: string;
}
