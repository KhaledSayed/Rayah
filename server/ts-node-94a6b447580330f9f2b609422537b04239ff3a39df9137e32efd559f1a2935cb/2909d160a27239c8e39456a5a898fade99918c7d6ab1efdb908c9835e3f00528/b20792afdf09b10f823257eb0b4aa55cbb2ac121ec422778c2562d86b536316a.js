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
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ProductParams.prototype, "description", void 0);
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
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], ProductParams.prototype, "brand", void 0);
exports.ProductParams = ProductParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXBhcmFtcy5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXBhcmFtcy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZDQUE2RTtBQUU3RSxxREFPeUI7QUFDekIsZ0ZBR3dEO0FBQ3hELDZHQUFpRztBQUVqRyxNQUFhLGFBQWE7Q0F3Q3pCO0FBcENDO0lBSEMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDeEMsMEJBQVEsRUFBRTtJQUNWLDJCQUFTLEVBQUU7OzJDQUNDO0FBSWI7SUFGQyxrQ0FBd0IsRUFBRTtJQUMxQiwwQkFBUSxFQUFFOztrREFDUztBQU1wQjtJQUpDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQ3pDLDJCQUFTLEVBQUU7SUFDWCwwQkFBUSxFQUFFO0lBQ1YsaUNBQW1CLEVBQUU7OzJDQUNUO0FBTWI7SUFKQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNsQywyQkFBUyxFQUFFO0lBQ1gsMEJBQVEsRUFBRTtJQUNWLDRCQUFVLEVBQUU7OytDQUNJO0FBTWpCO0lBSkMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDbkMsMkJBQVMsRUFBRTtJQUNYLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOzs0Q0FDQztBQUlkO0lBRkMsa0NBQXdCLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDM0MsNEJBQVUsRUFBRTs7K0NBQ0s7QUFLbEI7SUFIQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxDQUFDO0lBQ3pELDJCQUFTLEVBQUU7SUFDWCw0Q0FBZ0IsRUFBRTs7K0NBQ0Y7QUFJakI7SUFGQywyQkFBUyxFQUFFO0lBQ1gsMkJBQVMsRUFBRTs7NENBQ0U7QUF2Q2hCLHNDQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHksIEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJy4uLy4uLy4uL2NhdGVnb3J5L21vZGVscy9jYXRlZ29yeS5tb2RlbCc7XG5pbXBvcnQge1xuICBJc1N0cmluZyxcbiAgSXNEZWZpbmVkLFxuICBJc051bWJlcixcbiAgSXNQb3NpdGl2ZSxcbiAgSXNPcHRpb25hbCxcbiAgSXNNb25nb0lkLFxufSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHtcbiAgSXNQcm9kdWN0VW5pcXVlLFxuICBpc1VuaXF1ZVByb2R1Y3RDb2RlLFxufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdmFsaWRhdG9ycy9wcm9kdWN0L3VuaXF1ZS1jb2RlJztcbmltcG9ydCB7IElzQ2F0ZWdvcnlFeGlzdHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdmFsaWRhdG9ycy9jYXRlZ29yeS9jYXRlZ29yeS1leGlzdHMudmFsaWRhdG9yJztcblxuZXhwb3J0IGNsYXNzIFByb2R1Y3RQYXJhbXMge1xuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6ICdDaGlwc2V5JyB9KVxuICBASXNTdHJpbmcoKVxuICBASXNEZWZpbmVkKClcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBASXNTdHJpbmcoKVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJyNGMDNDTEFOJyB9KVxuICBASXNEZWZpbmVkKClcbiAgQElzU3RyaW5nKClcbiAgQGlzVW5pcXVlUHJvZHVjdENvZGUoKVxuICBjb2RlOiBzdHJpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAxMDAgfSlcbiAgQElzRGVmaW5lZCgpXG4gIEBJc051bWJlcigpXG4gIEBJc1Bvc2l0aXZlKClcbiAgcXVhbnRpdHk6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6IDI0OTkgfSlcbiAgQElzRGVmaW5lZCgpXG4gIEBJc051bWJlcigpXG4gIEBJc1Bvc2l0aXZlKClcbiAgcHJpY2U6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKHsgZXhhbXBsZTogdHJ1ZSB9KVxuICBASXNPcHRpb25hbCgpXG4gIGZlYXR1cmVkOiBib29sZWFuO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJzViZTJkM2JiM2YwNjE1MmRjMTgwNGNkZCcgfSlcbiAgQElzRGVmaW5lZCgpXG4gIEBJc0NhdGVnb3J5RXhpc3RzKClcbiAgY2F0ZWdvcnk6IHN0cmluZztcblxuICBASXNEZWZpbmVkKClcbiAgQElzTW9uZ29JZCgpXG4gIGJyYW5kOiBzdHJpbmc7XG59XG4iXX0=