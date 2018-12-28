"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./category.service");
const mongoose_1 = require("@nestjs/mongoose");
const multer_1 = require("multer");
const path_1 = require("path");
const category_model_1 = require("./models/category.model");
const category_exists_validator_1 = require("../shared/validators/category/category-exists.validator");
const is_item_validator_1 = require("../shared/validators/slider/is-item.validator");
const product_service_1 = require("../product/product.service");
const product_model_1 = require("../product/models/product.model");
let CategoryModule = class CategoryModule {
};
CategoryModule = __decorate([
    common_1.Module({
        controllers: [category_controller_1.CategoryController],
        providers: [
            category_service_1.CategoryService,
            category_exists_validator_1.IsCategoryExist,
            product_service_1.ProductService,
            is_item_validator_1.CheckItemValidity,
        ],
        exports: [category_service_1.CategoryService],
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
                    name: category_model_1.Category.modelName,
                    schema: category_model_1.Category.model.schema,
                },
                {
                    name: product_model_1.Product.modelName,
                    schema: product_model_1.Product.model.schema,
                },
            ]),
        ],
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9jYXRlZ29yeS9jYXRlZ29yeS5tb2R1bGUudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvY2F0ZWdvcnkvY2F0ZWdvcnkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMkNBQXNEO0FBQ3RELCtEQUEyRDtBQUMzRCx5REFBcUQ7QUFDckQsK0NBQWtEO0FBQ2xELG1DQUFxQztBQUNyQywrQkFBK0I7QUFDL0IsNERBQW1EO0FBRW5ELHVHQUEwRjtBQUMxRixxRkFBa0Y7QUFDbEYsZ0VBQTREO0FBRTVELG1FQUEwRDtBQXNDMUQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUFHLENBQUE7QUFBakIsY0FBYztJQXBDMUIsZUFBTSxDQUFDO1FBQ04sV0FBVyxFQUFFLENBQUMsd0NBQWtCLENBQUM7UUFDakMsU0FBUyxFQUFFO1lBQ1Qsa0NBQWU7WUFDZiwyQ0FBZTtZQUNmLGdDQUFjO1lBQ2QscUNBQWlCO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFLENBQUMsa0NBQWUsQ0FBQztRQUMxQixPQUFPLEVBQUU7WUFDUCxxQkFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLG9CQUFXLENBQUM7b0JBQ25CLFdBQVcsRUFBRSxXQUFXO29CQUN4QixRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFO3dCQUUxQixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDOzZCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDOzZCQUNWLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7NkJBQ3RELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFFWixFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsVUFBVSxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN6RCxDQUFDO2lCQUNGLENBQUM7YUFDSCxDQUFDO1lBQ0YseUJBQWMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3hCO29CQUNFLElBQUksRUFBRSx5QkFBUSxDQUFDLFNBQVM7b0JBQ3hCLE1BQU0sRUFBRSx5QkFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUM5QjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsdUJBQU8sQ0FBQyxTQUFTO29CQUN2QixNQUFNLEVBQUUsdUJBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTTtpQkFDN0I7YUFDRixDQUFDO1NBQ0g7S0FDRixDQUFDO0dBQ1csY0FBYyxDQUFHO0FBQWpCLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlLCBNdWx0ZXJNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDYXRlZ29yeUNvbnRyb2xsZXIgfSBmcm9tICcuL2NhdGVnb3J5LmNvbnRyb2xsZXInO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi9jYXRlZ29yeS5zZXJ2aWNlJztcbmltcG9ydCB7IE1vbmdvb3NlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBkaXNrU3RvcmFnZSB9IGZyb20gJ211bHRlcic7XG5pbXBvcnQgeyBleHRuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJy4vbW9kZWxzL2NhdGVnb3J5Lm1vZGVsJztcbmltcG9ydCB7IEJyYW5kU2VydmljZSB9IGZyb20gJy4uL2JyYW5kL2JyYW5kLnNlcnZpY2UnO1xuaW1wb3J0IHsgSXNDYXRlZ29yeUV4aXN0IH0gZnJvbSAnLi4vc2hhcmVkL3ZhbGlkYXRvcnMvY2F0ZWdvcnkvY2F0ZWdvcnktZXhpc3RzLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDaGVja0l0ZW1WYWxpZGl0eSB9IGZyb20gJy4uL3NoYXJlZC92YWxpZGF0b3JzL3NsaWRlci9pcy1pdGVtLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gJy4uL3Byb2R1Y3QvcHJvZHVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y3RNb2R1bGUgfSBmcm9tICcuLi9wcm9kdWN0L3Byb2R1Y3QubW9kdWxlJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuLi9wcm9kdWN0L21vZGVscy9wcm9kdWN0Lm1vZGVsJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbQ2F0ZWdvcnlDb250cm9sbGVyXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ2F0ZWdvcnlTZXJ2aWNlLFxuICAgIElzQ2F0ZWdvcnlFeGlzdCxcbiAgICBQcm9kdWN0U2VydmljZSxcbiAgICBDaGVja0l0ZW1WYWxpZGl0eSxcbiAgXSxcbiAgZXhwb3J0czogW0NhdGVnb3J5U2VydmljZV0sXG4gIGltcG9ydHM6IFtcbiAgICBNdWx0ZXJNb2R1bGUucmVnaXN0ZXIoe1xuICAgICAgc3RvcmFnZTogZGlza1N0b3JhZ2Uoe1xuICAgICAgICBkZXN0aW5hdGlvbjogJy4vdXBsb2FkcycsXG4gICAgICAgIGZpbGVuYW1lOiAocmVxLCBmaWxlLCBjYikgPT4ge1xuICAgICAgICAgIC8vIEdlbmVyYXRpbmcgYSAzMiByYW5kb20gY2hhcnMgbG9uZyBzdHJpbmdcbiAgICAgICAgICBjb25zdCByYW5kb21OYW1lID0gQXJyYXkoMzIpXG4gICAgICAgICAgICAuZmlsbChudWxsKVxuICAgICAgICAgICAgLm1hcCgoKSA9PiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxNikudG9TdHJpbmcoMTYpKVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICAgIC8vQ2FsbGluZyB0aGUgY2FsbGJhY2sgcGFzc2luZyB0aGUgcmFuZG9tIG5hbWUgZ2VuZXJhdGVkIHdpdGggdGhlIG9yaWdpbmFsIGV4dGVuc2lvbiBuYW1lXG4gICAgICAgICAgY2IobnVsbCwgYCR7cmFuZG9tTmFtZX0ke2V4dG5hbWUoZmlsZS5vcmlnaW5hbG5hbWUpfWApO1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgfSksXG4gICAgTW9uZ29vc2VNb2R1bGUuZm9yRmVhdHVyZShbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IENhdGVnb3J5Lm1vZGVsTmFtZSxcbiAgICAgICAgc2NoZW1hOiBDYXRlZ29yeS5tb2RlbC5zY2hlbWEsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiBQcm9kdWN0Lm1vZGVsTmFtZSxcbiAgICAgICAgc2NoZW1hOiBQcm9kdWN0Lm1vZGVsLnNjaGVtYSxcbiAgICAgIH0sXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENhdGVnb3J5TW9kdWxlIHt9XG4iXX0=