"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const coupon_controller_1 = require("./coupon.controller");
const coupon_service_1 = require("./coupon.service");
const mongoose_1 = require("@nestjs/mongoose");
const coupon_model_1 = require("./models/coupon.model");
const unique_coupon_validator_1 = require("../shared/validators/coupons/unique-coupon.validator");
const valid_coupon_validator_1 = require("../shared/validators/orders/valid-coupon.validator");
let CouponModule = class CouponModule {
};
CouponModule = __decorate([
    common_1.Module({
        exports: [coupon_service_1.CouponService],
        controllers: [coupon_controller_1.CouponController],
        providers: [unique_coupon_validator_1.IsCouponUnique, coupon_service_1.CouponService, valid_coupon_validator_1.CheckCouponValidity],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: coupon_model_1.Coupon.modelName,
                    schema: coupon_model_1.Coupon.model.schema,
                },
            ]),
        ],
    })
], CouponModule);
exports.CouponModule = CouponModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vY291cG9uLm1vZHVsZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vY291cG9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QywyREFBdUQ7QUFDdkQscURBQWlEO0FBQ2pELCtDQUFrRDtBQUNsRCx3REFBK0M7QUFDL0Msa0dBRzhEO0FBQzlELCtGQUF5RjtBQWV6RixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUcsQ0FBQTtBQUFmLFlBQVk7SUFieEIsZUFBTSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsOEJBQWEsQ0FBQztRQUN4QixXQUFXLEVBQUUsQ0FBQyxvQ0FBZ0IsQ0FBQztRQUMvQixTQUFTLEVBQUUsQ0FBQyx3Q0FBYyxFQUFFLDhCQUFhLEVBQUUsNENBQW1CLENBQUM7UUFDL0QsT0FBTyxFQUFFO1lBQ1AseUJBQWMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3hCO29CQUNFLElBQUksRUFBRSxxQkFBTSxDQUFDLFNBQVM7b0JBQ3RCLE1BQU0sRUFBRSxxQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUM1QjthQUNGLENBQUM7U0FDSDtLQUNGLENBQUM7R0FDVyxZQUFZLENBQUc7QUFBZixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvdXBvbkNvbnRyb2xsZXIgfSBmcm9tICcuL2NvdXBvbi5jb250cm9sbGVyJztcbmltcG9ydCB7IENvdXBvblNlcnZpY2UgfSBmcm9tICcuL2NvdXBvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1vbmdvb3NlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBDb3Vwb24gfSBmcm9tICcuL21vZGVscy9jb3Vwb24ubW9kZWwnO1xuaW1wb3J0IHtcbiAgSXNDb3Vwb25VbmlxdWUsXG4gIElzVW5pcXVlQ291cG9uQ29kZSxcbn0gZnJvbSAnLi4vc2hhcmVkL3ZhbGlkYXRvcnMvY291cG9ucy91bmlxdWUtY291cG9uLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDaGVja0NvdXBvblZhbGlkaXR5IH0gZnJvbSAnLi4vc2hhcmVkL3ZhbGlkYXRvcnMvb3JkZXJzL3ZhbGlkLWNvdXBvbi52YWxpZGF0b3InO1xuXG5ATW9kdWxlKHtcbiAgZXhwb3J0czogW0NvdXBvblNlcnZpY2VdLFxuICBjb250cm9sbGVyczogW0NvdXBvbkNvbnRyb2xsZXJdLFxuICBwcm92aWRlcnM6IFtJc0NvdXBvblVuaXF1ZSwgQ291cG9uU2VydmljZSwgQ2hlY2tDb3Vwb25WYWxpZGl0eV0sXG4gIGltcG9ydHM6IFtcbiAgICBNb25nb29zZU1vZHVsZS5mb3JGZWF0dXJlKFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogQ291cG9uLm1vZGVsTmFtZSxcbiAgICAgICAgc2NoZW1hOiBDb3Vwb24ubW9kZWwuc2NoZW1hLFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ291cG9uTW9kdWxlIHt9XG4iXX0=