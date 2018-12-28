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
const unique_code_1 = require("../../../shared/validators/product/unique-code");
const category_exists_validator_1 = require("../../../shared/validators/category/category-exists.validator");
class ProductParams {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Chipsey' }),
    class_validator_1.IsString(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], ProductParams.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '#F03CLAN' }),
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    unique_code_1.isUniqueProductCode(),
    __metadata("design:type", String)
], ProductParams.prototype, "code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    class_validator_1.IsDefined(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], ProductParams.prototype, "quantity", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 2499 }),
    class_validator_1.IsDefined(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], ProductParams.prototype, "price", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ example: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], ProductParams.prototype, "featured", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '5be2d3bb3f06152dc1804cdd' }),
    class_validator_1.IsDefined(),
    category_exists_validator_1.IsCategoryExists(),
    __metadata("design:type", String)
], ProductParams.prototype, "category", void 0);
exports.ProductParams = ProductParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXBhcmFtcy5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXBhcmFtcy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZDQUE2RTtBQUU3RSxxREFNeUI7QUFDekIsZ0ZBR3dEO0FBQ3hELDZHQUFpRztBQUVqRyxNQUFhLGFBQWE7Q0FnQ3pCO0FBNUJDO0lBSEMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDeEMsMEJBQVEsRUFBRTtJQUNWLDJCQUFTLEVBQUU7OzJDQUNDO0FBTWI7SUFKQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN6QywyQkFBUyxFQUFFO0lBQ1gsMEJBQVEsRUFBRTtJQUNWLGlDQUFtQixFQUFFOzsyQ0FDVDtBQU1iO0lBSkMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDbEMsMkJBQVMsRUFBRTtJQUNYLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOzsrQ0FDSTtBQU1qQjtJQUpDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ25DLDJCQUFTLEVBQUU7SUFDWCwwQkFBUSxFQUFFO0lBQ1YsNEJBQVUsRUFBRTs7NENBQ0M7QUFJZDtJQUZDLGtDQUF3QixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzNDLDRCQUFVLEVBQUU7OytDQUNLO0FBS2xCO0lBSEMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQztJQUN6RCwyQkFBUyxFQUFFO0lBQ1gsNENBQWdCLEVBQUU7OytDQUNGO0FBL0JuQixzQ0FnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5LCBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi8uLi9jYXRlZ29yeS9tb2RlbHMvY2F0ZWdvcnkubW9kZWwnO1xuaW1wb3J0IHtcbiAgSXNTdHJpbmcsXG4gIElzRGVmaW5lZCxcbiAgSXNOdW1iZXIsXG4gIElzUG9zaXRpdmUsXG4gIElzT3B0aW9uYWwsXG59IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5pbXBvcnQge1xuICBJc1Byb2R1Y3RVbmlxdWUsXG4gIGlzVW5pcXVlUHJvZHVjdENvZGUsXG59IGZyb20gJy4uLy4uLy4uL3NoYXJlZC92YWxpZGF0b3JzL3Byb2R1Y3QvdW5pcXVlLWNvZGUnO1xuaW1wb3J0IHsgSXNDYXRlZ29yeUV4aXN0cyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC92YWxpZGF0b3JzL2NhdGVnb3J5L2NhdGVnb3J5LWV4aXN0cy52YWxpZGF0b3InO1xuXG5leHBvcnQgY2xhc3MgUHJvZHVjdFBhcmFtcyB7XG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJ0NoaXBzZXknIH0pXG4gIEBJc1N0cmluZygpXG4gIEBJc0RlZmluZWQoKVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAnI0YwM0NMQU4nIH0pXG4gIEBJc0RlZmluZWQoKVxuICBASXNTdHJpbmcoKVxuICBAaXNVbmlxdWVQcm9kdWN0Q29kZSgpXG4gIGNvZGU6IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6IDEwMCB9KVxuICBASXNEZWZpbmVkKClcbiAgQElzTnVtYmVyKClcbiAgQElzUG9zaXRpdmUoKVxuICBxdWFudGl0eTogbnVtYmVyO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogMjQ5OSB9KVxuICBASXNEZWZpbmVkKClcbiAgQElzTnVtYmVyKClcbiAgQElzUG9zaXRpdmUoKVxuICBwcmljZTogbnVtYmVyO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoeyBleGFtcGxlOiB0cnVlIH0pXG4gIEBJc09wdGlvbmFsKClcbiAgZmVhdHVyZWQ6IGJvb2xlYW47XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAnNWJlMmQzYmIzZjA2MTUyZGMxODA0Y2RkJyB9KVxuICBASXNEZWZpbmVkKClcbiAgQElzQ2F0ZWdvcnlFeGlzdHMoKVxuICBjYXRlZ29yeTogc3RyaW5nO1xufVxuIl19