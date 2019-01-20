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
const typegoose_1 = require("typegoose");
const base_model_1 = require("./base.model");
let BaseItemModel = class BaseItemModel extends base_model_1.BaseModel {
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], BaseItemModel.prototype, "metaTitle", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], BaseItemModel.prototype, "metaDescription", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], BaseItemModel.prototype, "metaKeywords", void 0);
BaseItemModel = __decorate([
    typegoose_1.pre('findOneAndUpdate', function (next) {
        this._update.updatedAt = new Date(Date.now());
        next();
    })
], BaseItemModel);
exports.BaseItemModel = BaseItemModel;
exports.schemaOptions = {
    toJSON: {
        virtuals: true,
        getters: true,
    },
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvYmFzZS1pdGVtLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC9iYXNlLWl0ZW0ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSx5Q0FBaUQ7QUFDakQsNkNBQXlDO0FBTXpDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWlCLFNBQVEsc0JBQVk7Q0FRakQsQ0FBQTtBQU5DO0lBREMsZ0JBQUksRUFBRTs7Z0RBQ1k7QUFFbkI7SUFEQyxnQkFBSSxFQUFFOztzREFDa0I7QUFHekI7SUFEQyxnQkFBSSxFQUFFOzttREFDZTtBQVBYLGFBQWE7SUFKekIsZUFBRyxDQUFJLGtCQUFrQixFQUFFLFVBQVMsSUFBSTtRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQztHQUNXLGFBQWEsQ0FRekI7QUFSWSxzQ0FBYTtBQVViLFFBQUEsYUFBYSxHQUFrQjtJQUMxQyxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZW1hT3B0aW9ucyB9IGZyb20gJ21vbmdvb3NlJztcbmltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHlPcHRpb25hbCwgQXBpTW9kZWxQcm9wZXJ0eSB9IGZyb20gJ0BuZXN0anMvc3dhZ2dlcic7XG5pbXBvcnQgeyBUeXBlZ29vc2UsIHByb3AsIHByZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyBCYXNlTW9kZWwgfSBmcm9tICcuL2Jhc2UubW9kZWwnO1xuXG5AcHJlPFQ+KCdmaW5kT25lQW5kVXBkYXRlJywgZnVuY3Rpb24obmV4dCkge1xuICB0aGlzLl91cGRhdGUudXBkYXRlZEF0ID0gbmV3IERhdGUoRGF0ZS5ub3coKSk7XG4gIG5leHQoKTtcbn0pXG5leHBvcnQgY2xhc3MgQmFzZUl0ZW1Nb2RlbDxUPiBleHRlbmRzIEJhc2VNb2RlbDxUPiB7XG4gIEBwcm9wKClcbiAgbWV0YVRpdGxlPzogc3RyaW5nO1xuICBAcHJvcCgpXG4gIG1ldGFEZXNjcmlwdGlvbj86IHN0cmluZztcblxuICBAcHJvcCgpXG4gIG1ldGFLZXl3b3Jkcz86IHN0cmluZztcbn1cblxuZXhwb3J0IGNvbnN0IHNjaGVtYU9wdGlvbnM6IFNjaGVtYU9wdGlvbnMgPSB7XG4gIHRvSlNPTjoge1xuICAgIHZpcnR1YWxzOiB0cnVlLFxuICAgIGdldHRlcnM6IHRydWUsXG4gIH0sXG59O1xuIl19