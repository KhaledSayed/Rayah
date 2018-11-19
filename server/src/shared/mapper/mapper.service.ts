import { Injectable } from '@nestjs/common';
import 'automapper-ts/dist/automapper';
@Injectable()
export class MapperService {
  mapper: AutoMapperJs.AutoMapper;

  constructor() {
    this.mapper = automapper;
    this.initializeMapper();
  }

  private initializeMapper() {
    this.mapper.initialize(MapperService.configure);
  }

  private static configure(config: AutoMapperJs.IConfiguration): void {
    config
      .createMap('User', 'UserVm')
      .forSourceMember('_id', opts => opts.ignored())
      .forSourceMember('password', opts => opts.ignore());

    config
      .createMap('Todo', 'TodoVm')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Todo[]', 'TodoVm[]')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Brand', 'BrandVm')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Brand[]', 'BrandVm[]')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Category', 'CategoryVm')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Category[]', 'CategoryVm[]')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Coupon', 'CouponVm')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Coupon[]', 'CouponVm[]')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Product', 'ProductVm')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Product[]', 'ProductVm[]')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Order', 'OrderVm')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Order', 'OrderVm[]')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Slider', 'SliderVm[]')
      .forSourceMember('_id', opts => opts.ignored());

    config
      .createMap('Slider', 'SliderVm')
      .forSourceMember('_id', opts => opts.ignored());
  }
}
