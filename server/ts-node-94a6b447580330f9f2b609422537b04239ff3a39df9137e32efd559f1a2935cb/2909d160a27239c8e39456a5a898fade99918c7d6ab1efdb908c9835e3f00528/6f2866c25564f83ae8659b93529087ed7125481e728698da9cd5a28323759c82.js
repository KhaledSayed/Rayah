"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const configuration_enum_1 = require("./configuration.enum");
const config_1 = require("config");
let ConfigurationService = class ConfigurationService {
    constructor() {
        this.environmentHosting = process.env[configuration_enum_1.Configuration.HOST] || 'development';
    }
    get(name) {
        return process.env[name] || config_1.get(name);
    }
    get isDevelopment() {
        return this.environmentHosting === 'development';
    }
};
ConfigurationService.connectionString = process.env[configuration_enum_1.Configuration.MONGO_URI] || config_1.get(configuration_enum_1.Configuration.MONGO_URI);
ConfigurationService = __decorate([
    common_1.Injectable()
], ConfigurationService);
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLnNlcnZpY2UudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvc2hhcmVkL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLDZEQUFxRDtBQUNyRCxtQ0FBNkI7QUFHN0IsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFEakM7UUFLVSx1QkFBa0IsR0FDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBYSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQztJQVNyRCxDQUFDO0lBUEMsR0FBRyxDQUFDLElBQVk7UUFDZCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksWUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxhQUFhLENBQUM7SUFDbkQsQ0FBQztDQUNGLENBQUE7QUFiUSxxQ0FBZ0IsR0FDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFlBQUcsQ0FBQyxrQ0FBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRjVELG9CQUFvQjtJQURoQyxtQkFBVSxFQUFFO0dBQ0Esb0JBQW9CLENBY2hDO0FBZFksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24uZW51bSc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICdjb25maWcnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblNlcnZpY2Uge1xuICBzdGF0aWMgY29ubmVjdGlvblN0cmluZzogc3RyaW5nID1cbiAgICBwcm9jZXNzLmVudltDb25maWd1cmF0aW9uLk1PTkdPX1VSSV0gfHwgZ2V0KENvbmZpZ3VyYXRpb24uTU9OR09fVVJJKTtcblxuICBwcml2YXRlIGVudmlyb25tZW50SG9zdGluZzogc3RyaW5nID1cbiAgICBwcm9jZXNzLmVudltDb25maWd1cmF0aW9uLkhPU1RdIHx8ICdkZXZlbG9wbWVudCc7XG5cbiAgZ2V0KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52W25hbWVdIHx8IGdldChuYW1lKTtcbiAgfVxuXG4gIGdldCBpc0RldmVsb3BtZW50KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVudmlyb25tZW50SG9zdGluZyA9PT0gJ2RldmVsb3BtZW50JztcbiAgfVxufVxuIl19