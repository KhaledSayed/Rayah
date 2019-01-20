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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const category_exists_validator_1 = require("../../../shared/validators/category/category-exists.validator");
class ProductParamsPut {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Chipsey' }),
    class_validator_1.IsString(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], ProductParamsPut.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ProductParamsPut.prototype, "description", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '#F03CLAN' }),
    class_validator_1.IsDefined(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ProductParamsPut.prototype, "code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    class_validator_1.IsDefined(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], ProductParamsPut.prototype, "quantity", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 2499 }),
    class_validator_1.IsDefined(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], ProductParamsPut.prototype, "price", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ example: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Boolean)
], ProductParamsPut.prototype, "featured", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '5be2d3bb3f06152dc1804cdd' }),
    class_validator_1.IsDefined(),
    category_exists_validator_1.IsCategoryExists(),
    __metadata("design:type", String)
], ProductParamsPut.prototype, "category", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], ProductParamsPut.prototype, "brand", void 0);
exports.ProductParamsPut = ProductParamsPut;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXBhcmFtcy1wdXQubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvcHJvZHVjdC9tb2RlbHMvdmlldy1tb2RlbHMvcHJvZHVjdC1wYXJhbXMtcHV0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTZFO0FBRTdFLHFEQU95QjtBQUt6Qiw2R0FBaUc7QUFHakcsTUFBYSxnQkFBZ0I7Q0F1QzVCO0FBbkNDO0lBSEMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDeEMsMEJBQVEsRUFBRTtJQUNWLDJCQUFTLEVBQUU7OzhDQUNDO0FBSWI7SUFGQyxrQ0FBd0IsRUFBRTtJQUMxQiwwQkFBUSxFQUFFOztxREFDUztBQUtwQjtJQUhDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQ3pDLDJCQUFTLEVBQUU7SUFDWCwwQkFBUSxFQUFFOzs4Q0FDRTtBQU1iO0lBSkMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDbEMsMkJBQVMsRUFBRTtJQUNYLDBCQUFRLEVBQUU7SUFDViw0QkFBVSxFQUFFOztrREFDSTtBQU1qQjtJQUpDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ25DLDJCQUFTLEVBQUU7SUFDWCwwQkFBUSxFQUFFO0lBQ1YsNEJBQVUsRUFBRTs7K0NBQ0M7QUFJZDtJQUZDLGtDQUF3QixDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQzNDLDRCQUFVLEVBQUU7O2tEQUNLO0FBS2xCO0lBSEMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQztJQUN6RCwyQkFBUyxFQUFFO0lBQ1gsNENBQWdCLEVBQUU7O2tEQUNGO0FBSWpCO0lBRkMsMkJBQVMsRUFBRTtJQUNYLDJCQUFTLEVBQUU7OytDQUNFO0FBdENoQiw0Q0F1Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5LCBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi8uLi9jYXRlZ29yeS9tb2RlbHMvY2F0ZWdvcnkubW9kZWwnO1xuaW1wb3J0IHtcbiAgSXNTdHJpbmcsXG4gIElzRGVmaW5lZCxcbiAgSXNOdW1iZXIsXG4gIElzUG9zaXRpdmUsXG4gIElzT3B0aW9uYWwsXG4gIElzTW9uZ29JZCxcbn0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7XG4gIElzUHJvZHVjdFVuaXF1ZSxcbiAgaXNVbmlxdWVQcm9kdWN0Q29kZSxcbn0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvcHJvZHVjdC91bmlxdWUtY29kZSc7XG5pbXBvcnQgeyBJc0NhdGVnb3J5RXhpc3RzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3ZhbGlkYXRvcnMvY2F0ZWdvcnkvY2F0ZWdvcnktZXhpc3RzLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBCYXNlTW9kZWxWbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9iYXNlLm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIFByb2R1Y3RQYXJhbXNQdXQge1xuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6ICdDaGlwc2V5JyB9KVxuICBASXNTdHJpbmcoKVxuICBASXNEZWZpbmVkKClcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBASXNTdHJpbmcoKVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJyNGMDNDTEFOJyB9KVxuICBASXNEZWZpbmVkKClcbiAgQElzU3RyaW5nKClcbiAgY29kZTogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogMTAwIH0pXG4gIEBJc0RlZmluZWQoKVxuICBASXNOdW1iZXIoKVxuICBASXNQb3NpdGl2ZSgpXG4gIHF1YW50aXR5OiBudW1iZXI7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAyNDk5IH0pXG4gIEBJc0RlZmluZWQoKVxuICBASXNOdW1iZXIoKVxuICBASXNQb3NpdGl2ZSgpXG4gIHByaWNlOiBudW1iZXI7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCh7IGV4YW1wbGU6IHRydWUgfSlcbiAgQElzT3B0aW9uYWwoKVxuICBmZWF0dXJlZDogYm9vbGVhbjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6ICc1YmUyZDNiYjNmMDYxNTJkYzE4MDRjZGQnIH0pXG4gIEBJc0RlZmluZWQoKVxuICBASXNDYXRlZ29yeUV4aXN0cygpXG4gIGNhdGVnb3J5OiBzdHJpbmc7XG5cbiAgQElzRGVmaW5lZCgpXG4gIEBJc01vbmdvSWQoKVxuICBicmFuZDogc3RyaW5nO1xufVxuIl19