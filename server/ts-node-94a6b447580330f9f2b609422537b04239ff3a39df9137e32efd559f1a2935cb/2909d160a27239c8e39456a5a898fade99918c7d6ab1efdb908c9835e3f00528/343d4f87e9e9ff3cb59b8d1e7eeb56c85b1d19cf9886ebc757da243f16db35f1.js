"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let ToBooleanPipe = class ToBooleanPipe {
    transform(value, metadata) {
        if (metadata.type === 'query' && metadata.metatype === Boolean) {
            return value ? value === 'true' : null;
        }
        return value;
    }
};
ToBooleanPipe = __decorate([
    common_1.Injectable()
], ToBooleanPipe);
exports.ToBooleanPipe = ToBooleanPipe;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvcGlwZXMvdG8tYm9vbGVhbi5waXBlLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC9waXBlcy90by1ib29sZWFuLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSwyQ0FBNkU7QUFHN0UsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN4QixTQUFTLENBQUMsS0FBVSxFQUFFLFFBQTBCO1FBQzlDLElBQUksUUFBUSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDOUQsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUN4QztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGLENBQUE7QUFSWSxhQUFhO0lBRHpCLG1CQUFVLEVBQUU7R0FDQSxhQUFhLENBUXpCO0FBUlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlVHJhbnNmb3JtLCBBcmd1bWVudE1ldGFkYXRhLCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9Cb29sZWFuUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IGFueSwgbWV0YWRhdGE6IEFyZ3VtZW50TWV0YWRhdGEpIHtcbiAgICBpZiAobWV0YWRhdGEudHlwZSA9PT0gJ3F1ZXJ5JyAmJiBtZXRhZGF0YS5tZXRhdHlwZSA9PT0gQm9vbGVhbikge1xuICAgICAgcmV0dXJuIHZhbHVlID8gdmFsdWUgPT09ICd0cnVlJyA6IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=