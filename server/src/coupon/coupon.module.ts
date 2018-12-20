import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon } from './models/coupon.model';
import {
  IsCouponUnique,
  IsUniqueCouponCode,
} from '../shared/validators/coupons/unique-coupon.validator';
import { CheckCouponValidity } from '../shared/validators/orders/valid-coupon.validator';

@Module({
  exports: [CouponService],
  controllers: [CouponController],
  providers: [IsCouponUnique, CouponService, CheckCouponValidity],
  imports: [
    MongooseModule.forFeature([
      {
        name: Coupon.modelName,
        schema: Coupon.model.schema,
      },
    ]),
  ],
})
export class CouponModule {}
