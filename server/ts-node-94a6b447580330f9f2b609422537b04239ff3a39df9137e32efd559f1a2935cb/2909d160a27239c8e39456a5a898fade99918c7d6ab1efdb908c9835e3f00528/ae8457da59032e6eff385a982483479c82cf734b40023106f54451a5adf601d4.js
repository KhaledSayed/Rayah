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
const unique_coupon_validator_1 = require("../../../shared/validators/coupons/unique-coupon.validator");
const min_max_validator_1 = require("../../../shared/validators/coupons/min-max.validator");
class CouponParams {
}
__decorate([
    swagger_1.ApiModelProperty({ example: coupon_level_enum_1.CouponLevel.Fixed }),
    class_validator_1.IsEnum(coupon_level_enum_1.CouponLevel),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], CouponParams.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    class_validator_1.IsNumber(),
    percentage_validators_1.IsPercentage('type', {
        message: 'value must be between (1-99)%',
    }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Number)
], CouponParams.prototype, "value", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'Oct200' }),
    class_validator_1.IsString(),
    class_validator_1.Length(4, 22222222222),
    class_validator_1.IsDefined(),
    unique_coupon_validator_1.IsUniqueCouponCode({
        message: 'code:$value is reserved',
    }),
    __metadata("design:type", String)
], CouponParams.prototype, "code", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CouponParams.prototype, "numberOfPeople", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsDateString(),
    time_validators_1.IsBefore('endDate', {
        message: "startDate can't be the same or more than endDate",
    }),
    class_validator_1.IsDefined(),
    __metadata("design:type", Date)
], CouponParams.prototype, "startDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsDateString(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Date)
], CouponParams.prototype, "endDate", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    min_max_validator_1.BetweenMinAndMaximum('maxTotal', 'sm'),
    __metadata("design:type", Number)
], CouponParams.prototype, "minTotal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsNumber(),
    min_max_validator_1.BetweenMinAndMaximum('maxTotal', 'sm'),
    __metadata("design:type", Number)
], CouponParams.prototype, "maxTotal", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CouponParams.prototype, "active", void 0);
exports.CouponParams = CouponParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vbW9kZWxzL3ZpZXctbW9kZWxzL2NvdXBvbi1wYXJhbXMubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvY291cG9uL21vZGVscy92aWV3LW1vZGVscy9jb3Vwb24tcGFyYW1zLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTZFO0FBQzdFLDREQUFtRDtBQUNuRCxxREFXeUI7QUFDekIsd0ZBQThFO0FBQzlFLG9HQUF3RjtBQUN4Rix3R0FBZ0c7QUFDaEcsNEZBQTRGO0FBRTVGLE1BQWEsWUFBWTtDQXFEeEI7QUFqREM7SUFIQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSwrQkFBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hELHdCQUFNLENBQUMsK0JBQVcsQ0FBQztJQUNuQiwyQkFBUyxFQUFFOzswQ0FDTTtBQVFsQjtJQU5DLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLDBCQUFRLEVBQUU7SUFDVixvQ0FBWSxDQUFDLE1BQU0sRUFBRTtRQUNwQixPQUFPLEVBQUUsK0JBQStCO0tBQ3pDLENBQUM7SUFDRCwyQkFBUyxFQUFFOzsyQ0FDRTtBQVNkO0lBUEMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDdkMsMEJBQVEsRUFBRTtJQUNWLHdCQUFNLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQztJQUN0QiwyQkFBUyxFQUFFO0lBQ1gsNENBQWtCLENBQUM7UUFDbEIsT0FBTyxFQUFFLHlCQUF5QjtLQUNuQyxDQUFDOzswQ0FDVztBQUliO0lBRkMsa0NBQXdCLEVBQUU7SUFDMUIsMEJBQVEsRUFBRTs7b0RBQ2E7QUFReEI7SUFOQywwQkFBZ0IsRUFBRTtJQUNsQiw4QkFBWSxFQUFFO0lBQ2QsMEJBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDbkIsT0FBTyxFQUFFLGtEQUFrRDtLQUM1RCxDQUFDO0lBQ0QsMkJBQVMsRUFBRTs4QkFDQSxJQUFJOytDQUFDO0FBS2pCO0lBSEMsMEJBQWdCLEVBQUU7SUFDbEIsOEJBQVksRUFBRTtJQUNkLDJCQUFTLEVBQUU7OEJBQ0YsSUFBSTs2Q0FBQztBQUtmO0lBSEMsMEJBQWdCLEVBQUU7SUFDbEIsMEJBQVEsRUFBRTtJQUNWLHdDQUFvQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7OzhDQUN0QjtBQUtqQjtJQUhDLDBCQUFnQixFQUFFO0lBQ2xCLDBCQUFRLEVBQUU7SUFDVix3Q0FBb0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDOzs4Q0FDdEI7QUFJakI7SUFGQyxrQ0FBd0IsRUFBRTtJQUMxQiwyQkFBUyxFQUFFOzs0Q0FDSztBQXBEbkIsb0NBcURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBpTW9kZWxQcm9wZXJ0eSwgQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsIH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IENvdXBvbkxldmVsIH0gZnJvbSAnLi4vY291cG9uLWxldmVsLmVudW0nO1xuaW1wb3J0IHtcbiAgSXNFbWFpbCxcbiAgSXNOb3RFbXB0eSxcbiAgSXNTdHJpbmcsXG4gIElzRW51bSxcbiAgSXNOdW1iZXIsXG4gIExlbmd0aCxcbiAgSXNEYXRlLFxuICBJc0Jvb2xlYW4sXG4gIElzRGF0ZVN0cmluZyxcbiAgSXNEZWZpbmVkLFxufSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHsgSXNCZWZvcmUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdmFsaWRhdG9ycy9jb3Vwb25zL3RpbWUtdmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBJc1BlcmNlbnRhZ2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdmFsaWRhdG9ycy9jb3Vwb25zL3BlcmNlbnRhZ2UudmFsaWRhdG9ycyc7XG5pbXBvcnQgeyBJc1VuaXF1ZUNvdXBvbkNvZGUgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdmFsaWRhdG9ycy9jb3Vwb25zL3VuaXF1ZS1jb3Vwb24udmFsaWRhdG9yJztcbmltcG9ydCB7IEJldHdlZW5NaW5BbmRNYXhpbXVtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvY291cG9ucy9taW4tbWF4LnZhbGlkYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBDb3Vwb25QYXJhbXMge1xuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6IENvdXBvbkxldmVsLkZpeGVkIH0pXG4gIEBJc0VudW0oQ291cG9uTGV2ZWwpXG4gIEBJc0RlZmluZWQoKVxuICB0eXBlOiBDb3Vwb25MZXZlbDtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6IDEwMCB9KVxuICBASXNOdW1iZXIoKVxuICBASXNQZXJjZW50YWdlKCd0eXBlJywge1xuICAgIG1lc3NhZ2U6ICd2YWx1ZSBtdXN0IGJlIGJldHdlZW4gKDEtOTkpJScsXG4gIH0pXG4gIEBJc0RlZmluZWQoKVxuICB2YWx1ZTogbnVtYmVyO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJ09jdDIwMCcgfSlcbiAgQElzU3RyaW5nKClcbiAgQExlbmd0aCg0LCAyMjIyMjIyMjIyMilcbiAgQElzRGVmaW5lZCgpXG4gIEBJc1VuaXF1ZUNvdXBvbkNvZGUoe1xuICAgIG1lc3NhZ2U6ICdjb2RlOiR2YWx1ZSBpcyByZXNlcnZlZCcsXG4gIH0pXG4gIGNvZGU6IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKClcbiAgQElzTnVtYmVyKClcbiAgbnVtYmVyT2ZQZW9wbGU/OiBudW1iZXI7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBASXNEYXRlU3RyaW5nKClcbiAgQElzQmVmb3JlKCdlbmREYXRlJywge1xuICAgIG1lc3NhZ2U6IFwic3RhcnREYXRlIGNhbid0IGJlIHRoZSBzYW1lIG9yIG1vcmUgdGhhbiBlbmREYXRlXCIsXG4gIH0pXG4gIEBJc0RlZmluZWQoKVxuICBzdGFydERhdGU/OiBEYXRlO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgQElzRGF0ZVN0cmluZygpXG4gIEBJc0RlZmluZWQoKVxuICBlbmREYXRlPzogRGF0ZTtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIEBJc051bWJlcigpXG4gIEBCZXR3ZWVuTWluQW5kTWF4aW11bSgnbWF4VG90YWwnLCAnc20nKVxuICBtaW5Ub3RhbDogbnVtYmVyO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgQElzTnVtYmVyKClcbiAgQEJldHdlZW5NaW5BbmRNYXhpbXVtKCdtYXhUb3RhbCcsICdzbScpXG4gIG1heFRvdGFsOiBudW1iZXI7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCgpXG4gIEBJc0Jvb2xlYW4oKVxuICBhY3RpdmU/OiBib29sZWFuO1xufVxuIl19