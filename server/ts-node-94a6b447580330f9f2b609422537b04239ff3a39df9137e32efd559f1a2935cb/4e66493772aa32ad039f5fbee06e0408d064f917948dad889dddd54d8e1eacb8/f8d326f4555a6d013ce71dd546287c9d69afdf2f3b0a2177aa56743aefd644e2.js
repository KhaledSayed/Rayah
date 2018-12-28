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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const category_exists_validator_1 = require("../../../shared/validators/category/category-exists.validator");
class ProductParamsPut {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Chipsey' }),
    class_validator_1.IsString(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], ProductParamsPut.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '#F03CLAN' }),
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ProductParamsPut.prototype, "code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    class_validator_1.IsDefined(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], ProductParamsPut.prototype, "quantity", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 2499 }),
    class_validator_1.IsDefined(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], ProductParamsPut.prototype, "price", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ example: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], ProductParamsPut.prototype, "featured", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '5be2d3bb3f06152dc1804cdd' }),
    class_validator_1.IsDefined(),
    category_exists_validator_1.IsCategoryExists(),
    __metadata("design:type", String)
], ProductParamsPut.prototype, "category", void 0);
exports.ProductParamsPut = ProductParamsPut;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXBhcmFtcy1wdXQubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvcHJvZHVjdC9tb2RlbHMvdmlldy1tb2RlbHMvcHJvZHVjdC1wYXJhbXMtcHV0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTZFO0FBRTdFLHFEQU15QjtBQUt6Qiw2R0FBaUc7QUFHakcsTUFBYSxnQkFBZ0I7Q0ErQjVCO0FBM0JDO0lBSEMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDeEMsMEJBQVEsRUFBRTtJQUNWLDJCQUFTLEVBQUU7OzhDQUNDO0FBS2I7SUFIQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN6QywyQkFBUyxFQUFFO0lBQ1gsMEJBQVEsRUFBRTs7OENBQ0U7QUFNYjtJQUpDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLDJCQUFTLEVBQUU7SUFDWCwwQkFBUSxFQUFFO0lBQ1YsNEJBQVUsRUFBRTs7a0RBQ0k7QUFNakI7SUFKQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNuQywyQkFBUyxFQUFFO0lBQ1gsMEJBQVEsRUFBRTtJQUNWLDRCQUFVLEVBQUU7OytDQUNDO0FBSWQ7SUFGQyxrQ0FBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMzQyw0QkFBVSxFQUFFOztrREFDSztBQUtsQjtJQUhDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLENBQUM7SUFDekQsMkJBQVMsRUFBRTtJQUNYLDRDQUFnQixFQUFFOztrREFDRjtBQTlCbkIsNENBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBpTW9kZWxQcm9wZXJ0eSwgQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsIH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vLi4vLi4vY2F0ZWdvcnkvbW9kZWxzL2NhdGVnb3J5Lm1vZGVsJztcbmltcG9ydCB7XG4gIElzU3RyaW5nLFxuICBJc0RlZmluZWQsXG4gIElzTnVtYmVyLFxuICBJc1Bvc2l0aXZlLFxuICBJc09wdGlvbmFsLFxufSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHtcbiAgSXNQcm9kdWN0VW5pcXVlLFxuICBpc1VuaXF1ZVByb2R1Y3RDb2RlLFxufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdmFsaWRhdG9ycy9wcm9kdWN0L3VuaXF1ZS1jb2RlJztcbmltcG9ydCB7IElzQ2F0ZWdvcnlFeGlzdHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdmFsaWRhdG9ycy9jYXRlZ29yeS9jYXRlZ29yeS1leGlzdHMudmFsaWRhdG9yJztcbmltcG9ydCB7IEJhc2VNb2RlbFZtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgUHJvZHVjdFBhcmFtc1B1dCB7XG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJ0NoaXBzZXknIH0pXG4gIEBJc1N0cmluZygpXG4gIEBJc0RlZmluZWQoKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAnI0YwM0NMQU4nIH0pXG4gIEBJc0RlZmluZWQoKVxuICBASXNTdHJpbmcoKVxuICBjb2RlOiBzdHJpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAxMDAgfSlcbiAgQElzRGVmaW5lZCgpXG4gIEBJc051bWJlcigpXG4gIEBJc1Bvc2l0aXZlKClcbiAgcXVhbnRpdHk6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6IDI0OTkgfSlcbiAgQElzRGVmaW5lZCgpXG4gIEBJc051bWJlcigpXG4gIEBJc1Bvc2l0aXZlKClcbiAgcHJpY2U6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKHsgZXhhbXBsZTogdHJ1ZSB9KVxuICBASXNPcHRpb25hbCgpXG4gIGZlYXR1cmVkOiBib29sZWFuO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJzViZTJkM2JiM2YwNjE1MmRjMTgwNGNkZCcgfSlcbiAgQElzRGVmaW5lZCgpXG4gIEBJc0NhdGVnb3J5RXhpc3RzKClcbiAgY2F0ZWdvcnk6IHN0cmluZztcbn1cbiJdfQ==