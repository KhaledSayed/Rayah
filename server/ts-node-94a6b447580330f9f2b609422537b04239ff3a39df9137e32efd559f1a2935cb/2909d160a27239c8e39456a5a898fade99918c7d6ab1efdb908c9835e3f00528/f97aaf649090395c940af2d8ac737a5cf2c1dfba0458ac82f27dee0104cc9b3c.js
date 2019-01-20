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
class ReviewParam {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ReviewParam.prototype, "stars", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], ReviewParam.prototype, "description", void 0);
exports.ReviewParam = ReviewParam;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvbW9kZWxzL3ZpZXctbW9kZWxzL3Jldmlldy1wYXJhbS5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvbW9kZWxzL3ZpZXctbW9kZWxzL3Jldmlldy1wYXJhbS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZDQUE2RTtBQUc3RSxNQUFhLFdBQVc7Q0FNdkI7QUFKQztJQURDLDBCQUFnQixFQUFFOzswQ0FDTDtBQUdkO0lBREMsa0NBQXdCLEVBQUU7O2dEQUNOO0FBTHZCLGtDQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBpTW9kZWxQcm9wZXJ0eSwgQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsIH0gZnJvbSAnQG5lc3Rqcy9zd2FnZ2VyJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuLi8uLi8uLi9wcm9kdWN0L21vZGVscy9wcm9kdWN0Lm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIFJldmlld1BhcmFtIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBzdGFyczogbnVtYmVyO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbn1cbiJdfQ==