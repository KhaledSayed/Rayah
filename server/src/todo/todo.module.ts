import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo } from './models/todo.model';
import { TodoService } from './../todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Todo.modelName,
        schema: Todo.model.schema,
      },
    ]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
