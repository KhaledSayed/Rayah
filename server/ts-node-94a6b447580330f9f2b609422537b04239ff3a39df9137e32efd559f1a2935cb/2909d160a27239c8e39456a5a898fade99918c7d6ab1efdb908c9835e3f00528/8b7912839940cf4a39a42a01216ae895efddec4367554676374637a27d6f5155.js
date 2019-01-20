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
const swagger_1 = require("@nestjs/swagger");
class CategoryVm extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryVm.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], CategoryVm.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryVm.prototype, "parent", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryVm.prototype, "thumbnail", void 0);
exports.CategoryVm = CategoryVm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9jYXRlZ29yeS9tb2RlbHMvdmlldy1tb2RlbHMvY2F0ZWdvcnktdm0ubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvY2F0ZWdvcnkvbW9kZWxzL3ZpZXctbW9kZWxzL2NhdGVnb3J5LXZtLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXlEO0FBQ3pELDZDQUE2RTtBQUc3RSxNQUFhLFVBQVcsU0FBUSx3QkFBVztDQVcxQztBQVRDO0lBREMsMEJBQWdCLEVBQUU7O3dDQUNOO0FBRWI7SUFEQyxrQ0FBd0IsRUFBRTs7K0NBQ1A7QUFHcEI7SUFEQywwQkFBZ0IsRUFBRTs7MENBQ0o7QUFHZjtJQURDLDBCQUFnQixFQUFFOzs2Q0FDRDtBQVZwQixnQ0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbFZtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsLCBBcGlNb2RlbFByb3BlcnR5IH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IEVudW1Ub0FycmF5IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9lbnVtLXRvLWFycmF5JztcblxuZXhwb3J0IGNsYXNzIENhdGVnb3J5Vm0gZXh0ZW5kcyBCYXNlTW9kZWxWbSB7XG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgbmFtZTogc3RyaW5nO1xuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKClcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIHBhcmVudDogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgdGh1bWJuYWlsOiBzdHJpbmc7XG59XG4iXX0=