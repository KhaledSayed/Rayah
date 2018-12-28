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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXVFO0FBQ3ZFLHlEQUFxRDtBQUNyRCwwREFBaUQ7QUFDakQsK0NBQStDO0FBRS9DLG9FQUFnRTtBQUdoRSx1Q0FBaUM7QUFLakMsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLDBCQUFvQjtJQUN0RCxZQUNrQyxhQUFpQyxFQUNoRCxjQUE2QjtRQUU5QyxLQUFLLEVBQUUsQ0FBQztRQUZTLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBRzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVLLGVBQWUsQ0FBQyxhQUE0Qjs7WUFDaEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFbkMsVUFBVSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUN2QyxVQUFVLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDN0MsVUFBVSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3JDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUM3QyxVQUFVLENBQUMsUUFBUSxHQUFHLGdCQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUU3RCxJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDN0MsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFZLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUU3RCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE1BQU0sSUFBSSxzQkFBYSxDQUFDLENBQUMsRUFBRSxtQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3BEO1FBQ0gsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUNuQixPQUFPLEVBQ1AsYUFBK0I7O1lBRS9CLE9BQU8sQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUNsQyxPQUFPLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDcEMsT0FBTyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUNsQyxPQUFPLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDMUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxnQkFBSyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFMUQsSUFBSTtnQkFDRixNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFFOUQsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQVksY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDM0Q7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLElBQUksc0JBQWEsQ0FBQyxDQUFDLEVBQUUsbUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQztLQUFBO0NBQ0YsQ0FBQTtBQWpEWSxjQUFjO0lBRDFCLG1CQUFVLEVBQUU7SUFHUixXQUFBLHNCQUFXLENBQUMsdUJBQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQTs2Q0FDRSw4QkFBYTtHQUhyQyxjQUFjLENBaUQxQjtBQWpEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEh0dHBFeGNlcHRpb24sIEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4vbW9kZWxzL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgSW5qZWN0TW9kZWwgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IE1vZGVsVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyBNYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL21hcHBlci9tYXBwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWN0UGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvcHJvZHVjdC1wYXJhbXMubW9kZWwnO1xuaW1wb3J0IHsgUHJvZHVjdFZtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvcHJvZHVjdC12bS5tb2RlbCc7XG5pbXBvcnQgeyBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IFByb2R1Y3RQYXJhbXNQdXQgfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXBhcmFtcy1wdXQubW9kZWwnO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi9jYXRlZ29yeS9tb2RlbHMvY2F0ZWdvcnkubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJvZHVjdFNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZTxQcm9kdWN0PiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3RNb2RlbChQcm9kdWN0Lm1vZGVsTmFtZSkgX3Byb2R1Y3RNb2RlbDogTW9kZWxUeXBlPFByb2R1Y3Q+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX21hcHBlclNlcnZpY2U6IE1hcHBlclNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fbWFwcGVyID0gdGhpcy5fbWFwcGVyU2VydmljZS5tYXBwZXI7XG4gICAgdGhpcy5fbW9kZWwgPSBfcHJvZHVjdE1vZGVsO1xuICB9XG5cbiAgYXN5bmMgb25DcmVhdGVQcm9kdWN0KHByb2R1Y3RQYXJhbXM6IFByb2R1Y3RQYXJhbXMpOiBQcm9taXNlPFByb2R1Y3RWbT4ge1xuICAgIGxldCBuZXdQcm9kdWN0ID0gbmV3IHRoaXMuX21vZGVsKCk7XG5cbiAgICBuZXdQcm9kdWN0Lm5hbWUgPSBwcm9kdWN0UGFyYW1zLm5hbWU7XG4gICAgbmV3UHJvZHVjdC5wcmljZSA9IHByb2R1Y3RQYXJhbXMucHJpY2U7XG4gICAgbmV3UHJvZHVjdC5xdWFudGl0eSA9IHByb2R1Y3RQYXJhbXMucXVhbnRpdHk7XG4gICAgbmV3UHJvZHVjdC5jb2RlID0gcHJvZHVjdFBhcmFtcy5jb2RlO1xuICAgIG5ld1Byb2R1Y3QuZmVhdHVyZWQgPSBwcm9kdWN0UGFyYW1zLmZlYXR1cmVkO1xuICAgIG5ld1Byb2R1Y3QuY2F0ZWdvcnkgPSBUeXBlcy5PYmplY3RJZChwcm9kdWN0UGFyYW1zLmNhdGVnb3J5KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNyZWF0ZShuZXdQcm9kdWN0KTtcbiAgICAgIGNvbnN0IHByb2R1Y3RWbSA9IGF3YWl0IHRoaXMubWFwPFByb2R1Y3RWbT4ocmVzdWx0LnRvSlNPTigpKTtcblxuICAgICAgcmV0dXJuIHByb2R1Y3RWbTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBvblVwZGF0ZVByb2R1Y3QoXG4gICAgcHJvZHVjdCxcbiAgICBwcm9kdWN0UGFyYW1zOiBQcm9kdWN0UGFyYW1zUHV0LFxuICApOiBQcm9taXNlPFByb2R1Y3RWbT4ge1xuICAgIHByb2R1Y3QubmFtZSA9IHByb2R1Y3RQYXJhbXMubmFtZTtcbiAgICBwcm9kdWN0LnByaWNlID0gcHJvZHVjdFBhcmFtcy5wcmljZTtcbiAgICBwcm9kdWN0LnF1YW50aXR5ID0gcHJvZHVjdFBhcmFtcy5xdWFudGl0eTtcbiAgICBwcm9kdWN0LmNvZGUgPSBwcm9kdWN0UGFyYW1zLmNvZGU7XG4gICAgcHJvZHVjdC5mZWF0dXJlZCA9IHByb2R1Y3RQYXJhbXMuZmVhdHVyZWQ7XG4gICAgcHJvZHVjdC5jYXRlZ29yeSA9IFR5cGVzLk9iamVjdElkKHByb2R1Y3RQYXJhbXMuY2F0ZWdvcnkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRQcm9kdWN0ID0gYXdhaXQgdGhpcy51cGRhdGUocHJvZHVjdC5pZCwgcHJvZHVjdCk7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLm1hcDxQcm9kdWN0Vm0+KHVwZGF0ZWRQcm9kdWN0LnRvSlNPTigpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG59XG4iXX0=