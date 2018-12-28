"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const mongoose_1 = require("@nestjs/mongoose");
const order_model_1 = require("./models/order.model");
const product_service_1 = require("../product/product.service");
const product_model_1 = require("../product/models/product.model");
const coupon_model_1 = require("../coupon/models/coupon.model");
const coupon_service_1 = require("../coupon/coupon.service");
const user_model_1 = require("../user/models/user.model");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    common_1.Module({
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, product_service_1.ProductService, coupon_service_1.CouponService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: order_model_1.Order.modelName,
                    schema: order_model_1.Order.model.schema,
                },
                {
                    name: coupon_model_1.Coupon.modelName,
                    schema: coupon_model_1.Coupon.model.schema,
                },
                {
                    name: product_model_1.Product.modelName,
                    schema: product_model_1.Product.model.schema,
                },
                {
                    name: user_model_1.User.modelName,
                    schema: user_model_1.User.model.schema,
                },
            ]),
        ],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9vcmRlci5tb2R1bGUudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvb3JkZXIvb3JkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMkNBQW9EO0FBQ3BELHlEQUFxRDtBQUNyRCxtREFBK0M7QUFDL0MsK0NBQWtEO0FBQ2xELHNEQUE2QztBQUM3QyxnRUFBNEQ7QUFDNUQsbUVBQTBEO0FBQzFELGdFQUF1RDtBQUN2RCw2REFBeUQ7QUFHekQsMERBQWlEO0FBMEJqRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0NBQUcsQ0FBQTtBQUFkLFdBQVc7SUF4QnZCLGVBQU0sQ0FBQztRQUNOLFdBQVcsRUFBRSxDQUFDLGtDQUFlLENBQUM7UUFDOUIsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSxnQ0FBYyxFQUFFLDhCQUFhLENBQUM7UUFDeEQsT0FBTyxFQUFFO1lBQ1AseUJBQWMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3hCO29CQUNFLElBQUksRUFBRSxtQkFBSyxDQUFDLFNBQVM7b0JBQ3JCLE1BQU0sRUFBRSxtQkFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUMzQjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUscUJBQU0sQ0FBQyxTQUFTO29CQUN0QixNQUFNLEVBQUUscUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtpQkFDNUI7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLHVCQUFPLENBQUMsU0FBUztvQkFDdkIsTUFBTSxFQUFFLHVCQUFPLENBQUMsS0FBSyxDQUFDLE1BQU07aUJBQzdCO2dCQUNEO29CQUNFLElBQUksRUFBRSxpQkFBSSxDQUFDLFNBQVM7b0JBQ3BCLE1BQU0sRUFBRSxpQkFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUMxQjthQUNGLENBQUM7U0FDSDtLQUNGLENBQUM7R0FDVyxXQUFXLENBQUc7QUFBZCxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSwgZm9yd2FyZFJlZiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE9yZGVyQ29udHJvbGxlciB9IGZyb20gJy4vb3JkZXIuY29udHJvbGxlcic7XG5pbXBvcnQgeyBPcmRlclNlcnZpY2UgfSBmcm9tICcuL29yZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9uZ29vc2VNb2R1bGUgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi9tb2RlbHMvb3JkZXIubW9kZWwnO1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tICcuLi9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSAnLi4vcHJvZHVjdC9tb2RlbHMvcHJvZHVjdC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vwb24gfSBmcm9tICcuLi9jb3Vwb24vbW9kZWxzL2NvdXBvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vwb25TZXJ2aWNlIH0gZnJvbSAnLi4vY291cG9uL2NvdXBvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y3RNb2R1bGUgfSBmcm9tICcuLi9wcm9kdWN0L3Byb2R1Y3QubW9kdWxlJztcbmltcG9ydCB7IENvdXBvbk1vZHVsZSB9IGZyb20gJy4uL2NvdXBvbi9jb3Vwb24ubW9kdWxlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2VyL21vZGVscy91c2VyLm1vZGVsJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbT3JkZXJDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbT3JkZXJTZXJ2aWNlLCBQcm9kdWN0U2VydmljZSwgQ291cG9uU2VydmljZV0sXG4gIGltcG9ydHM6IFtcbiAgICBNb25nb29zZU1vZHVsZS5mb3JGZWF0dXJlKFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogT3JkZXIubW9kZWxOYW1lLFxuICAgICAgICBzY2hlbWE6IE9yZGVyLm1vZGVsLnNjaGVtYSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6IENvdXBvbi5tb2RlbE5hbWUsXG4gICAgICAgIHNjaGVtYTogQ291cG9uLm1vZGVsLnNjaGVtYSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFByb2R1Y3QubW9kZWxOYW1lLFxuICAgICAgICBzY2hlbWE6IFByb2R1Y3QubW9kZWwuc2NoZW1hLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogVXNlci5tb2RlbE5hbWUsXG4gICAgICAgIHNjaGVtYTogVXNlci5tb2RlbC5zY2hlbWEsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlck1vZHVsZSB7fVxuIl19