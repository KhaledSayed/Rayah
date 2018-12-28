"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const review_controller_1 = require("./review.controller");
const review_service_1 = require("./review.service");
let ReviewModule = class ReviewModule {
};
ReviewModule = __decorate([
    common_1.Module({
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService]
    })
], ReviewModule);
exports.ReviewModule = ReviewModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvcmV2aWV3Lm1vZHVsZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9yZXZpZXcvcmV2aWV3Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QywyREFBdUQ7QUFDdkQscURBQWlEO0FBTWpELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FBRyxDQUFBO0FBQWYsWUFBWTtJQUp4QixlQUFNLENBQUM7UUFDTixXQUFXLEVBQUUsQ0FBQyxvQ0FBZ0IsQ0FBQztRQUMvQixTQUFTLEVBQUUsQ0FBQyw4QkFBYSxDQUFDO0tBQzNCLENBQUM7R0FDVyxZQUFZLENBQUc7QUFBZixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJldmlld0NvbnRyb2xsZXIgfSBmcm9tICcuL3Jldmlldy5jb250cm9sbGVyJztcbmltcG9ydCB7IFJldmlld1NlcnZpY2UgfSBmcm9tICcuL3Jldmlldy5zZXJ2aWNlJztcblxuQE1vZHVsZSh7XG4gIGNvbnRyb2xsZXJzOiBbUmV2aWV3Q29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1Jldmlld1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFJldmlld01vZHVsZSB7fVxuIl19