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
                const product = yield this._productService.findById(item.id);
                updatedProducts.push({
                    quantity: item.quantity,
                    price: product.price,
                    id: mongoose_1.Types.ObjectId(item.id),
                });
            }
            try {
                let order = null;
                if (req.user && req.user.type === user_role_enum_1.UserRole.Admin) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9vcmRlci5jb250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL29yZGVyL29yZGVyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQWV3QjtBQUN4QixnRkFBcUU7QUFDckUsd0VBQThEO0FBQzlELG1EQUErQztBQUMvQyxnRUFBNEQ7QUFDNUQsNkRBQXlEO0FBRXpELDBFQUE2RDtBQUM3RCxrRUFBeUQ7QUFDekQsK0NBQTZDO0FBQzdDLDhEQUEwRDtBQUcxRCx1Q0FBaUM7QUFDakMsd0ZBQTZFO0FBQzdFLG1DQUE2QjtBQUM3Qiw2Q0FPeUI7QUFDekIsc0RBQTZDO0FBQzdDLHVFQUE2RDtBQUM3RCwyRUFBc0U7QUFDdEUsNkRBQW9EO0FBQ3BELGdFQUF1RDtBQUN2RCxxRUFBZ0U7QUFFaEUsdURBQW1EO0FBS25ELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFDbUIsYUFBMkIsRUFFM0IsZUFBK0IsRUFFL0IsY0FBNkIsRUFDN0IsWUFBeUI7UUFMekIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFFM0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBRS9CLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUFhO0lBQ3pDLENBQUM7SUFJRSxNQUFNLENBQWMsRUFBRTs7WUFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xELGdCQUFnQjtnQkFDaEIsTUFBTTthQUNQLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLHNCQUFhLENBQUMsb0JBQW9CLEVBQUUsbUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNyRTtZQUVELE9BQU8sTUFB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LFdBQUEsYUFBSSxFQUFFLENBQUE7SUFDTixXQUFBLGdCQUFPLEVBQUUsQ0FBQTs7cUNBRFcsK0JBQVU7OzJDQXdEaEM7QUFNRDtJQUpDLFlBQUcsQ0FBQyxLQUFLLENBQUM7SUFDVixzQkFBWSxDQUFDLGlDQUFjLENBQUMsbUJBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkQsdUJBQUssQ0FBQyx5QkFBUSxDQUFDLEtBQUssRUFBRSx5QkFBUSxDQUFDLFNBQVMsRUFBRSx5QkFBUSxDQUFDLE9BQU8sQ0FBQztJQUMzRCxrQkFBUyxDQUFDLG9CQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsd0JBQVUsQ0FBQztJQUVyQyxXQUFBLGFBQUksRUFBRSxDQUFBO0lBQ04sV0FBQSxjQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7O3FDQURTLHVDQUFjOzswQ0FtRHBDO0FBSUQ7SUFGQyxlQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2Isc0JBQVksQ0FBQyxpQ0FBYyxDQUFDLG1CQUFLLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLFdBQUEsY0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBOzs7OzZDQWN4QjtBQWpPVSxlQUFlO0lBSDNCLG1CQUFVLENBQUMsUUFBUSxDQUFDO0lBQ3BCLG9CQUFVLENBQUMsbUJBQUssQ0FBQyxTQUFTLENBQUM7SUFDM0IsdUJBQWEsRUFBRTtJQUlYLFdBQUEsZUFBTSxDQUFDLG1CQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZ0NBQWMsQ0FBQyxDQUFDLENBQUE7SUFFeEMsV0FBQSxlQUFNLENBQUMsbUJBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyw4QkFBYSxDQUFDLENBQUMsQ0FBQTtxQ0FIUiw0QkFBWTtRQUVWLGdDQUFjO1FBRWYsOEJBQWE7UUFDZiwwQkFBVztHQVBqQyxlQUFlLENBNE8zQjtBQTVPWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbnRyb2xsZXIsXG4gIEdldCxcbiAgUG9zdCxcbiAgUHV0LFxuICBEZWxldGUsXG4gIFBhcmFtLFxuICBSZXF1ZXN0LFxuICBIdHRwRXhjZXB0aW9uLFxuICBIdHRwU3RhdHVzLFxuICBJbmplY3QsXG4gIGZvcndhcmRSZWYsXG4gIFVzZUd1YXJkcyxcbiAgQm9keSxcbiAgUXVlcnksXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IE9yZGVyUGFyYW0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9vcmRlci1wYXJhbXMubW9kZWwnO1xuaW1wb3J0IHsgT3JkZXJWbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL29yZGVyLXZtLm1vZGVsJztcbmltcG9ydCB7IE9yZGVyU2VydmljZSB9IGZyb20gJy4vb3JkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gJy4uL3Byb2R1Y3QvcHJvZHVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IENvdXBvblNlcnZpY2UgfSBmcm9tICcuLi9jb3Vwb24vY291cG9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uL3VzZXIvbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9zaGFyZWQvZGVjb3JhdG9ycy9yb2xlcy5kZWNvcmF0b3InO1xuaW1wb3J0IHsgVXNlclJvbGUgfSBmcm9tICcuLi91c2VyL21vZGVscy91c2VyLXJvbGUuZW51bSc7XG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9zaGFyZWQvZ3VhcmRzL3JvbGVzLmd1YXJkJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9zY2hlZHVsZXIvYXN5bmMnO1xuaW1wb3J0IHsgUHJvZHVjdEl0ZW0gfSBmcm9tICcuL21vZGVscy9wcm9kdWN0LWl0ZW0ubW9kZWwnO1xuaW1wb3J0IHsgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBPcmRlclB1dFBhcmFtcyB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL29yZGVyLXB1dC1wYXJhbXMubW9kZWwnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG4gIEFwaVVzZVRhZ3MsXG4gIEFwaUJlYXJlckF1dGgsXG4gIEFwaVJlc3BvbnNlLFxuICBBcGlPcGVyYXRpb24sXG4gIEFwaUltcGxpY2l0UXVlcnksXG4gIEFwaUltcGxpY2l0UGFyYW0sXG59IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4vbW9kZWxzL29yZGVyLm1vZGVsJztcbmltcG9ydCB7IEFwaUV4Y2VwdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9hcGktZXhjZXB0aW9uLm1vZGVsJztcbmltcG9ydCB7IEdldE9wZXJhdGlvbklkIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxpdGllcy9nZXQtb3BlcmF0aW9uLWlkJztcbmltcG9ydCB7IFRvSW50IH0gZnJvbSAnLi4vc2hhcmVkL3BpcGVzL3RvLWludC5waXBlJztcbmltcG9ydCB7IE9yZGVyTGV2ZWwgfSBmcm9tICcuL21vZGVscy9vcmRlci1sZXZlbC5lbnVtJztcbmltcG9ydCB7IEVudW1Ub0FycmF5IH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxpdGllcy9lbnVtLXRvLWFycmF5JztcbmltcG9ydCB7IHN0YXQgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3VzZXIvdXNlci5zZXJ2aWNlJztcblxuQENvbnRyb2xsZXIoJ29yZGVycycpXG5AQXBpVXNlVGFncyhPcmRlci5tb2RlbE5hbWUpXG5AQXBpQmVhcmVyQXV0aCgpXG5leHBvcnQgY2xhc3MgT3JkZXJDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBfb3JkZXJTZXJ2aWNlOiBPcmRlclNlcnZpY2UsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IFByb2R1Y3RTZXJ2aWNlKSlcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXG4gICAgQEluamVjdChmb3J3YXJkUmVmKCgpID0+IENvdXBvblNlcnZpY2UpKVxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvdXBvblNlcnZpY2U6IENvdXBvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICApIHt9XG5cbiAgQEdldCgnOmlkJylcbiAgQEFwaUltcGxpY2l0UGFyYW0oeyBuYW1lOiAnaWQnLCB0eXBlOiBTdHJpbmcgfSlcbiAgYXN5bmMgZ2V0T25lKEBQYXJhbSgnaWQnKSBpZCk6IFByb21pc2U8T3JkZXJWbT4ge1xuICAgIGNvbnN0IG9yZGVyID0gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLmZpbmRCeUlkKGlkLCBbXG4gICAgICAnYmFza2V0LnByb2R1Y3QnLFxuICAgICAgJ3VzZXInLFxuICAgIF0pO1xuXG4gICAgaWYgKCFvcmRlcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIE5vdCBGb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLm1hcDxPcmRlclZtPihvcmRlci50b0pTT04oKSk7XG4gIH1cblxuICBAR2V0KClcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLk9LLCB0eXBlOiBPcmRlclZtLCBpc0FycmF5OiB0cnVlIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoT3JkZXIubW9kZWxOYW1lLCAnR2V0JykpXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHtcbiAgICBuYW1lOiAncGFnZScsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogTnVtYmVyLFxuICB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7IG5hbWU6ICdwZXJQYWdlJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IE51bWJlciB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7XG4gICAgbmFtZTogJ3N0YXR1cycsXG4gICAgZW51bTogRW51bVRvQXJyYXkoT3JkZXJMZXZlbCksXG4gICAgaXNBcnJheTogdHJ1ZSxcbiAgfSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluLCBVc2VyUm9sZS5Vc2VyLCBVc2VyUm9sZS5Db2xsZWN0ZXIsIFVzZXJSb2xlLkNhc2hpZXIpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgZ2V0KFxuICAgIEBRdWVyeSgncGFnZScsIG5ldyBUb0ludCgpKSBwYWdlOiBudW1iZXIsXG4gICAgQFF1ZXJ5KCdwZXJQYWdlJywgbmV3IFRvSW50KCkpIHBlclBhZ2U6IG51bWJlcixcbiAgICBAUXVlcnkoJ3N0YXR1cycpIHN0YXR1czogT3JkZXJMZXZlbFtdLFxuICAgIEBSZXF1ZXN0KCkgcmVxLFxuICApIHtcbiAgICBsZXQgY3VycmVudFRlc3QgPSAnQWRtaW4nO1xuICAgIGxldCBzdGF0dXNRdWVyeSA9IFtdO1xuXG4gICAgc3RhdHVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzdGF0dXNRdWVyeS5wdXNoKHsgc3RhdHVzOiBpdGVtIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGN1cnJlbnRUZXN0ID09PSAnVXNlcicpIHtcbiAgICAgIGNvbnN0IG9yZGVycyA9IGF3YWl0IHRoaXMuX29yZGVyU2VydmljZS5maW5kQWxsKFxuICAgICAgICB7XG4gICAgICAgICAgJGFuZDogW3sgdXNlcjogVHlwZXMuT2JqZWN0SWQocmVxLnVzZXIuX2lkKSB9XSxcbiAgICAgICAgICAkb3I6IFsuLi5zdGF0dXNRdWVyeV0sXG4gICAgICAgIH0sXG4gICAgICAgIFsnYmFza2V0LnByb2R1Y3QnLCAndXNlciddLFxuICAgICAgICBwYWdlLFxuICAgICAgICBwZXJQYWdlLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuX29yZGVyU2VydmljZS5tYXA8T3JkZXJWbT4oXG4gICAgICAgIG1hcChvcmRlcnMsIG9yZGVyID0+IG9yZGVyLnRvSlNPTigpKSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9yZGVycyA9IGF3YWl0IHRoaXMuX29yZGVyU2VydmljZS5maW5kQWxsKFxuICAgICAgICB7ICRvcjogWy4uLnN0YXR1c1F1ZXJ5XSB9LFxuICAgICAgICBbJ2Jhc2tldC5wcm9kdWN0JywgJ3VzZXInXSxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcGVyUGFnZSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UubWFwPE9yZGVyVm0+KFxuICAgICAgICBtYXAob3JkZXJzLCBvcmRlciA9PiBvcmRlci50b0pTT04oKSksXG4gICAgICAgIHRydWUsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBHZXQoJzppZCcpXG4gIC8vIGFzeW5jIGdldE9uZSgpIHt9XG5cbiAgQFBvc3QoKVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKE9yZGVyLm1vZGVsTmFtZSwgJ0NyZWF0ZScpKVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4sIFVzZXJSb2xlLlVzZXIpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgcG9zdChcbiAgICBAQm9keSgpIG9yZGVyUGFyYW1zOiBPcmRlclBhcmFtLFxuICAgIEBSZXF1ZXN0KCkgcmVxLFxuICApOiBQcm9taXNlPE9yZGVyVm0+IHtcbiAgICBjb25zb2xlLmxvZygnQXV0aGVudGljYXRlZCBVc2VyIFByZSBUZXN0OicsIHJlcS51c2VyKTtcbiAgICBjb25zdCBpZHMgPSBbXTtcbiAgICBjb25zdCBpdGVtcyA9IG9yZGVyUGFyYW1zLmJhc2tldDtcbiAgICBsZXQgY291cG9uID0gbnVsbDtcbiAgICBjb25zdCB1cGRhdGVkUHJvZHVjdHM6IFByb2R1Y3RJdGVtW10gPSBbXTtcblxuICAgIC8vXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldO1xuICAgICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmZpbmRCeUlkKGl0ZW0uaWQpO1xuXG4gICAgICAvL0Rvbid0IFVwZGF0ZSB0aGUgUXVhbnRpdHlcbiAgICAgIC8vIHByb2R1Y3QucXVhbnRpdHkgPSBwcm9kdWN0LnF1YW50aXR5IC0gaXRlbS5xdWFudGl0eTtcblxuICAgICAgLy8gY29uc3QgdXBkYXRlZFByb2R1Y3QgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS51cGRhdGUoXG4gICAgICAvLyAgIGl0ZW0uaWQsXG4gICAgICAvLyAgIHByb2R1Y3QsXG4gICAgICAvLyApO1xuXG4gICAgICB1cGRhdGVkUHJvZHVjdHMucHVzaCh7XG4gICAgICAgIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5LFxuICAgICAgICBwcmljZTogcHJvZHVjdC5wcmljZSxcbiAgICAgICAgaWQ6IFR5cGVzLk9iamVjdElkKGl0ZW0uaWQpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gaWYgKG9yZGVyUGFyYW1zLmNvdXBvbiAhPT0gbnVsbCkge1xuICAgIC8vICAgY291cG9uID0gYXdhaXQgdGhpcy5fY291cG9uU2VydmljZS5maW5kQnlJZChvcmRlclBhcmFtcy5jb3Vwb24pO1xuICAgIC8vIH1cblxuICAgIHRyeSB7XG4gICAgICBsZXQgb3JkZXIgPSBudWxsO1xuICAgICAgaWYgKHJlcS51c2VyICYmIHJlcS51c2VyLnR5cGUgPT09IFVzZXJSb2xlLkFkbWluKSB7XG4gICAgICAgIG9yZGVyID0gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLm9uQ3JlYXRlT3JkZXIoXG4gICAgICAgICAgdXBkYXRlZFByb2R1Y3RzLFxuICAgICAgICAgIGNvdXBvbixcbiAgICAgICAgICByZXEudXNlcixcbiAgICAgICAgICBvcmRlclBhcmFtcyxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5maW5kQnlJZChvcmRlclBhcmFtcy51c2VyKTtcbiAgICAgICAgb3JkZXIgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2Uub25DcmVhdGVPcmRlcihcbiAgICAgICAgICB1cGRhdGVkUHJvZHVjdHMsXG4gICAgICAgICAgY291cG9uLFxuICAgICAgICAgIHVzZXIsXG4gICAgICAgICAgb3JkZXJQYXJhbXMsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvcmRlcjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgQFB1dCgnOmlkJylcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChPcmRlci5tb2RlbE5hbWUsICdVcGRhdGUnKSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluLCBVc2VyUm9sZS5Db2xsZWN0ZXIsIFVzZXJSb2xlLkNhc2hpZXIpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgcHV0KFxuICAgIEBCb2R5KCkgb3JkZXJQYXJhbXM6IE9yZGVyUHV0UGFyYW1zLFxuICAgIEBQYXJhbSgnaWQnKSBpZCxcbiAgKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gICAgY29uc3Qgb3JkZXIgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEJ5SWQoaWQsIFsnY291cG9uJ10pO1xuXG4gICAgaWYgKCFvcmRlcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIG5vdCBmb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICBsZXQgY291cG9uID0gbnVsbDtcbiAgICBjb25zdCBpdGVtcyA9IG9yZGVyUGFyYW1zLmJhc2tldDtcbiAgICBjb25zdCB1cGRhdGVkUHJvZHVjdHM6IFByb2R1Y3RJdGVtW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgIGNvbnNvbGUubG9nKCdTdGVwICMxJyk7XG5cbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5maW5kQnlJZChpdGVtLmlkKTtcblxuICAgICAgaWYgKG9yZGVyUGFyYW1zLnN0YXR1cyA9PT0gT3JkZXJMZXZlbC5Db21wbGV0ZSkge1xuICAgICAgICBwcm9kdWN0LnF1YW50aXR5ID0gcHJvZHVjdC5xdWFudGl0eSAtIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIGxldCB1cGRhdGVkUHJvZHVjdDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHVwZGF0ZWRQcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UudXBkYXRlKGl0ZW0uaWQsIHByb2R1Y3QpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdTdGVwICMyJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignQmFkIHJlcXVlc3QnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB1cGRhdGVkUHJvZHVjdHMucHVzaCh7XG4gICAgICAgIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5LFxuICAgICAgICBwcmljZTogcHJvZHVjdC5wcmljZSxcbiAgICAgICAgaWQ6IFR5cGVzLk9iamVjdElkKGl0ZW0uaWQpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRPcmRlciA9IGF3YWl0IHRoaXMuX29yZGVyU2VydmljZS5vblVwZGF0ZU9yZGVyKFxuICAgICAgICBvcmRlcixcbiAgICAgICAgb3JkZXJQYXJhbXMsXG4gICAgICAgIHVwZGF0ZWRQcm9kdWN0cyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB1cGRhdGVkT3JkZXI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ1N0ZXAgIzQnLCBlKTtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBARGVsZXRlKCc6aWQnKVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKE9yZGVyLm1vZGVsTmFtZSwgJ0RlbGV0ZScpKVxuICBhc3luYyBkZWxldGUoQFBhcmFtKCdpZCcpIGlkKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gICAgY29uc3Qgb3JkZXIgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuXG4gICAgaWYgKCFvcmRlcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIE5vdCBGb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVsZXRlZE9yZGVyID0gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLmRlbGV0ZShpZCk7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UubWFwPE9yZGVyVm0+KGRlbGV0ZWRPcmRlci50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBQdXQoJzppZC9wcm9kdWN0cycpXG4gIC8vIGFzeW5jIHB1dFByb2R1Y3RzKCk6IFByb21pc2U8T3JkZXJWbT4ge1xuICAvLyAgIHJldHVybiBudWxsO1xuICAvLyB9XG5cbiAgLy8gQERlbGV0ZSgnOmlkL3Byb2R1Y3RzLzppbmRleCcpXG4gIC8vIGFzeW5jIGRlbGV0ZVByb2R1Y3QoKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gIC8vICAgcmV0dXJuIG51bGw7XG4gIC8vIH1cbn1cbiJdfQ==