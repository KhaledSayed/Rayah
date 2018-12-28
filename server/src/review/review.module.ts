import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review } from './models/review.model';
import { Product } from 'product/models/product.model';
import { ProductService } from 'product/product.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ProductService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.modelName,
        schema: Review.model.schema,
      },
      {
        name: Product.modelName,
        schema: Product.model.schema,
      },
    ]),
  ],
})
export class ReviewModule {}
