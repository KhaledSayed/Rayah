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
const order_params_model_1 = require("./models/view-models/order-params.model");
const order_vm_model_1 = require("./models/view-models/order-vm.model");
const order_service_1 = require("./order.service");
const product_service_1 = require("../product/product.service");
const coupon_service_1 = require("../coupon/coupon.service");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const user_role_enum_1 = require("../user/models/user-role.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
const mongoose_1 = require("mongoose");
const order_put_params_model_1 = require("./models/view-models/order-put-params.model");
const lodash_1 = require("lodash");
const swagger_1 = require("@nestjs/swagger");
const order_model_1 = require("./models/order.model");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const to_int_pipe_1 = require("../shared/pipes/to-int.pipe");
const order_level_enum_1 = require("./models/order-level.enum");
const enum_to_array_1 = require("../shared/utilities/enum-to-array");
const user_service_1 = require("../user/user.service");
let OrderController = class OrderController {
    constructor(_orderService, _productService, _couponService, _userService) {
        this._orderService = _orderService;
        this._productService = _productService;
        this._couponService = _couponService;
        this._userService = _userService;
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this._orderService.findById(id, [
                'basket.product',
                'user',
            ]);
            if (!order) {
                throw new common_1.HttpException('Resource Not Found', common_1.HttpStatus.NOT_FOUND);
            }
            return yield this._orderService.map(order.toJSON());
        });
    }
    get(page, perPage, status, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentTest = 'Admin';
            let statusQuery = [];
            status.forEach(item => {
                statusQuery.push({ status: item });
            });
            if (currentTest === 'User') {
                const orders = yield this._orderService.findAll({
                    $and: [{ user: mongoose_1.Types.ObjectId(req.user._id) }],
                    $or: [...statusQuery],
                }, ['basket.product', 'user'], page, perPage);
                return yield this._orderService.map(lodash_1.map(orders, order => order.toJSON()), true);
            }
            else {
                const orders = yield this._orderService.findAll({ $or: [...statusQuery] }, ['basket.product', 'user'], page, perPage);
                return yield this._orderService.map(lodash_1.map(orders, order => order.toJSON()), true);
            }
        });
    }
    post(orderParams, req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Authenticated User Pre Test:', req.user);
            const ids = [];
            const items = orderParams.basket;
            let coupon = null;
            const updatedProducts = [];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                console.log(item);
                const product = yield this._productService.findById(item.id);
                updatedProducts.push({
                    quantity: item.quantity,
                    price: product.price,
                    id: mongoose_1.Types.ObjectId(item.id),
                });
            }
            try {
                let order = null;
                if (req.user && req.user.type !== user_role_enum_1.UserRole.Admin) {
                    console.log(req.user);
                    order = yield this._orderService.onCreateOrder(updatedProducts, coupon, req.user, orderParams);
                }
                else {
                    const user = yield this._userService.findById(orderParams.user);
                    order = yield this._orderService.onCreateOrder(updatedProducts, coupon, user, orderParams);
                }
                return order;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    put(orderParams, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this._orderService.findById(id, ['coupon']);
            if (!order) {
                throw new common_1.HttpException('Resource not found', common_1.HttpStatus.NOT_FOUND);
            }
            let coupon = null;
            const items = orderParams.basket;
            const updatedProducts = [];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                console.log('Step #1');
                const product = yield this._productService.findById(item.id);
                if (orderParams.status === order_level_enum_1.OrderLevel.Complete) {
                    product.quantity = product.quantity - item.quantity;
                    let updatedProduct;
                    try {
                        updatedProduct = yield this._productService.update(item.id, product);
                        console.log('Step #2');
                    }
                    catch (e) {
                        console.log(e);
                        throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                updatedProducts.push({
                    quantity: item.quantity,
                    price: product.price,
                    id: mongoose_1.Types.ObjectId(item.id),
                });
            }
            try {
                const updatedOrder = yield this._orderService.onUpdateOrder(order, orderParams, updatedProducts);
                return updatedOrder;
            }
            catch (e) {
                console.log('Step #4', e);
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this._orderService.findById(id);
            if (!order) {
                throw new common_1.HttpException('Resource Not Found', common_1.HttpStatus.NOT_FOUND);
            }
            try {
                const deletedOrder = yield this._orderService.delete(id);
                return yield this._orderService.map(deletedOrder.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    common_1.Get(':id'),
    swagger_1.ApiImplicitParam({ name: 'id', type: String }),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOne", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: order_vm_model_1.OrderVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(order_model_1.Order.modelName, 'Get')),
    swagger_1.ApiImplicitQuery({
        name: 'page',
        required: true,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({ name: 'perPage', required: true, type: Number }),
    swagger_1.ApiImplicitQuery({
        name: 'status',
        enum: enum_to_array_1.EnumToArray(order_level_enum_1.OrderLevel),
        isArray: true,
    }),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.User, user_role_enum_1.UserRole.Collecter, user_role_enum_1.UserRole.Cashier),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Query('page', new to_int_pipe_1.ToInt())),
    __param(1, common_1.Query('perPage', new to_int_pipe_1.ToInt())),
    __param(2, common_1.Query('status')),
    __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "get", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(order_model_1.Order.modelName, 'Create')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.User),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Body()),
    __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_params_model_1.OrderParam, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "post", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(order_model_1.Order.modelName, 'Update')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin, user_role_enum_1.UserRole.Collecter, user_role_enum_1.UserRole.Cashier),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_put_params_model_1.OrderPutParams, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "put", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(order_model_1.Order.modelName, 'Delete')),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "delete", null);
OrderController = __decorate([
    common_1.Controller('orders'),
    swagger_1.ApiUseTags(order_model_1.Order.modelName),
    swagger_1.ApiBearerAuth(),
    __param(1, common_1.Inject(common_1.forwardRef(() => product_service_1.ProductService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => coupon_service_1.CouponService))),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        product_service_1.ProductService,
        coupon_service_1.CouponService,
        user_service_1.UserService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9vcmRlci5jb250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL29yZGVyL29yZGVyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQWV3QjtBQUN4QixnRkFBcUU7QUFDckUsd0VBQThEO0FBQzlELG1EQUErQztBQUMvQyxnRUFBNEQ7QUFDNUQsNkRBQXlEO0FBRXpELDBFQUE2RDtBQUM3RCxrRUFBeUQ7QUFDekQsK0NBQTZDO0FBQzdDLDhEQUEwRDtBQUcxRCx1Q0FBaUM7QUFDakMsd0ZBQTZFO0FBQzdFLG1DQUE2QjtBQUM3Qiw2Q0FPeUI7QUFDekIsc0RBQTZDO0FBQzdDLHVFQUE2RDtBQUM3RCwyRUFBc0U7QUFDdEUsNkRBQW9EO0FBQ3BELGdFQUF1RDtBQUN2RCxxRUFBZ0U7QUFFaEUsdURBQW1EO0FBS25ELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFDbUIsYUFBMkIsRUFFM0IsZUFBK0IsRUFFL0IsY0FBNkIsRUFDN0IsWUFBeUI7UUFMekIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFFM0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBRS9CLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUFhO0lBQ3pDLENBQUM7SUFJRSxNQUFNLENBQWMsRUFBRTs7WUFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xELGdCQUFnQjtnQkFDaEIsTUFBTTthQUNQLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLHNCQUFhLENBQUMsb0JBQW9CLEVBQUUsbUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNyRTtZQUVELE9BQU8sTUFB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M0I7QUFoUFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb250cm9sbGVyLFxuICBHZXQsXG4gIFBvc3QsXG4gIFB1dCxcbiAgRGVsZXRlLFxuICBQYXJhbSxcbiAgUmVxdWVzdCxcbiAgSHR0cEV4Y2VwdGlvbixcbiAgSHR0cFN0YXR1cyxcbiAgSW5qZWN0LFxuICBmb3J3YXJkUmVmLFxuICBVc2VHdWFyZHMsXG4gIEJvZHksXG4gIFF1ZXJ5LFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBPcmRlclBhcmFtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItcGFyYW1zLm1vZGVsJztcbmltcG9ydCB7IE9yZGVyVm0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9vcmRlci12bS5tb2RlbCc7XG5pbXBvcnQgeyBPcmRlclNlcnZpY2UgfSBmcm9tICcuL29yZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tICcuLi9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZSc7XG5pbXBvcnQgeyBDb3Vwb25TZXJ2aWNlIH0gZnJvbSAnLi4vY291cG9uL2NvdXBvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2VyL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vc2hhcmVkL2RlY29yYXRvcnMvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSAnLi4vdXNlci9tb2RlbHMvdXNlci1yb2xlLmVudW0nO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBhc3luYyB9IGZyb20gJ3J4anMvaW50ZXJuYWwvc2NoZWR1bGVyL2FzeW5jJztcbmltcG9ydCB7IFByb2R1Y3RJdGVtIH0gZnJvbSAnLi9tb2RlbHMvcHJvZHVjdC1pdGVtLm1vZGVsJztcbmltcG9ydCB7IFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgT3JkZXJQdXRQYXJhbXMgfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9vcmRlci1wdXQtcGFyYW1zLm1vZGVsJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1xuICBBcGlVc2VUYWdzLFxuICBBcGlCZWFyZXJBdXRoLFxuICBBcGlSZXNwb25zZSxcbiAgQXBpT3BlcmF0aW9uLFxuICBBcGlJbXBsaWNpdFF1ZXJ5LFxuICBBcGlJbXBsaWNpdFBhcmFtLFxufSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuL21vZGVscy9vcmRlci5tb2RlbCc7XG5pbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tICcuLi9zaGFyZWQvYXBpLWV4Y2VwdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBHZXRPcGVyYXRpb25JZCB9IGZyb20gJy4uL3NoYXJlZC91dGlsaXRpZXMvZ2V0LW9wZXJhdGlvbi1pZCc7XG5pbXBvcnQgeyBUb0ludCB9IGZyb20gJy4uL3NoYXJlZC9waXBlcy90by1pbnQucGlwZSc7XG5pbXBvcnQgeyBPcmRlckxldmVsIH0gZnJvbSAnLi9tb2RlbHMvb3JkZXItbGV2ZWwuZW51bSc7XG5pbXBvcnQgeyBFbnVtVG9BcnJheSB9IGZyb20gJy4uL3NoYXJlZC91dGlsaXRpZXMvZW51bS10by1hcnJheSc7XG5pbXBvcnQgeyBzdGF0IH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyL3VzZXIuc2VydmljZSc7XG5cbkBDb250cm9sbGVyKCdvcmRlcnMnKVxuQEFwaVVzZVRhZ3MoT3JkZXIubW9kZWxOYW1lKVxuQEFwaUJlYXJlckF1dGgoKVxuZXhwb3J0IGNsYXNzIE9yZGVyQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX29yZGVyU2VydmljZTogT3JkZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBQcm9kdWN0U2VydmljZSkpXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBDb3Vwb25TZXJ2aWNlKSlcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jb3Vwb25TZXJ2aWNlOiBDb3Vwb25TZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzppZCcpXG4gIEBBcGlJbXBsaWNpdFBhcmFtKHsgbmFtZTogJ2lkJywgdHlwZTogU3RyaW5nIH0pXG4gIGFzeW5jIGdldE9uZShAUGFyYW0oJ2lkJykgaWQpOiBQcm9taXNlPE9yZGVyVm0+IHtcbiAgICBjb25zdCBvcmRlciA9IGF3YWl0IHRoaXMuX29yZGVyU2VydmljZS5maW5kQnlJZChpZCwgW1xuICAgICAgJ2Jhc2tldC5wcm9kdWN0JyxcbiAgICAgICd1c2VyJyxcbiAgICBdKTtcblxuICAgIGlmICghb3JkZXIpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBOb3QgRm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX29yZGVyU2VydmljZS5tYXA8T3JkZXJWbT4ob3JkZXIudG9KU09OKCkpO1xuICB9XG5cbiAgQEdldCgpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5PSywgdHlwZTogT3JkZXJWbSwgaXNBcnJheTogdHJ1ZSB9KVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKE9yZGVyLm1vZGVsTmFtZSwgJ0dldCcpKVxuICBAQXBpSW1wbGljaXRRdWVyeSh7XG4gICAgbmFtZTogJ3BhZ2UnLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6IE51bWJlcixcbiAgfSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoeyBuYW1lOiAncGVyUGFnZScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBOdW1iZXIgfSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoe1xuICAgIG5hbWU6ICdzdGF0dXMnLFxuICAgIGVudW06IEVudW1Ub0FycmF5KE9yZGVyTGV2ZWwpLFxuICAgIGlzQXJyYXk6IHRydWUsXG4gIH0pXG4gIEBSb2xlcyhVc2VyUm9sZS5BZG1pbiwgVXNlclJvbGUuVXNlciwgVXNlclJvbGUuQ29sbGVjdGVyLCBVc2VyUm9sZS5DYXNoaWVyKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIGdldChcbiAgICBAUXVlcnkoJ3BhZ2UnLCBuZXcgVG9JbnQoKSkgcGFnZTogbnVtYmVyLFxuICAgIEBRdWVyeSgncGVyUGFnZScsIG5ldyBUb0ludCgpKSBwZXJQYWdlOiBudW1iZXIsXG4gICAgQFF1ZXJ5KCdzdGF0dXMnKSBzdGF0dXM6IE9yZGVyTGV2ZWxbXSxcbiAgICBAUmVxdWVzdCgpIHJlcSxcbiAgKSB7XG4gICAgbGV0IGN1cnJlbnRUZXN0ID0gJ0FkbWluJztcbiAgICBsZXQgc3RhdHVzUXVlcnkgPSBbXTtcblxuICAgIHN0YXR1cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc3RhdHVzUXVlcnkucHVzaCh7IHN0YXR1czogaXRlbSB9KTtcbiAgICB9KTtcblxuICAgIGlmIChjdXJyZW50VGVzdCA9PT0gJ1VzZXInKSB7XG4gICAgICBjb25zdCBvcmRlcnMgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEFsbChcbiAgICAgICAge1xuICAgICAgICAgICRhbmQ6IFt7IHVzZXI6IFR5cGVzLk9iamVjdElkKHJlcS51c2VyLl9pZCkgfV0sXG4gICAgICAgICAgJG9yOiBbLi4uc3RhdHVzUXVlcnldLFxuICAgICAgICB9LFxuICAgICAgICBbJ2Jhc2tldC5wcm9kdWN0JywgJ3VzZXInXSxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcGVyUGFnZSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UubWFwPE9yZGVyVm0+KFxuICAgICAgICBtYXAob3JkZXJzLCBvcmRlciA9PiBvcmRlci50b0pTT04oKSksXG4gICAgICAgIHRydWUsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvcmRlcnMgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEFsbChcbiAgICAgICAgeyAkb3I6IFsuLi5zdGF0dXNRdWVyeV0gfSxcbiAgICAgICAgWydiYXNrZXQucHJvZHVjdCcsICd1c2VyJ10sXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHBlclBhZ2UsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLm1hcDxPcmRlclZtPihcbiAgICAgICAgbWFwKG9yZGVycywgb3JkZXIgPT4gb3JkZXIudG9KU09OKCkpLFxuICAgICAgICB0cnVlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBAR2V0KCc6aWQnKVxuICAvLyBhc3luYyBnZXRPbmUoKSB7fVxuXG4gIEBQb3N0KClcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChPcmRlci5tb2RlbE5hbWUsICdDcmVhdGUnKSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluLCBVc2VyUm9sZS5Vc2VyKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIHBvc3QoXG4gICAgQEJvZHkoKSBvcmRlclBhcmFtczogT3JkZXJQYXJhbSxcbiAgICBAUmVxdWVzdCgpIHJlcSxcbiAgKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gICAgY29uc29sZS5sb2coJ0F1dGhlbnRpY2F0ZWQgVXNlciBQcmUgVGVzdDonLCByZXEudXNlcik7XG4gICAgY29uc3QgaWRzID0gW107XG4gICAgY29uc3QgaXRlbXMgPSBvcmRlclBhcmFtcy5iYXNrZXQ7XG4gICAgbGV0IGNvdXBvbiA9IG51bGw7XG4gICAgY29uc3QgdXBkYXRlZFByb2R1Y3RzOiBQcm9kdWN0SXRlbVtdID0gW107XG5cbiAgICAvL1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBpdGVtID0gaXRlbXNbaV07XG4gICAgICAgICAgY29uc29sZS5sb2coaXRlbSk7XG5cbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5maW5kQnlJZChpdGVtLmlkKTtcblxuICAgICAgLy9Eb24ndCBVcGRhdGUgdGhlIFF1YW50aXR5XG4gICAgICAvLyBwcm9kdWN0LnF1YW50aXR5ID0gcHJvZHVjdC5xdWFudGl0eSAtIGl0ZW0ucXVhbnRpdHk7XG5cbiAgICAgIC8vIGNvbnN0IHVwZGF0ZWRQcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UudXBkYXRlKFxuICAgICAgLy8gICBpdGVtLmlkLFxuICAgICAgLy8gICBwcm9kdWN0LFxuICAgICAgLy8gKTtcblxuICAgICAgdXBkYXRlZFByb2R1Y3RzLnB1c2goe1xuICAgICAgICBxdWFudGl0eTogaXRlbS5xdWFudGl0eSxcbiAgICAgICAgcHJpY2U6IHByb2R1Y3QucHJpY2UsXG4gICAgICAgIGlkOiBUeXBlcy5PYmplY3RJZChpdGVtLmlkKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGlmIChvcmRlclBhcmFtcy5jb3Vwb24gIT09IG51bGwpIHtcbiAgICAvLyAgIGNvdXBvbiA9IGF3YWl0IHRoaXMuX2NvdXBvblNlcnZpY2UuZmluZEJ5SWQob3JkZXJQYXJhbXMuY291cG9uKTtcbiAgICAvLyB9XG5cbiAgICB0cnkge1xuICAgICAgbGV0IG9yZGVyID0gbnVsbDtcbiAgICAgIGlmIChyZXEudXNlciAmJiByZXEudXNlci50eXBlICE9PSBVc2VyUm9sZS5BZG1pbikge1xuXG4gICAgICBjb25zb2xlLmxvZyhyZXEudXNlcik7XG4gICAgICAgIG9yZGVyID0gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLm9uQ3JlYXRlT3JkZXIoXG4gICAgICAgICAgdXBkYXRlZFByb2R1Y3RzLFxuICAgICAgICAgIGNvdXBvbixcbiAgICAgICAgICByZXEudXNlcixcbiAgICAgICAgICBvcmRlclBhcmFtcyxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5maW5kQnlJZChvcmRlclBhcmFtcy51c2VyKTtcbiAgICAgICAgb3JkZXIgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2Uub25DcmVhdGVPcmRlcihcbiAgICAgICAgICB1cGRhdGVkUHJvZHVjdHMsXG4gICAgICAgICAgY291cG9uLFxuICAgICAgICAgIHVzZXIsXG4gICAgICAgICAgb3JkZXJQYXJhbXMsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvcmRlcjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQFB1dCgnOmlkJylcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChPcmRlci5tb2RlbE5hbWUsICdVcGRhdGUnKSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluLCBVc2VyUm9sZS5Db2xsZWN0ZXIsIFVzZXJSb2xlLkNhc2hpZXIpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgcHV0KFxuICAgIEBCb2R5KCkgb3JkZXJQYXJhbXM6IE9yZGVyUHV0UGFyYW1zLFxuICAgIEBQYXJhbSgnaWQnKSBpZCxcbiAgKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gICAgY29uc3Qgb3JkZXIgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEJ5SWQoaWQsIFsnY291cG9uJ10pO1xuXG4gICAgaWYgKCFvcmRlcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIG5vdCBmb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICBsZXQgY291cG9uID0gbnVsbDtcbiAgICBjb25zdCBpdGVtcyA9IG9yZGVyUGFyYW1zLmJhc2tldDtcbiAgICBjb25zdCB1cGRhdGVkUHJvZHVjdHM6IFByb2R1Y3RJdGVtW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgIGNvbnNvbGUubG9nKCdTdGVwICMxJyk7XG5cbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5maW5kQnlJZChpdGVtLmlkKTtcblxuICAgICAgaWYgKG9yZGVyUGFyYW1zLnN0YXR1cyA9PT0gT3JkZXJMZXZlbC5Db21wbGV0ZSkge1xuICAgICAgICBwcm9kdWN0LnF1YW50aXR5ID0gcHJvZHVjdC5xdWFudGl0eSAtIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIGxldCB1cGRhdGVkUHJvZHVjdDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHVwZGF0ZWRQcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UudXBkYXRlKGl0ZW0uaWQsIHByb2R1Y3QpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdTdGVwICMyJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignQmFkIHJlcXVlc3QnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB1cGRhdGVkUHJvZHVjdHMucHVzaCh7XG4gICAgICAgIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5LFxuICAgICAgICBwcmljZTogcHJvZHVjdC5wcmljZSxcbiAgICAgICAgaWQ6IFR5cGVzLk9iamVjdElkKGl0ZW0uaWQpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRPcmRlciA9IGF3YWl0IHRoaXMuX29yZGVyU2VydmljZS5vblVwZGF0ZU9yZGVyKFxuICAgICAgICBvcmRlcixcbiAgICAgICAgb3JkZXJQYXJhbXMsXG4gICAgICAgIHVwZGF0ZWRQcm9kdWN0cyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB1cGRhdGVkT3JkZXI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ1N0ZXAgIzQnLCBlKTtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBARGVsZXRlKCc6aWQnKVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKE9yZGVyLm1vZGVsTmFtZSwgJ0RlbGV0ZScpKVxuICBhc3luYyBkZWxldGUoQFBhcmFtKCdpZCcpIGlkKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gICAgY29uc3Qgb3JkZXIgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuXG4gICAgaWYgKCFvcmRlcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIE5vdCBGb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVsZXRlZE9yZGVyID0gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLmRlbGV0ZShpZCk7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UubWFwPE9yZGVyVm0+KGRlbGV0ZWRPcmRlci50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBQdXQoJzppZC9wcm9kdWN0cycpXG4gIC8vIGFzeW5jIHB1dFByb2R1Y3RzKCk6IFByb21pc2U8T3JkZXJWbT4ge1xuICAvLyAgIHJldHVybiBudWxsO1xuICAvLyB9XG5cbiAgLy8gQERlbGV0ZSgnOmlkL3Byb2R1Y3RzLzppbmRleCcpXG4gIC8vIGFzeW5jIGRlbGV0ZVByb2R1Y3QoKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gIC8vICAgcmV0dXJuIG51bGw7XG4gIC8vIH1cbn1cbiJdfQ==