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
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    getUsers(page, perPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this._userService.findAll({}, [], page, perPage);
            return this._userService.map(lodash_1.map(users, user => user.toJSON()), true);
        });
    }
    register(registerVM) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = registerVM;
            console.log(registerVM);
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
    roles_decorator_1.Roles(user_role_enum_1.UserRole.Admin),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Query('page', new to_int_pipe_1.ToInt())),
    __param(1, common_1.Query('perPage', new to_int_pipe_1.ToInt())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
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
UserController = __decorate([
    common_1.Controller('users'),
    swagger_1.ApiUseTags(user_model_1.User.modelName),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy91c2VyL3VzZXIuY29udHJvbGxlci50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy91c2VyL3VzZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBVXdCO0FBQ3hCLDhFQUF3RTtBQUN4RSxzRUFBNEQ7QUFDNUQsNkNBS3lCO0FBQ3pCLG9EQUEyQztBQUMzQyx1RUFBNkQ7QUFDN0QsMkVBQXNFO0FBQ3RFLGlEQUE2QztBQUM3Qyx3RUFBOEQ7QUFDOUQsMEZBQStFO0FBQy9FLDZEQUFvRDtBQUNwRCxtQ0FBNkI7QUFDN0IsMEVBQTZEO0FBQzdELDREQUFtRDtBQUNuRCwrQ0FBNkM7QUFDN0MsOERBQTBEO0FBRzFELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsWUFBNkIsWUFBeUI7UUFBekIsaUJBQVksR0FBWixZQUFZLENBQWE7SUFBRyxDQUFDO0lBY3BELFFBQVEsQ0FDZ0IsSUFBWSxFQUNULE9BQWU7O1lBRTlDLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFckUsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDMUIsWUFBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUNqQyxJQUFJLENBQ0wsQ0FBQztRQUNKLENBQUM7S0FBQTtJQU1LLFFBQVEsQ0FBUyxVQUEwQjs7WUFDL0MsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV4QixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLE1BQU0sSUFBSSxzQkFBYSxDQUFDLG1CQUFtQixFQUFFLG1CQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEU7WUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLE1BQU0sSUFBSSxzQkFBYSxDQUFDLHNCQUFzQixFQUFFLG1CQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekU7WUFFRCxJQUFJLEtBQUssQ0FBQztZQUVWLElBQUk7Z0JBQ0YsS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUMzRDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsTUFBTSxJQUFJLHNCQUFhLENBQUMsQ0FBQyxFQUFFLG1CQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM5RDtZQUVELElBQUksS0FBSyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFFdEMsTUFBTSxJQUFJLHNCQUFhLENBQ3JCLEdBQUcsS0FBSyx3QkFBd0IsRUFDaEMsbUJBQVUsQ0FBQyxXQUFXLENBQ3ZCLENBQUM7YUFDSDtZQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFN0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBUyxPQUFPLENBQUMsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFNSyxLQUFLLENBQVMsT0FBZ0I7O1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBRWxDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDbkIsTUFBTSxJQUFJLHNCQUFhLENBQUMsR0FBRyxLQUFLLGNBQWMsRUFBRSxtQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUN6RTtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7Q0FDRixDQUFBO0FBcEVDO0lBWkMsWUFBRyxFQUFFO0lBQ0wscUJBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsc0JBQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDeEUscUJBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsa0NBQVksRUFBRSxDQUFDO0lBQ25FLHNCQUFZLENBQUMsaUNBQWMsQ0FBQyxpQkFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRCwwQkFBZ0IsQ0FBQztRQUNoQixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsSUFBSSxFQUFFLE1BQU07S0FDYixDQUFDO0lBQ0QsMEJBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ25FLHVCQUFLLENBQUMseUJBQVEsQ0FBQyxLQUFLLENBQUM7SUFDckIsa0JBQVMsQ0FBQyxvQkFBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLHdCQUFVLENBQUM7SUFFckMsV0FBQSxjQUFLLENBQUMsTUFBTSxFQUFFLElBQUksbUJBQUssRUFBRSxDQUFDLENBQUE7SUFDMUIsV0FBQSxjQUFLLENBQUMsU0FBUyxFQUFFLElBQUksbUJBQUssRUFBRSxDQUFDLENBQUE7Ozs7OENBUS9CO0FBTUQ7SUFKQyxhQUFJLENBQUMsVUFBVSxDQUFDO0lBQ2hCLHFCQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsbUJBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLHNCQUFNLEVBQUUsQ0FBQztJQUN6RCxxQkFBVyxDQUFDLEVBQUUsTUFBTSxFQUFFLG1CQUFVLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxrQ0FBWSxFQUFFLENBQUM7SUFDbkUsc0JBQVksQ0FBQyxpQ0FBYyxDQUFDLGlCQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLFdBQUEsYUFBSSxFQUFFLENBQUE7O3FDQUFhLGtDQUFjOzs4Q0FrQ2hEO0FBTUQ7SUFKQyxhQUFJLENBQUMsT0FBTyxDQUFDO0lBQ2IscUJBQVcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUseUNBQWUsRUFBRSxDQUFDO0lBQ2xFLHFCQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLGtDQUFZLEVBQUUsQ0FBQztJQUNuRSxzQkFBWSxDQUFDLGlDQUFjLENBQUMsaUJBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekMsV0FBQSxhQUFJLEVBQUUsQ0FBQTs7cUNBQVUsd0JBQU87OzJDQVduQztBQWxGVSxjQUFjO0lBRjFCLG1CQUFVLENBQUMsT0FBTyxDQUFDO0lBQ25CLG9CQUFVLENBQUMsaUJBQUksQ0FBQyxTQUFTLENBQUM7cUNBRWtCLDBCQUFXO0dBRDNDLGNBQWMsQ0FtRjFCO0FBbkZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29udHJvbGxlcixcbiAgQm9keSxcbiAgUG9zdCxcbiAgSHR0cFN0YXR1cyxcbiAgSHR0cEV4Y2VwdGlvbixcbiAgUmVxdWVzdCxcbiAgR2V0LFxuICBRdWVyeSxcbiAgVXNlR3VhcmRzLFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZWdpc3RlclBhcmFtcyB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3JlZ2lzdGVyLXZtLm1vZGVsJztcbmltcG9ydCB7IFVzZXJWTSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3VzZXItdm0ubW9kZWwnO1xuaW1wb3J0IHtcbiAgQXBpVXNlVGFncyxcbiAgQXBpUmVzcG9uc2UsXG4gIEFwaU9wZXJhdGlvbixcbiAgQXBpSW1wbGljaXRRdWVyeSxcbn0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEFwaUV4Y2VwdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9hcGktZXhjZXB0aW9uLm1vZGVsJztcbmltcG9ydCB7IEdldE9wZXJhdGlvbklkIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxpdGllcy9nZXQtb3BlcmF0aW9uLWlkJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9naW5WTSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL2xvZ2luLXZtLm1vZGVsJztcbmltcG9ydCB7IExvZ2luUmVzcG9uc2VWTSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL2xvZ2luLXJlc3BvbnNlLXZtLm1vZGVsJztcbmltcG9ydCB7IFRvSW50IH0gZnJvbSAnLi4vc2hhcmVkL3BpcGVzL3RvLWludC5waXBlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3NoYXJlZC9kZWNvcmF0b3JzL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4vbW9kZWxzL3VzZXItcm9sZS5lbnVtJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL3NoYXJlZC9ndWFyZHMvcm9sZXMuZ3VhcmQnO1xuQENvbnRyb2xsZXIoJ3VzZXJzJylcbkBBcGlVc2VUYWdzKFVzZXIubW9kZWxOYW1lKVxuZXhwb3J0IGNsYXNzIFVzZXJDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlKSB7fVxuXG4gIEBHZXQoKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQ1JFQVRFRCwgdHlwZTogVXNlclZNLCBpc0FycmF5OiB0cnVlIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoVXNlci5tb2RlbE5hbWUsICdMaXN0JykpXG4gIEBBcGlJbXBsaWNpdFF1ZXJ5KHtcbiAgICBuYW1lOiAncGFnZScsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgdHlwZTogTnVtYmVyLFxuICB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7IG5hbWU6ICdwZXJQYWdlJywgcmVxdWlyZWQ6IHRydWUsIHR5cGU6IE51bWJlciB9KVxuICBAUm9sZXMoVXNlclJvbGUuQWRtaW4pXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgZ2V0VXNlcnMoXG4gICAgQFF1ZXJ5KCdwYWdlJywgbmV3IFRvSW50KCkpIHBhZ2U6IG51bWJlcixcbiAgICBAUXVlcnkoJ3BlclBhZ2UnLCBuZXcgVG9JbnQoKSkgcGVyUGFnZTogbnVtYmVyLFxuICApOiBQcm9taXNlPFVzZXJWTVtdPiB7XG4gICAgY29uc3QgdXNlcnMgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5maW5kQWxsKHt9LCBbXSwgcGFnZSwgcGVyUGFnZSk7XG5cbiAgICByZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UubWFwPFVzZXJWTVtdPihcbiAgICAgIG1hcCh1c2VycywgdXNlciA9PiB1c2VyLnRvSlNPTigpKSxcbiAgICAgIHRydWUsXG4gICAgKTtcbiAgfVxuXG4gIEBQb3N0KCdyZWdpc3RlcicpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5DUkVBVEVELCB0eXBlOiBVc2VyVk0gfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChVc2VyLm1vZGVsTmFtZSwgJ1JlZ2lzdGVyJykpXG4gIGFzeW5jIHJlZ2lzdGVyKEBCb2R5KCkgcmVnaXN0ZXJWTTogUmVnaXN0ZXJQYXJhbXMpOiBQcm9taXNlPFVzZXJWTT4ge1xuICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZWdpc3RlclZNO1xuXG4gICAgY29uc29sZS5sb2cocmVnaXN0ZXJWTSk7XG5cbiAgICBpZiAoIWVtYWlsKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignZW1haWwgaXMgcmVxdWlyZWQnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG5cbiAgICBpZiAoIXBhc3N3b3JkKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbigncGFzc3dvcmQgaXMgcmVxdWlyZWQnLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG5cbiAgICBsZXQgZXhpc3Q7XG5cbiAgICB0cnkge1xuICAgICAgZXhpc3QgPSBhd2FpdCB0aGlzLl91c2VyU2VydmljZS5maW5kT25lKHsgZW1haWw6IGVtYWlsIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cblxuICAgIGlmIChleGlzdCkge1xuICAgICAgY29uc29sZS5sb2coJ0VtYWlsIGlzIEFscmVhZHkgZXhpc3QnKTtcblxuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICAgIGAke2VtYWlsfSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWRgLFxuICAgICAgICBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdVc2VyID0gYXdhaXQgdGhpcy5fdXNlclNlcnZpY2UucmVnaXN0ZXIocmVnaXN0ZXJWTSk7XG5cbiAgICByZXR1cm4gdGhpcy5fdXNlclNlcnZpY2UubWFwPFVzZXJWTT4obmV3VXNlcik7XG4gIH1cblxuICBAUG9zdCgnbG9naW4nKVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQ1JFQVRFRCwgdHlwZTogTG9naW5SZXNwb25zZVZNIH0pXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5CQURfUkVRVUVTVCwgdHlwZTogQXBpRXhjZXB0aW9uIH0pXG4gIEBBcGlPcGVyYXRpb24oR2V0T3BlcmF0aW9uSWQoVXNlci5tb2RlbE5hbWUsICdMb2dpbicpKVxuICBhc3luYyBsb2dpbihAQm9keSgpIGxvZ2luVm06IExvZ2luVk0pOiBQcm9taXNlPExvZ2luUmVzcG9uc2VWTT4ge1xuICAgIGNvbnNvbGUubG9nKCdMb2dpblZtOicgKyBsb2dpblZtKTtcblxuICAgIGxldCBmaWVsZHMgPSBPYmplY3Qua2V5cyhsb2dpblZtKTtcbiAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoIWxvZ2luVm1bZmllbGRdKSB7XG4gICAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGAke2ZpZWxkfSBpcyBSZXF1aXJlZGAsIEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLmxvZ2luKGxvZ2luVm0pO1xuICB9XG59XG4iXX0=