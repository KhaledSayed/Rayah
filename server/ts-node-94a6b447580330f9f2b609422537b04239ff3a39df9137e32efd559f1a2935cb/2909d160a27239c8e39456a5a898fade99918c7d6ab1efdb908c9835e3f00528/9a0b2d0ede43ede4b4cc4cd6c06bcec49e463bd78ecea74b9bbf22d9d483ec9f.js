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
const coupon_level_enum_1 = require("./coupon-level.enum");
const moment = require("moment");
class Coupon extends base_model_1.BaseModel {
    get status() {
        console.log(this.usedBy, this.numberOfPeople);
        return (moment(new Date().toISOString()).isSameOrBefore(moment(this.endDate)) &&
            this.usedBy + 1 <= this.numberOfPeople &&
            this.active);
    }
    static get model() {
        return new Coupon().getModelForClass(Coupon, { schemaOptions: base_model_1.schemaOptions });
    }
    static get modelName() {
        return this.model.modelName;
    }
}
__decorate([
    typegoose_1.prop({ enum: coupon_level_enum_1.CouponLevel, default: coupon_level_enum_1.CouponLevel.Fixed }),
    __metadata("design:type", String)
], Coupon.prototype, "type", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        default: 0,
        min: this.type === coupon_level_enum_1.CouponLevel.Percentage ? 1 : 10,
        max: this.type === coupon_level_enum_1.CouponLevel.Percentage ? 100 : 1000,
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "value", void 0);
__decorate([
    typegoose_1.prop({ required: true, unique: true }),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    typegoose_1.prop({ default: 1000 }),
    __metadata("design:type", Number)
], Coupon.prototype, "numberOfPeople", void 0);
__decorate([
    typegoose_1.prop({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Coupon.prototype, "usedBy", void 0);
__decorate([
    typegoose_1.prop({ required: this.endDate != undefined ? true : false }),
    __metadata("design:type", Date)
], Coupon.prototype, "startDate", void 0);
__decorate([
    typegoose_1.prop({ required: this.startDate != undefined ? true : false }),
    __metadata("design:type", Date)
], Coupon.prototype, "endDate", void 0);
__decorate([
    typegoose_1.prop({ default: true }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "active", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], Coupon.prototype, "minTotal", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], Coupon.prototype, "maxTotal", void 0);
__decorate([
    typegoose_1.prop({}),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Coupon.prototype, "status", null);
exports.Coupon = Coupon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vbW9kZWxzL2NvdXBvbi5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9jb3Vwb24vbW9kZWxzL2NvdXBvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdEQUFtRTtBQUNuRSx5Q0FBNEM7QUFDNUMsMkRBQWtEO0FBQ2xELGlDQUFpQztBQUVqQyxNQUFhLE1BQU8sU0FBUSxzQkFBaUI7SUFxQzNDLElBQUksTUFBTTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUNMLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sS0FBSyxLQUFLO1FBQ2QsT0FBTyxJQUFJLE1BQU0sRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxFQUFFLGFBQWEsRUFBYiwwQkFBYSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsTUFBTSxLQUFLLFNBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFuREM7SUFEQyxnQkFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLCtCQUFXLEVBQUUsT0FBTyxFQUFFLCtCQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7O29DQUN0QztBQVFsQjtJQU5DLGdCQUFJLENBQUM7UUFDSixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxDQUFDO1FBQ1YsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssK0JBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNsRCxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSywrQkFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO0tBQ3ZELENBQUM7O3FDQUNZO0FBR2Q7SUFEQyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7O29DQUMxQjtBQUdiO0lBREMsZ0JBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OENBQ0Q7QUFHdkI7SUFEQyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O3NDQUN2QjtBQUdmO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs4QkFDbEQsSUFBSTt5Q0FBQztBQUdoQjtJQURDLGdCQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7OEJBQ3RELElBQUk7dUNBQUM7QUFHZDtJQURDLGdCQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O3NDQUNSO0FBR2hCO0lBREMsZ0JBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7d0NBQ1I7QUFHakI7SUFEQyxnQkFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzt3Q0FDUjtBQUdqQjtJQURDLGdCQUFJLENBQUMsRUFBRSxDQUFDOzs7b0NBUVI7QUE1Q0gsd0JBcURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZU1vZGVsLCBzY2hlbWFPcHRpb25zIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2Jhc2UubW9kZWwnO1xuaW1wb3J0IHsgcHJvcCwgTW9kZWxUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IENvdXBvbkxldmVsIH0gZnJvbSAnLi9jb3Vwb24tbGV2ZWwuZW51bSc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuZXhwb3J0IGNsYXNzIENvdXBvbiBleHRlbmRzIEJhc2VNb2RlbDxDb3Vwb24+IHtcbiAgQHByb3AoeyBlbnVtOiBDb3Vwb25MZXZlbCwgZGVmYXVsdDogQ291cG9uTGV2ZWwuRml4ZWQgfSlcbiAgdHlwZTogQ291cG9uTGV2ZWw7XG5cbiAgQHByb3Aoe1xuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIGRlZmF1bHQ6IDAsXG4gICAgbWluOiB0aGlzLnR5cGUgPT09IENvdXBvbkxldmVsLlBlcmNlbnRhZ2UgPyAxIDogMTAsXG4gICAgbWF4OiB0aGlzLnR5cGUgPT09IENvdXBvbkxldmVsLlBlcmNlbnRhZ2UgPyAxMDAgOiAxMDAwLFxuICB9KVxuICB2YWx1ZTogbnVtYmVyO1xuXG4gIEBwcm9wKHsgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9KVxuICBjb2RlOiBzdHJpbmc7XG5cbiAgQHByb3AoeyBkZWZhdWx0OiAxMDAwIH0pXG4gIG51bWJlck9mUGVvcGxlOiBudW1iZXI7XG5cbiAgQHByb3AoeyByZXF1aXJlZDogZmFsc2UsIGRlZmF1bHQ6IDAgfSlcbiAgdXNlZEJ5OiBudW1iZXI7XG5cbiAgQHByb3AoeyByZXF1aXJlZDogdGhpcy5lbmREYXRlICE9IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZSB9KVxuICBzdGFydERhdGU6IERhdGU7XG5cbiAgQHByb3AoeyByZXF1aXJlZDogdGhpcy5zdGFydERhdGUgIT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlIH0pXG4gIGVuZERhdGU6IERhdGU7XG5cbiAgQHByb3AoeyBkZWZhdWx0OiB0cnVlIH0pXG4gIGFjdGl2ZTogYm9vbGVhbjtcblxuICBAcHJvcCh7IHJlcXVpcmVkOiB0cnVlIH0pXG4gIG1pblRvdGFsOiBudW1iZXI7XG5cbiAgQHByb3AoeyByZXF1aXJlZDogdHJ1ZSB9KVxuICBtYXhUb3RhbDogbnVtYmVyO1xuXG4gIEBwcm9wKHt9KVxuICBnZXQgc3RhdHVzKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMudXNlZEJ5LCB0aGlzLm51bWJlck9mUGVvcGxlKTtcbiAgICByZXR1cm4gKFxuICAgICAgbW9tZW50KG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSkuaXNTYW1lT3JCZWZvcmUobW9tZW50KHRoaXMuZW5kRGF0ZSkpICYmXG4gICAgICB0aGlzLnVzZWRCeSArIDEgPD0gdGhpcy5udW1iZXJPZlBlb3BsZSAmJlxuICAgICAgdGhpcy5hY3RpdmVcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGdldCBtb2RlbCgpOiBNb2RlbFR5cGU8Q291cG9uPiB7XG4gICAgcmV0dXJuIG5ldyBDb3Vwb24oKS5nZXRNb2RlbEZvckNsYXNzKENvdXBvbiwgeyBzY2hlbWFPcHRpb25zIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCBtb2RlbE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tb2RlbC5tb2RlbE5hbWU7XG4gIH1cbn1cbiJdfQ==