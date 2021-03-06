import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Inject } from 'typedi';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './models/order.model';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { BaseService } from '../shared/base.service';
import { OrderParam } from './models/view-models/order-params.model';
import { OrderVm } from './models/view-models/order-vm.model';
import { ObjectID } from 'bson';
import { Types } from 'mongoose';
import { ProductItem } from './models/product-item.model';
import { NoviceHelper } from './helpers/novice-calculator.helper';
import { Coupon } from '../coupon/models/coupon.model';
import { OrderPutParams } from './models/view-models/order-put-params.model';
import { OrderLevel } from './models/order-level.enum';
import { GiftVm } from './models/view-models/gift-params.vm';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectModel(Order.modelName) _orderModel: ModelType<Order>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._model = _orderModel;
    this._mapper = _mapperService.mapper;
  }

  async onCreateOrder(
    products: ProductItem[],
    coupon: Coupon,
    user,
    orderParams: OrderParam,
  ): Promise<OrderVm> {
    const order = new this._model();

    let total = NoviceHelper.calculateTotal(products);
    total = NoviceHelper.applyCoupon(total, coupon);

    order.total = total;
    order.note = orderParams.note;
    order.status = OrderLevel.New;
    console.log(order);
    products.forEach(item => {
      order.basket.push({
        quantity: item.quantity,
        product: item.id,
        price: item.price,
        totalItemPrice: null,
      });
    });

    order.user = Types.ObjectId(user.id);

    if (coupon !== null) {
      order.coupon = Types.ObjectId(coupon.id);
    }

    order.address = orderParams.address;

    try {
      const newOrder = await this.create(order);

      return await this.map<OrderVm>(newOrder.toJSON());
    } catch (e) {
      console.log('Order Error:' + e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async onUpdateOrder(
    order,
    orderParams: OrderPutParams,
    products: ProductItem[],
  ): Promise<OrderVm> {
    console.log('@onUpdateOrder #1');
    let total = NoviceHelper.calculateTotal(products);
    total = NoviceHelper.applyCoupon(total, order.coupon);

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
    // if (order.coupon !== null && order.coupon.id) {
    //   order.coupon = Types.ObjectId(order.coupon.id);
    // }

    order.address = orderParams.address;

    order.status = orderParams.status;
    console.log('@onUpdateOrder #3', order);

    try {
      const updatedOrder = await this.update(order.id, order);
      console.log('@onUpdateOrder #4', updatedOrder);

      return await this.map<OrderVm>(updatedOrder.toJSON());
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addGift(order, gift: GiftVm): Promise<OrderVm> {
    order.gift = gift;
    try {
      const updatedOrder = await this.update(order.id, order);
      console.log('@onUpdateOrder #4', updatedOrder);

      return await this.map<OrderVm>(updatedOrder.toJSON());
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
