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
const base_model_1 = require("../../../shared/base.model");
const swagger_1 = require("@nestjs/swagger");
class ProductVm extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Chipsey' }),
    __metadata("design:type", String)
], ProductVm.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: '#F03CLAN' }),
    __metadata("design:type", String)
], ProductVm.prototype, "code", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 100 }),
    __metadata("design:type", Number)
], ProductVm.prototype, "quantity", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: 2499 }),
    __metadata("design:type", Number)
], ProductVm.prototype, "price", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: true }),
    __metadata("design:type", Boolean)
], ProductVm.prototype, "featured", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ProductVm.prototype, "thumbnail", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], ProductVm.prototype, "gallery", void 0);
exports.ProductVm = ProductVm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXZtLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3Byb2R1Y3QvbW9kZWxzL3ZpZXctbW9kZWxzL3Byb2R1Y3Qtdm0ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyREFBeUQ7QUFDekQsNkNBQTZFO0FBRzdFLE1BQWEsU0FBVSxTQUFRLHdCQUFXO0NBcUJ6QztBQW5CQztJQURDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzt1Q0FDNUI7QUFHYjtJQURDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDOzt1Q0FDN0I7QUFHYjtJQURDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDOzsyQ0FDbEI7QUFHakI7SUFEQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7d0NBQ3RCO0FBR2Q7SUFEQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7MkNBQ2xCO0FBR2xCO0lBREMsMEJBQWdCLEVBQUU7OzRDQUNEO0FBR2xCO0lBREMsMEJBQWdCLEVBQUU7OzBDQUNEO0FBcEJwQiw4QkFxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWxWbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9iYXNlLm1vZGVsJztcbmltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCwgQXBpTW9kZWxQcm9wZXJ0eSB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBFbnVtVG9BcnJheSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvZW51bS10by1hcnJheSc7XG5cbmV4cG9ydCBjbGFzcyBQcm9kdWN0Vm0gZXh0ZW5kcyBCYXNlTW9kZWxWbSB7XG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogJ0NoaXBzZXknIH0pXG4gIG5hbWU6IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6ICcjRjAzQ0xBTicgfSlcbiAgY29kZTogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KHsgZXhhbXBsZTogMTAwIH0pXG4gIHF1YW50aXR5OiBudW1iZXI7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiAyNDk5IH0pXG4gIHByaWNlOiBudW1iZXI7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiB0cnVlIH0pXG4gIGZlYXR1cmVkOiBib29sZWFuO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgdGh1bWJuYWlsOiBzdHJpbmc7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBnYWxsZXJ5OiBzdHJpbmdbXTtcbn1cbiJdfQ==