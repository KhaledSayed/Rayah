import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class ApiException {
  @ApiModelPropertyOptional({ example: 401 })
  statusCode?: number;
  @ApiModelPropertyOptional({
    example: "You don't have permission to access this resource",
  })
  message?: string;
  @ApiModelPropertyOptional()
  status?: string;

  @ApiModelPropertyOptional({ example: 'Error' })
  error?: string;

  @ApiModelPropertyOptional({ example: null })
  errors?: any;

  @ApiModelPropertyOptional({ example: '2018-10-31T13:13:22.802Z' })
  timestamp?: string;

  @ApiModelPropertyOptional({ example: '/api/brand' })
  path?: string;
}
