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
const user_role_enum_1 = require("./models/user-role.enum");
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
            newUser.role = user_role_enum_1.UserRole[registerVm.role];
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
    postToken(user, fcm) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield this.findById(user.id);
            currentUser.tokens.push(fcm.token);
            try {
                let updatedUser = yield this.update(user.id, currentUser);
                console.log('Updated User Tokens', updatedUser.tokens);
                return null;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deleteToken(user, fcm) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield this.findById(user.id);
            const tokenIndex = currentUser.tokens.indexOf(fcm.token);
            if (tokenIndex == -1) {
                throw new common_1.HttpException('Token not found', common_1.HttpStatus.NOT_FOUND);
            }
            console.log('Curren tokens Length Before Delete', currentUser.tokens.length);
            currentUser.tokens.slice(tokenIndex);
            console.log('Curren tokens Length After Delete', currentUser.tokens.length);
            try {
                let updatedUser = yield this.update(user.id, currentUser);
                console.log('Deleted User Tokens', updatedUser.tokens);
                return null;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL3VzZXIuc2VydmljZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBTXdCO0FBQ3hCLHlEQUFxRDtBQUNyRCxvREFBMkM7QUFDM0MsK0NBQStDO0FBRS9DLG9FQUFnRTtBQUVoRSx1Q0FBa0Q7QUFFbEQsOERBQTBEO0FBSzFELDREQUFtRDtBQUduRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsMEJBQWlCO0lBQ2hELFlBQ2dELFVBQTJCLEVBQ3hELGNBQTZCLEVBQ0UsWUFBeUI7UUFFekUsS0FBSyxFQUFFLENBQUM7UUFKc0MsZUFBVSxHQUFWLFVBQVUsQ0FBaUI7UUFDeEQsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDRSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUd6RSxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFDdkMsQ0FBQztJQUVLLFFBQVEsQ0FBQyxVQUEwQjs7WUFDdkMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNsQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN0QixPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNwQixPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUN0QixPQUFPLENBQUMsSUFBSSxHQUFHLHlCQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpDLE1BQU0sS0FBSyxHQUFHLE1BQU0sa0JB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O2FBQ2xFO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDVCxvQ0FBb0MsRUFDcEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQzFCLENBQUM7WUFDRixXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFNUUsSUFBSTtnQkFDRixJQUFJLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFFMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZELE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLElBQUksc0JBQWEsQ0FBQyxDQUFDLEVBQUUsbUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQztLQUFBO0NBQ0YsQ0FBQTtBQWxHWSxXQUFXO0lBRHZCLG1CQUFVLEVBQUU7SUFHUixXQUFBLHNCQUFXLENBQUMsaUJBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUUzQixXQUFBLGVBQU0sQ0FBQyxtQkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDBCQUFXLENBQUMsQ0FBQyxDQUFBOzZDQURMLDhCQUFhO1FBQ2dCLDBCQUFXO0dBSmhFLFdBQVcsQ0FrR3ZCO0FBbEdZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgSHR0cEV4Y2VwdGlvbixcbiAgSHR0cFN0YXR1cyxcbiAgSW5qZWN0LFxuICBmb3J3YXJkUmVmLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgSW5qZWN0TW9kZWwgfSBmcm9tICdAbmVzdGpzL21vbmdvb3NlJztcbmltcG9ydCB7IE1vZGVsVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyBNYXBwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL21hcHBlci9tYXBwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBSZWdpc3RlclBhcmFtcyB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3JlZ2lzdGVyLXZtLm1vZGVsJztcbmltcG9ydCB7IGdlblNhbHQsIGhhc2gsIGNvbXBhcmUgfSBmcm9tICdiY3J5cHRqcyc7XG5pbXBvcnQgeyBMb2dpblZNIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvbG9naW4tdm0ubW9kZWwnO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvYXV0aC9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSldUUGF5bG9hZCB9IGZyb20gJy4uL3NoYXJlZC9hdXRoL2p3dC1wYXlsb2FkJztcbmltcG9ydCB7IFVzZXJWTSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3VzZXItdm0ubW9kZWwnO1xuaW1wb3J0IHsgTG9naW5SZXNwb25zZVZNIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvbG9naW4tcmVzcG9uc2Utdm0ubW9kZWwnO1xuaW1wb3J0IHsgRmNtUGFyYW0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9GY20tcGFyYW0ubW9kZWwnO1xuaW1wb3J0IHsgVXNlclJvbGUgfSBmcm9tICcuL21vZGVscy91c2VyLXJvbGUuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlPFVzZXI+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdE1vZGVsKFVzZXIubW9kZWxOYW1lKSBwcml2YXRlIHJlYWRvbmx5IF91c2VyTW9kZWw6IE1vZGVsVHlwZTxVc2VyPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tYXBwZXJTZXJ2aWNlOiBNYXBwZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBBdXRoU2VydmljZSkpIHJlYWRvbmx5IF9hdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fbW9kZWwgPSBfdXNlck1vZGVsO1xuICAgIHRoaXMuX21hcHBlciA9IF9tYXBwZXJTZXJ2aWNlLm1hcHBlcjtcbiAgfVxuXG4gIGFzeW5jIHJlZ2lzdGVyKHJlZ2lzdGVyVm06IFJlZ2lzdGVyUGFyYW1zKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgY29uc3QgeyBwaG9uZSwgbmFtZSwgZW1haWwsIHBhc3N3b3JkIH0gPSByZWdpc3RlclZtO1xuICAgIGNvbnN0IG5ld1VzZXIgPSBuZXcgdGhpcy5fbW9kZWwoKTsgLy8gSW5zdGFuY2VUeXBlPFVzZXI+XG4gICAgbmV3VXNlci5waG9uZSA9IHBob25lO1xuICAgIG5ld1VzZXIubmFtZSA9IG5hbWU7XG4gICAgbmV3VXNlci5lbWFpbCA9IGVtYWlsO1xuICAgIG5ld1VzZXIucm9sZSA9IFVzZXJSb2xlW3JlZ2lzdGVyVm0ucm9sZV07XG5cbiAgICBjb25zdCBzYWxhdCA9IGF3YWl0IGdlblNhbHQoMTApO1xuICAgIG5ld1VzZXIucGFzc3dvcmQgPSBhd2FpdCBoYXNoKHBhc3N3b3JkLCBzYWxhdCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5jcmVhdGUobmV3VXNlcik7XG4gICAgICByZXR1cm4gcmVzdWx0LnRvSlNPTigpIGFzIFVzZXI7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9naW4obG9naW5WbTogTG9naW5WTSk6IFByb21pc2U8TG9naW5SZXNwb25zZVZNPiB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IGxvZ2luVm07XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuZmluZE9uZSh7IGVtYWlsIH0pO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignSW52YWxpZCBDcmVkaW50aWFscycsIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTWF0Y2ggPSBhd2FpdCBjb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcblxuICAgIGlmICghaXNNYXRjaCkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oJ0ludmFsaWQgQ3JlZGludGlhbHMnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkOiBKV1RQYXlsb2FkID0ge1xuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgfTtcblxuICAgIGNvbnN0IHRva2VuID0gYXdhaXQgdGhpcy5fYXV0aFNlcnZpY2Uuc2lnblBheWxvYWQocGF5bG9hZCk7XG4gICAgY29uc3QgdXNlclZNID0gYXdhaXQgdGhpcy5tYXA8VXNlclZNPih1c2VyLnRvSlNPTigpKTtcblxuICAgIHJldHVybiB7XG4gICAgICB0b2tlbixcbiAgICAgIHVzZXI6IHVzZXJWTSxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgcG9zdFRva2VuKHVzZXI6IFVzZXIsIGZjbTogRmNtUGFyYW0pIHtcbiAgICBjb25zdCBjdXJyZW50VXNlciA9IGF3YWl0IHRoaXMuZmluZEJ5SWQodXNlci5pZCk7XG5cbiAgICBjdXJyZW50VXNlci50b2tlbnMucHVzaChmY20udG9rZW4pO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCB1cGRhdGVkVXNlciA9IGF3YWl0IHRoaXMudXBkYXRlKHVzZXIuaWQsIGN1cnJlbnRVc2VyKTtcblxuICAgICAgY29uc29sZS5sb2coJ1VwZGF0ZWQgVXNlciBUb2tlbnMnLCB1cGRhdGVkVXNlci50b2tlbnMpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZVRva2VuKHVzZXI6IGFueSwgZmNtOiBGY21QYXJhbSkge1xuICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gYXdhaXQgdGhpcy5maW5kQnlJZCh1c2VyLmlkKTtcbiAgICBjb25zdCB0b2tlbkluZGV4ID0gY3VycmVudFVzZXIudG9rZW5zLmluZGV4T2YoZmNtLnRva2VuKTtcblxuICAgIGlmICh0b2tlbkluZGV4ID09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignVG9rZW4gbm90IGZvdW5kJywgSHR0cFN0YXR1cy5OT1RfRk9VTkQpO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgJ0N1cnJlbiB0b2tlbnMgTGVuZ3RoIEJlZm9yZSBEZWxldGUnLFxuICAgICAgY3VycmVudFVzZXIudG9rZW5zLmxlbmd0aCxcbiAgICApO1xuICAgIGN1cnJlbnRVc2VyLnRva2Vucy5zbGljZSh0b2tlbkluZGV4KTtcbiAgICBjb25zb2xlLmxvZygnQ3VycmVuIHRva2VucyBMZW5ndGggQWZ0ZXIgRGVsZXRlJywgY3VycmVudFVzZXIudG9rZW5zLmxlbmd0aCk7XG5cbiAgICB0cnkge1xuICAgICAgbGV0IHVwZGF0ZWRVc2VyID0gYXdhaXQgdGhpcy51cGRhdGUodXNlci5pZCwgY3VycmVudFVzZXIpO1xuXG4gICAgICBjb25zb2xlLmxvZygnRGVsZXRlZCBVc2VyIFRva2VucycsIHVwZGF0ZWRVc2VyLnRva2Vucyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG59XG4iXX0=