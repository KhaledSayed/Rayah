"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./models/user.model");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_model_1.User.modelName,
                    schema: user_model_1.User.model.schema,
                },
            ]),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy91c2VyL3VzZXIubW9kdWxlLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3VzZXIvdXNlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsdURBQW1EO0FBQ25ELGlEQUE2QztBQUM3QywrQ0FBa0Q7QUFDbEQsb0RBQTJDO0FBZTNDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7Q0FBRyxDQUFBO0FBQWIsVUFBVTtJQWJ0QixlQUFNLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDUCx5QkFBYyxDQUFDLFVBQVUsQ0FBQztnQkFDeEI7b0JBQ0UsSUFBSSxFQUFFLGlCQUFJLENBQUMsU0FBUztvQkFDcEIsTUFBTSxFQUFFLGlCQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07aUJBQzFCO2FBQ0YsQ0FBQztTQUNIO1FBQ0QsV0FBVyxFQUFFLENBQUMsZ0NBQWMsQ0FBQztRQUM3QixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxDQUFDLDBCQUFXLENBQUM7S0FDdkIsQ0FBQztHQUNXLFVBQVUsQ0FBRztBQUFiLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0IHsgVXNlckNvbnRyb2xsZXIgfSBmcm9tICcuL3VzZXIuY29udHJvbGxlcic7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4vdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IE1vbmdvb3NlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi9tb2RlbHMvdXNlci5tb2RlbCc7XG5cbkBNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTW9uZ29vc2VNb2R1bGUuZm9yRmVhdHVyZShbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFVzZXIubW9kZWxOYW1lLFxuICAgICAgICBzY2hlbWE6IFVzZXIubW9kZWwuc2NoZW1hLFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgY29udHJvbGxlcnM6IFtVc2VyQ29udHJvbGxlcl0sXG4gIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXSxcbiAgZXhwb3J0czogW1VzZXJTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlck1vZHVsZSB7fVxuIl19