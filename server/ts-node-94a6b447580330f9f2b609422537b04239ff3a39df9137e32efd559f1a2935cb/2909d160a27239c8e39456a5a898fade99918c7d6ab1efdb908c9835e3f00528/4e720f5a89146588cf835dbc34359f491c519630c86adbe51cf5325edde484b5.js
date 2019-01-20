"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    root() {
        return {
            success: 200,
            message: 'Hello',
        };
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9hcHAuc2VydmljZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9hcHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDJDQUE0QztBQUc1QyxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBQ3JCLElBQUk7UUFDRixPQUFPO1lBQ0wsT0FBTyxFQUFFLEdBQUc7WUFDWixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFQWSxVQUFVO0lBRHRCLG1CQUFVLEVBQUU7R0FDQSxVQUFVLENBT3RCO0FBUFksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXBwU2VydmljZSB7XG4gIHJvb3QoKTogYW55IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3VjY2VzczogMjAwLFxuICAgICAgbWVzc2FnZTogJ0hlbGxvJyxcbiAgICB9O1xuICB9XG59XG4iXX0=