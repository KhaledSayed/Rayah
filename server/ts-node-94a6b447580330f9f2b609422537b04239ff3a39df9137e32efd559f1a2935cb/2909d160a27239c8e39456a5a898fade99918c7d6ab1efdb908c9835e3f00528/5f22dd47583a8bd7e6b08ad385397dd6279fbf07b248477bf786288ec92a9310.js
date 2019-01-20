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
const base_model_1 = require("shared/base.model");
const typegoose_1 = require("typegoose");
const user_model_1 = require("../../user/models/user.model");
const product_model_1 = require("../../product/models/product.model");
class Review extends base_model_1.BaseModel {
    static get model() {
        return new Review().getModelForClass(Review, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({ required: true, ref: user_model_1.User }),
    __metadata("design:type", Object)
], Review.prototype, "reviewer", void 0);
__decorate([
    typegoose_1.prop({ required: true, min: 1, max: 5 }),
    __metadata("design:type", Number)
], Review.prototype, "stars", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], Review.prototype, "description", void 0);
__decorate([
    typegoose_1.prop({ required: true, ref: product_model_1.Product }),
    __metadata("design:type", Object)
], Review.prototype, "product", void 0);
exports.Review = Review;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvbW9kZWxzL3Jldmlldy5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvbW9kZWxzL3Jldmlldy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGtEQUE2RDtBQUM3RCx5Q0FBaUQ7QUFDakQsNkRBQW9EO0FBQ3BELHNFQUE2RDtBQUU3RCxNQUFhLE1BQU8sU0FBUSxzQkFBaUI7SUFhM0MsTUFBTSxLQUFLLEtBQUs7UUFDZCxPQUFPLElBQUksTUFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFiLDBCQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxNQUFNLEtBQUssU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQzlCLENBQUM7Q0FDRjtBQWxCQztJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxpQkFBSSxFQUFFLENBQUM7O3dDQUNoQjtBQUdwQjtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDOztxQ0FDM0I7QUFHZDtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzJDQUNOO0FBR3BCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLHVCQUFPLEVBQUUsQ0FBQzs7dUNBQ2pCO0FBWHhCLHdCQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgc2NoZW1hT3B0aW9ucyB9IGZyb20gJ3NoYXJlZC9iYXNlLm1vZGVsJztcbmltcG9ydCB7IHByb3AsIFJlZiwgTW9kZWxUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi8uLi91c2VyL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuLi8uLi9wcm9kdWN0L21vZGVscy9wcm9kdWN0Lm1vZGVsJztcblxuZXhwb3J0IGNsYXNzIFJldmlldyBleHRlbmRzIEJhc2VNb2RlbDxSZXZpZXc+IHtcbiAgQHByb3AoeyByZXF1aXJlZDogdHJ1ZSwgcmVmOiBVc2VyIH0pXG4gIHJldmlld2VyOiBSZWY8VXNlcj47XG5cbiAgQHByb3AoeyByZXF1aXJlZDogdHJ1ZSwgbWluOiAxLCBtYXg6IDUgfSlcbiAgc3RhcnM6IG51bWJlcjtcblxuICBAcHJvcCh7IHJlcXVpcmVkOiBmYWxzZSB9KVxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIEBwcm9wKHsgcmVxdWlyZWQ6IHRydWUsIHJlZjogUHJvZHVjdCB9KVxuICBwcm9kdWN0OiBSZWY8UHJvZHVjdD47XG5cbiAgc3RhdGljIGdldCBtb2RlbCgpOiBNb2RlbFR5cGU8UmV2aWV3PiB7XG4gICAgcmV0dXJuIG5ldyBSZXZpZXcoKS5nZXRNb2RlbEZvckNsYXNzKFJldmlldywgeyBzY2hlbWFPcHRpb25zIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCBtb2RlbE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5tb2RlbE5hbWU7XG4gIH1cbn1cbiJdfQ==