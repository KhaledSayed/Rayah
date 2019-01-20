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
const base_model_1 = require("../../shared/base.model");
const typegoose_1 = require("typegoose");
const base_item_model_1 = require("../../shared/base-item.model");
class Category extends base_item_model_1.BaseItemModel {
    static get model() {
        return new Category().getModelForClass(Category, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ required: false, default: null }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "thumbnail", void 0);
__decorate([
    typegoose_1.prop({ ref: Category, required: false, default: null }),
    __metadata("design:type", Object)
], Category.prototype, "parent", void 0);
exports.Category = Category;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9jYXRlZ29yeS9tb2RlbHMvY2F0ZWdvcnkubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvY2F0ZWdvcnkvbW9kZWxzL2NhdGVnb3J5Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1FO0FBQ25FLHlDQUFpRDtBQUNqRCxrRUFBNkQ7QUFFN0QsTUFBYSxRQUFTLFNBQVEsK0JBQXVCO0lBYW5ELE1BQU0sS0FBSyxLQUFLO1FBQ2QsT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLGFBQWEsRUFBYiwwQkFBYSxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsTUFBTSxLQUFLLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFsQkM7SUFEQyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztzQ0FDWjtBQUdiO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs2Q0FDckI7QUFHcEI7SUFEQyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzsyQ0FDUDtBQUdsQjtJQURDLGdCQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzt3Q0FDbEM7QUFYeEIsNEJBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsLCBzY2hlbWFPcHRpb25zIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgcHJvcCwgTW9kZWxUeXBlLCBSZWYgfSBmcm9tICd0eXBlZ29vc2UnO1xuaW1wb3J0IHsgQmFzZUl0ZW1Nb2RlbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9iYXNlLWl0ZW0ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBCYXNlSXRlbU1vZGVsPENhdGVnb3J5PiB7XG4gIEBwcm9wKHsgcmVxdWlyZWQ6IHRydWUgfSlcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBwcm9wKHsgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0OiBudWxsIH0pXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQHByb3AoeyByZXF1aXJlZDogdHJ1ZSB9KVxuICB0aHVtYm5haWw6IHN0cmluZztcblxuICBAcHJvcCh7IHJlZjogQ2F0ZWdvcnksIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdDogbnVsbCB9KVxuICBwYXJlbnQ6IFJlZjxDYXRlZ29yeT47XG5cbiAgc3RhdGljIGdldCBtb2RlbCgpOiBNb2RlbFR5cGU8Q2F0ZWdvcnk+IHtcbiAgICByZXR1cm4gbmV3IENhdGVnb3J5KCkuZ2V0TW9kZWxGb3JDbGFzcyhDYXRlZ29yeSwgeyBzY2hlbWFPcHRpb25zIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCBtb2RlbE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5tb2RlbE5hbWU7XG4gIH1cbn1cbiJdfQ==