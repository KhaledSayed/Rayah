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
class CategoryParams extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryParams.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], CategoryParams.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CategoryParams.prototype, "parent", void 0);
exports.CategoryParams = CategoryParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9jYXRlZ29yeS9tb2RlbHMvdmlldy1tb2RlbHMvY2F0ZWdvcnktcGFyYW1zLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL2NhdGVnb3J5L21vZGVscy92aWV3LW1vZGVscy9jYXRlZ29yeS1wYXJhbXMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyREFBeUQ7QUFDekQsNkNBQTZFO0FBRTdFLE1BQWEsY0FBZSxTQUFRLHdCQUFXO0NBVTlDO0FBUkM7SUFEQywwQkFBZ0IsRUFBRTs7NENBQ047QUFFYjtJQURDLGtDQUF3QixFQUFFOzttREFDUDtBQUdwQjtJQURDLDBCQUFnQixFQUFFOzs4Q0FDSjtBQVBqQix3Q0FVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbFZtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgQXBpTW9kZWxQcm9wZXJ0eSwgQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsIH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcblxuZXhwb3J0IGNsYXNzIENhdGVnb3J5UGFyYW1zIGV4dGVuZHMgQmFzZU1vZGVsVm0ge1xuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIG5hbWU6IHN0cmluZztcbiAgQEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCgpXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBwYXJlbnQ6IHN0cmluZztcblxuICB0aHVtYm5haWw6IHN0cmluZztcbn1cbiJdfQ==