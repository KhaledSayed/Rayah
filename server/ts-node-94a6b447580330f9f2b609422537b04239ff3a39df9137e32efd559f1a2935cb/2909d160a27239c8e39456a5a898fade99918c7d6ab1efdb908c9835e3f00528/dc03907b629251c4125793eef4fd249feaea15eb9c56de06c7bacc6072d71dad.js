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
const swagger_1 = require("@nestjs/swagger");
const slider_level_enum_1 = require("../slider-level.enum");
const class_validator_1 = require("class-validator");
const is_item_validator_1 = require("../../../shared/validators/slider/is-item.validator");
class SliderParams {
}
__decorate([
    swagger_1.ApiModelProperty({ example: slider_level_enum_1.SliderLevel.Category }),
    class_validator_1.IsEnum(slider_level_enum_1.SliderLevel),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], SliderParams.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    class_validator_1.IsString(),
    is_item_validator_1.isItem('type', {
        message: 'Not Valid Item',
    }),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], SliderParams.prototype, "item", void 0);
exports.SliderParams = SliderParams;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvbW9kZWxzL3ZpZXctbW9kZWxzL3NsaWRlci1wYXJhbS5tb2RlbC50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvbW9kZWxzL3ZpZXctbW9kZWxzL3NsaWRlci1wYXJhbS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZDQUFtRDtBQUNuRCw0REFBbUQ7QUFJbkQscURBQThEO0FBQzlELDJGQUE2RTtBQUc3RSxNQUFhLFlBQVk7Q0FleEI7QUFYQztJQUhDLDBCQUFnQixDQUFDLEVBQUUsT0FBTyxFQUFFLCtCQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbkQsd0JBQU0sQ0FBQywrQkFBVyxDQUFDO0lBQ25CLDJCQUFTLEVBQUU7OzBDQUNNO0FBUWxCO0lBTkMsMEJBQWdCLEVBQUU7SUFDbEIsMEJBQVEsRUFBRTtJQUNWLDBCQUFNLENBQUMsTUFBTSxFQUFFO1FBQ2QsT0FBTyxFQUFFLGdCQUFnQjtLQUMxQixDQUFDO0lBQ0QsMkJBQVMsRUFBRTs7MENBQ0M7QUFaZixvQ0FlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwaU1vZGVsUHJvcGVydHkgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgU2xpZGVyTGV2ZWwgfSBmcm9tICcuLi9zbGlkZXItbGV2ZWwuZW51bSc7XG5pbXBvcnQgeyBTbGlkZXIgfSBmcm9tICcuLi9zbGlkZXIubW9kZWwnO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuLi8uLi8uLi9jYXRlZ29yeS9tb2RlbHMvY2F0ZWdvcnkubW9kZWwnO1xuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvbW9kZWxzL3Byb2R1Y3QubW9kZWwnO1xuaW1wb3J0IHsgSXNFbnVtLCBJc1N0cmluZywgSXNEZWZpbmVkIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7IGlzSXRlbSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC92YWxpZGF0b3JzL3NsaWRlci9pcy1pdGVtLnZhbGlkYXRvcic7XG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnb3MnO1xuXG5leHBvcnQgY2xhc3MgU2xpZGVyUGFyYW1zIHtcbiAgQEFwaU1vZGVsUHJvcGVydHkoeyBleGFtcGxlOiBTbGlkZXJMZXZlbC5DYXRlZ29yeSB9KVxuICBASXNFbnVtKFNsaWRlckxldmVsKVxuICBASXNEZWZpbmVkKClcbiAgdHlwZTogU2xpZGVyTGV2ZWw7XG5cbiAgQEFwaU1vZGVsUHJvcGVydHkoKVxuICBASXNTdHJpbmcoKVxuICBAaXNJdGVtKCd0eXBlJywge1xuICAgIG1lc3NhZ2U6ICdOb3QgVmFsaWQgSXRlbScsXG4gIH0pXG4gIEBJc0RlZmluZWQoKVxuICBpdGVtOiBzdHJpbmc7XG5cbiAgYmFubmVyOiBzdHJpbmc7XG59XG4iXX0=