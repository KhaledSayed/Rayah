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
const slider_level_enum_1 = require("../slider-level.enum");
class SliderVm extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty({ example: slider_level_enum_1.SliderLevel.Category }),
    __metadata("design:type", String)
], SliderVm.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SliderVm.prototype, "item", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], SliderVm.prototype, "banner", void 0);
exports.SliderVm = SliderVm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvbW9kZWxzL3ZpZXctbW9kZWxzL3NsaWRlci12bS5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvbW9kZWxzL3ZpZXctbW9kZWxzL3NsaWRlci12bS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJEQUF5RDtBQUN6RCw2Q0FBbUQ7QUFHbkQsNERBQW1EO0FBR25ELE1BQWEsUUFBUyxTQUFRLHdCQUFXO0NBU3hDO0FBUEM7SUFEQywwQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSwrQkFBVyxDQUFDLFFBQVEsRUFBRSxDQUFDOztzQ0FDbEM7QUFHbEI7SUFEQywwQkFBZ0IsRUFBRTs7c0NBQ047QUFHYjtJQURDLDBCQUFnQixFQUFFOzt3Q0FDSjtBQVJqQiw0QkFTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbFZtIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgQXBpTW9kZWxQcm9wZXJ0eSB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJy4uLy4uLy4uL2NhdGVnb3J5L21vZGVscy9jYXRlZ29yeS5tb2RlbCc7XG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9tb2RlbHMvcHJvZHVjdC5tb2RlbCc7XG5pbXBvcnQgeyBTbGlkZXJMZXZlbCB9IGZyb20gJy4uL3NsaWRlci1sZXZlbC5lbnVtJztcbmltcG9ydCB7IElzTW9uZ29JZCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5cbmV4cG9ydCBjbGFzcyBTbGlkZXJWbSBleHRlbmRzIEJhc2VNb2RlbFZtIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiBTbGlkZXJMZXZlbC5DYXRlZ29yeSB9KVxuICB0eXBlOiBTbGlkZXJMZXZlbDtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIGl0ZW06IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eSgpXG4gIGJhbm5lcjogc3RyaW5nO1xufVxuIl19