import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Request,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
  UseGuards,
  Body,
  Query,
} from '@nestjs/common';
import { OrderParam } from './models/view-models/order-params.model';
import { OrderVm } from './models/view-models/order-vm.model';
import { OrderService } from './order.service';
import { ProductService } from 'product/product.service';
import { CouponService } from 'coupon/coupon.service';
import { User } from 'user/models/user.model';
import { Roles } from 'shared/decorators/roles.decorator';
import { UserRole } from 'user/models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guard';
import { async } from 'rxjs/internal/scheduler/async';
import { ProductItem } from './models/product-item.model';
import { Types } from 'mongoose';
import { OrderPutParams } from './models/view-models/order-put-params.model';
import { map } from 'lodash';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { Order } from './models/order.model';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { ToInt } from 'shared/pipes/to-int.pipe';
import { OrderLevel } from './models/order-level.enum';
import { EnumToArray } from 'shared/utilities/enum-to-array';
import { stat } from 'fs';

@Controller('orders')
@ApiUseTags(Order.modelName)
@ApiBearerAuth()
export class OrderController {
  constructor(
    private readonly _orderService: OrderService,
    @Inject(forwardRef(() => ProductService))
    private readonly _productService: ProductService,
    @Inject(forwardRef(() => CouponService))
    private readonly _couponService: CouponService,
  ) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: OrderVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Order.modelName, 'Get'))
  @ApiImplicitQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiImplicitQuery({ name: 'perPage', required: true, type: Number })
  @ApiImplicitQuery({
    name: 'status',
    enum: EnumToArray(OrderLevel),
    isArray: true,
  })
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async get(
    @Query('page', new ToInt()) page: number,
    @Query('perPage', new ToInt()) perPage: number,
    @Query('status') status: OrderLevel[],
    @Request() req,
  ) {
    let statusQuery = [];

    status.forEach(item => {
      statusQuery.push({ status: item });
    });

    if (req.user.role === UserRole.User) {
      const orders = await this._orderService.findAll(
        {
          $and: [{ user: Types.ObjectId(req.user._id) }],
          $or: [...statusQuery],
        },
        ['basket.product'],
        page,
        perPage,
      );

      return await this._orderService.map<OrderVm>(
        map(orders, order => order.toJSON()),
        true,
      );
    } else {
      const orders = await this._orderService.findAll(
        { $or: [...statusQuery] },
        ['basket.product'],
        page,
        perPage,
      );

      return await this._orderService.map<OrderVm>(
        map(orders, order => order.toJSON()),
        true,
      );
    }
  }

  @Get(':id')
  async getOne() {}

  @Post()
  @Roles(UserRole.Admin, UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async post(
    @Body() orderParams: OrderParam,
    @Request() req,
  ): Promise<OrderVm> {
    const ids = [];
    const items = orderParams.basket;
    let coupon = null;
    const updatedProducts: ProductItem[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const product = await this._productService.findById(item.id);

      product.quantity = product.quantity - item.quantity;

      const updatedProduct = await this._productService.update(
        item.id,
        product,
      );
      updatedProducts.push({
        quantity: item.quantity,
        price: updatedProduct.price,
        id: Types.ObjectId(item.id),
      });
    }

    if (orderParams.coupon !== null) {
      coupon = await this._couponService.findById(orderParams.coupon);
    }

    try {
      const order = await this._orderService.onCreateOrder(
        updatedProducts,
        coupon,
        req.user,
        orderParams,
      );

      return order;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async put(orderParams: OrderPutParams, @Param('id') id): Promise<OrderVm> {
    const order = await this._orderService.findById(id, ['coupon']);

    if (!order) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }

    let coupon = null;
    const items = orderParams.basket;
    const updatedProducts: ProductItem[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const product = await this._productService.findById(item.id);

      product.quantity = product.quantity - item.quantity;

      const updatedProduct = await this._productService.update(
        item.id,
        product,
      );
      updatedProducts.push({
        quantity: item.quantity,
        price: updatedProduct.price,
        id: Types.ObjectId(item.id),
      });
    }

    try {
      const updatedOrder = await this._orderService.onUpdateOrder(
        order,
        orderParams,
        updatedProducts,
      );

      return updatedOrder;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return null;
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<OrderVm> {
    const order = await this._orderService.findById(id);

    if (!order) {
      throw new HttpException('Resource Not Found', HttpStatus.NOT_FOUND);
    }

    try {
      const deletedOrder = await this._orderService.delete(id);

      return await this._orderService.map<OrderVm>(deletedOrder.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id/products')
  async putProducts(): Promise<OrderVm> {
    return null;
  }

  @Delete(':id/products/:index')
  async deleteProduct(): Promise<OrderVm> {
    return null;
  }
}
