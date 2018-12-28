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
class BrandVm extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Juhayna' }),
    __metadata("design:type", String)
], BrandVm.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        example: 'uploads/ace74ed1934c5ed010332a68e4d23eb78.png',
    }),
    __metadata("design:type", String)
], BrandVm.prototype, "logo", void 0);
exports.BrandVm = BrandVm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9icmFuZC9tb2RlbHMvdmlldy1tb2RlbHMvYnJhbmQtdm0ubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvYnJhbmQvbW9kZWxzL3ZpZXctbW9kZWxzL2JyYW5kLXZtLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXlEO0FBQ3pELDZDQUFtRDtBQUVuRCxNQUFhLE9BQVEsU0FBUSx3QkFBVztDQVF2QztBQU5DO0lBREMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7O3FDQUM1QjtBQUtiO0lBSEMsMEJBQWdCLENBQUM7UUFDaEIsT0FBTyxFQUFFLCtDQUErQztLQUN6RCxDQUFDOztxQ0FDVztBQVBmLDBCQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsVm0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5IH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcblxuZXhwb3J0IGNsYXNzIEJyYW5kVm0gZXh0ZW5kcyBCYXNlTW9kZWxWbSB7XG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJ0p1aGF5bmEnIH0pXG4gIG5hbWU6IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7XG4gICAgZXhhbXBsZTogJ3VwbG9hZHMvYWNlNzRlZDE5MzRjNWVkMDEwMzMyYTY4ZTRkMjNlYjc4LnBuZycsXG4gIH0pXG4gIGxvZ286IHN0cmluZztcbn1cbiJdfQ==