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
const slider_service_1 = require("./slider.service");
const slider_vm_model_1 = require("./models/view-models/slider-vm.model");
const slider_param_model_1 = require("./models/view-models/slider-param.model");
const lodash_1 = require("lodash");
const swagger_1 = require("@nestjs/swagger");
const api_exception_model_1 = require("../shared/api-exception.model");
const slider_model_1 = require("./models/slider.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const to_int_pipe_1 = require("../shared/pipes/to-int.pipe");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const user_role_enum_1 = require("../user/models/user-role.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
let SliderController = class SliderController {
    constructor(_sliderService) {
        this._sliderService = _sliderService;
    }
    get(page, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(page) || isNaN(perPage)) {
                throw new common_1.HttpException('page and perPage must be numbers', common_1.HttpStatus.BAD_REQUEST);
            }
            console.log(page, perPage);
            const sliders = yield this._sliderService.findAll({}, ['category'], page, perPage);
            return yield this._sliderService.map(lodash_1.map(sliders, slider => slider.toJSON()), true);
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const slider = yield this._sliderService.findById(id, ['item']);
            if (!slider) {
                throw new common_1.HttpException('Resource not Found', common_1.HttpStatus.NOT_FOUND);
            }
            return yield this._sliderService.map(slider.toJSON());
        });
    }
    post(banner, sliderParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!banner || banner.path) {
                throw new common_1.HttpException('Banner Is Required', common_1.HttpStatus.BAD_REQUEST);
            }
            sliderParams.banner = banner.path;
            try {
                const slider = yield this._sliderService.onCreateSlider(sliderParams);
                return slider;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    put(banner, id, sliderParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const slider = yield this._sliderService.findById(id);
            if (!slider) {
                throw new common_1.HttpException('Resource not Found', common_1.HttpStatus.NOT_FOUND);
            }
            if (banner && banner.path) {
                sliderParams.banner = banner.path;
            }
            try {
                const updatedSlider = yield this._sliderService.onUpdateSlider(slider, sliderParams);
                return updatedSlider;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const slider = yield this._sliderService.findById(id);
            if (!slider) {
                throw new common_1.HttpException('Resource not Found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                const deletedSlider = yield this._sliderService.delete(id);
                return yield this._sliderService.map(deletedSlider.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: slider_vm_model_1.SliderVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(slider_model_1.Slider.modelName, 'Get')),
    swagger_1.ApiImplicitQuery({
        name: 'page',
        required: true,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({ name: 'perPage', required: true, type: Number }),
    __param(0, common_1.Query('page', new to_int_pipe_1.ToInt())),
    __param(1, common_1.Query('perPage', new to_int_pipe_1.ToInt())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "get", null);
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(slider_model_1.Slider.modelName, 'GetOne')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "getOne", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(slider_model_1.Slider.modelName, 'Create')),
    common_1.UseInterceptors(common_1.FileInterceptor('banner')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, slider_param_model_1.SliderParams]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "post", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(slider_model_1.Slider.modelName, 'Put')),
    common_1.UseInterceptors(common_1.FileInterceptor('banner')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, slider_param_model_1.SliderParams]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "put", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(slider_model_1.Slider.modelName, 'Delete')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SliderController.prototype, "delete", null);
SliderController = __decorate([
    common_1.Controller('sliders'),
    swagger_1.ApiUseTags(slider_model_1.Slider.modelName),
    __metadata("design:paramtypes", [slider_service_1.SliderService])
], SliderController);
exports.SliderController = SliderController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvc2xpZGVyLmNvbnRyb2xsZXIudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvc2xpZGVyL3NsaWRlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0Fld0I7QUFDeEIscURBQWlEO0FBQ2pELDBFQUFnRTtBQUNoRSxnRkFBdUU7QUFFdkUsbUNBQTZCO0FBQzdCLDZDQUt5QjtBQUN6Qix1RUFBNkQ7QUFDN0Qsd0RBQStDO0FBQy9DLDJFQUFzRTtBQUN0RSw2REFBb0Q7QUFDcEQsMEVBQTZEO0FBQzdELGtFQUF5RDtBQUN6RCwrQ0FBNkM7QUFDN0MsOERBQTBEO0FBSTFELElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQzNCLFlBQTZCLGNBQTZCO1FBQTdCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO0lBQUcsQ0FBQztJQVl4RCxHQUFHLENBQ3FCLElBQVksRUFDVCxPQUFlOztZQUU5QyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxzQkFBYSxDQUNyQixrQ0FBa0MsRUFDbEMsbUJBQVUsQ0FBQyxXQUFXLENBQ3ZCLENBQUM7YUFDSDtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQy9DLEVBQUUsRUFDRixDQUFDLFVBQVUsQ0FBQyxFQUNaLElBQUksRUFDSixPQUFPLENBQ1IsQ0FBQztZQUVGLE9BQU8sTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDbEMsWUFBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FB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QSxhQUFJLEVBQUUsQ0FBQTs7NkNBQWUsaUNBQVk7OzRDQWVuQztBQU9EO0lBTEMsWUFBRyxDQUFDLEtBQUssQ0FBQztJQUNWLHNCQUFZLENBQUMsaUNBQWMsQ0FBQyxxQkFBTSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCx3QkFBZSxDQUFDLHdCQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsdUJBQUssQ0FBQyx5QkFBUSxDQUFDLEtBQUssQ0FBQztJQUNyQixrQkFBUyxDQUFDLG9CQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsd0JBQVUsQ0FBQztJQUVyQyxXQUFBLHFCQUFZLEVBQUUsQ0FBQTtJQUNkLFdBQUEsY0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ1gsV0FBQSxhQUFJLEVBQUUsQ0FBQTs7cURBQWUsaUNBQVk7OzJDQXNCbkM7QUFNRDtJQUpDLGVBQU0sQ0FBQyxLQUFLLENBQUM7SUFDYixzQkFBWSxDQUFDLGlDQUFjLENBQUMscUJBQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEQsdUJBQUssQ0FBQyx5QkFBUSxDQUFDLEtBQUssQ0FBQztJQUNyQixrQkFBUyxDQUFDLG9CQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsd0JBQVUsQ0FBQztJQUMxQixXQUFBLGNBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTs7Ozs4Q0FjeEI7QUE1SFUsZ0JBQWdCO0lBRjVCLG1CQUFVLENBQUMsU0FBUyxDQUFDO0lBQ3JCLG9CQUFVLENBQUMscUJBQU0sQ0FBQyxTQUFTLENBQUM7cUNBRWtCLDhCQUFhO0dBRC9DLGdCQUFnQixDQTZINUI7QUE3SFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBCb2R5LFxuICBQb3N0LFxuICBQdXQsXG4gIFBhcmFtLFxuICBEZWxldGUsXG4gIFVzZUludGVyY2VwdG9ycyxcbiAgRmlsZUludGVyY2VwdG9yLFxuICBVcGxvYWRlZEZpbGUsXG4gIEh0dHBFeGNlcHRpb24sXG4gIEh0dHBTdGF0dXMsXG4gIFF1ZXJ5LFxuICBVc2VHdWFyZHMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNsaWRlclNlcnZpY2UgfSBmcm9tICcuL3NsaWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNsaWRlclZtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvc2xpZGVyLXZtLm1vZGVsJztcbmltcG9ydCB7IFNsaWRlclBhcmFtcyB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3NsaWRlci1wYXJhbS5tb2RlbCc7XG5pbXBvcnQgeyBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1xuICBBcGlSZXNwb25zZSxcbiAgQXBpT3BlcmF0aW9uLFxuICBBcGlJbXBsaWNpdFF1ZXJ5LFxuICBBcGlVc2VUYWdzLFxufSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2FwaS1leGNlcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgU2xpZGVyIH0gZnJvbSAnLi9tb2RlbHMvc2xpZGVyLm1vZGVsJztcbmltcG9ydCB7IEdldE9wZXJhdGlvbklkIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxpdGllcy9nZXQtb3BlcmF0aW9uLWlkJztcbmltcG9ydCB7IFRvSW50IH0gZnJvbSAnLi4vc2hhcmVkL3BpcGVzL3RvLWludC5waXBlJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vc2hhcmVkL2RlY29yYXRvcnMvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSAnLi4vdXNlci9tb2RlbHMvdXNlci1yb2xlLmVudW0nO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9yb2xlcy5ndWFyZCc7XG5cbkBDb250cm9sbGVyKCdzbGlkZXJzJylcbkBBcGlVc2VUYWdzKFNsaWRlci5tb2RlbE5hbWUpXG5leHBvcnQgY2xhc3MgU2xpZGVyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgX3NsaWRlclNlcnZpY2U6IFNsaWRlclNlcnZpY2UpIHt9XG5cbiAgQEdldCgpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogU2xpZGVyVm0sIGlzQXJyYXk6IHRydWUgfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChTbGlkZXIubW9kZWxOYW1lLCAnR2V0JykpXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHtcbiAgICBuYW1lOiAncGFnZScsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogTnVtYmVyLFxuICB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7IG5hbWU6ICdwZXJQYWdlJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IE51bWJlciB9KVxuICBhc3luYyBnZXQoXG4gICAgQFF1ZXJ5KCdwYWdlJywgbmV3IFRvSW50KCkpIHBhZ2U6IG51bWJlcixcbiAgICBAUXVlcnkoJ3BlclBhZ2UnLCBuZXcgVG9JbnQoKSkgcGVyUGFnZTogbnVtYmVyLFxuICApOiBQcm9taXNlPFNsaWRlclZtW10+IHtcbiAgICBpZiAoaXNOYU4ocGFnZSkgfHwgaXNOYU4ocGVyUGFnZSkpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKFxuICAgICAgICAncGFnZSBhbmQgcGVyUGFnZSBtdXN0IGJlIG51bWJlcnMnLFxuICAgICAgICBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhwYWdlLCBwZXJQYWdlKTtcbiAgICBjb25zdCBzbGlkZXJzID0gYXdhaXQgdGhpcy5fc2xpZGVyU2VydmljZS5maW5kQWxsKFxuICAgICAge30sXG4gICAgICBbJ2NhdGVnb3J5J10sXG4gICAgICBwYWdlLFxuICAgICAgcGVyUGFnZSxcbiAgICApO1xuXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX3NsaWRlclNlcnZpY2UubWFwPFNsaWRlclZtW10+KFxuICAgICAgbWFwKHNsaWRlcnMsIHNsaWRlciA9PiBzbGlkZXIudG9KU09OKCkpLFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9XG5cbiAgQEdldCgnOmlkJylcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChTbGlkZXIubW9kZWxOYW1lLCAnR2V0T25lJykpXG4gIGFzeW5jIGdldE9uZShAUGFyYW0oJ2lkJykgaWQpOiBQcm9taXNlPFNsaWRlclZtPiB7XG4gICAgY29uc3Qgc2xpZGVyID0gYXdhaXQgdGhpcy5fc2xpZGVyU2VydmljZS5maW5kQnlJZChpZCwgWydpdGVtJ10pO1xuXG4gICAgaWYgKCFzbGlkZXIpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBub3QgRm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX3NsaWRlclNlcnZpY2UubWFwPFNsaWRlclZtPihzbGlkZXIudG9KU09OKCkpO1xuICB9XG5cbiAgQFBvc3QoKVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKFNsaWRlci5tb2RlbE5hbWUsICdDcmVhdGUnKSlcbiAgQFVzZUludGVyY2VwdG9ycyhGaWxlSW50ZXJjZXB0b3IoJ2Jhbm5lcicpKVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4pXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgcG9zdChcbiAgICBAVXBsb2FkZWRGaWxlKCkgYmFubmVyLFxuICAgIEBCb2R5KCkgc2xpZGVyUGFyYW1zOiBTbGlkZXJQYXJhbXMsXG4gICk6IFByb21pc2U8U2xpZGVyVm0+IHtcbiAgICBpZiAoIWJhbm5lciB8fCBiYW5uZXIucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ0Jhbm5lciBJcyBSZXF1aXJlZCcsIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpO1xuICAgIH1cblxuICAgIHNsaWRlclBhcmFtcy5iYW5uZXIgPSBiYW5uZXIucGF0aDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzbGlkZXIgPSBhd2FpdCB0aGlzLl9zbGlkZXJTZXJ2aWNlLm9uQ3JlYXRlU2xpZGVyKHNsaWRlclBhcmFtcyk7XG5cbiAgICAgIHJldHVybiBzbGlkZXI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxuXG4gIEBQdXQoJzppZCcpXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoU2xpZGVyLm1vZGVsTmFtZSwgJ1B1dCcpKVxuICBAVXNlSW50ZXJjZXB0b3JzKEZpbGVJbnRlcmNlcHRvcignYmFubmVyJykpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbilcbiAgQFVzZUd1YXJkcyhBdXRoR3VhcmQoJ2p3dCcpLCBSb2xlc0d1YXJkKVxuICBhc3luYyBwdXQoXG4gICAgQFVwbG9hZGVkRmlsZSgpIGJhbm5lcixcbiAgICBAUGFyYW0oJ2lkJykgaWQsXG4gICAgQEJvZHkoKSBzbGlkZXJQYXJhbXM6IFNsaWRlclBhcmFtcyxcbiAgKTogUHJvbWlzZTxTbGlkZXJWbT4ge1xuICAgIGNvbnN0IHNsaWRlciA9IGF3YWl0IHRoaXMuX3NsaWRlclNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuXG4gICAgaWYgKCFzbGlkZXIpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBub3QgRm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgaWYgKGJhbm5lciAmJiBiYW5uZXIucGF0aCkge1xuICAgICAgc2xpZGVyUGFyYW1zLmJhbm5lciA9IGJhbm5lci5wYXRoO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cGRhdGVkU2xpZGVyID0gYXdhaXQgdGhpcy5fc2xpZGVyU2VydmljZS5vblVwZGF0ZVNsaWRlcihcbiAgICAgICAgc2xpZGVyLFxuICAgICAgICBzbGlkZXJQYXJhbXMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gdXBkYXRlZFNsaWRlcjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQERlbGV0ZSgnOmlkJylcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChTbGlkZXIubW9kZWxOYW1lLCAnRGVsZXRlJykpXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbilcbiAgQFVzZUd1YXJkcyhBdXRoR3VhcmQoJ2p3dCcpLCBSb2xlc0d1YXJkKVxuICBhc3luYyBkZWxldGUoQFBhcmFtKCdpZCcpIGlkKTogUHJvbWlzZTxTbGlkZXJWbT4ge1xuICAgIGNvbnN0IHNsaWRlciA9IGF3YWl0IHRoaXMuX3NsaWRlclNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuXG4gICAgaWYgKCFzbGlkZXIpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBub3QgRm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGRlbGV0ZWRTbGlkZXIgPSBhd2FpdCB0aGlzLl9zbGlkZXJTZXJ2aWNlLmRlbGV0ZShpZCk7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9zbGlkZXJTZXJ2aWNlLm1hcDxTbGlkZXJWbT4oZGVsZXRlZFNsaWRlci50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxufVxuIl19