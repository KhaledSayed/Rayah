import { BaseModel, schemaOptions } from '../../shared/base.model';
import { prop, ModelType, Ref } from 'typegoose';
import { BaseItemModel } from '../../shared/base-item.model';

export class Category extends BaseItemModel<Category> {
  @prop({ required: true })
  name: string;

  @prop({ required: false, default: null })
  description: string;

  @prop({ required: true })
  thumbnail: string;

  @prop({ ref: Category, required: false, default: null })
  parent: Ref<Category>;

  static get model(): ModelType<Category> {
    return new Category().getModelForClass(Category, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
