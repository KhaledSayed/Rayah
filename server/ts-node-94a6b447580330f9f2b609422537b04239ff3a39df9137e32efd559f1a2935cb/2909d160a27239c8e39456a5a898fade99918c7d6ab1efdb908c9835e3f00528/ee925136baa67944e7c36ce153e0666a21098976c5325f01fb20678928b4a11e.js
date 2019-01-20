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
let CheckProductValidity = class CheckProductValidity {
    constructor(_productService) {
        this._productService = _productService;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Validate Product Id');
            try {
                const product = yield this._productService.findById(value);
                return product ? true : false;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
CheckProductValidity = __decorate([
    class_validator_1.ValidatorConstraint({ async: true }),
    common_1.Injectable(),
    __param(0, common_1.Inject('ProductService')),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], CheckProductValidity);
exports.CheckProductValidity = CheckProductValidity;
function IsProductValid(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isProductValid',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: CheckProductValidity,
        });
    };
}
exports.IsProductValid = IsProductValid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9wcm9kdWN0L3ZhbGlkLXByb2R1Y3QudmFsaWRhdG9yLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC92YWxpZGF0b3JzL3Byb2R1Y3QvdmFsaWQtcHJvZHVjdC52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQU15QjtBQUl6QiwyQ0FBK0U7QUFFL0Usc0VBQWtFO0FBS2xFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBQy9CLFlBQzZDLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtJQUk1RSxDQUFDO0lBRUssUUFBUSxDQUFDLEtBQVUsRUFBRSxJQUF5Qjs7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRW5DLElBQUk7Z0JBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFM0QsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQy9CO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLHNCQUFhLENBQUMsQ0FBQyxFQUFFLG1CQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM5RDtRQUNILENBQUM7S0FBQTtDQUNGLENBQUE7QUFuQlksb0JBQW9CO0lBRmhDLHFDQUFtQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BDLG1CQUFVLEVBQUU7SUFHUixXQUFBLGVBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO3FDQUFtQyxnQ0FBYztHQUZqRSxvQkFBb0IsQ0FtQmhDO0FBbkJZLG9EQUFvQjtBQXFCakMsU0FBZ0IsY0FBYyxDQUFDLGlCQUFxQztJQUNsRSxPQUFPLFVBQVMsTUFBYyxFQUFFLFlBQW9CO1FBQ2xELG1DQUFpQixDQUFDO1lBQ2hCLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQzFCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixTQUFTLEVBQUUsb0JBQW9CO1NBQ2hDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUM7QUFYRCx3Q0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHJlZ2lzdGVyRGVjb3JhdG9yLFxuICBWYWxpZGF0aW9uT3B0aW9ucyxcbiAgVmFsaWRhdGlvbkFyZ3VtZW50cyxcbiAgVmFsaWRhdG9yQ29uc3RyYWludCxcbiAgVmFsaWRhdG9yQ29uc3RyYWludEludGVyZmFjZSxcbn0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7IENvdXBvbkxldmVsIH0gZnJvbSAnLi4vLi4vLi4vY291cG9uL21vZGVscy9jb3Vwb24tbGV2ZWwuZW51bSc7XG5pbXBvcnQgeyBUeXBlZ29vc2UsIE1vZGVsVHlwZSwgSW5zdGFuY2VUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IHRocm93cyB9IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uLCBIdHRwU3RhdHVzLCBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9wcm9kdWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ291cG9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvdXBvbi9jb3Vwb24uc2VydmljZSc7XG5cbkBWYWxpZGF0b3JDb25zdHJhaW50KHsgYXN5bmM6IHRydWUgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGVja1Byb2R1Y3RWYWxpZGl0eSBpbXBsZW1lbnRzIFZhbGlkYXRvckNvbnN0cmFpbnRJbnRlcmZhY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdQcm9kdWN0U2VydmljZScpIHByaXZhdGUgcmVhZG9ubHkgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgKSB7XG4gICAgLy8gY29uc29sZS5sb2coX2NvdXBvblNlcnZpY2UpO1xuICAgIC8vIGNvbnNvbGUubG9nKF9wcm9kdWN0U2VydmljZSk7XG4gIH1cblxuICBhc3luYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBhcmdzOiBWYWxpZGF0aW9uQXJndW1lbnRzKSB7XG4gICAgY29uc29sZS5sb2coJ1ZhbGlkYXRlIFByb2R1Y3QgSWQnKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZmluZEJ5SWQodmFsdWUpO1xuICAgICAgLy8gcHJpbnRzIHsgX2lkOiA1OTIxOGY2ODY0MDlkNjcwYTk3ZTUzZTAsIG5hbWU6ICdKb2huRG9lJywgX192OiAwIH1cbiAgICAgIHJldHVybiBwcm9kdWN0ID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzUHJvZHVjdFZhbGlkKHZhbGlkYXRpb25PcHRpb25zPzogVmFsaWRhdGlvbk9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdDogT2JqZWN0LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgIHJlZ2lzdGVyRGVjb3JhdG9yKHtcbiAgICAgIG5hbWU6ICdpc1Byb2R1Y3RWYWxpZCcsXG4gICAgICB0YXJnZXQ6IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgY29uc3RyYWludHM6IFtdLFxuICAgICAgb3B0aW9uczogdmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICB2YWxpZGF0b3I6IENoZWNrUHJvZHVjdFZhbGlkaXR5LFxuICAgIH0pO1xuICB9O1xufVxuIl19