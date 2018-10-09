import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigurationService } from '../../configuration/configuration.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Configuration } from '../../configuration/configuration.enum';
import { JWTPayload } from '../jwt-payload';
@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'JWT') {
  constructor(
    private readonly _authService: AuthService,
    private readonly _configurationService: ConfigurationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configurationService.get(Configuration.JWT_KEY),
    });
  }

  async validate(payload: JWTPayload, done: VerifiedCallback) {
    const user = await this._authService.validateUser(payload);

    if (!user) {
      return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    }

    return done(null, user, payload.iat);
  }
}
