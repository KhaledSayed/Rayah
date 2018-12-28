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
class ApiException {
}
__decorate([
    swagger_1.ApiModelPropertyOptional({ example: 401 }),
    __metadata("design:type", Number)
], ApiException.prototype, "statusCode", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({
        example: "You don't have permission to access this resource",
    }),
    __metadata("design:type", String)
], ApiException.prototype, "message", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], ApiException.prototype, "status", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ example: 'Error' }),
    __metadata("design:type", String)
], ApiException.prototype, "error", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ example: null }),
    __metadata("design:type", Object)
], ApiException.prototype, "errors", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ example: '2018-10-31T13:13:22.802Z' }),
    __metadata("design:type", String)
], ApiException.prototype, "timestamp", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ example: '/api/brand' }),
    __metadata("design:type", String)
], ApiException.prototype, "path", void 0);
exports.ApiException = ApiException;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvYXBpLWV4Y2VwdGlvbi5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvYXBpLWV4Y2VwdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZDQUEyRDtBQUUzRCxNQUFhLFlBQVk7Q0FxQnhCO0FBbkJDO0lBREMsa0NBQXdCLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7O2dEQUN2QjtBQUlwQjtJQUhDLGtDQUF3QixDQUFDO1FBQ3hCLE9BQU8sRUFBRSxtREFBbUQ7S0FDN0QsQ0FBQzs7NkNBQ2U7QUFFakI7SUFEQyxrQ0FBd0IsRUFBRTs7NENBQ1g7QUFHaEI7SUFEQyxrQ0FBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7MkNBQ2hDO0FBR2Y7SUFEQyxrQ0FBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQy9CO0FBR2I7SUFEQyxrQ0FBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxDQUFDOzsrQ0FDL0M7QUFHbkI7SUFEQyxrQ0FBd0IsQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQzs7MENBQ3RDO0FBcEJoQixvQ0FxQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuXG5leHBvcnQgY2xhc3MgQXBpRXhjZXB0aW9uIHtcbiAgQEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCh7IGV4YW1wbGU6IDQwMSB9KVxuICBzdGF0dXNDb2RlPzogbnVtYmVyO1xuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKHtcbiAgICBleGFtcGxlOiBcIllvdSBkb24ndCBoYXZlIHBlcm1pc3Npb24gdG8gYWNjZXNzIHRoaXMgcmVzb3VyY2VcIixcbiAgfSlcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgQEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCgpXG4gIHN0YXR1cz86IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKHsgZXhhbXBsZTogJ0Vycm9yJyB9KVxuICBlcnJvcj86IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKHsgZXhhbXBsZTogbnVsbCB9KVxuICBlcnJvcnM/OiBhbnk7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCh7IGV4YW1wbGU6ICcyMDE4LTEwLTMxVDEzOjEzOjIyLjgwMlonIH0pXG4gIHRpbWVzdGFtcD86IHN0cmluZztcblxuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKHsgZXhhbXBsZTogJy9hcGkvYnJhbmQnIH0pXG4gIHBhdGg/OiBzdHJpbmc7XG59XG4iXX0=