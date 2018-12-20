import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from './shared/base.service';
import { Todo } from './todo/models/todo.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from './shared/mapper/mapper.service';
import { TodoParams } from './todo/models/view-models/todo-params.model';
import { TodoVm } from './todo/models/view-models/todo-vm.model';

@Injectable()
export class TodoService extends BaseService<Todo> {
  constructor(
    @InjectModel(Todo.modelName) private readonly _todoModel: ModelType<Todo>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._model = _todoModel;
    this._mapper = _mapperService.mapper;
  }

  async onCreateTodo(todoParams: TodoParams): Promise<TodoVm> {
    const { content, level } = todoParams;

    const newTodo = new this._model();

    newTodo.content = content;

    if (level) {
      newTodo.level = level;
    }

    try {
      const result = await this.create(newTodo);
      const TodoVm = await this.map<TodoVm>(result.toJSON());

      return TodoVm;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
