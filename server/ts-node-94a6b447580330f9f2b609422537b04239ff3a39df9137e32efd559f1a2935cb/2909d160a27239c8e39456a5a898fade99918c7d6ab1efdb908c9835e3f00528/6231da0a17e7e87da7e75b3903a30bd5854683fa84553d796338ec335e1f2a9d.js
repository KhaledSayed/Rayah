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
const swagger_1 = require("@nestjs/swagger");
const api_exception_model_1 = require("../shared/api-exception.model");
const get_operation_id_1 = require("../shared/utilities/get-operation-id");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const user_role_enum_1 = require("../user/models/user-role.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../shared/guards/roles.guard");
const to_int_pipe_1 = require("../shared/pipes/to-int.pipe");
const lodash_1 = require("lodash");
const review_vm_model_1 = require("./models/view-models/review-vm.model");
const review_model_1 = require("./models/review.model");
const product_service_1 = require("product/product.service");
const review_service_1 = require("./review.service");
const mongoose_1 = require("mongoose");
const review_param_model_1 = require("./models/view-models/review-param.model");
let ReviewController = class ReviewController {
    constructor(_productService, reviewService) {
        this._productService = _productService;
        this.reviewService = reviewService;
    }
    getProductReviews(page, perPage, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDetails = yield this._productService.findById(product);
            if (productDetails == null) {
                throw new common_1.HttpException('Resource not found', common_1.HttpStatus.NOT_FOUND);
            }
            const reviews = yield this.reviewService.findAll({ product: mongoose_1.Types.ObjectId(product) }, ['reviewer', '-password'], page, perPage);
            const reviewsVm = this.reviewService.map(lodash_1.map(reviews, review => {
                let finalReview = review.toJSON();
                console.log(review);
                return finalReview;
            }), true);
            const reviewers = [];
            return reviewsVm.then(items => {
                items.forEach(item => {
                    let user = item.reviewer;
                    let finalUser = lodash_1.omit(user, ['password']);
                    item.reviewer = finalUser;
                    reviewers.push(item);
                });
                return reviewers;
            });
        });
    }
    addReview(request, reviewParam, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDetails = yield this._productService.findById(product);
            if (productDetails == null) {
                throw new common_1.HttpException('Resource not found', common_1.HttpStatus.NOT_FOUND);
            }
            const review = yield this.reviewService.onCreateReview(reviewParam, request.user, product);
            return review;
        });
    }
};
__decorate([
    common_1.Get(':product'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.OK, type: review_vm_model_1.ReviewVm, isArray: true }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(review_model_1.Review.modelName, 'List')),
    swagger_1.ApiImplicitParam({ name: 'product', required: true }),
    swagger_1.ApiImplicitQuery({
        name: 'page',
        required: true,
        type: Number,
    }),
    swagger_1.ApiImplicitQuery({ name: 'perPage', required: true, type: Number }),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.User),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Query('page', new to_int_pipe_1.ToInt())),
    __param(1, common_1.Query('perPage', new to_int_pipe_1.ToInt())),
    __param(2, common_1.Param('product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getProductReviews", null);
__decorate([
    common_1.Post(':product'),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.CREATED, type: review_vm_model_1.ReviewVm, isArray: false }),
    swagger_1.ApiResponse({ status: common_1.HttpStatus.BAD_REQUEST, type: api_exception_model_1.ApiException }),
    swagger_1.ApiOperation(get_operation_id_1.GetOperationId(review_model_1.Review.modelName, 'Item')),
    swagger_1.ApiImplicitParam({ name: 'product', required: true }),
    roles_decorator_1.Roles(user_role_enum_1.UserRole.User),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param('product')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, review_param_model_1.ReviewParam, String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "addReview", null);
ReviewController = __decorate([
    common_1.Controller('review'),
    swagger_1.ApiUseTags(review_model_1.Review.modelName),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        review_service_1.ReviewService])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvcmV2aWV3LmNvbnRyb2xsZXIudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvcmV2aWV3L3Jldmlldy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FXd0I7QUFDeEIsNkNBT3lCO0FBRXpCLHVFQUE2RDtBQUM3RCwyRUFBc0U7QUFFdEUsMEVBQTZEO0FBQzdELGtFQUF5RDtBQUN6RCwrQ0FBNkM7QUFDN0MsOERBQTBEO0FBQzFELDZEQUFvRDtBQUNwRCxtQ0FBbUM7QUFDbkMsMEVBQWdFO0FBQ2hFLHdEQUErQztBQUMvQyw2REFBeUQ7QUFDekQscURBQWlEO0FBRWpELHVDQUFpQztBQUVqQyxnRkFBc0U7QUFLdEUsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFDM0IsWUFDbUIsZUFBK0IsRUFDL0IsYUFBNEI7UUFENUIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQzVDLENBQUM7SUFlRSxpQkFBaUIsQ0FDTyxJQUFZLEVBQ1QsT0FBZSxFQUM1QixPQUFlOztZQUlqQyxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBR3BFLElBQUksY0FBYyxJQUFJLElBQUksRUFBRTtnQkFDMUIsTUFBTSxJQUFJLHNCQUFhLENBQUMsb0JBQW9CLEVBQUUsbUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNyRTtZQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQzlDLEVBQUUsT0FBTyxFQUFFLGdCQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQ3BDLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxFQUN6QixJQUFJLEVBQ0os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LHFCQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsbUJBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLDBCQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzNFLHFCQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsbUJBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLGtDQUFZLEVBQUUsQ0FBQztJQUNuRSxzQkFBWSxDQUFDLGlDQUFjLENBQUMscUJBQU0sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEQsMEJBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyRCx1QkFBSyxDQUFDLHlCQUFRLENBQUMsSUFBSSxDQUFDO0lBQ3BCLGtCQUFTLENBQUMsb0JBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSx3QkFBVSxDQUFDO0lBRXJDLFdBQUEsWUFBRyxFQUFFLENBQUE7SUFDTCxXQUFBLGFBQUksRUFBRSxDQUFBO0lBQ04sV0FBQSxjQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7OzZDQURJLGdDQUFXOztpREFpQmpDO0FBMUZVLGdCQUFnQjtJQUg1QixtQkFBVSxDQUFDLFFBQVEsQ0FBQztJQUNwQixvQkFBVSxDQUFDLHFCQUFNLENBQUMsU0FBUyxDQUFDO0lBQzVCLHVCQUFhLEVBQUU7cUNBR3NCLGdDQUFjO1FBQ2hCLDhCQUFhO0dBSHBDLGdCQUFnQixDQTJGNUI7QUEzRlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29udHJvbGxlcixcbiAgR2V0LFxuICBIdHRwU3RhdHVzLFxuICBVc2VHdWFyZHMsXG4gIFF1ZXJ5LFxuICBQYXJhbSxcbiAgSHR0cEV4Y2VwdGlvbixcbiAgUG9zdCxcbiAgUmVxLFxuICBCb2R5LFxufSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQge1xuICBBcGlSZXNwb25zZSxcbiAgQXBpT3BlcmF0aW9uLFxuICBBcGlJbXBsaWNpdFF1ZXJ5LFxuICBBcGlJbXBsaWNpdFBhcmFtLFxuICBBcGlVc2VUYWdzLFxuICBBcGlCZWFyZXJBdXRoLFxufSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgVXNlclZNIH0gZnJvbSAnLi4vdXNlci9tb2RlbHMvdmlldy1tb2RlbHMvdXNlci12bS5tb2RlbCc7XG5pbXBvcnQgeyBBcGlFeGNlcHRpb24gfSBmcm9tICcuLi9zaGFyZWQvYXBpLWV4Y2VwdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBHZXRPcGVyYXRpb25JZCB9IGZyb20gJy4uL3NoYXJlZC91dGlsaXRpZXMvZ2V0LW9wZXJhdGlvbi1pZCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vdXNlci9tb2RlbHMvdXNlci5tb2RlbCc7XG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL3NoYXJlZC9kZWNvcmF0b3JzL3JvbGVzLmRlY29yYXRvcic7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4uL3VzZXIvbW9kZWxzL3VzZXItcm9sZS5lbnVtJztcbmltcG9ydCB7IEF1dGhHdWFyZCB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL3NoYXJlZC9ndWFyZHMvcm9sZXMuZ3VhcmQnO1xuaW1wb3J0IHsgVG9JbnQgfSBmcm9tICcuLi9zaGFyZWQvcGlwZXMvdG8taW50LnBpcGUnO1xuaW1wb3J0IHsgbWFwLCBvbWl0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IFJldmlld1ZtIH0gZnJvbSAnLi9tb2RlbHMvdmlldy1tb2RlbHMvcmV2aWV3LXZtLm1vZGVsJztcbmltcG9ydCB7IFJldmlldyB9IGZyb20gJy4vbW9kZWxzL3Jldmlldy5tb2RlbCc7XG5pbXBvcnQgeyBQcm9kdWN0U2VydmljZSB9IGZyb20gJ3Byb2R1Y3QvcHJvZHVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IFJldmlld1NlcnZpY2UgfSBmcm9tICcuL3Jldmlldy5zZXJ2aWNlJztcbmltcG9ydCB7IGFzeW5jIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9zY2hlZHVsZXIvYXN5bmMnO1xuaW1wb3J0IHsgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyBSZXZpZXdQYXJhbSB9IGZyb20gJy4vbW9kZWxzL3ZpZXctbW9kZWxzL3Jldmlldy1wYXJhbS5tb2RlbCc7XG5cbkBDb250cm9sbGVyKCdyZXZpZXcnKVxuQEFwaVVzZVRhZ3MoUmV2aWV3Lm1vZGVsTmFtZSlcbkBBcGlCZWFyZXJBdXRoKClcbmV4cG9ydCBjbGFzcyBSZXZpZXdDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBfcHJvZHVjdFNlcnZpY2U6IFByb2R1Y3RTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmV2aWV3U2VydmljZTogUmV2aWV3U2VydmljZSxcbiAgKSB7fVxuXG4gIEBHZXQoJzpwcm9kdWN0JylcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLk9LLCB0eXBlOiBSZXZpZXdWbSwgaXNBcnJheTogdHJ1ZSB9KVxuICBAQXBpUmVzcG9uc2UoeyBzdGF0dXM6IEh0dHBTdGF0dXMuQkFEX1JFUVVFU1QsIHR5cGU6IEFwaUV4Y2VwdGlvbiB9KVxuICBAQXBpT3BlcmF0aW9uKEdldE9wZXJhdGlvbklkKFJldmlldy5tb2RlbE5hbWUsICdMaXN0JykpXG4gIEBBcGlJbXBsaWNpdFBhcmFtKHsgbmFtZTogJ3Byb2R1Y3QnLCByZXF1aXJlZDogdHJ1ZSB9KVxuICBAQXBpSW1wbGljaXRRdWVyeSh7XG4gICAgbmFtZTogJ3BhZ2UnLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIHR5cGU6IE51bWJlcixcbiAgfSlcbiAgQEFwaUltcGxpY2l0UXVlcnkoeyBuYW1lOiAncGVyUGFnZScsIHJlcXVpcmVkOiB0cnVlLCB0eXBlOiBOdW1iZXIgfSlcbiAgQFJvbGVzKFVzZXJSb2xlLlVzZXIpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgZ2V0UHJvZHVjdFJldmlld3MoXG4gICAgQFF1ZXJ5KCdwYWdlJywgbmV3IFRvSW50KCkpIHBhZ2U6IG51bWJlcixcbiAgICBAUXVlcnkoJ3BlclBhZ2UnLCBuZXcgVG9JbnQoKSkgcGVyUGFnZTogbnVtYmVyLFxuICAgIEBQYXJhbSgncHJvZHVjdCcpIHByb2R1Y3Q6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXZpZXdWbVtdPiB7XG4gICAgLy8gaWYgcHJvZHVjdCBpcyB2YWxpZFxuXG4gICAgY29uc3QgcHJvZHVjdERldGFpbHMgPSBhd2FpdCB0aGlzLl9wcm9kdWN0U2VydmljZS5maW5kQnlJZChwcm9kdWN0KTtcbiAgICAvL2ZpbmQgYWxsIGR1ZSB0byBxdWVyeVxuXG4gICAgaWYgKHByb2R1Y3REZXRhaWxzID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBIdHRwRXhjZXB0aW9uKCdSZXNvdXJjZSBub3QgZm91bmQnLCBIdHRwU3RhdHVzLk5PVF9GT1VORCk7XG4gICAgfVxuICAgIGNvbnN0IHJldmlld3MgPSBhd2FpdCB0aGlzLnJldmlld1NlcnZpY2UuZmluZEFsbChcbiAgICAgIHsgcHJvZHVjdDogVHlwZXMuT2JqZWN0SWQocHJvZHVjdCkgfSxcbiAgICAgIFsncmV2aWV3ZXInLCAnLXBhc3N3b3JkJ10sXG4gICAgICBwYWdlLFxuICAgICAgcGVyUGFnZSxcbiAgICApO1xuXG4gICAgY29uc3QgcmV2aWV3c1ZtID0gdGhpcy5yZXZpZXdTZXJ2aWNlLm1hcDxSZXZpZXdWbVtdPihcbiAgICAgIG1hcChyZXZpZXdzLCByZXZpZXcgPT4ge1xuICAgICAgICBsZXQgZmluYWxSZXZpZXcgPSByZXZpZXcudG9KU09OKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJldmlldyk7XG4gICAgICAgIHJldHVybiBmaW5hbFJldmlldztcbiAgICAgIH0pLFxuICAgICAgdHJ1ZSxcbiAgICApO1xuXG4gICAgY29uc3QgcmV2aWV3ZXJzOiBSZXZpZXdWbVtdID0gW107XG5cbiAgICByZXR1cm4gcmV2aWV3c1ZtLnRoZW4oaXRlbXMgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgbGV0IHVzZXIgPSBpdGVtLnJldmlld2VyO1xuICAgICAgICBsZXQgZmluYWxVc2VyID0gb21pdCh1c2VyLCBbJ3Bhc3N3b3JkJ10pO1xuICAgICAgICBpdGVtLnJldmlld2VyID0gZmluYWxVc2VyO1xuICAgICAgICByZXZpZXdlcnMucHVzaChpdGVtKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmV2aWV3ZXJzO1xuICAgIH0pO1xuXG4gICAgLy8gY29uc29sZS5sb2cocmV2aWV3c1ZtKTtcbiAgfVxuXG4gIEBQb3N0KCc6cHJvZHVjdCcpXG4gIEBBcGlSZXNwb25zZSh7IHN0YXR1czogSHR0cFN0YXR1cy5DUkVBVEVELCB0eXBlOiBSZXZpZXdWbSwgaXNBcnJheTogZmFsc2UgfSlcbiAgQEFwaVJlc3BvbnNlKHsgc3RhdHVzOiBIdHRwU3RhdHVzLkJBRF9SRVFVRVNULCB0eXBlOiBBcGlFeGNlcHRpb24gfSlcbiAgQEFwaU9wZXJhdGlvbihHZXRPcGVyYXRpb25JZChSZXZpZXcubW9kZWxOYW1lLCAnSXRlbScpKVxuICBAQXBpSW1wbGljaXRQYXJhbSh7IG5hbWU6ICdwcm9kdWN0JywgcmVxdWlyZWQ6IHRydWUgfSlcbiAgQFJvbGVzKFVzZXJSb2xlLlVzZXIpXG4gIEBVc2VHdWFyZHMoQXV0aEd1YXJkKCdqd3QnKSwgUm9sZXNHdWFyZClcbiAgYXN5bmMgYWRkUmV2aWV3KFxuICAgIEBSZXEoKSByZXF1ZXN0LFxuICAgIEBCb2R5KCkgcmV2aWV3UGFyYW06IFJldmlld1BhcmFtLFxuICAgIEBQYXJhbSgncHJvZHVjdCcpIHByb2R1Y3Q6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxSZXZpZXdWbT4ge1xuICAgIGNvbnN0IHByb2R1Y3REZXRhaWxzID0gYXdhaXQgdGhpcy5fcHJvZHVjdFNlcnZpY2UuZmluZEJ5SWQocHJvZHVjdCk7XG4gICAgLy9maW5kIGFsbCBkdWUgdG8gcXVlcnlcblxuICAgIGlmIChwcm9kdWN0RGV0YWlscyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgSHR0cEV4Y2VwdGlvbignUmVzb3VyY2Ugbm90IGZvdW5kJywgSHR0cFN0YXR1cy5OT1RfRk9VTkQpO1xuICAgIH1cblxuICAgIGNvbnN0IHJldmlldyA9IGF3YWl0IHRoaXMucmV2aWV3U2VydmljZS5vbkNyZWF0ZVJldmlldyhcbiAgICAgIHJldmlld1BhcmFtLFxuICAgICAgcmVxdWVzdC51c2VyLFxuICAgICAgcHJvZHVjdCxcbiAgICApO1xuXG4gICAgcmV0dXJuIHJldmlldztcbiAgfVxufVxuIl19