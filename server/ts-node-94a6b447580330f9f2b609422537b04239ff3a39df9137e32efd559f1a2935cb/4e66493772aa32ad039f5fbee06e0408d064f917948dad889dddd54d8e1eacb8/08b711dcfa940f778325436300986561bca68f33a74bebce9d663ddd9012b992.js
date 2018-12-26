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
const base_model_1 = require("../../shared/base.model");
class Brand extends base_model_1.BaseModel {
    static get model() {
        return new Brand().getModelForClass(Brand, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Brand.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Brand.prototype, "logo", void 0);
exports.Brand = Brand;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9icmFuZC9tb2RlbHMvYnJhbmQubW9kZWwudHMiLCJzb3VyY2VzIjpbIi9ob21lL1JheWFoL3NlcnZlci9zcmMvYnJhbmQvbW9kZWxzL2JyYW5kLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EseUNBQTRDO0FBQzVDLHdEQUFtRTtBQUVuRSxNQUFhLEtBQU0sU0FBUSxzQkFBZ0I7SUFPekMsTUFBTSxLQUFLLEtBQUs7UUFDZCxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQUUsYUFBYSxFQUFiLDBCQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxNQUFNLEtBQUssU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQzlCLENBQUM7Q0FDRjtBQVpDO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bUNBQ1o7QUFHYjtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21DQUNaO0FBTGYsc0JBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlSXRlbU1vZGVsIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Jhc2UtaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBwcm9wLCBNb2RlbFR5cGUgfSBmcm9tICd0eXBlZ29vc2UnO1xuaW1wb3J0IHsgQmFzZU1vZGVsLCBzY2hlbWFPcHRpb25zIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgQnJhbmQgZXh0ZW5kcyBCYXNlTW9kZWw8QnJhbmQ+IHtcbiAgQHByb3AoeyByZXF1aXJlZDogdHJ1ZSB9KVxuICBuYW1lOiBzdHJpbmc7XG5cbiAgQHByb3AoeyByZXF1aXJlZDogdHJ1ZSB9KVxuICBsb2dvOiBzdHJpbmc7XG5cbiAgc3RhdGljIGdldCBtb2RlbCgpOiBNb2RlbFR5cGU8QnJhbmQ+IHtcbiAgICByZXR1cm4gbmV3IEJyYW5kKCkuZ2V0TW9kZWxGb3JDbGFzcyhCcmFuZCwgeyBzY2hlbWFPcHRpb25zIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCBtb2RlbE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5tb2RlbE5hbWU7XG4gIH1cbn1cbiJdfQ==