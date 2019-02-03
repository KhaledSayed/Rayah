import { BaseModel, schemaOptions } from '../../shared/base.model';
import { User } from '../../user/models/user.model';
import {
  Ref,
  prop,
  arrayProp,
  ModelType,
  Typegoose,
  post,
  pre,
} from 'typegoose';
import { Product } from '../../product/models/product.model';
import { OrderLevel } from './order-level.enum';
import { Coupon } from '../../coupon/models/coupon.model';
import { ObjectId } from 'bson';
import invNum from 'invoice-number';

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


class Gift {


  @prop({required:true})
  avatar:string; 


  @prop({required:true})
  name:string;

  @prop({required:true})
  class:string ;

  @prop({required:true})
  school:string;
}

export class Order extends BaseModel<Order> {
  // @prop({ required: false })
  // referenceNumber: string;

  @prop({ ref: User, required: true })
  user: Ref<User>;

  @arrayProp({ items: ProductItem })
  basket: ProductItem[];


  @prop({required:false})
  gift:Gift;

  @prop({ ref: Coupon, required: false })
  coupon: Ref<Coupon>;

  @prop({ required: true })
  address: string;

  @prop({ enum: OrderLevel, default: OrderLevel.New , required:false })
  status: OrderLevel;

  @prop({ required: true })
  total: number;

  @prop({ required: false })
  note: string;

  static get model(): ModelType<Order> {
    return new Order().getModelForClass(Order, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
