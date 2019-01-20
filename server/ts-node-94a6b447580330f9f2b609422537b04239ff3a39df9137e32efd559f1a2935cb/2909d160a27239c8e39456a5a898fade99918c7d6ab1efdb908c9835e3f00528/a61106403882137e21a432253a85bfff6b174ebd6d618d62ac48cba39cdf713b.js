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
const slider_model_1 = require("./models/slider.model");
const mongoose_1 = require("@nestjs/mongoose");
const mapper_service_1 = require("../shared/mapper/mapper.service");
const mongoose_2 = require("mongoose");
let SliderService = class SliderService extends base_service_1.BaseService {
    constructor(_sliderModel, _mapperService) {
        super();
        this._sliderModel = _sliderModel;
        this._mapperService = _mapperService;
        this._model = this._sliderModel;
        this._mapper = this._mapperService.mapper;
    }
    onCreateSlider(sliderParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const slider = new this._model();
            slider.banner = sliderParams.banner;
            slider.type = sliderParams.type;
            slider.item = mongoose_2.Types.ObjectId(sliderParams.item);
            try {
                const newSlider = yield this.create(slider);
                return yield this.map(newSlider.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    onUpdateSlider(slider, sliderParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, item } = sliderParams;
            slider.type = type;
            slider.item = mongoose_2.Types.ObjectId(item);
            try {
                const updatedSlider = yield this.update(slider._id, slider);
                return yield this.map(updatedSlider.toJSON());
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
SliderService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(slider_model_1.Slider.modelName)),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService])
], SliderService);
exports.SliderService = SliderService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvc2xpZGVyLnNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvc2xpZGVyL3NsaWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBdUU7QUFDdkUseURBQXFEO0FBQ3JELHdEQUErQztBQUMvQywrQ0FBK0M7QUFFL0Msb0VBQWdFO0FBRWhFLHVDQUFpQztBQUtqQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsMEJBQW1CO0lBQ3BELFlBRW1CLFlBQStCLEVBQy9CLGNBQTZCO1FBRTlDLEtBQUssRUFBRSxDQUFDO1FBSFMsaUJBQVksR0FBWixZQUFZLENBQW1CO1FBQy9CLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBRzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQzVDLENBQUM7SUFFSyxjQUFjLENBQUMsWUFBMEI7O1lBQzdDLE1BQU0sTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxNQUFNLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDaEMsTUFBTSxDQUFDLElBQUksR0FBRyxnQkFBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFaEQsSUFBSTtnQkFDRixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTVDLE9BQU8sTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFXLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3JEO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsTUFBTSxJQUFJLHNCQUFhLENBQUMsQ0FBQyxFQUFFLG1CQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM5RDtRQUNILENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxNQUFNLEVBQUUsWUFBMEI7O1lBQ3JELE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsWUFBWSxDQUFDO1lBRXBDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxJQUFJLEdBQUcsZ0JBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFbkMsSUFBSTtnQkFDRixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFNUQsT0FBTyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQVcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDekQ7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLElBQUksc0JBQWEsQ0FBQyxDQUFDLEVBQUUsbUJBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzlEO1FBQ0gsQ0FBQztLQUFBO0NBQ0YsQ0FBQTtBQXpDWSxhQUFhO0lBRHpCLG1CQUFVLEVBQUU7SUFHUixXQUFBLHNCQUFXLENBQUMscUJBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTs2Q0FFRyw4QkFBYTtHQUpyQyxhQUFhLENBeUN6QjtBQXpDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEh0dHBFeGNlcHRpb24sIEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBCYXNlU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2xpZGVyIH0gZnJvbSAnLi9tb2RlbHMvc2xpZGVyLm1vZGVsJztcbmltcG9ydCB7IEluamVjdE1vZGVsIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBNb2RlbFR5cGUgfSBmcm9tICd0eXBlZ29vc2UnO1xuaW1wb3J0IHsgTWFwcGVyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9tYXBwZXIvbWFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2xpZGVyUGFyYW1zIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvc2xpZGVyLXBhcmFtLm1vZGVsJztcbmltcG9ydCB7IFR5cGVzIH0gZnJvbSAnbW9uZ29vc2UnO1xuaW1wb3J0IHsgU2xpZGVyVm0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9zbGlkZXItdm0ubW9kZWwnO1xuaW1wb3J0IHsgQnJhbmRWbSB9IGZyb20gJy4uL2JyYW5kL21vZGVscy92aWV3LW1vZGVscy9icmFuZC12bS5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTbGlkZXJTZXJ2aWNlIGV4dGVuZHMgQmFzZVNlcnZpY2U8U2xpZGVyPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3RNb2RlbChTbGlkZXIubW9kZWxOYW1lKVxuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NsaWRlck1vZGVsOiBNb2RlbFR5cGU8U2xpZGVyPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9tYXBwZXJTZXJ2aWNlOiBNYXBwZXJTZXJ2aWNlLFxuICApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX21vZGVsID0gdGhpcy5fc2xpZGVyTW9kZWw7XG4gICAgdGhpcy5fbWFwcGVyID0gdGhpcy5fbWFwcGVyU2VydmljZS5tYXBwZXI7XG4gIH1cblxuICBhc3luYyBvbkNyZWF0ZVNsaWRlcihzbGlkZXJQYXJhbXM6IFNsaWRlclBhcmFtcyk6IFByb21pc2U8U2xpZGVyVm0+IHtcbiAgICBjb25zdCBzbGlkZXIgPSBuZXcgdGhpcy5fbW9kZWwoKTtcblxuICAgIHNsaWRlci5iYW5uZXIgPSBzbGlkZXJQYXJhbXMuYmFubmVyO1xuICAgIHNsaWRlci50eXBlID0gc2xpZGVyUGFyYW1zLnR5cGU7XG4gICAgc2xpZGVyLml0ZW0gPSBUeXBlcy5PYmplY3RJZChzbGlkZXJQYXJhbXMuaXRlbSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbmV3U2xpZGVyID0gYXdhaXQgdGhpcy5jcmVhdGUoc2xpZGVyKTtcblxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMubWFwPFNsaWRlclZtPihuZXdTbGlkZXIudG9KU09OKCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKGUsIEh0dHBTdGF0dXMuSU5URVJOQUxfU0VSVkVSX0VSUk9SKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBvblVwZGF0ZVNsaWRlcihzbGlkZXIsIHNsaWRlclBhcmFtczogU2xpZGVyUGFyYW1zKTogUHJvbWlzZTxTbGlkZXJWbT4ge1xuICAgIGNvbnN0IHsgdHlwZSwgaXRlbSB9ID0gc2xpZGVyUGFyYW1zO1xuXG4gICAgc2xpZGVyLnR5cGUgPSB0eXBlO1xuICAgIHNsaWRlci5pdGVtID0gVHlwZXMuT2JqZWN0SWQoaXRlbSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXBkYXRlZFNsaWRlciA9IGF3YWl0IHRoaXMudXBkYXRlKHNsaWRlci5faWQsIHNsaWRlcik7XG5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLm1hcDxTbGlkZXJWbT4odXBkYXRlZFNsaWRlci50b0pTT04oKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oZSwgSHR0cFN0YXR1cy5JTlRFUk5BTF9TRVJWRVJfRVJST1IpO1xuICAgIH1cbiAgfVxufVxuIl19