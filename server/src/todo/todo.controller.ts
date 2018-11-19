import {
  Controller,
  Post,
  HttpStatus,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiBearerAuth,
  ApiImplicitParam,
} from '@nestjs/swagger';
import { Todo } from './models/todo.model';
import { TodoService } from 'todo.service';
import { TodoVm } from './models/view-models/todo-vm.model';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { TodoParams } from './models/view-models/todo-params.model';

import { map, isArray } from 'lodash';
import { TodoLevel } from './models/todo-level.enum';
import { ToBooleanPipe } from 'shared/pipes/to-boolean.pipe';
import { Roles } from 'shared/decorators/roles.decorator';
import { UserRole } from 'user/models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guard';

@Controller('todos')
// @ApiUseTags(Todo.modelName)
// @ApiBearerAuth()
export class TodoController {
  constructor(private readonly _todoService: TodoService) {}

  @Post()
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @ApiResponse({ status: HttpStatus.CREATED, type: TodoVm })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  // @ApiOperation(GetOperationId(Todo.modelName, 'Create'))
  async create(@Body() todoParams: TodoParams): Promise<TodoVm> {
    const { content, level } = todoParams;

    if (!content) {
      throw new HttpException(
        'Content of Todo is Required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const newTodo = await this._todoService.onCreateTodo(todoParams);
      return newTodo;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  // @ApiResponse({ status: HttpStatus.OK, type: TodoVm, isArray: true })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  // @ApiOperation(GetOperationId(Todo.modelName, 'Get'))
  // @ApiImplicitQuery({
  //   name: 'level',
  //   isArray: true,
  //   collectionFormat: 'multi',
  //   required: false,
  // })
  // @ApiImplicitQuery({ name: 'isCompleted', required: false })
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async get(
    @Query('level') level?: TodoLevel,
    @Query('isCompleted', new ToBooleanPipe()) isCompleted?: boolean,
  ): Promise<TodoVm[]> {
    let filter = {};

    if (level) {
      filter['level'] = { $in: isArray(level) ? [...level] : [level] };
    }

    if (isCompleted !== null) {
      if (filter['level']) {
        filter = {
          $and: [{ level: filter['level'] }, { isCompleted: isCompleted }],
        };
      } else {
        filter['isCompleted'] = isCompleted;
      }
    }

    try {
      const todos = await this._todoService.findAll(filter);
      return this._todoService.map<TodoVm[]>(
        map(todos, todo => todo.toJSON()),
        true,
      );
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiResponse({ status: HttpStatus.OK, type: TodoVm, isArray: false })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Todo.modelName, 'Update'))
  async update(@Body() todoParams: TodoParams): Promise<TodoVm> {
    const { content, level, isCompleted, id } = todoParams;

    const exist = await this._todoService.findById(id);

    if (!exist) {
      throw new HttpException(
        `${id} resource not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    exist.content = content;
    exist.level = level;
    exist.isCompleted = isCompleted;

    try {
      const updated = await this._todoService.update(exist.id, exist);

      return updated.toJSON() as TodoVm;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: TodoVm, isArray: false })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Todo.modelName, 'Delete'))
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiImplicitParam({ name: 'id' })
  @Roles(UserRole.Admin)
  async delete(@Param('id') id): Promise<TodoVm> {
    try {
      const item = await this._todoService.delete(id);
      return this._todoService.map<TodoVm>(item.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
