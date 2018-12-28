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
const category_service_1 = require("./category.service");
const swagger_1 = require("@nestjs/swagger");
const category_model_1 = require("./models/category.model");
const category_vm_model_1 = require("./models/view-models/category-vm.model");
const lodash_1 = require("lodash");
const category_params_model_1 = require("./models/view-models/category-params.model");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const user_role_enum_1 = require("../user/models/user-role.enum");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
const to_int_pipe_1 = require("../shared/pipes/to-int.pipe");
const mongoose_1 = require("mongoose");
let CategoryController = class CategoryController {
    constructor(_categoryService) {
        this._categoryService = _categoryService;
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let parentQuery = {};
            const category = yield this._categoryService.findById(id, ['parent']);
            if (!category) {
                throw new common_1.HttpException('Resource not found', common_1.HttpStatus.NOT_FOUND);
            }
            return this._categoryService.map(category.toJSON());
        });
    }
    get(page, perPage, parent) {
        return __awaiter(this, void 0, void 0, function* () {
            let parentQuery = {};
            if (parent && parent !== null) {
                console.log('Parent:' + parent);
                let mappedParentObject = [];
                parentQuery = { parent: mongoose_1.Types.ObjectId(parent) };
                console.log(parentQuery, page, perPage);
            }
            const categories = yield this._categoryService.findAll(parentQuery, ['parent'], page, perPage);
            return this._categoryService.map(lodash_1.map(categories, category => category.toJSON()), true);
        });
    }
    post(thumbnail, categoryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(categoryParams);
            const { name, description } = categoryParams;
            if (!thumbnail) {
                throw new common_1.HttpException('Category Image is Required', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!name) {
                throw new common_1.HttpException('name of category is required', common_1.HttpStatus.BAD_REQUEST);
            }
            categoryParams.thumbnail = thumbnail.path;
            try {
                const category = this._categoryService.onCreateCategory(categoryParams);
                return category;
            }
            catch (e) {
                console.log(e);
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    put(thumbnail, categoryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(thumbnail);
            const { id, parent } = categoryParams;
            if (!id) {
                throw new common_1.HttpException('id resource is required', common_1.HttpStatus.BAD_REQUEST);
            }
            const currentCategory = yield this._categoryService.findById(id);
            if (!currentCategory) {
                throw new common_1.HttpException(`resource with ${id} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            if (parent) {
                const parentCategory = yield this._categoryService.findById(parent);
                if (!parentCategory) {
                    throw new common_1.HttpException('parent resource with ${id} not found', common_1.HttpStatus.NOT_ACCEPTABLE);
                }
                currentCategory.parent = mongoose_1.Types.ObjectId(parent);
            }
            if (thumbnail && thumbnail.path) {
                console.log('Update Patttttth');
                currentCategory.thumbnail = thumbnail.path;
            }
            currentCategory.name = categoryParams.name
                ? categoryParams.name
                : currentCategory.name;
            currentCategory.description = categoryParams.description
                ? categoryParams.description
                : currentCategory.description;
            try {
                const updatedCategory = yield this._categoryService.update(currentCategory.id, currentCategory);
                return updatedCategory.toJSON();
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentCategory = yield this._categoryService.findById(id);
            if (!currentCategory) {
                throw new common_1.HttpException(`${id} of resource not found`, common_1.HttpStatus.NOT_FOUND);
            }
            const deletedCategory = yield this._categoryService.delete(id);
            return deletedCategory.toJSON();
        });
    }
};
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: category_vm_model_1.CategoryVm, isArray: false }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(category_model_1.Category.modelName, 'GetOne')),
    swagger_1.ApiImplicitParam({
        name: 'id',
        required: true,
        type: String,
    }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getOne", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: category_vm_model_1.CategoryVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(category_model_1.Category.modelName, 'Get')),
    swagger_1.ApiImplicitQuery({
        name: 'page',
        required: true,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({ name: 'perPage', required: true, type: Number }),
    swagger_1.ApiImplicitQuery({
        name: 'parent',
        required: false,
        type: String,
        isArray: false,
    }),
    __param(0, common_1.Query('page', new to_int_pipe_1.ToInt())),
    __param(1, common_1.Query('perPage', new to_int_pipe_1.ToInt())),
    __param(2, common_1.Query('parent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "get", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(category_model_1.Category.modelName, 'Create')),
    common_1.UseInterceptors(common_1.FileInterceptor('thumbnail')),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_params_model_1.CategoryParams]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "post", null);
__decorate([
    common_1.Put(),
    common_1.UseInterceptors(common_1.FileInterceptor('thumbnail')),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(category_model_1.Category.modelName, 'Put')),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, category_params_model_1.CategoryParams]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "put", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(category_model_1.Category.modelName, 'Delete')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
CategoryController = __decorate([
    common_1.Controller('categories'),
    swagger_1.ApiUseTags(category_model_1.Category.modelName),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9jYXRlZ29yeS9jYXRlZ29yeS5jb250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL2NhdGVnb3J5L2NhdGVnb3J5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQWdCd0I7QUFDeEIseURBQXFEO0FBQ3JELDZDQU95QjtBQUN6Qiw0REFBbUQ7QUFDbkQsOEVBQW9FO0FBQ3BFLG1DQUE2QjtBQUM3QixzRkFBNEU7QUFDNUUsdUVBQTZEO0FBQzdELDJFQUFzRTtBQUN0RSxrRUFBeUQ7QUFDekQsMEVBQTZEO0FBQzdELCtDQUE2QztBQUM3Qyw4REFBMEQ7QUFDMUQsNkRBQW9EO0FBQ3BELHVDQUFpQztBQUtqQyxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtJQUM3QixZQUE2QixnQkFBaUM7UUFBakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtJQUFHLENBQUM7SUFXNUQsTUFBTSxDQUFjLEVBQUU7O1lBRzFCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUVyQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUV0RSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLE1BQU0sSUFBSSxzQkFBYSxDQUFDLG9CQUFvQixFQUFFLG1CQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDckU7WUFFRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQWEsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbEUsQ0FBQztLQUFBO0lBa0JLLEdBQUcsQ0FDcUIsSUFBWSxFQUNULE9BQWUsRUFDN0IsTUFBYzs7WUFFL0IsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBRXJCLElBQUks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QUMsb0JBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSx3QkFBVSxDQUFDO0lBQ3ZDLHVCQUFLLENBQUMseUJBQVEsQ0FBQyxLQUFLLENBQUM7SUFDckIsc0JBQVksQ0FBQyxpQ0FBYyxDQUFDLHlCQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLFdBQUEsY0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBOzs7O2dEQVl4QjtBQWhNVSxrQkFBa0I7SUFIOUIsbUJBQVUsQ0FBQyxZQUFZLENBQUM7SUFDeEIsb0JBQVUsQ0FBQyx5QkFBUSxDQUFDLFNBQVMsQ0FBQztJQUM5Qix1QkFBYSxFQUFFO3FDQUVpQyxrQ0FBZTtHQURuRCxrQkFBa0IsQ0FpTTlCO0FBak1ZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgUmVxdWVzdCxcbiAgUG9zdCxcbiAgVXNlSW50ZXJjZXB0b3JzLFxuICBGaWxlSW50ZXJjZXB0b3IsXG4gIFVwbG9hZGVkRmlsZSxcbiAgQm9keSxcbiAgUHV0LFxuICBEZWxldGUsXG4gIFBhcmFtLFxuICBIdHRwRXhjZXB0aW9uLFxuICBIdHRwU3RhdHVzLFxuICBVc2VHdWFyZHMsXG4gIFF1ZXJ5LFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDYXRlZ29yeVNlcnZpY2UgfSBmcm9tICcuL2NhdGVnb3J5LnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQXBpVXNlVGFncyxcbiAgQXBpQmVhcmVyQXV0aCxcbiAgQXBpUmVzcG9uc2UsXG4gIEFwaU9wZXJhdGlvbixcbiAgQXBpSW1wbGljaXRRdWVyeSxcbiAgQXBpSW1wbGljaXRQYXJhbSxcbn0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi9tb2RlbHMvY2F0ZWdvcnkubW9kZWwnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlWbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL2NhdGVnb3J5LXZtLm1vZGVsJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDYXRlZ29yeVBhcmFtcyB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL2NhdGVnb3J5LXBhcmFtcy5tb2RlbCc7XG5pbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tICcuLi9zaGFyZWQvYXBpLWV4Y2VwdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBHZXRPcGVyYXRpb25JZCB9IGZyb20gJy4uL3NoYXJlZC91dGlsaXRpZXMvZ2V0LW9wZXJhdGlvbi1pZCc7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4uL3VzZXIvbW9kZWxzL3VzZXItcm9sZS5lbnVtJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vc2hhcmVkL2RlY29yYXRvcnMvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL3NoYXJlZC9ndWFyZHMvcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgVG9JbnQgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvdG8taW50LnBpcGUnO1xuaW1wb3J0IHsgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XG5cbkBDb250cm9sbGVyKCdjYXRlZ29yaWVzJylcbkBBcGlVc2VUYWdzKENhdGVnb3J5Lm1vZGVsTmFtZSlcbkBBcGlCZWFyZXJBdXRoKClcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IF9jYXRlZ29yeVNlcnZpY2U6IENhdGVnb3J5U2VydmljZSkge31cblxuICBAR2V0KCc6aWQnKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuT0ssIHR5cGU6IENhdGVnb3J5Vm0sIGlzQXJyYXk6IGZhbHNlIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoQ2F0ZWdvcnkubW9kZWxOYW1lLCAnR2V0T25lJykpXG4gIEBBcGlJbXBsaWNpdFBhcmFtKHtcbiAgICBuYW1lOiAnaWQnLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6IFN0cmluZyxcbiAgfSlcbiAgYXN5bmMgZ2V0T25lKEBQYXJhbSgnaWQnKSBpZCk6IFByb21pc2U8Q2F0ZWdvcnlWbT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKHBhcmVudCk7XG5cbiAgICBsZXQgcGFyZW50UXVlcnkgPSB7fTtcblxuICAgIGNvbnN0IGNhdGVnb3J5ID0gYXdhaXQgdGhpcy5fY2F0ZWdvcnlTZXJ2aWNlLmZpbmRCeUlkKGlkLCBbJ3BhcmVudCddKTtcblxuICAgIGlmICghY2F0ZWdvcnkpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBub3QgZm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2NhdGVnb3J5U2VydmljZS5tYXA8Q2F0ZWdvcnlWbT4oY2F0ZWdvcnkudG9KU09OKCkpO1xuICB9XG5cbiAgQEdldCgpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogQ2F0ZWdvcnlWbSwgaXNBcnJheTogdHJ1ZSB9KVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKENhdGVnb3J5Lm1vZGVsTmFtZSwgJ0dldCcpKVxuICBAQXBpSW1wbGljaXRRdWVyeSh7XG4gICAgbmFtZTogJ3BhZ2UnLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6IE51bWJlcixcbiAgfSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoeyBuYW1lOiAncGVyUGFnZScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBOdW1iZXIgfSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoe1xuICAgIG5hbWU6ICdwYXJlbnQnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgaXNBcnJheTogZmFsc2UsXG4gIH0pXG4gIGFzeW5jIGdldChcbiAgICBAUXVlcnkoJ3BhZ2UnLCBuZXcgVG9JbnQoKSkgcGFnZTogbnVtYmVyLFxuICAgIEBRdWVyeSgncGVyUGFnZScsIG5ldyBUb0ludCgpKSBwZXJQYWdlOiBudW1iZXIsXG4gICAgQFF1ZXJ5KCdwYXJlbnQnKSBwYXJlbnQ6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxDYXRlZ29yeVZtW10+IHtcbiAgICBsZXQgcGFyZW50UXVlcnkgPSB7fTtcblxuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZygnUGFyZW50OicgKyBwYXJlbnQpO1xuXG4gICAgICBsZXQgbWFwcGVkUGFyZW50T2JqZWN0ID0gW107XG5cbiAgICAgIHBhcmVudFF1ZXJ5ID0geyBwYXJlbnQ6IFR5cGVzLk9iamVjdElkKHBhcmVudCkgfTtcblxuICAgICAgY29uc29sZS5sb2cocGFyZW50UXVlcnksIHBhZ2UsIHBlclBhZ2UpO1xuICAgIH1cblxuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCB0aGlzLl9jYXRlZ29yeVNlcnZpY2UuZmluZEFsbChcbiAgICAgIHBhcmVudFF1ZXJ5LFxuICAgICAgWydwYXJlbnQnXSxcbiAgICAgIHBhZ2UsXG4gICAgICBwZXJQYWdlLFxuICAgICk7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhjYXRlZ29yaWVzKTtcbiAgICByZXR1cm4gdGhpcy5fY2F0ZWdvcnlTZXJ2aWNlLm1hcDxDYXRlZ29yeVZtW10+KFxuICAgICAgbWFwKGNhdGVnb3JpZXMsIGNhdGVnb3J5ID0+IGNhdGVnb3J5LnRvSlNPTigpKSxcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfVxuXG4gIEBQb3N0KClcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChDYXRlZ29yeS5tb2RlbE5hbWUsICdDcmVhdGUnKSlcbiAgQFVzZUludGVyY2VwdG9ycyhGaWxlSW50ZXJjZXB0b3IoJ3RodW1ibmFpbCcpKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbilcbiAgYXN5bmMgcG9zdChcbiAgICBAVXBsb2FkZWRGaWxlKCkgdGh1bWJuYWlsLFxuICAgIEBCb2R5KCkgY2F0ZWdvcnlQYXJhbXM6IENhdGVnb3J5UGFyYW1zLFxuICApOiBQcm9taXNlPENhdGVnb3J5Vm0+IHtcbiAgICBjb25zb2xlLmxvZyhjYXRlZ29yeVBhcmFtcyk7XG4gICAgY29uc3QgeyBuYW1lLCBkZXNjcmlwdGlvbiB9ID0gY2F0ZWdvcnlQYXJhbXM7XG5cbiAgICBpZiAoIXRodW1ibmFpbCkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICAgICdDYXRlZ29yeSBJbWFnZSBpcyBSZXF1aXJlZCcsXG4gICAgICAgIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICAgICduYW1lIG9mIGNhdGVnb3J5IGlzIHJlcXVpcmVkJyxcbiAgICAgICAgSHR0cFN0YXR1cy5CQURfUkVRVUVTVCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY2F0ZWdvcnlQYXJhbXMudGh1bWJuYWlsID0gdGh1bWJuYWlsLnBhdGg7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgY2F0ZWdvcnkgPSB0aGlzLl9jYXRlZ29yeVNlcnZpY2Uub25DcmVhdGVDYXRlZ29yeShjYXRlZ29yeVBhcmFtcyk7XG5cbiAgICAgIHJldHVybiBjYXRlZ29yeTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBAUHV0KClcbiAgQFVzZUludGVyY2VwdG9ycyhGaWxlSW50ZXJjZXB0b3IoJ3RodW1ibmFpbCcpKVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKENhdGVnb3J5Lm1vZGVsTmFtZSwgJ1B1dCcpKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbilcbiAgYXN5bmMgcHV0KFxuICAgIEBVcGxvYWRlZEZpbGUoKSB0aHVtYm5haWwsXG4gICAgQEJvZHkoKSBjYXRlZ29yeVBhcmFtczogQ2F0ZWdvcnlQYXJhbXMsXG4gICk6IFByb21pc2U8Q2F0ZWdvcnlWbT4ge1xuICAgIGNvbnNvbGUubG9nKHRodW1ibmFpbCk7XG5cbiAgICBjb25zdCB7IGlkLCBwYXJlbnQgfSA9IGNhdGVnb3J5UGFyYW1zO1xuXG4gICAgaWYgKCFpZCkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICAgICdpZCByZXNvdXJjZSBpcyByZXF1aXJlZCcsXG4gICAgICAgIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRDYXRlZ29yeSA9IGF3YWl0IHRoaXMuX2NhdGVnb3J5U2VydmljZS5maW5kQnlJZChpZCk7XG5cbiAgICBpZiAoIWN1cnJlbnRDYXRlZ29yeSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICAgIGByZXNvdXJjZSB3aXRoICR7aWR9IG5vdCBmb3VuZGAsXG4gICAgICAgIEh0dHBTdGF0dXMuTk9UX0ZPVU5ELFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBjb25zdCBwYXJlbnRDYXRlZ29yeSA9IGF3YWl0IHRoaXMuX2NhdGVnb3J5U2VydmljZS5maW5kQnlJZChwYXJlbnQpO1xuXG4gICAgICBpZiAoIXBhcmVudENhdGVnb3J5KSB7XG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxuICAgICAgICAgICdwYXJlbnQgcmVzb3VyY2Ugd2l0aCAke2lkfSBub3QgZm91bmQnLFxuICAgICAgICAgIEh0dHBTdGF0dXMuTk9UX0FDQ0VQVEFCTEUsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjdXJyZW50Q2F0ZWdvcnkucGFyZW50ID0gVHlwZXMuT2JqZWN0SWQocGFyZW50KTtcbiAgICB9XG5cbiAgICBpZiAodGh1bWJuYWlsICYmIHRodW1ibmFpbC5wYXRoKSB7XG4gICAgICBjb25zb2xlLmxvZygnVXBkYXRlIFBhdHR0dHR0aCcpO1xuICAgICAgY3VycmVudENhdGVnb3J5LnRodW1ibmFpbCA9IHRodW1ibmFpbC5wYXRoO1xuICAgIH1cblxuICAgIGN1cnJlbnRDYXRlZ29yeS5uYW1lID0gY2F0ZWdvcnlQYXJhbXMubmFtZVxuICAgICAgPyBjYXRlZ29yeVBhcmFtcy5uYW1lXG4gICAgICA6IGN1cnJlbnRDYXRlZ29yeS5uYW1lO1xuICAgIGN1cnJlbnRDYXRlZ29yeS5kZXNjcmlwdGlvbiA9IGNhdGVnb3J5UGFyYW1zLmRlc2NyaXB0aW9uXG4gICAgICA/IGNhdGVnb3J5UGFyYW1zLmRlc2NyaXB0aW9uXG4gICAgICA6IGN1cnJlbnRDYXRlZ29yeS5kZXNjcmlwdGlvbjtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cGRhdGVkQ2F0ZWdvcnkgPSBhd2FpdCB0aGlzLl9jYXRlZ29yeVNlcnZpY2UudXBkYXRlKFxuICAgICAgICBjdXJyZW50Q2F0ZWdvcnkuaWQsXG4gICAgICAgIGN1cnJlbnRDYXRlZ29yeSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB1cGRhdGVkQ2F0ZWdvcnkudG9KU09OKCkgYXMgQ2F0ZWdvcnlWbTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZXJyb3IsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBARGVsZXRlKCc6aWQnKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbilcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChDYXRlZ29yeS5tb2RlbE5hbWUsICdEZWxldGUnKSlcbiAgYXN5bmMgZGVsZXRlKEBQYXJhbSgnaWQnKSBpZCk6IFByb21pc2U8Q2F0ZWdvcnlWbT4ge1xuICAgIGNvbnN0IGN1cnJlbnRDYXRlZ29yeSA9IGF3YWl0IHRoaXMuX2NhdGVnb3J5U2VydmljZS5maW5kQnlJZChpZCk7XG5cbiAgICBpZiAoIWN1cnJlbnRDYXRlZ29yeSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICAgIGAke2lkfSBvZiByZXNvdXJjZSBub3QgZm91bmRgLFxuICAgICAgICBIdHRwU3RhdHVzLk5PVF9GT1VORCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZGVsZXRlZENhdGVnb3J5ID0gYXdhaXQgdGhpcy5fY2F0ZWdvcnlTZXJ2aWNlLmRlbGV0ZShpZCk7XG4gICAgcmV0dXJuIGRlbGV0ZWRDYXRlZ29yeS50b0pTT04oKSBhcyBDYXRlZ29yeVZtO1xuICB9XG59XG4iXX0=