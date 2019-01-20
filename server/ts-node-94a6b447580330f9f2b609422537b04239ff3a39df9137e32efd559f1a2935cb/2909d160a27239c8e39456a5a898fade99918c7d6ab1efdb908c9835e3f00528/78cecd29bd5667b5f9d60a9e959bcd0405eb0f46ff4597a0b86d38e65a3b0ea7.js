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
const slider_level_enum_1 = require("../../../slider/models/slider-level.enum");
const category_service_1 = require("../../../category/category.service");
let CheckItemValidity = class CheckItemValidity {
    constructor(_productService, _categoryService) {
        this._productService = _productService;
        this._categoryService = _categoryService;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Validate Slider Item');
            const [relatedPropertyName] = args.constraints;
            const sliderLevel = args.object[relatedPropertyName];
            let item = null;
            if (slider_level_enum_1.SliderLevel.Category === sliderLevel) {
                item = yield this._categoryService.findById(value);
            }
            else {
                item = yield this._productService.findById(value);
            }
            return item;
        });
    }
};
CheckItemValidity = __decorate([
    class_validator_1.ValidatorConstraint({ async: true }),
    common_1.Injectable(),
    __param(0, common_1.Inject('ProductService')),
    __param(1, common_1.Inject('CategoryService')),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        category_service_1.CategoryService])
], CheckItemValidity);
exports.CheckItemValidity = CheckItemValidity;
function isItem(property, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isItem',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: CheckItemValidity,
        });
    };
}
exports.isItem = isItem;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9zbGlkZXIvaXMtaXRlbS52YWxpZGF0b3IudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvc2hhcmVkL3ZhbGlkYXRvcnMvc2xpZGVyL2lzLWl0ZW0udmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFNeUI7QUFJekIsMkNBQStFO0FBRS9FLHNFQUFrRTtBQUVsRSxnRkFBdUU7QUFFdkUseUVBQXFFO0FBSXJFLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBQzVCLFlBQzZDLGVBQStCLEVBRXpELGdCQUFpQztRQUZQLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUV6RCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO0lBQ2pELENBQUM7SUFFRSxRQUFRLENBQUMsS0FBVSxFQUFFLElBQXlCOztZQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFcEMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMvQyxNQUFNLFdBQVcsR0FBaUIsSUFBSSxDQUFDLE1BQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRTNFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLCtCQUFXLENBQUMsUUFBUSxLQUFLLFdBQVcsRUFBRTtnQkFFeEMsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwRDtpQkFBTTtnQkFFTCxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuRDtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0YsQ0FBQTtBQXhCWSxpQkFBaUI7SUFGN0IscUNBQW1CLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDcEMsbUJBQVUsRUFBRTtJQUdSLFdBQUEsZUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDeEIsV0FBQSxlQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtxQ0FEa0MsZ0NBQWM7UUFFdkMsa0NBQWU7R0FKekMsaUJBQWlCLENBd0I3QjtBQXhCWSw4Q0FBaUI7QUEwQjlCLFNBQWdCLE1BQU0sQ0FDcEIsUUFBZ0IsRUFDaEIsaUJBQXFDO0lBRXJDLE9BQU8sVUFBUyxNQUFjLEVBQUUsWUFBb0I7UUFDbEQsbUNBQWlCLENBQUM7WUFDaEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDMUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsU0FBUyxFQUFFLGlCQUFpQjtTQUM3QixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBZEQsd0JBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICByZWdpc3RlckRlY29yYXRvcixcbiAgVmFsaWRhdGlvbk9wdGlvbnMsXG4gIFZhbGlkYXRpb25Bcmd1bWVudHMsXG4gIFZhbGlkYXRvckNvbnN0cmFpbnQsXG4gIFZhbGlkYXRvckNvbnN0cmFpbnRJbnRlcmZhY2UsXG59IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb3Vwb25MZXZlbCB9IGZyb20gJy4vLi4vLi4vLi4vY291cG9uL21vZGVscy9jb3Vwb24tbGV2ZWwuZW51bSc7XG5pbXBvcnQgeyBUeXBlZ29vc2UsIE1vZGVsVHlwZSwgSW5zdGFuY2VUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IHRocm93cyB9IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uLCBIdHRwU3RhdHVzLCBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IFByb2R1Y3RTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9wcm9kdWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ291cG9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvdXBvbi9jb3Vwb24uc2VydmljZSc7XG5pbXBvcnQgeyBTbGlkZXJMZXZlbCB9IGZyb20gJy4uLy4uLy4uL3NsaWRlci9tb2RlbHMvc2xpZGVyLWxldmVsLmVudW0nO1xuaW1wb3J0IHsgU2xpZGVyIH0gZnJvbSAnLi4vLi4vLi4vc2xpZGVyL21vZGVscy9zbGlkZXIubW9kZWwnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY2F0ZWdvcnkvY2F0ZWdvcnkuc2VydmljZSc7XG5cbkBWYWxpZGF0b3JDb25zdHJhaW50KHsgYXN5bmM6IHRydWUgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDaGVja0l0ZW1WYWxpZGl0eSBpbXBsZW1lbnRzIFZhbGlkYXRvckNvbnN0cmFpbnRJbnRlcmZhY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdQcm9kdWN0U2VydmljZScpIHByaXZhdGUgcmVhZG9ubHkgX3Byb2R1Y3RTZXJ2aWNlOiBQcm9kdWN0U2VydmljZSxcbiAgICBASW5qZWN0KCdDYXRlZ29yeVNlcnZpY2UnKVxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2NhdGVnb3J5U2VydmljZTogQ2F0ZWdvcnlTZXJ2aWNlLFxuICApIHt9XG5cbiAgYXN5bmMgdmFsaWRhdGUodmFsdWU6IGFueSwgYXJnczogVmFsaWRhdGlvbkFyZ3VtZW50cykge1xuICAgIGNvbnNvbGUubG9nKCdWYWxpZGF0ZSBTbGlkZXIgSXRlbScpO1xuXG4gICAgY29uc3QgW3JlbGF0ZWRQcm9wZXJ0eU5hbWVdID0gYXJncy5jb25zdHJhaW50cztcbiAgICBjb25zdCBzbGlkZXJMZXZlbDogU2xpZGVyTGV2ZWwgPSAoYXJncy5vYmplY3QgYXMgYW55KVtyZWxhdGVkUHJvcGVydHlOYW1lXTtcblxuICAgIGxldCBpdGVtID0gbnVsbDtcbiAgICBpZiAoU2xpZGVyTGV2ZWwuQ2F0ZWdvcnkgPT09IHNsaWRlckxldmVsKSB7XG4gICAgICAvL2NhdGVnb3J5XG4gICAgICBpdGVtID0gYXdhaXQgdGhpcy5fY2F0ZWdvcnlTZXJ2aWNlLmZpbmRCeUlkKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9wcm9kdWN0XG4gICAgICBpdGVtID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZmluZEJ5SWQodmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0l0ZW0oXG4gIHByb3BlcnR5OiBzdHJpbmcsXG4gIHZhbGlkYXRpb25PcHRpb25zPzogVmFsaWRhdGlvbk9wdGlvbnMsXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdDogT2JqZWN0LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgIHJlZ2lzdGVyRGVjb3JhdG9yKHtcbiAgICAgIG5hbWU6ICdpc0l0ZW0nLFxuICAgICAgdGFyZ2V0OiBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICBwcm9wZXJ0eU5hbWU6IHByb3BlcnR5TmFtZSxcbiAgICAgIGNvbnN0cmFpbnRzOiBbcHJvcGVydHldLFxuICAgICAgb3B0aW9uczogdmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICB2YWxpZGF0b3I6IENoZWNrSXRlbVZhbGlkaXR5LFxuICAgIH0pO1xuICB9O1xufVxuIl19