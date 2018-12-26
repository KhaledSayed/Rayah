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
const mongoose_1 = require("@nestjs/mongoose");
const order_model_1 = require("./models/order.model");
const mapper_service_1 = require("../shared/mapper/mapper.service");
const base_service_1 = require("../shared/base.service");
const mongoose_2 = require("mongoose");
const novice_calculator_helper_1 = require("./helpers/novice-calculator.helper");
let OrderService = class OrderService extends base_service_1.BaseService {
    constructor(_orderModel, _mapperService) {
        super();
        this._mapperService = _mapperService;
        this._model = _orderModel;
        this._mapper = _mapperService.mapper;
    }
    onCreateOrder(products, coupon, user, orderParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = new this._model();
            let total = novice_calculator_helper_1.NoviceHelper.calculateTotal(products);
            total = novice_calculator_helper_1.NoviceHelper.applyCoupon(total, coupon);
            order.total = total;
            order.note = orderParams.note;
            products.forEach(item => {
                order.basket.push({
                    quantity: item.quantity,
                    product: item.id,
                    price: item.price,
                    totalItemPrice: null,
                });
            });
            order.user = mongoose_2.Types.ObjectId(user.id);
            if (coupon !== null) {
                order.coupon = mongoose_2.Types.ObjectId(coupon.id);
            }
            order.address = orderParams.address;
            try {
                const newOrder = yield this.create(order);
                return yield this.map(newOrder.toJSON());
            }
            catch (e) {
                console.log('Order Error:' + e);
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    onUpdateOrder(order, orderParams, products) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('@onUpdateOrder #1');
            let total = novice_calculator_helper_1.NoviceHelper.calculateTotal(products);
            total = novice_calculator_helper_1.NoviceHelper.applyCoupon(total, order.coupon);
            order.total = total;
            order.note = orderParams.note;
            order.basket = [];
            products.forEach(item => {
                order.basket.push({
                    quantity: item.quantity,
                    product: item.id,
                    price: item.price,
                    totalItemPrice: null,
                });
            });
            console.log('@onUpdateOrder #2', order);
            order.address = orderParams.address;
            order.status = orderParams.status;
            console.log('@onUpdateOrder #3', order);
            try {
                const updatedOrder = yield this.update(order.id, order);
                console.log('@onUpdateOrder #4', updatedOrder);
                return yield this.map(updatedOrder.toJSON());
            }
            catch (e) {
                console.log(e);
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(order_model_1.Order.modelName)),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9vcmRlci5zZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL29yZGVyL29yZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUF1RTtBQUV2RSwrQ0FBK0M7QUFDL0Msc0RBQTZDO0FBRTdDLG9FQUFnRTtBQUNoRSx5REFBcUQ7QUFJckQsdUNBQWlDO0FBRWpDLGlGQUFrRTtBQUtsRSxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsMEJBQWtCO0lBQ2xELFlBQ2dDLFdBQTZCLEVBQzFDLGNBQTZCO1FBRTlDLEtBQUssRUFBRSxDQUFDO1FBRlMsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFHOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7SUFFSyxhQUFhLENBQ2pCLFFBQXVCLEVBQ3ZCLE1BQWMsRUFDZCxJQUFJLEVBQ0osV0FBdUI7O1lBRXZCLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRWhDLElBQUksS0FBSyxHQUFHLHVDQUFZLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2xELEtBQUssR0FBRyx1Q0FBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFaEQsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDcEIsS0FBSyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBRTlCLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZC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RHhCLG1CQUFVLEVBQUU7SUFHUixXQUFBLHNCQUFXLENBQUMsbUJBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQTs2Q0FDSSw4QkFBYTtHQUhyQyxZQUFZLENBNkZ4QjtBQTdGWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEh0dHBFeGNlcHRpb24sIEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QgfSBmcm9tICd0eXBlZGknO1xuaW1wb3J0IHsgSW5qZWN0TW9kZWwgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi9tb2RlbHMvb3JkZXIubW9kZWwnO1xuaW1wb3J0IHsgTW9kZWxUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IE1hcHBlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbWFwcGVyL21hcHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL2Jhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBPcmRlclBhcmFtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItcGFyYW1zLm1vZGVsJztcbmltcG9ydCB7IE9yZGVyVm0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9vcmRlci12bS5tb2RlbCc7XG5pbXBvcnQgeyBPYmplY3RJRCB9IGZyb20gJ2Jzb24nO1xuaW1wb3J0IHsgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBQcm9kdWN0SXRlbSB9IGZyb20gJy4vbW9kZWxzL3Byb2R1Y3QtaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBOb3ZpY2VIZWxwZXIgfSBmcm9tICcuL2hlbHBlcnMvbm92aWNlLWNhbGN1bGF0b3IuaGVscGVyJztcbmltcG9ydCB7IENvdXBvbiB9IGZyb20gJy4uL2NvdXBvbi9tb2RlbHMvY291cG9uLm1vZGVsJztcbmltcG9ydCB7IE9yZGVyUHV0UGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItcHV0LXBhcmFtcy5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmRlclNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZTxPcmRlcj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0TW9kZWwoT3JkZXIubW9kZWxOYW1lKSBfb3JkZXJNb2RlbDogTW9kZWxUeXBlPE9yZGVyPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tYXBwZXJTZXJ2aWNlOiBNYXBwZXJTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX21vZGVsID0gX29yZGVyTW9kZWw7XG4gICAgdGhpcy5fbWFwcGVyID0gX21hcHBlclNlcnZpY2UubWFwcGVyO1xuICB9XG5cbiAgYXN5bmMgb25DcmVhdGVPcmRlcihcbiAgICBwcm9kdWN0czogUHJvZHVjdEl0ZW1bXSxcbiAgICBjb3Vwb246IENvdXBvbixcbiAgICB1c2VyLFxuICAgIG9yZGVyUGFyYW1zOiBPcmRlclBhcmFtLFxuICApOiBQcm9taXNlPE9yZGVyVm0+IHtcbiAgICBjb25zdCBvcmRlciA9IG5ldyB0aGlzLl9tb2RlbCgpO1xuXG4gICAgbGV0IHRvdGFsID0gTm92aWNlSGVscGVyLmNhbGN1bGF0ZVRvdGFsKHByb2R1Y3RzKTtcbiAgICB0b3RhbCA9IE5vdmljZUhlbHBlci5hcHBseUNvdXBvbih0b3RhbCwgY291cG9uKTtcblxuICAgIG9yZGVyLnRvdGFsID0gdG90YWw7XG4gICAgb3JkZXIubm90ZSA9IG9yZGVyUGFyYW1zLm5vdGU7XG5cbiAgICBwcm9kdWN0cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgb3JkZXIuYmFza2V0LnB1c2goe1xuICAgICAgICBxdWFudGl0eTogaXRlbS5xdWFudGl0eSxcbiAgICAgICAgcHJvZHVjdDogaXRlbS5pZCxcbiAgICAgICAgcHJpY2U6IGl0ZW0ucHJpY2UsXG4gICAgICAgIHRvdGFsSXRlbVByaWNlOiBudWxsLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvcmRlci51c2VyID0gVHlwZXMuT2JqZWN0SWQodXNlci5pZCk7XG5cbiAgICBpZiAoY291cG9uICE9PSBudWxsKSB7XG4gICAgICBvcmRlci5jb3Vwb24gPSBUeXBlcy5PYmplY3RJZChjb3Vwb24uaWQpO1xuICAgIH1cblxuICAgIG9yZGVyLmFkZHJlc3MgPSBvcmRlclBhcmFtcy5hZGRyZXNzO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG5ld09yZGVyID0gYXdhaXQgdGhpcy5jcmVhdGUob3JkZXIpO1xuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5tYXA8T3JkZXJWbT4obmV3T3JkZXIudG9KU09OKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdPcmRlciBFcnJvcjonICsgZSk7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgb25VcGRhdGVPcmRlcihcbiAgICBvcmRlcixcbiAgICBvcmRlclBhcmFtczogT3JkZXJQdXRQYXJhbXMsXG4gICAgcHJvZHVjdHM6IFByb2R1Y3RJdGVtW10sXG4gICk6IFByb21pc2U8T3JkZXJWbT4ge1xuICAgIGNvbnNvbGUubG9nKCdAb25VcGRhdGVPcmRlciAjMScpO1xuICAgIGxldCB0b3RhbCA9IE5vdmljZUhlbHBlci5jYWxjdWxhdGVUb3RhbChwcm9kdWN0cyk7XG4gICAgdG90YWwgPSBOb3ZpY2VIZWxwZXIuYXBwbHlDb3Vwb24odG90YWwsIG9yZGVyLmNvdXBvbik7XG5cbiAgICBvcmRlci50b3RhbCA9IHRvdGFsO1xuICAgIG9yZGVyLm5vdGUgPSBvcmRlclBhcmFtcy5ub3RlO1xuICAgIG9yZGVyLmJhc2tldCA9IFtdO1xuXG4gICAgcHJvZHVjdHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIG9yZGVyLmJhc2tldC5wdXNoKHtcbiAgICAgICAgcXVhbnRpdHk6IGl0ZW0ucXVhbnRpdHksXG4gICAgICAgIHByb2R1Y3Q6IGl0ZW0uaWQsXG4gICAgICAgIHByaWNlOiBpdGVtLnByaWNlLFxuICAgICAgICB0b3RhbEl0ZW1QcmljZTogbnVsbCxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ0BvblVwZGF0ZU9yZGVyICMyJywgb3JkZXIpO1xuICAgIC8vIGlmIChvcmRlci5jb3Vwb24gIT09IG51bGwgJiYgb3JkZXIuY291cG9uLmlkKSB7XG4gICAgLy8gICBvcmRlci5jb3Vwb24gPSBUeXBlcy5PYmplY3RJZChvcmRlci5jb3Vwb24uaWQpO1xuICAgIC8vIH1cblxuICAgIG9yZGVyLmFkZHJlc3MgPSBvcmRlclBhcmFtcy5hZGRyZXNzO1xuXG4gICAgb3JkZXIuc3RhdHVzID0gb3JkZXJQYXJhbXMuc3RhdHVzO1xuICAgIGNvbnNvbGUubG9nKCdAb25VcGRhdGVPcmRlciAjMycsIG9yZGVyKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cGRhdGVkT3JkZXIgPSBhd2FpdCB0aGlzLnVwZGF0ZShvcmRlci5pZCwgb3JkZXIpO1xuICAgICAgY29uc29sZS5sb2coJ0BvblVwZGF0ZU9yZGVyICM0JywgdXBkYXRlZE9yZGVyKTtcblxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubWFwPE9yZGVyVm0+KHVwZGF0ZWRPcmRlci50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG59XG4iXX0=