import { BaseModel, schemaOptions } from 'shared/base.model';
import { prop, Ref, ModelType } from 'typegoose';
import { SliderLevel } from './slider-level.enum';
import { Product } from 'product/models/product.model';
import { Category } from 'category/models/category.model';

export class Slider extends BaseModel<Slider> {
  @prop({ required: true })
  banner: string;

  @prop({ required: true, enum: SliderLevel })
  type: SliderLevel;

  @prop({
    required: true,
    ref: this.type === SliderLevel.Product ? Product : Category,
  })
  item: Ref<Category> | Ref<Product>;

  static get model(): ModelType<Slider> {
    return new Slider().getModelForClass(Slider, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
