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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const jsonwebtoken_1 = require("jsonwebtoken");
const configuration_service_1 = require("../configuration/configuration.service");
const configuration_enum_1 = require("../configuration/configuration.enum");
const user_service_1 = require("../../user/user.service");
let AuthService = class AuthService {
    constructor(_userService, _configurationService) {
        this._userService = _userService;
        this._configurationService = _configurationService;
        this.jwtOptions = { expiresIn: '12h' };
        this.jwtKey = _configurationService.get(configuration_enum_1.Configuration.JWT_KEY);
    }
    signPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.sign(payload, this.jwtKey, this.jwtOptions);
        });
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._userService.findOne({ email: payload.email.toLowerCase() });
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        configuration_service_1.ConfigurationService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvYXV0aC9hdXRoLnNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvc2hhcmVkL2F1dGgvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0U7QUFDaEUsK0NBQWlEO0FBQ2pELGtGQUE4RTtBQUM5RSw0RUFBb0U7QUFHcEUsMERBQXNEO0FBR3RELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFJdEIsWUFFbUIsWUFBeUIsRUFDekIscUJBQTJDO1FBRDNDLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBc0I7UUFFNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxrQ0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFSyxXQUFXLENBQUMsT0FBbUI7O1lBQ25DLE9BQU8sbUJBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsQ0FBQztLQUFBO0lBRUssWUFBWSxDQUFDLE9BQW1COztZQUNwQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLENBQUM7S0FBQTtDQUNGLENBQUE7QUFwQlksV0FBVztJQUR2QixtQkFBVSxFQUFFO0lBTVIsV0FBQSxlQUFNLENBQUMsbUJBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBVyxDQUFDLENBQUMsQ0FBQTtxQ0FDUCwwQkFBVztRQUNGLDRDQUFvQjtHQVBuRCxXQUFXLENBb0J2QjtBQXBCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgZm9yd2FyZFJlZiB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNpZ25PcHRpb25zLCBzaWduIH0gZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5lbnVtJztcbmltcG9ydCB7IEpXVFBheWxvYWQgfSBmcm9tICcuL2p3dC1wYXlsb2FkJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICd1c2VyL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXNlci91c2VyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuICBwcml2YXRlIHJlYWRvbmx5IGp3dE9wdGlvbnM6IFNpZ25PcHRpb25zO1xuICBwcml2YXRlIHJlYWRvbmx5IGp3dEtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBVc2VyU2VydmljZSkpXG4gICAgcHJpdmF0ZSByZWFkb25seSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NvbmZpZ3VyYXRpb25TZXJ2aWNlOiBDb25maWd1cmF0aW9uU2VydmljZSxcbiAgKSB7XG4gICAgdGhpcy5qd3RPcHRpb25zID0geyBleHBpcmVzSW46ICcxMmgnIH07XG4gICAgdGhpcy5qd3RLZXkgPSBfY29uZmlndXJhdGlvblNlcnZpY2UuZ2V0KENvbmZpZ3VyYXRpb24uSldUX0tFWSk7XG4gIH1cblxuICBhc3luYyBzaWduUGF5bG9hZChwYXlsb2FkOiBKV1RQYXlsb2FkKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gc2lnbihwYXlsb2FkLCB0aGlzLmp3dEtleSwgdGhpcy5qd3RPcHRpb25zKTtcbiAgfVxuXG4gIGFzeW5jIHZhbGlkYXRlVXNlcihwYXlsb2FkOiBKV1RQYXlsb2FkKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgcmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLmZpbmRPbmUoeyBlbWFpbDogcGF5bG9hZC5lbWFpbC50b0xvd2VyQ2FzZSgpIH0pO1xuICB9XG59XG4iXX0=