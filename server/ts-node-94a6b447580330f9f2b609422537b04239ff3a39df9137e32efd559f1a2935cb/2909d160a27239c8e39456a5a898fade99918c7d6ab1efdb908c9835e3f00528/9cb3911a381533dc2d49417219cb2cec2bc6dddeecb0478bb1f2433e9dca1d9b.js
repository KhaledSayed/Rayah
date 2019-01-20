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
let IsProductUnique = class IsProductUnique {
    constructor(_productService) {
        this._productService = _productService;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Validate Product Code');
            try {
                const product = yield this._productService.findOne({ code: value });
                console.log('Code Product', product);
                return !product;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
IsProductUnique = __decorate([
    class_validator_1.ValidatorConstraint({ async: true }),
    common_1.Injectable(),
    __param(0, common_1.Inject('ProductService')),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], IsProductUnique);
exports.IsProductUnique = IsProductUnique;
function isUniqueProductCode(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isUniqueProductCode',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsProductUnique,
        });
    };
}
exports.isUniqueProductCode = isUniqueProductCode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9wcm9kdWN0L3VuaXF1ZS1jb2RlLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC92YWxpZGF0b3JzL3Byb2R1Y3QvdW5pcXVlLWNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQU15QjtBQUl6QiwyQ0FBK0U7QUFFL0Usc0VBQWtFO0FBS2xFLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFDNkMsZUFBK0I7UUFBL0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO0lBSTVFLENBQUM7SUFFSyxRQUFRLENBQUMsS0FBVSxFQUFFLElBQXlCOztZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFFckMsSUFBSTtnQkFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBRXBFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ2pCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLHNCQUFhLENBQUMsQ0FBQyxFQUFFLG1CQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM5RDtRQUNILENBQUM7S0FBQTtDQUNGLENBQUE7QUFwQlksZUFBZTtJQUYzQixxQ0FBbUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxtQkFBVSxFQUFFO0lBR1IsV0FBQSxlQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtxQ0FBbUMsZ0NBQWM7R0FGakUsZUFBZSxDQW9CM0I7QUFwQlksMENBQWU7QUFzQjVCLFNBQWdCLG1CQUFtQixDQUFDLGlCQUFxQztJQUN2RSxPQUFPLFVBQVMsTUFBYyxFQUFFLFlBQW9CO1FBQ2xELG1DQUFpQixDQUFDO1lBQ2hCLElBQUksRUFBRSxxQkFBcUI7WUFDM0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQzFCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixTQUFTLEVBQUUsZUFBZTtTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBWEQsa0RBV0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICByZWdpc3RlckRlY29yYXRvcixcbiAgVmFsaWRhdGlvbk9wdGlvbnMsXG4gIFZhbGlkYXRpb25Bcmd1bWVudHMsXG4gIFZhbGlkYXRvckNvbnN0cmFpbnQsXG4gIFZhbGlkYXRvckNvbnN0cmFpbnRJbnRlcmZhY2UsXG59IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb3Vwb25MZXZlbCB9IGZyb20gJy4uLy4uLy4uL2NvdXBvbi9tb2RlbHMvY291cG9uLWxldmVsLmVudW0nO1xuaW1wb3J0IHsgVHlwZWdvb3NlLCBNb2RlbFR5cGUsIEluc3RhbmNlVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyB0aHJvd3MgfSBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbiwgSHR0cFN0YXR1cywgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvcHJvZHVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IENvdXBvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3Vwb24vY291cG9uLnNlcnZpY2UnO1xuXG5AVmFsaWRhdG9yQ29uc3RyYWludCh7IGFzeW5jOiB0cnVlIH0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSXNQcm9kdWN0VW5pcXVlIGltcGxlbWVudHMgVmFsaWRhdG9yQ29uc3RyYWludEludGVyZmFjZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ1Byb2R1Y3RTZXJ2aWNlJykgcHJpdmF0ZSByZWFkb25seSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLFxuICApIHtcbiAgICAvLyBjb25zb2xlLmxvZyhfY291cG9uU2VydmljZSk7XG4gICAgLy8gY29uc29sZS5sb2coX3Byb2R1Y3RTZXJ2aWNlKTtcbiAgfVxuXG4gIGFzeW5jIHZhbGlkYXRlKHZhbHVlOiBhbnksIGFyZ3M6IFZhbGlkYXRpb25Bcmd1bWVudHMpIHtcbiAgICBjb25zb2xlLmxvZygnVmFsaWRhdGUgUHJvZHVjdCBDb2RlJyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmZpbmRPbmUoeyBjb2RlOiB2YWx1ZSB9KTtcbiAgICAgIC8vIHByaW50cyB7IF9pZDogNTkyMThmNjg2NDA5ZDY3MGE5N2U1M2UwLCBuYW1lOiAnSm9obkRvZScsIF9fdjogMCB9XG4gICAgICBjb25zb2xlLmxvZygnQ29kZSBQcm9kdWN0JywgcHJvZHVjdCk7XG4gICAgICByZXR1cm4gIXByb2R1Y3Q7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNVbmlxdWVQcm9kdWN0Q29kZSh2YWxpZGF0aW9uT3B0aW9ucz86IFZhbGlkYXRpb25PcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3Q6IE9iamVjdCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICByZWdpc3RlckRlY29yYXRvcih7XG4gICAgICBuYW1lOiAnaXNVbmlxdWVQcm9kdWN0Q29kZScsXG4gICAgICB0YXJnZXQ6IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgY29uc3RyYWludHM6IFtdLFxuICAgICAgb3B0aW9uczogdmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICB2YWxpZGF0b3I6IElzUHJvZHVjdFVuaXF1ZSxcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==