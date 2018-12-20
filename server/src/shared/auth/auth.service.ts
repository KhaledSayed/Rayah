import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignOptions, sign } from 'jsonwebtoken';
import { ConfigurationService } from '../configuration/configuration.service';
import { Configuration } from '../configuration/configuration.enum';
import { JWTPayload } from './jwt-payload';
import { User } from 'user/models/user.model';
import { UserService } from '../../user/user.service';

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

  async validateUser(payload: JWTPayload): Promise<User> {
    return this._userService.findOne({ email: payload.email.toLowerCase() });
  }
}
