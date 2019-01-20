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
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("../../../coupon/coupon.service");
let CheckCouponValidity = class CheckCouponValidity {
    constructor(_couponService) {
        this._couponService = _couponService;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(value);
            if (value === null) {
                return true;
            }
            const coupon = yield this._couponService.findOne({ code: value });
            console.log(coupon);
            return coupon.status;
        });
    }
};
CheckCouponValidity = __decorate([
    class_validator_1.ValidatorConstraint({ async: true }),
    common_1.Injectable(),
    __param(0, common_1.Inject('CouponService')),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CheckCouponValidity);
exports.CheckCouponValidity = CheckCouponValidity;
function IsCouponValid(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isCouponValid',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: CheckCouponValidity,
        });
    };
}
exports.IsCouponValid = IsCouponValid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9vcmRlcnMvdmFsaWQtY291cG9uLnZhbGlkYXRvci50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9vcmRlcnMvdmFsaWQtY291cG9uLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBTXlCO0FBS3pCLDJDQUErRTtBQUMvRSxtRUFBK0Q7QUFRL0QsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFDOUIsWUFDNEMsY0FBNkI7UUFBN0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7SUFHekUsQ0FBQztJQUVLLFFBQVEsQ0FBQyxLQUFVLEVBQUUsSUFBeUI7O1lBR2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUNsQixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtDQUNGLENBQUE7QUFuQlksbUJBQW1CO0lBRi9CLHFDQUFtQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BDLG1CQUFVLEVBQUU7SUFHUixXQUFBLGVBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTtxQ0FBa0MsOEJBQWE7R0FGOUQsbUJBQW1CLENBbUIvQjtBQW5CWSxrREFBbUI7QUFxQmhDLFNBQWdCLGFBQWEsQ0FBQyxpQkFBcUM7SUFDakUsT0FBTyxVQUFTLE1BQWMsRUFBRSxZQUFvQjtRQUNsRCxtQ0FBaUIsQ0FBQztZQUNoQixJQUFJLEVBQUUsZUFBZTtZQUNyQixNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDMUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFNBQVMsRUFBRSxtQkFBbUI7U0FDL0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVhELHNDQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgcmVnaXN0ZXJEZWNvcmF0b3IsXG4gIFZhbGlkYXRpb25PcHRpb25zLFxuICBWYWxpZGF0aW9uQXJndW1lbnRzLFxuICBWYWxpZGF0b3JDb25zdHJhaW50LFxuICBWYWxpZGF0b3JDb25zdHJhaW50SW50ZXJmYWNlLFxufSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHsgQ291cG9uTGV2ZWwgfSBmcm9tICcuLi8uLi8uLi9jb3Vwb24vbW9kZWxzL2NvdXBvbi1sZXZlbC5lbnVtJztcbmltcG9ydCB7IENvdXBvbiB9IGZyb20gJy4uLy4uLy4uL2NvdXBvbi9tb2RlbHMvY291cG9uLm1vZGVsJztcbmltcG9ydCB7IFR5cGVnb29zZSwgTW9kZWxUeXBlLCBJbnN0YW5jZVR5cGUgfSBmcm9tICd0eXBlZ29vc2UnO1xuaW1wb3J0IHsgdGhyb3dzIH0gZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7IEh0dHBFeGNlcHRpb24sIEh0dHBTdGF0dXMsIEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvdXBvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3Vwb24vY291cG9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBDYXRlZ29yeVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jYXRlZ29yeS9jYXRlZ29yeS5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9wcm9kdWN0LnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbkBWYWxpZGF0b3JDb25zdHJhaW50KHsgYXN5bmM6IHRydWUgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGVja0NvdXBvblZhbGlkaXR5IGltcGxlbWVudHMgVmFsaWRhdG9yQ29uc3RyYWludEludGVyZmFjZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ0NvdXBvblNlcnZpY2UnKSBwcml2YXRlIHJlYWRvbmx5IF9jb3Vwb25TZXJ2aWNlOiBDb3Vwb25TZXJ2aWNlLFxuICApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhfY291cG9uU2VydmljZSk7XG4gIH1cblxuICBhc3luYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBhcmdzOiBWYWxpZGF0aW9uQXJndW1lbnRzKSB7XG4gICAgLy8gcHJpbnRzIHsgX2lkOiA1OTIxOGY2ODY0MDlkNjcwYTk3ZTUzZTAsIG5hbWU6ICdKb2huRG9lJywgX192OiAwIH1cblxuICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGNvdXBvbiA9IGF3YWl0IHRoaXMuX2NvdXBvblNlcnZpY2UuZmluZE9uZSh7IGNvZGU6IHZhbHVlIH0pO1xuICAgIGNvbnNvbGUubG9nKGNvdXBvbik7XG4gICAgcmV0dXJuIGNvdXBvbi5zdGF0dXM7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzQ291cG9uVmFsaWQodmFsaWRhdGlvbk9wdGlvbnM/OiBWYWxpZGF0aW9uT3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0OiBPYmplY3QsIHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XG4gICAgcmVnaXN0ZXJEZWNvcmF0b3Ioe1xuICAgICAgbmFtZTogJ2lzQ291cG9uVmFsaWQnLFxuICAgICAgdGFyZ2V0OiBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBwcm9wZXJ0eU5hbWU6IHByb3BlcnR5TmFtZSxcbiAgICAgIGNvbnN0cmFpbnRzOiBbXSxcbiAgICAgIG9wdGlvbnM6IHZhbGlkYXRpb25PcHRpb25zLFxuICAgICAgdmFsaWRhdG9yOiBDaGVja0NvdXBvblZhbGlkaXR5LFxuICAgIH0pO1xuICB9O1xufVxuIl19