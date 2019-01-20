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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const category_service_1 = require("../../../category/category.service");
let IsCategoryExist = class IsCategoryExist {
    constructor(_categoryService) {
        this._categoryService = _categoryService;
    }
    validate(value, args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Validate Category Code', value);
            const category = yield this._categoryService.findById(value);
            console.log('Category Id');
            return category ? true : false;
        });
    }
};
IsCategoryExist = __decorate([
    class_validator_1.ValidatorConstraint({ async: true }),
    common_1.Injectable(),
    __param(0, common_1.Inject('CategoryService')),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], IsCategoryExist);
exports.IsCategoryExist = IsCategoryExist;
function IsCategoryExists(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isCategoryExists',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsCategoryExist,
        });
    };
}
exports.IsCategoryExists = IsCategoryExists;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9jYXRlZ29yeS9jYXRlZ29yeS1leGlzdHMudmFsaWRhdG9yLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC92YWxpZGF0b3JzL2NhdGVnb3J5L2NhdGVnb3J5LWV4aXN0cy52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQU15QjtBQUt6QiwyQ0FBK0U7QUFHL0UseUVBQXFFO0FBSXJFLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFFbUIsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7SUFHcEQsQ0FBQztJQUNLLFFBQVEsQ0FBQyxLQUFVLEVBQUUsSUFBeUI7O1lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFN0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTdELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFM0IsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pDLENBQUM7S0FBQTtDQUNGLENBQUE7QUFoQlksZUFBZTtJQUYzQixxQ0FBbUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxtQkFBVSxFQUFFO0lBR1IsV0FBQSxlQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtxQ0FDUyxrQ0FBZTtHQUh6QyxlQUFlLENBZ0IzQjtBQWhCWSwwQ0FBZTtBQWtCNUIsU0FBZ0IsZ0JBQWdCLENBQUMsaUJBQXFDO0lBQ3BFLE9BQU8sVUFBUyxNQUFjLEVBQUUsWUFBb0I7UUFDbEQsbUNBQWlCLENBQUM7WUFDaEIsSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDMUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUM7QUFYRCw0Q0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHJlZ2lzdGVyRGVjb3JhdG9yLFxuICBWYWxpZGF0aW9uT3B0aW9ucyxcbiAgVmFsaWRhdGlvbkFyZ3VtZW50cyxcbiAgVmFsaWRhdG9yQ29uc3RyYWludCxcbiAgVmFsaWRhdG9yQ29uc3RyYWludEludGVyZmFjZSxcbn0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7IENvdXBvbkxldmVsIH0gZnJvbSAnY291cG9uL21vZGVscy9jb3Vwb24tbGV2ZWwuZW51bSc7XG5pbXBvcnQgeyBDb3Vwb24gfSBmcm9tICdjb3Vwb24vbW9kZWxzL2NvdXBvbi5tb2RlbCc7XG5pbXBvcnQgeyBUeXBlZ29vc2UsIE1vZGVsVHlwZSwgSW5zdGFuY2VUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IHRocm93cyB9IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uLCBIdHRwU3RhdHVzLCBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vwb25TZXJ2aWNlIH0gZnJvbSAnY291cG9uL2NvdXBvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY2F0ZWdvcnkvY2F0ZWdvcnkuc2VydmljZSc7XG5cbkBWYWxpZGF0b3JDb25zdHJhaW50KHsgYXN5bmM6IHRydWUgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJc0NhdGVnb3J5RXhpc3QgaW1wbGVtZW50cyBWYWxpZGF0b3JDb25zdHJhaW50SW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnQ2F0ZWdvcnlTZXJ2aWNlJylcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jYXRlZ29yeVNlcnZpY2U6IENhdGVnb3J5U2VydmljZSxcbiAgKSB7XG4gICAgLy8gY29uc29sZS5sb2coX2NvdXBvblNlcnZpY2UpO1xuICB9XG4gIGFzeW5jIHZhbGlkYXRlKHZhbHVlOiBhbnksIGFyZ3M6IFZhbGlkYXRpb25Bcmd1bWVudHMpIHtcbiAgICBjb25zb2xlLmxvZygnVmFsaWRhdGUgQ2F0ZWdvcnkgQ29kZScsIHZhbHVlKTtcblxuICAgIGNvbnN0IGNhdGVnb3J5ID0gYXdhaXQgdGhpcy5fY2F0ZWdvcnlTZXJ2aWNlLmZpbmRCeUlkKHZhbHVlKTtcblxuICAgIGNvbnNvbGUubG9nKCdDYXRlZ29yeSBJZCcpO1xuICAgIC8vIHByaW50cyB7IF9pZDogNTkyMThmNjg2NDA5ZDY3MGE5N2U1M2UwLCBuYW1lOiAnSm9obkRvZScsIF9fdjogMCB9XG4gICAgcmV0dXJuIGNhdGVnb3J5ID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc0NhdGVnb3J5RXhpc3RzKHZhbGlkYXRpb25PcHRpb25zPzogVmFsaWRhdGlvbk9wdGlvbnMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdDogT2JqZWN0LCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xuICAgIHJlZ2lzdGVyRGVjb3JhdG9yKHtcbiAgICAgIG5hbWU6ICdpc0NhdGVnb3J5RXhpc3RzJyxcbiAgICAgIHRhcmdldDogb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgcHJvcGVydHlOYW1lOiBwcm9wZXJ0eU5hbWUsXG4gICAgICBjb25zdHJhaW50czogW10sXG4gICAgICBvcHRpb25zOiB2YWxpZGF0aW9uT3B0aW9ucyxcbiAgICAgIHZhbGlkYXRvcjogSXNDYXRlZ29yeUV4aXN0LFxuICAgIH0pO1xuICB9O1xufVxuIl19