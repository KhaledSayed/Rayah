import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignOptions, sign } from 'jsonwebtoken';
import { UserService } from 'user/user.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { Configuration } from '../configuration/configuration.enum';
import { JWTPayload } from './jwt-payload';
import { User } from 'user/models/user.model';

@Injectable()
export class AuthService {
  private readonly jwtOptions: SignOptions;
  private readonly jwtKey: string;

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService,
    private readonly _configurationService: ConfigurationService,
  ) {
    this.jwtOptions = { expiresIn: '12h' };
    this.jwtKey = _configurationService.get(Configuration.JWT_KEY);
  }

  async signPayload(payload: JWTPayload): Promise<string> {
    return sign(payload, this.jwtKey, this.jwtOptions);
  }

  async validatePayload(payload: JWTPayload): Promise<InstanceType<User>> {
    return this._userService.findOne({ email: payload.email.toLowerCase() });
  }
}
