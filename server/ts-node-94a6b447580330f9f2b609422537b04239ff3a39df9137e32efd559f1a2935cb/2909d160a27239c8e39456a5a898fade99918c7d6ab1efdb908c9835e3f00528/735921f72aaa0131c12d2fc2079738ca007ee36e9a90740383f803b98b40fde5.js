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
const brand_vm_model_1 = require("brand/models/view-models/brand-vm.model");
class Rating {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], Rating.prototype, "rate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], Rating.prototype, "length", void 0);
exports.Rating = Rating;
class ProductVm extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Chipsey' }),
    __metadata("design:type", String)
], ProductVm.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], ProductVm.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '#F03CLAN' }),
    __metadata("design:type", String)
], ProductVm.prototype, "code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    __metadata("design:type", Number)
], ProductVm.prototype, "quantity", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 2499 }),
    __metadata("design:type", Number)
], ProductVm.prototype, "price", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: true }),
    __metadata("design:type", Boolean)
], ProductVm.prototype, "featured", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductVm.prototype, "thumbnail", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ProductVm.prototype, "gallery", void 0);
__decorate([
    swagger_1.ApiModelProperty({ required: true }),
    __metadata("design:type", Rating)
], ProductVm.prototype, "rating", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", brand_vm_model_1.BrandVm)
], ProductVm.prototype, "brand", void 0);
exports.ProductVm = ProductVm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXZtLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3Byb2R1Y3QvbW9kZWxzL3ZpZXctbW9kZWxzL3Byb2R1Y3Qtdm0ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyREFBeUQ7QUFDekQsNkNBQTZFO0FBRTdFLDRFQUFrRTtBQUVsRSxNQUFhLE1BQU07Q0FNbEI7QUFKQztJQURDLDBCQUFnQixFQUFFOzhCQUNiLE1BQU07b0NBQUM7QUFHYjtJQURDLDBCQUFnQixFQUFFOzhCQUNYLE1BQU07c0NBQUM7QUFMakIsd0JBTUM7QUFDRCxNQUFhLFNBQVUsU0FBUSx3QkFBVztDQThCekM7QUE1QkM7SUFEQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQzs7dUNBQzVCO0FBR2I7SUFEQyxrQ0FBd0IsRUFBRTs7OENBQ1A7QUFHcEI7SUFEQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQzs7dUNBQzdCO0FBR2I7SUFEQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQzs7MkNBQ2xCO0FBR2pCO0lBREMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O3dDQUN0QjtBQUdkO0lBREMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzJDQUNsQjtBQUdsQjtJQURDLDBCQUFnQixFQUFFOzs0Q0FDRDtBQUdsQjtJQURDLDBCQUFnQixFQUFFOzswQ0FDRDtBQUdsQjtJQURDLDBCQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzhCQUM3QixNQUFNO3lDQUFDO0FBR2Y7SUFEQywwQkFBZ0IsRUFBRTs4QkFDWix3QkFBTzt3Q0FBQztBQTdCakIsOEJBOEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsVm0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwsIEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgRW51bVRvQXJyYXkgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2VudW0tdG8tYXJyYXknO1xuaW1wb3J0IHsgQnJhbmRWbSB9IGZyb20gJ2JyYW5kL21vZGVscy92aWV3LW1vZGVscy9icmFuZC12bS5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBSYXRpbmcge1xuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIHJhdGU6IE51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIGxlbmd0aDogTnVtYmVyO1xufVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RWbSBleHRlbmRzIEJhc2VNb2RlbFZtIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAnQ2hpcHNleScgfSlcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJyNGMDNDTEFOJyB9KVxuICBjb2RlOiBzdHJpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAxMDAgfSlcbiAgcXVhbnRpdHk6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6IDI0OTkgfSlcbiAgcHJpY2U6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6IHRydWUgfSlcbiAgZmVhdHVyZWQ6IGJvb2xlYW47XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICB0aHVtYm5haWw6IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIGdhbGxlcnk6IHN0cmluZ1tdO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgcmVxdWlyZWQ6IHRydWUgfSlcbiAgcmF0aW5nOiBSYXRpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBicmFuZDogQnJhbmRWbTtcbn1cbiJdfQ==