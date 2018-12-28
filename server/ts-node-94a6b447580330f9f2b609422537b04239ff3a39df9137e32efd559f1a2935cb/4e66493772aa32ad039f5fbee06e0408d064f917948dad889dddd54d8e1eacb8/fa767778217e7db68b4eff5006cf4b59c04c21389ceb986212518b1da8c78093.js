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
Object.defineProperty(exports, "__esModule", { value: true });
const base_model_1 = require("./../../../shared/base.model");
const todo_level_enum_1 = require("../todo-level.enum");
const swagger_1 = require("@nestjs/swagger");
const enum_to_array_1 = require("./../../../shared/utilities/enum-to-array");
class TodoVm extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TodoVm.prototype, "content", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({
        enum: enum_to_array_1.EnumToArray(todo_level_enum_1.TodoLevel),
        example: todo_level_enum_1.TodoLevel.Normal,
    }),
    __metadata("design:type", String)
], TodoVm.prototype, "level", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], TodoVm.prototype, "isCompleted", void 0);
exports.TodoVm = TodoVm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy90b2RvL21vZGVscy92aWV3LW1vZGVscy90b2RvLXZtLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3RvZG8vbW9kZWxzL3ZpZXctbW9kZWxzL3RvZG8tdm0ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2REFBMkQ7QUFDM0Qsd0RBQStDO0FBQy9DLDZDQUE2RTtBQUM3RSw2RUFBd0U7QUFFeEUsTUFBYSxNQUFPLFNBQVEsd0JBQVc7Q0FXdEM7QUFUQztJQURDLDBCQUFnQixFQUFFOzt1Q0FDSDtBQUtoQjtJQUpDLGtDQUF3QixDQUFDO1FBQ3hCLElBQUksRUFBRSwyQkFBVyxDQUFDLDJCQUFTLENBQUM7UUFDNUIsT0FBTyxFQUFFLDJCQUFTLENBQUMsTUFBTTtLQUMxQixDQUFDOztxQ0FDZTtBQUdqQjtJQURDLDBCQUFnQixFQUFFOzsyQ0FDRTtBQVZ2Qix3QkFXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbFZtIH0gZnJvbSAnLi8uLi8uLi8uLi9zaGFyZWQvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBUb2RvTGV2ZWwgfSBmcm9tICcuLi90b2RvLWxldmVsLmVudW0nO1xuaW1wb3J0IHsgQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsLCBBcGlNb2RlbFByb3BlcnR5IH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IEVudW1Ub0FycmF5IH0gZnJvbSAnLi8uLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2VudW0tdG8tYXJyYXknO1xuXG5leHBvcnQgY2xhc3MgVG9kb1ZtIGV4dGVuZHMgQmFzZU1vZGVsVm0ge1xuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgQEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCh7XG4gICAgZW51bTogRW51bVRvQXJyYXkoVG9kb0xldmVsKSxcbiAgICBleGFtcGxlOiBUb2RvTGV2ZWwuTm9ybWFsLFxuICB9KVxuICBsZXZlbDogVG9kb0xldmVsO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgaXNDb21wbGV0ZWQ6IGJvb2xlYW47XG59XG4iXX0=