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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const brand_model_1 = require("./models/brand.model");
const mapper_service_1 = require("../shared/mapper/mapper.service");
const base_service_1 = require("../shared/base.service");
let BrandService = class BrandService extends base_service_1.BaseService {
    constructor(_brandModel, _mapperService) {
        super();
        this._brandModel = _brandModel;
        this._mapperService = _mapperService;
        this._model = _brandModel;
        this._mapper = _mapperService.mapper;
    }
    onCreateBrand(brandParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBrand = new this._model();
            newBrand.name = brandParam.name;
            newBrand.logo = brandParam.logo;
            try {
                const result = yield this.create(newBrand);
                const brandVm = yield this.map(result.toJSON());
                return brandVm;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
BrandService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(brand_model_1.Brand.modelName)),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService])
], BrandService);
exports.BrandService = BrandService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9icmFuZC9icmFuZC5zZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL2JyYW5kL2JyYW5kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUF1RTtBQUN2RSwrQ0FBK0M7QUFDL0Msc0RBQTZDO0FBRTdDLG9FQUFnRTtBQUNoRSx5REFBcUQ7QUFLckQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLDBCQUFrQjtJQUNsRCxZQUVtQixXQUE2QixFQUM3QixjQUE2QjtRQUU5QyxLQUFLLEVBQUUsQ0FBQztRQUhTLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUc5QyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFDdkMsQ0FBQztJQUVLLGFBQWEsQ0FBQyxVQUFzQjs7WUFDeEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFbkMsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUVoQyxJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFVLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUV6RCxPQUFPLE9BQU8sQ0FBQzthQUNoQjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE1BQU0sSUFBSSxzQkFBYSxDQUFDLENBQUMsRUFBRSxtQkFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDOUQ7UUFDSCxDQUFDO0tBQUE7Q0FDRixDQUFBO0FBMUJZLFlBQVk7SUFEeEIsbUJBQVUsRUFBRTtJQUdSLFdBQUEsc0JBQVcsQ0FBQyxtQkFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBOzZDQUVJLDhCQUFhO0dBSnJDLFlBQVksQ0EwQnhCO0FBMUJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSHR0cEV4Y2VwdGlvbiwgSHR0cFN0YXR1cyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEluamVjdE1vZGVsIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBCcmFuZCB9IGZyb20gJy4vbW9kZWxzL2JyYW5kLm1vZGVsJztcbmltcG9ydCB7IE1vZGVsVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyBNYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL21hcHBlci9tYXBwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnJhbmRWbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL2JyYW5kLXZtLm1vZGVsJztcbmltcG9ydCB7IEJyYW5kUGFyYW0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9icmFuZC1wYXJhbS5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcmFuZFNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZTxCcmFuZD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0TW9kZWwoQnJhbmQubW9kZWxOYW1lKVxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2JyYW5kTW9kZWw6IE1vZGVsVHlwZTxCcmFuZD4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWFwcGVyU2VydmljZTogTWFwcGVyU2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9tb2RlbCA9IF9icmFuZE1vZGVsO1xuICAgIHRoaXMuX21hcHBlciA9IF9tYXBwZXJTZXJ2aWNlLm1hcHBlcjtcbiAgfVxuXG4gIGFzeW5jIG9uQ3JlYXRlQnJhbmQoYnJhbmRQYXJhbTogQnJhbmRQYXJhbSk6IFByb21pc2U8QnJhbmRWbT4ge1xuICAgIGNvbnN0IG5ld0JyYW5kID0gbmV3IHRoaXMuX21vZGVsKCk7XG5cbiAgICBuZXdCcmFuZC5uYW1lID0gYnJhbmRQYXJhbS5uYW1lO1xuICAgIG5ld0JyYW5kLmxvZ28gPSBicmFuZFBhcmFtLmxvZ287XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jcmVhdGUobmV3QnJhbmQpO1xuICAgICAgY29uc3QgYnJhbmRWbSA9IGF3YWl0IHRoaXMubWFwPEJyYW5kVm0+KHJlc3VsdC50b0pTT04oKSk7XG5cbiAgICAgIHJldHVybiBicmFuZFZtO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==