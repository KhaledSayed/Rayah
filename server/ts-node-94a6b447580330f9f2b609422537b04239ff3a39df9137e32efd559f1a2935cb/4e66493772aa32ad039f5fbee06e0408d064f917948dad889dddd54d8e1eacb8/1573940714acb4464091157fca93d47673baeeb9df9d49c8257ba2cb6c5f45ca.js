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
const base_model_1 = require("../../../shared/base.model");
const swagger_1 = require("@nestjs/swagger");
class LoginVM extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty({ required: true, minLength: 6 }),
    __metadata("design:type", String)
], LoginVM.prototype, "email", void 0);
__decorate([
    swagger_1.ApiModelProperty({
        required: true,
        minLength: 6,
        type: String,
        format: 'password',
    }),
    __metadata("design:type", String)
], LoginVM.prototype, "password", void 0);
exports.LoginVM = LoginVM;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy91c2VyL21vZGVscy92aWV3LW1vZGVscy9sb2dpbi12bS5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy91c2VyL21vZGVscy92aWV3LW1vZGVscy9sb2dpbi12bS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJEQUF5RDtBQUN6RCw2Q0FBbUQ7QUFFbkQsTUFBYSxPQUFRLFNBQVEsd0JBQVc7Q0FXdkM7QUFUQztJQURDLDBCQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7O3NDQUNyQztBQVFkO0lBTkMsMEJBQWdCLENBQUM7UUFDaEIsUUFBUSxFQUFFLElBQUk7UUFDZCxTQUFTLEVBQUUsQ0FBQztRQUNaLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLFVBQVU7S0FDbkIsQ0FBQzs7eUNBQ2U7QUFWbkIsMEJBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWxWbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuXG5leHBvcnQgY2xhc3MgTG9naW5WTSBleHRlbmRzIEJhc2VNb2RlbFZtIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoeyByZXF1aXJlZDogdHJ1ZSwgbWluTGVuZ3RoOiA2IH0pXG4gIGVtYWlsOiBzdHJpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoe1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIG1pbkxlbmd0aDogNixcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZm9ybWF0OiAncGFzc3dvcmQnLFxuICB9KVxuICBwYXNzd29yZDogc3RyaW5nO1xufVxuIl19