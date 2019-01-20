"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const todo_controller_1 = require("./todo.controller");
const mongoose_1 = require("@nestjs/mongoose");
const todo_model_1 = require("./models/todo.model");
const todo_service_1 = require("./../todo.service");
let TodoModule = class TodoModule {
};
TodoModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: todo_model_1.Todo.modelName,
                    schema: todo_model_1.Todo.model.schema,
                },
            ]),
        ],
        controllers: [todo_controller_1.TodoController],
        providers: [todo_service_1.TodoService],
    })
], TodoModule);
exports.TodoModule = TodoModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy90b2RvL3RvZG8ubW9kdWxlLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3RvZG8vdG9kby5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsdURBQW1EO0FBQ25ELCtDQUFrRDtBQUNsRCxvREFBMkM7QUFDM0Msb0RBQWdEO0FBY2hELElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7Q0FBRyxDQUFBO0FBQWIsVUFBVTtJQVp0QixlQUFNLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDUCx5QkFBYyxDQUFDLFVBQVUsQ0FBQztnQkFDeEI7b0JBQ0UsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUztvQkFDcEIsTUFBTSxFQUFFLGlCQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07aUJBQzFCO2FBQ0YsQ0FBQztTQUNIO1FBQ0QsV0FBVyxFQUFFLENBQUMsZ0NBQWMsQ0FBQztRQUM3QixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO0tBQ3pCLENBQUM7R0FDVyxVQUFVLENBQUc7QUFBYixnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFRvZG9Db250cm9sbGVyIH0gZnJvbSAnLi90b2RvLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgTW9uZ29vc2VNb2R1bGUgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IFRvZG8gfSBmcm9tICcuL21vZGVscy90b2RvLm1vZGVsJztcbmltcG9ydCB7IFRvZG9TZXJ2aWNlIH0gZnJvbSAnLi8uLi90b2RvLnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE1vbmdvb3NlTW9kdWxlLmZvckZlYXR1cmUoW1xuICAgICAge1xuICAgICAgICBuYW1lOiBUb2RvLm1vZGVsTmFtZSxcbiAgICAgICAgc2NoZW1hOiBUb2RvLm1vZGVsLnNjaGVtYSxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG4gIGNvbnRyb2xsZXJzOiBbVG9kb0NvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtUb2RvU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIFRvZG9Nb2R1bGUge31cbiJdfQ==