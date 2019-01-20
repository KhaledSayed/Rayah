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
const register_vm_model_1 = require("./models/view-models/register-vm.model");
const user_vm_model_1 = require("./models/view-models/user-vm.model");
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("./models/user.model");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const user_service_1 = require("./user.service");
const login_vm_model_1 = require("./models/view-models/login-vm.model");
const login_response_vm_model_1 = require("./models/view-models/login-response-vm.model");
const to_int_pipe_1 = require("../shared/pipes/to-int.pipe");
const lodash_1 = require("lodash");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const user_role_enum_1 = require("./models/user-role.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
const Fcm_param_model_1 = require("./models/view-models/Fcm-param.model");
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    getUsers(page, perPage, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = null;
            let roles = [];
            let rolesQuery = [];
            console.log(type);
            if (type !== undefined) {
                roles = type.split(',');
                console.log(roles);
                roles.forEach(item => {
                    rolesQuery.push({ role: item });
                });
                console.log(rolesQuery);
                users = yield this._userService.findAll({ $or: rolesQuery }, [], page, perPage);
            }
            else {
                users = yield this._userService.findAll({}, [], page, perPage);
            }
            return this._userService.map(lodash_1.map(users, user => user.toJSON()), true);
        });
    }
    register(registerVM) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = registerVM;
            console.log(role, user_role_enum_1.UserRole[role]);
            if (!email) {
                throw new common_1.HttpException('email is required', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!password) {
                throw new common_1.HttpException('password is required', common_1.HttpStatus.BAD_REQUEST);
            }
            let exist;
            try {
                exist = yield this._userService.findOne({ email: email });
            }
            catch (e) {
                console.log(e);
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (exist) {
                console.log('Email is Already exist');
                throw new common_1.HttpException(`${email} is already registered`, common_1.HttpStatus.BAD_REQUEST);
            }
            const newUser = yield this._userService.register(registerVM);
            return this._userService.map(newUser);
        });
    }
    login(loginVm) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('LoginVm:' + loginVm);
            let fields = Object.keys(loginVm);
            fields.forEach(field => {
                if (!loginVm[field]) {
                    throw new common_1.HttpException(`${field} is Required`, common_1.HttpStatus.BAD_REQUEST);
                }
            });
            return this._userService.login(loginVm);
        });
    }
    postToken(fcm, res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userService.postToken(req.user, fcm);
        });
    }
    deleteToken(fcm, res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userService.deleteToken(req.user, fcm);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: user_vm_model_1.UserVM, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(user_model_1.User.modelName, 'List')),
    swagger_1.ApiImplicitQuery({
        name: 'page',
        required: true,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({ name: 'perPage', required: true, type: Number }),
    swagger_1.ApiImplicitQuery({
        name: 'type',
        required: false,
        type: String,
        isArray: true,
    }),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Query('page', new to_int_pipe_1.ToInt())),
    __param(1, common_1.Query('perPage', new to_int_pipe_1.ToInt())),
    __param(2, common_1.Query('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    common_1.Post('register'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: user_vm_model_1.UserVM }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(user_model_1.User.modelName, 'Register')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_vm_model_1.RegisterParams]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    common_1.Post('login'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: login_response_vm_model_1.LoginResponseVM }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(user_model_1.User.modelName, 'Login')),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_vm_model_1.LoginVM]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    common_1.Post('token'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(user_model_1.User.modelName, 'Add Token')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.User),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Fcm_param_model_1.FcmParam, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "postToken", null);
__decorate([
    common_1.Post('logout'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(user_model_1.User.modelName, 'Add Token')),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.User),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Fcm_param_model_1.FcmParam, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteToken", null);
UserController = __decorate([
    common_1.Controller('users'),
    swagger_1.ApiUseTags(user_model_1.User.modelName),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL3VzZXIuY29udHJvbGxlci50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL3VzZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBWXdCO0FBQ3hCLDhFQUF3RTtBQUN4RSxzRUFBNEQ7QUFDNUQsNkNBT3lCO0FBQ3pCLG9EQUEyQztBQUMzQyx1RUFBNkQ7QUFDN0QsMkVBQXNFO0FBQ3RFLGlEQUE2QztBQUM3Qyx3RUFBOEQ7QUFDOUQsMEZBQStFO0FBQy9FLDZEQUFvRDtBQUNwRCxtQ0FBNkI7QUFDN0IsMEVBQTZEO0FBQzdELDREQUFtRDtBQUNuRCwrQ0FBNkM7QUFDN0MsOERBQTBEO0FBQzFELDBFQUFnRTtBQUtoRSxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQ3pCLFlBQTZCLFlBQXlCO1FBQXpCLGlCQUFZLEdBQVosWUFBWSxDQUFhO0lBQUcsQ0FBQztJQW9CcEQsUUFBUSxDQUNnQixJQUFZLEVBQ1QsT0FBZSxFQUMvQixJQUFZOztZQUUzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxLQUFLLEdBQWEsRUFBRSxDQUFDO1lBQ3pCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDdEIsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRW5CLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25CLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFD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LFdBQVcsQ0FBQyxDQUFDO0lBQ3pELHVCQUFLLENBQUMseUJBQVEsQ0FBQyxJQUFJLENBQUM7SUFDcEIsa0JBQVMsQ0FBQyxvQkFBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLHdCQUFVLENBQUM7SUFDdkIsV0FBQSxhQUFJLEVBQUUsQ0FBQSxFQUFpQixXQUFBLFlBQUcsRUFBRSxDQUFBLEVBQU8sV0FBQSxZQUFHLEVBQUUsQ0FBQTs7cUNBQTVCLDBCQUFROzsrQ0FFcEM7QUFRRDtJQU5DLGFBQUksQ0FBQyxRQUFRLENBQUM7SUFDZCxxQkFBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLG1CQUFVLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDdEMscUJBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsa0NBQVksRUFBRSxDQUFDO0lBQ25FLHNCQUFZLENBQUMsaUNBQWMsQ0FBQyxpQkFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN6RCx1QkFBSyxDQUFDLHlCQUFRLENBQUMsSUFBSSxDQUFDO0lBQ3BCLGtCQUFTLENBQUMsb0JBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSx3QkFBVSxDQUFDO0lBQ3JCLFdBQUEsYUFBSSxFQUFFLENBQUEsRUFBaUIsV0FBQSxZQUFHLEVBQUUsQ0FBQSxFQUFPLFdBQUEsWUFBRyxFQUFFLENBQUE7O3FDQUE1QiwwQkFBUTs7aURBRXRDO0FBbElVLGNBQWM7SUFIMUIsbUJBQVUsQ0FBQyxPQUFPLENBQUM7SUFDbkIsb0JBQVUsQ0FBQyxpQkFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQix1QkFBYSxFQUFFO3FDQUU2QiwwQkFBVztHQUQzQyxjQUFjLENBbUkxQjtBQW5JWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbnRyb2xsZXIsXG4gIEJvZHksXG4gIFBvc3QsXG4gIEh0dHBTdGF0dXMsXG4gIEh0dHBFeGNlcHRpb24sXG4gIFJlcXVlc3QsXG4gIEdldCxcbiAgUXVlcnksXG4gIFVzZUd1YXJkcyxcbiAgUmVzLFxuICBSZXEsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlZ2lzdGVyUGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvcmVnaXN0ZXItdm0ubW9kZWwnO1xuaW1wb3J0IHsgVXNlclZNIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvdXNlci12bS5tb2RlbCc7XG5pbXBvcnQge1xuICBBcGlVc2VUYWdzLFxuICBBcGlSZXNwb25zZSxcbiAgQXBpT3BlcmF0aW9uLFxuICBBcGlJbXBsaWNpdFF1ZXJ5LFxuICBBcGlJbXBsaWNpdFBhcmFtLFxuICBBcGlCZWFyZXJBdXRoLFxufSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQXBpRXhjZXB0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2FwaS1leGNlcHRpb24ubW9kZWwnO1xuaW1wb3J0IHsgR2V0T3BlcmF0aW9uSWQgfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2dldC1vcGVyYXRpb24taWQnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBMb2dpblZNIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvbG9naW4tdm0ubW9kZWwnO1xuaW1wb3J0IHsgTG9naW5SZXNwb25zZVZNIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvbG9naW4tcmVzcG9uc2Utdm0ubW9kZWwnO1xuaW1wb3J0IHsgVG9JbnQgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvdG8taW50LnBpcGUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vc2hhcmVkL2RlY29yYXRvcnMvcm9sZXMuZGVjb3JhdG9yJztcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSAnLi9tb2RlbHMvdXNlci1yb2xlLmVudW0nO1xuaW1wb3J0IHsgQXV0aEd1YXJkIH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vc2hhcmVkL2d1YXJkcy9yb2xlcy5ndWFyZCc7XG5pbXBvcnQgeyBGY21QYXJhbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL0ZjbS1wYXJhbS5tb2RlbCc7XG5pbXBvcnQgeyB0eXBlcyB9IGZyb20gJ3V0aWwnO1xuQENvbnRyb2xsZXIoJ3VzZXJzJylcbkBBcGlVc2VUYWdzKFVzZXIubW9kZWxOYW1lKVxuQEFwaUJlYXJlckF1dGgoKVxuZXhwb3J0IGNsYXNzIFVzZXJDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7fVxuXG4gIEBHZXQoKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQ1JFQVRFRCwgdHlwZTogVXNlclZNLCBpc0FycmF5OiB0cnVlIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoVXNlci5tb2RlbE5hbWUsICdMaXN0JykpXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHtcbiAgICBuYW1lOiAncGFnZScsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogTnVtYmVyLFxuICB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7IG5hbWU6ICdwZXJQYWdlJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IE51bWJlciB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7XG4gICAgbmFtZTogJ3R5cGUnLFxuICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgaXNBcnJheTogdHJ1ZSxcbiAgfSlcbiAgQFJvbGVzKFVzZXJSb2xlLkFkbWluKVxuICBAVXNlR3VhcmRzKEF1dGhHdWFyZCgnand0JyksIFJvbGVzR3VhcmQpXG4gIGFzeW5jIGdldFVzZXJzKFxuICAgIEBRdWVyeSgncGFnZScsIG5ldyBUb0ludCgpKSBwYWdlOiBudW1iZXIsXG4gICAgQFF1ZXJ5KCdwZXJQYWdlJywgbmV3IFRvSW50KCkpIHBlclBhZ2U6IG51bWJlcixcbiAgICBAUXVlcnkoJ3R5cGUnKSB0eXBlOiBzdHJpbmcsXG4gICk6IFByb21pc2U8VXNlclZNW10+IHtcbiAgICBsZXQgdXNlcnMgPSBudWxsO1xuICAgIGxldCByb2xlczogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgcm9sZXNRdWVyeSA9IFtdO1xuICAgIGNvbnNvbGUubG9nKHR5cGUpO1xuICAgIGlmICh0eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJvbGVzID0gdHlwZS5zcGxpdCgnLCcpO1xuICAgICAgY29uc29sZS5sb2cocm9sZXMpO1xuXG4gICAgICByb2xlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICByb2xlc1F1ZXJ5LnB1c2goeyByb2xlOiBpdGVtIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKHJvbGVzUXVlcnkpO1xuICAgICAgdXNlcnMgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5maW5kQWxsKFxuICAgICAgICB7ICRvcjogcm9sZXNRdWVyeSB9LFxuICAgICAgICBbXSxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgcGVyUGFnZSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVzZXJzID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UuZmluZEFsbCh7fSwgW10sIHBhZ2UsIHBlclBhZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl91c2VyU2VydmljZS5tYXA8VXNlclZNW10+KFxuICAgICAgbWFwKHVzZXJzLCB1c2VyID0+IHVzZXIudG9KU09OKCkpLFxuICAgICAgdHJ1ZSxcbiAgICApO1xuICB9XG5cbiAgQFBvc3QoJ3JlZ2lzdGVyJylcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkNSRUFURUQsIHR5cGU6IFVzZXJWTSB9KVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKFVzZXIubW9kZWxOYW1lLCAnUmVnaXN0ZXInKSlcbiAgYXN5bmMgcmVnaXN0ZXIoQEJvZHkoKSByZWdpc3RlclZNOiBSZWdpc3RlclBhcmFtcyk6IFByb21pc2U8VXNlclZNPiB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQsIHJvbGUgfSA9IHJlZ2lzdGVyVk07XG5cbiAgICBjb25zb2xlLmxvZyhyb2xlLCBVc2VyUm9sZVtyb2xlXSk7XG5cbiAgICBpZiAoIWVtYWlsKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignZW1haWwgaXMgcmVxdWlyZWQnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG5cbiAgICBpZiAoIXBhc3N3b3JkKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbigncGFzc3dvcmQgaXMgcmVxdWlyZWQnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG5cbiAgICBsZXQgZXhpc3Q7XG5cbiAgICB0cnkge1xuICAgICAgZXhpc3QgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5maW5kT25lKHsgZW1haWw6IGVtYWlsIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cblxuICAgIGlmIChleGlzdCkge1xuICAgICAgY29uc29sZS5sb2coJ0VtYWlsIGlzIEFscmVhZHkgZXhpc3QnKTtcblxuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICAgIGAke2VtYWlsfSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWRgLFxuICAgICAgICBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdVc2VyID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UucmVnaXN0ZXIocmVnaXN0ZXJWTSk7XG5cbiAgICByZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UubWFwPFVzZXJWTT4obmV3VXNlcik7XG4gIH1cblxuICBAUG9zdCgnbG9naW4nKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQ1JFQVRFRCwgdHlwZTogTG9naW5SZXNwb25zZVZNIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoVXNlci5tb2RlbE5hbWUsICdMb2dpbicpKVxuICBhc3luYyBsb2dpbihAQm9keSgpIGxvZ2luVm06IExvZ2luVk0pOiBQcm9taXNlPExvZ2luUmVzcG9uc2VWTT4ge1xuICAgIGNvbnNvbGUubG9nKCdMb2dpblZtOicgKyBsb2dpblZtKTtcblxuICAgIGxldCBmaWVsZHMgPSBPYmplY3Qua2V5cyhsb2dpblZtKTtcbiAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoIWxvZ2luVm1bZmllbGRdKSB7XG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGAke2ZpZWxkfSBpcyBSZXF1aXJlZGAsIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLmxvZ2luKGxvZ2luVm0pO1xuICB9XG5cbiAgQFBvc3QoJ3Rva2VuJylcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLk9LIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoVXNlci5tb2RlbE5hbWUsICdBZGQgVG9rZW4nKSlcbiAgQFJvbGVzKFVzZXJSb2xlLlVzZXIpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgcG9zdFRva2VuKEBCb2R5KCkgZmNtOiBGY21QYXJhbSwgQFJlcygpIHJlcywgQFJlcSgpIHJlcSkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5wb3N0VG9rZW4ocmVxLnVzZXIsIGZjbSk7XG4gIH1cblxuICBAUG9zdCgnbG9nb3V0JylcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLk9LIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoVXNlci5tb2RlbE5hbWUsICdBZGQgVG9rZW4nKSlcbiAgQFJvbGVzKFVzZXJSb2xlLlVzZXIpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgZGVsZXRlVG9rZW4oQEJvZHkoKSBmY206IEZjbVBhcmFtLCBAUmVzKCkgcmVzLCBAUmVxKCkgcmVxKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuX3VzZXJTZXJ2aWNlLmRlbGV0ZVRva2VuKHJlcS51c2VyLCBmY20pO1xuICB9XG59XG4iXX0=