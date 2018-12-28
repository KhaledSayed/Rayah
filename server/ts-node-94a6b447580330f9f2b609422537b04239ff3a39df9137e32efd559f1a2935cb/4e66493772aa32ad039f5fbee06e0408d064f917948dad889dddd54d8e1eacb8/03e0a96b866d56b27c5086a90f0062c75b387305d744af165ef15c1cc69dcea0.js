"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const slider_service_1 = require("./slider.service");
const slider_controller_1 = require("./slider.controller");
const multer_1 = require("multer");
const path_1 = require("path");
const mongoose_1 = require("@nestjs/mongoose");
const slider_model_1 = require("./models/slider.model");
let SliderModule = class SliderModule {
};
SliderModule = __decorate([
    common_1.Module({
        providers: [slider_service_1.SliderService],
        controllers: [slider_controller_1.SliderController],
        exports: [slider_service_1.SliderService],
        imports: [
            common_1.MulterModule.register({
                storage: multer_1.diskStorage({
                    destination: './uploads',
                    filename: (req, file, cb) => {
                        const randomName = Array(32)
                            .fill(null)
                            .map(() => Math.round(Math.random() * 16).toString(16))
                            .join('');
                        cb(null, `${randomName}${path_1.extname(file.originalname)}`);
                    },
                }),
            }),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: slider_model_1.Slider.modelName,
                    schema: slider_model_1.Slider.model.schema,
                },
            ]),
        ],
    })
], SliderModule);
exports.SliderModule = SliderModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvc2xpZGVyLm1vZHVsZS50cyIsInNvdXJjZXMiOlsiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zbGlkZXIvc2xpZGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDJDQUFzRDtBQUN0RCxxREFBaUQ7QUFDakQsMkRBQXVEO0FBQ3ZELG1DQUFxQztBQUNyQywrQkFBK0I7QUFDL0IsK0NBQWtEO0FBQ2xELHdEQUErQztBQTZCL0MsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQUFHLENBQUE7QUFBZixZQUFZO0lBM0J4QixlQUFNLENBQUM7UUFDTixTQUFTLEVBQUUsQ0FBQyw4QkFBYSxDQUFDO1FBQzFCLFdBQVcsRUFBRSxDQUFDLG9DQUFnQixDQUFDO1FBQy9CLE9BQU8sRUFBRSxDQUFDLDhCQUFhLENBQUM7UUFDeEIsT0FBTyxFQUFFO1lBQ1AscUJBQVksQ0FBQyxRQUFRLENBQUM7Z0JBQ3BCLE9BQU8sRUFBRSxvQkFBVyxDQUFDO29CQUNuQixXQUFXLEVBQUUsV0FBVztvQkFDeEIsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRTt3QkFFMUIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQzs2QkFDekIsSUFBSSxDQUFDLElBQUksQ0FBQzs2QkFDVixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUN0RCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBRVosRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLFVBQVUsR0FBRyxjQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDekQsQ0FBQztpQkFDRixDQUFDO2FBQ0gsQ0FBQztZQUNGLHlCQUFjLENBQUMsVUFBVSxDQUFDO2dCQUN4QjtvQkFDRSxJQUFJLEVBQUUscUJBQU0sQ0FBQyxTQUFTO29CQUN0QixNQUFNLEVBQUUscUJBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTTtpQkFDNUI7YUFDRixDQUFDO1NBQ0g7S0FDRixDQUFDO0dBQ1csWUFBWSxDQUFHO0FBQWYsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGUsIE11bHRlck1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFNsaWRlclNlcnZpY2UgfSBmcm9tICcuL3NsaWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNsaWRlckNvbnRyb2xsZXIgfSBmcm9tICcuL3NsaWRlci5jb250cm9sbGVyJztcbmltcG9ydCB7IGRpc2tTdG9yYWdlIH0gZnJvbSAnbXVsdGVyJztcbmltcG9ydCB7IGV4dG5hbWUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IE1vbmdvb3NlTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9tb25nb29zZSc7XG5pbXBvcnQgeyBTbGlkZXIgfSBmcm9tICcuL21vZGVscy9zbGlkZXIubW9kZWwnO1xuXG5ATW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbU2xpZGVyU2VydmljZV0sXG4gIGNvbnRyb2xsZXJzOiBbU2xpZGVyQ29udHJvbGxlcl0sXG4gIGV4cG9ydHM6IFtTbGlkZXJTZXJ2aWNlXSxcbiAgaW1wb3J0czogW1xuICAgIE11bHRlck1vZHVsZS5yZWdpc3Rlcih7XG4gICAgICBzdG9yYWdlOiBkaXNrU3RvcmFnZSh7XG4gICAgICAgIGRlc3RpbmF0aW9uOiAnLi91cGxvYWRzJyxcbiAgICAgICAgZmlsZW5hbWU6IChyZXEsIGZpbGUsIGNiKSA9PiB7XG4gICAgICAgICAgLy8gR2VuZXJhdGluZyBhIDMyIHJhbmRvbSBjaGFycyBsb25nIHN0cmluZ1xuICAgICAgICAgIGNvbnN0IHJhbmRvbU5hbWUgPSBBcnJheSgzMilcbiAgICAgICAgICAgIC5maWxsKG51bGwpXG4gICAgICAgICAgICAubWFwKCgpID0+IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDE2KS50b1N0cmluZygxNikpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgICAgICAgLy9DYWxsaW5nIHRoZSBjYWxsYmFjayBwYXNzaW5nIHRoZSByYW5kb20gbmFtZSBnZW5lcmF0ZWQgd2l0aCB0aGUgb3JpZ2luYWwgZXh0ZW5zaW9uIG5hbWVcbiAgICAgICAgICBjYihudWxsLCBgJHtyYW5kb21OYW1lfSR7ZXh0bmFtZShmaWxlLm9yaWdpbmFsbmFtZSl9YCk7XG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICB9KSxcbiAgICBNb25nb29zZU1vZHVsZS5mb3JGZWF0dXJlKFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogU2xpZGVyLm1vZGVsTmFtZSxcbiAgICAgICAgc2NoZW1hOiBTbGlkZXIubW9kZWwuc2NoZW1hLFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVyTW9kdWxlIHt9XG4iXX0=