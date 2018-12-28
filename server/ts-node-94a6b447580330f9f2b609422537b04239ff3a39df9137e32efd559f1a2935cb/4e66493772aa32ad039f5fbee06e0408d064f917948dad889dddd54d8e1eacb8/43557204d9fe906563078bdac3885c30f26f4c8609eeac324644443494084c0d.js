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
const base_service_1 = require("./shared/base.service");
const todo_model_1 = require("./todo/models/todo.model");
const mongoose_1 = require("@nestjs/mongoose");
const mapper_service_1 = require("./shared/mapper/mapper.service");
let TodoService = class TodoService extends base_service_1.BaseService {
    constructor(_todoModel, _mapperService) {
        super();
        this._todoModel = _todoModel;
        this._mapperService = _mapperService;
        this._model = _todoModel;
        this._mapper = _mapperService.mapper;
    }
    onCreateTodo(todoParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, level } = todoParams;
            const newTodo = new this._model();
            newTodo.content = content;
            if (level) {
                newTodo.level = level;
            }
            try {
                const result = yield this.create(newTodo);
                const TodoVm = yield this.map(result.toJSON());
                return TodoVm;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
TodoService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(todo_model_1.Todo.modelName)),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy90b2RvLnNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvdG9kby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBdUU7QUFDdkUsd0RBQW9EO0FBQ3BELHlEQUFnRDtBQUNoRCwrQ0FBK0M7QUFFL0MsbUVBQStEO0FBSy9ELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSwwQkFBaUI7SUFDaEQsWUFDZ0QsVUFBMkIsRUFDeEQsY0FBNkI7UUFFOUMsS0FBSyxFQUFFLENBQUM7UUFIc0MsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDeEQsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFHOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7SUFFSyxZQUFZLENBQUMsVUFBc0I7O1lBQ3ZDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRXRDLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRWxDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBRTFCLElBQUksS0FBSyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1lBRUQsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFdkQsT0FBTyxNQUFNLENBQUM7YUFDZjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE1BQU0sSUFBSSxzQkFBYSxDQUFDLENBQUMsRUFBRSxtQkFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDOUQ7UUFDSCxDQUFDO0tBQUE7Q0FDRixDQUFBO0FBOUJZLFdBQVc7SUFEdkIsbUJBQVUsRUFBRTtJQUdSLFdBQUEsc0JBQVcsQ0FBQyxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBOzZDQUNLLDhCQUFhO0dBSHJDLFdBQVcsQ0E4QnZCO0FBOUJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSHR0cEV4Y2VwdGlvbiwgSHR0cFN0YXR1cyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFRvZG8gfSBmcm9tICcuL3RvZG8vbW9kZWxzL3RvZG8ubW9kZWwnO1xuaW1wb3J0IHsgSW5qZWN0TW9kZWwgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IE1vZGVsVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyBNYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQvbWFwcGVyL21hcHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFRvZG9QYXJhbXMgfSBmcm9tICcuL3RvZG8vbW9kZWxzL3ZpZXctbW9kZWxzL3RvZG8tcGFyYW1zLm1vZGVsJztcbmltcG9ydCB7IFRvZG9WbSB9IGZyb20gJy4vdG9kby9tb2RlbHMvdmlldy1tb2RlbHMvdG9kby12bS5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb2RvU2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlPFRvZG8+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdE1vZGVsKFRvZG8ubW9kZWxOYW1lKSBwcml2YXRlIHJlYWRvbmx5IF90b2RvTW9kZWw6IE1vZGVsVHlwZTxUb2RvPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tYXBwZXJTZXJ2aWNlOiBNYXBwZXJTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX21vZGVsID0gX3RvZG9Nb2RlbDtcbiAgICB0aGlzLl9tYXBwZXIgPSBfbWFwcGVyU2VydmljZS5tYXBwZXI7XG4gIH1cblxuICBhc3luYyBvbkNyZWF0ZVRvZG8odG9kb1BhcmFtczogVG9kb1BhcmFtcyk6IFByb21pc2U8VG9kb1ZtPiB7XG4gICAgY29uc3QgeyBjb250ZW50LCBsZXZlbCB9ID0gdG9kb1BhcmFtcztcblxuICAgIGNvbnN0IG5ld1RvZG8gPSBuZXcgdGhpcy5fbW9kZWwoKTtcblxuICAgIG5ld1RvZG8uY29udGVudCA9IGNvbnRlbnQ7XG5cbiAgICBpZiAobGV2ZWwpIHtcbiAgICAgIG5ld1RvZG8ubGV2ZWwgPSBsZXZlbDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jcmVhdGUobmV3VG9kbyk7XG4gICAgICBjb25zdCBUb2RvVm0gPSBhd2FpdCB0aGlzLm1hcDxUb2RvVm0+KHJlc3VsdC50b0pTT04oKSk7XG5cbiAgICAgIHJldHVybiBUb2RvVm07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxufVxuIl19