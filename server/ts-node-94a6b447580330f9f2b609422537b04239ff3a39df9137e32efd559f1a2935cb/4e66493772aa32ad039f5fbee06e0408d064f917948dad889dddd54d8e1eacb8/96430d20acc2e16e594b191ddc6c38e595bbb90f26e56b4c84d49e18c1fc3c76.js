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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy91c2VyL21vZGVscy91c2VyLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3VzZXIvbW9kZWxzL3VzZXIubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3REFBbUU7QUFDbkUscURBQTRDO0FBQzVDLHlDQUF1RDtBQUN2RCxrRUFBNEQ7QUFFNUQsTUFBYSxJQUFLLFNBQVEsc0JBQWU7SUF5QnZDLE1BQU0sS0FBSyxLQUFLO1FBQ2QsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUFFLGFBQWEsRUFBYiwwQkFBYSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsTUFBTSxLQUFLLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUExQkM7SUFMQyxnQkFBSSxDQUFDO1FBQ0osUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDO1FBQ3RDLE1BQU0sRUFBRSxJQUFJO1FBQ1osUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsb0JBQU8sQ0FBQyxLQUFLLENBQUM7S0FDbEMsQ0FBQzs7bUNBQ1k7QUFNZDtJQUpDLGdCQUFJLENBQUM7UUFDSixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUM7UUFDeEMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLCtCQUErQixDQUFDO0tBQ2hELENBQUM7O3NDQUNlO0FBR2pCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBUSxFQUFFLE9BQU8sRUFBRSx5QkFBUSxDQUFDLElBQUksRUFBRSxDQUFDOztrQ0FDakM7QUFHaEI7SUFEQyxnQkFBSSxFQUFFOztrQ0FDTztBQUVkO0lBREMsZ0JBQUksRUFBRTs7bUNBQ1E7QUFHZjtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7O3FDQUNWO0FBdkJsQixvQkFnQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwsIHNjaGVtYU9wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvYmFzZS5tb2RlbCc7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4vdXNlci1yb2xlLmVudW0nO1xuaW1wb3J0IHsgcHJvcCwgTW9kZWxUeXBlLCBUeXBlZ29vc2UgfSBmcm9tICd0eXBlZ29vc2UnO1xuaW1wb3J0IHsgaXNFbWFpbCB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBVc2VyIGV4dGVuZHMgQmFzZU1vZGVsPFVzZXI+IHtcbiAgQHByb3Aoe1xuICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ0UtbWFpbCBpcyBSZXF1aXJlZCddLFxuICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICB2YWxpZGF0ZTogdmFsdWUgPT4gaXNFbWFpbCh2YWx1ZSksXG4gIH0pXG4gIGVtYWlsOiBzdHJpbmc7XG5cbiAgQHByb3Aoe1xuICAgIHJlcXVpcmVkOiBbdHJ1ZSwgJ1Bhc3N3b3JkIGlzIHJlcXVpcmVkJ10sXG4gICAgbWlubGVuZ3RoOiBbNiwgJ011c3QgYmUgYXQgbGVhc3QgNiBjaGFyYWN0ZXJzJ10sXG4gIH0pXG4gIHBhc3N3b3JkOiBzdHJpbmc7XG5cbiAgQHByb3AoeyBlbnVtOiBVc2VyUm9sZSwgZGVmYXVsdDogVXNlclJvbGUuVXNlciB9KVxuICByb2xlPzogVXNlclJvbGU7XG5cbiAgQHByb3AoKVxuICBuYW1lPzogc3RyaW5nO1xuICBAcHJvcCgpXG4gIHBob25lPzogc3RyaW5nO1xuXG4gIEBwcm9wKHsgcmVxdWlyZWQ6IGZhbHNlIH0pXG4gIGFkZHJlc3M6IHN0cmluZztcblxuICBzdGF0aWMgZ2V0IG1vZGVsKCk6IE1vZGVsVHlwZTxVc2VyPiB7XG4gICAgcmV0dXJuIG5ldyBVc2VyKCkuZ2V0TW9kZWxGb3JDbGFzcyhVc2VyLCB7IHNjaGVtYU9wdGlvbnMgfSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IG1vZGVsTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1vZGVsLm1vZGVsTmFtZTtcbiAgfVxufVxuIl19