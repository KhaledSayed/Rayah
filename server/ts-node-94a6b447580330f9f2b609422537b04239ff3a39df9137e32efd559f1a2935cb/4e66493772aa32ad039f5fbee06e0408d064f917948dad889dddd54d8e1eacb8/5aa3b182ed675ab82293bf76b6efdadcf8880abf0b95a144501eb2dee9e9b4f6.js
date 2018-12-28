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
const common_1 = require("@nestjs/common");
const base_service_1 = require("../shared/base.service");
const category_model_1 = require("./models/category.model");
const mongoose_1 = require("@nestjs/mongoose");
const mapper_service_1 = require("../shared/mapper/mapper.service");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService extends base_service_1.BaseService {
    constructor(_categoryModel, _mapperService) {
        super();
        this._categoryModel = _categoryModel;
        this._mapperService = _mapperService;
        this._model = _categoryModel;
        this._mapper = _mapperService.mapper;
    }
    onCreateCategory(categoryParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCategory = new this._model();
            newCategory.name = categoryParams.name;
            newCategory.thumbnail = categoryParams.thumbnail;
            newCategory.parent =
                categoryParams.parent && categoryParams.parent != null
                    ? mongoose_2.Types.ObjectId(categoryParams.parent)
                    : null;
            newCategory.description = categoryParams.description;
            console.log('onCreateCategory() Fired');
            try {
                const result = yield this.create(newCategory);
                const categoryVm = yield this.map(result.toJSON());
                return categoryVm;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(category_model_1.Category.modelName)),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9jYXRlZ29yeS9jYXRlZ29yeS5zZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL2NhdGVnb3J5L2NhdGVnb3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUF1RTtBQUN2RSx5REFBcUQ7QUFDckQsNERBQW1EO0FBQ25ELCtDQUErQztBQUUvQyxvRUFBZ0U7QUFHaEUsdUNBQWlDO0FBR2pDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsMEJBQXFCO0lBQ3hELFlBRW1CLGNBQW1DLEVBQ25DLGNBQTZCO1FBRTlDLEtBQUssRUFBRSxDQUFDO1FBSFMsbUJBQWMsR0FBZCxjQUFjLENBQXFCO1FBQ25DLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBRzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDO0lBRUssZ0JBQWdCLENBQUMsY0FBOEI7O1lBQ25ELE1BQU0sV0FBVyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXRDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztZQUN2QyxXQUFXLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDakQsV0FBVyxDQUFDLE1BQU07Z0JBQ2hCLGNBQWMsQ0FBQyxNQUFNLElBQUksY0FBYyxDQUFDLE1BQU0sSUFBSSxJQUFJO29CQUNwRCxDQUFDLENBQUMsZ0JBQUssQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNYLFdBQVcsQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQztZQUVyRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFFeEMsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBYSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFFL0QsT0FBTyxVQUFVLENBQUM7YUFDbkI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLElBQUksc0JBQWEsQ0FBQyxDQUFDLEVBQUUsbUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQztLQUFBO0NBQ0YsQ0FBQTtBQWpDWSxlQUFlO0lBRDNCLG1CQUFVLEVBQUU7SUFHUixXQUFBLHNCQUFXLENBQUMseUJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTs2Q0FFQyw4QkFBYTtHQUpyQyxlQUFlLENBaUMzQjtBQWpDWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEh0dHBFeGNlcHRpb24sIEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tICcuL21vZGVscy9jYXRlZ29yeS5tb2RlbCc7XG5pbXBvcnQgeyBJbmplY3RNb2RlbCB9IGZyb20gJ0BuZXN0anMvbW9uZ29vc2UnO1xuaW1wb3J0IHsgTW9kZWxUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCB7IE1hcHBlclNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbWFwcGVyL21hcHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IENhdGVnb3J5UGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvY2F0ZWdvcnktcGFyYW1zLm1vZGVsJztcbmltcG9ydCB7IENhdGVnb3J5Vm0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9jYXRlZ29yeS12bS5tb2RlbCc7XG5pbXBvcnQgeyBUeXBlcyB9IGZyb20gJ21vbmdvb3NlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhdGVnb3J5U2VydmljZSBleHRlbmRzIEJhc2VTZXJ2aWNlPENhdGVnb3J5PiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3RNb2RlbChDYXRlZ29yeS5tb2RlbE5hbWUpXG4gICAgcHJpdmF0ZSByZWFkb25seSBfY2F0ZWdvcnlNb2RlbDogTW9kZWxUeXBlPENhdGVnb3J5PixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tYXBwZXJTZXJ2aWNlOiBNYXBwZXJTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX21vZGVsID0gX2NhdGVnb3J5TW9kZWw7XG4gICAgdGhpcy5fbWFwcGVyID0gX21hcHBlclNlcnZpY2UubWFwcGVyO1xuICB9XG5cbiAgYXN5bmMgb25DcmVhdGVDYXRlZ29yeShjYXRlZ29yeVBhcmFtczogQ2F0ZWdvcnlQYXJhbXMpOiBQcm9taXNlPENhdGVnb3J5Vm0+IHtcbiAgICBjb25zdCBuZXdDYXRlZ29yeSA9IG5ldyB0aGlzLl9tb2RlbCgpO1xuXG4gICAgbmV3Q2F0ZWdvcnkubmFtZSA9IGNhdGVnb3J5UGFyYW1zLm5hbWU7XG4gICAgbmV3Q2F0ZWdvcnkudGh1bWJuYWlsID0gY2F0ZWdvcnlQYXJhbXMudGh1bWJuYWlsO1xuICAgIG5ld0NhdGVnb3J5LnBhcmVudCA9XG4gICAgICBjYXRlZ29yeVBhcmFtcy5wYXJlbnQgJiYgY2F0ZWdvcnlQYXJhbXMucGFyZW50ICE9IG51bGxcbiAgICAgICAgPyBUeXBlcy5PYmplY3RJZChjYXRlZ29yeVBhcmFtcy5wYXJlbnQpXG4gICAgICAgIDogbnVsbDtcbiAgICBuZXdDYXRlZ29yeS5kZXNjcmlwdGlvbiA9IGNhdGVnb3J5UGFyYW1zLmRlc2NyaXB0aW9uO1xuXG4gICAgY29uc29sZS5sb2coJ29uQ3JlYXRlQ2F0ZWdvcnkoKSBGaXJlZCcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY3JlYXRlKG5ld0NhdGVnb3J5KTtcbiAgICAgIGNvbnN0IGNhdGVnb3J5Vm0gPSBhd2FpdCB0aGlzLm1hcDxDYXRlZ29yeVZtPihyZXN1bHQudG9KU09OKCkpO1xuXG4gICAgICByZXR1cm4gY2F0ZWdvcnlWbTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLklOVEVSTkFMX1NFUlZFUl9FUlJPUik7XG4gICAgfVxuICB9XG59XG4iXX0=