import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { Coupon } from './models/coupon.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from 'shared/mapper/mapper.service';
import { CouponParams } from './models/view-models/coupon-params.model';
import { CouponVm } from './models/view-models/coupon-vm.model';
import { CouponPutParams } from './models/view-models/coupon-put-params.model.';

@Injectable()
export class CouponService extends BaseService<Coupon> {
  constructor(
    @InjectModel(Coupon.modelName)
    private readonly _couponModel: ModelType<Coupon>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._model = _couponModel;
    this._mapper = _mapperService.mapper;
  }

  async onCreateCoupon(couponParams: CouponParams) {
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
      const coupon = await this.create(newCoupon);
      const couponVm = await this.map<CouponVm>(coupon.toJSON());

      return couponVm;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async onUpdateCoupon(existedCoupon, couponParams: CouponPutParams) {
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
      const updatedCoupon = await this.update(existedCoupon.id, existedCoupon);

      return this.map<CouponVm>(updatedCoupon.toJSON());
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
