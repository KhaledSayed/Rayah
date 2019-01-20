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
const product_service_1 = require("./product.service");
const product_params_model_1 = require("./models/view-models/product-params.model");
const product_vm_model_1 = require("./models/view-models/product-vm.model");
const lodash_1 = require("lodash");
const product_params_put_model_1 = require("./models/view-models/product-params-put.model");
const swagger_1 = require("@nestjs/swagger");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const product_model_1 = require("./models/product.model");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
const mongoose_1 = require("mongoose");
const to_int_pipe_1 = require("../shared/pipes/to-int.pipe");
const to_boolean_pipe_1 = require("../shared/pipes/to-boolean.pipe");
const user_role_enum_1 = require("../user/models/user-role.enum");
const review_service_1 = require("review/review.service");
let ProductController = class ProductController {
    constructor(_prodcutService, _reviewService) {
        this._prodcutService = _prodcutService;
        this._reviewService = _reviewService;
    }
    get(categories, page, perPage, minPrice, maxPrice, featured, search) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(categories);
            let priceQuery = [];
            let featuredQuery = [];
            let categoriesQuery = [];
            let categoriesArray = null;
            let searchQuery = {};
            console.log('Search query', search);
            if (search !== undefined) {
                searchQuery = { firstName: { $regex: `^${search}.*`, $options: 'i' } };
            }
            if (categories !== undefined) {
                categoriesArray = categories.split(',');
                console.log(categoriesArray);
                categoriesArray.forEach(item => {
                    categoriesQuery.push({
                        category: mongoose_1.Types.ObjectId(item),
                    });
                });
            }
            if (minPrice) {
            }
            if (maxPrice) {
                priceQuery.push({
                    price: { $gte: maxPrice },
                });
            }
            if (featured) {
                featuredQuery.push({ featured: featured });
            }
            let productQuery = {};
            if (categoriesQuery.length != 0) {
                productQuery = {
                    $and: [
                        { $or: [...categoriesQuery] },
                        ...priceQuery,
                        ...featuredQuery,
                        searchQuery,
                    ],
                };
            }
            if (productQuery['$and'] && productQuery['$and'].length == 0) {
                productQuery = {};
            }
            const products = yield this._prodcutService.findAll(productQuery, ['coupon', 'category', 'brand'], page, perPage);
            let productsVm = this._prodcutService.map(lodash_1.map(products, product => product.toJSON()), true);
            let productsArray = [];
            let final = [];
            yield productsVm.then(items => {
                productsArray = items;
            });
            const arrayOfPromises = [];
            for (let product of productsArray) {
                const avg = this._reviewService.productRatingAverage(product.id);
                arrayOfPromises.push(avg);
            }
            return Promise.all(arrayOfPromises).then(values => {
                values.forEach((item, index) => {
                    productsArray[index].rating = item;
                });
                return productsVm;
            });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this._prodcutService.findById(id, [
                'category',
                'brand',
                'coupon',
            ]);
            if (!product) {
                throw new common_1.HttpException('Resource Not Found', common_1.HttpStatus.NOT_FOUND);
            }
            return this._prodcutService.map(product.toJSON());
        });
    }
    post(productParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code, category, brand } = productParams;
                console.log(code, category, brand);
                const product = yield this._prodcutService.onCreateProduct(productParams);
                return product;
            }
            catch (e) {
                console.log(e);
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    put(id, productParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this._prodcutService.findById(id);
            if (!product) {
                throw new common_1.HttpException('Resource Not Found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                const updatedProduct = yield this._prodcutService.onUpdateProduct(product, productParams);
                return updatedProduct;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    postThumbnail(id, banner) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            if (!banner || !banner.path) {
                throw new common_1.HttpException('Thumbnail is Required', common_1.HttpStatus.BAD_REQUEST);
            }
            const product = yield this._prodcutService.findById(id);
            if (!product) {
                throw new common_1.HttpException('Resource Not Found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                product.thumbnail = banner.path;
                const newProduct = yield this._prodcutService.update(id, product);
                return this._prodcutService.map(newProduct.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    postGallery(id, gallery) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            console.log('Gallery:', gallery);
            if (!gallery) {
                throw new common_1.HttpException('Gallery is Required', common_1.HttpStatus.BAD_REQUEST);
            }
            const product = yield this._prodcutService.findById(id);
            if (!product) {
                throw new common_1.HttpException('Resource Not Found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                gallery.forEach(element => {
                    product.gallery.push(element.path);
                });
                const newProduct = yield this._prodcutService.update(id, product);
                return this._prodcutService.map(newProduct.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this._prodcutService.findById(id);
            if (!product) {
                throw new common_1.HttpException('Resource Not Found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                const deletedProduct = yield this._prodcutService.delete(id);
                return yield this._prodcutService.map(deletedProduct.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deleteFromGallery(id, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this._prodcutService.findById(id);
            if (!product) {
                throw new common_1.HttpException('Resource Not Found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                const intIndex = parseInt(index);
                console.log(product.gallery.length - 1);
                console.log(intIndex);
                if (product.gallery.length - 1 >= intIndex) {
                    product.gallery.splice(intIndex, 1);
                }
                else {
                    throw new common_1.HttpException('Index out of range', common_1.HttpStatus.NOT_ACCEPTABLE);
                }
            }
            catch (e) {
                throw new common_1.HttpException('index is NaN', common_1.HttpStatus.BAD_REQUEST);
            }
            try {
                const newProduct = yield this._prodcutService.update(id, product);
                return yield this._prodcutService.map(newProduct.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: product_vm_model_1.ProductVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(product_model_1.Product.modelName, 'Get')),
    swagger_1.ApiImplicitQuery({
        name: 'page',
        required: true,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({ name: 'perPage', required: true, type: Number }),
    swagger_1.ApiImplicitQuery({
        name: 'category',
        isArray: true,
        required: false,
    }),
    swagger_1.ApiImplicitQuery({ name: 'minPrice', isArray: false, required: false }),
    swagger_1.ApiImplicitQuery({ name: 'maxPrice', isArray: false, required: false }),
    swagger_1.ApiImplicitQuery({ name: 'featured', isArray: false, required: false }),
    swagger_1.ApiImplicitQuery({ name: 'searchQuery', isArray: false, required: false }),
    __param(0, common_1.Query('category')),
    __param(1, common_1.Query('page', new to_int_pipe_1.ToInt())),
    __param(2, common_1.Query('perPage', new to_int_pipe_1.ToInt())),
    __param(3, common_1.Query('minPrice', new to_int_pipe_1.ToInt())),
    __param(4, common_1.Query('maxPrice', new to_int_pipe_1.ToInt())),
    __param(5, common_1.Query('featured', new to_boolean_pipe_1.ToBooleanPipe())),
    __param(6, common_1.Query('searchQuery')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Number, Boolean, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(product_model_1.Product.modelName, 'GetOne')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_params_model_1.ProductParams]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "post", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(product_model_1.Product.modelName, 'Put')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, product_params_put_model_1.ProductParamsPut]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "put", null);
__decorate([
    common_1.Put(':id/thumbnail'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(product_model_1.Product.modelName, 'CreateThumbnail')),
    common_1.UseInterceptors(common_1.FileInterceptor('banner')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "postThumbnail", null);
__decorate([
    common_1.Put(':id/gallery'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(product_model_1.Product.modelName, 'Create Gallery')),
    common_1.UseInterceptors(common_1.FilesInterceptor('gallery[]')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.UploadedFiles()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "postGallery", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(product_model_1.Product.modelName, 'Delete')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
__decorate([
    common_1.Delete(':id/gallery/:index'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(product_model_1.Product.modelName, 'DeleteGalleryp')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('index')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteFromGallery", null);
ProductController = __decorate([
    common_1.Controller('products'),
    swagger_1.ApiUseTags(product_model_1.Product.modelName),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        review_service_1.ReviewService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L3Byb2R1Y3QuY29udHJvbGxlci50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L3Byb2R1Y3QuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBbUJ3QjtBQUN4Qix1REFBbUQ7QUFDbkQsb0ZBQTBFO0FBQzFFLDRFQUFrRTtBQUdsRSxtQ0FBNkI7QUFDN0IsNEZBQWlGO0FBQ2pGLDZDQU15QjtBQUN6Qix1RUFBNkQ7QUFDN0QsMkVBQXNFO0FBQ3RFLDBEQUFpRDtBQUNqRCwwRUFBNkQ7QUFDN0QsK0NBQTZDO0FBQzdDLDhEQUEwRDtBQUMxRCx1Q0FBaUM7QUFDakMsNkRBQW9EO0FBQ3BELHFFQUFnRTtBQUNoRSxrRUFBeUQ7QUFDekQsMERBQXNEO0FBS3RELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBQzVCLFlBQ21CLGVBQStCLEVBQy9CLGNBQTZCO1FBRDdCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtJQUM3QyxDQUFDO0lBcUJFLEdBQUcsQ0FDWSxVQUFrQixFQUNULElBQVksRUFDVCxPQUFlLEVBQ2QsUUFBZ0IsRUFDaEIsUUFBZ0IsRUFDUixRQUFpQixFQUNuQyxNQUFjOztZQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXhCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQztZQUMzQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEMs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b2xsZXIsXG4gIFBvc3QsXG4gIFVzZUludGVyY2VwdG9ycyxcbiAgRmlsZUludGVyY2VwdG9yLFxuICBGaWxlRmllbGRzSW50ZXJjZXB0b3IsXG4gIEJvZHksXG4gIFVwbG9hZGVkRmlsZXMsXG4gIEh0dHBFeGNlcHRpb24sXG4gIEh0dHBTdGF0dXMsXG4gIEZpbGVzSW50ZXJjZXB0b3IsXG4gIFBhcmFtLFxuICBVcGxvYWRlZEZpbGUsXG4gIFB1dCxcbiAgRGVsZXRlLFxuICBSZXMsXG4gIEdldCxcbiAgVXNlR3VhcmRzLFxuICBRdWVyeSxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tICcuL3Byb2R1Y3Quc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWN0UGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvcHJvZHVjdC1wYXJhbXMubW9kZWwnO1xuaW1wb3J0IHsgUHJvZHVjdFZtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvcHJvZHVjdC12bS5tb2RlbCc7XG5pbXBvcnQgeyBhcnJheVByb3AsIGluZGV4IH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgUHJvZHVjdFBhcmFtc1B1dCB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3Byb2R1Y3QtcGFyYW1zLXB1dC5tb2RlbCc7XG5pbXBvcnQge1xuICBBcGlSZXNwb25zZSxcbiAgQXBpT3BlcmF0aW9uLFxuICBBcGlJbXBsaWNpdFF1ZXJ5LFxuICBBcGlVc2VUYWdzLFxuICBBcGlCZWFyZXJBdXRoLFxufSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2FwaS1leGNlcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgR2V0T3BlcmF0aW9uSWQgfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2dldC1vcGVyYXRpb24taWQnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4vbW9kZWxzL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9zaGFyZWQvZGVjb3JhdG9ycy9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IFRvSW50IH0gZnJvbSAnLi4vc2hhcmVkL3BpcGVzL3RvLWludC5waXBlJztcbmltcG9ydCB7IFRvQm9vbGVhblBpcGUgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvdG8tYm9vbGVhbi5waXBlJztcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSAnLi4vdXNlci9tb2RlbHMvdXNlci1yb2xlLmVudW0nO1xuaW1wb3J0IHsgUmV2aWV3U2VydmljZSB9IGZyb20gJ3Jldmlldy9yZXZpZXcuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdwcm9kdWN0cycpXG5AQXBpVXNlVGFncyhQcm9kdWN0Lm1vZGVsTmFtZSlcbkBBcGlCZWFyZXJBdXRoKClcbmV4cG9ydCBjbGFzcyBQcm9kdWN0Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Byb2RjdXRTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9yZXZpZXdTZXJ2aWNlOiBSZXZpZXdTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogUHJvZHVjdFZtLCBpc0FycmF5OiB0cnVlIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoUHJvZHVjdC5tb2RlbE5hbWUsICdHZXQnKSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoe1xuICAgIG5hbWU6ICdwYWdlJyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0eXBlOiBOdW1iZXIsXG4gIH0pXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHsgbmFtZTogJ3BlclBhZ2UnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogTnVtYmVyIH0pXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHtcbiAgICBuYW1lOiAnY2F0ZWdvcnknLFxuICAgIGlzQXJyYXk6IHRydWUsXG4gICAgcmVxdWlyZWQ6IGZhbHNlLFxuICB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7IG5hbWU6ICdtaW5QcmljZScsIGlzQXJyYXk6IGZhbHNlLCByZXF1aXJlZDogZmFsc2UgfSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoeyBuYW1lOiAnbWF4UHJpY2UnLCBpc0FycmF5OiBmYWxzZSwgcmVxdWlyZWQ6IGZhbHNlIH0pXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHsgbmFtZTogJ2ZlYXR1cmVkJywgaXNBcnJheTogZmFsc2UsIHJlcXVpcmVkOiBmYWxzZSB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7IG5hbWU6ICdzZWFyY2hRdWVyeScsIGlzQXJyYXk6IGZhbHNlLCByZXF1aXJlZDogZmFsc2UgfSlcbiAgYXN5bmMgZ2V0KFxuICAgIEBRdWVyeSgnY2F0ZWdvcnknKSBjYXRlZ29yaWVzOiBzdHJpbmcsXG4gICAgQFF1ZXJ5KCdwYWdlJywgbmV3IFRvSW50KCkpIHBhZ2U6IG51bWJlcixcbiAgICBAUXVlcnkoJ3BlclBhZ2UnLCBuZXcgVG9JbnQoKSkgcGVyUGFnZTogbnVtYmVyLFxuICAgIEBRdWVyeSgnbWluUHJpY2UnLCBuZXcgVG9JbnQoKSkgbWluUHJpY2U6IG51bWJlcixcbiAgICBAUXVlcnkoJ21heFByaWNlJywgbmV3IFRvSW50KCkpIG1heFByaWNlOiBudW1iZXIsXG4gICAgQFF1ZXJ5KCdmZWF0dXJlZCcsIG5ldyBUb0Jvb2xlYW5QaXBlKCkpIGZlYXR1cmVkOiBib29sZWFuLFxuICAgIEBRdWVyeSgnc2VhcmNoUXVlcnknKSBzZWFyY2g6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxQcm9kdWN0Vm1bXT4ge1xuICAgIGNvbnNvbGUubG9nKGNhdGVnb3JpZXMpO1xuXG4gICAgbGV0IHByaWNlUXVlcnkgPSBbXTtcbiAgICBsZXQgZmVhdHVyZWRRdWVyeSA9IFtdO1xuICAgIGxldCBjYXRlZ29yaWVzUXVlcnkgPSBbXTtcbiAgICBsZXQgY2F0ZWdvcmllc0FycmF5ID0gbnVsbDtcbiAgICBsZXQgc2VhcmNoUXVlcnkgPSB7fTtcblxuICAgIGNvbnNvbGUubG9nKCdTZWFyY2ggcXVlcnknLCBzZWFyY2gpO1xuICAgIGlmIChzZWFyY2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2VhcmNoUXVlcnkgPSB7IGZpcnN0TmFtZTogeyAkcmVnZXg6IGBeJHtzZWFyY2h9LipgLCAkb3B0aW9uczogJ2knIH0gfTtcbiAgICB9XG5cbiAgICBpZiAoY2F0ZWdvcmllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjYXRlZ29yaWVzQXJyYXkgPSBjYXRlZ29yaWVzLnNwbGl0KCcsJyk7XG4gICAgICBjb25zb2xlLmxvZyhjYXRlZ29yaWVzQXJyYXkpO1xuXG4gICAgICBjYXRlZ29yaWVzQXJyYXkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgY2F0ZWdvcmllc1F1ZXJ5LnB1c2goe1xuICAgICAgICAgIGNhdGVnb3J5OiBUeXBlcy5PYmplY3RJZChpdGVtKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobWluUHJpY2UpIHtcbiAgICB9XG5cbiAgICBpZiAobWF4UHJpY2UpIHtcbiAgICAgIHByaWNlUXVlcnkucHVzaCh7XG4gICAgICAgIHByaWNlOiB7ICRndGU6IG1heFByaWNlIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmVhdHVyZWQpIHtcbiAgICAgIGZlYXR1cmVkUXVlcnkucHVzaCh7IGZlYXR1cmVkOiBmZWF0dXJlZCB9KTtcbiAgICB9XG5cbiAgICBsZXQgcHJvZHVjdFF1ZXJ5ID0ge307XG5cbiAgICBpZiAoY2F0ZWdvcmllc1F1ZXJ5Lmxlbmd0aCAhPSAwKSB7XG4gICAgICBwcm9kdWN0UXVlcnkgPSB7XG4gICAgICAgICRhbmQ6IFtcbiAgICAgICAgICB7ICRvcjogWy4uLmNhdGVnb3JpZXNRdWVyeV0gfSxcbiAgICAgICAgICAuLi5wcmljZVF1ZXJ5LFxuICAgICAgICAgIC4uLmZlYXR1cmVkUXVlcnksXG4gICAgICAgICAgc2VhcmNoUXVlcnksXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChwcm9kdWN0UXVlcnlbJyRhbmQnXSAmJiBwcm9kdWN0UXVlcnlbJyRhbmQnXS5sZW5ndGggPT0gMCkge1xuICAgICAgcHJvZHVjdFF1ZXJ5ID0ge307XG4gICAgfVxuXG4gICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCB0aGlzLl9wcm9kY3V0U2VydmljZS5maW5kQWxsKFxuICAgICAgcHJvZHVjdFF1ZXJ5LFxuICAgICAgWydjb3Vwb24nLCAnY2F0ZWdvcnknLCAnYnJhbmQnXSxcbiAgICAgIHBhZ2UsXG4gICAgICBwZXJQYWdlLFxuICAgICk7XG5cbiAgICBsZXQgcHJvZHVjdHNWbSA9IHRoaXMuX3Byb2RjdXRTZXJ2aWNlLm1hcDxQcm9kdWN0Vm1bXT4oXG4gICAgICBtYXAocHJvZHVjdHMsIHByb2R1Y3QgPT4gcHJvZHVjdC50b0pTT04oKSksXG4gICAgICB0cnVlLFxuICAgICk7XG5cbiAgICBsZXQgcHJvZHVjdHNBcnJheTogUHJvZHVjdFZtW10gPSBbXTtcbiAgICBsZXQgZmluYWwgPSBbXTtcbiAgICBhd2FpdCBwcm9kdWN0c1ZtLnRoZW4oaXRlbXMgPT4ge1xuICAgICAgcHJvZHVjdHNBcnJheSA9IGl0ZW1zO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXJyYXlPZlByb21pc2VzID0gW107XG4gICAgZm9yIChsZXQgcHJvZHVjdCBvZiBwcm9kdWN0c0FycmF5KSB7XG4gICAgICBjb25zdCBhdmcgPSB0aGlzLl9yZXZpZXdTZXJ2aWNlLnByb2R1Y3RSYXRpbmdBdmVyYWdlKHByb2R1Y3QuaWQpO1xuXG4gICAgICBhcnJheU9mUHJvbWlzZXMucHVzaChhdmcpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbChhcnJheU9mUHJvbWlzZXMpLnRoZW4odmFsdWVzID0+IHtcbiAgICAgIHZhbHVlcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBwcm9kdWN0c0FycmF5W2luZGV4XS5yYXRpbmcgPSBpdGVtO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBwcm9kdWN0c1ZtO1xuICAgIH0pO1xuICB9XG5cbiAgQEdldCgnOmlkJylcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChQcm9kdWN0Lm1vZGVsTmFtZSwgJ0dldE9uZScpKVxuICBhc3luYyBmaW5kT25lKEBQYXJhbSgnaWQnKSBpZCk6IFByb21pc2U8UHJvZHVjdFZtPiB7XG4gICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHRoaXMuX3Byb2RjdXRTZXJ2aWNlLmZpbmRCeUlkKGlkLCBbXG4gICAgICAnY2F0ZWdvcnknLFxuICAgICAgJ2JyYW5kJyxcbiAgICAgICdjb3Vwb24nLFxuICAgIF0pO1xuXG4gICAgaWYgKCFwcm9kdWN0KSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignUmVzb3VyY2UgTm90IEZvdW5kJywgSHR0cFN0YXR1cy5OT1RfRk9VTkQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9wcm9kY3V0U2VydmljZS5tYXA8UHJvZHVjdFZtPihwcm9kdWN0LnRvSlNPTigpKTtcbiAgfVxuXG4gIEBQb3N0KClcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIHBvc3QoQEJvZHkoKSBwcm9kdWN0UGFyYW1zOiBQcm9kdWN0UGFyYW1zKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgY29kZSwgY2F0ZWdvcnksIGJyYW5kIH0gPSBwcm9kdWN0UGFyYW1zO1xuICAgICAgY29uc29sZS5sb2coY29kZSwgY2F0ZWdvcnksIGJyYW5kKTtcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCB0aGlzLl9wcm9kY3V0U2VydmljZS5vbkNyZWF0ZVByb2R1Y3QocHJvZHVjdFBhcmFtcyk7XG5cbiAgICAgIHJldHVybiBwcm9kdWN0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxuXG4gIEBQdXQoJzppZCcpXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoUHJvZHVjdC5tb2RlbE5hbWUsICdQdXQnKSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIHB1dChcbiAgICBAUGFyYW0oJ2lkJykgaWQsXG4gICAgQEJvZHkoKSBwcm9kdWN0UGFyYW1zOiBQcm9kdWN0UGFyYW1zUHV0LFxuICApOiBQcm9taXNlPFByb2R1Y3RWbT4ge1xuICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCB0aGlzLl9wcm9kY3V0U2VydmljZS5maW5kQnlJZChpZCk7XG5cbiAgICBpZiAoIXByb2R1Y3QpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBOb3QgRm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRQcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZGN1dFNlcnZpY2Uub25VcGRhdGVQcm9kdWN0KFxuICAgICAgICBwcm9kdWN0LFxuICAgICAgICBwcm9kdWN0UGFyYW1zLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHVwZGF0ZWRQcm9kdWN0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBAUHV0KCc6aWQvdGh1bWJuYWlsJylcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChQcm9kdWN0Lm1vZGVsTmFtZSwgJ0NyZWF0ZVRodW1ibmFpbCcpKVxuICBAVXNlSW50ZXJjZXB0b3JzKEZpbGVJbnRlcmNlcHRvcignYmFubmVyJykpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbilcbiAgQFVzZUd1YXJkcyhBdXRoR3VhcmQoJ2p3dCcpLCBSb2xlc0d1YXJkKVxuICBhc3luYyBwb3N0VGh1bWJuYWlsKEBQYXJhbSgnaWQnKSBpZCwgQFVwbG9hZGVkRmlsZSgpIGJhbm5lcikge1xuICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICBpZiAoIWJhbm5lciB8fCAhYmFubmVyLnBhdGgpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdUaHVtYm5haWwgaXMgUmVxdWlyZWQnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZGN1dFNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuXG4gICAgaWYgKCFwcm9kdWN0KSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignUmVzb3VyY2UgTm90IEZvdW5kJywgSHR0cFN0YXR1cy5OT1RfRk9VTkQpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9kdWN0LnRodW1ibmFpbCA9IGJhbm5lci5wYXRoO1xuICAgICAgY29uc3QgbmV3UHJvZHVjdCA9IGF3YWl0IHRoaXMuX3Byb2RjdXRTZXJ2aWNlLnVwZGF0ZShpZCwgcHJvZHVjdCk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9wcm9kY3V0U2VydmljZS5tYXA8UHJvZHVjdFZtPihuZXdQcm9kdWN0LnRvSlNPTigpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQFB1dCgnOmlkL2dhbGxlcnknKVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKFByb2R1Y3QubW9kZWxOYW1lLCAnQ3JlYXRlIEdhbGxlcnknKSlcbiAgQFVzZUludGVyY2VwdG9ycyhGaWxlc0ludGVyY2VwdG9yKCdnYWxsZXJ5W10nKSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIHBvc3RHYWxsZXJ5KEBQYXJhbSgnaWQnKSBpZCwgQFVwbG9hZGVkRmlsZXMoKSBnYWxsZXJ5KSB7XG4gICAgY29uc29sZS5sb2coaWQpO1xuICAgIGNvbnNvbGUubG9nKCdHYWxsZXJ5OicsIGdhbGxlcnkpO1xuICAgIGlmICghZ2FsbGVyeSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ0dhbGxlcnkgaXMgUmVxdWlyZWQnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZGN1dFNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuXG4gICAgaWYgKCFwcm9kdWN0KSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignUmVzb3VyY2UgTm90IEZvdW5kJywgSHR0cFN0YXR1cy5OT1RfRk9VTkQpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBnYWxsZXJ5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIHByb2R1Y3QuZ2FsbGVyeS5wdXNoKGVsZW1lbnQucGF0aCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbmV3UHJvZHVjdCA9IGF3YWl0IHRoaXMuX3Byb2RjdXRTZXJ2aWNlLnVwZGF0ZShpZCwgcHJvZHVjdCk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9wcm9kY3V0U2VydmljZS5tYXA8UHJvZHVjdFZtPihuZXdQcm9kdWN0LnRvSlNPTigpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQERlbGV0ZSgnOmlkJylcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChQcm9kdWN0Lm1vZGVsTmFtZSwgJ0RlbGV0ZScpKVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4pXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgZGVsZXRlKEBQYXJhbSgnaWQnKSBpZCk6IFByb21pc2U8UHJvZHVjdFZtPiB7XG4gICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHRoaXMuX3Byb2RjdXRTZXJ2aWNlLmZpbmRCeUlkKGlkKTtcblxuICAgIGlmICghcHJvZHVjdCkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIE5vdCBGb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVsZXRlZFByb2R1Y3QgPSBhd2FpdCB0aGlzLl9wcm9kY3V0U2VydmljZS5kZWxldGUoaWQpO1xuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcHJvZGN1dFNlcnZpY2UubWFwPFByb2R1Y3RWbT4oZGVsZXRlZFByb2R1Y3QudG9KU09OKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBARGVsZXRlKCc6aWQvZ2FsbGVyeS86aW5kZXgnKVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKFByb2R1Y3QubW9kZWxOYW1lLCAnRGVsZXRlR2FsbGVyeXAnKSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIGRlbGV0ZUZyb21HYWxsZXJ5KFxuICAgIEBQYXJhbSgnaWQnKSBpZCxcbiAgICBAUGFyYW0oJ2luZGV4JykgaW5kZXgsXG4gICk6IFByb21pc2U8UHJvZHVjdFZtPiB7XG4gICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHRoaXMuX3Byb2RjdXRTZXJ2aWNlLmZpbmRCeUlkKGlkKTtcblxuICAgIGlmICghcHJvZHVjdCkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIE5vdCBGb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgaW50SW5kZXggPSBwYXJzZUludChpbmRleCk7XG5cbiAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3QuZ2FsbGVyeS5sZW5ndGggLSAxKTtcbiAgICAgIGNvbnNvbGUubG9nKGludEluZGV4KTtcbiAgICAgIGlmIChwcm9kdWN0LmdhbGxlcnkubGVuZ3RoIC0gMSA+PSBpbnRJbmRleCkge1xuICAgICAgICBwcm9kdWN0LmdhbGxlcnkuc3BsaWNlKGludEluZGV4LCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxuICAgICAgICAgICdJbmRleCBvdXQgb2YgcmFuZ2UnLFxuICAgICAgICAgIEh0dHBTdGF0dXMuTk9UX0FDQ0VQVEFCTEUsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ2luZGV4IGlzIE5hTicsIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBuZXdQcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZGN1dFNlcnZpY2UudXBkYXRlKGlkLCBwcm9kdWN0KTtcblxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX3Byb2RjdXRTZXJ2aWNlLm1hcDxQcm9kdWN0Vm0+KG5ld1Byb2R1Y3QudG9KU09OKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==