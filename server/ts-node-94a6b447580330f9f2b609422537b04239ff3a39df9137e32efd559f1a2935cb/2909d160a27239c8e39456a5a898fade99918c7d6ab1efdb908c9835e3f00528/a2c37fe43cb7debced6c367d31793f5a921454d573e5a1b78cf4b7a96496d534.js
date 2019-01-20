"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const todo_model_1 = require("./models/todo.model");
const todo_service_1 = require("../todo.service");
const todo_vm_model_1 = require("./models/view-models/todo-vm.model");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const todo_params_model_1 = require("./models/view-models/todo-params.model");
const lodash_1 = require("lodash");
const todo_level_enum_1 = require("./models/todo-level.enum");
const to_boolean_pipe_1 = require("../shared/pipes/to-boolean.pipe");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const user_role_enum_1 = require("../user/models/user-role.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
let TodoController = class TodoController {
    constructor(_todoService) {
        this._todoService = _todoService;
    }
    create(todoParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, level } = todoParams;
            if (!content) {
                throw new common_1.HttpException('Content of Todo is Required', common_1.HttpStatus.BAD_REQUEST);
            }
            try {
                const newTodo = yield this._todoService.onCreateTodo(todoParams);
                return newTodo;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    get(level, isCompleted) {
        return __awaiter(this, void 0, void 0, function* () {
            let filter = {};
            if (level) {
                filter['level'] = { $in: lodash_1.isArray(level) ? [...level] : [level] };
            }
            if (isCompleted !== null) {
                if (filter['level']) {
                    filter = {
                        $and: [{ level: filter['level'] }, { isCompleted: isCompleted }],
                    };
                }
                else {
                    filter['isCompleted'] = isCompleted;
                }
            }
            try {
                const todos = yield this._todoService.findAll(filter);
                return this._todoService.map(lodash_1.map(todos, todo => todo.toJSON()), true);
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    update(todoParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, level, isCompleted, id } = todoParams;
            const exist = yield this._todoService.findById(id);
            if (!exist) {
                throw new common_1.HttpException(`${id} resource not exist`, common_1.HttpStatus.BAD_REQUEST);
            }
            exist.content = content;
            exist.level = level;
            exist.isCompleted = isCompleted;
            try {
                const updated = yield this._todoService.update(exist.id, exist);
                return updated.toJSON();
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this._todoService.delete(id);
                return this._todoService.map(item.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_params_model_1.TodoParams]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "create", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: todo_vm_model_1.TodoVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(todo_model_1.Todo.modelName, 'Get')),
    swagger_1.ApiImplicitQuery({
        name: 'level',
        isArray: true,
        collectionFormat: 'multi',
        required: false,
    }),
    swagger_1.ApiImplicitQuery({ name: 'isCompleted', required: false }),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.User),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Query('level')),
    __param(1, common_1.Query('isCompleted', new to_boolean_pipe_1.ToBooleanPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "get", null);
__decorate([
    common_1.Put(),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.User),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: todo_vm_model_1.TodoVm, isArray: false }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(todo_model_1.Todo.modelName, 'Update')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_params_model_1.TodoParams]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: todo_vm_model_1.TodoVm, isArray: false }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(todo_model_1.Todo.modelName, 'Delete')),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "delete", null);
TodoController = __decorate([
    common_1.Controller('todos'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy90b2RvL3RvZG8uY29udHJvbGxlci50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy90b2RvL3RvZG8uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBWXdCO0FBQ3hCLDZDQU95QjtBQUN6QixvREFBMkM7QUFDM0Msa0RBQThDO0FBQzlDLHNFQUE0RDtBQUM1RCx1RUFBNkQ7QUFDN0QsMkVBQXNFO0FBQ3RFLDhFQUFvRTtBQUVwRSxtQ0FBc0M7QUFDdEMsOERBQXFEO0FBQ3JELHFFQUFnRTtBQUNoRSwwRUFBNkQ7QUFDN0Qsa0VBQXlEO0FBQ3pELCtDQUE2QztBQUM3Qyw4REFBMEQ7QUFLMUQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUN6QixZQUE2QixZQUF5QjtRQUF6QixpQkFBWSxHQUFaLFlBQVksQ0FBYTtJQUFHLENBQUM7SUFRcEQsTUFBTSxDQUFTLFVBQXNCOztZQUN6QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUV0QyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE1BQU0sSUFBSSxzQkFBYSxDQUNyQiw2QkFBNkIsRUFDN0IsbUJBQVUsQ0FBQyxXQUFXLENBQ3ZCLENBQUM7YUFDSDtZQUVELElBQUk7Z0JBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDakUsT0FBTyxPQUFPLENBQUM7YUFDaEI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLElBQUksc0JBQWEsQ0FBQyxDQUFDLEVBQUUsbUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQztLQUFBO0lBZUssR0FBRyxDQUNTLEtBQWlCLEVBQ1UsV0FBcUI7O1lBRWhFLElBQUksTUFBTSxH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LHNCQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3BFLHFCQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLGtDQUFZLEVBQUUsQ0FBQztJQUNuRSxzQkFBWSxDQUFDLGlDQUFjLENBQUMsaUJBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDekMsV0FBQSxhQUFJLEVBQUUsQ0FBQTs7cUNBQWEsOEJBQVU7OzRDQXVCMUM7QUFTRDtJQVBDLGVBQU0sQ0FBQyxLQUFLLENBQUM7SUFDYixxQkFBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLG1CQUFVLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxzQkFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNwRSxxQkFBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLG1CQUFVLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxrQ0FBWSxFQUFFLENBQUM7SUFDbkUsc0JBQVksQ0FBQyxpQ0FBYyxDQUFDLGlCQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELGtCQUFTLENBQUMsb0JBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSx3QkFBVSxDQUFDO0lBQ3ZDLDBCQUFnQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2hDLHVCQUFLLENBQUMseUJBQVEsQ0FBQyxLQUFLLENBQUM7SUFDUixXQUFBLGNBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTs7Ozs0Q0FPeEI7QUFwSFUsY0FBYztJQUgxQixtQkFBVSxDQUFDLE9BQU8sQ0FBQztxQ0FJeUIsMEJBQVc7R0FEM0MsY0FBYyxDQXFIMUI7QUFySFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb250cm9sbGVyLFxuICBQb3N0LFxuICBIdHRwU3RhdHVzLFxuICBHZXQsXG4gIFB1dCxcbiAgRGVsZXRlLFxuICBQYXJhbSxcbiAgQm9keSxcbiAgSHR0cEV4Y2VwdGlvbixcbiAgUXVlcnksXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXBpVXNlVGFncyxcbiAgQXBpUmVzcG9uc2UsXG4gIEFwaU9wZXJhdGlvbixcbiAgQXBpSW1wbGljaXRRdWVyeSxcbiAgQXBpQmVhcmVyQXV0aCxcbiAgQXBpSW1wbGljaXRQYXJhbSxcbn0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IFRvZG8gfSBmcm9tICcuL21vZGVscy90b2RvLm1vZGVsJztcbmltcG9ydCB7IFRvZG9TZXJ2aWNlIH0gZnJvbSAnLi4vdG9kby5zZXJ2aWNlJztcbmltcG9ydCB7IFRvZG9WbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3RvZG8tdm0ubW9kZWwnO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2FwaS1leGNlcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgR2V0T3BlcmF0aW9uSWQgfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2dldC1vcGVyYXRpb24taWQnO1xuaW1wb3J0IHsgVG9kb1BhcmFtcyB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3RvZG8tcGFyYW1zLm1vZGVsJztcblxuaW1wb3J0IHsgbWFwLCBpc0FycmF5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFRvZG9MZXZlbCB9IGZyb20gJy4vbW9kZWxzL3RvZG8tbGV2ZWwuZW51bSc7XG5pbXBvcnQgeyBUb0Jvb2xlYW5QaXBlIH0gZnJvbSAnLi4vc2hhcmVkL3BpcGVzL3RvLWJvb2xlYW4ucGlwZSc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3NoYXJlZC9kZWNvcmF0b3JzL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4uL3VzZXIvbW9kZWxzL3VzZXItcm9sZS5lbnVtJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL3NoYXJlZC9ndWFyZHMvcm9sZXMuZ3VhcmQnO1xuXG5AQ29udHJvbGxlcigndG9kb3MnKVxuLy8gQEFwaVVzZVRhZ3MoVG9kby5tb2RlbE5hbWUpXG4vLyBAQXBpQmVhcmVyQXV0aCgpXG5leHBvcnQgY2xhc3MgVG9kb0NvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IF90b2RvU2VydmljZTogVG9kb1NlcnZpY2UpIHt9XG5cbiAgQFBvc3QoKVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4pXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgLy8gQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkNSRUFURUQsIHR5cGU6IFRvZG9WbSB9KVxuICAvLyBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICAvLyBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKFRvZG8ubW9kZWxOYW1lLCAnQ3JlYXRlJykpXG4gIGFzeW5jIGNyZWF0ZShAQm9keSgpIHRvZG9QYXJhbXM6IFRvZG9QYXJhbXMpOiBQcm9taXNlPFRvZG9WbT4ge1xuICAgIGNvbnN0IHsgY29udGVudCwgbGV2ZWwgfSA9IHRvZG9QYXJhbXM7XG5cbiAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxuICAgICAgICAnQ29udGVudCBvZiBUb2RvIGlzIFJlcXVpcmVkJyxcbiAgICAgICAgSHR0cFN0YXR1cy5CQURfUkVRVUVTVCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG5ld1RvZG8gPSBhd2FpdCB0aGlzLl90b2RvU2VydmljZS5vbkNyZWF0ZVRvZG8odG9kb1BhcmFtcyk7XG4gICAgICByZXR1cm4gbmV3VG9kbztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQEdldCgpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogVG9kb1ZtLCBpc0FycmF5OiB0cnVlIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoVG9kby5tb2RlbE5hbWUsICdHZXQnKSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoe1xuICAgIG5hbWU6ICdsZXZlbCcsXG4gICAgaXNBcnJheTogdHJ1ZSxcbiAgICBjb2xsZWN0aW9uRm9ybWF0OiAnbXVsdGknLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgfSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoeyBuYW1lOiAnaXNDb21wbGV0ZWQnLCByZXF1aXJlZDogZmFsc2UgfSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluLCBVc2VyUm9sZS5Vc2VyKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIGdldChcbiAgICBAUXVlcnkoJ2xldmVsJykgbGV2ZWw/OiBUb2RvTGV2ZWwsXG4gICAgQFF1ZXJ5KCdpc0NvbXBsZXRlZCcsIG5ldyBUb0Jvb2xlYW5QaXBlKCkpIGlzQ29tcGxldGVkPzogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxUb2RvVm1bXT4ge1xuICAgIGxldCBmaWx0ZXIgPSB7fTtcblxuICAgIGlmIChsZXZlbCkge1xuICAgICAgZmlsdGVyWydsZXZlbCddID0geyAkaW46IGlzQXJyYXkobGV2ZWwpID8gWy4uLmxldmVsXSA6IFtsZXZlbF0gfTtcbiAgICB9XG5cbiAgICBpZiAoaXNDb21wbGV0ZWQgIT09IG51bGwpIHtcbiAgICAgIGlmIChmaWx0ZXJbJ2xldmVsJ10pIHtcbiAgICAgICAgZmlsdGVyID0ge1xuICAgICAgICAgICRhbmQ6IFt7IGxldmVsOiBmaWx0ZXJbJ2xldmVsJ10gfSwgeyBpc0NvbXBsZXRlZDogaXNDb21wbGV0ZWQgfV0sXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaWx0ZXJbJ2lzQ29tcGxldGVkJ10gPSBpc0NvbXBsZXRlZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9kb3MgPSBhd2FpdCB0aGlzLl90b2RvU2VydmljZS5maW5kQWxsKGZpbHRlcik7XG4gICAgICByZXR1cm4gdGhpcy5fdG9kb1NlcnZpY2UubWFwPFRvZG9WbVtdPihcbiAgICAgICAgbWFwKHRvZG9zLCB0b2RvID0+IHRvZG8udG9KU09OKCkpLFxuICAgICAgICB0cnVlLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQFB1dCgpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbiwgVXNlclJvbGUuVXNlcilcbiAgQFVzZUd1YXJkcyhBdXRoR3VhcmQoJ2p3dCcpLCBSb2xlc0d1YXJkKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuT0ssIHR5cGU6IFRvZG9WbSwgaXNBcnJheTogZmFsc2UgfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChUb2RvLm1vZGVsTmFtZSwgJ1VwZGF0ZScpKVxuICBhc3luYyB1cGRhdGUoQEJvZHkoKSB0b2RvUGFyYW1zOiBUb2RvUGFyYW1zKTogUHJvbWlzZTxUb2RvVm0+IHtcbiAgICBjb25zdCB7IGNvbnRlbnQsIGxldmVsLCBpc0NvbXBsZXRlZCwgaWQgfSA9IHRvZG9QYXJhbXM7XG5cbiAgICBjb25zdCBleGlzdCA9IGF3YWl0IHRoaXMuX3RvZG9TZXJ2aWNlLmZpbmRCeUlkKGlkKTtcblxuICAgIGlmICghZXhpc3QpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxuICAgICAgICBgJHtpZH0gcmVzb3VyY2Ugbm90IGV4aXN0YCxcbiAgICAgICAgSHR0cFN0YXR1cy5CQURfUkVRVUVTVCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZXhpc3QuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgZXhpc3QubGV2ZWwgPSBsZXZlbDtcbiAgICBleGlzdC5pc0NvbXBsZXRlZCA9IGlzQ29tcGxldGVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWQgPSBhd2FpdCB0aGlzLl90b2RvU2VydmljZS51cGRhdGUoZXhpc3QuaWQsIGV4aXN0KTtcblxuICAgICAgcmV0dXJuIHVwZGF0ZWQudG9KU09OKCkgYXMgVG9kb1ZtO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBARGVsZXRlKCc6aWQnKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuT0ssIHR5cGU6IFRvZG9WbSwgaXNBcnJheTogZmFsc2UgfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChUb2RvLm1vZGVsTmFtZSwgJ0RlbGV0ZScpKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIEBBcGlJbXBsaWNpdFBhcmFtKHsgbmFtZTogJ2lkJyB9KVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4pXG4gIGFzeW5jIGRlbGV0ZShAUGFyYW0oJ2lkJykgaWQpOiBQcm9taXNlPFRvZG9WbT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBpdGVtID0gYXdhaXQgdGhpcy5fdG9kb1NlcnZpY2UuZGVsZXRlKGlkKTtcbiAgICAgIHJldHVybiB0aGlzLl90b2RvU2VydmljZS5tYXA8VG9kb1ZtPihpdGVtLnRvSlNPTigpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG59XG4iXX0=