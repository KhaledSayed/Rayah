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
const todo_level_enum_1 = require("../todo-level.enum");
const swagger_1 = require("@nestjs/swagger");
const enum_to_array_1 = require("./../../../shared/utilities/enum-to-array");
const base_model_1 = require("./../../../shared/base.model");
class TodoParams extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TodoParams.prototype, "content", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({
        enum: enum_to_array_1.EnumToArray(todo_level_enum_1.TodoLevel),
        example: todo_level_enum_1.TodoLevel.Normal,
    }),
    __metadata("design:type", String)
], TodoParams.prototype, "level", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Boolean)
], TodoParams.prototype, "isCompleted", void 0);
exports.TodoParams = TodoParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy90b2RvL21vZGVscy92aWV3LW1vZGVscy90b2RvLXBhcmFtcy5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy90b2RvL21vZGVscy92aWV3LW1vZGVscy90b2RvLXBhcmFtcy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdEQUErQztBQUMvQyw2Q0FBNkU7QUFDN0UsNkVBQXdFO0FBQ3hFLDZEQUEyRDtBQUUzRCxNQUFhLFVBQVcsU0FBUSx3QkFBVztDQVUxQztBQVJDO0lBREMsMEJBQWdCLEVBQUU7OzJDQUNIO0FBS2hCO0lBSkMsa0NBQXdCLENBQUM7UUFDeEIsSUFBSSxFQUFFLDJCQUFXLENBQUMsMkJBQVMsQ0FBQztRQUM1QixPQUFPLEVBQUUsMkJBQVMsQ0FBQyxNQUFNO0tBQzFCLENBQUM7O3lDQUNnQjtBQUVsQjtJQURDLGtDQUF3QixFQUFFOzsrQ0FDTDtBQVR4QixnQ0FVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRvZG9MZXZlbCB9IGZyb20gJy4uL3RvZG8tbGV2ZWwuZW51bSc7XG5pbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwsIEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgRW51bVRvQXJyYXkgfSBmcm9tICcuLy4uLy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvZW51bS10by1hcnJheSc7XG5pbXBvcnQgeyBCYXNlTW9kZWxWbSB9IGZyb20gJy4vLi4vLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgVG9kb1BhcmFtcyBleHRlbmRzIEJhc2VNb2RlbFZtIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBjb250ZW50OiBzdHJpbmc7XG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoe1xuICAgIGVudW06IEVudW1Ub0FycmF5KFRvZG9MZXZlbCksXG4gICAgZXhhbXBsZTogVG9kb0xldmVsLk5vcm1hbCxcbiAgfSlcbiAgbGV2ZWw/OiBUb2RvTGV2ZWw7XG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBpc0NvbXBsZXRlZD86IGJvb2xlYW47XG59XG4iXX0=