import { TodoLevel } from '../todo-level.enum';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { EnumToArray } from './../../../shared/utilities/enum-to-array';
import { BaseModelVm } from './../../../shared/base.model';

export class TodoParams extends BaseModelVm {
  @ApiModelProperty()
  content: string;
  @ApiModelPropertyOptional({
    enum: EnumToArray(TodoLevel),
    example: TodoLevel.Normal,
  })
  level?: TodoLevel;
  @ApiModelPropertyOptional()
  isCompleted?: boolean;
}
