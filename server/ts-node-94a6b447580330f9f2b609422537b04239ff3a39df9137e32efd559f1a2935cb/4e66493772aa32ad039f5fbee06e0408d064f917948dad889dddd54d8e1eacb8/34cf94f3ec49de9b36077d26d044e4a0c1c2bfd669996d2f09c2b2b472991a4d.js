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
const typegoose_1 = require("typegoose");
let BaseModel = class BaseModel extends typegoose_1.Typegoose {
};
__decorate([
    typegoose_1.prop({ default: Date.now() }),
    __metadata("design:type", Date)
], BaseModel.prototype, "createdAt", void 0);
__decorate([
    typegoose_1.prop({ default: Date.now() }),
    __metadata("design:type", Date)
], BaseModel.prototype, "updatedAt", void 0);
BaseModel = __decorate([
    typegoose_1.pre('findOneAndUpdate', function (next) {
        this._update.updatedAt = new Date(Date.now());
        next();
    })
], BaseModel);
exports.BaseModel = BaseModel;
class BaseModelVm {
}
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], BaseModelVm.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], BaseModelVm.prototype, "updatedAt", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], BaseModelVm.prototype, "id", void 0);
exports.BaseModelVm = BaseModelVm;
exports.schemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    },
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvYmFzZS5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvYmFzZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZDQUE2RTtBQUM3RSx5Q0FBaUQ7QUFNakQsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBYSxTQUFRLHFCQUFTO0NBTTFDLENBQUE7QUFKQztJQURDLGdCQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7OEJBQ2xCLElBQUk7NENBQUM7QUFFakI7SUFEQyxnQkFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDOzhCQUNsQixJQUFJOzRDQUFDO0FBSk4sU0FBUztJQUpyQixlQUFHLENBQUksa0JBQWtCLEVBQUUsVUFBUyxJQUFJO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDO0dBQ1csU0FBUyxDQU1yQjtBQU5ZLDhCQUFTO0FBUXRCLE1BQWEsV0FBVztDQU92QjtBQUxDO0lBREMsa0NBQXdCLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQzs4QkFDcEQsSUFBSTs4Q0FBQztBQUVqQjtJQURDLGtDQUF3QixDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUM7OEJBQ3BELElBQUk7OENBQUM7QUFFakI7SUFEQyxrQ0FBd0IsRUFBRTs7dUNBQ2hCO0FBTmIsa0NBT0M7QUFFWSxRQUFBLGFBQWEsR0FBa0I7SUFDMUMsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsSUFBSTtLQUNkO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjaGVtYU9wdGlvbnMgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwsIEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgVHlwZWdvb3NlLCBwcm9wLCBwcmUgfSBmcm9tICd0eXBlZ29vc2UnO1xuXG5AcHJlPFQ+KCdmaW5kT25lQW5kVXBkYXRlJywgZnVuY3Rpb24obmV4dCkge1xuICB0aGlzLl91cGRhdGUudXBkYXRlZEF0ID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XG4gIG5leHQoKTtcbn0pXG5leHBvcnQgY2xhc3MgQmFzZU1vZGVsPFQ+IGV4dGVuZHMgVHlwZWdvb3NlIHtcbiAgQHByb3AoeyBkZWZhdWx0OiBEYXRlLm5vdygpIH0pXG4gIGNyZWF0ZWRBdD86IERhdGU7XG4gIEBwcm9wKHsgZGVmYXVsdDogRGF0ZS5ub3coKSB9KVxuICB1cGRhdGVkQXQ/OiBEYXRlO1xuICBpZD86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VNb2RlbFZtIHtcbiAgQEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCh7IHR5cGU6IFN0cmluZywgZm9ybWF0OiAnZGF0ZS10aW1lJyB9KVxuICBjcmVhdGVkQXQ/OiBEYXRlO1xuICBAQXBpTW9kZWxQcm9wZXJ0eU9wdGlvbmFsKHsgdHlwZTogU3RyaW5nLCBmb3JtYXQ6ICdkYXRlLXRpbWUnIH0pXG4gIHVwZGF0ZWRBdD86IERhdGU7XG4gIEBBcGlNb2RlbFByb3BlcnR5T3B0aW9uYWwoKVxuICBpZDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3Qgc2NoZW1hT3B0aW9uczogU2NoZW1hT3B0aW9ucyA9IHtcbiAgdG9KU09OOiB7XG4gICAgdmlydHVhbHM6IHRydWUsXG4gICAgZ2V0dGVyczogdHJ1ZSxcbiAgfSxcbn07XG4iXX0=