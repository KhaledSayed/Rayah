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
Object.defineProperty(exports, "__esModule", { value: true });
const login_vm_model_1 = require("./login-vm.model");
const swagger_1 = require("@nestjs/swagger");
class RegisterParams extends login_vm_model_1.LoginVM {
}
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], RegisterParams.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], RegisterParams.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 'admin@google.com' }),
    __metadata("design:type", String)
], RegisterParams.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '123456' }),
    __metadata("design:type", String)
], RegisterParams.prototype, "password", void 0);
exports.RegisterParams = RegisterParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL21vZGVscy92aWV3LW1vZGVscy9yZWdpc3Rlci12bS5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL21vZGVscy92aWV3LW1vZGVscy9yZWdpc3Rlci12bS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFEQUEyQztBQUMzQyw2Q0FBNkU7QUFHN0UsTUFBYSxjQUFlLFNBQVEsd0JBQU87Q0FZMUM7QUFWQztJQURDLGtDQUF3QixFQUFFOzs0Q0FDYjtBQUdkO0lBRkMsa0NBQXdCLEVBQUU7OzZDQUVaO0FBRWY7SUFEQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxDQUFDOzs2Q0FDcEM7QUFFZDtJQURDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDOztnREFDdkI7QUFUbkIsd0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpblZNIH0gZnJvbSAnLi9sb2dpbi12bS5tb2RlbCc7XG5pbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwsIEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgTGVuZ3RoIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcblxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyUGFyYW1zIGV4dGVuZHMgTG9naW5WTSB7XG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBuYW1lPzogc3RyaW5nO1xuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKClcbiAgLy8gQExlbmd0aCh7IG1pbjogMTEsIG1heDogMTEgfSlcbiAgcGhvbmU/OiBzdHJpbmc7XG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJ2FkbWluQGdvb2dsZS5jb20nIH0pXG4gIGVtYWlsOiBzdHJpbmc7XG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJzEyMzQ1NicgfSlcbiAgcGFzc3dvcmQ6IHN0cmluZztcblxuICByb2xlOiBzdHJpbmc7XG59XG4iXX0=