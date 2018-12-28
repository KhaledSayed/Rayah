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
let CheckProductQuantity = class CheckProductQuantity {
    constructor(_productService) {
        this._productService = _productService;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Validate Product Id');
            const [relatedPropertyName] = args.constraints;
            const id = args.object[relatedPropertyName];
            try {
                const product = yield this._productService.findById(id);
                return product.quantity >= value;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
CheckProductQuantity = __decorate([
    class_validator_1.ValidatorConstraint({ async: true }),
    common_1.Injectable(),
    __param(0, common_1.Inject('ProductService')),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], CheckProductQuantity);
exports.CheckProductQuantity = CheckProductQuantity;
function IsApplicable(property, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isQuantityApplicable',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: CheckProductQuantity,
        });
    };
}
exports.IsApplicable = IsApplicable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9wcm9kdWN0L2lzLWFwcGxpY2FibGUudmFsaWRhdG9yLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC92YWxpZGF0b3JzL3Byb2R1Y3QvaXMtYXBwbGljYWJsZS52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQU15QjtBQUl6QiwyQ0FBK0U7QUFFL0Usc0VBQWtFO0FBS2xFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBQy9CLFlBQzZDLGVBQStCO1FBQS9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtJQUk1RSxDQUFDO0lBRUssUUFBUSxDQUFDLEtBQVUsRUFBRSxJQUF5Qjs7WUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRW5DLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDL0MsTUFBTSxFQUFFLEdBQUksSUFBSSxDQUFDLE1BQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRXJELElBQUk7Z0JBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFeEQsT0FBTyxPQUFPLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQzthQUNsQztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE1BQU0sSUFBSSxzQkFBYSxDQUFDLENBQUMsRUFBRSxtQkFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDOUQ7UUFDSCxDQUFDO0tBQUE7Q0FDRixDQUFBO0FBdEJZLG9CQUFvQjtJQUZoQyxxQ0FBbUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxtQkFBVSxFQUFFO0lBR1IsV0FBQSxlQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtxQ0FBbUMsZ0NBQWM7R0FGakUsb0JBQW9CLENBc0JoQztBQXRCWSxvREFBb0I7QUF3QmpDLFNBQWdCLFlBQVksQ0FDMUIsUUFBZ0IsRUFDaEIsaUJBQXFDO0lBRXJDLE9BQU8sVUFBUyxNQUFjLEVBQUUsWUFBb0I7UUFDbEQsbUNBQWlCLENBQUM7WUFDaEIsSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDMUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsU0FBUyxFQUFFLG9CQUFvQjtTQUNoQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBZEQsb0NBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICByZWdpc3RlckRlY29yYXRvcixcbiAgVmFsaWRhdGlvbk9wdGlvbnMsXG4gIFZhbGlkYXRpb25Bcmd1bWVudHMsXG4gIFZhbGlkYXRvckNvbnN0cmFpbnQsXG4gIFZhbGlkYXRvckNvbnN0cmFpbnRJbnRlcmZhY2UsXG59IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb3Vwb25MZXZlbCB9IGZyb20gJy4uLy4uLy4uL2NvdXBvbi9tb2RlbHMvY291cG9uLWxldmVsLmVudW0nO1xuaW1wb3J0IHsgVHlwZWdvb3NlLCBNb2RlbFR5cGUsIEluc3RhbmNlVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyB0aHJvd3MgfSBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbiwgSHR0cFN0YXR1cywgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgTW9kZWwgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvcHJvZHVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IENvdXBvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3Vwb24vY291cG9uLnNlcnZpY2UnO1xuXG5AVmFsaWRhdG9yQ29uc3RyYWludCh7IGFzeW5jOiB0cnVlIH0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hlY2tQcm9kdWN0UXVhbnRpdHkgaW1wbGVtZW50cyBWYWxpZGF0b3JDb25zdHJhaW50SW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnUHJvZHVjdFNlcnZpY2UnKSBwcml2YXRlIHJlYWRvbmx5IF9wcm9kdWN0U2VydmljZTogUHJvZHVjdFNlcnZpY2UsXG4gICkge1xuICAgIC8vIGNvbnNvbGUubG9nKF9jb3Vwb25TZXJ2aWNlKTtcbiAgICAvLyBjb25zb2xlLmxvZyhfcHJvZHVjdFNlcnZpY2UpO1xuICB9XG5cbiAgYXN5bmMgdmFsaWRhdGUodmFsdWU6IGFueSwgYXJnczogVmFsaWRhdGlvbkFyZ3VtZW50cykge1xuICAgIGNvbnNvbGUubG9nKCdWYWxpZGF0ZSBQcm9kdWN0IElkJyk7XG5cbiAgICBjb25zdCBbcmVsYXRlZFByb3BlcnR5TmFtZV0gPSBhcmdzLmNvbnN0cmFpbnRzO1xuICAgIGNvbnN0IGlkID0gKGFyZ3Mub2JqZWN0IGFzIGFueSlbcmVsYXRlZFByb3BlcnR5TmFtZV07XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHRoaXMuX3Byb2R1Y3RTZXJ2aWNlLmZpbmRCeUlkKGlkKTtcbiAgICAgIC8vIHByaW50cyB7IF9pZDogNTkyMThmNjg2NDA5ZDY3MGE5N2U1M2UwLCBuYW1lOiAnSm9obkRvZScsIF9fdjogMCB9XG4gICAgICByZXR1cm4gcHJvZHVjdC5xdWFudGl0eSA+PSB2YWx1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc0FwcGxpY2FibGUoXG4gIHByb3BlcnR5OiBzdHJpbmcsXG4gIHZhbGlkYXRpb25PcHRpb25zPzogVmFsaWRhdGlvbk9wdGlvbnMsXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdDogT2JqZWN0LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgIHJlZ2lzdGVyRGVjb3JhdG9yKHtcbiAgICAgIG5hbWU6ICdpc1F1YW50aXR5QXBwbGljYWJsZScsXG4gICAgICB0YXJnZXQ6IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgY29uc3RyYWludHM6IFtwcm9wZXJ0eV0sXG4gICAgICBvcHRpb25zOiB2YWxpZGF0aW9uT3B0aW9ucyxcbiAgICAgIHZhbGlkYXRvcjogQ2hlY2tQcm9kdWN0UXVhbnRpdHksXG4gICAgfSk7XG4gIH07XG59XG4iXX0=