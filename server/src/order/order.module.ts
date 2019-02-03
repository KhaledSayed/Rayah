import { Module, forwardRef, MulterModule } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './models/order.model';
import { ProductService } from '../product/product.service';
import { Product } from '../product/models/product.model';
import { Coupon } from '../coupon/models/coupon.model';
import { CouponService } from '../coupon/coupon.service';
import { ProductModule } from '../product/product.module';
import { CouponModule } from '../coupon/coupon.module';
import { User } from '../user/models/user.model';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Module({
  controllers: [OrderController],
  providers: [OrderService, ProductService, CouponService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
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
