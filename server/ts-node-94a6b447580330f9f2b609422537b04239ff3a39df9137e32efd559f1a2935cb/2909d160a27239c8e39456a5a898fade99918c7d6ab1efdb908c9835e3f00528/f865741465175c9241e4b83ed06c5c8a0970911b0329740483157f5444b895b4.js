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
const swagger_1 = require("@nestjs/swagger");
const brand_model_1 = require("./models/brand.model");
const brand_vm_model_1 = require("./models/view-models/brand-vm.model");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const user_role_enum_1 = require("../user/models/user-role.enum");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const roles_guard_1 = require("../shared/guards/roles.guard");
const passport_1 = require("@nestjs/passport");
const brand_service_1 = require("./brand.service");
const brand_param_model_1 = require("./models/view-models/brand-param.model");
const lodash_1 = require("lodash");
let BrandController = class BrandController {
    constructor(_brandService) {
        this._brandService = _brandService;
    }
    create(banner, request, brandParam) {
        return __awaiter(this, void 0, void 0, function* () {
            brandParam.logo = banner.path;
            const { name, logo } = brandParam;
            if (!name) {
                throw new common_1.HttpException('name of Brand is Required', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!logo) {
                throw new common_1.HttpException('logo of brand is required', common_1.HttpStatus.BAD_REQUEST);
            }
            const brand = yield this._brandService.onCreateBrand(brandParam);
            return brand;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brand = yield this._brandService.findById(id);
                if (!brand) {
                    throw new common_1.HttpException('Resource Not Found', common_1.HttpStatus.NOT_FOUND);
                }
                return this._brandService.map(brand.toJSON());
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const brands = yield this._brandService.findAll();
                return this._brandService.map(lodash_1.map(brands, brand => brand.toJSON()), true);
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    update(brandParam, banner) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = brandParam;
            if (!id) {
                throw new common_1.HttpException('You Must Provide the ID of the param', common_1.HttpStatus.BAD_REQUEST);
            }
            const existBrand = yield this._brandService.findById(id);
            if (!existBrand) {
                throw new common_1.HttpException(`${id} ${brand_model_1.Brand.modelName}resource not found`, common_1.HttpStatus.NOT_FOUND);
            }
            if (banner && banner.path) {
                existBrand.logo = banner.path;
            }
            if (brandParam.name) {
                existBrand.name = brandParam.name;
            }
            try {
                const updatedBrand = yield this._brandService.update(existBrand.id, existBrand);
                return updatedBrand.toJSON();
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existBrand = yield this._brandService.findById(id);
            if (!existBrand) {
                throw new common_1.HttpException('resource not found', common_1.HttpStatus.NOT_FOUND);
            }
            console.log(existBrand);
            try {
                const deletedResource = yield this._brandService.delete(id);
                return this._brandService.map(deletedResource.toJSON());
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: brand_vm_model_1.BrandVm }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(brand_model_1.Brand.modelName, 'Create')),
    common_1.UseInterceptors(common_1.FileInterceptor('banner')),
    swagger_1.ApiConsumes('multipart/form-data'),
    swagger_1.ApiImplicitFile({ name: 'banner', description: 'Banner', required: false }),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Request()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, brand_param_model_1.BrandParam]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "create", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: brand_vm_model_1.BrandVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(brand_model_1.Brand.modelName, 'Get')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "getOne", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: brand_vm_model_1.BrandVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(brand_model_1.Brand.modelName, 'Get')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "get", null);
__decorate([
    common_1.Put(),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: brand_vm_model_1.BrandVm, isArray: false }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.NOT_FOUND, type: api_exception_model_1.ApiException }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.INTERNAL_SERVER_ERROR, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(brand_model_1.Brand.modelName, 'Update')),
    common_1.UseInterceptors(common_1.FileInterceptor('banner')),
    __param(0, common_1.Body()),
    __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [brand_param_model_1.BrandParam, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: brand_vm_model_1.BrandVm, isArray: false }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(brand_model_1.Brand.modelName, 'Delete')),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    swagger_1.ApiImplicitParam({ name: 'id' }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "delete", null);
BrandController = __decorate([
    common_1.Controller('brand'),
    swagger_1.ApiUseTags(brand_model_1.Brand.modelName),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [brand_service_1.BrandService])
], BrandController);
exports.BrandController = BrandController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9icmFuZC9icmFuZC5jb250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL2JyYW5kL2JyYW5kLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQWtCd0I7QUFDeEIsNkNBVXlCO0FBQ3pCLHNEQUE2QztBQUM3Qyx3RUFBOEQ7QUFDOUQsdUVBQTZEO0FBQzdELDJFQUFzRTtBQUN0RSxrRUFBeUQ7QUFDekQsMEVBQTZEO0FBQzdELDhEQUEwRDtBQUMxRCwrQ0FBNkM7QUFDN0MsbURBQStDO0FBQy9DLDhFQUFvRTtBQUNwRSxtQ0FBc0M7QUFLdEMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUMxQixZQUE2QixhQUEyQjtRQUEzQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztJQUFHLENBQUM7SUFXdEQsTUFBTSxDQUNNLE1BQU0sRUFDWCxPQUFPLEVBQ1YsVUFBc0I7O1lBRTlCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU5QixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUVsQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULE1BQU0sSUFBSSxzQkFBYSxDQUNyQiwyQkFBMkIsRUFDM0IsbUJBQVUsQ0FBQyxXQUFXLENBQ3ZCLENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsTUFBTSxJQUFJLHNCQUFhLENBQ3JCLDJCQUEyQixFQUMzQixtQkFBVSxDQUFDLFdBQVcsQ0FDdkIsQ0FBQzthQUNIO1lBRUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqRSxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7S0FBQTtJQVFLLE1BQU0sQ0FBYyxF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QUksRUFBRSxrQ0FBWSxFQUFFLENBQUM7SUFDN0Usc0JBQVksQ0FBQyxpQ0FBYyxDQUFDLG1CQUFLLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELHdCQUFlLENBQUMsd0JBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV4QyxXQUFBLGFBQUksRUFBRSxDQUFBO0lBQ04sV0FBQSxxQkFBWSxFQUFFLENBQUE7O3FDQURLLDhCQUFVOzs2Q0FzQy9CO0FBU0Q7SUFQQyxlQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2IscUJBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBVSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsd0JBQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDckUscUJBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsa0NBQVksRUFBRSxDQUFDO0lBQ25FLHNCQUFZLENBQUMsaUNBQWMsQ0FBQyxtQkFBSyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2RCxrQkFBUyxDQUFDLG9CQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsd0JBQVUsQ0FBQztJQUN2Qyx1QkFBSyxDQUFDLHlCQUFRLENBQUMsS0FBSyxDQUFDO0lBQ3JCLDBCQUFnQixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ25CLFdBQUEsY0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBOzs7OzZDQWdCeEI7QUF2SlUsZUFBZTtJQUgzQixtQkFBVSxDQUFDLE9BQU8sQ0FBQztJQUNuQixvQkFBVSxDQUFDLG1CQUFLLENBQUMsU0FBUyxDQUFDO0lBQzNCLHVCQUFhLEVBQUU7cUNBRThCLDRCQUFZO0dBRDdDLGVBQWUsQ0F3SjNCO0FBeEpZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBIdHRwU3RhdHVzLFxuICBVc2VHdWFyZHMsXG4gIEJvZHksXG4gIFBvc3QsXG4gIFVzZUludGVyY2VwdG9ycyxcbiAgRmlsZUludGVyY2VwdG9yLFxuICBVcGxvYWRlZEZpbGUsXG4gIEh0dHBFeGNlcHRpb24sXG4gIFBhcmFtLFxuICBIZWFkZXIsXG4gIFJlcXVlc3QsXG4gIEhlYWQsXG4gIFF1ZXJ5LFxuICBQdXQsXG4gIERlbGV0ZSxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXBpVXNlVGFncyxcbiAgQXBpQmVhcmVyQXV0aCxcbiAgQXBpUmVzcG9uc2UsXG4gIEFwaU9wZXJhdGlvbixcbiAgQXBpSW1wbGljaXRRdWVyeSxcbiAgQXBpSW1wbGljaXRGaWxlLFxuICBBcGlDb25zdW1lcyxcbiAgQXBpSW1wbGljaXRCb2R5LFxuICBBcGlJbXBsaWNpdFBhcmFtLFxufSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgQnJhbmQgfSBmcm9tICcuL21vZGVscy9icmFuZC5tb2RlbCc7XG5pbXBvcnQgeyBCcmFuZFZtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvYnJhbmQtdm0ubW9kZWwnO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2FwaS1leGNlcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgR2V0T3BlcmF0aW9uSWQgfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2dldC1vcGVyYXRpb24taWQnO1xuaW1wb3J0IHsgVXNlclJvbGUgfSBmcm9tICcuLi91c2VyL21vZGVscy91c2VyLXJvbGUuZW51bSc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3NoYXJlZC9kZWNvcmF0b3JzL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcbmltcG9ydCB7IEJyYW5kU2VydmljZSB9IGZyb20gJy4vYnJhbmQuc2VydmljZSc7XG5pbXBvcnQgeyBCcmFuZFBhcmFtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvYnJhbmQtcGFyYW0ubW9kZWwnO1xuaW1wb3J0IHsgbWFwLCBpc0FycmF5IH0gZnJvbSAnbG9kYXNoJztcblxuQENvbnRyb2xsZXIoJ2JyYW5kJylcbkBBcGlVc2VUYWdzKEJyYW5kLm1vZGVsTmFtZSlcbkBBcGlCZWFyZXJBdXRoKClcbmV4cG9ydCBjbGFzcyBCcmFuZENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IF9icmFuZFNlcnZpY2U6IEJyYW5kU2VydmljZSkge31cblxuICBAUG9zdCgpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbilcbiAgQFVzZUd1YXJkcyhBdXRoR3VhcmQoJ2p3dCcpLCBSb2xlc0d1YXJkKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQ1JFQVRFRCwgdHlwZTogQnJhbmRWbSB9KVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKEJyYW5kLm1vZGVsTmFtZSwgJ0NyZWF0ZScpKVxuICBAVXNlSW50ZXJjZXB0b3JzKEZpbGVJbnRlcmNlcHRvcignYmFubmVyJykpXG4gIEBBcGlDb25zdW1lcygnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpXG4gIEBBcGlJbXBsaWNpdEZpbGUoeyBuYW1lOiAnYmFubmVyJywgZGVzY3JpcHRpb246ICdCYW5uZXInLCByZXF1aXJlZDogZmFsc2UgfSlcbiAgYXN5bmMgY3JlYXRlKFxuICAgIEBVcGxvYWRlZEZpbGUoKSBiYW5uZXIsXG4gICAgQFJlcXVlc3QoKSByZXF1ZXN0LFxuICAgIEBCb2R5KCkgYnJhbmRQYXJhbTogQnJhbmRQYXJhbSxcbiAgKTogUHJvbWlzZTxCcmFuZFZtPiB7XG4gICAgYnJhbmRQYXJhbS5sb2dvID0gYmFubmVyLnBhdGg7XG5cbiAgICBjb25zdCB7IG5hbWUsIGxvZ28gfSA9IGJyYW5kUGFyYW07XG5cbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxuICAgICAgICAnbmFtZSBvZiBCcmFuZCBpcyBSZXF1aXJlZCcsXG4gICAgICAgIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghbG9nbykge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICAgICdsb2dvIG9mIGJyYW5kIGlzIHJlcXVpcmVkJyxcbiAgICAgICAgSHR0cFN0YXR1cy5CQURfUkVRVUVTVCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgYnJhbmQgPSBhd2FpdCB0aGlzLl9icmFuZFNlcnZpY2Uub25DcmVhdGVCcmFuZChicmFuZFBhcmFtKTtcblxuICAgIHJldHVybiBicmFuZDtcbiAgfVxuXG4gIEBHZXQoJzppZCcpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogQnJhbmRWbSwgaXNBcnJheTogdHJ1ZSB9KVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKEJyYW5kLm1vZGVsTmFtZSwgJ0dldCcpKVxuICAvLyBAUm9sZXMoVXNlclJvbGUuQWRtaW4sIFVzZXJSb2xlLlVzZXIpXG4gIC8vIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgZ2V0T25lKEBQYXJhbSgnaWQnKSBpZCk6IFByb21pc2U8QnJhbmRWbT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBicmFuZCA9IGF3YWl0IHRoaXMuX2JyYW5kU2VydmljZS5maW5kQnlJZChpZCk7XG5cbiAgICAgIGlmICghYnJhbmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIE5vdCBGb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9icmFuZFNlcnZpY2UubWFwPEJyYW5kVm0+KGJyYW5kLnRvSlNPTigpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZXJyb3IsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBAR2V0KClcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLk9LLCB0eXBlOiBCcmFuZFZtLCBpc0FycmF5OiB0cnVlIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoQnJhbmQubW9kZWxOYW1lLCAnR2V0JykpXG4gIC8vIEBSb2xlcyhVc2VyUm9sZS5BZG1pbiwgVXNlclJvbGUuVXNlcilcbiAgLy8gQFVzZUd1YXJkcyhBdXRoR3VhcmQoJ2p3dCcpLCBSb2xlc0d1YXJkKVxuICBhc3luYyBnZXQoKTogUHJvbWlzZTxCcmFuZFZtW10+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYnJhbmRzID0gYXdhaXQgdGhpcy5fYnJhbmRTZXJ2aWNlLmZpbmRBbGwoKTtcblxuICAgICAgcmV0dXJuIHRoaXMuX2JyYW5kU2VydmljZS5tYXA8QnJhbmRWbVtdPihcbiAgICAgICAgbWFwKGJyYW5kcywgYnJhbmQgPT4gYnJhbmQudG9KU09OKCkpLFxuICAgICAgICB0cnVlLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZXJyb3IsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBAUHV0KClcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogQnJhbmRWbSwgaXNBcnJheTogZmFsc2UgfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLk5PVF9GT1VORCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKEJyYW5kLm1vZGVsTmFtZSwgJ1VwZGF0ZScpKVxuICBAVXNlSW50ZXJjZXB0b3JzKEZpbGVJbnRlcmNlcHRvcignYmFubmVyJykpXG4gIGFzeW5jIHVwZGF0ZShcbiAgICBAQm9keSgpIGJyYW5kUGFyYW06IEJyYW5kUGFyYW0sXG4gICAgQFVwbG9hZGVkRmlsZSgpIGJhbm5lcixcbiAgKTogUHJvbWlzZTxCcmFuZFZtPiB7XG4gICAgY29uc3QgeyBpZCB9ID0gYnJhbmRQYXJhbTtcblxuICAgIGlmICghaWQpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxuICAgICAgICAnWW91IE11c3QgUHJvdmlkZSB0aGUgSUQgb2YgdGhlIHBhcmFtJyxcbiAgICAgICAgSHR0cFN0YXR1cy5CQURfUkVRVUVTVCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZXhpc3RCcmFuZCA9IGF3YWl0IHRoaXMuX2JyYW5kU2VydmljZS5maW5kQnlJZChpZCk7XG4gICAgaWYgKCFleGlzdEJyYW5kKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihcbiAgICAgICAgYCR7aWR9ICR7QnJhbmQubW9kZWxOYW1lfXJlc291cmNlIG5vdCBmb3VuZGAsXG4gICAgICAgIEh0dHBTdGF0dXMuTk9UX0ZPVU5ELFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoYmFubmVyICYmIGJhbm5lci5wYXRoKSB7XG4gICAgICBleGlzdEJyYW5kLmxvZ28gPSBiYW5uZXIucGF0aDtcbiAgICB9XG5cbiAgICBpZiAoYnJhbmRQYXJhbS5uYW1lKSB7XG4gICAgICBleGlzdEJyYW5kLm5hbWUgPSBicmFuZFBhcmFtLm5hbWU7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRCcmFuZCA9IGF3YWl0IHRoaXMuX2JyYW5kU2VydmljZS51cGRhdGUoXG4gICAgICAgIGV4aXN0QnJhbmQuaWQsXG4gICAgICAgIGV4aXN0QnJhbmQsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gdXBkYXRlZEJyYW5kLnRvSlNPTigpIGFzIEJyYW5kVm07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGVycm9yLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQERlbGV0ZSgnOmlkJylcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLk9LLCB0eXBlOiBCcmFuZFZtLCBpc0FycmF5OiBmYWxzZSB9KVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKEJyYW5kLm1vZGVsTmFtZSwgJ0RlbGV0ZScpKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbilcbiAgQEFwaUltcGxpY2l0UGFyYW0oeyBuYW1lOiAnaWQnIH0pXG4gIGFzeW5jIGRlbGV0ZShAUGFyYW0oJ2lkJykgaWQpOiBQcm9taXNlPEJyYW5kVm0+IHtcbiAgICBjb25zdCBleGlzdEJyYW5kID0gYXdhaXQgdGhpcy5fYnJhbmRTZXJ2aWNlLmZpbmRCeUlkKGlkKTtcblxuICAgIGlmICghZXhpc3RCcmFuZCkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ3Jlc291cmNlIG5vdCBmb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhleGlzdEJyYW5kKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBkZWxldGVkUmVzb3VyY2UgPSBhd2FpdCB0aGlzLl9icmFuZFNlcnZpY2UuZGVsZXRlKGlkKTtcblxuICAgICAgcmV0dXJuIHRoaXMuX2JyYW5kU2VydmljZS5tYXA8QnJhbmRWbT4oZGVsZXRlZFJlc291cmNlLnRvSlNPTigpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZXJyb3IsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==