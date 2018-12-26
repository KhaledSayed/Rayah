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
const coupon_level_enum_1 = require("../coupon-level.enum");
const class_validator_1 = require("class-validator");
const time_validators_1 = require("../../../shared/validators/coupons/time-validators");
const percentage_validators_1 = require("../../../shared/validators/coupons/percentage.validators");
const base_model_1 = require("../../../shared/base.model");
const min_max_validator_1 = require("../../../shared/validators/coupons/min-max.validator");
class CouponPutParams extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty({ example: coupon_level_enum_1.CouponLevel.Fixed }),
    class_validator_1.IsEnum(coupon_level_enum_1.CouponLevel),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], CouponPutParams.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    class_validator_1.IsNumber(),
    percentage_validators_1.IsPercentage('type', {
        message: 'value must be between (1-99)%',
    }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], CouponPutParams.prototype, "value", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Oct200' }),
    class_validator_1.IsString(),
    class_validator_1.Length(4, 22222222222),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], CouponPutParams.prototype, "code", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CouponPutParams.prototype, "numberOfPeople", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsDateString(),
    time_validators_1.IsBefore('endDate', {
        message: "startDate can't be the same or more than endDate",
    }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Date)
], CouponPutParams.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsDateString(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Date)
], CouponPutParams.prototype, "endDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    min_max_validator_1.BetweenMinAndMaximum('maxTotal', 'sm'),
    __metadata("design:type", Number)
], CouponPutParams.prototype, "minTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    min_max_validator_1.BetweenMinAndMaximum('maxTotal', 'sm'),
    __metadata("design:type", Number)
], CouponPutParams.prototype, "maxTotal", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CouponPutParams.prototype, "active", void 0);
exports.CouponPutParams = CouponPutParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vbW9kZWxzL3ZpZXctbW9kZWxzL2NvdXBvbi1wdXQtcGFyYW1zLm1vZGVsLi50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vbW9kZWxzL3ZpZXctbW9kZWxzL2NvdXBvbi1wdXQtcGFyYW1zLm1vZGVsLi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZDQUE2RTtBQUM3RSw0REFBbUQ7QUFDbkQscURBV3lCO0FBQ3pCLHdGQUE4RTtBQUM5RSxvR0FBd0Y7QUFHeEYsMkRBQXlEO0FBQ3pELDRGQUE0RjtBQUU1RixNQUFhLGVBQWdCLFNBQVEsd0JBQVc7Q0FrRC9DO0FBOUNDO0lBSEMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsK0JBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoRCx3QkFBTSxDQUFDLCtCQUFXLENBQUM7SUFDbkIsMkJBQVMsRUFBRTs7NkNBQ007QUFRbEI7SUFOQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNsQywwQkFBUSxFQUFFO0lBQ1Ysb0NBQVksQ0FBQyxNQUFNLEVBQUU7UUFDcEIsT0FBTyxFQUFFLCtCQUErQjtLQUN6QyxDQUFDO0lBQ0QsMkJBQVMsRUFBRTs7OENBQ0U7QUFNZDtJQUpDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3ZDLDBCQUFRLEVBQUU7SUFDVix3QkFBTSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUM7SUFDdEIsMkJBQVMsRUFBRTs7NkNBQ0M7QUFJYjtJQUZDLGtDQUF3QixFQUFFO0lBQzFCLDBCQUFRLEVBQUU7O3VEQUNhO0FBUXhCO0lBTkMsMEJBQWdCLEVBQUU7SUFDbEIsOEJBQVksRUFBRTtJQUNkLDBCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ25CLE9BQU8sRUFBRSxrREFBa0Q7S0FDNUQsQ0FBQztJQUNELDJCQUFTLEVBQUU7OEJBQ0EsSUFBSTtrREFBQztBQUtqQjtJQUhDLDBCQUFnQixFQUFFO0lBQ2xCLDhCQUFZLEVBQUU7SUFDZCwyQkFBUyxFQUFFOzhCQUNGLElBQUk7Z0RBQUM7QUFLZjtJQUhDLDBCQUFnQixFQUFFO0lBQ2xCLDBCQUFRLEVBQUU7SUFDVix3Q0FBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDOztpREFDdEI7QUFLakI7SUFIQywwQkFBZ0IsRUFBRTtJQUNsQiwwQkFBUSxFQUFFO0lBQ1Ysd0NBQW9CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQzs7aURBQ3RCO0FBSWpCO0lBRkMsa0NBQXdCLEVBQUU7SUFDMUIsMkJBQVMsRUFBRTs7K0NBQ0s7QUFqRG5CLDBDQWtEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHksIEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBDb3Vwb25MZXZlbCB9IGZyb20gJy4uL2NvdXBvbi1sZXZlbC5lbnVtJztcbmltcG9ydCB7XG4gIElzRW1haWwsXG4gIElzTm90RW1wdHksXG4gIElzU3RyaW5nLFxuICBJc0VudW0sXG4gIElzTnVtYmVyLFxuICBMZW5ndGgsXG4gIElzRGF0ZSxcbiAgSXNCb29sZWFuLFxuICBJc0RhdGVTdHJpbmcsXG4gIElzRGVmaW5lZCxcbn0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7IElzQmVmb3JlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvY291cG9ucy90aW1lLXZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgSXNQZXJjZW50YWdlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvY291cG9ucy9wZXJjZW50YWdlLnZhbGlkYXRvcnMnO1xuaW1wb3J0IHsgSXNVbmlxdWVDb3Vwb25Db2RlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvY291cG9ucy91bmlxdWUtY291cG9uLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBCYXNlSXRlbU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2Jhc2UtaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlTW9kZWxWbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEJldHdlZW5NaW5BbmRNYXhpbXVtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvY291cG9ucy9taW4tbWF4LnZhbGlkYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBDb3Vwb25QdXRQYXJhbXMgZXh0ZW5kcyBCYXNlTW9kZWxWbSB7XG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogQ291cG9uTGV2ZWwuRml4ZWQgfSlcbiAgQElzRW51bShDb3Vwb25MZXZlbClcbiAgQElzRGVmaW5lZCgpXG4gIHR5cGU6IENvdXBvbkxldmVsO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogMTAwIH0pXG4gIEBJc051bWJlcigpXG4gIEBJc1BlcmNlbnRhZ2UoJ3R5cGUnLCB7XG4gICAgbWVzc2FnZTogJ3ZhbHVlIG11c3QgYmUgYmV0d2VlbiAoMS05OSklJyxcbiAgfSlcbiAgQElzRGVmaW5lZCgpXG4gIHZhbHVlOiBudW1iZXI7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAnT2N0MjAwJyB9KVxuICBASXNTdHJpbmcoKVxuICBATGVuZ3RoKDQsIDIyMjIyMjIyMjIyKVxuICBASXNEZWZpbmVkKClcbiAgY29kZTogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBASXNOdW1iZXIoKVxuICBudW1iZXJPZlBlb3BsZT86IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIEBJc0RhdGVTdHJpbmcoKVxuICBASXNCZWZvcmUoJ2VuZERhdGUnLCB7XG4gICAgbWVzc2FnZTogXCJzdGFydERhdGUgY2FuJ3QgYmUgdGhlIHNhbWUgb3IgbW9yZSB0aGFuIGVuZERhdGVcIixcbiAgfSlcbiAgQElzRGVmaW5lZCgpXG4gIHN0YXJ0RGF0ZT86IERhdGU7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBASXNEYXRlU3RyaW5nKClcbiAgQElzRGVmaW5lZCgpXG4gIGVuZERhdGU/OiBEYXRlO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgQElzTnVtYmVyKClcbiAgQEJldHdlZW5NaW5BbmRNYXhpbXVtKCdtYXhUb3RhbCcsICdzbScpXG4gIG1pblRvdGFsOiBudW1iZXI7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBASXNOdW1iZXIoKVxuICBAQmV0d2Vlbk1pbkFuZE1heGltdW0oJ21heFRvdGFsJywgJ3NtJylcbiAgbWF4VG90YWw6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKClcbiAgQElzQm9vbGVhbigpXG4gIGFjdGl2ZT86IGJvb2xlYW47XG59XG4iXX0=