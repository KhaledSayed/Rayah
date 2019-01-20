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
const review_model_1 = require("./models/review.model");
const base_service_1 = require("../shared/base.service");
const mongoose_1 = require("@nestjs/mongoose");
const mapper_service_1 = require("shared/mapper/mapper.service");
const mongoose_2 = require("mongoose");
let ReviewService = class ReviewService extends base_service_1.BaseService {
    constructor(_reviewModel, _mapperService) {
        super();
        this._mapperService = _mapperService;
        this._mapper = this._mapperService.mapper;
        this._model = _reviewModel;
    }
    onCreateReview(reviewParams, user, product) {
        return __awaiter(this, void 0, void 0, function* () {
            let newReview = new this._model();
            newReview.reviewer = mongoose_2.Types.ObjectId(user.id);
            newReview.stars = reviewParams.stars;
            newReview.description = reviewParams.description;
            newReview.product = mongoose_2.Types.ObjectId(product);
            try {
                const result = yield this.create(newReview);
                const reviewVm = yield this.map(result.toJSON());
                return reviewVm;
            }
            catch (e) {
                throw new common_1.HttpException(e, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    productRatingAverage(product) {
        return __awaiter(this, void 0, void 0, function* () {
            let reviews = yield this.findAll({ product: product });
            let sum = 0;
            reviews.forEach(item => {
                sum += item.stars;
            });
            return reviews.length != 0
                ? { rate: sum / reviews.length, length: reviews.length }
                : { rate: 0, length: 0 };
        });
    }
};
ReviewService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(review_model_1.Review.modelName)),
    __metadata("design:paramtypes", [Object, mapper_service_1.MapperService])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvcmV2aWV3LnNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvcmV2aWV3L3Jldmlldy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBdUU7QUFDdkUsd0RBQStDO0FBQy9DLHlEQUFxRDtBQUNyRCwrQ0FBK0M7QUFFL0MsaUVBQTZEO0FBTTdELHVDQUFpQztBQUlqQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFjLFNBQVEsMEJBQW1CO0lBQ3BELFlBQ2lDLFlBQStCLEVBQzdDLGNBQTZCO1FBRTlDLEtBQUssRUFBRSxDQUFDO1FBRlMsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFHOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUssY0FBYyxDQUNsQixZQUF5QixFQUN6QixJQUFZLEVBQ1osT0FBZTs7WUFFZixJQUFJLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVsQyxTQUFTLENBQUMsUUFBUSxHQUFHLGdCQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3QyxTQUFTLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDckMsU0FBUyxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDO1lBQ2pELFNBQVMsQ0FBQyxPQUFPLEdBQUcsZ0JBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUMsSUFBSTtnQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBVyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztnQkFDM0QsT0FBTyxRQUFRLENBQUM7YUFDakI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixNQUFNLElBQUksc0JBQWEsQ0FBQyxDQUFDLEVBQUUsbUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNwRDtRQUNILENBQUM7S0FBQTtJQUVLLG9CQUFvQixDQUFDLE9BQWU7O1lBQ3hDLElBQUksT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUVaLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDeEQsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBO0NBQ0YsQ0FBQTtBQTNDWSxhQUFhO0lBRHpCLG1CQUFVLEVBQUU7SUFHUixXQUFBLHNCQUFXLENBQUMscUJBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTs2Q0FDRyw4QkFBYTtHQUhyQyxhQUFhLENBMkN6QjtBQTNDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEh0dHBFeGNlcHRpb24sIEh0dHBTdGF0dXMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBSZXZpZXcgfSBmcm9tICcuL21vZGVscy9yZXZpZXcubW9kZWwnO1xuaW1wb3J0IHsgQmFzZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IEluamVjdE1vZGVsIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBNb2RlbFR5cGUgfSBmcm9tICd0eXBlZ29vc2UnO1xuaW1wb3J0IHsgTWFwcGVyU2VydmljZSB9IGZyb20gJ3NoYXJlZC9tYXBwZXIvbWFwcGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmV2aWV3UGFyYW0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9yZXZpZXctcGFyYW0ubW9kZWwnO1xuaW1wb3J0IHsgUmV2aWV3Vm0gfSBmcm9tICcuL21vZGVscy92aWV3LW1vZGVscy9yZXZpZXctdm0ubW9kZWwnO1xuaW1wb3J0IHsgT2JqZWN0SUQgfSBmcm9tICdic29uJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICd1c2VyL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IFVzZXJWTSB9IGZyb20gJ3VzZXIvbW9kZWxzL3ZpZXctbW9kZWxzL3VzZXItdm0ubW9kZWwnO1xuaW1wb3J0IHsgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBSYXRpbmcgfSBmcm9tICdwcm9kdWN0L21vZGVscy92aWV3LW1vZGVscy9wcm9kdWN0LXZtLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJldmlld1NlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZTxSZXZpZXc+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdE1vZGVsKFJldmlldy5tb2RlbE5hbWUpIF9yZXZpZXdNb2RlbDogTW9kZWxUeXBlPFJldmlldz4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBfbWFwcGVyU2VydmljZTogTWFwcGVyU2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9tYXBwZXIgPSB0aGlzLl9tYXBwZXJTZXJ2aWNlLm1hcHBlcjtcbiAgICB0aGlzLl9tb2RlbCA9IF9yZXZpZXdNb2RlbDtcbiAgfVxuXG4gIGFzeW5jIG9uQ3JlYXRlUmV2aWV3KFxuICAgIHJldmlld1BhcmFtczogUmV2aWV3UGFyYW0sXG4gICAgdXNlcjogVXNlclZNLFxuICAgIHByb2R1Y3Q6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXZpZXdWbT4ge1xuICAgIGxldCBuZXdSZXZpZXcgPSBuZXcgdGhpcy5fbW9kZWwoKTtcblxuICAgIG5ld1Jldmlldy5yZXZpZXdlciA9IFR5cGVzLk9iamVjdElkKHVzZXIuaWQpO1xuICAgIG5ld1Jldmlldy5zdGFycyA9IHJldmlld1BhcmFtcy5zdGFycztcbiAgICBuZXdSZXZpZXcuZGVzY3JpcHRpb24gPSByZXZpZXdQYXJhbXMuZGVzY3JpcHRpb247XG4gICAgbmV3UmV2aWV3LnByb2R1Y3QgPSBUeXBlcy5PYmplY3RJZChwcm9kdWN0KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmNyZWF0ZShuZXdSZXZpZXcpO1xuICAgICAgY29uc3QgcmV2aWV3Vm0gPSBhd2FpdCB0aGlzLm1hcDxSZXZpZXdWbT4ocmVzdWx0LnRvSlNPTigpKTtcbiAgICAgIHJldHVybiByZXZpZXdWbTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbihlLCBIdHRwU3RhdHVzLkJBRF9SRVFVRVNUKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBwcm9kdWN0UmF0aW5nQXZlcmFnZShwcm9kdWN0OiBzdHJpbmcpOiBQcm9taXNlPFJhdGluZz4ge1xuICAgIGxldCByZXZpZXdzID0gYXdhaXQgdGhpcy5maW5kQWxsKHsgcHJvZHVjdDogcHJvZHVjdCB9KTtcbiAgICBsZXQgc3VtID0gMDtcblxuICAgIHJldmlld3MuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHN1bSArPSBpdGVtLnN0YXJzO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJldmlld3MubGVuZ3RoICE9IDBcbiAgICAgID8geyByYXRlOiBzdW0gLyByZXZpZXdzLmxlbmd0aCwgbGVuZ3RoOiByZXZpZXdzLmxlbmd0aCB9XG4gICAgICA6IHsgcmF0ZTogMCwgbGVuZ3RoOiAwIH07XG4gIH1cbn1cbiJdfQ==