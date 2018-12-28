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
const mongoose_1 = require("mongoose");
require("automapper-ts/dist/automapper");
class BaseService {
    get modelName() {
        return this._model.modelName;
    }
    get viewModelName() {
        return `${this._model.modelName}Vm`;
    }
    map(object, isArray = false, sourceKey = this.modelName, destinationKey = this.viewModelName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._mapper.map(sourceKey, destinationKey, object);
        });
    }
    findAll(filter = {}, populate = [], page = 0, perPage = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this._model.find(filter).sort('-createdAt');
            populate.forEach(item => {
                query = query.populate(item);
            });
            return yield query
                .skip(page * perPage)
                .limit(perPage)
                .exec();
        });
    }
    findOne(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.findOne(filter).exec();
        });
    }
    findById(id, populate = []) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this._model.findById(this.toObjectId(id));
            populate.forEach(element => {
                query = query.populate(element);
            });
            return yield query.exec();
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.create(item);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model
                .findByIdAndUpdate(this.toObjectId(id), item, { new: true })
                .exec();
        });
    }
    clearCollection(filter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.deleteMany(filter).exec();
        });
    }
    toObjectId(id) {
        return mongoose_1.Types.ObjectId(id);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvUmF5YWgvc2VydmVyL3NyYy9zaGFyZWQvYmFzZS5zZXJ2aWNlLnRzIiwic291cmNlcyI6WyIvaG9tZS9SYXlhaC9zZXJ2ZXIvc3JjL3NoYXJlZC9iYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVDQUFrRDtBQUVsRCx5Q0FBdUM7QUFFdkMsTUFBc0IsV0FBVztJQUsvQixJQUFZLFNBQVM7UUFDbkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBWSxhQUFhO1FBQ3ZCLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFFSyxHQUFHLENBQ1AsTUFBNkQsRUFDN0QsVUFBbUIsS0FBSyxFQUN4QixZQUFvQixJQUFJLENBQUMsU0FBUyxFQUNsQyxpQkFBeUIsSUFBSSxDQUFDLGFBQWE7O1lBRTNDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RCxDQUFDO0tBQUE7SUFFSyxPQUFPLENBQ1gsTUFBTSxHQUFHLEVBQUUsRUFDWCxXQUFxQixFQUFFLEVBQ3ZCLE9BQWUsQ0FBQyxFQUNoQixVQUFrQixFQUFFOztZQUVwQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFeEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLE1BQU0sS0FBSztpQkFDZixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztpQkFDcEIsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDZCxJQUFJLEVBQUUsQ0FBQztRQUNaLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxNQUFNLEdBQUcsRUFBRTs7WUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QyxDQUFDO0tBQUE7SUFFSyxRQUFRLENBQ1osRUFBVSxFQUNWLFdBQXFCLEVBQUU7O1lBRXZCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV0RCxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFDLElBQXFCOztZQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVLLE1BQU0sQ0FBQyxFQUFVOztZQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25FLENBQUM7S0FBQTtJQUVLLE1BQU0sQ0FBQyxFQUFVLEVBQUUsSUFBcUI7O1lBQzVDLE9BQU8sSUFBSSxDQUFDLE1BQU07aUJBQ2YsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7aUJBQzNELElBQUksRUFBRSxDQUFDO1FBQ1osQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLE1BQU0sR0FBRyxFQUFFOztZQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9DLENBQUM7S0FBQTtJQUVPLFVBQVUsQ0FBQyxFQUFVO1FBQzNCLE9BQU8sZ0JBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBOUVELGtDQThFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvY3VtZW50LCBNb2RlbCwgVHlwZXMgfSBmcm9tICdtb25nb29zZSc7XG5pbXBvcnQgeyBUeXBlZ29vc2UsIE1vZGVsVHlwZSwgSW5zdGFuY2VUeXBlIH0gZnJvbSAndHlwZWdvb3NlJztcbmltcG9ydCAnYXV0b21hcHBlci10cy9kaXN0L2F1dG9tYXBwZXInO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNlcnZpY2U8VCBleHRlbmRzIFR5cGVnb29zZT4ge1xuICBwcm90ZWN0ZWQgX21hcHBlcjogQXV0b01hcHBlckpzLkF1dG9NYXBwZXI7XG5cbiAgcHJvdGVjdGVkIF9tb2RlbDogTW9kZWxUeXBlPFQ+O1xuXG4gIHByaXZhdGUgZ2V0IG1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwubW9kZWxOYW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgdmlld01vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5fbW9kZWwubW9kZWxOYW1lfVZtYDtcbiAgfVxuXG4gIGFzeW5jIG1hcDxLPihcbiAgICBvYmplY3Q6IFBhcnRpYWw8SW5zdGFuY2VUeXBlPFQ+PiB8IFBhcnRpYWw8SW5zdGFuY2VUeXBlPFQ+PltdLFxuICAgIGlzQXJyYXk6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBzb3VyY2VLZXk6IHN0cmluZyA9IHRoaXMubW9kZWxOYW1lLFxuICAgIGRlc3RpbmF0aW9uS2V5OiBzdHJpbmcgPSB0aGlzLnZpZXdNb2RlbE5hbWUsXG4gICk6IFByb21pc2U8Sz4ge1xuICAgIHJldHVybiB0aGlzLl9tYXBwZXIubWFwKHNvdXJjZUtleSwgZGVzdGluYXRpb25LZXksIG9iamVjdCk7XG4gIH1cblxuICBhc3luYyBmaW5kQWxsKFxuICAgIGZpbHRlciA9IHt9LFxuICAgIHBvcHVsYXRlOiBzdHJpbmdbXSA9IFtdLFxuICAgIHBhZ2U6IG51bWJlciA9IDAsXG4gICAgcGVyUGFnZTogbnVtYmVyID0gMTAsXG4gICk6IFByb21pc2U8SW5zdGFuY2VUeXBlPFQ+W10+IHtcbiAgICBsZXQgcXVlcnkgPSB0aGlzLl9tb2RlbC5maW5kKGZpbHRlcikuc29ydCgnLWNyZWF0ZWRBdCcpO1xuXG4gICAgcG9wdWxhdGUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkucG9wdWxhdGUoaXRlbSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXdhaXQgcXVlcnlcbiAgICAgIC5za2lwKHBhZ2UgKiBwZXJQYWdlKVxuICAgICAgLmxpbWl0KHBlclBhZ2UpXG4gICAgICAuZXhlYygpO1xuICB9XG5cbiAgYXN5bmMgZmluZE9uZShmaWx0ZXIgPSB7fSk6IFByb21pc2U8SW5zdGFuY2VUeXBlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmZpbmRPbmUoZmlsdGVyKS5leGVjKCk7XG4gIH1cblxuICBhc3luYyBmaW5kQnlJZChcbiAgICBpZDogc3RyaW5nLFxuICAgIHBvcHVsYXRlOiBzdHJpbmdbXSA9IFtdLFxuICApOiBQcm9taXNlPEluc3RhbmNlVHlwZTxUPj4ge1xuICAgIGxldCBxdWVyeSA9IHRoaXMuX21vZGVsLmZpbmRCeUlkKHRoaXMudG9PYmplY3RJZChpZCkpO1xuXG4gICAgcG9wdWxhdGUuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkucG9wdWxhdGUoZWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYXdhaXQgcXVlcnkuZXhlYygpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlKGl0ZW06IEluc3RhbmNlVHlwZTxUPik6IFByb21pc2U8SW5zdGFuY2VUeXBlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsLmNyZWF0ZShpdGVtKTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTxJbnN0YW5jZVR5cGU8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZmluZEJ5SWRBbmRSZW1vdmUodGhpcy50b09iamVjdElkKGlkKSkuZXhlYygpO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlKGlkOiBzdHJpbmcsIGl0ZW06IEluc3RhbmNlVHlwZTxUPik6IFByb21pc2U8SW5zdGFuY2VUeXBlPFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsXG4gICAgICAuZmluZEJ5SWRBbmRVcGRhdGUodGhpcy50b09iamVjdElkKGlkKSwgaXRlbSwgeyBuZXc6IHRydWUgfSlcbiAgICAgIC5leGVjKCk7XG4gIH1cblxuICBhc3luYyBjbGVhckNvbGxlY3Rpb24oZmlsdGVyID0ge30pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWwuZGVsZXRlTWFueShmaWx0ZXIpLmV4ZWMoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9PYmplY3RJZChpZDogc3RyaW5nKTogVHlwZXMuT2JqZWN0SWQge1xuICAgIHJldHVybiBUeXBlcy5PYmplY3RJZChpZCk7XG4gIH1cbn1cbiJdfQ==