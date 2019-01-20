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
const base_item_model_1 = require("../../shared/base-item.model");
const typegoose_1 = require("typegoose");
const category_model_1 = require("../../category/models/category.model");
const brand_model_1 = require("brand/models/brand.model");
class Product extends base_item_model_1.BaseItemModel {
    static get model() {
        return new Product().getModelForClass(Product, { schemaOptions: base_item_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typegoose_1.prop({ required: true, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    typegoose_1.prop({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "featured", void 0);
__decorate([
    typegoose_1.prop({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "thumbnail", void 0);
__decorate([
    typegoose_1.arrayProp({ items: String, required: false }),
    __metadata("design:type", Array)
], Product.prototype, "gallery", void 0);
__decorate([
    typegoose_1.prop({ required: true, ref: category_model_1.Category }),
    __metadata("design:type", Object)
], Product.prototype, "category", void 0);
__decorate([
    typegoose_1.prop({ required: true, ref: brand_model_1.Brand }),
    __metadata("design:type", Object)
], Product.prototype, "brand", void 0);
exports.Product = Product;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9wcm9kdWN0L21vZGVscy9wcm9kdWN0Lm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3Byb2R1Y3QvbW9kZWxzL3Byb2R1Y3QubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxrRUFBNEU7QUFDNUUseUNBQTREO0FBQzVELHlFQUFnRTtBQUNoRSwwREFBaUQ7QUFFakQsTUFBYSxPQUFRLFNBQVEsK0JBQXNCO0lBK0JqRCxNQUFNLEtBQUssS0FBSztRQUNkLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxhQUFhLEVBQWIsK0JBQWEsRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELE1BQU0sS0FBSyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFDOUIsQ0FBQztDQUNGO0FBcENDO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7cUNBQ1o7QUFHYjtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzRDQUNOO0FBR3BCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOztxQ0FDMUI7QUFHYjtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3lDQUNSO0FBR2pCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7c0NBQ1g7QUFHZDtJQURDLGdCQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O3lDQUNQO0FBR2xCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOzswQ0FDcEI7QUFHbkI7SUFEQyxxQkFBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7O3dDQUMzQjtBQUduQjtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSx5QkFBUSxFQUFFLENBQUM7O3lDQUNoQjtBQUd4QjtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxtQkFBSyxFQUFFLENBQUM7O3NDQUNuQjtBQTdCcEIsMEJBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUl0ZW1Nb2RlbCwgc2NoZW1hT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NoYXJlZC9iYXNlLWl0ZW0ubW9kZWwnO1xuaW1wb3J0IHsgcHJvcCwgTW9kZWxUeXBlLCBhcnJheVByb3AsIFJlZiB9IGZyb20gJ3R5cGVnb29zZSc7XG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJy4uLy4uL2NhdGVnb3J5L21vZGVscy9jYXRlZ29yeS5tb2RlbCc7XG5pbXBvcnQgeyBCcmFuZCB9IGZyb20gJ2JyYW5kL21vZGVscy9icmFuZC5tb2RlbCc7XG5cbmV4cG9ydCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgQmFzZUl0ZW1Nb2RlbDxQcm9kdWN0PiB7XG4gIEBwcm9wKHsgcmVxdWlyZWQ6IHRydWUgfSlcbiAgbmFtZTogc3RyaW5nO1xuXG4gIEBwcm9wKHsgcmVxdWlyZWQ6IGZhbHNlIH0pXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgQHByb3AoeyByZXF1aXJlZDogdHJ1ZSwgdW5pcXVlOiB0cnVlIH0pXG4gIGNvZGU6IHN0cmluZztcblxuICBAcHJvcCh7IHJlcXVpcmVkOiB0cnVlIH0pXG4gIHF1YW50aXR5OiBudW1iZXI7XG5cbiAgQHByb3AoeyByZXF1aXJlZDogdHJ1ZSB9KVxuICBwcmljZTogbnVtYmVyO1xuXG4gIEBwcm9wKHsgZGVmYXVsdDogZmFsc2UgfSlcbiAgZmVhdHVyZWQ6IGJvb2xlYW47XG5cbiAgQHByb3AoeyByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6ICcnIH0pXG4gIHRodW1ibmFpbD86IHN0cmluZztcblxuICBAYXJyYXlQcm9wKHsgaXRlbXM6IFN0cmluZywgcmVxdWlyZWQ6IGZhbHNlIH0pXG4gIGdhbGxlcnk/OiBzdHJpbmdbXTtcblxuICBAcHJvcCh7IHJlcXVpcmVkOiB0cnVlLCByZWY6IENhdGVnb3J5IH0pXG4gIGNhdGVnb3J5OiBSZWY8Q2F0ZWdvcnk+O1xuXG4gIEBwcm9wKHsgcmVxdWlyZWQ6IHRydWUsIHJlZjogQnJhbmQgfSlcbiAgYnJhbmQ6IFJlZjxCcmFuZD47XG5cbiAgc3RhdGljIGdldCBtb2RlbCgpOiBNb2RlbFR5cGU8UHJvZHVjdD4ge1xuICAgIHJldHVybiBuZXcgUHJvZHVjdCgpLmdldE1vZGVsRm9yQ2xhc3MoUHJvZHVjdCwgeyBzY2hlbWFPcHRpb25zIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCBtb2RlbE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5tb2RlbE5hbWU7XG4gIH1cbn1cbiJdfQ==