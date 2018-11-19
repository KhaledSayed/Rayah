import { BaseModel } from 'shared/base.model';
import { prop, Ref } from 'typegoose';
import { User } from 'user/models/user.model';
import { Product } from 'product/models/product.model';

class Review extends BaseModel<Review> {
  @prop({ required: true, ref: User })
  reviewer: Ref<User>;

  @prop({ required: true, min: 1, max: 5 })
  stars: number;

  @prop({ required: false })
  description: string;

  @prop({ required: true, ref: Product })
  product: Ref<Product>;
}
