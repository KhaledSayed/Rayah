/* tslint:disable */
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiConfiguration } from "./api-configuration";

import { ApiService } from "./services/api.service";
import { UserService } from "./services/user.service";
import { CategoryService } from "./services/category.service";
import { ProductService } from "./services/product.service";
import { BrandService } from "./services/brand.service";
import { SliderService } from "./services/slider.service";
import { CouponService } from "./services/coupon.service";
import { OrderService } from "./services/order.service";
import { AdminInterceptor } from "../admin.interceptor";
import { AuthService } from "../auth.service";
import { BaseService } from "./base-service";

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [
    BaseService,
    ApiConfiguration,
    ApiService,
    UserService,
    CategoryService,
    ProductService,
    BrandService,
    SliderService,
    CouponService,
    OrderService,
    AuthService
  ]
})
export class ApiModule {}
