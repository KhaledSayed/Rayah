import { BaseModelVm } from './../../../shared/base.model';
import { TodoLevel } from '../todo-level.enum';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { EnumToArray } from './../../../shared/utilities/enum-to-array';

export class TodoVm extends BaseModelVm {
  @ApiModelProperty()
  content: string;
  @ApiModelPropertyOptional({
    enum: EnumToArray(TodoLevel),
    example: TodoLevel.Normal,
  })
  level: TodoLevel;

  @ApiModelProperty()
  isCompleted: boolean;
}
