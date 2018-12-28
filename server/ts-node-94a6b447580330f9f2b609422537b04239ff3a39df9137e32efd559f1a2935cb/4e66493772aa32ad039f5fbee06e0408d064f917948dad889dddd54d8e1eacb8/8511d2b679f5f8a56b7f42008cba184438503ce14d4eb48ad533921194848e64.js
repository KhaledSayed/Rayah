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
var AppModule_1;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const shared_module_1 = require("./shared/shared.module");
const configuration_service_1 = require("./shared/configuration/configuration.service");
const configuration_enum_1 = require("./shared/configuration/configuration.enum");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const todo_module_1 = require("./todo/todo.module");
const todo_service_1 = require("./todo.service");
const category_module_1 = require("./category/category.module");
const category_service_1 = require("./category/category.service");
const product_module_1 = require("./product/product.module");
const brand_module_1 = require("./brand/brand.module");
const slider_module_1 = require("./slider/slider.module");
const coupon_module_1 = require("./coupon/coupon.module");
const order_module_1 = require("./order/order.module");
const review_module_1 = require("./review/review.module");
const brand_service_1 = require("./brand/brand.service");
const coupon_service_1 = require("./coupon/coupon.service");
const product_service_1 = require("./product/product.service");
const order_service_1 = require("./order/order.service");
const slider_service_1 = require("./slider/slider.service");
let AppModule = AppModule_1 = class AppModule {
    constructor(_configurationService) {
        this._configurationService = _configurationService;
        AppModule_1.port = AppModule_1.normalizePort(_configurationService.get(configuration_enum_1.Configuration.PORT));
        AppModule_1.host = _configurationService.get(configuration_enum_1.Configuration.HOST);
        AppModule_1.isDev = _configurationService.isDevelopment;
    }
    static normalizePort(param) {
        const portNumber = typeof param === 'string' ? parseInt(param, 10) : param;
        if (isNaN(portNumber))
            return param;
        else if (portNumber >= 0)
            return portNumber;
    }
};
AppModule = AppModule_1 = __decorate([
    common_1.Module({
        imports: [
            shared_module_1.SharedModule,
            mongoose_1.MongooseModule.forRoot(configuration_service_1.ConfigurationService.connectionString, {
                useNewUrlParser: true,
            }),
            user_module_1.UserModule,
            todo_module_1.TodoModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            brand_module_1.BrandModule,
            slider_module_1.SliderModule,
            coupon_module_1.CouponModule,
            order_module_1.OrderModule,
            review_module_1.ReviewModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            todo_service_1.TodoService,
            brand_service_1.BrandService,
            category_service_1.CategoryService,
            coupon_service_1.CouponService,
            product_service_1.ProductService,
            order_service_1.OrderService,
            slider_service_1.SliderService,
        ],
    }),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9hcHAubW9kdWxlLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL2FwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXdDO0FBQ3hDLHFEQUFpRDtBQUNqRCwrQ0FBMkM7QUFDM0MsMERBQXNEO0FBQ3RELHdGQUFvRjtBQUNwRixrRkFBMEU7QUFDMUUsK0NBQWtEO0FBQ2xELG9EQUFnRDtBQUNoRCxvREFBZ0Q7QUFDaEQsaURBQTZDO0FBQzdDLGdFQUE0RDtBQUM1RCxrRUFBOEQ7QUFDOUQsNkRBQXlEO0FBQ3pELHVEQUFtRDtBQUNuRCwwREFBc0Q7QUFDdEQsMERBQXNEO0FBQ3RELHVEQUFtRDtBQUNuRCwwREFBc0Q7QUFDdEQseURBQXFEO0FBQ3JELDREQUF3RDtBQUV4RCwrREFBMkQ7QUFDM0QseURBQXFEO0FBQ3JELDREQUF3RDtBQThCeEQsSUFBYSxTQUFTLGlCQUF0QixNQUFhLFNBQVM7SUFLcEIsWUFBNkIscUJBQTJDO1FBQTNDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7UUFDdEUsV0FBUyxDQUFDLElBQUksR0FBRyxXQUFTLENBQUMsYUFBYSxDQUN0QyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsa0NBQWEsQ0FBQyxJQUFJLENBQUMsQ0FDOUMsQ0FBQztRQUVGLFdBQVMsQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLGtDQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0QsV0FBUyxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxhQUFhLENBQUM7SUFDeEQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBc0I7UUFDakQsTUFBTSxVQUFVLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFFM0UsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7YUFDL0IsSUFBSSxVQUFVLElBQUksQ0FBQztZQUFFLE9BQU8sVUFBVSxDQUFDO0lBQzlDLENBQUM7Q0FDRixDQUFBO0FBckJZLFNBQVM7SUE1QnJCLGVBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNQLDRCQUFZO1lBQ1oseUJBQWMsQ0FBQyxPQUFPLENBQUMsNENBQW9CLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzVELGVBQWUsRUFBRSxJQUFJO2FBQ3RCLENBQUM7WUFDRix3QkFBVTtZQUNWLHdCQUFVO1lBQ1YsZ0NBQWM7WUFDZCw4QkFBYTtZQUNiLDBCQUFXO1lBQ1gsNEJBQVk7WUFDWiw0QkFBWTtZQUNaLDBCQUFXO1lBQ1gsNEJBQVk7U0FDYjtRQUNELFdBQVcsRUFBRSxDQUFDLDhCQUFhLENBQUM7UUFDNUIsU0FBUyxFQUFFO1lBQ1Qsd0JBQVU7WUFDViwwQkFBVztZQUNYLDRCQUFZO1lBQ1osa0NBQWU7WUFDZiw4QkFBYTtZQUNiLGdDQUFjO1lBQ2QsNEJBQVk7WUFDWiw4QkFBYTtTQUNkO0tBQ0YsQ0FBQztxQ0FNb0QsNENBQW9CO0dBTDdELFNBQVMsQ0FxQnJCO0FBckJZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQXBwQ29udHJvbGxlciB9IGZyb20gJy4vYXBwLmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgQXBwU2VydmljZSB9IGZyb20gJy4vYXBwLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vc2hhcmVkL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24gfSBmcm9tICcuL3NoYXJlZC9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uZW51bSc7XG5pbXBvcnQgeyBNb25nb29zZU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuaW1wb3J0IHsgVXNlck1vZHVsZSB9IGZyb20gJy4vdXNlci91c2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBUb2RvTW9kdWxlIH0gZnJvbSAnLi90b2RvL3RvZG8ubW9kdWxlJztcbmltcG9ydCB7IFRvZG9TZXJ2aWNlIH0gZnJvbSAnLi90b2RvLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlNb2R1bGUgfSBmcm9tICcuL2NhdGVnb3J5L2NhdGVnb3J5Lm1vZHVsZSc7XG5pbXBvcnQgeyBDYXRlZ29yeVNlcnZpY2UgfSBmcm9tICcuL2NhdGVnb3J5L2NhdGVnb3J5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjdE1vZHVsZSB9IGZyb20gJy4vcHJvZHVjdC9wcm9kdWN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBCcmFuZE1vZHVsZSB9IGZyb20gJy4vYnJhbmQvYnJhbmQubW9kdWxlJztcbmltcG9ydCB7IFNsaWRlck1vZHVsZSB9IGZyb20gJy4vc2xpZGVyL3NsaWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgQ291cG9uTW9kdWxlIH0gZnJvbSAnLi9jb3Vwb24vY291cG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBPcmRlck1vZHVsZSB9IGZyb20gJy4vb3JkZXIvb3JkZXIubW9kdWxlJztcbmltcG9ydCB7IFJldmlld01vZHVsZSB9IGZyb20gJy4vcmV2aWV3L3Jldmlldy5tb2R1bGUnO1xuaW1wb3J0IHsgQnJhbmRTZXJ2aWNlIH0gZnJvbSAnLi9icmFuZC9icmFuZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvdXBvblNlcnZpY2UgfSBmcm9tICcuL2NvdXBvbi9jb3Vwb24uc2VydmljZSc7XG5pbXBvcnQgeyBJc1VuaXF1ZUNvdXBvbkNvZGUgfSBmcm9tICcuL3NoYXJlZC92YWxpZGF0b3JzL2NvdXBvbnMvdW5pcXVlLWNvdXBvbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tICcuL3Byb2R1Y3QvcHJvZHVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyU2VydmljZSB9IGZyb20gJy4vb3JkZXIvb3JkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTbGlkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zbGlkZXIvc2xpZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tJdGVtVmFsaWRpdHkgfSBmcm9tICcuL3NoYXJlZC92YWxpZGF0b3JzL3NsaWRlci9pcy1pdGVtLnZhbGlkYXRvcic7XG5ATW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBNb25nb29zZU1vZHVsZS5mb3JSb290KENvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbm5lY3Rpb25TdHJpbmcsIHtcbiAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcbiAgICB9KSxcbiAgICBVc2VyTW9kdWxlLFxuICAgIFRvZG9Nb2R1bGUsXG4gICAgQ2F0ZWdvcnlNb2R1bGUsXG4gICAgUHJvZHVjdE1vZHVsZSxcbiAgICBCcmFuZE1vZHVsZSxcbiAgICBTbGlkZXJNb2R1bGUsXG4gICAgQ291cG9uTW9kdWxlLFxuICAgIE9yZGVyTW9kdWxlLFxuICAgIFJldmlld01vZHVsZSxcbiAgXSxcbiAgY29udHJvbGxlcnM6IFtBcHBDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQXBwU2VydmljZSxcbiAgICBUb2RvU2VydmljZSxcbiAgICBCcmFuZFNlcnZpY2UsXG4gICAgQ2F0ZWdvcnlTZXJ2aWNlLFxuICAgIENvdXBvblNlcnZpY2UsXG4gICAgUHJvZHVjdFNlcnZpY2UsXG4gICAgT3JkZXJTZXJ2aWNlLFxuICAgIFNsaWRlclNlcnZpY2UsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7XG4gIHN0YXRpYyBob3N0OiBzdHJpbmc7XG4gIHN0YXRpYyBwb3J0OiBzdHJpbmcgfCBudW1iZXI7XG4gIHN0YXRpYyBpc0RldjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IF9jb25maWd1cmF0aW9uU2VydmljZTogQ29uZmlndXJhdGlvblNlcnZpY2UpIHtcbiAgICBBcHBNb2R1bGUucG9ydCA9IEFwcE1vZHVsZS5ub3JtYWxpemVQb3J0KFxuICAgICAgX2NvbmZpZ3VyYXRpb25TZXJ2aWNlLmdldChDb25maWd1cmF0aW9uLlBPUlQpLFxuICAgICk7XG5cbiAgICBBcHBNb2R1bGUuaG9zdCA9IF9jb25maWd1cmF0aW9uU2VydmljZS5nZXQoQ29uZmlndXJhdGlvbi5IT1NUKTtcblxuICAgIEFwcE1vZHVsZS5pc0RldiA9IF9jb25maWd1cmF0aW9uU2VydmljZS5pc0RldmVsb3BtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgbm9ybWFsaXplUG9ydChwYXJhbTogc3RyaW5nIHwgbnVtYmVyKTogbnVtYmVyIHwgc3RyaW5nIHtcbiAgICBjb25zdCBwb3J0TnVtYmVyID0gdHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KHBhcmFtLCAxMCkgOiBwYXJhbTtcblxuICAgIGlmIChpc05hTihwb3J0TnVtYmVyKSkgcmV0dXJuIHBhcmFtO1xuICAgIGVsc2UgaWYgKHBvcnROdW1iZXIgPj0gMCkgcmV0dXJuIHBvcnROdW1iZXI7XG4gIH1cbn1cbiJdfQ==