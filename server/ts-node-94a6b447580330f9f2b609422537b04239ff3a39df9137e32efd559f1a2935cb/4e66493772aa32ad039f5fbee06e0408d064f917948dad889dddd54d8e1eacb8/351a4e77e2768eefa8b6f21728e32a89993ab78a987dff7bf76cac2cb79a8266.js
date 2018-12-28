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
const base_service_1 = require("../shared/base.service");
const coupon_model_1 = require("./models/coupon.model");
const mongoose_1 = require("@nestjs/mongoose");
const mapper_service_1 = require("../shared/mapper/mapper.service");
let CouponService = class CouponService extends base_service_1.BaseService {
    constructor(_couponModel, _mapperService) {
        super();
        this._couponModel = _couponModel;
        this._mapperService = _mapperService;
        this._model = _couponModel;
        this._mapper = _mapperService.mapper;
    }
    onCreateCoupon(couponParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCoupon = new this._model();
            newCoupon.type = couponParams.type;
            newCoupon.value = couponParams.value;
            newCoupon.code = couponParams.code;
            newCoupon.startDate = couponParams.startDate;
            newCoupon.endDate = couponParams.endDate;
            newCoupon.numberOfPeople = couponParams.numberOfPeople
                ? couponParams.numberOfPeople
                : newCoupon.numberOfPeople;
            newCoupon.active = couponParams.active
                ? couponParams.active
                : newCoupon.active;
            newCoupon.minTotal = couponParams.minTotal;
            newCoupon.maxTotal = couponParams.maxTotal;
            try {
                const coupon = yield this.create(newCoupon);
                const couponVm = yield this.map(coupon.toJSON());
                return couponVm;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    onUpdateCoupon(existedCoupon, couponParams) {
        return __awaiter(this, void 0, void 0, function* () {
            existedCoupon.type = couponParams.type;
            existedCoupon.value = couponParams.value;
            existedCoupon.code = couponParams.code;
            existedCoupon.startDate = couponParams.startDate;
            existedCoupon.endDate = couponParams.endDate;
            existedCoupon.numberOfPeople = couponParams.numberOfPeople
                ? couponParams.numberOfPeople
                : existedCoupon.numberOfPeople;
            existedCoupon.active = couponParams.active
                ? couponParams.active
                : existedCoupon.active;
            existedCoupon.minTotal = couponParams.minTotal;
            existedCoupon.maxTotal = couponParams.maxTotal;
            console.log(existedCoupon);
            try {
                const updatedCoupon = yield this.update(existedCoupon.id, existedCoupon);
                return this.map(updatedCoupon.toJSON());
            }
            catch (e) {
                console.log(e);
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
CouponService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(coupon_model_1.Coupon.modelName)),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService])
], CouponService);
exports.CouponService = CouponService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vY291cG9uLnNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvY291cG9uL2NvdXBvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBdUU7QUFDdkUseURBQXFEO0FBQ3JELHdEQUErQztBQUMvQywrQ0FBK0M7QUFFL0Msb0VBQWdFO0FBTWhFLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSwwQkFBbUI7SUFDcEQsWUFFbUIsWUFBK0IsRUFDL0IsY0FBNkI7UUFFOUMsS0FBSyxFQUFFLENBQUM7UUFIUyxpQkFBWSxHQUFaLFlBQVksQ0FBbUI7UUFDL0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFHOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ3ZDLENBQUM7SUFFSyxjQUFjLENBQUMsWUFBMEI7O1lBQzdDLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNuQyxTQUFTLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDckMsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ25DLFNBQVMsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztZQUM3QyxTQUFTLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFDekMsU0FBUyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsY0FBYztnQkFDcEQsQ0FBQyxDQUFDLFlBQVksQ0FBQyxjQUFjO2dCQUM3QixDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztZQUM3QixTQUFTLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFNO2dCQUNwQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU07Z0JBQ3JCLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ3JCLFNBQVMsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUMzQyxTQUFTLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFFM0MsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBVyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFM0QsT0FBTyxRQUFRLENBQUM7YUFDakI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLElBQUksc0JBQWEsQ0FBQyxDQUFDLEVBQUUsbUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLGFBQWEsRUFBRSxZQUE2Qjs7WUFDL0QsYUFBYSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ3ZDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUN6QyxhQUFhLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDdkMsYUFBYSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO1lBQ2pELGFBQWEsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUM3QyxhQUFhLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxjQUFjO2dCQUN4RCxDQUFDLENBQUMsWUFBWSxDQUFDLGNBQWM7Z0JBQzdCLENBQUMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO1lBQ2pDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU07Z0JBQ3hDLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTTtnQkFDckIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDekIsYUFBYSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQy9DLGFBQWEsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUUvQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTNCLElBQUk7Z0JBQ0YsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBRXpFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBVyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUNuRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLHNCQUFhLENBQUMsQ0FBQyxFQUFFLG1CQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM5RDtRQUNILENBQUM7S0FBQTtDQUNGLENBQUE7QUEvRFksYUFBYTtJQUR6QixtQkFBVSxFQUFFO0lBR1IsV0FBQSxzQkFBVyxDQUFDLHFCQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7NkNBRUcsOEJBQWE7R0FKckMsYUFBYSxDQStEekI7QUEvRFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBIdHRwRXhjZXB0aW9uLCBIdHRwU3RhdHVzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvdXBvbiB9IGZyb20gJy4vbW9kZWxzL2NvdXBvbi5tb2RlbCc7XG5pbXBvcnQgeyBJbmplY3RNb2RlbCB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuaW1wb3J0IHsgTW9kZWxUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IE1hcHBlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbWFwcGVyL21hcHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IENvdXBvblBhcmFtcyB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL2NvdXBvbi1wYXJhbXMubW9kZWwnO1xuaW1wb3J0IHsgQ291cG9uVm0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9jb3Vwb24tdm0ubW9kZWwnO1xuaW1wb3J0IHsgQ291cG9uUHV0UGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvY291cG9uLXB1dC1wYXJhbXMubW9kZWwuJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvdXBvblNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZTxDb3Vwb24+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdE1vZGVsKENvdXBvbi5tb2RlbE5hbWUpXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY291cG9uTW9kZWw6IE1vZGVsVHlwZTxDb3Vwb24+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX21hcHBlclNlcnZpY2U6IE1hcHBlclNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fbW9kZWwgPSBfY291cG9uTW9kZWw7XG4gICAgdGhpcy5fbWFwcGVyID0gX21hcHBlclNlcnZpY2UubWFwcGVyO1xuICB9XG5cbiAgYXN5bmMgb25DcmVhdGVDb3Vwb24oY291cG9uUGFyYW1zOiBDb3Vwb25QYXJhbXMpIHtcbiAgICBjb25zdCBuZXdDb3Vwb24gPSBuZXcgdGhpcy5fbW9kZWwoKTtcbiAgICBuZXdDb3Vwb24udHlwZSA9IGNvdXBvblBhcmFtcy50eXBlO1xuICAgIG5ld0NvdXBvbi52YWx1ZSA9IGNvdXBvblBhcmFtcy52YWx1ZTtcbiAgICBuZXdDb3Vwb24uY29kZSA9IGNvdXBvblBhcmFtcy5jb2RlO1xuICAgIG5ld0NvdXBvbi5zdGFydERhdGUgPSBjb3Vwb25QYXJhbXMuc3RhcnREYXRlO1xuICAgIG5ld0NvdXBvbi5lbmREYXRlID0gY291cG9uUGFyYW1zLmVuZERhdGU7XG4gICAgbmV3Q291cG9uLm51bWJlck9mUGVvcGxlID0gY291cG9uUGFyYW1zLm51bWJlck9mUGVvcGxlXG4gICAgICA/IGNvdXBvblBhcmFtcy5udW1iZXJPZlBlb3BsZVxuICAgICAgOiBuZXdDb3Vwb24ubnVtYmVyT2ZQZW9wbGU7XG4gICAgbmV3Q291cG9uLmFjdGl2ZSA9IGNvdXBvblBhcmFtcy5hY3RpdmVcbiAgICAgID8gY291cG9uUGFyYW1zLmFjdGl2ZVxuICAgICAgOiBuZXdDb3Vwb24uYWN0aXZlO1xuICAgIG5ld0NvdXBvbi5taW5Ub3RhbCA9IGNvdXBvblBhcmFtcy5taW5Ub3RhbDtcbiAgICBuZXdDb3Vwb24ubWF4VG90YWwgPSBjb3Vwb25QYXJhbXMubWF4VG90YWw7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgY291cG9uID0gYXdhaXQgdGhpcy5jcmVhdGUobmV3Q291cG9uKTtcbiAgICAgIGNvbnN0IGNvdXBvblZtID0gYXdhaXQgdGhpcy5tYXA8Q291cG9uVm0+KGNvdXBvbi50b0pTT04oKSk7XG5cbiAgICAgIHJldHVybiBjb3Vwb25WbTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgb25VcGRhdGVDb3Vwb24oZXhpc3RlZENvdXBvbiwgY291cG9uUGFyYW1zOiBDb3Vwb25QdXRQYXJhbXMpIHtcbiAgICBleGlzdGVkQ291cG9uLnR5cGUgPSBjb3Vwb25QYXJhbXMudHlwZTtcbiAgICBleGlzdGVkQ291cG9uLnZhbHVlID0gY291cG9uUGFyYW1zLnZhbHVlO1xuICAgIGV4aXN0ZWRDb3Vwb24uY29kZSA9IGNvdXBvblBhcmFtcy5jb2RlO1xuICAgIGV4aXN0ZWRDb3Vwb24uc3RhcnREYXRlID0gY291cG9uUGFyYW1zLnN0YXJ0RGF0ZTtcbiAgICBleGlzdGVkQ291cG9uLmVuZERhdGUgPSBjb3Vwb25QYXJhbXMuZW5kRGF0ZTtcbiAgICBleGlzdGVkQ291cG9uLm51bWJlck9mUGVvcGxlID0gY291cG9uUGFyYW1zLm51bWJlck9mUGVvcGxlXG4gICAgICA/IGNvdXBvblBhcmFtcy5udW1iZXJPZlBlb3BsZVxuICAgICAgOiBleGlzdGVkQ291cG9uLm51bWJlck9mUGVvcGxlO1xuICAgIGV4aXN0ZWRDb3Vwb24uYWN0aXZlID0gY291cG9uUGFyYW1zLmFjdGl2ZVxuICAgICAgPyBjb3Vwb25QYXJhbXMuYWN0aXZlXG4gICAgICA6IGV4aXN0ZWRDb3Vwb24uYWN0aXZlO1xuICAgIGV4aXN0ZWRDb3Vwb24ubWluVG90YWwgPSBjb3Vwb25QYXJhbXMubWluVG90YWw7XG4gICAgZXhpc3RlZENvdXBvbi5tYXhUb3RhbCA9IGNvdXBvblBhcmFtcy5tYXhUb3RhbDtcblxuICAgIGNvbnNvbGUubG9nKGV4aXN0ZWRDb3Vwb24pO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRDb3Vwb24gPSBhd2FpdCB0aGlzLnVwZGF0ZShleGlzdGVkQ291cG9uLmlkLCBleGlzdGVkQ291cG9uKTtcblxuICAgICAgcmV0dXJuIHRoaXMubWFwPENvdXBvblZtPih1cGRhdGVkQ291cG9uLnRvSlNPTigpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==