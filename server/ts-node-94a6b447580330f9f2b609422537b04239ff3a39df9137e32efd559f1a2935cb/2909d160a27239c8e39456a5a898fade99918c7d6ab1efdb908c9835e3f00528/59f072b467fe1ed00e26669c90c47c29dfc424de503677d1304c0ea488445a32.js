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
const product_service_1 = require("../../../product/product.service");
let CheckOrderValidation = class CheckOrderValidation {
    constructor(_productService) {
        this._productService = _productService;
    }
    validate(productItems, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let valid = true;
            for (let i = 0; i < productItems.length; i++) {
                const productItem = productItems[i];
                const product = yield this._productService.findById(productItem.id);
                if (!product) {
                    valid = false;
                    break;
                }
            }
            return true ? true : false;
        });
    }
};
CheckOrderValidation = __decorate([
    class_validator_1.ValidatorConstraint({ async: true }),
    common_1.Injectable(),
    __param(0, common_1.Inject('ProductService')),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], CheckOrderValidation);
exports.CheckOrderValidation = CheckOrderValidation;
function IsOrderValid(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isCategoryExists',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: CheckOrderValidation,
        });
    };
}
exports.IsOrderValid = IsOrderValid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9vcmRlcnMvdmFsaWQtb3JkZXIudmFsaWRhdG9yLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC92YWxpZGF0b3JzL29yZGVycy92YWxpZC1vcmRlci52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQU15QjtBQUt6QiwyQ0FBK0U7QUFJL0Usc0VBQWtFO0FBSWxFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBQy9CLFlBQzZDLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtJQUc1RSxDQUFDO0lBQ0ssUUFBUSxDQUFDLFlBQWlCLEVBQUUsSUFBeUI7O1lBRXpELElBQUksS0FBSyxHQUFZLElBQUksQ0FBQztZQUUxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVwQyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFcEUsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDWixLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNkLE1BQU07aUJBQ1A7YUFDRjtZQUVELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM3QixDQUFDO0tBQUE7Q0FDRixDQUFBO0FBdkJZLG9CQUFvQjtJQUZoQyxxQ0FBbUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxtQkFBVSxFQUFFO0lBR1IsV0FBQSxlQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtxQ0FBbUMsZ0NBQWM7R0FGakUsb0JBQW9CLENBdUJoQztBQXZCWSxvREFBb0I7QUF5QmpDLFNBQWdCLFlBQVksQ0FBQyxpQkFBcUM7SUFDaEUsT0FBTyxVQUFTLE1BQWMsRUFBRSxZQUFvQjtRQUNsRCxtQ0FBaUIsQ0FBQztZQUNoQixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLE1BQU0sRUFBRSxNQUFNLENBQUMsV0FBVztZQUMxQixZQUFZLEVBQUUsWUFBWTtZQUMxQixXQUFXLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsU0FBUyxFQUFFLG9CQUFvQjtTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBWEQsb0NBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICByZWdpc3RlckRlY29yYXRvcixcbiAgVmFsaWRhdGlvbk9wdGlvbnMsXG4gIFZhbGlkYXRpb25Bcmd1bWVudHMsXG4gIFZhbGlkYXRvckNvbnN0cmFpbnQsXG4gIFZhbGlkYXRvckNvbnN0cmFpbnRJbnRlcmZhY2UsXG59IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb3Vwb25MZXZlbCB9IGZyb20gJy4uLy4uLy4uL2NvdXBvbi9tb2RlbHMvY291cG9uLWxldmVsLmVudW0nO1xuaW1wb3J0IHsgQ291cG9uIH0gZnJvbSAnLi4vLi4vLi4vY291cG9uL21vZGVscy9jb3Vwb24ubW9kZWwnO1xuaW1wb3J0IHsgVHlwZWdvb3NlLCBNb2RlbFR5cGUsIEluc3RhbmNlVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyB0aHJvd3MgfSBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbiwgSHR0cFN0YXR1cywgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ291cG9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvdXBvbi9jb3Vwb24uc2VydmljZSc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IENhdGVnb3J5U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NhdGVnb3J5L2NhdGVnb3J5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvZHVjdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZSc7XG5cbkBWYWxpZGF0b3JDb25zdHJhaW50KHsgYXN5bmM6IHRydWUgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGVja09yZGVyVmFsaWRhdGlvbiBpbXBsZW1lbnRzIFZhbGlkYXRvckNvbnN0cmFpbnRJbnRlcmZhY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdQcm9kdWN0U2VydmljZScpIHByaXZhdGUgcmVhZG9ubHkgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgKSB7XG4gICAgLy8gY29uc29sZS5sb2coX2NvdXBvblNlcnZpY2UpO1xuICB9XG4gIGFzeW5jIHZhbGlkYXRlKHByb2R1Y3RJdGVtczogYW55LCBhcmdzOiBWYWxpZGF0aW9uQXJndW1lbnRzKSB7XG4gICAgLy8gcHJpbnRzIHsgX2lkOiA1OTIxOGY2ODY0MDlkNjcwYTk3ZTUzZTAsIG5hbWU6ICdKb2huRG9lJywgX192OiAwIH1cbiAgICBsZXQgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWN0SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHByb2R1Y3RJdGVtID0gcHJvZHVjdEl0ZW1zW2ldO1xuXG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZmluZEJ5SWQocHJvZHVjdEl0ZW0uaWQpO1xuXG4gICAgICBpZiAoIXByb2R1Y3QpIHtcbiAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWUgPyB0cnVlIDogZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzT3JkZXJWYWxpZCh2YWxpZGF0aW9uT3B0aW9ucz86IFZhbGlkYXRpb25PcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3Q6IE9iamVjdCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICByZWdpc3RlckRlY29yYXRvcih7XG4gICAgICBuYW1lOiAnaXNDYXRlZ29yeUV4aXN0cycsXG4gICAgICB0YXJnZXQ6IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgY29uc3RyYWludHM6IFtdLFxuICAgICAgb3B0aW9uczogdmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICB2YWxpZGF0b3I6IENoZWNrT3JkZXJWYWxpZGF0aW9uLFxuICAgIH0pO1xuICB9O1xufVxuIl19