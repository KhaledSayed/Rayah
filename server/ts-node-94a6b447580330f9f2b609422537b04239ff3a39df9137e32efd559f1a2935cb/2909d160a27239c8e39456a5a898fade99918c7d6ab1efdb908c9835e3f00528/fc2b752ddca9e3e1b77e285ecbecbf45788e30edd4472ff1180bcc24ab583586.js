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
const user_vm_model_1 = require("./user-vm.model");
const swagger_1 = require("@nestjs/swagger");
class LoginResponseVM {
}
__decorate([
    swagger_1.ApiModelProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGNsYW4uY29tIiwicm9sZSI6IlVzZXIiLCJpYXQiOjE1NDMxMDAxNzMsImV4cCI6MTU0MzE0MzM3M30.q9HFCQqIKUwCuO2X106VlAUsUkrpnCDFq_FSBk3lIS8',
    }),
    __metadata("design:type", String)
], LoginResponseVM.prototype, "token", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", user_vm_model_1.UserVM)
], LoginResponseVM.prototype, "user", void 0);
exports.LoginResponseVM = LoginResponseVM;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL21vZGVscy92aWV3LW1vZGVscy9sb2dpbi1yZXNwb25zZS12bS5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL21vZGVscy92aWV3LW1vZGVscy9sb2dpbi1yZXNwb25zZS12bS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1EQUF5QztBQUN6Qyw2Q0FBbUQ7QUFFbkQsTUFBYSxlQUFlO0NBUTNCO0FBSEM7SUFKQywwQkFBZ0IsQ0FBQztRQUNoQixPQUFPLEVBQ0wsc0xBQXNMO0tBQ3pMLENBQUM7OzhDQUNZO0FBRWQ7SUFEQywwQkFBZ0IsRUFBRTs4QkFDYixzQkFBTTs2Q0FBQztBQVBmLDBDQVFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlclZNIH0gZnJvbSAnLi91c2VyLXZtLm1vZGVsJztcbmltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuXG5leHBvcnQgY2xhc3MgTG9naW5SZXNwb25zZVZNIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoe1xuICAgIGV4YW1wbGU6XG4gICAgICAnZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxiV0ZwYkNJNkltRmtiV2x1UUdOc1lXNHVZMjl0SWl3aWNtOXNaU0k2SWxWelpYSWlMQ0pwWVhRaU9qRTFORE14TURBeE56TXNJbVY0Y0NJNk1UVTBNekUwTXpNM00zMC5xOUhGQ1FxSUtVd0N1TzJYMTA2VmxBVXNVa3JwbkNERnFfRlNCazNsSVM4JyxcbiAgfSlcbiAgdG9rZW46IHN0cmluZztcbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICB1c2VyOiBVc2VyVk07XG59XG4iXX0=