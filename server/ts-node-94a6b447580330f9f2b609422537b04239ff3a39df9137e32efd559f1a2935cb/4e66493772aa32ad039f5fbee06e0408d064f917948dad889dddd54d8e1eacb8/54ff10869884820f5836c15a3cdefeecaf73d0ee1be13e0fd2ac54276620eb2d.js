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
const base_model_1 = require("../../../shared/base.model");
const user_role_enum_1 = require("../user-role.enum");
const swagger_1 = require("@nestjs/swagger");
const enum_to_array_1 = require("../../../shared/utilities/enum-to-array");
class UserVM extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UserVM.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], UserVM.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], UserVM.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ enum: enum_to_array_1.EnumToArray(user_role_enum_1.UserRole) }),
    __metadata("design:type", String)
], UserVM.prototype, "role", void 0);
exports.UserVM = UserVM;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy91c2VyL21vZGVscy92aWV3LW1vZGVscy91c2VyLXZtLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3VzZXIvbW9kZWxzL3ZpZXctbW9kZWxzL3VzZXItdm0ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyREFBeUQ7QUFDekQsc0RBQTZDO0FBQzdDLDZDQUE2RTtBQUM3RSwyRUFBc0U7QUFFdEUsTUFBYSxNQUFPLFNBQVEsd0JBQVc7Q0FTdEM7QUFQQztJQURDLDBCQUFnQixFQUFFOztxQ0FDTDtBQUVkO0lBREMsa0NBQXdCLEVBQUU7O29DQUNiO0FBRWQ7SUFEQyxrQ0FBd0IsRUFBRTs7cUNBQ1o7QUFFZjtJQURDLGtDQUF3QixDQUFDLEVBQUUsSUFBSSxFQUFFLDJCQUFXLENBQUMseUJBQVEsQ0FBQyxFQUFFLENBQUM7O29DQUMxQztBQVJsQix3QkFTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbFZtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgVXNlclJvbGUgfSBmcm9tICcuLi91c2VyLXJvbGUuZW51bSc7XG5pbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5LCBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgRW51bVRvQXJyYXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2VudW0tdG8tYXJyYXknO1xuXG5leHBvcnQgY2xhc3MgVXNlclZNIGV4dGVuZHMgQmFzZU1vZGVsVm0ge1xuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIGVtYWlsOiBzdHJpbmc7XG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBuYW1lPzogc3RyaW5nO1xuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKClcbiAgcGhvbmU/OiBzdHJpbmc7XG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoeyBlbnVtOiBFbnVtVG9BcnJheShVc2VyUm9sZSkgfSlcbiAgcm9sZT86IFVzZXJSb2xlO1xufVxuIl19