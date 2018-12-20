import { BaseItemModel, schemaOptions } from '../../shared/base-item.model';
import { prop, ModelType, arrayProp, Ref } from 'typegoose';
import { Category } from '../../category/models/category.model';

export class Product extends BaseItemModel<Product> {
  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  code: string;

  @prop({ required: true })
  quantity: number;

  @prop({ required: true })
  price: number;

  @prop({ default: false })
  featured: boolean;

  @prop({ required: false, default: '' })
  thumbnail?: string;

  @arrayProp({ items: String, required: false })
  gallery?: string[];

  @prop({ required: true, ref: Category })
  category: Ref<Category>;

  static get model(): ModelType<Product> {
    return new Product().getModelForClass(Product, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
