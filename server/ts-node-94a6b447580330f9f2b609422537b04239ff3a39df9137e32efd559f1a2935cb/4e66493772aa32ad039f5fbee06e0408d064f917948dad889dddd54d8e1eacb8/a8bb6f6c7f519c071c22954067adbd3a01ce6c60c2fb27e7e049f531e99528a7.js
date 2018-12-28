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
const base_service_1 = require("../shared/base.service");
const user_model_1 = require("./models/user.model");
const mongoose_1 = require("@nestjs/mongoose");
const mapper_service_1 = require("../shared/mapper/mapper.service");
const bcryptjs_1 = require("bcryptjs");
const auth_service_1 = require("../shared/auth/auth.service");
let UserService = class UserService extends base_service_1.BaseService {
    constructor(_userModel, _mapperService, _authService) {
        super();
        this._userModel = _userModel;
        this._mapperService = _mapperService;
        this._authService = _authService;
        this._model = _userModel;
        this._mapper = _mapperService.mapper;
    }
    register(registerVm) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone, name, email, password } = registerVm;
            const newUser = new this._model();
            newUser.phone = phone;
            newUser.name = name;
            newUser.email = email;
            const salat = yield bcryptjs_1.genSalt(10);
            newUser.password = yield bcryptjs_1.hash(password, salat);
            try {
                const result = yield this.create(newUser);
                return result.toJSON();
            }
            catch (e) {
                console.log(e);
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    login(loginVm) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginVm;
            const user = yield this.findOne({ email });
            if (!user) {
                throw new common_1.HttpException('Invalid Credintials', common_1.HttpStatus.BAD_REQUEST);
            }
            const isMatch = yield bcryptjs_1.compare(password, user.password);
            if (!isMatch) {
                throw new common_1.HttpException('Invalid Credintials', common_1.HttpStatus.BAD_REQUEST);
            }
            const payload = {
                email: user.email,
                role: user.role,
            };
            const token = yield this._authService.signPayload(payload);
            const userVM = yield this.map(user.toJSON());
            return {
                token,
                user: userVM,
            };
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_model_1.User.modelName)),
    __param(2, common_1.Inject(common_1.forwardRef(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy91c2VyL3VzZXIuc2VydmljZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy91c2VyL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBTXdCO0FBQ3hCLHlEQUFxRDtBQUNyRCxvREFBMkM7QUFDM0MsK0NBQStDO0FBRS9DLG9FQUFnRTtBQUVoRSx1Q0FBa0Q7QUFFbEQsOERBQTBEO0FBTTFELElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSwwQkFBaUI7SUFDaEQsWUFDZ0QsVUFBMkIsRUFDeEQsY0FBNkIsRUFDRSxZQUF5QjtRQUV6RSxLQUFLLEVBQUUsQ0FBQztRQUpzQyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtRQUN4RCxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNFLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBR3pFLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDO0lBRUssUUFBUSxDQUFDLFVBQTBCOztZQUN2QyxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ3BELE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRXRCLE1BQU0sS0FBSyxHQUFHLE1BQU0sa0JBQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsUUFBUSxHQUFHLE1BQU0sZUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUvQyxJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxNQUFNLENBQUMsTUFBTSxFQUFVLENBQUM7YUFDaEM7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sSUFBSSxzQkFBYSxDQUFDLENBQUMsRUFBRSxtQkFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDOUQ7UUFDSCxDQUFDO0tBQUE7SUFFSyxLQUFLLENBQUMsT0FBZ0I7O1lBQzFCLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQ3BDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxNQUFNLElBQUksc0JBQWEsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3hFO1lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxrQkFBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdkQsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixNQUFNLElBQUksc0JBQWEsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3hFO1lBRUQsTUFBTSxPQUFPLEdBQWU7Z0JBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ2hCLENBQUM7WUFFRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUVyRCxPQUFPO2dCQUNMLEtBQUs7Z0JBQ0wsSUFBSSxFQUFFLE1BQU07YUFDYixDQUFDO1FBQ0osQ0FBQztLQUFBO0NBQ0YsQ0FBQTtBQXpEWSxXQUFXO0lBRHZCLG1CQUFVLEVBQUU7SUFHUixXQUFBLHNCQUFXLENBQUMsaUJBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUUzQixXQUFBLGVBQU0sQ0FBQyxtQkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDBCQUFXLENBQUMsQ0FBQyxDQUFBOzZDQURMLDhCQUFhO1FBQ2dCLDBCQUFXO0dBSmhFLFdBQVcsQ0F5RHZCO0FBekRZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgSHR0cEV4Y2VwdGlvbixcbiAgSHR0cFN0YXR1cyxcbiAgSW5qZWN0LFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgSW5qZWN0TW9kZWwgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IE1vZGVsVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyBNYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL21hcHBlci9tYXBwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBSZWdpc3RlclBhcmFtcyB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3JlZ2lzdGVyLXZtLm1vZGVsJztcbmltcG9ydCB7IGdlblNhbHQsIGhhc2gsIGNvbXBhcmUgfSBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgeyBMb2dpblZNIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvbG9naW4tdm0ubW9kZWwnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvYXV0aC9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSldUUGF5bG9hZCB9IGZyb20gJy4uL3NoYXJlZC9hdXRoL2p3dC1wYXlsb2FkJztcbmltcG9ydCB7IFVzZXJWTSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3VzZXItdm0ubW9kZWwnO1xuaW1wb3J0IHsgTG9naW5SZXNwb25zZVZNIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvbG9naW4tcmVzcG9uc2Utdm0ubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZTxVc2VyPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3RNb2RlbChVc2VyLm1vZGVsTmFtZSkgcHJpdmF0ZSByZWFkb25seSBfdXNlck1vZGVsOiBNb2RlbFR5cGU8VXNlcj4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWFwcGVyU2VydmljZTogTWFwcGVyU2VydmljZSxcbiAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQXV0aFNlcnZpY2UpKSByZWFkb25seSBfYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX21vZGVsID0gX3VzZXJNb2RlbDtcbiAgICB0aGlzLl9tYXBwZXIgPSBfbWFwcGVyU2VydmljZS5tYXBwZXI7XG4gIH1cblxuICBhc3luYyByZWdpc3RlcihyZWdpc3RlclZtOiBSZWdpc3RlclBhcmFtcyk6IFByb21pc2U8VXNlcj4ge1xuICAgIGNvbnN0IHsgcGhvbmUsIG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9ID0gcmVnaXN0ZXJWbTtcbiAgICBjb25zdCBuZXdVc2VyID0gbmV3IHRoaXMuX21vZGVsKCk7IC8vIEluc3RhbmNlVHlwZTxVc2VyPlxuICAgIG5ld1VzZXIucGhvbmUgPSBwaG9uZTtcbiAgICBuZXdVc2VyLm5hbWUgPSBuYW1lO1xuICAgIG5ld1VzZXIuZW1haWwgPSBlbWFpbDtcblxuICAgIGNvbnN0IHNhbGF0ID0gYXdhaXQgZ2VuU2FsdCgxMCk7XG4gICAgbmV3VXNlci5wYXNzd29yZCA9IGF3YWl0IGhhc2gocGFzc3dvcmQsIHNhbGF0KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNyZWF0ZShuZXdVc2VyKTtcbiAgICAgIHJldHVybiByZXN1bHQudG9KU09OKCkgYXMgVXNlcjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2dpbihsb2dpblZtOiBMb2dpblZNKTogUHJvbWlzZTxMb2dpblJlc3BvbnNlVk0+IHtcbiAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gbG9naW5WbTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5maW5kT25lKHsgZW1haWwgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdJbnZhbGlkIENyZWRpbnRpYWxzJywgSHR0cFN0YXR1cy5CQURfUkVRVUVTVCk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNNYXRjaCA9IGF3YWl0IGNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuXG4gICAgaWYgKCFpc01hdGNoKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignSW52YWxpZCBDcmVkaW50aWFscycsIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWQ6IEpXVFBheWxvYWQgPSB7XG4gICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICB9O1xuXG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCB0aGlzLl9hdXRoU2VydmljZS5zaWduUGF5bG9hZChwYXlsb2FkKTtcbiAgICBjb25zdCB1c2VyVk0gPSBhd2FpdCB0aGlzLm1hcDxVc2VyVk0+KHVzZXIudG9KU09OKCkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuLFxuICAgICAgdXNlcjogdXNlclZNLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==