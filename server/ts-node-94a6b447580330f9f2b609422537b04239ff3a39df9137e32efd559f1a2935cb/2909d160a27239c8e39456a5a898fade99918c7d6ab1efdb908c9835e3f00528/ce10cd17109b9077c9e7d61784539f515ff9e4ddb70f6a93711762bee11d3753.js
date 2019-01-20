"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const brand_controller_1 = require("./brand.controller");
const brand_service_1 = require("./brand.service");
const multer_1 = require("multer");
const path_1 = require("path");
const mongoose_1 = require("@nestjs/mongoose");
const brand_model_1 = require("./models/brand.model");
let BrandModule = class BrandModule {
};
BrandModule = __decorate([
    common_1.Module({
        controllers: [brand_controller_1.BrandController],
        providers: [brand_service_1.BrandService],
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
                    name: brand_model_1.Brand.modelName,
                    schema: brand_model_1.Brand.model.schema,
                },
            ]),
        ],
    })
], BrandModule);
exports.BrandModule = BrandModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9icmFuZC9icmFuZC5tb2R1bGUudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvYnJhbmQvYnJhbmQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMkNBQXNEO0FBQ3RELHlEQUFxRDtBQUNyRCxtREFBK0M7QUFDL0MsbUNBQXFDO0FBQ3JDLCtCQUErQjtBQUMvQiwrQ0FBa0Q7QUFDbEQsc0RBQTZDO0FBNEI3QyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0NBQUcsQ0FBQTtBQUFkLFdBQVc7SUExQnZCLGVBQU0sQ0FBQztRQUNOLFdBQVcsRUFBRSxDQUFDLGtDQUFlLENBQUM7UUFDOUIsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztRQUN6QixPQUFPLEVBQUU7WUFDUCxxQkFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLG9CQUFXLENBQUM7b0JBQ25CLFdBQVcsRUFBRSxXQUFXO29CQUN4QixRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFO3dCQUUxQixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDOzZCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDOzZCQUNWLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7NkJBQ3RELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFFWixFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsVUFBVSxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN6RCxDQUFDO2lCQUNGLENBQUM7YUFDSCxDQUFDO1lBQ0YseUJBQWMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3hCO29CQUNFLElBQUksRUFBRSxtQkFBSyxDQUFDLFNBQVM7b0JBQ3JCLE1BQU0sRUFBRSxtQkFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNO2lCQUMzQjthQUNGLENBQUM7U0FDSDtLQUNGLENBQUM7R0FDVyxXQUFXLENBQUc7QUFBZCxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSwgTXVsdGVyTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQnJhbmRDb250cm9sbGVyIH0gZnJvbSAnLi9icmFuZC5jb250cm9sbGVyJztcbmltcG9ydCB7IEJyYW5kU2VydmljZSB9IGZyb20gJy4vYnJhbmQuc2VydmljZSc7XG5pbXBvcnQgeyBkaXNrU3RvcmFnZSB9IGZyb20gJ211bHRlcic7XG5pbXBvcnQgeyBleHRuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBNb25nb29zZU1vZHVsZSB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuaW1wb3J0IHsgQnJhbmQgfSBmcm9tICcuL21vZGVscy9icmFuZC5tb2RlbCc7XG5cbkBNb2R1bGUoe1xuICBjb250cm9sbGVyczogW0JyYW5kQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW0JyYW5kU2VydmljZV0sXG4gIGltcG9ydHM6IFtcbiAgICBNdWx0ZXJNb2R1bGUucmVnaXN0ZXIoe1xuICAgICAgc3RvcmFnZTogZGlza1N0b3JhZ2Uoe1xuICAgICAgICBkZXN0aW5hdGlvbjogJy4vdXBsb2FkcycsXG4gICAgICAgIGZpbGVuYW1lOiAocmVxLCBmaWxlLCBjYikgPT4ge1xuICAgICAgICAgIC8vIEdlbmVyYXRpbmcgYSAzMiByYW5kb20gY2hhcnMgbG9uZyBzdHJpbmdcbiAgICAgICAgICBjb25zdCByYW5kb21OYW1lID0gQXJyYXkoMzIpXG4gICAgICAgICAgICAuZmlsbChudWxsKVxuICAgICAgICAgICAgLm1hcCgoKSA9PiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxNikudG9TdHJpbmcoMTYpKVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgICAgICAgIC8vQ2FsbGluZyB0aGUgY2FsbGJhY2sgcGFzc2luZyB0aGUgcmFuZG9tIG5hbWUgZ2VuZXJhdGVkIHdpdGggdGhlIG9yaWdpbmFsIGV4dGVuc2lvbiBuYW1lXG4gICAgICAgICAgY2IobnVsbCwgYCR7cmFuZG9tTmFtZX0ke2V4dG5hbWUoZmlsZS5vcmlnaW5hbG5hbWUpfWApO1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgfSksXG4gICAgTW9uZ29vc2VNb2R1bGUuZm9yRmVhdHVyZShbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IEJyYW5kLm1vZGVsTmFtZSxcbiAgICAgICAgc2NoZW1hOiBCcmFuZC5tb2RlbC5zY2hlbWEsXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBCcmFuZE1vZHVsZSB7fVxuIl19