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
const valid_product_validator_1 = require("../../../shared/validators/product/valid-product.validator");
const valid_coupon_validator_1 = require("../../../shared/validators/orders/valid-coupon.validator");
const base_model_1 = require("../../../shared/base.model");
class OrderedProduct {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsMongoId(),
    swagger_1.ApiModelProperty(),
    valid_product_validator_1.IsProductValid({ message: 'Product is Invalid' }),
    __metadata("design:type", String)
], OrderedProduct.prototype, "id", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsPositive(),
    class_validator_1.IsNumber(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], OrderedProduct.prototype, "quantity", void 0);
class OrderParam extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty({ type: OrderedProduct, isArray: true }),
    class_validator_1.IsDefined(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_validator_1.ArrayMinSize(1, { message: 'Basket is empty' }),
    __metadata("design:type", Array)
], OrderParam.prototype, "basket", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    valid_coupon_validator_1.IsCouponValid({ message: "Coupon isn't valid" }),
    __metadata("design:type", String)
], OrderParam.prototype, "coupon", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], OrderParam.prototype, "address", void 0);
exports.OrderParam = OrderParam;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItcGFyYW1zLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL29yZGVyL21vZGVscy92aWV3LW1vZGVscy9vcmRlci1wYXJhbXMubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBNkU7QUFHN0UscURBVXlCO0FBR3pCLHdHQUE0RjtBQUU1RixxR0FBeUY7QUFFekYsMkRBQXlEO0FBR3pELE1BQU0sY0FBYztDQWFuQjtBQVJDO0lBSkMsMkJBQVMsRUFBRTtJQUNYLDJCQUFTLEVBQUU7SUFDWCwwQkFBZ0IsRUFBRTtJQUNsQix3Q0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLENBQUM7OzBDQUN2QztBQU9YO0lBTEMsMkJBQVMsRUFBRTtJQUNYLDRCQUFVLEVBQUU7SUFDWiwwQkFBUSxFQUFFO0lBRVYsMEJBQWdCLEVBQUU7O2dEQUNGO0FBR25CLE1BQWEsVUFBVyxTQUFRLHdCQUFXO0NBcUIxQztBQWZDO0lBTEMsMEJBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN6RCwyQkFBUyxFQUFFO0lBQ1gseUJBQU8sRUFBRTtJQUNULGdDQUFjLEVBQUU7SUFDaEIsOEJBQVksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzs7MENBQ3RCO0FBSTFCO0lBRkMsMEJBQWdCLEVBQUU7SUFDbEIsc0NBQWEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxDQUFDOzswQ0FDakM7QUFJaEI7SUFGQywwQkFBZ0IsRUFBRTtJQUNsQiwyQkFBUyxFQUFFOzsyQ0FDSTtBQWRsQixnQ0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5LCBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvbW9kZWxzL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgQ291cG9uIH0gZnJvbSAnLi4vLi4vLi4vY291cG9uL21vZGVscy9jb3Vwb24ubW9kZWwnO1xuaW1wb3J0IHtcbiAgSXNEZWZpbmVkLFxuICBJc1Bvc2l0aXZlLFxuICBJc051bWJlcixcbiAgSXNBcnJheSxcbiAgSXNNb25nb0lkLFxuICBNaW5MZW5ndGgsXG4gIEFycmF5TWluU2l6ZSxcbiAgSXNPcHRpb25hbCxcbiAgVmFsaWRhdGVOZXN0ZWQsXG59IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJ3R5cGVnb29zZS9saWIvdXRpbHMnO1xuaW1wb3J0IHsgSXNPcmRlclZhbGlkIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvb3JkZXJzL3ZhbGlkLW9yZGVyLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBJc1Byb2R1Y3RWYWxpZCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC92YWxpZGF0b3JzL3Byb2R1Y3QvdmFsaWQtcHJvZHVjdC52YWxpZGF0b3InO1xuaW1wb3J0IHsgSXNBcHBsaWNhYmxlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvcHJvZHVjdC9pcy1hcHBsaWNhYmxlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBJc0NvdXBvblZhbGlkIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvb3JkZXJzL3ZhbGlkLWNvdXBvbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IEJhc2VNb2RlbFZtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgT3JkZXJMZXZlbCB9IGZyb20gJy4uL29yZGVyLWxldmVsLmVudW0nO1xuXG5jbGFzcyBPcmRlcmVkUHJvZHVjdCB7XG4gIEBJc0RlZmluZWQoKVxuICBASXNNb25nb0lkKClcbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBASXNQcm9kdWN0VmFsaWQoeyBtZXNzYWdlOiAnUHJvZHVjdCBpcyBJbnZhbGlkJyB9KVxuICBpZDogc3RyaW5nO1xuXG4gIEBJc0RlZmluZWQoKVxuICBASXNQb3NpdGl2ZSgpXG4gIEBJc051bWJlcigpXG4gIC8vIEBJc0FwcGxpY2FibGUoJ2lkJylcbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBxdWFudGl0eTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgT3JkZXJQYXJhbSBleHRlbmRzIEJhc2VNb2RlbFZtIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoeyB0eXBlOiBPcmRlcmVkUHJvZHVjdCwgaXNBcnJheTogdHJ1ZSB9KVxuICBASXNEZWZpbmVkKClcbiAgQElzQXJyYXkoKVxuICBAVmFsaWRhdGVOZXN0ZWQoKVxuICBAQXJyYXlNaW5TaXplKDEsIHsgbWVzc2FnZTogJ0Jhc2tldCBpcyBlbXB0eScgfSlcbiAgYmFza2V0PzogT3JkZXJlZFByb2R1Y3RbXTtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIEBJc0NvdXBvblZhbGlkKHsgbWVzc2FnZTogXCJDb3Vwb24gaXNuJ3QgdmFsaWRcIiB9KVxuICBjb3Vwb24/OiBzdHJpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBASXNEZWZpbmVkKClcbiAgYWRkcmVzczogc3RyaW5nO1xuXG4gIHN0YXR1czogT3JkZXJMZXZlbDtcblxuICB1c2VyOiBzdHJpbmc7XG5cbiAgbm90ZTogc3RyaW5nO1xufVxuIl19