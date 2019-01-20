"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./shared/filters/http-exception.filter");
const path = require("path");
const express = require("express");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = express();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, server);
        app.enableCors();
        const hostDomain = app_module_1.AppModule.isDev
            ? `${app_module_1.AppModule.host}:${app_module_1.AppModule.port}`
            : `${app_module_1.AppModule.host}`;
        const swaggerOption = new swagger_1.DocumentBuilder()
            .setTitle('Clan Company eCommerce Solution')
            .setDescription('API Documentation')
            .setVersion('1.0.0')
            .setHost(hostDomain.split('//')[1])
            .setBasePath('/api')
            .addBearerAuth('Authorization', 'header')
            .build();
        const swaggerDoc = swagger_1.SwaggerModule.createDocument(app, swaggerOption);
        app.use('/api/docs/swagger.json', (req, res) => {
            res.send(swaggerDoc);
        });
        swagger_1.SwaggerModule.setup('/api/docs', app, null, {
            swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
            explorer: true,
            swaggerOptions: {
                docExpansion: true,
                filter: true,
                showRequestDuration: true,
            },
        });
        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
        class_validator_1.useContainer(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
        app.setGlobalPrefix('api');
        app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
        const directory = path.join(__dirname, '../uploads');
        app.use('/uploads', express.static(directory));
        app.useGlobalPipes(new common_1.ValidationPipe({
            skipMissingProperties: true,
        }));
        yield app.listen(app_module_1.AppModule.port);
    });
}
bootstrap();
function getExpressPath() {
    return path.join(__dirname + '/../uploads');
}
function getReadablePath() {
    return '/uploads';
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9tYWluLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVDQUEyQztBQUMzQyw2Q0FBeUM7QUFDekMsNkNBQWlFO0FBQ2pFLGtGQUE2RTtBQUM3RSw2QkFBNkI7QUFDN0IsbUNBQW1DO0FBQ25DLDJDQUFnRDtBQUNoRCxxREFBMEQ7QUFNMUQsU0FBZSxTQUFTOztRQUN0QixNQUFNLE1BQU0sR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUN6QixNQUFNLEdBQUcsR0FBRyxNQUFNLGtCQUFXLENBQUMsTUFBTSxDQUFDLHNCQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEQsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLHNCQUFTLENBQUMsS0FBSztZQUNoQyxDQUFDLENBQUMsR0FBRyxzQkFBUyxDQUFDLElBQUksSUFBSSxzQkFBUyxDQUFDLElBQUksRUFBRTtZQUN2QyxDQUFDLENBQUMsR0FBRyxzQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXhCLE1BQU0sYUFBYSxHQUFHLElBQUkseUJBQWUsRUFBRTthQUN4QyxRQUFRLENBQUMsaUNBQWlDLENBQUM7YUFDM0MsY0FBYyxDQUFDLG1CQUFtQixDQUFDO2FBQ25DLFVBQVUsQ0FBQyxPQUFPLENBQUM7YUFDbkIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEMsV0FBVyxDQUFDLE1BQU0sQ0FBQzthQUNuQixhQUFhLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQzthQUN4QyxLQUFLLEVBQUUsQ0FBQztRQUVYLE1BQU0sVUFBVSxHQUFHLHVCQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUVwRSxHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzdDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCx1QkFBYSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtZQUMxQyxVQUFVLEVBQUUsR0FBRyxVQUFVLHdCQUF3QjtZQUNqRCxRQUFRLEVBQUUsSUFBSTtZQUNkLGNBQWMsRUFBRTtnQkFDZCxZQUFZLEVBQUUsSUFBSTtnQkFDbEIsTUFBTSxFQUFFLElBQUk7Z0JBQ1osbUJBQW1CLEVBQUUsSUFBSTthQUMxQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdkM7UUFJRCw4QkFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsc0JBQVMsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVoRSxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLDJDQUFtQixFQUFFLENBQUMsQ0FBQztRQUNoRCxNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM3RCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLGNBQWMsQ0FDaEIsSUFBSSx1QkFBYyxDQUFDO1lBQ2pCLHFCQUFxQixFQUFFLElBQUk7U0FDNUIsQ0FBQyxDQUNILENBQUM7UUFFRixNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsc0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQUE7QUFDRCxTQUFTLEVBQUUsQ0FBQztBQUVaLFNBQVMsY0FBYztJQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxTQUFTLGVBQWU7SUFDdEIsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5lc3RGYWN0b3J5IH0gZnJvbSAnQG5lc3Rqcy9jb3JlJztcbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gJy4vYXBwLm1vZHVsZSc7XG5pbXBvcnQgeyBEb2N1bWVudEJ1aWxkZXIsIFN3YWdnZXJNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3N3YWdnZXInO1xuaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbkZpbHRlciB9IGZyb20gJy4vc2hhcmVkL2ZpbHRlcnMvaHR0cC1leGNlcHRpb24uZmlsdGVyJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgVmFsaWRhdGlvblBpcGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyB1c2VDb250YWluZXIsIFZhbGlkYXRvciB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5pbXBvcnQgeyBNYXBwZXJTZXJ2aWNlIH0gZnJvbSAnc2hhcmVkL21hcHBlci9tYXBwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb3Vwb25Nb2R1bGUgfSBmcm9tICdjb3Vwb24vY291cG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICd0eXBlZGknO1xuZGVjbGFyZSBjb25zdCBtb2R1bGU6IGFueTtcblxuYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKCkge1xuICBjb25zdCBzZXJ2ZXIgPSBleHByZXNzKCk7XG4gIGNvbnN0IGFwcCA9IGF3YWl0IE5lc3RGYWN0b3J5LmNyZWF0ZShBcHBNb2R1bGUsIHNlcnZlcik7XG4gIGFwcC5lbmFibGVDb3JzKCk7XG4gIGNvbnN0IGhvc3REb21haW4gPSBBcHBNb2R1bGUuaXNEZXZcbiAgICA/IGAke0FwcE1vZHVsZS5ob3N0fToke0FwcE1vZHVsZS5wb3J0fWBcbiAgICA6IGAke0FwcE1vZHVsZS5ob3N0fWA7XG5cbiAgY29uc3Qgc3dhZ2dlck9wdGlvbiA9IG5ldyBEb2N1bWVudEJ1aWxkZXIoKVxuICAgIC5zZXRUaXRsZSgnQ2xhbiBDb21wYW55IGVDb21tZXJjZSBTb2x1dGlvbicpXG4gICAgLnNldERlc2NyaXB0aW9uKCdBUEkgRG9jdW1lbnRhdGlvbicpXG4gICAgLnNldFZlcnNpb24oJzEuMC4wJylcbiAgICAuc2V0SG9zdChob3N0RG9tYWluLnNwbGl0KCcvLycpWzFdKVxuICAgIC5zZXRCYXNlUGF0aCgnL2FwaScpXG4gICAgLmFkZEJlYXJlckF1dGgoJ0F1dGhvcml6YXRpb24nLCAnaGVhZGVyJylcbiAgICAuYnVpbGQoKTtcblxuICBjb25zdCBzd2FnZ2VyRG9jID0gU3dhZ2dlck1vZHVsZS5jcmVhdGVEb2N1bWVudChhcHAsIHN3YWdnZXJPcHRpb24pO1xuXG4gIGFwcC51c2UoJy9hcGkvZG9jcy9zd2FnZ2VyLmpzb24nLCAocmVxLCByZXMpID0+IHtcbiAgICByZXMuc2VuZChzd2FnZ2VyRG9jKTtcbiAgfSk7XG5cbiAgU3dhZ2dlck1vZHVsZS5zZXR1cCgnL2FwaS9kb2NzJywgYXBwLCBudWxsLCB7XG4gICAgc3dhZ2dlclVybDogYCR7aG9zdERvbWFpbn0vYXBpL2RvY3Mvc3dhZ2dlci5qc29uYCxcbiAgICBleHBsb3JlcjogdHJ1ZSxcbiAgICBzd2FnZ2VyT3B0aW9uczoge1xuICAgICAgZG9jRXhwYW5zaW9uOiB0cnVlLFxuICAgICAgZmlsdGVyOiB0cnVlLFxuICAgICAgc2hvd1JlcXVlc3REdXJhdGlvbjogdHJ1ZSxcbiAgICB9LFxuICB9KTtcblxuICBpZiAobW9kdWxlLmhvdCkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IGFwcC5jbG9zZSgpKTtcbiAgfVxuXG4gIC8vIGFwcC51c2VTdGF0aWNBc3NldHMocGF0aC5qb2luKF9fZGlybmFtZSwgJy8uLi9wdWJsaWMvdXBsb2FkcycpKTtcblxuICB1c2VDb250YWluZXIoYXBwLnNlbGVjdChBcHBNb2R1bGUpLCB7IGZhbGxiYWNrT25FcnJvcnM6IHRydWUgfSk7XG5cbiAgYXBwLnNldEdsb2JhbFByZWZpeCgnYXBpJyk7XG4gIGFwcC51c2VHbG9iYWxGaWx0ZXJzKG5ldyBIdHRwRXhjZXB0aW9uRmlsdGVyKCkpO1xuICBjb25zdCBkaXJlY3Rvcnk6IHN0cmluZyA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi91cGxvYWRzJyk7XG4gIGFwcC51c2UoJy91cGxvYWRzJywgZXhwcmVzcy5zdGF0aWMoZGlyZWN0b3J5KSk7XG4gIGFwcC51c2VHbG9iYWxQaXBlcyhcbiAgICBuZXcgVmFsaWRhdGlvblBpcGUoe1xuICAgICAgc2tpcE1pc3NpbmdQcm9wZXJ0aWVzOiB0cnVlLFxuICAgIH0pLFxuICApO1xuXG4gIGF3YWl0IGFwcC5saXN0ZW4oQXBwTW9kdWxlLnBvcnQpO1xufVxuYm9vdHN0cmFwKCk7XG5cbmZ1bmN0aW9uIGdldEV4cHJlc3NQYXRoKCkge1xuICByZXR1cm4gcGF0aC5qb2luKF9fZGlybmFtZSArICcvLi4vdXBsb2FkcycpO1xufVxuXG5mdW5jdGlvbiBnZXRSZWFkYWJsZVBhdGgoKSB7XG4gIHJldHVybiAnL3VwbG9hZHMnO1xufVxuIl19