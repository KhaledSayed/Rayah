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
class ReviewVm extends base_model_1.BaseModelVm {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], ReviewVm.prototype, "reviewer", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], ReviewVm.prototype, "product", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], ReviewVm.prototype, "stars", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], ReviewVm.prototype, "description", void 0);
exports.ReviewVm = ReviewVm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvbW9kZWxzL3ZpZXctbW9kZWxzL3Jldmlldy12bS5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvbW9kZWxzL3ZpZXctbW9kZWxzL3Jldmlldy12bS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDJEQUF5RDtBQUN6RCw2Q0FBNkU7QUFLN0UsTUFBYSxRQUFTLFNBQVEsd0JBQVc7Q0FZeEM7QUFWQztJQURDLDBCQUFnQixFQUFFOzswQ0FDTztBQUcxQjtJQURDLDBCQUFnQixFQUFFOzt5Q0FDSDtBQUdoQjtJQURDLDBCQUFnQixFQUFFOzt1Q0FDTDtBQUdkO0lBREMsa0NBQXdCLEVBQUU7OzZDQUNQO0FBWHRCLDRCQVlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsVm0gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5LCBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uLy4uL3VzZXIvbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvbW9kZWxzL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgVXNlclZNIH0gZnJvbSAndXNlci9tb2RlbHMvdmlldy1tb2RlbHMvdXNlci12bS5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBSZXZpZXdWbSBleHRlbmRzIEJhc2VNb2RlbFZtIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICByZXZpZXdlcjogUGFydGlhbDxVc2VyVk0+O1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgcHJvZHVjdDogc3RyaW5nO1xuXG4gIEBBcGlNb2RlbFByb3BlcnR5KClcbiAgc3RhcnM6IG51bWJlcjtcblxuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKClcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cbiJdfQ==