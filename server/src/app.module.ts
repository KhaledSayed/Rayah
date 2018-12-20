import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from './shared/configuration/configuration.service';
import { Configuration } from './shared/configuration/configuration.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo.service';
import { CategoryModule } from './category/category.module';
import { CategoryService } from './category/category.service';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { SliderModule } from './slider/slider.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { ReviewModule } from './review/review.module';
import { BrandService } from './brand/brand.service';
import { CouponService } from './coupon/coupon.service';
import { IsUniqueCouponCode } from './shared/validators/coupons/unique-coupon.validator';
import { ProductService } from './product/product.service';
import { OrderService } from './order/order.service';
import { SliderService } from './slider/slider.service';
import { CheckItemValidity } from './shared/validators/slider/is-item.validator';
@Module({
  imports: [
    SharedModule,
    MongooseModule.forRoot(ConfigurationService.connectionString, {
      useNewUrlParser: true,
    }),
    UserModule,
    TodoModule,
    CategoryModule,
    ProductModule,
    BrandModule,
    SliderModule,
    CouponModule,
    OrderModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TodoService,
    BrandService,
    CategoryService,
    CouponService,
    ProductService,
    OrderService,
    SliderService,
  ],
})
export class AppModule {
  static host: string;
  static port: string | number;
  static isDev: boolean;

  constructor(private readonly _configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(
      _configurationService.get(Configuration.PORT),
    );

    AppModule.host = _configurationService.get(Configuration.HOST);

    AppModule.isDev = _configurationService.isDevelopment;
  }

  private static normalizePort(param: string | number): number | string {
    const portNumber = typeof param === 'string' ? parseInt(param, 10) : param;

    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
  }
}
