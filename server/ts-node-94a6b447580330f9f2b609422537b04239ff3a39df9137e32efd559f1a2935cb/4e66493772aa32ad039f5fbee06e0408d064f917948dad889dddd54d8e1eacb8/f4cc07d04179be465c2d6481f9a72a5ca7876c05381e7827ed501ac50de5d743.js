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
const coupon_level_enum_1 = require("../coupon-level.enum");
class CouponVm extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty({ example: coupon_level_enum_1.CouponLevel.Percentage }),
    __metadata("design:type", String)
], CouponVm.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: null }),
    __metadata("design:type", Number)
], CouponVm.prototype, "value", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'OCT200' }),
    __metadata("design:type", String)
], CouponVm.prototype, "code", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CouponVm.prototype, "numberOfPeople", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CouponVm.prototype, "usedBy", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Date)
], CouponVm.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Date)
], CouponVm.prototype, "endDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CouponVm.prototype, "active", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CouponVm.prototype, "minTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CouponVm.prototype, "maxTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CouponVm.prototype, "status", void 0);
exports.CouponVm = CouponVm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vbW9kZWxzL3ZpZXctbW9kZWxzL2NvdXBvbi12bS5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vbW9kZWxzL3ZpZXctbW9kZWxzL2NvdXBvbi12bS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJEQUF5RDtBQUN6RCw2Q0FBbUQ7QUFDbkQsNERBQW1EO0FBRW5ELE1BQWEsUUFBUyxTQUFRLHdCQUFXO0NBaUN4QztBQS9CQztJQURDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLCtCQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7O3NDQUN6QztBQUdiO0lBREMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O3VDQUN0QjtBQUdkO0lBREMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7O3NDQUMzQjtBQUdiO0lBREMsMEJBQWdCLEVBQUU7O2dEQUNJO0FBR3ZCO0lBREMsMEJBQWdCLEVBQUU7O3dDQUNKO0FBR2Y7SUFEQywwQkFBZ0IsRUFBRTs4QkFDUixJQUFJOzJDQUFDO0FBR2hCO0lBREMsMEJBQWdCLEVBQUU7OEJBQ1YsSUFBSTt5Q0FBQztBQUdkO0lBREMsMEJBQWdCLEVBQUU7O3dDQUNIO0FBR2hCO0lBREMsMEJBQWdCLEVBQUU7OzBDQUNGO0FBR2pCO0lBREMsMEJBQWdCLEVBQUU7OzBDQUNGO0FBR2pCO0lBREMsMEJBQWdCLEVBQUU7O3dDQUNIO0FBaENsQiw0QkFpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWxWbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgQ291cG9uTGV2ZWwgfSBmcm9tICcuLi9jb3Vwb24tbGV2ZWwuZW51bSc7XG5cbmV4cG9ydCBjbGFzcyBDb3Vwb25WbSBleHRlbmRzIEJhc2VNb2RlbFZtIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiBDb3Vwb25MZXZlbC5QZXJjZW50YWdlIH0pXG4gIHR5cGU6IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6IG51bGwgfSlcbiAgdmFsdWU6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6ICdPQ1QyMDAnIH0pXG4gIGNvZGU6IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIG51bWJlck9mUGVvcGxlOiBudW1iZXI7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICB1c2VkQnk6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIHN0YXJ0RGF0ZTogRGF0ZTtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIGVuZERhdGU6IERhdGU7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBhY3RpdmU6IGJvb2xlYW47XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBtaW5Ub3RhbDogbnVtYmVyO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgbWF4VG90YWw6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIHN0YXR1czogYm9vbGVhbjtcbn1cbiJdfQ==