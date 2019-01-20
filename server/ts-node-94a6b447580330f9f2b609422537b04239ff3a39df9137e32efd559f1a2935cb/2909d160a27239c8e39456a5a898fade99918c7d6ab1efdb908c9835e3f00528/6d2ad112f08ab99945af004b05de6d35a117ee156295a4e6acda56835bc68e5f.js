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
const order_level_enum_1 = require("./models/order-level.enum");
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
            order.status = order_level_enum_1.OrderLevel.New;
            console.log(order);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9vcmRlci5zZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL29yZGVyL29yZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUF1RTtBQUV2RSwrQ0FBK0M7QUFDL0Msc0RBQTZDO0FBRTdDLG9FQUFnRTtBQUNoRSx5REFBcUQ7QUFJckQsdUNBQWlDO0FBRWpDLGlGQUFrRTtBQUdsRSxnRUFBdUQ7QUFHdkQsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLDBCQUFrQjtJQUNsRCxZQUNnQyxXQUE2QixFQUMxQyxjQUE2QjtRQUU5QyxLQUFLLEVBQUUsQ0FBQztRQUZTLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBRzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDO0lBRUssYUFBYSxDQUNqQixRQUF1QixFQUN2QixNQUFjLEVBQ2QsSUFBSSxFQUNKLFdBQXVCOztZQUV2QixNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVoQyxJQUFJLEtBQUssR0FBRyx1Q0FBWSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxLQUFLLEdBQUcsdUNBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRWhELEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztZQUM5QixLQUFLLENBQUMsTUFBTSxHQUFHLDZCQUFVLENBQUMsR0FBRyxDQUFFO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZixRQUFR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Q2YsTUFBTSxJQUFJLHNCQUFhLENBQUMsQ0FBQyxFQUFFLG1CQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM5RDtRQUNILENBQUM7S0FBQTtDQUNGLENBQUE7QUE5RlksWUFBWTtJQUR4QixtQkFBVSxFQUFFO0lBR1IsV0FBQSxzQkFBVyxDQUFDLG1CQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7NkNBQ0ksOEJBQWE7R0FIckMsWUFBWSxDQThGeEI7QUE5Rlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBIdHRwRXhjZXB0aW9uLCBIdHRwU3RhdHVzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0IH0gZnJvbSAndHlwZWRpJztcbmltcG9ydCB7IEluamVjdE1vZGVsIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4vbW9kZWxzL29yZGVyLm1vZGVsJztcbmltcG9ydCB7IE1vZGVsVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyBNYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL21hcHBlci9tYXBwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JkZXJQYXJhbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL29yZGVyLXBhcmFtcy5tb2RlbCc7XG5pbXBvcnQgeyBPcmRlclZtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItdm0ubW9kZWwnO1xuaW1wb3J0IHsgT2JqZWN0SUQgfSBmcm9tICdic29uJztcbmltcG9ydCB7IFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgUHJvZHVjdEl0ZW0gfSBmcm9tICcuL21vZGVscy9wcm9kdWN0LWl0ZW0ubW9kZWwnO1xuaW1wb3J0IHsgTm92aWNlSGVscGVyIH0gZnJvbSAnLi9oZWxwZXJzL25vdmljZS1jYWxjdWxhdG9yLmhlbHBlcic7XG5pbXBvcnQgeyBDb3Vwb24gfSBmcm9tICcuLi9jb3Vwb24vbW9kZWxzL2NvdXBvbi5tb2RlbCc7XG5pbXBvcnQgeyBPcmRlclB1dFBhcmFtcyB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL29yZGVyLXB1dC1wYXJhbXMubW9kZWwnO1xuaW1wb3J0IHsgT3JkZXJMZXZlbCB9IGZyb20gJy4vbW9kZWxzL29yZGVyLWxldmVsLmVudW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3JkZXJTZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2U8T3JkZXI+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdE1vZGVsKE9yZGVyLm1vZGVsTmFtZSkgX29yZGVyTW9kZWw6IE1vZGVsVHlwZTxPcmRlcj4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWFwcGVyU2VydmljZTogTWFwcGVyU2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9tb2RlbCA9IF9vcmRlck1vZGVsO1xuICAgIHRoaXMuX21hcHBlciA9IF9tYXBwZXJTZXJ2aWNlLm1hcHBlcjtcbiAgfVxuXG4gIGFzeW5jIG9uQ3JlYXRlT3JkZXIoXG4gICAgcHJvZHVjdHM6IFByb2R1Y3RJdGVtW10sXG4gICAgY291cG9uOiBDb3Vwb24sXG4gICAgdXNlcixcbiAgICBvcmRlclBhcmFtczogT3JkZXJQYXJhbSxcbiAgKTogUHJvbWlzZTxPcmRlclZtPiB7XG4gICAgY29uc3Qgb3JkZXIgPSBuZXcgdGhpcy5fbW9kZWwoKTtcblxuICAgIGxldCB0b3RhbCA9IE5vdmljZUhlbHBlci5jYWxjdWxhdGVUb3RhbChwcm9kdWN0cyk7XG4gICAgdG90YWwgPSBOb3ZpY2VIZWxwZXIuYXBwbHlDb3Vwb24odG90YWwsIGNvdXBvbik7XG5cbiAgICBvcmRlci50b3RhbCA9IHRvdGFsO1xuICAgIG9yZGVyLm5vdGUgPSBvcmRlclBhcmFtcy5ub3RlO1xuICAgIG9yZGVyLnN0YXR1cyA9IE9yZGVyTGV2ZWwuTmV3IDtcbmNvbnNvbGUubG9nKG9yZGVyKTtcbiAgICBwcm9kdWN0cy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgb3JkZXIuYmFza2V0LnB1c2goe1xuICAgICAgICBxdWFudGl0eTogaXRlbS5xdWFudGl0eSxcbiAgICAgICAgcHJvZHVjdDogaXRlbS5pZCxcbiAgICAgICAgcHJpY2U6IGl0ZW0ucHJpY2UsXG4gICAgICAgIHRvdGFsSXRlbVByaWNlOiBudWxsLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBvcmRlci51c2VyID0gVHlwZXMuT2JqZWN0SWQodXNlci5pZCk7XG5cbiAgICBpZiAoY291cG9uICE9PSBudWxsKSB7XG4gICAgICBvcmRlci5jb3Vwb24gPSBUeXBlcy5PYmplY3RJZChjb3Vwb24uaWQpO1xuICAgIH1cblxuICAgIG9yZGVyLmFkZHJlc3MgPSBvcmRlclBhcmFtcy5hZGRyZXNzO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG5ld09yZGVyID0gYXdhaXQgdGhpcy5jcmVhdGUob3JkZXIpO1xuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5tYXA8T3JkZXJWbT4obmV3T3JkZXIudG9KU09OKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdPcmRlciBFcnJvcjonICsgZSk7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgb25VcGRhdGVPcmRlcihcbiAgICBvcmRlcixcbiAgICBvcmRlclBhcmFtczogT3JkZXJQdXRQYXJhbXMsXG4gICAgcHJvZHVjdHM6IFByb2R1Y3RJdGVtW10sXG4gICk6IFByb21pc2U8T3JkZXJWbT4ge1xuICAgIGNvbnNvbGUubG9nKCdAb25VcGRhdGVPcmRlciAjMScpO1xuICAgIGxldCB0b3RhbCA9IE5vdmljZUhlbHBlci5jYWxjdWxhdGVUb3RhbChwcm9kdWN0cyk7XG4gICAgdG90YWwgPSBOb3ZpY2VIZWxwZXIuYXBwbHlDb3Vwb24odG90YWwsIG9yZGVyLmNvdXBvbik7XG5cbiAgICBvcmRlci50b3RhbCA9IHRvdGFsO1xuICAgIG9yZGVyLm5vdGUgPSBvcmRlclBhcmFtcy5ub3RlO1xuICAgIG9yZGVyLmJhc2tldCA9IFtdO1xuXG4gICAgcHJvZHVjdHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIG9yZGVyLmJhc2tldC5wdXNoKHtcbiAgICAgICAgcXVhbnRpdHk6IGl0ZW0ucXVhbnRpdHksXG4gICAgICAgIHByb2R1Y3Q6IGl0ZW0uaWQsXG4gICAgICAgIHByaWNlOiBpdGVtLnByaWNlLFxuICAgICAgICB0b3RhbEl0ZW1QcmljZTogbnVsbCxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ0BvblVwZGF0ZU9yZGVyICMyJywgb3JkZXIpO1xuICAgIC8vIGlmIChvcmRlci5jb3Vwb24gIT09IG51bGwgJiYgb3JkZXIuY291cG9uLmlkKSB7XG4gICAgLy8gICBvcmRlci5jb3Vwb24gPSBUeXBlcy5PYmplY3RJZChvcmRlci5jb3Vwb24uaWQpO1xuICAgIC8vIH1cblxuICAgIG9yZGVyLmFkZHJlc3MgPSBvcmRlclBhcmFtcy5hZGRyZXNzO1xuXG4gICAgb3JkZXIuc3RhdHVzID0gb3JkZXJQYXJhbXMuc3RhdHVzO1xuICAgIGNvbnNvbGUubG9nKCdAb25VcGRhdGVPcmRlciAjMycsIG9yZGVyKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB1cGRhdGVkT3JkZXIgPSBhd2FpdCB0aGlzLnVwZGF0ZShvcmRlci5pZCwgb3JkZXIpO1xuICAgICAgY29uc29sZS5sb2coJ0BvblVwZGF0ZU9yZGVyICM0JywgdXBkYXRlZE9yZGVyKTtcblxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubWFwPE9yZGVyVm0+KHVwZGF0ZWRPcmRlci50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG59XG4iXX0=