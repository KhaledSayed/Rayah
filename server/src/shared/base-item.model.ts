import { SchemaOptions } from 'mongoose';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Typegoose, prop, pre } from 'typegoose';
import { BaseModel } from './base.model';

@pre<T>('findOneAndUpdate', function(next) {
  this._update.updatedAt = new Date(Date.now());
  next();
})
export class BaseItemModel<T> extends BaseModel<T> {
  @prop()
  metaTitle?: string;
  @prop()
  metaDescription?: string;

  @prop()
  metaKeywords?: string;
}

export const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
  },
};
