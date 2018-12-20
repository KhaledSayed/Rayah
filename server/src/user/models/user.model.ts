import { BaseModel, schemaOptions } from 'shared/base.model';
import { UserRole } from './user-role.enum';
import { prop, ModelType, Typegoose } from 'typegoose';
import { isEmail } from 'shared/utilities/validators';

export class User extends BaseModel<User> {

  @prop({
    required: [true, 'E-mail is Required'],
    unique: true,
    validate: value => isEmail(value),
  })
  email: string;

  @prop({
    required: [true, 'Password is required'],
    minlength: [6, 'Must be at least 6 characters'],
  })
  password: string;

  @prop({ enum: UserRole, default: UserRole.User })
  role?: UserRole;

  @prop()
  name?: string;
  @prop()
  phone?: string;

  @prop({ required: false })
  address: string;

  static get model(): ModelType<User> {
    return new User().getModelForClass(User, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
