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
            console.log('Validate Coupon Code');
            const category = yield this._categoryService.findById(value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvdmFsaWRhdG9ycy9jYXRlZ29yeS9jYXRlZ29yeS1leGlzdHMudmFsaWRhdG9yLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC92YWxpZGF0b3JzL2NhdGVnb3J5L2NhdGVnb3J5LWV4aXN0cy52YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQU15QjtBQUt6QiwyQ0FBK0U7QUFHL0UseUVBQXFFO0FBSXJFLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFDMUIsWUFFbUIsZ0JBQWlDO1FBQWpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7SUFHcEQsQ0FBQztJQUNLLFFBQVEsQ0FBQyxLQUFVLEVBQUUsSUFBeUI7O1lBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUVwQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFN0QsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pDLENBQUM7S0FBQTtDQUNGLENBQUE7QUFkWSxlQUFlO0lBRjNCLHFDQUFtQixDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BDLG1CQUFVLEVBQUU7SUFHUixXQUFBLGVBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO3FDQUNTLGtDQUFlO0dBSHpDLGVBQWUsQ0FjM0I7QUFkWSwwQ0FBZTtBQWdCNUIsU0FBZ0IsZ0JBQWdCLENBQUMsaUJBQXFDO0lBQ3BFLE9BQU8sVUFBUyxNQUFjLEVBQUUsWUFBb0I7UUFDbEQsbUNBQWlCLENBQUM7WUFDaEIsSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixNQUFNLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDMUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFNBQVMsRUFBRSxlQUFlO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUM7QUFYRCw0Q0FXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHJlZ2lzdGVyRGVjb3JhdG9yLFxuICBWYWxpZGF0aW9uT3B0aW9ucyxcbiAgVmFsaWRhdGlvbkFyZ3VtZW50cyxcbiAgVmFsaWRhdG9yQ29uc3RyYWludCxcbiAgVmFsaWRhdG9yQ29uc3RyYWludEludGVyZmFjZSxcbn0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7IENvdXBvbkxldmVsIH0gZnJvbSAnY291cG9uL21vZGVscy9jb3Vwb24tbGV2ZWwuZW51bSc7XG5pbXBvcnQgeyBDb3Vwb24gfSBmcm9tICdjb3Vwb24vbW9kZWxzL2NvdXBvbi5tb2RlbCc7XG5pbXBvcnQgeyBUeXBlZ29vc2UsIE1vZGVsVHlwZSwgSW5zdGFuY2VUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IHRocm93cyB9IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyBIdHRwRXhjZXB0aW9uLCBIdHRwU3RhdHVzLCBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBDb3Vwb25TZXJ2aWNlIH0gZnJvbSAnY291cG9uL2NvdXBvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY2F0ZWdvcnkvY2F0ZWdvcnkuc2VydmljZSc7XG5cbkBWYWxpZGF0b3JDb25zdHJhaW50KHsgYXN5bmM6IHRydWUgfSlcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJc0NhdGVnb3J5RXhpc3QgaW1wbGVtZW50cyBWYWxpZGF0b3JDb25zdHJhaW50SW50ZXJmYWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnQ2F0ZWdvcnlTZXJ2aWNlJylcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9jYXRlZ29yeVNlcnZpY2U6IENhdGVnb3J5U2VydmljZSxcbiAgKSB7XG4gICAgLy8gY29uc29sZS5sb2coX2NvdXBvblNlcnZpY2UpO1xuICB9XG4gIGFzeW5jIHZhbGlkYXRlKHZhbHVlOiBhbnksIGFyZ3M6IFZhbGlkYXRpb25Bcmd1bWVudHMpIHtcbiAgICBjb25zb2xlLmxvZygnVmFsaWRhdGUgQ291cG9uIENvZGUnKTtcblxuICAgIGNvbnN0IGNhdGVnb3J5ID0gYXdhaXQgdGhpcy5fY2F0ZWdvcnlTZXJ2aWNlLmZpbmRCeUlkKHZhbHVlKTtcbiAgICAvLyBwcmludHMgeyBfaWQ6IDU5MjE4ZjY4NjQwOWQ2NzBhOTdlNTNlMCwgbmFtZTogJ0pvaG5Eb2UnLCBfX3Y6IDAgfVxuICAgIHJldHVybiBjYXRlZ29yeSA/IHRydWUgOiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNDYXRlZ29yeUV4aXN0cyh2YWxpZGF0aW9uT3B0aW9ucz86IFZhbGlkYXRpb25PcHRpb25zKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3Q6IE9iamVjdCwgcHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcbiAgICByZWdpc3RlckRlY29yYXRvcih7XG4gICAgICBuYW1lOiAnaXNDYXRlZ29yeUV4aXN0cycsXG4gICAgICB0YXJnZXQ6IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHlOYW1lLFxuICAgICAgY29uc3RyYWludHM6IFtdLFxuICAgICAgb3B0aW9uczogdmFsaWRhdGlvbk9wdGlvbnMsXG4gICAgICB2YWxpZGF0b3I6IElzQ2F0ZWdvcnlFeGlzdCxcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==