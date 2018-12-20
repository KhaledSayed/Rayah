import { BaseItemModel } from '../../shared/base-item.model';
import { prop, ModelType } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';

export class Brand extends BaseModel<Brand> {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  logo: string;

  static get model(): ModelType<Brand> {
    return new Brand().getModelForClass(Brand, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
