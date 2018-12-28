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
const base_model_1 = require("./../../shared/base.model");
const todo_level_enum_1 = require("./todo-level.enum");
const typegoose_1 = require("typegoose");
class Todo extends base_model_1.BaseModel {
    static get model() {
        return new Todo().getModelForClass(Todo, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({ required: [true, 'Content is Required'] }),
    __metadata("design:type", String)
], Todo.prototype, "content", void 0);
__decorate([
    typegoose_1.prop({ enum: todo_level_enum_1.TodoLevel, default: todo_level_enum_1.TodoLevel.Normal }),
    __metadata("design:type", String)
], Todo.prototype, "level", void 0);
__decorate([
    typegoose_1.prop({ default: false }),
    __metadata("design:type", Boolean)
], Todo.prototype, "isCompleted", void 0);
exports.Todo = Todo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy90b2RvL21vZGVscy90b2RvLm1vZGVsLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3RvZG8vbW9kZWxzL3RvZG8ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwwREFBcUU7QUFDckUsdURBQThDO0FBQzlDLHlDQUE0QztBQUU1QyxNQUFhLElBQUssU0FBUSxzQkFBZTtJQVN2QyxNQUFNLEtBQUssS0FBSztRQUNkLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxhQUFhLEVBQWIsMEJBQWEsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELE1BQU0sS0FBSyxTQUFTO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFDOUIsQ0FBQztDQUNGO0FBZEM7SUFEQyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLHFCQUFxQixDQUFDLEVBQUUsQ0FBQzs7cUNBQ2xDO0FBRWhCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLElBQUksRUFBRSwyQkFBUyxFQUFFLE9BQU8sRUFBRSwyQkFBUyxDQUFDLE1BQU0sRUFBRSxDQUFDOzttQ0FDcEM7QUFHakI7SUFEQyxnQkFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOzt5Q0FDSjtBQVB2QixvQkFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTW9kZWwsIHNjaGVtYU9wdGlvbnMgfSBmcm9tICcuLy4uLy4uL3NoYXJlZC9iYXNlLm1vZGVsJztcbmltcG9ydCB7IFRvZG9MZXZlbCB9IGZyb20gJy4vdG9kby1sZXZlbC5lbnVtJztcbmltcG9ydCB7IHByb3AsIE1vZGVsVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5cbmV4cG9ydCBjbGFzcyBUb2RvIGV4dGVuZHMgQmFzZU1vZGVsPFRvZG8+IHtcbiAgQHByb3AoeyByZXF1aXJlZDogW3RydWUsICdDb250ZW50IGlzIFJlcXVpcmVkJ10gfSlcbiAgY29udGVudDogc3RyaW5nO1xuICBAcHJvcCh7IGVudW06IFRvZG9MZXZlbCwgZGVmYXVsdDogVG9kb0xldmVsLk5vcm1hbCB9KVxuICBsZXZlbDogVG9kb0xldmVsO1xuXG4gIEBwcm9wKHsgZGVmYXVsdDogZmFsc2UgfSlcbiAgaXNDb21wbGV0ZWQ6IGJvb2xlYW47XG5cbiAgc3RhdGljIGdldCBtb2RlbCgpOiBNb2RlbFR5cGU8VG9kbz4ge1xuICAgIHJldHVybiBuZXcgVG9kbygpLmdldE1vZGVsRm9yQ2xhc3MoVG9kbywgeyBzY2hlbWFPcHRpb25zIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCBtb2RlbE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5tb2RlbE5hbWU7XG4gIH1cbn1cbiJdfQ==