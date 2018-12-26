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
            if (currentTest !== 'Admin') {
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
                if (orderParams.status === order_level_enum_1.OrderLevel.Shipped) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9vcmRlci5jb250cm9sbGVyLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL29yZGVyL29yZGVyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQWV3QjtBQUN4QixnRkFBcUU7QUFDckUsd0VBQThEO0FBQzlELG1EQUErQztBQUMvQyxnRUFBNEQ7QUFDNUQsNkRBQXlEO0FBRXpELDBFQUE2RDtBQUM3RCxrRUFBeUQ7QUFDekQsK0NBQTZDO0FBQzdDLDhEQUEwRDtBQUcxRCx1Q0FBaUM7QUFDakMsd0ZBQTZFO0FBQzdFLG1DQUE2QjtBQUM3Qiw2Q0FPeUI7QUFDekIsc0RBQTZDO0FBQzdDLHVFQUE2RDtBQUM3RCwyRUFBc0U7QUFDdEUsNkRBQW9EO0FBQ3BELGdFQUF1RDtBQUN2RCxxRUFBZ0U7QUFFaEUsdURBQW1EO0FBS25ELElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFDbUIsYUFBMkIsRUFFM0IsZUFBK0IsRUFFL0IsY0FBNkIsRUFDN0IsWUFBeUI7UUFMekIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFFM0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBRS9CLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUFhO0lBQ3pDLENBQUM7SUFJRSxNQUFNLENBQWMsRUFBRTs7WUFDMUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xELGdCQUFnQjtnQkFDaEIsTUFBTTthQUNQLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLHNCQUFhLENBQUMsb0JBQW9CLEVBQUUsbUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNyRTtZQUVELE9BQU8sTUFBTSxJQUFJ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O0lBRXJELFdBQUEsYUFBSSxFQUFFLENBQUE7SUFDTixXQUFBLGNBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTs7cUNBRFMsdUNBQWM7OzBDQW1EcEM7QUFJRDtJQUZDLGVBQU0sQ0FBQyxLQUFLLENBQUM7SUFDYixzQkFBWSxDQUFDLGlDQUFjLENBQUMsbUJBQUssQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUMsV0FBQSxjQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7Ozs7NkNBY3hCO0FBL05VLGVBQWU7SUFIM0IsbUJBQVUsQ0FBQyxRQUFRLENBQUM7SUFDcEIsb0JBQVUsQ0FBQyxtQkFBSyxDQUFDLFNBQVMsQ0FBQztJQUMzQix1QkFBYSxFQUFFO0lBSVgsV0FBQSxlQUFNLENBQUMsbUJBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDLENBQUMsQ0FBQTtJQUV4QyxXQUFBLGVBQU0sQ0FBQyxtQkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDhCQUFhLENBQUMsQ0FBQyxDQUFBO3FDQUhSLDRCQUFZO1FBRVYsZ0NBQWM7UUFFZiw4QkFBYTtRQUNmLDBCQUFXO0dBUGpDLGVBQWUsQ0EwTzNCO0FBMU9ZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBQb3N0LFxuICBQdXQsXG4gIERlbGV0ZSxcbiAgUGFyYW0sXG4gIFJlcXVlc3QsXG4gIEh0dHBFeGNlcHRpb24sXG4gIEh0dHBTdGF0dXMsXG4gIEluamVjdCxcbiAgZm9yd2FyZFJlZixcbiAgVXNlR3VhcmRzLFxuICBCb2R5LFxuICBRdWVyeSxcbn0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgT3JkZXJQYXJhbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL29yZGVyLXBhcmFtcy5tb2RlbCc7XG5pbXBvcnQgeyBPcmRlclZtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItdm0ubW9kZWwnO1xuaW1wb3J0IHsgT3JkZXJTZXJ2aWNlIH0gZnJvbSAnLi9vcmRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSAnLi4vcHJvZHVjdC9wcm9kdWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ291cG9uU2VydmljZSB9IGZyb20gJy4uL2NvdXBvbi9jb3Vwb24uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlci9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3NoYXJlZC9kZWNvcmF0b3JzL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4uL3VzZXIvbW9kZWxzL3VzZXItcm9sZS5lbnVtJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL3NoYXJlZC9ndWFyZHMvcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgYXN5bmMgfSBmcm9tICdyeGpzL2ludGVybmFsL3NjaGVkdWxlci9hc3luYyc7XG5pbXBvcnQgeyBQcm9kdWN0SXRlbSB9IGZyb20gJy4vbW9kZWxzL3Byb2R1Y3QtaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IE9yZGVyUHV0UGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItcHV0LXBhcmFtcy5tb2RlbCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHtcbiAgQXBpVXNlVGFncyxcbiAgQXBpQmVhcmVyQXV0aCxcbiAgQXBpUmVzcG9uc2UsXG4gIEFwaU9wZXJhdGlvbixcbiAgQXBpSW1wbGljaXRRdWVyeSxcbiAgQXBpSW1wbGljaXRQYXJhbSxcbn0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi9tb2RlbHMvb3JkZXIubW9kZWwnO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2FwaS1leGNlcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgR2V0T3BlcmF0aW9uSWQgfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2dldC1vcGVyYXRpb24taWQnO1xuaW1wb3J0IHsgVG9JbnQgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvdG8taW50LnBpcGUnO1xuaW1wb3J0IHsgT3JkZXJMZXZlbCB9IGZyb20gJy4vbW9kZWxzL29yZGVyLWxldmVsLmVudW0nO1xuaW1wb3J0IHsgRW51bVRvQXJyYXkgfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2VudW0tdG8tYXJyYXknO1xuaW1wb3J0IHsgc3RhdCB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vdXNlci91c2VyLnNlcnZpY2UnO1xuXG5AQ29udHJvbGxlcignb3JkZXJzJylcbkBBcGlVc2VUYWdzKE9yZGVyLm1vZGVsTmFtZSlcbkBBcGlCZWFyZXJBdXRoKClcbmV4cG9ydCBjbGFzcyBPcmRlckNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9vcmRlclNlcnZpY2U6IE9yZGVyU2VydmljZSxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gUHJvZHVjdFNlcnZpY2UpKVxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQ291cG9uU2VydmljZSkpXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY291cG9uU2VydmljZTogQ291cG9uU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICkge31cblxuICBAR2V0KCc6aWQnKVxuICBAQXBpSW1wbGljaXRQYXJhbSh7IG5hbWU6ICdpZCcsIHR5cGU6IFN0cmluZyB9KVxuICBhc3luYyBnZXRPbmUoQFBhcmFtKCdpZCcpIGlkKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gICAgY29uc3Qgb3JkZXIgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEJ5SWQoaWQsIFtcbiAgICAgICdiYXNrZXQucHJvZHVjdCcsXG4gICAgICAndXNlcicsXG4gICAgXSk7XG5cbiAgICBpZiAoIW9yZGVyKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignUmVzb3VyY2UgTm90IEZvdW5kJywgSHR0cFN0YXR1cy5OT1RfRk9VTkQpO1xuICAgIH1cblxuICAgIHJldHVybiBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UubWFwPE9yZGVyVm0+KG9yZGVyLnRvSlNPTigpKTtcbiAgfVxuXG4gIEBHZXQoKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuT0ssIHR5cGU6IE9yZGVyVm0sIGlzQXJyYXk6IHRydWUgfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChPcmRlci5tb2RlbE5hbWUsICdHZXQnKSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoe1xuICAgIG5hbWU6ICdwYWdlJyxcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB0eXBlOiBOdW1iZXIsXG4gIH0pXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHsgbmFtZTogJ3BlclBhZ2UnLCByZXF1aXJlZDogdHJ1ZSwgdHlwZTogTnVtYmVyIH0pXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHtcbiAgICBuYW1lOiAnc3RhdHVzJyxcbiAgICBlbnVtOiBFbnVtVG9BcnJheShPcmRlckxldmVsKSxcbiAgICBpc0FycmF5OiB0cnVlLFxuICB9KVxuICAvLyBAUm9sZXMoVXNlclJvbGUuQWRtaW4sIFVzZXJSb2xlLlVzZXIpXG4gIC8vIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgZ2V0KFxuICAgIEBRdWVyeSgncGFnZScsIG5ldyBUb0ludCgpKSBwYWdlOiBudW1iZXIsXG4gICAgQFF1ZXJ5KCdwZXJQYWdlJywgbmV3IFRvSW50KCkpIHBlclBhZ2U6IG51bWJlcixcbiAgICBAUXVlcnkoJ3N0YXR1cycpIHN0YXR1czogT3JkZXJMZXZlbFtdLFxuICAgIEBSZXF1ZXN0KCkgcmVxLFxuICApIHtcbiAgICBsZXQgY3VycmVudFRlc3QgPSAnQWRtaW4nO1xuICAgIGxldCBzdGF0dXNRdWVyeSA9IFtdO1xuXG4gICAgc3RhdHVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzdGF0dXNRdWVyeS5wdXNoKHsgc3RhdHVzOiBpdGVtIH0pO1xuICAgIH0pO1xuXG4gICAgaWYgKGN1cnJlbnRUZXN0ICE9PSAnQWRtaW4nKSB7XG4gICAgICBjb25zdCBvcmRlcnMgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEFsbChcbiAgICAgICAge1xuICAgICAgICAgICRhbmQ6IFt7IHVzZXI6IFR5cGVzLk9iamVjdElkKHJlcS51c2VyLl9pZCkgfV0sXG4gICAgICAgICAgJG9yOiBbLi4uc3RhdHVzUXVlcnldLFxuICAgICAgICB9LFxuICAgICAgICBbJ2Jhc2tldC5wcm9kdWN0JywgJ3VzZXInXSxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcGVyUGFnZSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UubWFwPE9yZGVyVm0+KFxuICAgICAgICBtYXAob3JkZXJzLCBvcmRlciA9PiBvcmRlci50b0pTT04oKSksXG4gICAgICAgIHRydWUsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvcmRlcnMgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEFsbChcbiAgICAgICAgeyAkb3I6IFsuLi5zdGF0dXNRdWVyeV0gfSxcbiAgICAgICAgWydiYXNrZXQucHJvZHVjdCcsICd1c2VyJ10sXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIHBlclBhZ2UsXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLm1hcDxPcmRlclZtPihcbiAgICAgICAgbWFwKG9yZGVycywgb3JkZXIgPT4gb3JkZXIudG9KU09OKCkpLFxuICAgICAgICB0cnVlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBAR2V0KCc6aWQnKVxuICAvLyBhc3luYyBnZXRPbmUoKSB7fVxuXG4gIEBQb3N0KClcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChPcmRlci5tb2RlbE5hbWUsICdDcmVhdGUnKSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluLCBVc2VyUm9sZS5Vc2VyKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIHBvc3QoXG4gICAgQEJvZHkoKSBvcmRlclBhcmFtczogT3JkZXJQYXJhbSxcbiAgICBAUmVxdWVzdCgpIHJlcSxcbiAgKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gICAgY29uc29sZS5sb2coJ0F1dGhlbnRpY2F0ZWQgVXNlciBQcmUgVGVzdDonLCByZXEudXNlcik7XG4gICAgY29uc3QgaWRzID0gW107XG4gICAgY29uc3QgaXRlbXMgPSBvcmRlclBhcmFtcy5iYXNrZXQ7XG4gICAgbGV0IGNvdXBvbiA9IG51bGw7XG4gICAgY29uc3QgdXBkYXRlZFByb2R1Y3RzOiBQcm9kdWN0SXRlbVtdID0gW107XG5cbiAgICAvL1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5maW5kQnlJZChpdGVtLmlkKTtcblxuICAgICAgLy9Eb24ndCBVcGRhdGUgdGhlIFF1YW50aXR5XG4gICAgICAvLyBwcm9kdWN0LnF1YW50aXR5ID0gcHJvZHVjdC5xdWFudGl0eSAtIGl0ZW0ucXVhbnRpdHk7XG5cbiAgICAgIC8vIGNvbnN0IHVwZGF0ZWRQcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UudXBkYXRlKFxuICAgICAgLy8gICBpdGVtLmlkLFxuICAgICAgLy8gICBwcm9kdWN0LFxuICAgICAgLy8gKTtcblxuICAgICAgdXBkYXRlZFByb2R1Y3RzLnB1c2goe1xuICAgICAgICBxdWFudGl0eTogaXRlbS5xdWFudGl0eSxcbiAgICAgICAgcHJpY2U6IHByb2R1Y3QucHJpY2UsXG4gICAgICAgIGlkOiBUeXBlcy5PYmplY3RJZChpdGVtLmlkKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGlmIChvcmRlclBhcmFtcy5jb3Vwb24gIT09IG51bGwpIHtcbiAgICAvLyAgIGNvdXBvbiA9IGF3YWl0IHRoaXMuX2NvdXBvblNlcnZpY2UuZmluZEJ5SWQob3JkZXJQYXJhbXMuY291cG9uKTtcbiAgICAvLyB9XG5cbiAgICB0cnkge1xuICAgICAgbGV0IG9yZGVyID0gbnVsbDtcbiAgICAgIGlmIChyZXEudXNlciAmJiByZXEudXNlci50eXBlID09PSBVc2VyUm9sZS5BZG1pbikge1xuICAgICAgICBvcmRlciA9IGF3YWl0IHRoaXMuX29yZGVyU2VydmljZS5vbkNyZWF0ZU9yZGVyKFxuICAgICAgICAgIHVwZGF0ZWRQcm9kdWN0cyxcbiAgICAgICAgICBjb3Vwb24sXG4gICAgICAgICAgcmVxLnVzZXIsXG4gICAgICAgICAgb3JkZXJQYXJhbXMsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuZmluZEJ5SWQob3JkZXJQYXJhbXMudXNlcik7XG4gICAgICAgIG9yZGVyID0gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLm9uQ3JlYXRlT3JkZXIoXG4gICAgICAgICAgdXBkYXRlZFByb2R1Y3RzLFxuICAgICAgICAgIGNvdXBvbixcbiAgICAgICAgICB1c2VyLFxuICAgICAgICAgIG9yZGVyUGFyYW1zLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3JkZXI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxuXG4gIEBQdXQoJzppZCcpXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoT3JkZXIubW9kZWxOYW1lLCAnVXBkYXRlJykpXG4gIGFzeW5jIHB1dChcbiAgICBAQm9keSgpIG9yZGVyUGFyYW1zOiBPcmRlclB1dFBhcmFtcyxcbiAgICBAUGFyYW0oJ2lkJykgaWQsXG4gICk6IFByb21pc2U8T3JkZXJWbT4ge1xuICAgIGNvbnN0IG9yZGVyID0gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLmZpbmRCeUlkKGlkLCBbJ2NvdXBvbiddKTtcblxuICAgIGlmICghb3JkZXIpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBub3QgZm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuXG4gICAgbGV0IGNvdXBvbiA9IG51bGw7XG4gICAgY29uc3QgaXRlbXMgPSBvcmRlclBhcmFtcy5iYXNrZXQ7XG4gICAgY29uc3QgdXBkYXRlZFByb2R1Y3RzOiBQcm9kdWN0SXRlbVtdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBpdGVtID0gaXRlbXNbaV07XG4gICAgICBjb25zb2xlLmxvZygnU3RlcCAjMScpO1xuXG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZmluZEJ5SWQoaXRlbS5pZCk7XG5cbiAgICAgIGlmIChvcmRlclBhcmFtcy5zdGF0dXMgPT09IE9yZGVyTGV2ZWwuU2hpcHBlZCkge1xuICAgICAgICBwcm9kdWN0LnF1YW50aXR5ID0gcHJvZHVjdC5xdWFudGl0eSAtIGl0ZW0ucXVhbnRpdHk7XG4gICAgICAgIGxldCB1cGRhdGVkUHJvZHVjdDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIHVwZGF0ZWRQcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UudXBkYXRlKGl0ZW0uaWQsIHByb2R1Y3QpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdTdGVwICMyJyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignQmFkIHJlcXVlc3QnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB1cGRhdGVkUHJvZHVjdHMucHVzaCh7XG4gICAgICAgIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5LFxuICAgICAgICBwcmljZTogcHJvZHVjdC5wcmljZSxcbiAgICAgICAgaWQ6IFR5cGVzLk9iamVjdElkKGl0ZW0uaWQpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRPcmRlciA9IGF3YWl0IHRoaXMuX29yZGVyU2VydmljZS5vblVwZGF0ZU9yZGVyKFxuICAgICAgICBvcmRlcixcbiAgICAgICAgb3JkZXJQYXJhbXMsXG4gICAgICAgIHVwZGF0ZWRQcm9kdWN0cyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB1cGRhdGVkT3JkZXI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ1N0ZXAgIzQnLCBlKTtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBARGVsZXRlKCc6aWQnKVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKE9yZGVyLm1vZGVsTmFtZSwgJ0RlbGV0ZScpKVxuICBhc3luYyBkZWxldGUoQFBhcmFtKCdpZCcpIGlkKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gICAgY29uc3Qgb3JkZXIgPSBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UuZmluZEJ5SWQoaWQpO1xuXG4gICAgaWYgKCFvcmRlcikge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ1Jlc291cmNlIE5vdCBGb3VuZCcsIEh0dHBTdGF0dXMuTk9UX0ZPVU5EKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVsZXRlZE9yZGVyID0gYXdhaXQgdGhpcy5fb3JkZXJTZXJ2aWNlLmRlbGV0ZShpZCk7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLl9vcmRlclNlcnZpY2UubWFwPE9yZGVyVm0+KGRlbGV0ZWRPcmRlci50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEBQdXQoJzppZC9wcm9kdWN0cycpXG4gIC8vIGFzeW5jIHB1dFByb2R1Y3RzKCk6IFByb21pc2U8T3JkZXJWbT4ge1xuICAvLyAgIHJldHVybiBudWxsO1xuICAvLyB9XG5cbiAgLy8gQERlbGV0ZSgnOmlkL3Byb2R1Y3RzLzppbmRleCcpXG4gIC8vIGFzeW5jIGRlbGV0ZVByb2R1Y3QoKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gIC8vICAgcmV0dXJuIG51bGw7XG4gIC8vIH1cbn1cbiJdfQ==