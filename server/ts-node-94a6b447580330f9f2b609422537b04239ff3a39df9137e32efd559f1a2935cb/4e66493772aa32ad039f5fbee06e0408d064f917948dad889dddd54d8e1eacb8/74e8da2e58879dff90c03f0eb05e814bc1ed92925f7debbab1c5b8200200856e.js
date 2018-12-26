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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let RolesGuard = class RolesGuard {
    constructor(_reflector) {
        this._reflector = _reflector;
    }
    canActivate(ctx) {
        const roles = this._reflector.get('roles', ctx.getHandler());
        if (!roles || roles.length === 0) {
            return true;
        }
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => roles.indexOf(user.role);
        if (user && user.role && hasRole() !== -1)
            return true;
        throw new common_1.HttpException(`You don't have permission to do this action\n ${request.url}`, common_1.HttpStatus.UNAUTHORIZED);
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvZ3VhcmRzL3JvbGVzLmd1YXJkLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC9ndWFyZHMvcm9sZXMuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FNd0I7QUFDeEIsdUNBQXlDO0FBTXpDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFDckIsWUFBNkIsVUFBcUI7UUFBckIsZUFBVSxHQUFWLFVBQVUsQ0FBVztJQUFHLENBQUM7SUFFdEQsV0FBVyxDQUFDLEdBQXFCO1FBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFhLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEQsTUFBTSxJQUFJLEdBQXVCLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDOUMsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0MsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUl2RCxNQUFNLElBQUksc0JBQWEsQ0FDckIsaURBQWlELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDOUQsbUJBQVUsQ0FBQyxZQUFZLENBQ3hCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQXZCWSxVQUFVO0lBRHRCLG1CQUFVLEVBQUU7cUNBRThCLGdCQUFTO0dBRHZDLFVBQVUsQ0F1QnRCO0FBdkJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2FuQWN0aXZhdGUsXG4gIEluamVjdGFibGUsXG4gIEV4ZWN1dGlvbkNvbnRleHQsXG4gIEh0dHBFeGNlcHRpb24sXG4gIEh0dHBTdGF0dXMsXG59IGZyb20gJ0BuZXN0anMvY29tbW9uJztcbmltcG9ydCB7IFJlZmxlY3RvciB9IGZyb20gJ0BuZXN0anMvY29yZSc7XG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJ3VzZXIvbW9kZWxzL3VzZXItcm9sZS5lbnVtJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICd1c2VyL21vZGVscy91c2VyLm1vZGVsJztcbmltcG9ydCB7IEluc3RhbmNlVHlwZSB9IGZyb20gJ3R5cGVnb29zZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IF9yZWZsZWN0b3I6IFJlZmxlY3Rvcikge31cblxuICBjYW5BY3RpdmF0ZShjdHg6IEV4ZWN1dGlvbkNvbnRleHQpOiBib29sZWFuIHtcbiAgICBjb25zdCByb2xlcyA9IHRoaXMuX3JlZmxlY3Rvci5nZXQ8VXNlclJvbGVbXT4oJ3JvbGVzJywgY3R4LmdldEhhbmRsZXIoKSk7XG5cbiAgICBpZiAoIXJvbGVzIHx8IHJvbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IGN0eC5zd2l0Y2hUb0h0dHAoKS5nZXRSZXF1ZXN0KCk7XG4gICAgY29uc3QgdXNlcjogSW5zdGFuY2VUeXBlPFVzZXI+ID0gcmVxdWVzdC51c2VyO1xuICAgIGNvbnN0IGhhc1JvbGUgPSAoKSA9PiByb2xlcy5pbmRleE9mKHVzZXIucm9sZSk7XG5cbiAgICBpZiAodXNlciAmJiB1c2VyLnJvbGUgJiYgaGFzUm9sZSgpICE9PSAtMSkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhyb2xlcy5pbmRleE9mKHVzZXIucm9sZSkpO1xuXG4gICAgdGhyb3cgbmV3IEh0dHBFeGNlcHRpb24oXG4gICAgICBgWW91IGRvbid0IGhhdmUgcGVybWlzc2lvbiB0byBkbyB0aGlzIGFjdGlvblxcbiAke3JlcXVlc3QudXJsfWAsXG4gICAgICBIdHRwU3RhdHVzLlVOQVVUSE9SSVpFRCxcbiAgICApO1xuICB9XG59XG4iXX0=