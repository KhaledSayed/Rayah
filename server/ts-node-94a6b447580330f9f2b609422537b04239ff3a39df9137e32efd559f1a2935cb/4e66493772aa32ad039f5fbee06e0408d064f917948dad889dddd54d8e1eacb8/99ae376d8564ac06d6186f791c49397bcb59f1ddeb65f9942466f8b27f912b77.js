"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const configuration_service_1 = require("./configuration/configuration.service");
const mapper_service_1 = require("./mapper/mapper.service");
const auth_service_1 = require("./auth/auth.service");
const jwt_strategy_service_1 = require("./auth/stratgies/jwt-strategy.service");
const user_module_1 = require("../user/user.module");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [
            configuration_service_1.ConfigurationService,
            mapper_service_1.MapperService,
            auth_service_1.AuthService,
            jwt_strategy_service_1.JwtStrategyService,
        ],
        exports: [configuration_service_1.ConfigurationService, mapper_service_1.MapperService, auth_service_1.AuthService],
        imports: [user_module_1.UserModule],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDJDQUFnRDtBQUNoRCxpRkFBNkU7QUFDN0UsNERBQXdEO0FBQ3hELHNEQUFrRDtBQUNsRCxnRkFBMkU7QUFDM0UscURBQWlEO0FBZWpELElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7Q0FBRyxDQUFBO0FBQWYsWUFBWTtJQVh4QixlQUFNLEVBQUU7SUFDUixlQUFNLENBQUM7UUFDTixTQUFTLEVBQUU7WUFDVCw0Q0FBb0I7WUFDcEIsOEJBQWE7WUFDYiwwQkFBVztZQUNYLHlDQUFrQjtTQUNuQjtRQUNELE9BQU8sRUFBRSxDQUFDLDRDQUFvQixFQUFFLDhCQUFhLEVBQUUsMEJBQVcsQ0FBQztRQUMzRCxPQUFPLEVBQUUsQ0FBQyx3QkFBVSxDQUFDO0tBQ3RCLENBQUM7R0FDVyxZQUFZLENBQUc7QUFBZixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSwgR2xvYmFsIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcHBlclNlcnZpY2UgfSBmcm9tICcuL21hcHBlci9tYXBwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnd0U3RyYXRlZ3lTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoL3N0cmF0Z2llcy9qd3Qtc3RyYXRlZ3kuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyTW9kdWxlIH0gZnJvbSAnLi4vdXNlci91c2VyLm1vZHVsZSc7XG5pbXBvcnQgeyBQYXNzcG9ydE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvcGFzc3BvcnQnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi91c2VyL3VzZXIuc2VydmljZSc7XG5cbkBHbG9iYWwoKVxuQE1vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIENvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICAgIE1hcHBlclNlcnZpY2UsXG4gICAgQXV0aFNlcnZpY2UsXG4gICAgSnd0U3RyYXRlZ3lTZXJ2aWNlLFxuICBdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdGlvblNlcnZpY2UsIE1hcHBlclNlcnZpY2UsIEF1dGhTZXJ2aWNlXSxcbiAgaW1wb3J0czogW1VzZXJNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUge31cbiJdfQ==