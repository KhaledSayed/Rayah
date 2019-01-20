"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const product_model_1 = require("./models/product.model");
const mongoose_1 = require("@nestjs/mongoose");
const multer_1 = require("multer");
const path_1 = require("path");
const unique_code_1 = require("../shared/validators/product/unique-code");
const valid_order_validator_1 = require("../shared/validators/orders/valid-order.validator");
const valid_product_validator_1 = require("../shared/validators/product/valid-product.validator");
const is_applicable_validator_1 = require("../shared/validators/product/is-applicable.validator");
const review_model_1 = require("review/models/review.model");
const review_service_1 = require("review/review.service");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        controllers: [product_controller_1.ProductController],
        exports: [product_service_1.ProductService],
        providers: [
            product_service_1.ProductService,
            unique_code_1.IsProductUnique,
            valid_order_validator_1.CheckOrderValidation,
            valid_product_validator_1.CheckProductValidity,
            is_applicable_validator_1.CheckProductQuantity,
            review_service_1.ReviewService,
        ],
        imports: [
            common_1.MulterModule.register({
                storage: multer_1.diskStorage({
                    destination: './uploads',
                    filename: (req, file, cb) => {
                        const randomName = Array(32)
                            .fill(null)
                            .map(() => Math.round(Math.random() * 16).toString(16))
                            .join('');
                        cb(null, `${randomName}${path_1.extname(file.originalname)}`);
                    },
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: product_model_1.Product.modelName,
                    schema: product_model_1.Product.model.schema,
                },
                {
                    name: review_model_1.Review.modelName,
                    schema: review_model_1.Review.model.schema,
                },
            ]),
        ],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L3Byb2R1Y3QubW9kdWxlLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3Byb2R1Y3QvcHJvZHVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwyQ0FBc0Q7QUFDdEQsNkRBQXlEO0FBQ3pELHVEQUFtRDtBQUNuRCwwREFBaUQ7QUFDakQsK0NBQWtEO0FBQ2xELG1DQUFxQztBQUNyQywrQkFBK0I7QUFDL0IsMEVBR2tEO0FBQ2xELDZGQUF5RjtBQUN6RixrR0FHOEQ7QUFDOUQsa0dBQTRGO0FBRTVGLDZEQUFvRDtBQUNwRCwwREFBc0Q7QUF3Q3RELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FBRyxDQUFBO0FBQWhCLGFBQWE7SUF0Q3pCLGVBQU0sQ0FBQztRQUNOLFdBQVcsRUFBRSxDQUFDLHNDQUFpQixDQUFDO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLGdDQUFjLENBQUM7UUFDekIsU0FBUyxFQUFFO1lBQ1QsZ0NBQWM7WUFDZCw2QkFBZTtZQUNmLDRDQUFvQjtZQUNwQiw4Q0FBb0I7WUFDcEIsOENBQW9CO1lBQ3BCLDhCQUFhO1NBQ2Q7UUFDRCxPQUFPLEVBQUU7WUFDUCxxQkFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLG9CQUFXLENBQUM7b0JBQ25CLFdBQVcsRUFBRSxXQUFXO29CQUN4QixRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFO3dCQUUxQixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDOzZCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDOzZCQUNWLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7NkJBQ3RELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFFWixFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsVUFBVSxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN6RCxDQUFDO2lCQUNGLENBQUM7YUFDSCxDQUFDO1lBQ0YseUJBQWMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3hCO29CQUNFLElBQUksRUFBRSx1QkFBTyxDQUFDLFNBQVM7b0JBQ3ZCLE1BQU0sRUFBRSx1QkFBTyxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUM3QjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUscUJBQU0sQ0FBQyxTQUFTO29CQUN0QixNQUFNLEVBQUUscUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtpQkFDNUI7YUFDRixDQUFDO1NBQ0g7S0FDRixDQUFDO0dBQ1csYUFBYSxDQUFHO0FBQWhCLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlLCBNdWx0ZXJNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQcm9kdWN0Q29udHJvbGxlciB9IGZyb20gJy4vcHJvZHVjdC5jb250cm9sbGVyJztcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSAnLi9wcm9kdWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4vbW9kZWxzL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgTW9uZ29vc2VNb2R1bGUgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IGRpc2tTdG9yYWdlIH0gZnJvbSAnbXVsdGVyJztcbmltcG9ydCB7IGV4dG5hbWUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7XG4gIElzUHJvZHVjdFVuaXF1ZSxcbiAgaXNVbmlxdWVQcm9kdWN0Q29kZSxcbn0gZnJvbSAnLi4vc2hhcmVkL3ZhbGlkYXRvcnMvcHJvZHVjdC91bmlxdWUtY29kZSc7XG5pbXBvcnQgeyBDaGVja09yZGVyVmFsaWRhdGlvbiB9IGZyb20gJy4uL3NoYXJlZC92YWxpZGF0b3JzL29yZGVycy92YWxpZC1vcmRlci52YWxpZGF0b3InO1xuaW1wb3J0IHtcbiAgSXNQcm9kdWN0VmFsaWQsXG4gIENoZWNrUHJvZHVjdFZhbGlkaXR5LFxufSBmcm9tICcuLi9zaGFyZWQvdmFsaWRhdG9ycy9wcm9kdWN0L3ZhbGlkLXByb2R1Y3QudmFsaWRhdG9yJztcbmltcG9ydCB7IENoZWNrUHJvZHVjdFF1YW50aXR5IH0gZnJvbSAnLi4vc2hhcmVkL3ZhbGlkYXRvcnMvcHJvZHVjdC9pcy1hcHBsaWNhYmxlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDaGVja0l0ZW1WYWxpZGl0eSB9IGZyb20gJy4uL3NoYXJlZC92YWxpZGF0b3JzL3NsaWRlci9pcy1pdGVtLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBSZXZpZXcgfSBmcm9tICdyZXZpZXcvbW9kZWxzL3Jldmlldy5tb2RlbCc7XG5pbXBvcnQgeyBSZXZpZXdTZXJ2aWNlIH0gZnJvbSAncmV2aWV3L3Jldmlldy5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUHJvZHVjdENvbnRyb2xsZXJdLFxuICBleHBvcnRzOiBbUHJvZHVjdFNlcnZpY2VdLFxuICBwcm92aWRlcnM6IFtcbiAgICBQcm9kdWN0U2VydmljZSxcbiAgICBJc1Byb2R1Y3RVbmlxdWUsXG4gICAgQ2hlY2tPcmRlclZhbGlkYXRpb24sXG4gICAgQ2hlY2tQcm9kdWN0VmFsaWRpdHksXG4gICAgQ2hlY2tQcm9kdWN0UXVhbnRpdHksXG4gICAgUmV2aWV3U2VydmljZSxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE11bHRlck1vZHVsZS5yZWdpc3Rlcih7XG4gICAgICBzdG9yYWdlOiBkaXNrU3RvcmFnZSh7XG4gICAgICAgIGRlc3RpbmF0aW9uOiAnLi91cGxvYWRzJyxcbiAgICAgICAgZmlsZW5hbWU6IChyZXEsIGZpbGUsIGNiKSA9PiB7XG4gICAgICAgICAgLy8gR2VuZXJhdGluZyBhIDMyIHJhbmRvbSBjaGFycyBsb25nIHN0cmluZ1xuICAgICAgICAgIGNvbnN0IHJhbmRvbU5hbWUgPSBBcnJheSgzMilcbiAgICAgICAgICAgIC5maWxsKG51bGwpXG4gICAgICAgICAgICAubWFwKCgpID0+IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDE2KS50b1N0cmluZygxNikpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgICAgICAgLy9DYWxsaW5nIHRoZSBjYWxsYmFjayBwYXNzaW5nIHRoZSByYW5kb20gbmFtZSBnZW5lcmF0ZWQgd2l0aCB0aGUgb3JpZ2luYWwgZXh0ZW5zaW9uIG5hbWVcbiAgICAgICAgICBjYihudWxsLCBgJHtyYW5kb21OYW1lfSR7ZXh0bmFtZShmaWxlLm9yaWdpbmFsbmFtZSl9YCk7XG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICB9KSxcbiAgICBNb25nb29zZU1vZHVsZS5mb3JGZWF0dXJlKFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogUHJvZHVjdC5tb2RlbE5hbWUsXG4gICAgICAgIHNjaGVtYTogUHJvZHVjdC5tb2RlbC5zY2hlbWEsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBSZXZpZXcubW9kZWxOYW1lLFxuICAgICAgICBzY2hlbWE6IFJldmlldy5tb2RlbC5zY2hlbWEsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0TW9kdWxlIHt9XG4iXX0=