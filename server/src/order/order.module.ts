import { Module, forwardRef } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './models/order.model';
import { ProductService } from 'product/product.service';
import { Product } from 'product/models/product.model';
import { Coupon } from 'coupon/models/coupon.model';
import { CouponService } from 'coupon/coupon.service';
import { ProductModule } from 'product/product.module';
import { CouponModule } from 'coupon/coupon.module';
import { User } from 'user/models/user.model';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ProductService, CouponService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.modelName,
        schema: Order.model.schema,
      },
      {
        name: Coupon.modelName,
        schema: Coupon.model.schema,
      },
      {
        name: Product.modelName,
        schema: Product.model.schema,
      },
      {
        name: User.modelName,
        schema: User.model.schema,
      },
    ]),
  ],
})
export class OrderModule {}
