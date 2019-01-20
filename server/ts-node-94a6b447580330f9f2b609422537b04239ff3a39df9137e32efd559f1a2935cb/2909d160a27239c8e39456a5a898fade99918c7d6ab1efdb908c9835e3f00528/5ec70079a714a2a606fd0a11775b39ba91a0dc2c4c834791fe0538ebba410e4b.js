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
const order_level_enum_1 = require("../order-level.enum");
const bson_1 = require("bson");
class OrderVm extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", bson_1.ObjectId)
], OrderVm.prototype, "user", void 0);
__decorate([
    swagger_1.ApiModelProperty({ example: order_level_enum_1.OrderLevel.New
    }),
    __metadata("design:type", String)
], OrderVm.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], OrderVm.prototype, "basket", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", bson_1.ObjectId)
], OrderVm.prototype, "coupon", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], OrderVm.prototype, "address", void 0);
exports.OrderVm = OrderVm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9vcmRlci9tb2RlbHMvdmlldy1tb2RlbHMvb3JkZXItdm0ubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvb3JkZXIvbW9kZWxzL3ZpZXctbW9kZWxzL29yZGVyLXZtLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXlEO0FBRXpELDZDQUFtRDtBQUNuRCwwREFBaUQ7QUFHakQsK0JBQWdDO0FBVWhDLE1BQWEsT0FBUSxTQUFRLHdCQUFXO0NBZ0J2QztBQWRDO0lBREMsMEJBQWdCLEVBQUU7OEJBQ2IsZUFBUTtxQ0FBQztBQUlmO0lBRkMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsNkJBQVUsQ0FBQyxHQUFHO0tBQzFDLENBQUM7O3VDQUNpQjtBQUduQjtJQURDLDBCQUFnQixFQUFFOzt1Q0FDUDtBQUdaO0lBREMsMEJBQWdCLEVBQUU7OEJBQ1gsZUFBUTt1Q0FBQztBQUdqQjtJQURDLDBCQUFnQixFQUFFOzt3Q0FDSDtBQWZsQiwwQkFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWxWbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi8uLi91c2VyL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgT3JkZXJMZXZlbCB9IGZyb20gJy4uL29yZGVyLWxldmVsLmVudW0nO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvbW9kZWxzL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgQ291cG9uIH0gZnJvbSAnLi4vLi4vLi4vY291cG9uL21vZGVscy9jb3Vwb24ubW9kZWwnO1xuaW1wb3J0IHsgT2JqZWN0SWQgfSBmcm9tICdic29uJztcbmltcG9ydCB7IFByb2R1Y3RWbSB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvbW9kZWxzL3ZpZXctbW9kZWxzL3Byb2R1Y3Qtdm0ubW9kZWwnO1xuXG4vLyBjbGFzcyBQcm9kdWN0SXRlbSB7XG4vLyAgIHByb2R1Y3Q6IFByb2R1Y3RWbTtcbi8vICAgcXVhbnRpdHk6IG51bWJlcjtcbi8vICAgcHJpY2U6IG51bWJlcjtcbi8vICAgdG90YWxJdGVtUHJpY2U6IG51bWJlcjtcbi8vIH1cblxuZXhwb3J0IGNsYXNzIE9yZGVyVm0gZXh0ZW5kcyBCYXNlTW9kZWxWbSB7XG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgdXNlcjogT2JqZWN0SWQ7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiBPcmRlckxldmVsLk5ld1xuICB9KVxuICBzdGF0dXM6IE9yZGVyTGV2ZWw7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBiYXNrZXQ6IGFueTtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIGNvdXBvbjogT2JqZWN0SWQ7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBhZGRyZXNzOiBzdHJpbmc7XG59XG4iXX0=