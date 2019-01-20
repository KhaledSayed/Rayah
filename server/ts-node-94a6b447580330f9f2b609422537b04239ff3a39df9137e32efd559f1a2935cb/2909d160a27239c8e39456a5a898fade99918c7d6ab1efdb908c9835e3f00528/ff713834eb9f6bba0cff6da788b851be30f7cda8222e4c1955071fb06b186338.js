"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const review_controller_1 = require("./review.controller");
const review_service_1 = require("./review.service");
const mongoose_1 = require("@nestjs/mongoose");
const review_model_1 = require("./models/review.model");
const product_model_1 = require("product/models/product.model");
const product_service_1 = require("product/product.service");
let ReviewModule = class ReviewModule {
};
ReviewModule = __decorate([
    common_1.Module({
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService, product_service_1.ProductService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: review_model_1.Review.modelName,
                    schema: review_model_1.Review.model.schema,
                },
                {
                    name: product_model_1.Product.modelName,
                    schema: product_model_1.Product.model.schema,
                },
            ]),
        ],
    })
], ReviewModule);
exports.ReviewModule = ReviewModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvcmV2aWV3Lm1vZHVsZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvcmV2aWV3Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QywyREFBdUQ7QUFDdkQscURBQWlEO0FBQ2pELCtDQUFrRDtBQUNsRCx3REFBK0M7QUFDL0MsZ0VBQXVEO0FBQ3ZELDZEQUF5RDtBQWtCekQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQUFHLENBQUE7QUFBZixZQUFZO0lBaEJ4QixlQUFNLENBQUM7UUFDTixXQUFXLEVBQUUsQ0FBQyxvQ0FBZ0IsQ0FBQztRQUMvQixTQUFTLEVBQUUsQ0FBQyw4QkFBYSxFQUFFLGdDQUFjLENBQUM7UUFDMUMsT0FBTyxFQUFFO1lBQ1AseUJBQWMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3hCO29CQUNFLElBQUksRUFBRSxxQkFBTSxDQUFDLFNBQVM7b0JBQ3RCLE1BQU0sRUFBRSxxQkFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUM1QjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsdUJBQU8sQ0FBQyxTQUFTO29CQUN2QixNQUFNLEVBQUUsdUJBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTTtpQkFDN0I7YUFDRixDQUFDO1NBQ0g7S0FDRixDQUFDO0dBQ1csWUFBWSxDQUFHO0FBQWYsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXZpZXdDb250cm9sbGVyIH0gZnJvbSAnLi9yZXZpZXcuY29udHJvbGxlcic7XG5pbXBvcnQgeyBSZXZpZXdTZXJ2aWNlIH0gZnJvbSAnLi9yZXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBNb25nb29zZU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuaW1wb3J0IHsgUmV2aWV3IH0gZnJvbSAnLi9tb2RlbHMvcmV2aWV3Lm1vZGVsJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICdwcm9kdWN0L21vZGVscy9wcm9kdWN0Lm1vZGVsJztcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSAncHJvZHVjdC9wcm9kdWN0LnNlcnZpY2UnO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtSZXZpZXdDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbUmV2aWV3U2VydmljZSwgUHJvZHVjdFNlcnZpY2VdLFxuICBpbXBvcnRzOiBbXG4gICAgTW9uZ29vc2VNb2R1bGUuZm9yRmVhdHVyZShbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFJldmlldy5tb2RlbE5hbWUsXG4gICAgICAgIHNjaGVtYTogUmV2aWV3Lm1vZGVsLnNjaGVtYSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFByb2R1Y3QubW9kZWxOYW1lLFxuICAgICAgICBzY2hlbWE6IFByb2R1Y3QubW9kZWwuc2NoZW1hLFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUmV2aWV3TW9kdWxlIHt9XG4iXX0=