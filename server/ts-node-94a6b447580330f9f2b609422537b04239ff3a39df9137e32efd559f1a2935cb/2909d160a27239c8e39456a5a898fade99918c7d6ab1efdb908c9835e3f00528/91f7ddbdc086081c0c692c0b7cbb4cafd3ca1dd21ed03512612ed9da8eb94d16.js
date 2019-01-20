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
const coupon_service_1 = require("./coupon.service");
const swagger_1 = require("@nestjs/swagger");
const coupon_model_1 = require("./models/coupon.model");
const coupon_vm_model_1 = require("./models/view-models/coupon-vm.model");
const lodash_1 = require("lodash");
const coupon_params_model_1 = require("./models/view-models/coupon-params.model");
const coupon_put_params_model_1 = require("./models/view-models/coupon-put-params.model.");
const to_int_pipe_1 = require("../shared/pipes/to-int.pipe");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const user_role_enum_1 = require("../user/models/user-role.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
let CouponController = class CouponController {
    constructor(_couponService) {
        this._couponService = _couponService;
    }
    get(page, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const coupons = yield this._couponService.findAll();
            return this._couponService.map(lodash_1.map(coupons, coupon => coupon.toJSON()), true);
        });
    }
    post(couponParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coupon = this._couponService.onCreateCoupon(couponParams);
                return coupon;
            }
            catch (e) {
                console.log(e);
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    put(couponParams, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCoupon = yield this._couponService.findById(id);
            if (!existCoupon) {
                throw new common_1.HttpException('Resource not found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                const updatedCoupon = yield this._couponService.onUpdateCoupon(existCoupon, couponParams);
                return updatedCoupon;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCoupon = yield this._couponService.findById(id);
            if (!existCoupon) {
                throw new common_1.HttpException('Resource not found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                const item = yield this._couponService.delete(id);
                return this._couponService.map(item.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCoupon = yield this._couponService.findById(id);
            if (!existCoupon) {
                throw new common_1.HttpException('Resource not found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                return this._couponService.map(existCoupon.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: coupon_vm_model_1.CouponVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(coupon_model_1.Coupon.modelName, 'Get')),
    swagger_1.ApiImplicitQuery({
        name: 'page',
        required: true,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({ name: 'perPage', required: true, type: Number }),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Query('page', new to_int_pipe_1.ToInt())),
    __param(1, common_1.Query('perPage', new to_int_pipe_1.ToInt())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "get", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(coupon_model_1.Coupon.modelName, 'Post')),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.User),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_params_model_1.CouponParams]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "post", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(coupon_model_1.Coupon.modelName, 'Put')),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_put_params_model_1.CouponPutParams, Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "put", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(coupon_model_1.Coupon.modelName, 'Delete')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "delete", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "getOne", null);
CouponController = __decorate([
    common_1.Controller('coupons'),
    swagger_1.ApiUseTags(coupon_model_1.Coupon.name),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponController);
exports.CouponController = CouponController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vY291cG9uLmNvbnRyb2xsZXIudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvY291cG9uL2NvdXBvbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FZd0I7QUFDeEIscURBQWlEO0FBQ2pELDZDQU15QjtBQUN6Qix3REFBK0M7QUFDL0MsMEVBQWdFO0FBQ2hFLG1DQUE2QjtBQUM3QixrRkFBd0U7QUFJeEUsMkZBQWdGO0FBQ2hGLDZEQUFvRDtBQUNwRCx1RUFBNkQ7QUFDN0QsMkVBQXNFO0FBQ3RFLDBFQUE2RDtBQUM3RCxrRUFBeUQ7QUFDekQsK0NBQTZDO0FBQzdDLDhEQUEwRDtBQUsxRCxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUMzQixZQUE2QixjQUE2QjtRQUE3QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtJQUFHLENBQUM7SUFjeEQsR0FBRyxDQUNxQixJQUFZLEVBQ1QsT0FBZTs7WUFFOUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBTXBELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQzVCLFlBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFDdkMsSUFBSSxDQUNMLENBQUM7UUFDSixDQUFDO0tBQUE7SUFNSyxJQUFJLENBQVMsWUFBMEI7O1lBQzNDLElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dC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QUMsQ0FBQztJQUMzQyxXQUFBLGNBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTs7Ozs4Q0FheEI7QUFHRDtJQURDLFlBQUcsQ0FBQyxLQUFLLENBQUM7SUFDRyxXQUFBLGNBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTs7Ozs4Q0FZeEI7QUF2R1UsZ0JBQWdCO0lBSDVCLG1CQUFVLENBQUMsU0FBUyxDQUFDO0lBQ3JCLG9CQUFVLENBQUMscUJBQU0sQ0FBQyxJQUFJLENBQUM7SUFDdkIsdUJBQWEsRUFBRTtxQ0FFK0IsOEJBQWE7R0FEL0MsZ0JBQWdCLENBd0c1QjtBQXhHWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIFBvc3QsXG4gIEJvZHksXG4gIEh0dHBFeGNlcHRpb24sXG4gIEh0dHBTdGF0dXMsXG4gIFB1dCxcbiAgUGFyYW0sXG4gIERlbGV0ZSxcbiAgUXVlcnksXG4gIFVzZUd1YXJkcyxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ291cG9uU2VydmljZSB9IGZyb20gJy4vY291cG9uLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQXBpVXNlVGFncyxcbiAgQXBpQmVhcmVyQXV0aCxcbiAgQXBpUmVzcG9uc2UsXG4gIEFwaU9wZXJhdGlvbixcbiAgQXBpSW1wbGljaXRRdWVyeSxcbn0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IENvdXBvbiB9IGZyb20gJy4vbW9kZWxzL2NvdXBvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vwb25WbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL2NvdXBvbi12bS5tb2RlbCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQ291cG9uUGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvY291cG9uLXBhcmFtcy5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vwb25MZXZlbCB9IGZyb20gJy4vbW9kZWxzL2NvdXBvbi1sZXZlbC5lbnVtJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgSXNVbmlxdWVDb3Vwb25Db2RlIH0gZnJvbSAnLi4vc2hhcmVkL3ZhbGlkYXRvcnMvY291cG9ucy91bmlxdWUtY291cG9uLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb3Vwb25QdXRQYXJhbXMgfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9jb3Vwb24tcHV0LXBhcmFtcy5tb2RlbC4nO1xuaW1wb3J0IHsgVG9JbnQgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvdG8taW50LnBpcGUnO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2FwaS1leGNlcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgR2V0T3BlcmF0aW9uSWQgfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2dldC1vcGVyYXRpb24taWQnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9zaGFyZWQvZGVjb3JhdG9ycy9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlclJvbGUgfSBmcm9tICcuLi91c2VyL21vZGVscy91c2VyLXJvbGUuZW51bSc7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9zaGFyZWQvZ3VhcmRzL3JvbGVzLmd1YXJkJztcblxuQENvbnRyb2xsZXIoJ2NvdXBvbnMnKVxuQEFwaVVzZVRhZ3MoQ291cG9uLm5hbWUpXG5AQXBpQmVhcmVyQXV0aCgpXG5leHBvcnQgY2xhc3MgQ291cG9uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgX2NvdXBvblNlcnZpY2U6IENvdXBvblNlcnZpY2UpIHt9XG5cbiAgQEdldCgpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogQ291cG9uVm0sIGlzQXJyYXk6IHRydWUgfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChDb3Vwb24ubW9kZWxOYW1lLCAnR2V0JykpXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHtcbiAgICBuYW1lOiAncGFnZScsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogTnVtYmVyLFxuICB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7IG5hbWU6ICdwZXJQYWdlJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IE51bWJlciB9KVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4pXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgZ2V0KFxuICAgIEBRdWVyeSgncGFnZScsIG5ldyBUb0ludCgpKSBwYWdlOiBudW1iZXIsXG4gICAgQFF1ZXJ5KCdwZXJQYWdlJywgbmV3IFRvSW50KCkpIHBlclBhZ2U6IG51bWJlcixcbiAgKTogUHJvbWlzZTxDb3Vwb25WbVtdPiB7XG4gICAgY29uc3QgY291cG9ucyA9IGF3YWl0IHRoaXMuX2NvdXBvblNlcnZpY2UuZmluZEFsbCgpO1xuICAgIC8vIHJldHVybiB0aGlzLl90b2RvU2VydmljZS5tYXA8VG9kb1ZtW10+KFxuICAgIC8vICAgICBtYXAodG9kb3MsIHRvZG8gPT4gdG9kby50b0pTT04oKSksXG4gICAgLy8gICAgIHRydWUsXG4gICAgLy8gICApO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NvdXBvblNlcnZpY2UubWFwPENvdXBvblZtW10+KFxuICAgICAgbWFwKGNvdXBvbnMsIGNvdXBvbiA9PiBjb3Vwb24udG9KU09OKCkpLFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9XG5cbiAgQFBvc3QoKVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKENvdXBvbi5tb2RlbE5hbWUsICdQb3N0JykpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluLCBVc2VyUm9sZS5Vc2VyKVxuICBhc3luYyBwb3N0KEBCb2R5KCkgY291cG9uUGFyYW1zOiBDb3Vwb25QYXJhbXMpOiBQcm9taXNlPENvdXBvblZtPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvdXBvbiA9IHRoaXMuX2NvdXBvblNlcnZpY2Uub25DcmVhdGVDb3Vwb24oY291cG9uUGFyYW1zKTtcbiAgICAgIHJldHVybiBjb3Vwb247XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQFB1dCgnOmlkJylcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChDb3Vwb24ubW9kZWxOYW1lLCAnUHV0JykpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluKVxuICBhc3luYyBwdXQoXG4gICAgQEJvZHkoKSBjb3Vwb25QYXJhbXM6IENvdXBvblB1dFBhcmFtcyxcbiAgICBAUGFyYW0oJ2lkJykgaWQsXG4gICk6IFByb21pc2U8Q291cG9uVm0+IHtcbiAgICBjb25zdCBleGlzdENvdXBvbiA9IGF3YWl0IHRoaXMuX2NvdXBvblNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuXG4gICAgaWYgKCFleGlzdENvdXBvbikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIG5vdCBmb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXBkYXRlZENvdXBvbiA9IGF3YWl0IHRoaXMuX2NvdXBvblNlcnZpY2Uub25VcGRhdGVDb3Vwb24oXG4gICAgICAgIGV4aXN0Q291cG9uLFxuICAgICAgICBjb3Vwb25QYXJhbXMsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gdXBkYXRlZENvdXBvbjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQERlbGV0ZSgnOmlkJylcbiAgQFVzZUd1YXJkcyhBdXRoR3VhcmQoJ2p3dCcpLCBSb2xlc0d1YXJkKVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoQ291cG9uLm1vZGVsTmFtZSwgJ0RlbGV0ZScpKVxuICBhc3luYyBkZWxldGUoQFBhcmFtKCdpZCcpIGlkKSB7XG4gICAgY29uc3QgZXhpc3RDb3Vwb24gPSBhd2FpdCB0aGlzLl9jb3Vwb25TZXJ2aWNlLmZpbmRCeUlkKGlkKTtcblxuICAgIGlmICghZXhpc3RDb3Vwb24pIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBub3QgZm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCB0aGlzLl9jb3Vwb25TZXJ2aWNlLmRlbGV0ZShpZCk7XG4gICAgICByZXR1cm4gdGhpcy5fY291cG9uU2VydmljZS5tYXA8Q291cG9uVm0+KGl0ZW0udG9KU09OKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBAR2V0KCc6aWQnKVxuICBhc3luYyBnZXRPbmUoQFBhcmFtKCdpZCcpIGlkKSB7XG4gICAgY29uc3QgZXhpc3RDb3Vwb24gPSBhd2FpdCB0aGlzLl9jb3Vwb25TZXJ2aWNlLmZpbmRCeUlkKGlkKTtcblxuICAgIGlmICghZXhpc3RDb3Vwb24pIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBub3QgZm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB0aGlzLl9jb3Vwb25TZXJ2aWNlLm1hcDxDb3Vwb25WbT4oZXhpc3RDb3Vwb24udG9KU09OKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==