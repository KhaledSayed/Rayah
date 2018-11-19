import { BaseModel, schemaOptions } from 'shared/base.model';
import { User } from 'user/models/user.model';
import { Ref, prop, arrayProp, ModelType, Typegoose } from 'typegoose';
import { Product } from 'product/models/product.model';
import { OrderLevel } from './order-level.enum';
import { Coupon } from 'coupon/models/coupon.model';
import { ObjectId } from 'bson';

class ProductItem {
  @prop({ required: true, ref: Product })
  product: Ref<Product>;

  @prop({ required: true, default: 1 })
  quantity: number;

  @prop({ required: true })
  price: number;

  @prop({ required: false })
  get totalItemPrice() {
    return this.price * this.quantity;
  }
}

export class Order extends BaseModel<Order> {
  @prop({ ref: User, required: true })
  user: Ref<User>;

  @arrayProp({ items: ProductItem })
  basket: ProductItem[];

  @prop({ ref: Coupon, required: false })
  coupon: Ref<Coupon>;

  @prop({ required: true })
  address: string;

  @prop({ enum: OrderLevel, default: OrderLevel.Created })
  status: OrderLevel;

  @prop({ required: true })
  total: number;

  static get model(): ModelType<Order> {
    return new Order().getModelForClass(Order, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
