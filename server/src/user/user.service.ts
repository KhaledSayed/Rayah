import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { BaseService } from '../shared/base.service';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { RegisterParams } from './models/view-models/register-vm.model';
import { genSalt, hash, compare } from 'bcryptjs';
import { LoginVM } from './models/view-models/login-vm.model';
import { AuthService } from '../shared/auth/auth.service';
import { JWTPayload } from '../shared/auth/jwt-payload';
import { UserVM } from './models/view-models/user-vm.model';
import { LoginResponseVM } from './models/view-models/login-response-vm.model';
import { FcmParam } from './models/view-models/Fcm-param.model';
import { UserRole } from './models/user-role.enum';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
    private readonly _mapperService: MapperService,
    @Inject(forwardRef(() => AuthService)) readonly _authService: AuthService,
  ) {
    super();
    this._model = _userModel;
    this._mapper = _mapperService.mapper;
  }

  async register(registerVm: RegisterParams): Promise<User> {
    const { phone, name, email, password } = registerVm;
    const newUser = new this._model(); // InstanceType<User>
    newUser.phone = phone;
    newUser.name = name;
    newUser.email = email;
    newUser.role = UserRole[registerVm.role];

    const salat = await genSalt(10);
    newUser.password = await hash(password, salat);

    try {
      const result = await this.create(newUser);
      return result.toJSON() as User;
    } catch (e) {
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginVm: LoginVM): Promise<LoginResponseVM> {
    const { email, password } = loginVm;
    const user = await this.findOne({ email });

    if (!user) {
      throw new HttpException('Invalid Credintials', HttpStatus.BAD_REQUEST);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid Credintials', HttpStatus.BAD_REQUEST);
    }

    const payload: JWTPayload = {
      email: user.email,
      role: user.role,
    };

    const token = await this._authService.signPayload(payload);
    const userVM = await this.map<UserVM>(user.toJSON());

    return {
      token,
      user: userVM,
    };
  }

  async postToken(user: User, fcm: FcmParam) {
    const currentUser = await this.findById(user.id);

    currentUser.tokens.push(fcm.token);

    try {
      let updatedUser = await this.update(user.id, currentUser);

      console.log('Updated User Tokens', updatedUser.tokens);
      return null;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteToken(user: any, fcm: FcmParam) {
    const currentUser = await this.findById(user.id);
    const tokenIndex = currentUser.tokens.indexOf(fcm.token);

    if (tokenIndex == -1) {
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }

    console.log(
      'Curren tokens Length Before Delete',
      currentUser.tokens.length,
    );
    currentUser.tokens.slice(tokenIndex);
    console.log('Curren tokens Length After Delete', currentUser.tokens.length);

    try {
      let updatedUser = await this.update(user.id, currentUser);

      console.log('Deleted User Tokens', updatedUser.tokens);
      return null;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
