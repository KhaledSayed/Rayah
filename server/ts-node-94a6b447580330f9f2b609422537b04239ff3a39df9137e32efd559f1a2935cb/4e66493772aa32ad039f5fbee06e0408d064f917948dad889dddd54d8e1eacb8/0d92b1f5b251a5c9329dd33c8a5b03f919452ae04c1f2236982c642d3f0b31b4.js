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
let IsCouponUnique = class IsCouponUnique {
    constructor(_couponService) {
        this._couponService = _couponService;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Validate Coupon Code');
            const coupon = yield this._couponService.findOne({ code: value });
            return !coupon;
        });
    }
};
IsCouponUnique = __decorate([
    class_validator_1.ValidatorConstraint({ async: true }),
    common_1.Injectable(),
    __param(0, common_1.Inject('CouponService')),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], IsCouponUnique);
exports.IsCouponUnique = IsCouponUnique;
function IsUniqueCouponCode(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isUniqueCouponCode',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsCouponUnique,
        });
    };
}
exports.IsUniqueCouponCode = IsUniqueCouponCode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9jb3Vwb25zL3VuaXF1ZS1jb3Vwb24udmFsaWRhdG9yLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC92YWxpZGF0b3JzL2NvdXBvbnMvdW5pcXVlLWNvdXBvbi52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQU15QjtBQUt6QiwyQ0FBK0U7QUFDL0UsbUVBQStEO0FBSy9ELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsWUFDNEMsY0FBNkI7UUFBN0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7SUFHekUsQ0FBQztJQUNLLFFBQVEsQ0FBQyxLQUFVLEVBQUUsSUFBeUI7O1lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUVwQyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFFbEUsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUNqQixDQUFDO0tBQUE7Q0FDRixDQUFBO0FBYlksY0FBYztJQUYxQixxQ0FBbUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxtQkFBVSxFQUFFO0lBR1IsV0FBQSxlQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7cUNBQWtDLDhCQUFhO0dBRjlELGNBQWMsQ0FhMUI7QUFiWSx3Q0FBYztBQWUzQixTQUFnQixrQkFBa0IsQ0FBQyxpQkFBcUM7SUFDdEUsT0FBTyxVQUFTLE1BQWMsRUFBRSxZQUFvQjtRQUNsRCxtQ0FBaUIsQ0FBQztZQUNoQixJQUFJLEVBQUUsb0JBQW9CO1lBQzFCLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVztZQUMxQixZQUFZLEVBQUUsWUFBWTtZQUMxQixXQUFXLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsU0FBUyxFQUFFLGNBQWM7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVhELGdEQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgcmVnaXN0ZXJEZWNvcmF0b3IsXG4gIFZhbGlkYXRpb25PcHRpb25zLFxuICBWYWxpZGF0aW9uQXJndW1lbnRzLFxuICBWYWxpZGF0b3JDb25zdHJhaW50LFxuICBWYWxpZGF0b3JDb25zdHJhaW50SW50ZXJmYWNlLFxufSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHsgQ291cG9uTGV2ZWwgfSBmcm9tICcuLi8uLi8uLi9jb3Vwb24vbW9kZWxzL2NvdXBvbi1sZXZlbC5lbnVtJztcbmltcG9ydCB7IENvdXBvbiB9IGZyb20gJy4uLy4uLy4uL2NvdXBvbi9tb2RlbHMvY291cG9uLm1vZGVsJztcbmltcG9ydCB7IFR5cGVnb29zZSwgTW9kZWxUeXBlLCBJbnN0YW5jZVR5cGUgfSBmcm9tICd0eXBlZ29vc2UnO1xuaW1wb3J0IHsgdGhyb3dzIH0gZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7IEh0dHBFeGNlcHRpb24sIEh0dHBTdGF0dXMsIEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvdXBvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3Vwb24vY291cG9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdtb25nb29zZSc7XG5cbkBWYWxpZGF0b3JDb25zdHJhaW50KHsgYXN5bmM6IHRydWUgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJc0NvdXBvblVuaXF1ZSBpbXBsZW1lbnRzIFZhbGlkYXRvckNvbnN0cmFpbnRJbnRlcmZhY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdDb3Vwb25TZXJ2aWNlJykgcHJpdmF0ZSByZWFkb25seSBfY291cG9uU2VydmljZTogQ291cG9uU2VydmljZSxcbiAgKSB7XG4gICAgLy8gY29uc29sZS5sb2coX2NvdXBvblNlcnZpY2UpO1xuICB9XG4gIGFzeW5jIHZhbGlkYXRlKHZhbHVlOiBhbnksIGFyZ3M6IFZhbGlkYXRpb25Bcmd1bWVudHMpIHtcbiAgICBjb25zb2xlLmxvZygnVmFsaWRhdGUgQ291cG9uIENvZGUnKTtcblxuICAgIGNvbnN0IGNvdXBvbiA9IGF3YWl0IHRoaXMuX2NvdXBvblNlcnZpY2UuZmluZE9uZSh7IGNvZGU6IHZhbHVlIH0pO1xuICAgIC8vIHByaW50cyB7IF9pZDogNTkyMThmNjg2NDA5ZDY3MGE5N2U1M2UwLCBuYW1lOiAnSm9obkRvZScsIF9fdjogMCB9XG4gICAgcmV0dXJuICFjb3Vwb247XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzVW5pcXVlQ291cG9uQ29kZSh2YWxpZGF0aW9uT3B0aW9ucz86IFZhbGlkYXRpb25PcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3Q6IE9iamVjdCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICByZWdpc3RlckRlY29yYXRvcih7XG4gICAgICBuYW1lOiAnaXNVbmlxdWVDb3Vwb25Db2RlJyxcbiAgICAgIHRhcmdldDogb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgcHJvcGVydHlOYW1lOiBwcm9wZXJ0eU5hbWUsXG4gICAgICBjb25zdHJhaW50czogW10sXG4gICAgICBvcHRpb25zOiB2YWxpZGF0aW9uT3B0aW9ucyxcbiAgICAgIHZhbGlkYXRvcjogSXNDb3Vwb25VbmlxdWUsXG4gICAgfSk7XG4gIH07XG59XG4iXX0=