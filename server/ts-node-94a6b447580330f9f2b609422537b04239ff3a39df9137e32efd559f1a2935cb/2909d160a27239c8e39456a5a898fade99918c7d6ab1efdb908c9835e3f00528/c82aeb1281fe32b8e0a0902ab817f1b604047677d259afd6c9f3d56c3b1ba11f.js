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
const user_role_enum_1 = require("./user-role.enum");
const typegoose_1 = require("typegoose");
const validators_1 = require("../../shared/utilities/validators");
class User extends base_model_1.BaseModel {
    static get model() {
        return new User().getModelForClass(User, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.arrayProp({ items: String, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "tokens", void 0);
__decorate([
    typegoose_1.prop({
        required: [true, 'E-mail is Required'],
        unique: true,
        validate: value => validators_1.isEmail(value),
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({
        required: [true, 'Password is required'],
        minlength: [6, 'Must be at least 6 characters'],
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop({ enum: user_role_enum_1.UserRole, default: user_role_enum_1.UserRole.User }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
exports.User = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL21vZGVscy91c2VyLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3VzZXIvbW9kZWxzL3VzZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUU7QUFDbkUscURBQTRDO0FBQzVDLHlDQUFrRTtBQUNsRSxrRUFBNEQ7QUFFNUQsTUFBYSxJQUFLLFNBQVEsc0JBQWU7SUE0QnZDLE1BQU0sS0FBSyxLQUFLO1FBQ2QsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLGFBQWEsRUFBYiwwQkFBYSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsTUFBTSxLQUFLLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFqQ0M7SUFEQyxxQkFBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUM7O29DQUN6QjtBQU9qQjtJQUxDLGdCQUFJLENBQUM7UUFDSixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUM7UUFDdEMsTUFBTSxFQUFFLElBQUk7UUFDWixRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxvQkFBTyxDQUFDLEtBQUssQ0FBQztLQUNsQyxDQUFDOzttQ0FDWTtBQU1kO0lBSkMsZ0JBQUksQ0FBQztRQUNKLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQztRQUN4QyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsK0JBQStCLENBQUM7S0FDaEQsQ0FBQzs7c0NBQ2U7QUFHakI7SUFEQyxnQkFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLHlCQUFRLEVBQUUsT0FBTyxFQUFFLHlCQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7O2tDQUNqQztBQUdoQjtJQURDLGdCQUFJLEVBQUU7O2tDQUNPO0FBRWQ7SUFEQyxnQkFBSSxFQUFFOzttQ0FDUTtBQUdmO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7cUNBQ1Y7QUExQmxCLG9CQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNb2RlbCwgc2NoZW1hT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NoYXJlZC9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSAnLi91c2VyLXJvbGUuZW51bSc7XG5pbXBvcnQgeyBwcm9wLCBNb2RlbFR5cGUsIFR5cGVnb29zZSwgYXJyYXlQcm9wIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IGlzRW1haWwgfSBmcm9tICcuLi8uLi9zaGFyZWQvdXRpbGl0aWVzL3ZhbGlkYXRvcnMnO1xuXG5leHBvcnQgY2xhc3MgVXNlciBleHRlbmRzIEJhc2VNb2RlbDxVc2VyPiB7XG4gIEBhcnJheVByb3AoeyBpdGVtczogU3RyaW5nLCBkZWZhdWx0OiBbXSB9KVxuICB0b2tlbnM6IHN0cmluZ1tdO1xuXG4gIEBwcm9wKHtcbiAgICByZXF1aXJlZDogW3RydWUsICdFLW1haWwgaXMgUmVxdWlyZWQnXSxcbiAgICB1bmlxdWU6IHRydWUsXG4gICAgdmFsaWRhdGU6IHZhbHVlID0+IGlzRW1haWwodmFsdWUpLFxuICB9KVxuICBlbWFpbDogc3RyaW5nO1xuXG4gIEBwcm9wKHtcbiAgICByZXF1aXJlZDogW3RydWUsICdQYXNzd29yZCBpcyByZXF1aXJlZCddLFxuICAgIG1pbmxlbmd0aDogWzYsICdNdXN0IGJlIGF0IGxlYXN0IDYgY2hhcmFjdGVycyddLFxuICB9KVxuICBwYXNzd29yZDogc3RyaW5nO1xuXG4gIEBwcm9wKHsgZW51bTogVXNlclJvbGUsIGRlZmF1bHQ6IFVzZXJSb2xlLlVzZXIgfSlcbiAgcm9sZT86IFVzZXJSb2xlO1xuXG4gIEBwcm9wKClcbiAgbmFtZT86IHN0cmluZztcbiAgQHByb3AoKVxuICBwaG9uZT86IHN0cmluZztcblxuICBAcHJvcCh7IHJlcXVpcmVkOiBmYWxzZSB9KVxuICBhZGRyZXNzOiBzdHJpbmc7XG5cbiAgc3RhdGljIGdldCBtb2RlbCgpOiBNb2RlbFR5cGU8VXNlcj4ge1xuICAgIHJldHVybiBuZXcgVXNlcigpLmdldE1vZGVsRm9yQ2xhc3MoVXNlciwgeyBzY2hlbWFPcHRpb25zIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCBtb2RlbE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5tb2RlbE5hbWU7XG4gIH1cbn1cbiJdfQ==