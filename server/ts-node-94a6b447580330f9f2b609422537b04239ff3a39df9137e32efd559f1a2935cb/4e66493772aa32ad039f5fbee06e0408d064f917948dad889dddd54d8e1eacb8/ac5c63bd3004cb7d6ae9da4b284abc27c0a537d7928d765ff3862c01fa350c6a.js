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
const base_model_1 = require("../../shared/base.model");
const user_model_1 = require("../../user/models/user.model");
const typegoose_1 = require("typegoose");
const product_model_1 = require("../../product/models/product.model");
const order_level_enum_1 = require("./order-level.enum");
const coupon_model_1 = require("../../coupon/models/coupon.model");
class ProductItem {
    get totalItemPrice() {
        return this.price * this.quantity;
    }
}
__decorate([
    typegoose_1.prop({ required: true, ref: product_model_1.Product }),
    __metadata("design:type", Object)
], ProductItem.prototype, "product", void 0);
__decorate([
    typegoose_1.prop({ required: true, default: 1 }),
    __metadata("design:type", Number)
], ProductItem.prototype, "quantity", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], ProductItem.prototype, "price", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ProductItem.prototype, "totalItemPrice", null);
class Order extends base_model_1.BaseModel {
    static get model() {
        return new Order().getModelForClass(Order, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({ ref: user_model_1.User, required: true }),
    __metadata("design:type", Object)
], Order.prototype, "user", void 0);
__decorate([
    typegoose_1.arrayProp({ items: ProductItem }),
    __metadata("design:type", Array)
], Order.prototype, "basket", void 0);
__decorate([
    typegoose_1.prop({ ref: coupon_model_1.Coupon, required: false }),
    __metadata("design:type", Object)
], Order.prototype, "coupon", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Order.prototype, "address", void 0);
__decorate([
    typegoose_1.prop({ enum: order_level_enum_1.OrderLevel, default: order_level_enum_1.OrderLevel.Created }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], Order.prototype, "note", void 0);
exports.Order = Order;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9tb2RlbHMvb3JkZXIubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvb3JkZXIvbW9kZWxzL29yZGVyLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1FO0FBQ25FLDZEQUFvRDtBQUNwRCx5Q0FRbUI7QUFDbkIsc0VBQTZEO0FBQzdELHlEQUFnRDtBQUNoRCxtRUFBMEQ7QUFJMUQsTUFBTSxXQUFXO0lBV2YsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3BDLENBQUM7Q0FDRjtBQVpDO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLHVCQUFPLEVBQUUsQ0FBQzs7NENBQ2pCO0FBR3RCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzs2Q0FDcEI7QUFHakI7SUFEQyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzswQ0FDWDtBQUdkO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7O2lEQUd6QjtBQUdILE1BQWEsS0FBTSxTQUFRLHNCQUFnQjtJQXlCekMsTUFBTSxLQUFLLEtBQUs7UUFDZCxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFiLDBCQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxNQUFNLEtBQUssU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQzlCLENBQUM7Q0FDRjtBQTNCQztJQURDLGdCQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsaUJBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21DQUNwQjtBQUdoQjtJQURDLHFCQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLENBQUM7O3FDQUNaO0FBR3RCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxxQkFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7cUNBQ25CO0FBR3BCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7c0NBQ1Q7QUFHaEI7SUFEQyxnQkFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDZCQUFVLEVBQUUsT0FBTyxFQUFFLDZCQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7O3FDQUNyQztBQUduQjtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O29DQUNYO0FBR2Q7SUFEQyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzttQ0FDYjtBQXZCZixzQkFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwsIHNjaGVtYU9wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vdXNlci9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQge1xuICBSZWYsXG4gIHByb3AsXG4gIGFycmF5UHJvcCxcbiAgTW9kZWxUeXBlLFxuICBUeXBlZ29vc2UsXG4gIHBvc3QsXG4gIHByZSxcbn0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuLi8uLi9wcm9kdWN0L21vZGVscy9wcm9kdWN0Lm1vZGVsJztcbmltcG9ydCB7IE9yZGVyTGV2ZWwgfSBmcm9tICcuL29yZGVyLWxldmVsLmVudW0nO1xuaW1wb3J0IHsgQ291cG9uIH0gZnJvbSAnLi4vLi4vY291cG9uL21vZGVscy9jb3Vwb24ubW9kZWwnO1xuaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tICdic29uJztcbmltcG9ydCBpbnZOdW0gZnJvbSAnaW52b2ljZS1udW1iZXInO1xuXG5jbGFzcyBQcm9kdWN0SXRlbSB7XG4gIEBwcm9wKHsgcmVxdWlyZWQ6IHRydWUsIHJlZjogUHJvZHVjdCB9KVxuICBwcm9kdWN0OiBSZWY8UHJvZHVjdD47XG5cbiAgQHByb3AoeyByZXF1aXJlZDogdHJ1ZSwgZGVmYXVsdDogMSB9KVxuICBxdWFudGl0eTogbnVtYmVyO1xuXG4gIEBwcm9wKHsgcmVxdWlyZWQ6IHRydWUgfSlcbiAgcHJpY2U6IG51bWJlcjtcblxuICBAcHJvcCh7IHJlcXVpcmVkOiBmYWxzZSB9KVxuICBnZXQgdG90YWxJdGVtUHJpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpY2UgKiB0aGlzLnF1YW50aXR5O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBPcmRlciBleHRlbmRzIEJhc2VNb2RlbDxPcmRlcj4ge1xuICAvLyBAcHJvcCh7IHJlcXVpcmVkOiBmYWxzZSB9KVxuICAvLyByZWZlcmVuY2VOdW1iZXI6IHN0cmluZztcblxuICBAcHJvcCh7IHJlZjogVXNlciwgcmVxdWlyZWQ6IHRydWUgfSlcbiAgdXNlcjogUmVmPFVzZXI+O1xuXG4gIEBhcnJheVByb3AoeyBpdGVtczogUHJvZHVjdEl0ZW0gfSlcbiAgYmFza2V0OiBQcm9kdWN0SXRlbVtdO1xuXG4gIEBwcm9wKHsgcmVmOiBDb3Vwb24sIHJlcXVpcmVkOiBmYWxzZSB9KVxuICBjb3Vwb246IFJlZjxDb3Vwb24+O1xuXG4gIEBwcm9wKHsgcmVxdWlyZWQ6IHRydWUgfSlcbiAgYWRkcmVzczogc3RyaW5nO1xuXG4gIEBwcm9wKHsgZW51bTogT3JkZXJMZXZlbCwgZGVmYXVsdDogT3JkZXJMZXZlbC5DcmVhdGVkIH0pXG4gIHN0YXR1czogT3JkZXJMZXZlbDtcblxuICBAcHJvcCh7IHJlcXVpcmVkOiB0cnVlIH0pXG4gIHRvdGFsOiBudW1iZXI7XG5cbiAgQHByb3AoeyByZXF1aXJlZDogZmFsc2UgfSlcbiAgbm90ZTogc3RyaW5nO1xuXG4gIHN0YXRpYyBnZXQgbW9kZWwoKTogTW9kZWxUeXBlPE9yZGVyPiB7XG4gICAgcmV0dXJuIG5ldyBPcmRlcigpLmdldE1vZGVsRm9yQ2xhc3MoT3JkZXIsIHsgc2NoZW1hT3B0aW9ucyB9KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbW9kZWxOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubW9kZWwubW9kZWxOYW1lO1xuICB9XG59XG4iXX0=