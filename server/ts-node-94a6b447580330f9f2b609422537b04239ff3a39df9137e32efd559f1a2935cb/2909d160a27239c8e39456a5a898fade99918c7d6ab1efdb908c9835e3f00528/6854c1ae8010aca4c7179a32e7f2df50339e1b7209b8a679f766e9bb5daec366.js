"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(error, host) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        if (error.getStatus() === common_1.HttpStatus.UNAUTHORIZED) {
            if (typeof error.response !== 'string') {
                error.response['message'] =
                    error.response.message ||
                        "You don't have permission to access this resource";
            }
        }
        if (error.response.message instanceof Array) {
            console.log(true);
            error.response.errors = Object.assign({}, error.response.errors);
            error.response.errors.validationErrors = [...error.response.message];
            error.response.message = null;
            error.response.message = 'Validation Error';
        }
        res.status(error.getStatus()).json({
            statusCode: error.getStatus(),
            error: error.response.name || error.name,
            message: error.response.message || error.message,
            errors: error.response.errors || null,
            timestamp: new Date().toISOString(),
            path: req ? req.url : null,
            params: req && req.params ? req.params : null,
            query: req && req.query ? req.query : null,
            body: req && req.body ? req.body : null,
            files: req && req.files ? req.files : null,
        });
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvZmlsdGVycy9odHRwLWV4Y2VwdGlvbi5maWx0ZXIudHMiLCJzb3VyY2VzIjpbIi9ob21lL3YzL1JheWFoL3NlcnZlci9zcmMvc2hhcmVkL2ZpbHRlcnMvaHR0cC1leGNlcHRpb24uZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMkNBTXdCO0FBR3hCLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBQzlCLEtBQUssQ0FBQyxLQUFVLEVBQUUsSUFBbUI7UUFDbkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFOUIsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssbUJBQVUsQ0FBQyxZQUFZLEVBQUU7WUFDakQsSUFBSSxPQUFPLEtBQUssQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO2dCQUN0QyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPO3dCQUN0QixtREFBbUQsQ0FBQzthQUN2RDtTQUNGO1FBRUQsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sWUFBWSxLQUFLLEVBQUU7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0scUJBQVEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUUsQ0FBQztZQUNyRCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRSxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDOUIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7U0FDN0M7UUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUM3QixLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUk7WUFDeEMsT0FBTyxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPO1lBQ2hELE1BQU0sRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxJQUFJO1lBQ3JDLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtZQUNuQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQzFCLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM3QyxLQUFLLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDMUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3ZDLEtBQUssRUFBRSxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtTQUMzQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQW5DWSxtQkFBbUI7SUFEL0IsY0FBSyxDQUFDLHNCQUFhLENBQUM7R0FDUixtQkFBbUIsQ0FtQy9CO0FBbkNZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEV4Y2VwdGlvbkZpbHRlcixcbiAgQXJndW1lbnRzSG9zdCxcbiAgSHR0cFN0YXR1cyxcbiAgQ2F0Y2gsXG4gIEh0dHBFeGNlcHRpb24sXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcblxuQENhdGNoKEh0dHBFeGNlcHRpb24pXG5leHBvcnQgY2xhc3MgSHR0cEV4Y2VwdGlvbkZpbHRlciBpbXBsZW1lbnRzIEV4Y2VwdGlvbkZpbHRlciB7XG4gIGNhdGNoKGVycm9yOiBhbnksIGhvc3Q6IEFyZ3VtZW50c0hvc3QpIHtcbiAgICBjb25zdCBjdHggPSBob3N0LnN3aXRjaFRvSHR0cCgpO1xuICAgIGNvbnN0IHJlcSA9IGN0eC5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgcmVzID0gY3R4LmdldFJlc3BvbnNlKCk7XG5cbiAgICBpZiAoZXJyb3IuZ2V0U3RhdHVzKCkgPT09IEh0dHBTdGF0dXMuVU5BVVRIT1JJWkVEKSB7XG4gICAgICBpZiAodHlwZW9mIGVycm9yLnJlc3BvbnNlICE9PSAnc3RyaW5nJykge1xuICAgICAgICBlcnJvci5yZXNwb25zZVsnbWVzc2FnZSddID1cbiAgICAgICAgICBlcnJvci5yZXNwb25zZS5tZXNzYWdlIHx8XG4gICAgICAgICAgXCJZb3UgZG9uJ3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGFjY2VzcyB0aGlzIHJlc291cmNlXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVycm9yLnJlc3BvbnNlLm1lc3NhZ2UgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgY29uc29sZS5sb2codHJ1ZSk7XG4gICAgICBlcnJvci5yZXNwb25zZS5lcnJvcnMgPSB7IC4uLmVycm9yLnJlc3BvbnNlLmVycm9ycyB9O1xuICAgICAgZXJyb3IucmVzcG9uc2UuZXJyb3JzLnZhbGlkYXRpb25FcnJvcnMgPSBbLi4uZXJyb3IucmVzcG9uc2UubWVzc2FnZV07XG4gICAgICBlcnJvci5yZXNwb25zZS5tZXNzYWdlID0gbnVsbDtcbiAgICAgIGVycm9yLnJlc3BvbnNlLm1lc3NhZ2UgPSAnVmFsaWRhdGlvbiBFcnJvcic7XG4gICAgfVxuXG4gICAgcmVzLnN0YXR1cyhlcnJvci5nZXRTdGF0dXMoKSkuanNvbih7XG4gICAgICBzdGF0dXNDb2RlOiBlcnJvci5nZXRTdGF0dXMoKSxcbiAgICAgIGVycm9yOiBlcnJvci5yZXNwb25zZS5uYW1lIHx8IGVycm9yLm5hbWUsXG4gICAgICBtZXNzYWdlOiBlcnJvci5yZXNwb25zZS5tZXNzYWdlIHx8IGVycm9yLm1lc3NhZ2UsXG4gICAgICBlcnJvcnM6IGVycm9yLnJlc3BvbnNlLmVycm9ycyB8fCBudWxsLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBwYXRoOiByZXEgPyByZXEudXJsIDogbnVsbCxcbiAgICAgIHBhcmFtczogcmVxICYmIHJlcS5wYXJhbXMgPyByZXEucGFyYW1zIDogbnVsbCxcbiAgICAgIHF1ZXJ5OiByZXEgJiYgcmVxLnF1ZXJ5ID8gcmVxLnF1ZXJ5IDogbnVsbCxcbiAgICAgIGJvZHk6IHJlcSAmJiByZXEuYm9keSA/IHJlcS5ib2R5IDogbnVsbCxcbiAgICAgIGZpbGVzOiByZXEgJiYgcmVxLmZpbGVzID8gcmVxLmZpbGVzIDogbnVsbCxcbiAgICB9KTtcbiAgfVxufVxuIl19