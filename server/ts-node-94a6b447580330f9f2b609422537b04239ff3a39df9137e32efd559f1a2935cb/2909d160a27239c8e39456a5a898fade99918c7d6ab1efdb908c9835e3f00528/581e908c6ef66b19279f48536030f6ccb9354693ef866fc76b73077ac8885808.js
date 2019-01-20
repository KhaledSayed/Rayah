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
var MapperService_1;
const common_1 = require("@nestjs/common");
require("automapper-ts/dist/automapper");
let MapperService = MapperService_1 = class MapperService {
    constructor() {
        this.mapper = automapper;
        this.initializeMapper();
    }
    initializeMapper() {
        this.mapper.initialize(MapperService_1.configure);
    }
    static configure(config) {
        config
            .createMap('User', 'UserVm')
            .forSourceMember('_id', opts => opts.ignored())
            .forSourceMember('password', opts => opts.ignore());
        config
            .createMap('User[]', 'UserVm[]')
            .forSourceMember('_id', opts => opts.ignored())
            .forSourceMember('password', opts => opts.ignore());
        config
            .createMap('Todo', 'TodoVm')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Todo[]', 'TodoVm[]')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Brand', 'BrandVm')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Brand[]', 'BrandVm[]')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Category', 'CategoryVm')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Category[]', 'CategoryVm[]')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Coupon', 'CouponVm')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Coupon[]', 'CouponVm[]')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Product', 'ProductVm')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Product[]', 'ProductVm[]')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Order', 'OrderVm')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Order', 'OrderVm[]')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Slider', 'SliderVm[]')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Slider', 'SliderVm')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Review', 'ReviewVm')
            .forSourceMember('_id', opts => opts.ignored());
        config
            .createMap('Review[]', 'ReviewVm[]')
            .forSourceMember('_id', opts => opts.ignored());
    }
};
MapperService = MapperService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MapperService);
exports.MapperService = MapperService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvdjMvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvbWFwcGVyL21hcHBlci5zZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvaG9tZS92My9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC9tYXBwZXIvbWFwcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLHlDQUF1QztBQUV2QyxJQUFhLGFBQWEscUJBQTFCLE1BQWEsYUFBYTtJQUd4QjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsZUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQW1DO1FBQzFELE1BQU07YUFDSCxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQzthQUMzQixlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzlDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUV0RCxNQUFNO2FBQ0gsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7YUFDL0IsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM5QyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFdEQsTUFBTTthQUNILFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO2FBQzNCLGVBQWUsQ0FBQyxLQUFLLEVB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WSxDQUFDO2FBQ25DLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0YsQ0FBQTtBQXZGWSxhQUFhO0lBRHpCLG1CQUFVLEVBQUU7O0dBQ0EsYUFBYSxDQXVGekI7QUF2Rlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xuaW1wb3J0ICdhdXRvbWFwcGVyLXRzL2Rpc3QvYXV0b21hcHBlcic7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFwcGVyU2VydmljZSB7XG4gIG1hcHBlcjogQXV0b01hcHBlckpzLkF1dG9NYXBwZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYXBwZXIgPSBhdXRvbWFwcGVyO1xuICAgIHRoaXMuaW5pdGlhbGl6ZU1hcHBlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplTWFwcGVyKCkge1xuICAgIHRoaXMubWFwcGVyLmluaXRpYWxpemUoTWFwcGVyU2VydmljZS5jb25maWd1cmUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgY29uZmlndXJlKGNvbmZpZzogQXV0b01hcHBlckpzLklDb25maWd1cmF0aW9uKTogdm9pZCB7XG4gICAgY29uZmlnXG4gICAgICAuY3JlYXRlTWFwKCdVc2VyJywgJ1VzZXJWbScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcigncGFzc3dvcmQnLCBvcHRzID0+IG9wdHMuaWdub3JlKCkpO1xuXG4gICAgY29uZmlnXG4gICAgICAuY3JlYXRlTWFwKCdVc2VyW10nLCAnVXNlclZtW10nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSlcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ3Bhc3N3b3JkJywgb3B0cyA9PiBvcHRzLmlnbm9yZSgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnVG9kbycsICdUb2RvVm0nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ1RvZG9bXScsICdUb2RvVm1bXScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnQnJhbmQnLCAnQnJhbmRWbScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnQnJhbmRbXScsICdCcmFuZFZtW10nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ0NhdGVnb3J5JywgJ0NhdGVnb3J5Vm0nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ0NhdGVnb3J5W10nLCAnQ2F0ZWdvcnlWbVtdJylcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ19pZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmVkKCkpO1xuXG4gICAgY29uZmlnXG4gICAgICAuY3JlYXRlTWFwKCdDb3Vwb24nLCAnQ291cG9uVm0nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ0NvdXBvbltdJywgJ0NvdXBvblZtW10nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ1Byb2R1Y3QnLCAnUHJvZHVjdFZtJylcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ19pZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmVkKCkpO1xuXG4gICAgY29uZmlnXG4gICAgICAuY3JlYXRlTWFwKCdQcm9kdWN0W10nLCAnUHJvZHVjdFZtW10nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ09yZGVyJywgJ09yZGVyVm0nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ09yZGVyJywgJ09yZGVyVm1bXScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnU2xpZGVyJywgJ1NsaWRlclZtW10nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ1NsaWRlcicsICdTbGlkZXJWbScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnUmV2aWV3JywgJ1Jldmlld1ZtJylcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ19pZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmVkKCkpO1xuXG4gICAgY29uZmlnXG4gICAgICAuY3JlYXRlTWFwKCdSZXZpZXdbXScsICdSZXZpZXdWbVtdJylcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ19pZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmVkKCkpO1xuICB9XG59XG4iXX0=