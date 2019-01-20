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
const base_model_1 = require("../../../shared/base.model");
class BrandParam extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty({ example: 'Juhayna', type: String, in: 'FormData' }),
    __metadata("design:type", String)
], BrandParam.prototype, "name", void 0);
exports.BrandParam = BrandParam;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9icmFuZC9tb2RlbHMvdmlldy1tb2RlbHMvYnJhbmQtcGFyYW0ubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvYnJhbmQvbW9kZWxzL3ZpZXctbW9kZWxzL2JyYW5kLXBhcmFtLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW1EO0FBQ25ELDJEQUF5RDtBQUV6RCxNQUFhLFVBQVcsU0FBUSx3QkFBVztDQUsxQztBQUhDO0lBREMsMEJBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDOzt3Q0FDMUQ7QUFGZixnQ0FLQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgQmFzZU1vZGVsVm0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvYmFzZS5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBCcmFuZFBhcmFtIGV4dGVuZHMgQmFzZU1vZGVsVm0ge1xuICBAQXBpTW9kZWxQcm9wZXJ0eSh7IGV4YW1wbGU6ICdKdWhheW5hJywgdHlwZTogU3RyaW5nLCBpbjogJ0Zvcm1EYXRhJyB9KVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgbG9nbzogc3RyaW5nO1xufVxuIl19