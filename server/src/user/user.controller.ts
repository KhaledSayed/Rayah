import {
  Controller,
  Body,
  Post,
  HttpStatus,
  HttpException,
  Request,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RegisterParams } from './models/view-models/register-vm.model';
import { UserVM } from './models/view-models/user-vm.model';
import {
  ApiUseTags,
  ApiResponse,
  ApiOperation,
  ApiImplicitQuery,
} from '@nestjs/swagger';
import { User } from './models/user.model';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';
import { UserService } from './user.service';
import { LoginVM } from './models/view-models/login-vm.model';
import { LoginResponseVM } from './models/view-models/login-response-vm.model';
import { ToInt } from 'shared/pipes/to-int.pipe';
import { map } from 'lodash';
import { Roles } from 'shared/decorators/roles.decorator';
import { UserRole } from './models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'shared/guards/roles.guard';
@Controller('users')
@ApiUseTags(User.modelName)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.CREATED, type: UserVM, isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'List'))
  @ApiImplicitQuery({
    name: 'page',
    required: true,
    type: Number,
  })
  @ApiImplicitQuery({ name: 'perPage', required: true, type: Number })
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getUsers(
    @Query('page', new ToInt()) page: number,
    @Query('perPage', new ToInt()) perPage: number,
  ): Promise<UserVM[]> {
    const users = await this._userService.findAll({}, [], page, perPage);

    return this._userService.map<UserVM[]>(
      map(users, user => user.toJSON()),
      true,
    );
  }

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserVM })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
  @ApiOperation(GetOperationId(User.modelName, 'Register'))
  async register(@Body() registerVM: RegisterParams): Promise<UserVM> {
    const { email, password } = registerVM;

    console.log(registerVM);
  
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
      console.log(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (exist) {
      console.log('Email is Already exist');

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
    console.log('LoginVm:' + loginVm);

    let fields = Object.keys(loginVm);
    fields.forEach(field => {
      if (!loginVm[field]) {
        throw new HttpException(`${field} is Required`, HttpStatus.BAD_REQUEST);
      }
    });

    return this._userService.login(loginVm);
  }
}
