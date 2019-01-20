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
const slider_level_enum_1 = require("./slider-level.enum");
const product_model_1 = require("../../product/models/product.model");
const category_model_1 = require("../../category/models/category.model");
class Slider extends base_model_1.BaseModel {
    static get model() {
        return new Slider().getModelForClass(Slider, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Slider.prototype, "banner", void 0);
__decorate([
    typegoose_1.prop({ required: true, enum: slider_level_enum_1.SliderLevel }),
    __metadata("design:type", String)
], Slider.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        ref: this.type === slider_level_enum_1.SliderLevel.Product ? product_model_1.Product : category_model_1.Category,
    }),
    __metadata("design:type", Object)
], Slider.prototype, "item", void 0);
exports.Slider = Slider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvbW9kZWxzL3NsaWRlci5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvbW9kZWxzL3NsaWRlci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdEQUFtRTtBQUNuRSx5Q0FBaUQ7QUFDakQsMkRBQWtEO0FBQ2xELHNFQUE2RDtBQUM3RCx5RUFBZ0U7QUFFaEUsTUFBYSxNQUFPLFNBQVEsc0JBQWlCO0lBYTNDLE1BQU0sS0FBSyxLQUFLO1FBQ2QsT0FBTyxJQUFJLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxFQUFFLGFBQWEsRUFBYiwwQkFBYSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsTUFBTSxLQUFLLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFsQkM7SUFEQyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztzQ0FDVjtBQUdmO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLCtCQUFXLEVBQUUsQ0FBQzs7b0NBQzFCO0FBTWxCO0lBSkMsZ0JBQUksQ0FBQztRQUNKLFFBQVEsRUFBRSxJQUFJO1FBQ2QsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssK0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHVCQUFPLENBQUMsQ0FBQyxDQUFDLHlCQUFRO0tBQzVELENBQUM7O29DQUNpQztBQVhyQyx3QkFvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwsIHNjaGVtYU9wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBwcm9wLCBSZWYsIE1vZGVsVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyBTbGlkZXJMZXZlbCB9IGZyb20gJy4vc2xpZGVyLWxldmVsLmVudW0nO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4uLy4uL3Byb2R1Y3QvbW9kZWxzL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi9jYXRlZ29yeS9tb2RlbHMvY2F0ZWdvcnkubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgU2xpZGVyIGV4dGVuZHMgQmFzZU1vZGVsPFNsaWRlcj4ge1xuICBAcHJvcCh7IHJlcXVpcmVkOiB0cnVlIH0pXG4gIGJhbm5lcjogc3RyaW5nO1xuXG4gIEBwcm9wKHsgcmVxdWlyZWQ6IHRydWUsIGVudW06IFNsaWRlckxldmVsIH0pXG4gIHR5cGU6IFNsaWRlckxldmVsO1xuXG4gIEBwcm9wKHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICByZWY6IHRoaXMudHlwZSA9PT0gU2xpZGVyTGV2ZWwuUHJvZHVjdCA/IFByb2R1Y3QgOiBDYXRlZ29yeSxcbiAgfSlcbiAgaXRlbTogUmVmPENhdGVnb3J5PiB8IFJlZjxQcm9kdWN0PjtcblxuICBzdGF0aWMgZ2V0IG1vZGVsKCk6IE1vZGVsVHlwZTxTbGlkZXI+IHtcbiAgICByZXR1cm4gbmV3IFNsaWRlcigpLmdldE1vZGVsRm9yQ2xhc3MoU2xpZGVyLCB7IHNjaGVtYU9wdGlvbnMgfSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG1vZGVsTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLm1vZGVsTmFtZTtcbiAgfVxufVxuIl19