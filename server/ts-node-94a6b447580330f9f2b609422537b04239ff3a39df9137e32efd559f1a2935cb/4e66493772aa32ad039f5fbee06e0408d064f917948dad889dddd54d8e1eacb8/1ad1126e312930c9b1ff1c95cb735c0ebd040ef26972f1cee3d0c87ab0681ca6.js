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
            ]),
        ],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L3Byb2R1Y3QubW9kdWxlLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3Byb2R1Y3QvcHJvZHVjdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwyQ0FBc0Q7QUFDdEQsNkRBQXlEO0FBQ3pELHVEQUFtRDtBQUNuRCwwREFBaUQ7QUFDakQsK0NBQWtEO0FBQ2xELG1DQUFxQztBQUNyQywrQkFBK0I7QUFDL0IsMEVBR2tEO0FBQ2xELDZGQUF5RjtBQUN6RixrR0FHOEQ7QUFDOUQsa0dBQTRGO0FBb0M1RixJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQUcsQ0FBQTtBQUFoQixhQUFhO0lBakN6QixlQUFNLENBQUM7UUFDTixXQUFXLEVBQUUsQ0FBQyxzQ0FBaUIsQ0FBQztRQUNoQyxPQUFPLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDO1FBQ3pCLFNBQVMsRUFBRTtZQUNULGdDQUFjO1lBQ2QsNkJBQWU7WUFDZiw0Q0FBb0I7WUFDcEIsOENBQW9CO1lBQ3BCLDhDQUFvQjtTQUNyQjtRQUNELE9BQU8sRUFBRTtZQUNQLHFCQUFZLENBQUMsUUFBUSxDQUFDO2dCQUNwQixPQUFPLEVBQUUsb0JBQVcsQ0FBQztvQkFDbkIsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUU7d0JBRTFCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7NkJBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUM7NkJBQ1YsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzs2QkFDdEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUVaLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxVQUFVLEdBQUcsY0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3pELENBQUM7aUJBQ0YsQ0FBQzthQUNILENBQUM7WUFDRix5QkFBYyxDQUFDLFVBQVUsQ0FBQztnQkFDeEI7b0JBQ0UsSUFBSSxFQUFFLHVCQUFPLENBQUMsU0FBUztvQkFDdkIsTUFBTSxFQUFFLHVCQUFPLENBQUMsS0FBSyxDQUFDLE1BQU07aUJBQzdCO2FBQ0YsQ0FBQztTQUNIO0tBQ0YsQ0FBQztHQUNXLGFBQWEsQ0FBRztBQUFoQixzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSwgTXVsdGVyTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUHJvZHVjdENvbnRyb2xsZXIgfSBmcm9tICcuL3Byb2R1Y3QuY29udHJvbGxlcic7XG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gJy4vcHJvZHVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuL21vZGVscy9wcm9kdWN0Lm1vZGVsJztcbmltcG9ydCB7IE1vbmdvb3NlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBkaXNrU3RvcmFnZSB9IGZyb20gJ211bHRlcic7XG5pbXBvcnQgeyBleHRuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQge1xuICBJc1Byb2R1Y3RVbmlxdWUsXG4gIGlzVW5pcXVlUHJvZHVjdENvZGUsXG59IGZyb20gJy4uL3NoYXJlZC92YWxpZGF0b3JzL3Byb2R1Y3QvdW5pcXVlLWNvZGUnO1xuaW1wb3J0IHsgQ2hlY2tPcmRlclZhbGlkYXRpb24gfSBmcm9tICcuLi9zaGFyZWQvdmFsaWRhdG9ycy9vcmRlcnMvdmFsaWQtb3JkZXIudmFsaWRhdG9yJztcbmltcG9ydCB7XG4gIElzUHJvZHVjdFZhbGlkLFxuICBDaGVja1Byb2R1Y3RWYWxpZGl0eSxcbn0gZnJvbSAnLi4vc2hhcmVkL3ZhbGlkYXRvcnMvcHJvZHVjdC92YWxpZC1wcm9kdWN0LnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDaGVja1Byb2R1Y3RRdWFudGl0eSB9IGZyb20gJy4uL3NoYXJlZC92YWxpZGF0b3JzL3Byb2R1Y3QvaXMtYXBwbGljYWJsZS52YWxpZGF0b3InO1xuaW1wb3J0IHsgQ2hlY2tJdGVtVmFsaWRpdHkgfSBmcm9tICcuLi9zaGFyZWQvdmFsaWRhdG9ycy9zbGlkZXIvaXMtaXRlbS52YWxpZGF0b3InO1xuXG5ATW9kdWxlKHtcbiAgY29udHJvbGxlcnM6IFtQcm9kdWN0Q29udHJvbGxlcl0sXG4gIGV4cG9ydHM6IFtQcm9kdWN0U2VydmljZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIFByb2R1Y3RTZXJ2aWNlLFxuICAgIElzUHJvZHVjdFVuaXF1ZSxcbiAgICBDaGVja09yZGVyVmFsaWRhdGlvbixcbiAgICBDaGVja1Byb2R1Y3RWYWxpZGl0eSxcbiAgICBDaGVja1Byb2R1Y3RRdWFudGl0eSxcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE11bHRlck1vZHVsZS5yZWdpc3Rlcih7XG4gICAgICBzdG9yYWdlOiBkaXNrU3RvcmFnZSh7XG4gICAgICAgIGRlc3RpbmF0aW9uOiAnLi91cGxvYWRzJyxcbiAgICAgICAgZmlsZW5hbWU6IChyZXEsIGZpbGUsIGNiKSA9PiB7XG4gICAgICAgICAgLy8gR2VuZXJhdGluZyBhIDMyIHJhbmRvbSBjaGFycyBsb25nIHN0cmluZ1xuICAgICAgICAgIGNvbnN0IHJhbmRvbU5hbWUgPSBBcnJheSgzMilcbiAgICAgICAgICAgIC5maWxsKG51bGwpXG4gICAgICAgICAgICAubWFwKCgpID0+IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDE2KS50b1N0cmluZygxNikpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgICAgICAgLy9DYWxsaW5nIHRoZSBjYWxsYmFjayBwYXNzaW5nIHRoZSByYW5kb20gbmFtZSBnZW5lcmF0ZWQgd2l0aCB0aGUgb3JpZ2luYWwgZXh0ZW5zaW9uIG5hbWVcbiAgICAgICAgICBjYihudWxsLCBgJHtyYW5kb21OYW1lfSR7ZXh0bmFtZShmaWxlLm9yaWdpbmFsbmFtZSl9YCk7XG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICB9KSxcbiAgICBNb25nb29zZU1vZHVsZS5mb3JGZWF0dXJlKFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogUHJvZHVjdC5tb2RlbE5hbWUsXG4gICAgICAgIHNjaGVtYTogUHJvZHVjdC5tb2RlbC5zY2hlbWEsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0TW9kdWxlIHt9XG4iXX0=