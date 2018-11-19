import {
  CanActivate,
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'user/models/user-role.enum';
import { User } from 'user/models/user.model';
import { InstanceType } from 'typegoose';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this._reflector.get<UserRole[]>('roles', ctx.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest();
    const user: InstanceType<User> = request.user;
    const hasRole = () => roles.indexOf(user.role);

    if (user && user.role && hasRole() !== -1) return true;

    // console.log(roles.indexOf(user.role));

    throw new HttpException(
      `You don't have permission to do this action\n ${request.url}`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
