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
const valid_product_validator_1 = require("../../../shared/validators/product/valid-product.validator");
const base_model_1 = require("../../../shared/base.model");
const order_level_enum_1 = require("../order-level.enum");
class OrderedProduct {
}
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsMongoId(),
    valid_product_validator_1.IsProductValid({ message: 'Product is Invalid' }),
    __metadata("design:type", String)
], OrderedProduct.prototype, "id", void 0);
__decorate([
    class_validator_1.IsDefined(),
    class_validator_1.IsPositive(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], OrderedProduct.prototype, "quantity", void 0);
class OrderPutParams extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsDefined(),
    class_validator_1.IsArray(),
    class_validator_1.ArrayMinSize(1, { message: 'Basket is empty' }),
    __metadata("design:type", Array)
], OrderPutParams.prototype, "basket", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], OrderPutParams.prototype, "address", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderPutParams.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], OrderPutParams.prototype, "note", void 0);
exports.OrderPutParams = OrderPutParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItcHV0LXBhcmFtcy5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItcHV0LXBhcmFtcy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZDQUE2RTtBQUc3RSxxREFTeUI7QUFHekIsd0dBQTRGO0FBSTVGLDJEQUF5RDtBQUN6RCwwREFBaUQ7QUFFakQsTUFBTSxjQUFjO0NBVW5CO0FBTkM7SUFIQywyQkFBUyxFQUFFO0lBQ1gsMkJBQVMsRUFBRTtJQUNYLHdDQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzs7MENBQ3ZDO0FBS1g7SUFIQywyQkFBUyxFQUFFO0lBQ1gsNEJBQVUsRUFBRTtJQUNaLDBCQUFRLEVBQUU7O2dEQUNNO0FBR25CLE1BQWEsY0FBZSxTQUFRLHdCQUFXO0NBZ0I5QztBQVhDO0lBSkMsMEJBQWdCLEVBQUU7SUFDbEIsMkJBQVMsRUFBRTtJQUNYLHlCQUFPLEVBQUU7SUFDVCw4QkFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxDQUFDOzs4Q0FDdkI7QUFJekI7SUFGQywwQkFBZ0IsRUFBRTtJQUNsQiwyQkFBUyxFQUFFOzsrQ0FDSTtBQUdoQjtJQURDLDBCQUFnQixFQUFFOzs4Q0FDQTtBQUduQjtJQURDLGtDQUF3QixFQUFFOzs0Q0FDZDtBQWZmLHdDQWdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHksIEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9tb2RlbHMvcHJvZHVjdC5tb2RlbCc7XG5pbXBvcnQgeyBDb3Vwb24gfSBmcm9tICcuLi8uLi8uLi9jb3Vwb24vbW9kZWxzL2NvdXBvbi5tb2RlbCc7XG5pbXBvcnQge1xuICBJc0RlZmluZWQsXG4gIElzUG9zaXRpdmUsXG4gIElzTnVtYmVyLFxuICBJc0FycmF5LFxuICBJc01vbmdvSWQsXG4gIE1pbkxlbmd0aCxcbiAgQXJyYXlNaW5TaXplLFxuICBJc09wdGlvbmFsLFxufSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICd0eXBlZ29vc2UvbGliL3V0aWxzJztcbmltcG9ydCB7IElzT3JkZXJWYWxpZCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC92YWxpZGF0b3JzL29yZGVycy92YWxpZC1vcmRlci52YWxpZGF0b3InO1xuaW1wb3J0IHsgSXNQcm9kdWN0VmFsaWQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdmFsaWRhdG9ycy9wcm9kdWN0L3ZhbGlkLXByb2R1Y3QudmFsaWRhdG9yJztcbmltcG9ydCB7IElzQXBwbGljYWJsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC92YWxpZGF0b3JzL3Byb2R1Y3QvaXMtYXBwbGljYWJsZS52YWxpZGF0b3InO1xuaW1wb3J0IHsgSXNDb3Vwb25WYWxpZCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC92YWxpZGF0b3JzL29yZGVycy92YWxpZC1jb3Vwb24udmFsaWRhdG9yJztcbmltcG9ydCB7IGlzTnVsbE9yVW5kZWZpbmVkIH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBCYXNlTW9kZWxWbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9iYXNlLm1vZGVsJztcbmltcG9ydCB7IE9yZGVyTGV2ZWwgfSBmcm9tICcuLi9vcmRlci1sZXZlbC5lbnVtJztcblxuY2xhc3MgT3JkZXJlZFByb2R1Y3Qge1xuICBASXNEZWZpbmVkKClcbiAgQElzTW9uZ29JZCgpXG4gIEBJc1Byb2R1Y3RWYWxpZCh7IG1lc3NhZ2U6ICdQcm9kdWN0IGlzIEludmFsaWQnIH0pXG4gIGlkOiBzdHJpbmc7XG5cbiAgQElzRGVmaW5lZCgpXG4gIEBJc1Bvc2l0aXZlKClcbiAgQElzTnVtYmVyKClcbiAgcXVhbnRpdHk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIE9yZGVyUHV0UGFyYW1zIGV4dGVuZHMgQmFzZU1vZGVsVm0ge1xuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIEBJc0RlZmluZWQoKVxuICBASXNBcnJheSgpXG4gIEBBcnJheU1pblNpemUoMSwgeyBtZXNzYWdlOiAnQmFza2V0IGlzIGVtcHR5JyB9KVxuICBiYXNrZXQ6IE9yZGVyZWRQcm9kdWN0W107XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBASXNEZWZpbmVkKClcbiAgYWRkcmVzczogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgc3RhdHVzOiBPcmRlckxldmVsO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBub3RlOiBzdHJpbmc7XG59XG4iXX0=