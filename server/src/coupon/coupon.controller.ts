import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { Coupon } from './models/coupon.model';
import { CouponVm } from './models/view-models/coupon-vm.model';
import { map } from 'lodash';
import { CouponParams } from './models/view-models/coupon-params.model';
import { CouponLevel } from './models/coupon-level.enum';
import * as moment from 'moment';
import { IsUniqueCouponCode } from 'shared/validators/coupons/unique-coupon.validator';
import { CouponPutParams } from './models/view-models/coupon-put-params.model.';
import { ToInt } from 'shared/pipes/to-int.pipe';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { Roles } from 'shared/decorators/roles.decorator';
import { UserRole } from 'user/models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guard';

@Controller('coupons')
@ApiUseTags(Coupon.name)
@ApiBearerAuth()
export class CouponController {
  constructor(private readonly _couponService: CouponService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: CouponVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Coupon.modelName, 'Get'))
  @ApiImplicitQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiImplicitQuery({ name: 'perPage', required: true, type: Number })
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async get(
    @Query('page', new ToInt()) page: number,
    @Query('perPage', new ToInt()) perPage: number,
  ): Promise<CouponVm[]> {
    const coupons = await this._couponService.findAll();
    // return this._todoService.map<TodoVm[]>(
    //     map(todos, todo => todo.toJSON()),
    //     true,
    //   );

    return this._couponService.map<CouponVm[]>(
      map(coupons, coupon => coupon.toJSON()),
      true,
    );
  }

  @Post()
  async post(@Body() couponParams: CouponParams): Promise<CouponVm> {
    try {
      const coupon = this._couponService.onCreateCoupon(couponParams);
      return coupon;
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async put(
    @Body() couponParams: CouponPutParams,
    @Param('id') id,
  ): Promise<CouponVm> {
    const existCoupon = await this._couponService.findById(id);

    if (!existCoupon) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedCoupon = await this._couponService.onUpdateCoupon(
        existCoupon,
        couponParams,
      );

      return updatedCoupon;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    const existCoupon = await this._couponService.findById(id);

    if (!existCoupon) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }

    try {
      const item = await this._couponService.delete(id);
      return this._couponService.map<CouponVm>(item.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    const existCoupon = await this._couponService.findById(id);

    if (!existCoupon) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }

    try {
      return this._couponService.map<CouponVm>(existCoupon.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
