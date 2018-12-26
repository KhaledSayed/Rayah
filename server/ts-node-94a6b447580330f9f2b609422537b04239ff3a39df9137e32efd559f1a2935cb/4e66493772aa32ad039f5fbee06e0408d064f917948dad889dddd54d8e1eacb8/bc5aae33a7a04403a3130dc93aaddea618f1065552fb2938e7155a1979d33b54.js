"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const configuration_service_1 = require("../../configuration/configuration.service");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const configuration_enum_1 = require("../../configuration/configuration.enum");
let JwtStrategyService = class JwtStrategyService extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(_authService, _configurationService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configurationService.get(configuration_enum_1.Configuration.JWT_KEY),
        });
        this._authService = _authService;
        this._configurationService = _configurationService;
    }
    validate(payload, done) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(payload);
            const user = yield this._authService.validateUser(payload);
            if (!user) {
                return done(new common_1.HttpException({}, common_1.HttpStatus.UNAUTHORIZED), false);
            }
            return done(null, user, payload.iat);
        });
    }
};
JwtStrategyService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        configuration_service_1.ConfigurationService])
], JwtStrategyService);
exports.JwtStrategyService = JwtStrategyService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvYXV0aC9zdHJhdGdpZXMvand0LXN0cmF0ZWd5LnNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvc2hhcmVkL2F1dGgvc3RyYXRnaWVzL2p3dC1zdHJhdGVneS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBdUU7QUFDdkUsa0RBQThDO0FBQzlDLHFGQUFpRjtBQUNqRiwrQ0FBb0Q7QUFDcEQsK0NBQXNFO0FBQ3RFLCtFQUF1RTtBQUd2RSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLDJCQUFnQixDQUFDLHVCQUFRLENBQUM7SUFDaEUsWUFDbUIsWUFBeUIsRUFDekIscUJBQTJDO1FBRTVELEtBQUssQ0FBQztZQUNKLGNBQWMsRUFBRSx5QkFBVSxDQUFDLDJCQUEyQixFQUFFO1lBQ3hELFdBQVcsRUFBRSxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsa0NBQWEsQ0FBQyxPQUFPLENBQUM7U0FDOUQsQ0FBQyxDQUFDO1FBTmMsaUJBQVksR0FBWixZQUFZLENBQWE7UUFDekIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtJQU05RCxDQUFDO0lBRUssUUFBUSxDQUFDLE9BQW1CLEVBQUUsSUFBc0I7O1lBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUzRCxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULE9BQU8sSUFBSSxDQUFDLElBQUksc0JBQWEsQ0FBQyxFQUFFLEVBQUUsbUJBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwRTtZQUVELE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtDQUNGLENBQUE7QUFyQlksa0JBQWtCO0lBRDlCLG1CQUFVLEVBQUU7cUNBR3NCLDBCQUFXO1FBQ0YsNENBQW9CO0dBSG5ELGtCQUFrQixDQXFCOUI7QUFyQlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSHR0cEV4Y2VwdGlvbiwgSHR0cFN0YXR1cyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFzc3BvcnRTdHJhdGVneSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgRXh0cmFjdEp3dCwgVmVyaWZpZWRDYWxsYmFjaywgU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qd3QnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5lbnVtJztcbmltcG9ydCB7IEpXVFBheWxvYWQgfSBmcm9tICcuLi9qd3QtcGF5bG9hZCc7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0U3RyYXRlZ3lTZXJ2aWNlIGV4dGVuZHMgUGFzc3BvcnRTdHJhdGVneShTdHJhdGVneSkge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlndXJhdGlvblNlcnZpY2U6IENvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcih7XG4gICAgICBqd3RGcm9tUmVxdWVzdDogRXh0cmFjdEp3dC5mcm9tQXV0aEhlYWRlckFzQmVhcmVyVG9rZW4oKSxcbiAgICAgIHNlY3JldE9yS2V5OiBfY29uZmlndXJhdGlvblNlcnZpY2UuZ2V0KENvbmZpZ3VyYXRpb24uSldUX0tFWSksXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyB2YWxpZGF0ZShwYXlsb2FkOiBKV1RQYXlsb2FkLCBkb25lOiBWZXJpZmllZENhbGxiYWNrKSB7XG4gICAgY29uc29sZS5sb2cocGF5bG9hZCk7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuX2F1dGhTZXJ2aWNlLnZhbGlkYXRlVXNlcihwYXlsb2FkKTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgcmV0dXJuIGRvbmUobmV3IEh0dHBFeGNlcHRpb24oe30sIEh0dHBTdGF0dXMuVU5BVVRIT1JJWkVEKSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBkb25lKG51bGwsIHVzZXIsIHBheWxvYWQuaWF0KTtcbiAgfVxufVxuIl19