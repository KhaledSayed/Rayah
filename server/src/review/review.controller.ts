import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Query,
  Param,
  HttpException,
  Post,
  Req,
  Body,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
  ApiImplicitParam,
  ApiUseTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserVM } from '../user/models/view-models/user-vm.model';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { User } from '../user/models/user.model';
import { Roles } from '../shared/decorators/roles.decorator';
import { UserRole } from '../user/models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { ToInt } from '../shared/pipes/to-int.pipe';
import { map, omit } from 'lodash';
import { ReviewVm } from './models/view-models/review-vm.model';
import { Review } from './models/review.model';
import { ProductService } from 'product/product.service';
import { ReviewService } from './review.service';
import { async } from 'rxjs/internal/scheduler/async';
import { Types } from 'mongoose';
import { request } from 'http';
import { ReviewParam } from './models/view-models/review-param.model';

@Controller('review')
@ApiUseTags(Review.modelName)
@ApiBearerAuth()
export class ReviewController {
  constructor(
    private readonly _productService: ProductService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get(':product')
  @ApiResponse({ status: HttpStatus.OK, type: ReviewVm, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Review.modelName, 'List'))
  @ApiImplicitParam({ name: 'product', required: true })
  @ApiImplicitQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiImplicitQuery({ name: 'perPage', required: true, type: Number })
  @Roles(UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getProductReviews(
    @Query('page', new ToInt()) page: number,
    @Query('perPage', new ToInt()) perPage: number,
    @Param('product') product: string,
  ): Promise<ReviewVm[]> {
    // if product is valid

    const productDetails = await this._productService.findById(product);
    //find all due to query

    if (productDetails == null) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }
    const reviews = await this.reviewService.findAll(
      { product: Types.ObjectId(product) },
      ['reviewer', '-password'],
      page,
      perPage,
    );

    const reviewsVm = this.reviewService.map<ReviewVm[]>(
      map(reviews, review => {
        let finalReview = review.toJSON();
        console.log(review);
        return finalReview;
      }),
      true,
    );

    const reviewers: ReviewVm[] = [];

    return reviewsVm.then(items => {
      items.forEach(item => {
        let user = item.reviewer;
        let finalUser = omit(user, ['password']);
        item.reviewer = finalUser;
        reviewers.push(item);
      });

      return reviewers;
    });

    // console.log(reviewsVm);
  }

  @Post(':product')
  @ApiResponse({ status: HttpStatus.CREATED, type: ReviewVm, isArray: false })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(Review.modelName, 'Item'))
  @ApiImplicitParam({ name: 'product', required: true })
  @Roles(UserRole.User)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async addReview(
    @Req() request,
    @Body() reviewParam: ReviewParam,
    @Param('product') product: string,
  ): Promise<ReviewVm> {
    const productDetails = await this._productService.findById(product);
    //find all due to query

    if (productDetails == null) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }

    const review = await this.reviewService.onCreateReview(
      reviewParam,
      request.user,
      product,
    );

    return review;
  }
}
