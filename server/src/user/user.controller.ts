import {
  Controller,
  Body,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RegisterVM } from './models/view-models/register-vm.model';
import { UserVM } from './models/view-models/user-vm.model';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { User } from './models/user.model';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { UserService } from './user.service';
import { LoginVM } from './models/view-models/login-vm.model';
import { LoginResponseVM } from './models/view-models/login-response-vm.model';

@Controller('users')
@ApiUseTags(User.modelName)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserVM })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'Register'))
  async register(@Body() registerVM: RegisterVM): Promise<UserVM> {
    const { email, password } = registerVM;

    if (!email) {
      throw new HttpException('email is required', HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException('password is required', HttpStatus.BAD_REQUEST);
    }

    let exist;

    try {
      exist = await this._userService.findOne({ email: email });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (exist) {
      throw new HttpException(
        `${email} is already registered`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this._userService.register(registerVM);

    return this._userService.map<UserVM>(newUser);
  }

  @Post('login')
  @ApiResponse({ status: HttpStatus.CREATED, type: LoginResponseVM })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'Login'))
  async login(@Body() loginVm: LoginVM): Promise<LoginResponseVM> {
    let fields = Object.keys(loginVm);

    fields.forEach(field => {
      if (!fields[field]) {
        throw new HttpException(`${field} is Required`, HttpStatus.BAD_REQUEST);
      }
    });

    return this._userService.login(loginVm);
  }
}
