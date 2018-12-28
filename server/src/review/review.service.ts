import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Review } from './models/review.model';
import { BaseService } from '../shared/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from 'shared/mapper/mapper.service';
import { ReviewParam } from './models/view-models/review-param.model';
import { ReviewVm } from './models/view-models/review-vm.model';
import { ObjectID } from 'bson';
import { User } from 'user/models/user.model';
import { UserVM } from 'user/models/view-models/user-vm.model';
import { Types } from 'mongoose';
import { Rating } from 'product/models/view-models/product-vm.model';

@Injectable()
export class ReviewService extends BaseService<Review> {
  constructor(
    @InjectModel(Review.modelName) _reviewModel: ModelType<Review>,
    private readonly _mapperService: MapperService,
  ) {
    super();
    this._mapper = this._mapperService.mapper;
    this._model = _reviewModel;
  }

  async onCreateReview(
    reviewParams: ReviewParam,
    user: UserVM,
    product: string,
  ): Promise<ReviewVm> {
    let newReview = new this._model();

    newReview.reviewer = Types.ObjectId(user.id);
    newReview.stars = reviewParams.stars;
    newReview.description = reviewParams.description;
    newReview.product = Types.ObjectId(product);

    try {
      const result = await this.create(newReview);
      const reviewVm = await this.map<ReviewVm>(result.toJSON());
      return reviewVm;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async productRatingAverage(product: string): Promise<Rating> {
    let reviews = await this.findAll({ product: product });
    let sum = 0;

    reviews.forEach(item => {
      sum += item.stars;
    });

    return reviews.length != 0
      ? { rate: sum / reviews.length, length: reviews.length }
      : { rate: 0, length: 0 };
  }
}
