import { BaseModel, schemaOptions } from 'shared/base.model';
import { UserRole } from './user-role.enum';
import { prop, ModelType, Typegoose } from 'typegoose';
import { isEmail } from 'shared/utilities/validators';

export class User extends BaseModel {
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

  @prop({ enum: UserRole })
  role?: UserRole;

  @prop()
  firstName?: string;
  @prop()
  lastName?: string;

  @prop()
  get fullname() {
    return `${this.firstName} ${this.lastName}`;
  }

  static get model(): ModelType<User> {
    return new User().getModelForClass(User, { schemaOptions });
  }

  static get modelName(): string {
    return this.model.modelName;
  }
}
