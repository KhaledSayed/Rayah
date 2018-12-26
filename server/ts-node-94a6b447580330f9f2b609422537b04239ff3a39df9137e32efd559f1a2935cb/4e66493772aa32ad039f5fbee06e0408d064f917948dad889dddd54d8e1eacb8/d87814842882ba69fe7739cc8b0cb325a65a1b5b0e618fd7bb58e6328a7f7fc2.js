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
    }
};
MapperService = MapperService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], MapperService);
exports.MapperService = MapperService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvbWFwcGVyL21hcHBlci5zZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC9tYXBwZXIvbWFwcGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTRDO0FBQzVDLHlDQUF1QztBQUV2QyxJQUFhLGFBQWEscUJBQTFCLE1BQWEsYUFBYTtJQUd4QjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsZUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQW1DO1FBQzFELE1BQU07YUFDSCxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQzthQUMzQixlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzlDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUV0RCxNQUFNO2FBQ0gsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7YUFDL0IsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM5QyxlQUFlLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFdEQsTUFBTTthQUNILFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO2FBQzNCLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVsRCxNQUFNO2FBQ0gsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7YUFDL0IsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWxELE1BQU07YUFDSCxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQzthQUM3QixlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFbEQsTUFBTTthQUNILFNBQVMsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO2FBQ2pDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVsRCxNQUFNO2FBQ0gsU0FBUyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7YUFDbkMsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWxELE1BQU07YUFDSCxTQUFTLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQzthQUN2QyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFbEQsTUFBTTthQUNILFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDO2FBQy9CLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVsRCxNQUFNO2FBQ0gsU0FBUyxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7YUFDbkMsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWxELE1BQU07YUFDSCxTQUFTLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQzthQUNqQyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFbEQsTUFBTTthQUNILFNBQVMsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDO2FBQ3JDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVsRCxNQUFNO2FBQ0gsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7YUFDN0IsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWxELE1BQU07YUFDSCxTQUFTLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQzthQUMvQixlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFbEQsTUFBTTthQUNILFNBQVMsQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDO2FBQ2pDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVsRCxNQUFNO2FBQ0gsU0FBUyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUM7YUFDL0IsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRixDQUFBO0FBL0VZLGFBQWE7SUFEekIsbUJBQVUsRUFBRTs7R0FDQSxhQUFhLENBK0V6QjtBQS9FWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgJ2F1dG9tYXBwZXItdHMvZGlzdC9hdXRvbWFwcGVyJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXBwZXJTZXJ2aWNlIHtcbiAgbWFwcGVyOiBBdXRvTWFwcGVySnMuQXV0b01hcHBlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1hcHBlciA9IGF1dG9tYXBwZXI7XG4gICAgdGhpcy5pbml0aWFsaXplTWFwcGVyKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVNYXBwZXIoKSB7XG4gICAgdGhpcy5tYXBwZXIuaW5pdGlhbGl6ZShNYXBwZXJTZXJ2aWNlLmNvbmZpZ3VyZSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBjb25maWd1cmUoY29uZmlnOiBBdXRvTWFwcGVySnMuSUNvbmZpZ3VyYXRpb24pOiB2b2lkIHtcbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ1VzZXInLCAnVXNlclZtJylcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ19pZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmVkKCkpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdwYXNzd29yZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmUoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ1VzZXJbXScsICdVc2VyVm1bXScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcigncGFzc3dvcmQnLCBvcHRzID0+IG9wdHMuaWdub3JlKCkpO1xuXG4gICAgY29uZmlnXG4gICAgICAuY3JlYXRlTWFwKCdUb2RvJywgJ1RvZG9WbScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnVG9kb1tdJywgJ1RvZG9WbVtdJylcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ19pZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmVkKCkpO1xuXG4gICAgY29uZmlnXG4gICAgICAuY3JlYXRlTWFwKCdCcmFuZCcsICdCcmFuZFZtJylcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ19pZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmVkKCkpO1xuXG4gICAgY29uZmlnXG4gICAgICAuY3JlYXRlTWFwKCdCcmFuZFtdJywgJ0JyYW5kVm1bXScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnQ2F0ZWdvcnknLCAnQ2F0ZWdvcnlWbScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnQ2F0ZWdvcnlbXScsICdDYXRlZ29yeVZtW10nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ0NvdXBvbicsICdDb3Vwb25WbScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnQ291cG9uW10nLCAnQ291cG9uVm1bXScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnUHJvZHVjdCcsICdQcm9kdWN0Vm0nKVxuICAgICAgLmZvclNvdXJjZU1lbWJlcignX2lkJywgb3B0cyA9PiBvcHRzLmlnbm9yZWQoKSk7XG5cbiAgICBjb25maWdcbiAgICAgIC5jcmVhdGVNYXAoJ1Byb2R1Y3RbXScsICdQcm9kdWN0Vm1bXScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnT3JkZXInLCAnT3JkZXJWbScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnT3JkZXInLCAnT3JkZXJWbVtdJylcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ19pZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmVkKCkpO1xuXG4gICAgY29uZmlnXG4gICAgICAuY3JlYXRlTWFwKCdTbGlkZXInLCAnU2xpZGVyVm1bXScpXG4gICAgICAuZm9yU291cmNlTWVtYmVyKCdfaWQnLCBvcHRzID0+IG9wdHMuaWdub3JlZCgpKTtcblxuICAgIGNvbmZpZ1xuICAgICAgLmNyZWF0ZU1hcCgnU2xpZGVyJywgJ1NsaWRlclZtJylcbiAgICAgIC5mb3JTb3VyY2VNZW1iZXIoJ19pZCcsIG9wdHMgPT4gb3B0cy5pZ25vcmVkKCkpO1xuICB9XG59XG4iXX0=