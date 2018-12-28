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
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.User),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
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
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.User),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9icmFuZC9icmFuZC5jb250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL2JyYW5kL2JyYW5kLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQWtCd0I7QUFDeEIsNkNBVXlCO0FBQ3pCLHNEQUE2QztBQUM3Qyx3RUFBOEQ7QUFDOUQsdUVBQTZEO0FBQzdELDJFQUFzRTtBQUN0RSxrRUFBeUQ7QUFDekQsMEVBQTZEO0FBQzdELDhEQUEwRDtBQUMxRCwrQ0FBNkM7QUFDN0MsbURBQStDO0FBQy9DLDhFQUFvRTtBQUNwRSxtQ0FBc0M7QUFLdEMsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUMxQixZQUE2QixhQUEyQjtRQUEzQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztJQUFHLENBQUM7SUFXdEQsTUFBTSxDQUNNLE1BQU0sRUFDWCxPQUFPLEVBQ1YsVUFBc0I7O1lBRTlCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU5QixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUVsQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULE1BQU0sSUFBSSxzQkFBYSxDQUNyQiwyQkFBMkIsRUFDM0IsbUJBQVUsQ0FBQyxXQUFXLENBQ3ZCLENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsTUFBTSxJQUFJLHNCQUFhLENBQ3JCLDJCQUEyQixFQUMzQixtQkFBVSxDQUFDLFdBQVcsQ0FDdkIsQ0FBQzthQUNIO1lBRUQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqRSxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7S0FBQTtJQVFLLE1BQU0sQ0FBYyxFQUFFOztZ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bUJBQVUsQ0FBQyxPQUFPLENBQUM7SUFDbkIsb0JBQVUsQ0FBQyxtQkFBSyxDQUFDLFNBQVMsQ0FBQztJQUMzQix1QkFBYSxFQUFFO3FDQUU4Qiw0QkFBWTtHQUQ3QyxlQUFlLENBd0ozQjtBQXhKWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgSHR0cFN0YXR1cyxcbiAgVXNlR3VhcmRzLFxuICBCb2R5LFxuICBQb3N0LFxuICBVc2VJbnRlcmNlcHRvcnMsXG4gIEZpbGVJbnRlcmNlcHRvcixcbiAgVXBsb2FkZWRGaWxlLFxuICBIdHRwRXhjZXB0aW9uLFxuICBQYXJhbSxcbiAgSGVhZGVyLFxuICBSZXF1ZXN0LFxuICBIZWFkLFxuICBRdWVyeSxcbiAgUHV0LFxuICBEZWxldGUsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwaVVzZVRhZ3MsXG4gIEFwaUJlYXJlckF1dGgsXG4gIEFwaVJlc3BvbnNlLFxuICBBcGlPcGVyYXRpb24sXG4gIEFwaUltcGxpY2l0UXVlcnksXG4gIEFwaUltcGxpY2l0RmlsZSxcbiAgQXBpQ29uc3VtZXMsXG4gIEFwaUltcGxpY2l0Qm9keSxcbiAgQXBpSW1wbGljaXRQYXJhbSxcbn0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IEJyYW5kIH0gZnJvbSAnLi9tb2RlbHMvYnJhbmQubW9kZWwnO1xuaW1wb3J0IHsgQnJhbmRWbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL2JyYW5kLXZtLm1vZGVsJztcbmltcG9ydCB7IEFwaUV4Y2VwdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9hcGktZXhjZXB0aW9uLm1vZGVsJztcbmltcG9ydCB7IEdldE9wZXJhdGlvbklkIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxpdGllcy9nZXQtb3BlcmF0aW9uLWlkJztcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSAnLi4vdXNlci9tb2RlbHMvdXNlci1yb2xlLmVudW0nO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9zaGFyZWQvZGVjb3JhdG9ycy9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL3NoYXJlZC9ndWFyZHMvcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBCcmFuZFNlcnZpY2UgfSBmcm9tICcuL2JyYW5kLnNlcnZpY2UnO1xuaW1wb3J0IHsgQnJhbmRQYXJhbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL2JyYW5kLXBhcmFtLm1vZGVsJztcbmltcG9ydCB7IG1hcCwgaXNBcnJheSB9IGZyb20gJ2xvZGFzaCc7XG5cbkBDb250cm9sbGVyKCdicmFuZCcpXG5AQXBpVXNlVGFncyhCcmFuZC5tb2RlbE5hbWUpXG5AQXBpQmVhcmVyQXV0aCgpXG5leHBvcnQgY2xhc3MgQnJhbmRDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBfYnJhbmRTZXJ2aWNlOiBCcmFuZFNlcnZpY2UpIHt9XG5cbiAgQFBvc3QoKVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4pXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkNSRUFURUQsIHR5cGU6IEJyYW5kVm0gfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChCcmFuZC5tb2RlbE5hbWUsICdDcmVhdGUnKSlcbiAgQFVzZUludGVyY2VwdG9ycyhGaWxlSW50ZXJjZXB0b3IoJ2Jhbm5lcicpKVxuICBAQXBpQ29uc3VtZXMoJ211bHRpcGFydC9mb3JtLWRhdGEnKVxuICBAQXBpSW1wbGljaXRGaWxlKHsgbmFtZTogJ2Jhbm5lcicsIGRlc2NyaXB0aW9uOiAnQmFubmVyJywgcmVxdWlyZWQ6IGZhbHNlIH0pXG4gIGFzeW5jIGNyZWF0ZShcbiAgICBAVXBsb2FkZWRGaWxlKCkgYmFubmVyLFxuICAgIEBSZXF1ZXN0KCkgcmVxdWVzdCxcbiAgICBAQm9keSgpIGJyYW5kUGFyYW06IEJyYW5kUGFyYW0sXG4gICk6IFByb21pc2U8QnJhbmRWbT4ge1xuICAgIGJyYW5kUGFyYW0ubG9nbyA9IGJhbm5lci5wYXRoO1xuXG4gICAgY29uc3QgeyBuYW1lLCBsb2dvIH0gPSBicmFuZFBhcmFtO1xuXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihcbiAgICAgICAgJ25hbWUgb2YgQnJhbmQgaXMgUmVxdWlyZWQnLFxuICAgICAgICBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWxvZ28pIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxuICAgICAgICAnbG9nbyBvZiBicmFuZCBpcyByZXF1aXJlZCcsXG4gICAgICAgIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGJyYW5kID0gYXdhaXQgdGhpcy5fYnJhbmRTZXJ2aWNlLm9uQ3JlYXRlQnJhbmQoYnJhbmRQYXJhbSk7XG5cbiAgICByZXR1cm4gYnJhbmQ7XG4gIH1cblxuICBAR2V0KCc6aWQnKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuT0ssIHR5cGU6IEJyYW5kVm0sIGlzQXJyYXk6IHRydWUgfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChCcmFuZC5tb2RlbE5hbWUsICdHZXQnKSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluLCBVc2VyUm9sZS5Vc2VyKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIGdldE9uZShAUGFyYW0oJ2lkJykgaWQpOiBQcm9taXNlPEJyYW5kVm0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYnJhbmQgPSBhd2FpdCB0aGlzLl9icmFuZFNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuXG4gICAgICBpZiAoIWJyYW5kKSB7XG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBOb3QgRm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fYnJhbmRTZXJ2aWNlLm1hcDxCcmFuZFZtPihicmFuZC50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGVycm9yLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQEdldCgpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogQnJhbmRWbSwgaXNBcnJheTogdHJ1ZSB9KVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKEJyYW5kLm1vZGVsTmFtZSwgJ0dldCcpKVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4sIFVzZXJSb2xlLlVzZXIpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgZ2V0KCk6IFByb21pc2U8QnJhbmRWbVtdPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJyYW5kcyA9IGF3YWl0IHRoaXMuX2JyYW5kU2VydmljZS5maW5kQWxsKCk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9icmFuZFNlcnZpY2UubWFwPEJyYW5kVm1bXT4oXG4gICAgICAgIG1hcChicmFuZHMsIGJyYW5kID0+IGJyYW5kLnRvSlNPTigpKSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGVycm9yLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQFB1dCgpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbilcbiAgQFVzZUd1YXJkcyhBdXRoR3VhcmQoJ2p3dCcpLCBSb2xlc0d1YXJkKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuT0ssIHR5cGU6IEJyYW5kVm0sIGlzQXJyYXk6IGZhbHNlIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5OT1RfRk9VTkQsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChCcmFuZC5tb2RlbE5hbWUsICdVcGRhdGUnKSlcbiAgQFVzZUludGVyY2VwdG9ycyhGaWxlSW50ZXJjZXB0b3IoJ2Jhbm5lcicpKVxuICBhc3luYyB1cGRhdGUoXG4gICAgQEJvZHkoKSBicmFuZFBhcmFtOiBCcmFuZFBhcmFtLFxuICAgIEBVcGxvYWRlZEZpbGUoKSBiYW5uZXIsXG4gICk6IFByb21pc2U8QnJhbmRWbT4ge1xuICAgIGNvbnN0IHsgaWQgfSA9IGJyYW5kUGFyYW07XG5cbiAgICBpZiAoIWlkKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihcbiAgICAgICAgJ1lvdSBNdXN0IFByb3ZpZGUgdGhlIElEIG9mIHRoZSBwYXJhbScsXG4gICAgICAgIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGV4aXN0QnJhbmQgPSBhd2FpdCB0aGlzLl9icmFuZFNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuICAgIGlmICghZXhpc3RCcmFuZCkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICAgIGAke2lkfSAke0JyYW5kLm1vZGVsTmFtZX1yZXNvdXJjZSBub3QgZm91bmRgLFxuICAgICAgICBIdHRwU3RhdHVzLk5PVF9GT1VORCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGJhbm5lciAmJiBiYW5uZXIucGF0aCkge1xuICAgICAgZXhpc3RCcmFuZC5sb2dvID0gYmFubmVyLnBhdGg7XG4gICAgfVxuXG4gICAgaWYgKGJyYW5kUGFyYW0ubmFtZSkge1xuICAgICAgZXhpc3RCcmFuZC5uYW1lID0gYnJhbmRQYXJhbS5uYW1lO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cGRhdGVkQnJhbmQgPSBhd2FpdCB0aGlzLl9icmFuZFNlcnZpY2UudXBkYXRlKFxuICAgICAgICBleGlzdEJyYW5kLmlkLFxuICAgICAgICBleGlzdEJyYW5kLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHVwZGF0ZWRCcmFuZC50b0pTT04oKSBhcyBCcmFuZFZtO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlcnJvciwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxuXG4gIEBEZWxldGUoJzppZCcpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogQnJhbmRWbSwgaXNBcnJheTogZmFsc2UgfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChCcmFuZC5tb2RlbE5hbWUsICdEZWxldGUnKSlcbiAgQFVzZUd1YXJkcyhBdXRoR3VhcmQoJ2p3dCcpLCBSb2xlc0d1YXJkKVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4pXG4gIEBBcGlJbXBsaWNpdFBhcmFtKHsgbmFtZTogJ2lkJyB9KVxuICBhc3luYyBkZWxldGUoQFBhcmFtKCdpZCcpIGlkKTogUHJvbWlzZTxCcmFuZFZtPiB7XG4gICAgY29uc3QgZXhpc3RCcmFuZCA9IGF3YWl0IHRoaXMuX2JyYW5kU2VydmljZS5maW5kQnlJZChpZCk7XG5cbiAgICBpZiAoIWV4aXN0QnJhbmQpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdyZXNvdXJjZSBub3QgZm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coZXhpc3RCcmFuZCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVsZXRlZFJlc291cmNlID0gYXdhaXQgdGhpcy5fYnJhbmRTZXJ2aWNlLmRlbGV0ZShpZCk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9icmFuZFNlcnZpY2UubWFwPEJyYW5kVm0+KGRlbGV0ZWRSZXNvdXJjZS50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGVycm9yLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG59XG4iXX0=