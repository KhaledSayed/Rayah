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
const base_service_1 = require("../shared/base.service");
const product_model_1 = require("./models/product.model");
const mongoose_1 = require("@nestjs/mongoose");
const mapper_service_1 = require("../shared/mapper/mapper.service");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService extends base_service_1.BaseService {
    constructor(_productModel, _mapperService) {
        super();
        this._mapperService = _mapperService;
        this._mapper = this._mapperService.mapper;
        this._model = _productModel;
    }
    onCreateProduct(productParams) {
        return __awaiter(this, void 0, void 0, function* () {
            let newProduct = new this._model();
            newProduct.name = productParams.name;
            newProduct.price = productParams.price;
            newProduct.quantity = productParams.quantity;
            newProduct.code = productParams.code;
            newProduct.featured = productParams.featured;
            newProduct.category = mongoose_2.Types.ObjectId(productParams.category);
            newProduct.brand = mongoose_2.Types.ObjectId(productParams.brand);
            newProduct.description = productParams.description;
            try {
                const result = yield this.create(newProduct);
                const productVm = yield this.map(result.toJSON());
                return productVm;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    onUpdateProduct(product, productParams) {
        return __awaiter(this, void 0, void 0, function* () {
            product.name = productParams.name;
            product.price = productParams.price;
            product.quantity = productParams.quantity;
            product.code = productParams.code;
            product.featured = productParams.featured;
            product.category = mongoose_2.Types.ObjectId(productParams.category);
            product.brand = mongoose_2.Types.ObjectId(productParams.brand);
            product.description = productParams.description;
            try {
                const updatedProduct = yield this.update(product.id, product);
                return yield this.map(updatedProduct.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(product_model_1.Product.modelName)),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXVFO0FBQ3ZFLHlEQUFxRDtBQUNyRCwwREFBaUQ7QUFDakQsK0NBQStDO0FBRS9DLG9FQUFnRTtBQUdoRSx1Q0FBaUM7QUFLakMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLDBCQUFvQjtJQUN0RCxZQUNrQyxhQUFpQyxFQUNoRCxjQUE2QjtRQUU5QyxLQUFLLEVBQUUsQ0FBQztRQUZTLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBRzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVLLGVBQWUsQ0FBQyxhQUE0Qjs7WUFDaEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFbkMsVUFBVSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUN2QyxVQUFVLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDN0MsVUFBVSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUM3QyxVQUFVLENBQUMsUUFBUSxHQUFHLGdCQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxVQUFVLENBQUMsS0FBSyxHQUFHLGdCQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxVQUFVLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFFbkQsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBWSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFN0QsT0FBTyxTQUFTLENBQUM7YUFDbEI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLElBQUksc0JBQWEsQ0FBQyxDQUFDLEVBQUUsbUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNwRDtRQUNILENBQUM7S0FBQTtJQUVLLGVBQWUsQ0FDbkIsT0FBTyxFQUNQLGFBQStCOztZQUUvQixPQUFPLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDbEMsT0FBTyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUMxQyxPQUFPLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDbEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsZ0JBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFELE9BQU8sQ0FBQyxLQUFLLEdBQUcsZ0JBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUVoRCxJQUFJO2dCQUNGLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUU5RCxPQUFPLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBWSxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUMzRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE1BQU0sSUFBSSxzQkFBYSxDQUFDLENBQUMsRUFBRSxtQkFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDOUQ7UUFDSCxDQUFDO0tBQUE7Q0FDRixDQUFBO0FBckRZLGNBQWM7SUFEMUIsbUJBQVUsRUFBRTtJQUdSLFdBQUEsc0JBQVcsQ0FBQyx1QkFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBOzZDQUNFLDhCQUFhO0dBSHJDLGNBQWMsQ0FxRDFCO0FBckRZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSHR0cEV4Y2VwdGlvbiwgSHR0cFN0YXR1cyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSAnLi9tb2RlbHMvcHJvZHVjdC5tb2RlbCc7XG5pbXBvcnQgeyBJbmplY3RNb2RlbCB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuaW1wb3J0IHsgTW9kZWxUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IE1hcHBlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbWFwcGVyL21hcHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y3RQYXJhbXMgfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXBhcmFtcy5tb2RlbCc7XG5pbXBvcnQgeyBQcm9kdWN0Vm0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXZtLm1vZGVsJztcbmltcG9ydCB7IFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgUHJvZHVjdFBhcmFtc1B1dCB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3Byb2R1Y3QtcGFyYW1zLXB1dC5tb2RlbCc7XG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJy4uL2NhdGVnb3J5L21vZGVscy9jYXRlZ29yeS5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlPFByb2R1Y3Q+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdE1vZGVsKFByb2R1Y3QubW9kZWxOYW1lKSBfcHJvZHVjdE1vZGVsOiBNb2RlbFR5cGU8UHJvZHVjdD4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWFwcGVyU2VydmljZTogTWFwcGVyU2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9tYXBwZXIgPSB0aGlzLl9tYXBwZXJTZXJ2aWNlLm1hcHBlcjtcbiAgICB0aGlzLl9tb2RlbCA9IF9wcm9kdWN0TW9kZWw7XG4gIH1cblxuICBhc3luYyBvbkNyZWF0ZVByb2R1Y3QocHJvZHVjdFBhcmFtczogUHJvZHVjdFBhcmFtcyk6IFByb21pc2U8UHJvZHVjdFZtPiB7XG4gICAgbGV0IG5ld1Byb2R1Y3QgPSBuZXcgdGhpcy5fbW9kZWwoKTtcblxuICAgIG5ld1Byb2R1Y3QubmFtZSA9IHByb2R1Y3RQYXJhbXMubmFtZTtcbiAgICBuZXdQcm9kdWN0LnByaWNlID0gcHJvZHVjdFBhcmFtcy5wcmljZTtcbiAgICBuZXdQcm9kdWN0LnF1YW50aXR5ID0gcHJvZHVjdFBhcmFtcy5xdWFudGl0eTtcbiAgICBuZXdQcm9kdWN0LmNvZGUgPSBwcm9kdWN0UGFyYW1zLmNvZGU7XG4gICAgbmV3UHJvZHVjdC5mZWF0dXJlZCA9IHByb2R1Y3RQYXJhbXMuZmVhdHVyZWQ7XG4gICAgbmV3UHJvZHVjdC5jYXRlZ29yeSA9IFR5cGVzLk9iamVjdElkKHByb2R1Y3RQYXJhbXMuY2F0ZWdvcnkpO1xuICAgIG5ld1Byb2R1Y3QuYnJhbmQgPSBUeXBlcy5PYmplY3RJZChwcm9kdWN0UGFyYW1zLmJyYW5kKTtcbiAgICBuZXdQcm9kdWN0LmRlc2NyaXB0aW9uID0gcHJvZHVjdFBhcmFtcy5kZXNjcmlwdGlvbjtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNyZWF0ZShuZXdQcm9kdWN0KTtcbiAgICAgIGNvbnN0IHByb2R1Y3RWbSA9IGF3YWl0IHRoaXMubWFwPFByb2R1Y3RWbT4ocmVzdWx0LnRvSlNPTigpKTtcblxuICAgICAgcmV0dXJuIHByb2R1Y3RWbTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBvblVwZGF0ZVByb2R1Y3QoXG4gICAgcHJvZHVjdCxcbiAgICBwcm9kdWN0UGFyYW1zOiBQcm9kdWN0UGFyYW1zUHV0LFxuICApOiBQcm9taXNlPFByb2R1Y3RWbT4ge1xuICAgIHByb2R1Y3QubmFtZSA9IHByb2R1Y3RQYXJhbXMubmFtZTtcbiAgICBwcm9kdWN0LnByaWNlID0gcHJvZHVjdFBhcmFtcy5wcmljZTtcbiAgICBwcm9kdWN0LnF1YW50aXR5ID0gcHJvZHVjdFBhcmFtcy5xdWFudGl0eTtcbiAgICBwcm9kdWN0LmNvZGUgPSBwcm9kdWN0UGFyYW1zLmNvZGU7XG4gICAgcHJvZHVjdC5mZWF0dXJlZCA9IHByb2R1Y3RQYXJhbXMuZmVhdHVyZWQ7XG4gICAgcHJvZHVjdC5jYXRlZ29yeSA9IFR5cGVzLk9iamVjdElkKHByb2R1Y3RQYXJhbXMuY2F0ZWdvcnkpO1xuICAgIHByb2R1Y3QuYnJhbmQgPSBUeXBlcy5PYmplY3RJZChwcm9kdWN0UGFyYW1zLmJyYW5kKTtcbiAgICBwcm9kdWN0LmRlc2NyaXB0aW9uID0gcHJvZHVjdFBhcmFtcy5kZXNjcmlwdGlvbjtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cGRhdGVkUHJvZHVjdCA9IGF3YWl0IHRoaXMudXBkYXRlKHByb2R1Y3QuaWQsIHByb2R1Y3QpO1xuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5tYXA8UHJvZHVjdFZtPih1cGRhdGVkUHJvZHVjdC50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxufVxuIl19